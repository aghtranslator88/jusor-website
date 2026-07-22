# Hub Spec: Translation & Localization Hub (`/[locale]/services/[serviceSlug]`)

Covers: Website Localization, App Localization, Software Localization, Game Localization, Technical Translation, Medical Translation, Financial Translation, Legal Translation (business-context, distinct from the certified-document Legal Hub), Voice-over & Subtitling, and AI + Human Review Hybrid workflows. All are instances of one `Service` template (`categoryId` distinguishes "Localization" vs "Specialized Translation" vs "Media"), driven by `ServiceCategory` + `Service` models.

## 1. Page Purpose & UX Rationale

Enterprise buyers researching localization vendors compare feature depth (CAT tool support, TMS integration, glossary management) rather than raw price — the opposite psychology of the consumer-facing Legal Translation Hub. This template therefore leads with **capability proof** (workflow diagram, hybrid AI+human explanation, industry-specific compliance notes) and pushes pricing/quote lower on the page, replacing the Legal Hub's "quote-first" pattern with a "trust-first, quote-second" pattern.

## 2. Component Hierarchy

```
app/[locale]/services/[serviceSlug]/page.tsx
└── <ServiceDetailPage>
    ├── <ServiceHeroSection>
    │   ├── <ServiceHeadline />              (H1, definition-lead)
    │   └── <SecondaryCTAGroup />            ("Request Enterprise Quote" outline + "See Sample Work" ghost)
    ├── <CapabilitiesGrid>                   (e.g. for Software Localization: "String Extraction", "Pseudo-localization QA", "RTL UI Testing")
    ├── <HybridWorkflowDiagram>              (visible only when Service.supportsHybridAI = true)
    │   └── <WorkflowStageNode /> × 4        (AI Draft → Linguist Review → QA Pass → Client Delivery)
    ├── <IndustryComplianceNotes>            (e.g. Medical: HIPAA-aware handling; Financial: confidentiality/NDA-by-default)
    ├── <ToolingLogosRow>                    (Trados, memoQ, Phrase, Crowdin compatibility badges)
    ├── <CaseHighlightCard>                  (anonymized enterprise case snippet, not a full case-study page)
    ├── <PricingSnapshot>                    (per-word range + "Enterprise volume discounts available")
    ├── <InstantQuoteTrigger>                (pre-fills serviceSlug)
    ├── <RelatedServicesGrid>                (cross-sell: Website Localization → also shows App Localization, Subtitling)
    └── <FAQAccordion />
```

## 3. SEO, GEO & AEO Directives

**Target Intent & Conversational Queries** (templated per service, examples for Software Localization):
- "software localization services", "how to localize a SaaS product for Arabic markets", "RTL UI localization testing"
- AEO: "what is the difference between translation and localization", "does JUSOR support pseudo-localization QA"

**Definition-Lead Block** (per `Service`, 40–60 words — example for Software Localization):
> Software localization is the adaptation of an application's UI text, date/number formats, and layout (including RTL support) for a target market, beyond literal translation. JUSOR's software localization service combines AI-assisted string extraction with native linguist review and pseudo-localization QA, integrating directly with Crowdin, Phrase, and Trados workflows for continuous-delivery pipelines.

**Schema.org JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "{{serviceName}}",
      "serviceType": "{{categoryName}}",
      "provider": { "@id": "https://jusor.com/#organization" },
      "offers": { "@type": "Offer", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "{{basePricePerWord}}", "priceCurrency": "USD", "unitText": "per word" } }
    },
    { "@type": "FAQPage", "mainEntity": [ /* per-service AEO Q&A */ ] }
  ]
}
```

**AEO Quick-Answer:** A `<QuickAnswerCard>` directly answering the category-defining question ("What is software localization?") in the exact words a voice assistant would read aloud — kept to 2 sentences, no marketing adjectives.

## 4. Front-End UI/UX Specification

- **Tokens:** `HybridWorkflowDiagram` nodes alternate `bg-primary-50`/`bg-accent-50` fills connected by animated dashed SVG paths (reuses the bridge-line motif from the Language Pair page for visual system coherence). `IndustryComplianceNotes` uses a `bg-slate-50 border-s-4 border-primary-600` callout block, Lucide `ShieldCheck` icon.
- **Motion:** `WorkflowStageNode` items reveal sequentially (`staggerChildren: 0.15`) with the connecting path drawing via `pathLength` animation timed to match node reveal — communicates the *pipeline* nature of the hybrid workflow rather than a static list.
- **Responsive:** Mobile — `HybridWorkflowDiagram` rotates to a vertical timeline (nodes stacked, connecting line vertical); Desktop — horizontal 4-node flow spanning the container width. `CapabilitiesGrid` is 2-column mobile / 4-column desktop.
- **RTL/LTR:** `HybridWorkflowDiagram` flow direction follows reading direction (reverses in RTL via `flex-row-reverse` + mirrored arrow), since this is a UI-chrome diagram, not a real-world document.

## 5. Back-End & Database Integration

- **Models:** `Service` (with `category` include), `FAQ` (filtered `where: { serviceId }`). `supportsHybridAI` boolean flag conditionally renders `<HybridWorkflowDiagram>` — this keeps the template reusable for non-AI services (e.g., Court Interpretation cross-links) without a separate page type.
- **Data flow:** Static-generated via `generateStaticParams` over all `Service.slug`, ISR `revalidate: 3600`. `InstantQuoteTrigger` passes `?service={{slug}}` into the shared Quote Estimator, which resolves `Service.basePricePerWord` server-side in `/api/v1/quotes/calculate` rather than trusting a client-supplied price.
- **Validation:** Enterprise quote requests (volume > 50,000 words) route through a distinct `EnterpriseInquirySchema` (Zod) capturing company size/industry, submitted via a Server Action (`submitEnterpriseInquiryAction`) that creates a `TranslationQuote` with `notes` flagged `[ENTERPRISE]` for PM triage rather than the automated pricing engine.

## 6. Machine-Readability & `/llms.txt` Map

```
## Services
- [Website Localization](https://jusor.com/en/services/website-localization): Full-site translation, RTL layout adaptation, and SEO-preserving hreflang implementation.
- [Software & App Localization](https://jusor.com/en/services/software-localization): String extraction, pseudo-localization QA, CI/CD-integrated translation via Crowdin/Phrase.
- [Game Localization](https://jusor.com/en/services/game-localization): In-game text, voice-over, and cultural adaptation for global game releases.
- [Technical Translation](https://jusor.com/en/services/technical-translation)
- [Medical Translation](https://jusor.com/en/services/medical-translation)
- [Financial Translation](https://jusor.com/en/services/financial-translation)
- [Voice-over & Subtitling](https://jusor.com/en/services/voice-over-subtitling)
- [AI + Human Hybrid Translation](https://jusor.com/en/services/ai-human-hybrid)
```
Each service also exposes `GET /api/v1/services/[slug]` (clean JSON: definition, pricing snapshot, capabilities list) for structured LLM retrieval.
