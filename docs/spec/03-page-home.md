# Page Spec: Home Page Hub (`/[locale]`)

## 1. Page Purpose & UX Rationale

The homepage must convert three distinct visitor intents within 8 seconds of load: (1) an individual needing a single certified document translated urgently, (2) an enterprise buyer evaluating localization vendors, (3) an event organizer needing interpretation/equipment. Rather than a single generic hero, the page leads with a **self-service Instant Quote Estimator** embedded directly in the hero — collapsing the "contact sales" friction that competitors impose — while secondary sections build enterprise trust (E-E-A-T, accreditations, live stats) for the higher-consideration buyer who scrolls past the quote tool.

## 2. Component Hierarchy

```
app/[locale]/page.tsx
└── <HomePage>
    ├── <HeroSection>
    │   ├── <HeroHeadline />                  (H1, definition-lead copy)
    │   ├── <QuoteEstimatorWidget>            (client component, stateful stepper)
    │   │   ├── <ServiceTierSelect />
    │   │   ├── <LanguagePairSelector />
    │   │   ├── <FileDropzone />              (or manual word-count input toggle)
    │   │   ├── <TurnaroundToggle />
    │   │   └── <PriceBreakdown />            (live-updating via /api/v1/quotes/calculate)
    │   ├── <SocialProofTicker />             (marquee: "1,240 documents translated this week")
    │   └── <PrimaryCTAGroup />               (accent-500 "Get Certified Quote", outline "Talk to an Expert")
    ├── <FeaturedServicesGrid>
    │   └── <ServiceCard /> × 8               (hover-lift, icon, definition snippet, "From $X/word")
    ├── <WhyChooseUsSection>                  (E-E-A-T: certifications, ISO badges, translator vetting stats)
    ├── <LiveStatisticsCounter>
    │   └── <StatCounter /> × 4               (Documents Translated, Languages, Countries Served, Avg. Turnaround)
    ├── <SupportedLanguagesMatrix>
    │   └── <LanguageChip />  × 40+           (links to /translations/[pair-slug], searchable combobox)
    ├── <WorkflowSteps>
    │   └── <StepCard /> × 4                  (Upload → Quote → Translate & QA → Certified Delivery)
    ├── <AccreditationsCarousel>              (ATA, ISO 17100, embassy-recognized logos)
    ├── <FAQAccordion>                        (AEO — 6-8 conversational Q&A pairs)
    └── <SiteFooter>                          (multilingual, sitemap columns, locale switcher, legal links)
```

## 3. SEO, GEO & AEO Directives

**Target Intent & Conversational Queries:**
- "certified translation services near me" / "how much does certified translation cost"
- "أفضل شركة ترجمة معتمدة" (best certified translation company)
- "how long does certified document translation take"
- Voice/zero-click: "what languages does Jusor translate"

**Definition-Lead Answer Block** (first ~200 words of rendered `<main>`, inside a visually-styled but semantically plain `<p>` immediately following H1):

> JUSOR (جسور) is an internationally accredited translation and localization company providing certified document translation, business localization, and interpretation services across 60+ language pairs. Backed by ISO 17100-certified linguists and embassy-recognized certification, JUSOR delivers legal, medical, and technical translations with turnaround options from 4 hours to 72 hours, serving individuals, enterprises, and government institutions worldwide.

**Schema.org JSON-LD** (injected via `generateMetadata` + a `<script type="application/ld+json">` in `page.tsx`):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://jusor.com/#organization",
      "name": "JUSOR",
      "alternateName": "جسور",
      "url": "https://jusor.com",
      "logo": "https://jusor.com/logo.png",
      "sameAs": ["https://linkedin.com/company/jusor", "https://twitter.com/jusortranslation"],
      "hasCredential": [{ "@type": "EducationalOccupationalCredential", "name": "ISO 17100:2015 Certified" }]
    },
    {
      "@type": "Service",
      "serviceType": "Certified Translation and Localization",
      "provider": { "@id": "https://jusor.com/#organization" },
      "areaServed": "Worldwide",
      "availableLanguage": ["en", "ar", "fr", "de", "es", "it", "..."]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does certified translation cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Certified translation typically starts at $0.12–$0.18 per source word depending on language pair and turnaround, with a minimum charge per document. Use the instant quote estimator for an exact price." }
        }
      ]
    }
  ]
}
```

## 4. Front-End UI/UX Specification

- **Styling tokens:** Hero background = `bg-primary-600` gradient to `bg-primary-700` (135deg), with the illustrated bridge-line texture at 8% opacity layered via `::before`. Quote Estimator card floats on `bg-white` (`surface-card`) with `shadow-card-hover` for immediate visual separation from the dark hero. All primary CTAs = `bg-accent-500 hover:bg-accent-600 text-white shadow-cta-glow`.
- **Motion:** Hero headline + estimator card enter with staggered `count-up`-style fade/slide (`staggerChildren: 0.08`). `SocialProofTicker` uses `animate-ticker-scroll` (CSS keyframe, `linear infinite`, pauses on hover/focus for accessibility). `StatCounter` values animate from 0 on `useInView`.
- **Responsive (390px vs 1440px):**
  - Mobile: Quote Estimator collapses to a single-column vertical stepper with a sticky bottom "Continue" bar; Hero headline caps at `text-display-lg`; Featured Services Grid becomes a horizontally-swipeable carousel (`overflow-x-auto snap-x`).
  - Desktop: Quote Estimator renders as a 2-column card (form left, live price breakdown right) inline in the hero; Featured Services Grid is a 4-column CSS grid.
- **RTL/LTR:** `QuoteEstimatorWidget` stepper progress indicator uses logical `start`/`end`, arrow icons via `<DirectionalIcon>`. `SocialProofTicker` marquee direction reverses automatically in RTL (`animation-direction: reverse` when `dir=rtl`) so the scroll still reads "forward" to the eye.

## 5. Back-End & Database Integration

- **Prisma models used:** `Service`, `ServiceCategory`, `LanguagePair`, `FAQ` (read-only, ISR-cached with `revalidate: 3600`).
- **Live stats:** `LiveStatisticsCounter` values are NOT computed on every request — a nightly cron (Vercel Cron / `app/api/cron/stats/route.ts`) aggregates `QuoteItem` counts (`status: COMPLETED`) into a small `SiteStat` cache row in Redis (`site:stats:documentsTranslated`, etc.), read at render time for O(1) lookups.
- **Quote Estimator data flow:** `LanguagePairSelector` fetches `/api/v1/language-pairs` (Redis-cached) on mount → user selections POST to `/api/v1/quotes/calculate` (see [02-api-server-actions.md](02-api-server-actions.md#31-post-apiv1quotescalculate)) debounced 300ms on word-count input changes → `PriceBreakdown` renders the response. "Get Certified Quote" CTA routes to `/quotes/submit` carrying the estimator state via URL-encoded query + `sessionStorage` hydration (avoids re-entry friction).
- **Validation:** `QuoteCalculateSchema` (Zod) reused directly from `src/lib/validation/quote.ts`.

## 6. Machine-Readability & `/llms.txt` Map

`/llms.txt` entry for this route:
```
## Home
- [JUSOR Homepage](https://jusor.com/en): Overview of certified translation, localization, and interpretation services, instant quote tool, and supported language matrix.
```
The homepage's Definition-Lead block is also exposed verbatim at `GET /api/v1/pages/home/summary` (clean JSON, no HTML) for RAG ingestion pipelines that prefer structured fetch over HTML parsing.
