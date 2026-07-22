# Hub Spec: Certified Legal Translation Hub (`/[locale]/legal-translation/**`)

This hub is JUSOR's primary programmatic-SEO surface area: a matrix of `Authority × DocumentType × LanguagePair` generates thousands of long-tail, high-intent landing pages. All routes below share one dynamic template family and are driven entirely by the `Authority`, `DocumentType`, `EmbassyRequirement`, and `LanguagePair` Prisma models — no hardcoded per-country content in components.

## Route Map

```
/[locale]/legal-translation                                  (hub index)
/[locale]/legal-translation/embassies/[authoritySlug]         e.g. /legal-translation/embassies/uk-home-office
/[locale]/legal-translation/authorities/[authoritySlug]        e.g. /legal-translation/authorities/ministry-of-justice
/[locale]/legal-translation/documents/[documentSlug]           e.g. /legal-translation/documents/birth-certificate
/[locale]/translations/[pairSlug]                              e.g. /translations/arabic-to-english
```

---

## A. Embassy Landing Pages (`/legal-translation/embassies/[authoritySlug]`)

### 1. Purpose & UX Rationale

Visitors arriving here are almost always mid-application for a visa, residency, or citizenship process and are anxious about rejection due to translation non-compliance. The page must immediately answer "will this translation be accepted by this specific embassy" — hence the requirement checklist and turnaround time are placed above the fold, ahead of general marketing content.

### 2. Component Hierarchy

```
app/[locale]/legal-translation/embassies/[authoritySlug]/page.tsx
└── <EmbassyLandingPage>
    ├── <AuthorityHeroBanner>              (flag icon, authority logo, country name)
    ├── <DefinitionAnswerBlock />          (GEO block — see §3)
    ├── <RequirementsChecklist>            (per-document accordion: apostille? notarization? sworn translator?)
    │   └── <RequirementRow /> × N         (documentType name, requiresApostille badge, turnaroundHours)
    ├── <DocumentTypeGrid>                  (filterable by category, links to /legal-translation/documents/[slug]?authority=[slug])
    ├── <TurnaroundTimeline>                (visual stepper: Submit → Translate → Certify → Deliver, per authority SLA)
    ├── <InstantQuoteTrigger>               (pre-fills QuoteEstimator with authority context)
    ├── <RelatedAuthoritiesCarousel>        (other embassies in same region)
    └── <FAQAccordion />                    (authority-specific AEO Q&A)
```

### 3. SEO, GEO & AEO Directives

- **Target intent:** "[Country] embassy certified translation requirements", "documents for UK visa translation", "هل الترجمة المعتمدة لدى السفارة الألمانية مقبولة"
- **Conversational H2s:** "What documents does the {{authorityName}} require translated?", "How long does {{authorityName}}-approved translation take?", "Does {{authorityName}} require notarized or sworn translation?"
- **Definition-Lead Block** (dynamically templated per `Authority`, 40–60 words):
  > The {{authorityName}} requires certified translations of official documents (birth certificates, passports, academic records) to be submitted in {{targetLanguage}} by an accredited translator. JUSOR provides {{authorityName}}-compliant certified translation with {{avgTurnaroundHours}}-hour turnaround, {{requiresApostille ? "apostille coordination, " : ""}}and a satisfaction guarantee accepted for visa, immigration, and residency applications.
- **JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "name": "{{authorityName}}",
      "areaServed": "{{countryCode}}"
    },
    {
      "@type": "Service",
      "name": "Certified Translation for {{authorityName}}",
      "provider": { "@id": "https://jusor.com/#organization" },
      "serviceOutput": "Certified, embassy-compliant document translation"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Does {{authorityName}} accept JUSOR certified translations?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JUSOR translations are prepared by ATA/ISO 17100-certified linguists and include a signed certificate of accuracy accepted by {{authorityName}} for {{documentTypeExamples}}." } }
      ]
    }
  ]
}
```
- **Canonical:** `https://jusor.com/{{locale}}/legal-translation/embassies/{{authoritySlug}}`, with `hreflang` alternates for all 6 locales pointing to locale-prefixed equivalents.

### 4. Front-End UI/UX Specification

- **Tokens:** `AuthorityHeroBanner` uses `bg-primary-50` with the country flag rendered at 48px inside a `rounded-full ring-2 ring-primary-100` frame; `requiresApostille`/`requiresSwornTranslator` render as `Badge` variant `certified` (primary) vs a new `warning`-tinted badge for apostille (since it implies extra user action/cost).
- **Motion:** `RequirementsChecklist` accordion items expand with Radix's built-in height animation wrapped in Framer `AnimatePresence` for the checklist item stagger (`0.04s` per row).
- **Responsive:** Mobile stacks `RequirementsChecklist` above `DocumentTypeGrid` (single column); Desktop uses a sticky-left `AuthorityHeroBanner` + `InstantQuoteTrigger` rail (`lg:sticky lg:top-24`) alongside a scrolling right column for checklist/grid.
- **RTL/LTR:** Country flag position mirrors to `end` in RTL headers; checklist checkmark icons stay LTR-neutral (non-directional).

### 5. Back-End & Database Integration

- **Models:** `Authority` (by `authoritySlug`), `EmbassyRequirement[]` (joined `DocumentType`), read via a single Prisma query with `include`, ISR `revalidate: 3600`.
- **Data flow:** `generateStaticParams` pre-builds all `Authority` slugs at build time (`type: EMBASSY`); new authorities added via admin trigger on-demand ISR (`res.revalidate()` webhook from admin panel).
- **API:** `GET /api/v1/authorities/[slug]/requirements` (see [02-api-server-actions.md](02-api-server-actions.md#35-supplementary-endpoints)) powers the client-side `RequirementsChecklist` filter interactions (filter by document category without full page reload).
- **Validation:** slug params sanitized via `z.string().regex(/^[a-z0-9-]+$/)` in the route handler before Prisma lookup (prevents injection via malformed dynamic segments).

### 6. Machine-Readability

Each embassy page exposes a matching clean-JSON twin at `GET /api/v1/authorities/[slug]` returning `{ name, country, requirements: [...], turnaroundHours, definitionBlock }` for RAG consumption, referenced in `/llms.txt` under a generated `## Embassy Requirements` section (auto-populated from the `Authority` table at build time via a script in `scripts/generate-llms-txt.ts`).

---

## B. Government Authority Pages (`/legal-translation/authorities/[authoritySlug]`)

Structurally identical template to Embassy pages (shared `<AuthorityLandingPage>` base component with an `authorityType` prop switch), covering `type ∈ {MINISTRY, COURT, UNIVERSITY, IMMIGRATION_OFFICE, NOTARY}`. Key deltas:

- **Content emphasis:** Courts and Ministries emphasize *sworn/legal translator* credentials and chain-of-custody (`requiresSwornTranslator` badge prioritized over apostille); Universities emphasize *academic transcript equivalency* language; Immigration Offices emphasize *turnaround urgency* (visa deadline framing).
- **Conversational H2 variants:** "What translations does {{authorityName}} (Court) require for legal proceedings?", "Is a sworn translator required for {{authorityName}} submissions?"
- **JSON-LD:** `GovernmentOrganization` → `CivicStructure` subtype swapped per `authorityType` (`Courthouse` for COURT, `CollegeOrUniversity` for UNIVERSITY) for more precise entity graph matching in Google's Knowledge Graph and LLM extraction.
- **Additional component:** `<LegalDisclaimerNotice>` — required for COURT/NOTARY pages, stating translations do not constitute legal advice (compliance requirement, styled as `bg-slate-50 border-s-4 border-warning text-caption`).

---

## C. Official Document Pages (`/legal-translation/documents/[documentSlug]`)

### 1. Purpose & UX Rationale

This is the highest-conversion template in the entire site — a single document type (e.g., Birth Certificate) with clear pricing tiers, an upload checklist, and an immediate quote trigger. Designed as a hybrid between a SaaS pricing page and an e-commerce product detail page.

### 2. Component Hierarchy

```
app/[locale]/legal-translation/documents/[documentSlug]/page.tsx
└── <DocumentDetailPage>
    ├── <DocumentHeroCard>
    │   ├── <DocumentThumbnail />
    │   ├── <CertifiedBadge /> + <CategoryBadge />
    │   └── <PricingTierTable>              (Standard / Professional / Certified / Sworn Legal × turnaround matrix)
    ├── <RequiredUploadsChecklist>          (from DocumentType.requiredUploads Json)
    ├── <ApplicableAuthoritiesList>          (cross-links to Embassy/Authority pages accepting this doc)
    ├── <InstantQuoteTrigger>               (pre-fills documentTypeSlug)
    ├── <SampleCertificatePreview>          (blurred/watermarked sample of a delivered certified translation)
    ├── <RelatedDocumentsGrid>
    └── <FAQAccordion />
```

### 3. SEO, GEO & AEO Directives

- **Target intent:** "birth certificate translation price", "certified marriage certificate translation for visa", "how much to translate a passport"
- **Definition-Lead Block** (templated per `DocumentType`):
  > A certified {{documentName}} translation is an official, word-for-word rendering of your {{documentName}} into {{targetLanguage}}, accompanied by a signed certificate of accuracy. JUSOR delivers certified {{documentName}} translations starting at ${{basePrice}}, typically within {{avgTurnaroundHours}} hours, accepted by embassies, courts, and immigration authorities worldwide.
- **JSON-LD:** `Product` + `Offer` (per pricing tier) + `FAQPage`:
```json
{
  "@type": "Product",
  "name": "Certified {{documentName}} Translation",
  "category": "{{category}}",
  "offers": [
    { "@type": "Offer", "name": "Standard", "price": "{{price}}", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
  ]
}
```
- **AEO Quick-Answer block:** A dedicated `<QuickAnswerCard>` component directly under the H1 answering "How much does it cost?" and "How long does it take?" in bolded, structured 1-line answers — engineered to be lifted verbatim into Google's featured snippet / AI Overview box.

### 4. Front-End UI/UX Specification

- **Tokens:** `PricingTierTable` highlights the recommended tier (`CERTIFIED`) with `ring-2 ring-accent-500` and a "Most Popular" `Badge` (accent). `RequiredUploadsChecklist` items use Lucide `FileCheck2` icons, unchecked state `text-slate-400`, checked (client-side, post-upload) `text-success`.
- **Motion:** `PricingTierTable` columns fade/slide in on scroll (`staggerChildren: 0.1`); price digits use the `<AnimatedNumber>` primitive (same counter mechanism as homepage stats) when switching between turnaround speeds so the price change is perceptible, not a jarring swap.
- **Responsive:** Mobile — `PricingTierTable` becomes a horizontally swipeable card carousel (one tier per screen, snap-scroll) with a persistent tier-selector pill row above it; Desktop — full 4-column comparison table.
- **RTL/LTR:** `SampleCertificatePreview` image itself is NOT mirrored (documents retain their real reading direction regardless of UI locale) — only the surrounding UI chrome flips.

### 5. Back-End & Database Integration

- **Models:** `DocumentType`, `DocumentPricingTier[]`, `EmbassyRequirement[]` (reverse lookup for `ApplicableAuthoritiesList`).
- **Data flow:** Page is fully static-generated (`generateStaticParams` over all `DocumentType.slug` where `isPublished`), ISR `revalidate: 3600`. `InstantQuoteTrigger` deep-links to the global quote flow with `?documentType={{slug}}` — the Quote Estimator (see [03-page-home.md](03-page-home.md)) reads this query param to skip document-type selection.
- **Validation:** N/A for read path (fully static); the quote submission that follows reuses `QuoteSubmitSchema`.

### 6. Machine-Readability

Every `DocumentType` is enumerated in `/llms.txt` under `## Document Pricing` with a one-line summary + canonical URL, generated from a Prisma query at build time. A parallel `GET /api/v1/document-types/[slug]` clean-JSON endpoint returns the full pricing table for programmatic price-comparison tools/LLMs.

---

## D. Language Pair Matrix (`/translations/[pairSlug]`)

### 1. Purpose & UX Rationale

Pure programmatic-SEO play capturing "{{source}} to {{target}} translation" search volume across 60+ language combinations (e.g., `arabic-to-english`, `english-to-german`). Each page must feel substantive, not thin/auto-generated, to avoid a Google quality penalty — achieved by pulling in genuinely differentiated data per pair (translator pool size, demand tier, rate modifier) rather than templated filler text alone.

### 2. Component Hierarchy

```
app/[locale]/translations/[pairSlug]/page.tsx
└── <LanguagePairPage>
    ├── <PairHeroBanner>                    (source flag → bridge icon → target flag)
    ├── <DefinitionAnswerBlock />
    ├── <PairStatsRow>                       (translatorPoolSize, avg rate, popular use-cases)
    ├── <UseCaseGrid>                        (Legal / Business / Academic / Medical translation for this pair)
    ├── <InstantQuoteTrigger>                (pre-fills languagePairSlug)
    ├── <RelatedPairsGrid>                   (reverse pair + same-source-language siblings)
    └── <FAQAccordion />
```

### 3. SEO, GEO & AEO Directives

- **Target intent:** "{{sourceLanguage}} to {{targetLanguage}} translation service", "certified {{sourceLanguage}}-{{targetLanguage}} translator"
- **Definition-Lead Block:**
  > JUSOR provides professional {{sourceLanguage}}-to-{{targetLanguage}} translation for legal, business, academic, and medical documents, delivered by a vetted pool of {{translatorPoolSize}}+ native-speaking linguists. Certified and standard tiers are available with turnaround from 4 to 72 hours, supporting embassy, immigration, and corporate localization requirements.
- **JSON-LD:** `Service` with `availableLanguage: [sourceCode, targetCode]` + breadcrumb `BreadcrumbList` (Home → Translations → {{pairSlug}}) for sitelink generation.

### 4. Front-End UI/UX Specification

- **Tokens:** `PairHeroBanner` renders two flag roundels connected by an animated dashed-line "bridge" SVG (brand motif) in `accent-500`, drawn via Framer Motion `pathLength` animation (0 → 1 over 0.8s on mount) — reinforces brand identity literally at the point of highest topical relevance.
- **Responsive/RTL:** When `sourceLanguage.isRtl` or `targetLanguage.isRtl` is true independent of the page's own UI locale, the flag-bridge-flag order stays logical (`source → target` reading order) but the connecting arrow icon direction is computed from the *pair's* directionality, not the UI's, and explicitly labeled (not inferred from layout alone) to avoid ambiguity.

### 5. Back-End & Database Integration

- **Models:** `LanguagePair` (joined `Language` ×2), sorted/prioritized by `demandTier` for internal linking weight in `RelatedPairsGrid`.
- **Data flow:** `generateStaticParams` over all `LanguagePair.slug` where `isPublished`; `demandTier: 1` pairs get `revalidate: 1800` (fresher, since these are the highest-traffic pages), `demandTier ≥ 2` gets `revalidate: 86400`.
- **API:** `GET /api/v1/language-pairs` (list) and implicit per-page static props for detail.

### 6. Machine-Readability

The full pair matrix is exposed as a single clean-JSON array at `GET /api/v1/language-pairs?format=full`, and `/llms.txt` links directly to this endpoint rather than enumerating all 60+ pairs individually in the text file (keeps `/llms.txt` scannable while still giving crawlers a structured bulk-fetch path).
