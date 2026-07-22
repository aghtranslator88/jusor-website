# Page Spec: Documents & Pricing Catalog Engine (`/[locale]/documents`)

## 1. Page Purpose & UX Rationale

This is JUSOR's e-commerce core — a faceted catalog letting a user narrow 100+ `DocumentType` entries down to the exact product (e.g., "Certified Birth Certificate, Arabic→English, for UK Home Office, Express turnaround") in under three filter interactions. Unlike the Legal Translation Hub's SEO-first document pages (one static page per document), this route is the **interactive discovery surface** — optimized for filter speed and comparison, not individual-page SEO depth.

## 2. Component Hierarchy

```
app/[locale]/documents/page.tsx
└── <DocumentCatalogPage>
    ├── <CatalogHeroBar>
    │   ├── <SearchInput />                  (debounced, hits ?q=)
    │   └── <ActiveFiltersRow />              (removable filter chips)
    ├── <CatalogLayout>
    │   ├── <FacetSidebar>                    (desktop: sticky left column; mobile: <Sheet> drawer)
    │   │   ├── <CategoryFacet />             (checkbox group, live counts)
    │   │   ├── <LanguagePairFacet />         (searchable combobox)
    │   │   ├── <AuthorityFacet />             (checkbox group, grouped by AuthorityType)
    │   │   ├── <PriceRangeFacet />            (dual-handle slider)
    │   │   └── <ExpressTurnaroundToggle />
    │   └── <ResultsPanel>
    │       ├── <ResultsToolbar>              (result count, sort select, view toggle grid/list)
    │       ├── <DocumentCardGrid>
    │       │   └── <DocumentCard /> × N      (see §4)
    │       ├── <EmptyState />                (shown when facet combination yields 0 results — surfaces "closest matches")
    │       └── <PaginationControls />
    └── <QuickQuoteModal>                     (triggered from any DocumentCard, see §5)
```

## 3. SEO, GEO & AEO Directives

- **Target intent:** "translation pricing catalog", "compare certified document translation prices", "cheapest certified translation for [document]"
- Because this route is filter-state-driven (client-side URL query params), SEO strategy differs from other hubs: the **unfiltered base route** (`/documents`) is the canonical indexable page; individual filtered states are `noindex, follow` (via `robots` meta set dynamically in `generateMetadata` when `searchParams` has more than the `page`/`sort` keys) to avoid thin-content duplicate indexing, while still passing link equity to the canonical Document Detail pages ([04-hub-legal-translation.md §C](04-hub-legal-translation.md#c-official-document-pages-legal-translationdocumentsdocumentslug)) linked from each card.
- **Definition-Lead Block** (static, for the base `/documents` route):
  > The JUSOR document translation catalog lists certified and standard translation pricing for over 100 official document types — including birth certificates, passports, academic transcripts, and commercial registers — filterable by language pair, target embassy or authority, and turnaround speed, with transparent per-document pricing and no hidden fees.
- **JSON-LD:** `ItemList` referencing the top N `Product` entities (paginated `ItemList` with `numberOfItems` and `itemListElement` pointing to canonical Document Detail URLs) + `CollectionPage` type on the wrapper.
- **AEO:** A static `<QuickAnswerCard>` above the grid answering "How is document translation priced?" in one structured paragraph (word-count × rate + certification fee + rush fee, in plain language) — this is the canonical explanation surfaced to voice/AI Overview queries about JUSOR's pricing model.

## 4. Front-End UI/UX Specification

- **`DocumentCard` anatomy:** thumbnail (`aspect-square`, `rounded-xl`), `CertifiedBadge` top-start corner (absolute), document name (`text-h3`), category `Badge` (`bg-slate-100 text-slate-600`), price (`text-h3 text-primary-600 font-bold`, "from" prefix in `text-caption text-slate-500`), turnaround `Badge` (accent if ≤12h), "Quick Quote" ghost button + "View Details" primary-outline button side-by-side at card foot.
- **Tokens:** `FacetSidebar` background `bg-white`, facet group headers `text-caption uppercase tracking-wide text-slate-500`, active filter chips `bg-primary-50 text-primary-700 rounded-full` with an `X` close icon.
- **Motion:** `DocumentCardGrid` re-renders on filter change with an `AnimatePresence mode="popLayout"` + `layout` prop on each card so remaining cards reflow smoothly rather than jump-cutting; `PriceRangeFacet` slider thumb has a `whileDrag={{ scale: 1.15 }}` tactile response.
- **Responsive:** Mobile (390px) — `FacetSidebar` collapses into a "Filters (3)" button opening a bottom `Sheet`; `DocumentCardGrid` is single-column; `ResultsToolbar` sort select becomes an icon-only trigger. Desktop (1440px) — `FacetSidebar` fixed 280px sticky column (`lg:sticky lg:top-24 lg:h-fit`), `DocumentCardGrid` is a 3-column grid.
- **RTL/LTR:** `PriceRangeFacet` dual slider min-handle maps to `start` and max-handle to `end` regardless of direction (values, not positions, are semantically min/max — the component computes visual left/right from `dir` at render so the slider never visually inverts min/max relative to the numbers shown).

## 5. Back-End & Database Integration

- **Models:** `DocumentType` (with `service`, `pricingTiers`, `embassyRequirements.authority` includes), driving all facets directly from relational data (no denormalized search index needed at current catalog scale of ~100–300 items; revisit with a dedicated search service like Meilisearch/Typesense only if catalog exceeds ~5,000 items).
- **Data flow:** `<DocumentCatalogPage>` is a Server Component reading `searchParams`, calling `searchDocumentTypes()` (see [02-api-server-actions.md §3.3](02-api-server-actions.md#33-get-apiv1documentssearch)) server-side for the initial paint (no client-side loading flash on first load), then `<FacetSidebar>`/`<ResultsPanel>` hydrate as a client boundary that re-fetches `/api/v1/documents/search` via `fetch` + `router.replace` (shallow) on every facet change, debounced 250ms for the price slider.
- **`QuickQuoteModal` flow:** Opens pre-scoped to the clicked `DocumentType`, reuses the same `QuoteEstimatorWidget` internals as the homepage hero (shared component, different container) — calls `/api/v1/quotes/calculate` immediately with sensible defaults (`STANDARD` tier, `STANDARD_24H` turnaround) so the user sees a real number before touching a single input, then lets them adjust tier/turnaround/word-count inline.
- **Validation:** All facet params parsed through `DocumentSearchQuerySchema` (Zod) server-side; malformed/out-of-range values (e.g., `minPrice > maxPrice`) are silently clamped/swapped rather than erroring, since these arise from normal slider interaction edge cases, not malicious input.

## 6. Machine-Readability & `/llms.txt` Map

```
## Document Pricing Catalog
- [Document Catalog](https://jusor.com/en/documents): Filterable pricing catalog for 100+ certified document translation types.
- Structured data: https://jusor.com/api/v1/documents/search (supports category, languagePair, authority, price, and turnaround filters as query params — clean JSON, no auth required)
```
The `/api/v1/documents/search` endpoint's response schema is documented inline via a `GET /api/v1/documents/search?help=1` mode returning an OpenAPI-fragment JSON description of accepted params — giving LLM agents a machine-discoverable way to construct valid faceted queries without out-of-band documentation.
