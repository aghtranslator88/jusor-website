# Hub Spec: Multilingual Blog & Knowledge Base (`/[locale]/knowledge/**`)

## Route Map

```
/[locale]/knowledge                              (directory index, category filters)
/[locale]/knowledge/category/[category]           e.g. /knowledge/category/immigration
/[locale]/knowledge/[slug]                        e.g. /knowledge/uk-visa-translation-checklist-2026
```

## 1. Purpose & UX Rationale

The Knowledge Base is JUSOR's E-E-A-T and top-of-funnel acquisition engine, targeting informational queries ("do I need an apostille for my UK visa") that precede a transactional Legal Translation Hub visit by days or weeks. Because these queries are increasingly answered directly inside AI Overviews/ChatGPT without a click-through, every article is structured to (a) win the citation even without a click, by front-loading a complete, quotable answer, and (b) still convert the minority who do click, via contextual document/service CTAs injected mid-article.

## 2. Component Hierarchy

### Directory Index & Category Pages

```
app/[locale]/knowledge/page.tsx
app/[locale]/knowledge/category/[category]/page.tsx
└── <KnowledgeDirectoryPage>
    ├── <CategoryFilterTabs />               (Immigration, Visas, Legalizations, AI Translation)
    ├── <FeaturedArticleBanner />             (most recent or pinned post)
    ├── <ArticleGrid>
    │   └── <ArticleCard /> × N               (cover image, category badge, title, excerpt, author + EEAT badge, reading time)
    └── <PaginationControls />
```

### Article Page

```
app/[locale]/knowledge/[slug]/page.tsx
└── <ArticlePage>
    ├── <ArticleHeader>
    │   ├── <CategoryBadge />
    │   ├── <ArticleTitle />                  (H1)
    │   ├── <AuthorByline>                     (avatar, name, credentials, "Reviewed by" if eeatCredentials.reviewedBy set)
    │   └── <PublishedUpdatedMeta />
    ├── <DefinitionAnswerBlock />             (rendered from BlogPost.definitionBlock, styled distinctly — bordered callout — so it's visually AND semantically separable for scrapers)
    ├── <TableOfContents />                   (auto-generated from bodyMarkdown H2/H3, sticky on desktop)
    ├── <ArticleBody />                        (rendered markdown, MDX-capable for embedded <InstantQuoteTrigger> or <RequirementsChecklist> mid-article)
    ├── <MidArticleCTA />                      (contextual — e.g. an immigration article embeds a "Get UK Visa Translation Quote" card)
    ├── <ArticleFAQAccordion />
    ├── <AuthorBioCard />                       (full E-E-A-T credentials block at article foot)
    ├── <RelatedArticlesGrid />
    └── <CommentDiscussionNote />               (moderation-gated, optional — see §5)
```

## 3. SEO, GEO & AEO Directives

**Target Intent & Conversational Queries** (category-dependent examples):
- Immigration: "do I need my documents translated for a green card application", "what is an apostille and do I need one"
- AI Translation: "is AI translation accepted for legal documents", "can ChatGPT translate my birth certificate for immigration"

**Definition-Lead Answer Block** — every article's `definitionBlock` (per locale) must satisfy: 40–60 words, states the answer first (no throat-clearing "In today's globalized world..."), self-contained without needing the rest of the article. Example for an apostille explainer:
> An apostille is an internationally recognized certificate that authenticates a public document (like a birth certificate) for use in another country under the 1961 Hague Convention. It does not replace translation — most receiving countries still require a certified translation of both the original document and the apostille itself.

**Schema.org JSON-LD** (per article):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "{{title}}",
      "author": { "@type": "Person", "name": "{{authorName}}", "jobTitle": "{{authorTitle}}" },
      "datePublished": "{{publishedAt}}",
      "dateModified": "{{updatedAt}}",
      "publisher": { "@id": "https://jusor.com/#organization" },
      "about": "{{category}}"
    },
    { "@type": "FAQPage", "mainEntity": [ /* article FAQ items */ ] },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Knowledge", "item": "https://jusor.com/{{locale}}/knowledge" },
      { "@type": "ListItem", "position": 2, "name": "{{categoryLabel}}", "item": "https://jusor.com/{{locale}}/knowledge/category/{{category}}" },
      { "@type": "ListItem", "position": 3, "name": "{{title}}" }
    ]}
  ]
}
```

**E-E-A-T signals rendered on-page (not just in schema):** author headshot + credentials line (e.g., "Certified Legal Translator, 12 years experience"), visible "Reviewed by [Senior Linguist Name]" tag when `eeatCredentials.reviewedBy` is set, "Last updated" date prominently near the title (freshness signal both for users and LLM recency weighting).

## 4. Front-End UI/UX Specification

- **Tokens:** `DefinitionAnswerBlock` renders as a distinct `bg-primary-50 border-s-4 border-primary-600 rounded-e-lg p-5` callout immediately under the H1/byline — visually distinct from body copy so both human skimmers and scraping bots can isolate it structurally (it is also the *only* content wrapped in a dedicated `<div data-answer-block>` for programmatic extraction, see §6).
- **Motion:** `TableOfContents` active-section indicator uses a smooth-scroll-spy highlight (`IntersectionObserver`-driven, no scroll-jank library) with a sliding `layoutId`-based highlight pill (Framer Motion) that glides between TOC items as the reader scrolls.
- **Responsive:** Mobile — `TableOfContents` collapses to a "Jump to section" disclosure button above the article body; Desktop — sticky right-rail TOC (`xl:sticky xl:top-24`) alongside a `max-w-3xl` reading column (deliberately narrower than the site's default `max-w-7xl` container, per typographic best practice for long-form reading, 65–75 characters per line).
- **RTL/LTR:** Article body markdown renders with `text-align: start` (never hardcoded left/right); embedded `<InstantQuoteTrigger>` MDX components inherit the article's ambient locale context automatically (no manual locale prop threading needed since they read from the `next-intl` provider).

## 5. Back-End & Database Integration

- **Models:** `BlogPost` (with `author`, `faqs` includes), filtered `where: { isPublished: true, publishedAt: { lte: now } }` for the directory/category listing (supports scheduled future-dated publishing).
- **Data flow:** Fully static-generated (`generateStaticParams` over published slugs), ISR `revalidate: 3600`. Category filter tabs use shallow client-side routing (`/knowledge/category/[category]`) rather than query params, so each category remains independently indexable and linkable.
- **Content authoring:** `bodyMarkdown` authored in an internal admin MDX editor (`/admin/knowledge/[id]/edit`), stored as per-locale Markdown strings in the `Json` field; rendered via `next-mdx-remote/rsc` with a custom component map exposing `<InstantQuoteTrigger>`, `<RequirementsChecklist>`, and `<Callout>` for embedding interactive/structured elements inside otherwise-static articles.
- **`DesignComment` model:** repurposed here as lightweight internal editorial/reviewer comments on draft articles (`targetType: "blog_post"`), not public reader comments — public commenting is explicitly out of scope for v1 to avoid moderation overhead; `<CommentDiscussionNote>` in the component tree is a placeholder slot gated behind a feature flag for future Disqus/native comment integration.
- **Validation:** Admin article save validated by a `BlogPostUpsertSchema` (Zod) requiring `definitionBlock` word count between 40–60 words per populated locale (enforced via a custom `.refine()` word-counter) — this is a hard editorial gate preventing GEO-non-compliant articles from publishing.

## 6. Machine-Readability & `/llms.txt` Map

- Every article ships a parallel clean-JSON representation at `GET /api/v1/blog/[slug]` returning `{ title, definitionBlock, bodyMarkdown, faqs, author, publishedAt }` — plain Markdown, not rendered HTML, which is materially easier for RAG pipelines to chunk correctly than scraped DOM.
- `/llms.txt` includes a `## Knowledge Base` section auto-generated at build time listing the 20 most-recently-updated articles (not all articles, to keep the file scannable), plus a link to `GET /api/v1/blog?format=full` for bulk crawl.
- The `data-answer-block` attribute convention (see §4) is documented in a site-wide `/llms.txt` preamble note: `"Definition-lead answer blocks on all /knowledge and /legal-translation pages are marked with data-answer-block for reliable extraction."` — an explicit hint to crawlers that respect semantic markers over heuristic first-paragraph extraction.
