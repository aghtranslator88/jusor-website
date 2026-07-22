# JUSOR — API & Server Actions Architecture

## 1. Architectural Pattern

- **Public read paths** (catalog search, document listing, blog, language-pair matrix) → **Next.js Route Handlers** (`app/api/v1/**/route.ts`) so responses are cacheable (`Cache-Control`, `revalidate`), CDN-fronted, and directly consumable by external LLM/RAG crawlers as clean JSON.
- **Authenticated / mutating paths** (quote submission, checkout, booking) → a hybrid of **Server Actions** (progressive-enhancement forms: Quote Estimator, Booking forms) and **Route Handlers** (webhooks, anything needing raw request signature verification, e.g. Stripe/Tap).
- All mutating inputs validated with **Zod** at the boundary — Server Actions call `schema.parse()` before touching Prisma; Route Handlers use a shared `validateRequest(schema, req)` helper that returns a typed `400` on failure.
- **Rate limiting:** Upstash Redis (`@upstash/ratelimit`) sliding-window, keyed by `ip + route`, applied via middleware to `/api/v1/quotes/*`, `/api/v1/webhooks/*` (post-verification), and all public search endpoints (60 req/min default, 10 req/min for file-upload-adjacent routes).
- **Caching:** Redis cache-aside for `documents/search` facet counts (60s TTL) and `languagePairs` static list (24h TTL, invalidated on admin write via cache-tag bust).

## 2. Zod Schemas (`src/lib/validation/*.ts`)

```ts
// src/lib/validation/quote.ts
import { z } from "zod";

export const QuoteCalculateSchema = z.object({
  serviceSlug: z.string().min(1),
  languagePairSlug: z.string().min(1),
  sourceWordCount: z.number().int().positive().max(500_000),
  serviceTier: z.enum(["STANDARD", "PROFESSIONAL", "CERTIFIED", "SWORN_LEGAL"]),
  turnaround: z.enum(["ECONOMY_72H", "STANDARD_24H", "EXPRESS_12H", "URGENT_4H"]),
  documentTypeSlug: z.string().optional(),
});
export type QuoteCalculateInput = z.infer<typeof QuoteCalculateSchema>;

export const QuoteItemUploadSchema = z.object({
  documentTypeSlug: z.string().optional(),
  languagePairSlug: z.string().min(1),
  fileName: z.string().min(1).max(255),
  fileSizeBytes: z.number().int().positive().max(50 * 1024 * 1024), // 50MB cap
  mimeType: z.enum([
    "application/pdf", "image/jpeg", "image/png", "image/tiff",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
});

export const QuoteSubmitSchema = z.object({
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(2).max(120).optional(),
  serviceTier: z.enum(["STANDARD", "PROFESSIONAL", "CERTIFIED", "SWORN_LEGAL"]),
  turnaround: z.enum(["ECONOMY_72H", "STANDARD_24H", "EXPRESS_12H", "URGENT_4H"]),
  notes: z.string().max(2000).optional(),
  items: z.array(z.object({
    documentTypeSlug: z.string().optional(),
    languagePairSlug: z.string().min(1),
    uploadedFileKey: z.string().min(1), // returned by presigned-upload step
    sourceFileName: z.string().min(1),
    sourceFileSizeBytes: z.number().int().positive(),
    sourceWordCount: z.number().int().positive(),
  })).min(1).max(50),
}).refine(d => d.guestEmail || true, {}); // clientId injected server-side from session if present
```

```ts
// src/lib/validation/documents.ts
import { z } from "zod";

export const DocumentSearchQuerySchema = z.object({
  category: z.enum([
    "CIVIL_REGISTRY", "IDENTITY", "ACADEMIC", "COMMERCIAL", "LEGAL", "MEDICAL", "IMMIGRATION",
  ]).optional(),
  languagePair: z.string().optional(), // slug
  authority: z.string().optional(),    // Authority slug
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  express: z.coerce.boolean().optional(),
  q: z.string().max(120).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(24),
  sort: z.enum(["relevance", "price_asc", "price_desc", "turnaround_asc"]).default("relevance"),
});
```

```ts
// src/lib/validation/bookings.ts
import { z } from "zod";

export const EquipmentBookingSchema = z.object({
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(2).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  deliveryCity: z.string().min(2).max(120),
  lines: z.array(z.object({
    equipmentSlug: z.string().min(1),
    quantity: z.number().int().positive().max(200),
  })).min(1),
}).refine(d => d.endDate > d.startDate, { message: "endDate must be after startDate", path: ["endDate"] });

export const InterpretationRequestSchema = z.object({
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(2).optional(),
  mode: z.enum(["SIMULTANEOUS", "CONSECUTIVE", "COURT", "REMOTE_VIDEO", "WHISPERED"]),
  languagePairs: z.array(z.string()).min(1),
  eventDate: z.coerce.date(),
  durationHours: z.number().positive().max(240),
  venueCity: z.string().optional(),
  isRemote: z.boolean().default(false),
  attendeeCount: z.number().int().positive().optional(),
  notes: z.string().max(2000).optional(),
});
```

```ts
// src/lib/validation/webhooks.ts
import { z } from "zod";

export const PaymentWebhookMetaSchema = z.object({
  orderId: z.string().min(1),
}); // full payload validated against Stripe/Tap SDK event types post-signature-verify, not Zod
```

## 3. Endpoint Catalog

### 3.1 `POST /api/v1/quotes/calculate`

Route Handler (stateless, no DB write — pure pricing engine call). Public, rate-limited 60/min/IP.

```ts
// app/api/v1/quotes/calculate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { QuoteCalculateSchema } from "@/lib/validation/quote";
import { ratelimit } from "@/lib/redis";
import { calculateQuotePrice } from "@/lib/pricing/engine";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const { success } = await ratelimit.limit(`quote-calc:${ip}`);
  if (!success) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const json = await req.json();
  const parsed = QuoteCalculateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const breakdown = await calculateQuotePrice(parsed.data);
  // breakdown: { subtotal, rushFee, certificationFee, discountAmount, total, currency, perWordRate, estimatedDeliveryAt }
  return NextResponse.json({ data: breakdown }, { status: 200 });
}
```

**Pricing engine logic (`src/lib/pricing/engine.ts`):**
1. Look up `Service.basePricePerWord` for `serviceSlug`.
2. Multiply by `LanguagePair.perWordRateModifier`.
3. Apply `ServiceTier` multiplier table (STANDARD ×1.0, PROFESSIONAL ×1.35, CERTIFIED ×1.6, SWORN_LEGAL ×2.1).
4. `subtotal = max(sourceWordCount * rate, Service.minCharge)`.
5. `rushFee` from `TurnaroundSpeed` multiplier (ECONOMY ×0.9, STANDARD ×1.0, EXPRESS ×1.4, URGENT ×1.9) applied to subtotal delta.
6. `certificationFee` flat add-on when tier ∈ {CERTIFIED, SWORN_LEGAL} and `documentTypeSlug` resolves to a `DocumentType` requiring notarization (looked up via `EmbassyRequirement` if an authority context is present).
7. Return full breakdown + `estimatedDeliveryAt` computed from `turnaround` + business-hours calendar (Redis-cached holiday calendar).

### 3.2 `POST /api/v1/quotes/submit`

Two-phase to avoid holding large file buffers in the Server Action:

**Phase A — `POST /api/v1/uploads/presign`** (Route Handler): validates `QuoteItemUploadSchema`, returns S3/R2 presigned `PUT` URL + object key (`quotes/{uuid}/{filename}`) scoped to a 10-minute expiry. Client uploads directly to R2 from the browser (no server bandwidth cost).

**Phase B — `submitQuoteAction` (Server Action)**, called after all files report `uploadedFileKey`:

```ts
// src/actions/quotes.ts
"use server";

import { z } from "zod";
import { QuoteSubmitSchema } from "@/lib/validation/quote";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { calculateQuotePrice } from "@/lib/pricing/engine";
import { sendQuoteConfirmationEmail } from "@/lib/email";

export async function submitQuoteAction(input: z.infer<typeof QuoteSubmitSchema>) {
  const parsed = QuoteSubmitSchema.parse(input); // throws -> caught by Server Action error boundary
  const session = await getSession();

  const itemsWithPricing = await Promise.all(
    parsed.items.map(async (item) => {
      const price = await calculateQuotePrice({
        serviceSlug: item.documentTypeSlug ?? "general-translation",
        languagePairSlug: item.languagePairSlug,
        sourceWordCount: item.sourceWordCount,
        serviceTier: parsed.serviceTier,
        turnaround: parsed.turnaround,
        documentTypeSlug: item.documentTypeSlug,
      });
      return { ...item, lineTotal: price.total };
    })
  );

  const quote = await db.translationQuote.create({
    data: {
      clientId: session?.user.id,
      guestEmail: session ? undefined : parsed.guestEmail,
      guestName: session ? undefined : parsed.guestName,
      serviceTier: parsed.serviceTier,
      turnaround: parsed.turnaround,
      notes: parsed.notes,
      totalSourceWords: itemsWithPricing.reduce((s, i) => s + i.sourceWordCount, 0),
      subtotal: itemsWithPricing.reduce((s, i) => s + i.lineTotal, 0),
      total: itemsWithPricing.reduce((s, i) => s + i.lineTotal, 0), // + fees computed in engine, simplified here
      status: "PENDING",
      items: {
        create: itemsWithPricing.map((i) => ({
          languagePair: { connect: { slug: i.languagePairSlug } },
          documentType: i.documentTypeSlug ? { connect: { slug: i.documentTypeSlug } } : undefined,
          sourceFileUrl: i.uploadedFileKey,
          sourceFileName: i.sourceFileName,
          sourceFileSizeBytes: i.sourceFileSizeBytes,
          sourceWordCount: i.sourceWordCount,
          lineTotal: i.lineTotal,
        })),
      },
    },
    include: { items: true },
  });

  await sendQuoteConfirmationEmail(quote);
  return { reference: quote.reference, quoteId: quote.id, total: quote.total };
}
```

### 3.3 `GET /api/v1/documents/search`

Route Handler, public, cached at the edge (`revalidate: 60`, cache-tag `documents-search:{queryHash}`).

```ts
// app/api/v1/documents/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DocumentSearchQuerySchema } from "@/lib/validation/documents";
import { searchDocumentTypes } from "@/lib/catalog/search";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const parsed = DocumentSearchQuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const result = await searchDocumentTypes(parsed.data);
  // result: { items: DocumentCardDTO[], facets: { categories, authorities, priceRange }, total, page, pageSize }
  return NextResponse.json({ data: result }, {
    status: 200,
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
```

Faceted counts computed via a single Prisma `groupBy` per facet dimension (category, authority) rather than N+1 queries, executed in parallel with `Promise.all`.

### 3.4 `POST /api/v1/webhooks/payment`

Route Handler, **no Zod on raw body** — signature verified first via provider SDK, then payload shape validated against the SDK's own event type.

```ts
// app/api/v1/webhooks/payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { fulfillOrder } from "@/lib/orders/fulfill";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata.orderId;
    await db.payment.update({
      where: { providerTxnId: intent.id },
      data: { status: "SUCCEEDED", rawPayload: intent as any },
    });
    await fulfillOrder(orderId); // -> Order.status = PAID, notify PM, kick off IN_PRODUCTION
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    await db.payment.update({ where: { providerTxnId: intent.id }, data: { status: "FAILED" } });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
```

Tap Payments handled by a parallel `app/api/v1/webhooks/payment/tap/route.ts` using HMAC-SHA256 verification against `hashstring` per Tap's spec, normalizing into the same `Payment` model.

### 3.5 Supplementary Endpoints

| Method & Path | Type | Purpose |
|---|---|---|
| `GET /api/v1/language-pairs` | Route Handler | Full/paginated language-pair matrix for programmatic sitemap + navigation mega-menu. 24h Redis cache. |
| `GET /api/v1/authorities/[slug]/requirements` | Route Handler | Embassy/authority checklist by document type — powers Embassy Landing Pages. |
| `POST /api/v1/bookings/equipment` | Server Action | `EquipmentBookingSchema` validated booking request → creates `EquipmentBooking` + notifies logistics team. |
| `POST /api/v1/interpretation/request` | Server Action | `InterpretationRequestSchema` → creates `InterpretationRequest`. |
| `GET /api/v1/blog` / `GET /api/v1/blog/[slug]` | Route Handler | Clean JSON blog feed, also backs `/llms.txt`-referenced machine feed. |
| `GET /llms.txt` | Route Handler (`text/plain`) | See [10-system-architecture-summary.md](10-system-architecture-summary.md#llms-txt-specification). |
| `GET /sitemap.xml` | Next.js `sitemap.ts` | Programmatic — iterates `LanguagePair`, `DocumentType`, `Authority`, `BlogPost`. |

## 4. Error Contract

All Route Handlers return a consistent envelope:

```ts
// success
{ data: T }
// failure
{ error: "validation_error" | "rate_limited" | "not_found" | "unauthorized" | "internal_error", issues?: ZodFlattenedError, requestId: string }
```

`requestId` (UUID) generated per-request in middleware and logged alongside Sentry error captures for support traceability.

## 5. Auth & Session

- Session handling via **Auth.js (NextAuth) v5** with Prisma adapter, credentials + Google OAuth providers.
- Role-based route protection via middleware matcher on `/admin/**` (ADMIN, PROJECT_MANAGER) and `/dashboard/**` (all authenticated roles), redirecting unauthenticated requests to `/[locale]/login?callbackUrl=`.
- Guest checkout supported end-to-end (quotes, bookings) — `guestEmail` capture converts to a `User` record (role `CLIENT`) automatically at first successful payment via `findOrCreateUserByEmail`.
