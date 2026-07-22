# System Architecture Summary

## 1. Next.js App Router Folder Structure

```
jusor/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                       # root layout: fonts, dir/lang, next-intl provider, JSON-LD Organization node
│   │   ├── template.tsx                     # cross-fade page transition wrapper
│   │   ├── page.tsx                         # Home Page Hub (03)
│   │   ├── legal-translation/
│   │   │   ├── page.tsx                     # hub index
│   │   │   ├── embassies/[authoritySlug]/page.tsx
│   │   │   ├── authorities/[authoritySlug]/page.tsx
│   │   │   └── documents/[documentSlug]/page.tsx
│   │   ├── translations/[pairSlug]/page.tsx
│   │   ├── services/[serviceSlug]/page.tsx  # Translation & Localization Hub (05)
│   │   ├── interpretation/
│   │   │   ├── page.tsx
│   │   │   └── [mode]/page.tsx
│   │   ├── equipment/
│   │   │   ├── page.tsx
│   │   │   └── [categorySlug]/
│   │   │       ├── page.tsx
│   │   │       └── [itemSlug]/page.tsx
│   │   ├── documents/page.tsx               # Catalog Engine (07)
│   │   ├── knowledge/
│   │   │   ├── page.tsx
│   │   │   ├── category/[category]/page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── company/
│   │   │   ├── about/page.tsx
│   │   │   ├── leadership/page.tsx
│   │   │   └── offices/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── quotes/
│   │   │   ├── submit/page.tsx
│   │   │   └── [reference]/page.tsx         # quote status/tracking page
│   │   ├── dashboard/                       # authenticated client area
│   │   │   ├── layout.tsx                   # auth guard
│   │   │   ├── page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   └── quotes/page.tsx
│   │   ├── login/page.tsx
│   │   └── not-found.tsx
│   ├── admin/                                # ADMIN/PM-only, outside [locale] (single-locale internal tool)
│   │   ├── layout.tsx                        # role-guard middleware
│   │   ├── page.tsx                          # dashboard: quote queue, revenue snapshot
│   │   ├── quotes/[id]/page.tsx
│   │   ├── documents/page.tsx                # DocumentType CRUD
│   │   ├── authorities/page.tsx
│   │   ├── knowledge/[id]/edit/page.tsx      # MDX editor
│   │   └── equipment/page.tsx
│   ├── api/
│   │   └── v1/
│   │       ├── quotes/
│   │       │   ├── calculate/route.ts
│   │       │   └── submit/route.ts           # thin wrapper if REST access needed beyond Server Action
│   │       ├── uploads/presign/route.ts
│   │       ├── documents/search/route.ts
│   │       ├── document-types/[slug]/route.ts
│   │       ├── authorities/[slug]/
│   │       │   ├── route.ts
│   │       │   └── requirements/route.ts
│   │       ├── language-pairs/route.ts
│   │       ├── services/[slug]/route.ts
│   │       ├── equipment/search/route.ts
│   │       ├── interpretation/modes/route.ts
│   │       ├── blog/route.ts
│   │       ├── blog/[slug]/route.ts
│   │       ├── offices/route.ts
│   │       ├── offices.geojson/route.ts
│   │       ├── webhooks/
│   │       │   └── payment/
│   │       │       ├── route.ts              # Stripe
│   │       │       └── tap/route.ts           # Tap Payments
│   │       └── cron/
│   │           └── stats/route.ts
│   ├── llms.txt/route.ts                     # dynamic text/plain generator
│   ├── sitemap.ts                            # programmatic sitemap
│   ├── robots.ts
│   └── globals.css
├── src/
│   ├── actions/                              # Server Actions ("use server")
│   │   ├── quotes.ts
│   │   ├── bookings.ts
│   │   ├── interpretation.ts
│   │   └── contact.ts
│   ├── components/
│   │   ├── ui/                               # shadcn/ui primitives (generated, lightly customized)
│   │   ├── icons/brand/                       # custom bridge-motif SVG components
│   │   ├── quote-estimator/                   # QuoteEstimatorWidget + subcomponents
│   │   ├── catalog/                           # FacetSidebar, DocumentCard, etc.
│   │   ├── booking/                           # BookingCartDrawer, EquipmentCard
│   │   └── shared/                            # StatCounter, TrustBar, DirectionalIcon, LogicalSheet
│   ├── lib/
│   │   ├── db.ts                              # Prisma client singleton
│   │   ├── redis.ts                           # Upstash client + ratelimit instances
│   │   ├── auth.ts                             # Auth.js config
│   │   ├── email.ts                            # Resend/SES transactional templates
│   │   ├── storage.ts                          # S3/R2 presign helpers
│   │   ├── pricing/engine.ts
│   │   ├── catalog/search.ts
│   │   ├── validation/                         # Zod schemas (quote.ts, documents.ts, bookings.ts, webhooks.ts)
│   │   └── ats/client.ts
│   ├── i18n/
│   │   ├── request.ts                          # next-intl request config
│   │   └── routing.ts                          # locale list, prefix strategy
│   ├── content/                                # low-churn static content (timeline.json, leadership.json) per locale
│   └── stores/                                 # Zustand stores (booking cart)
├── messages/                                    # next-intl translation JSON: en.json, ar.json, fr.json, de.json, es.json, it.json
├── prisma/
│   ├── schema.prisma                           # = docs/spec/01-database-schema.prisma, canonical copy lives here
│   ├── migrations/
│   └── seed.ts
├── scripts/
│   └── generate-llms-txt.ts                    # build-time helper if static portions are pre-rendered
├── docs/spec/                                    # this specification set
├── tailwind.config.ts
├── next.config.ts
└── middleware.ts                                 # locale detection, auth guards, rate-limit pre-checks
```

## 2. Prisma Setup

```bash
# Initial setup
npx prisma init
# schema lives at prisma/schema.prisma (mirrors docs/spec/01-database-schema.prisma exactly)
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed   # runs prisma/seed.ts — seeds ServiceCategory, Service, Language, LanguagePair, Authority, DocumentType, EmbassyRequirement baseline data
```

- **Connection pooling:** Prisma connects through **PgBouncer** (or Neon/Supabase's built-in pooler) in transaction mode for serverless (Vercel) deployment; `DATABASE_URL` uses the pooled connection string, with a separate `DIRECT_URL` env var for migrations (`directUrl` in `datasource db`).
- **Client singleton pattern** (`src/lib/db.ts`) to avoid exhausting connections under Next.js dev hot-reload:
```ts
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```
- **Full-text search:** Postgres native `tsvector` columns (via a Prisma `@@fulltext` index using the `fullTextSearchPostgres` preview feature) on `DocumentType.name`/`description` and `BlogPost.title`/`bodyMarkdown` for the catalog `q` search param, avoiding a separate search service at current scale.

## 3. `/llms.txt` Specification

Served dynamically via `app/llms.txt/route.ts` (`Content-Type: text/plain; charset=utf-8`), assembled from live Prisma data + a static preamble, cached 1 hour (`revalidate: 3600`):

```
# JUSOR (جسور)
> International certified translation, localization, and interpretation company. ISO 17100 certified.

Definition-lead answer blocks on all /knowledge and /legal-translation pages are marked with
data-answer-block for reliable extraction. Clean JSON equivalents exist for every HTML route
documented below (replace the page path with the matching /api/v1/... endpoint).

## Home
- [JUSOR Homepage](https://jusor.com/en): Overview, instant quote tool, supported languages.

## Services
- [Website Localization](https://jusor.com/en/services/website-localization)
- [Software & App Localization](https://jusor.com/en/services/software-localization)
- [Game Localization](https://jusor.com/en/services/game-localization)
- [Technical Translation](https://jusor.com/en/services/technical-translation)
- [Medical Translation](https://jusor.com/en/services/medical-translation)
- [Financial Translation](https://jusor.com/en/services/financial-translation)
- [Voice-over & Subtitling](https://jusor.com/en/services/voice-over-subtitling)
- [AI + Human Hybrid Translation](https://jusor.com/en/services/ai-human-hybrid)

## Legal Translation & Embassy Requirements
- Bulk data: https://jusor.com/api/v1/authorities (all embassies, ministries, courts, universities)
- [UK Home Office Requirements](https://jusor.com/en/legal-translation/embassies/uk-home-office)
  ... (auto-enumerated for all published Authority records)

## Document Pricing Catalog
- [Document Catalog](https://jusor.com/en/documents)
- Structured data: https://jusor.com/api/v1/documents/search

## Language Pairs
- Bulk data: https://jusor.com/api/v1/language-pairs?format=full

## Interpretation Services
- [Simultaneous](https://jusor.com/en/interpretation/simultaneous)
- [Consecutive](https://jusor.com/en/interpretation/consecutive)
- [Court Interpretation](https://jusor.com/en/interpretation/court)
- [Remote Interpretation](https://jusor.com/en/interpretation/remote)

## Equipment Rental
- Structured data: https://jusor.com/api/v1/equipment/search

## Knowledge Base
- [Knowledge Base Index](https://jusor.com/en/knowledge)
  ... (20 most recently updated articles auto-listed)
- Bulk data: https://jusor.com/api/v1/blog?format=full

## Company
- [About JUSOR](https://jusor.com/en/company/about)
- [Leadership](https://jusor.com/en/company/leadership)
- [Office Locations](https://jusor.com/en/company/offices) | GeoJSON: https://jusor.com/api/v1/offices.geojson
- [Careers](https://jusor.com/en/careers)
- [Contact](https://jusor.com/en/contact)

## API Access
All /api/v1/** endpoints are public, read-only, unauthenticated for catalog/content data.
Rate limit: 60 requests/minute/IP. Response envelope: { "data": T } | { "error": string, "issues"?: object }.
```

## 4. Figma Tokens Layout

Design tokens are authored in Figma via the **Tokens Studio** plugin and exported as `tokens.json`, structured to mirror `00-brand-design-system.md` 1:1 so design and code never drift:

```
tokens/
├── $themes.json                  # theme switcher config: "Light", "Dark"
├── global/
│   ├── color.json                # primary-50..900, accent-50..900, slate-50..900, semantic (success/warning/danger)
│   ├── typography.json           # font families (Jakarta/Cairo/Tajawal), type scale tokens (display-xl → caption)
│   ├── spacing.json               # 4px-based spacing scale, container widths
│   ├── radius.json                # xl/2xl/full
│   └── shadow.json                # card/card-hover/cta-glow
├── light/
│   └── semantic.json              # surface-page, surface-card mapped to global/color light values
├── dark/
│   └── semantic.json              # same semantic keys remapped to dark-safe values
└── components/
    ├── button.json                 # variant → {bg, text, border, shadow} composite tokens
    ├── badge.json
    └── card.json
```

**Sync pipeline:** Tokens Studio pushes `tokens.json` to a GitHub branch on every design update → a CI step (`scripts/tokens-to-tailwind.ts`) transforms the Tokens Studio JSON into the CSS custom properties block in `00-brand-design-system.md §2.1`, opening a PR against `app/globals.css` and `tailwind.config.ts` for engineering review before merge — token changes are never merged automatically, preserving a human review gate between design and production styling.

## 5. Deployment & Infrastructure Summary

| Layer | Choice | Notes |
|---|---|---|
| Hosting | Vercel | Edge network for static/ISR pages, Node.js runtime for Route Handlers needing Prisma/Stripe SDKs |
| Database | PostgreSQL (Neon or RDS) | Pooled via PgBouncer/Neon pooler |
| Cache/Rate-limit | Upstash Redis | Serverless-friendly, REST-based client, no persistent connection overhead |
| Object storage | Cloudflare R2 (primary) or AWS S3 | Presigned direct-upload from browser; R2 preferred for zero egress fees given document downloads |
| Payments | Stripe (global) + Tap Payments (MENA-specific cards/Mada) | Dual-provider webhook normalization into one `Payment` model |
| Email | Resend (or AWS SES) | Transactional: quote confirmations, order receipts, PM notifications |
| Monitoring | Sentry (errors) + Vercel Analytics/Speed Insights (Core Web Vitals) | `requestId` correlation across API error envelope and Sentry events |
| Search (future) | Meilisearch/Typesense | Only if `DocumentType`/`BlogPost` catalog scale exceeds Postgres full-text search viability (~5,000+ rows) |
