# Hub Spec: Interpretation & Equipment Rental (`/[locale]/interpretation/**`, `/[locale]/equipment/**`)

## Route Map

```
/[locale]/interpretation                          (hub index — mode comparison)
/[locale]/interpretation/[mode]                    e.g. /interpretation/simultaneous
/[locale]/equipment                                (catalog index)
/[locale]/equipment/[categorySlug]                 e.g. /equipment/booths
/[locale]/equipment/[categorySlug]/[itemSlug]       e.g. /equipment/headsets/hd-pro-receiver-x2
```

---

## A. Interpretation Request Modules (`/interpretation/[mode]`)

### 1. Purpose & UX Rationale

Event organizers booking interpretation are typically planning weeks ahead for a specific event with a fixed date — the page must function like an event-booking form, not a lead-gen contact form. Distinct sub-pages per `InterpretationMode` (Simultaneous, Consecutive, Court, Remote/Zoom-Teams) let SEO capture mode-specific intent while sharing one booking form component.

### 2. Component Hierarchy

```
app/[locale]/interpretation/[mode]/page.tsx
└── <InterpretationModePage>
    ├── <ModeHeroSection>                   (definition-lead, mode-specific illustration: booth icon for Simultaneous, handshake for Consecutive, gavel for Court, webcam for Remote)
    ├── <WhenToUseThisMode>                 (comparison callout: "Simultaneous vs Consecutive — which do I need?")
    ├── <InterpretationRequestForm>          (client component — see §5)
    │   ├── <ModeConfirmSelect />           (pre-filled from route, editable)
    │   ├── <LanguagePairsMultiSelect />
    │   ├── <EventDateTimePicker />
    │   ├── <DurationInput />
    │   ├── <VenueTypeToggle />              (On-site city input / Remote platform select)
    │   └── <SubmitRequestButton />
    ├── <EquipmentCrossSell>                 (shown only for SIMULTANEOUS/COURT — "This mode typically requires booth + receivers")
    ├── <InterpreterVettingSection>          (E-E-A-T: certification, court-registration credentials)
    └── <FAQAccordion />
```

### 3. SEO, GEO & AEO Directives

- **Target intent:** "simultaneous interpretation services", "book a court interpreter", "remote interpretation for Zoom meetings", "consecutive vs simultaneous interpretation"
- **Definition-Lead Block** (per mode, example — Simultaneous):
  > Simultaneous interpretation is real-time spoken translation delivered as the speaker talks, typically using a soundproof booth, microphone, and wireless receivers for the audience. JUSOR provides ISO 2603-compliant simultaneous interpretation for conferences, summits, and multilingual events, with certified interpreters and full booth/audio equipment rental available in the same booking.
- **AEO conversational H2s:** "When should I use simultaneous instead of consecutive interpretation?", "Do I need a booth for simultaneous interpretation?"
- **JSON-LD:** `Service` (`serviceType: "Interpretation"`) + `HowTo` schema for the "when to use this mode" comparison section (steps: define audience size → define event pace → select mode), improving eligibility for AI Overview how-to panels.

### 4. Front-End UI/UX Specification

- **Tokens:** `ModeHeroSection` icon badge in `bg-primary-600` circle, `text-white`, 64px. `WhenToUseThisMode` renders as a 2-column comparison card (`this mode` vs `alternative mode`) with the recommended mode highlighted via `ring-2 ring-accent-500`.
- **Motion:** `EventDateTimePicker` and `DurationInput` use inline validation with a shake micro-interaction (`x: [0, -4, 4, -4, 0]`, 300ms) on invalid submission attempt rather than a jarring red border pop.
- **Responsive:** Mobile — `InterpretationRequestForm` is a single-column vertical form with a sticky-bottom submit bar; Desktop — 2-column layout (form left, `EquipmentCrossSell` + `InterpreterVettingSection` sticky right rail).
- **RTL/LTR:** `EventDateTimePicker` calendar grid mirrors correctly via the underlying date-picker library's built-in RTL support (shadcn `Calendar` on top of `react-day-picker`, which respects `dir` context); numeral formatting follows the locale's `Intl.NumberFormat` per the design-system numeral rule.

### 5. Back-End & Database Integration

- **Models:** `InterpretationRequest` (see [01-database-schema.prisma](01-database-schema.prisma)).
- **Data flow:** `InterpretationRequestForm` submits via the `requestInterpretationAction` Server Action, validated against `InterpretationRequestSchema` (Zod, see [02-api-server-actions.md](02-api-server-actions.md#3-zod-schemas)), creating an `InterpretationRequest` row with `status: REQUESTED`. No payment is collected at this stage — interpretation is quoted manually by a Project Manager post-submission (event-specific staffing/travel costs make automated pricing unreliable), so the action triggers an internal Slack/email notification to the PM queue rather than an `Order`.
- **Validation:** `eventDate` must be ≥ 48 hours in the future (`refine` check) with a distinct "urgent booking" banner + phone-call CTA shown client-side when a user attempts to select a sooner date, rather than a hard block (avoids losing genuinely urgent leads).

### 6. Machine-Readability

`/llms.txt` lists all four modes under `## Interpretation Services`; `GET /api/v1/interpretation/modes` returns clean JSON definitions for each mode (used both for LLM ingestion and to drive the `WhenToUseThisMode` comparison copy from a single source of truth, avoiding drift between the API description and on-page text).

---

## B. Equipment Rental Catalog (`/equipment/[categorySlug]` and `/equipment/[categorySlug]/[itemSlug]`)

### 1. Purpose & UX Rationale

This sub-hub behaves like a B2B equipment rental storefront (spec-sheet heavy, quantity-based booking) rather than a translation service page — the target user is an event AV coordinator comparing technical specifications (frequency range, battery life, channel count) before committing to a rental quantity and date range.

### 2. Component Hierarchy — Category Index

```
app/[locale]/equipment/[categorySlug]/page.tsx
└── <EquipmentCategoryPage>
    ├── <CategoryHeroBanner />
    ├── <EquipmentFilterBar>                (stock availability toggle, sort by dailyRate)
    ├── <EquipmentGrid>
    │   └── <EquipmentCard /> × N            (thumbnail, name, key spec highlight, dailyRate, "Add to Booking")
    └── <BookingCartDrawer>                  (persistent slide-over — accumulates lines across categories)
```

### 3. Component Hierarchy — Item Detail

```
app/[locale]/equipment/[categorySlug]/[itemSlug]/page.tsx
└── <EquipmentDetailPage>
    ├── <EquipmentGallery />
    ├── <SpecificationTable>                 (from EquipmentItem.specifications Json — label/value rows)
    ├── <QuantityStepper />
    ├── <DateRangePicker />                  (shared component with InterpretationRequestForm's date picker)
    ├── <AddToBookingButton />
    ├── <CompatibleEquipmentGrid>             (e.g. Booth detail page cross-sells Headsets, Receivers)
    └── <FAQAccordion />
```

### 4. SEO, GEO & AEO Directives

- **Target intent:** "interpretation booth rental", "wireless tour guide receiver rental", "conference headset rental with specs"
- **Definition-Lead Block** (per `EquipmentItem`):
  > The {{itemName}} is a {{category}} used for professional interpretation and conference audio delivery, rented by JUSOR for events of any scale. Specifications include {{topSpecHighlight}}, available for daily rental starting at ${{dailyRate}}/day with delivery and technical setup included in major metro areas.
- **JSON-LD:** `Product` with full `additionalProperty` array mapped from `specifications` Json (PropertyValue pairs) — this is the most schema-rich page type on the site and a strong candidate for Google's Product rich results and shopping-style AI Overview cards.

### 5. Front-End UI/UX Specification

- **Tokens:** `SpecificationTable` uses alternating `bg-slate-50`/`bg-white` rows, `text-caption` labels in `text-slate-500`, values in `text-slate-900 font-medium`. `BookingCartDrawer` badge count uses `bg-accent-500` pill.
- **Motion:** `AddToBookingButton` triggers a "fly to cart" micro-interaction — a cloned thumbnail element animates via Framer Motion `layoutId` shared-element transition into the `BookingCartDrawer` trigger icon (250ms), then the drawer badge count increments with a `count-up` pop (`scale: [1, 1.3, 1]`).
- **Responsive:** Mobile — `SpecificationTable` collapses long spec lists behind a "Show all specs" disclosure after 4 rows; `BookingCartDrawer` becomes a full-screen bottom sheet. Desktop — drawer is a fixed-width (400px) slide-over from the inline-end edge.
- **RTL/LTR:** `BookingCartDrawer` slides from `inset-inline-end` (logical), so it opens from the left in RTL and right in LTR automatically — implemented via shadcn `Sheet`'s `side="end"` (custom-extended prop, since Radix's default only accepts physical sides; wrapped in a `LogicalSheet` component that resolves `"start"|"end"` to `"left"|"right"` based on `dir` at render time).

### 6. Back-End & Database Integration

- **Models:** `EquipmentItem`, `EquipmentBooking`, `EquipmentBookingLine`.
- **Data flow:** `BookingCartDrawer` state held in a Zustand store (client-only, `persist` to `localStorage` so a cart survives navigation) accumulating `{ equipmentSlug, quantity }` lines. On checkout, submits to `submitEquipmentBookingAction` (Server Action) validated by `EquipmentBookingSchema`, creating `EquipmentBooking` + nested `EquipmentBookingLine[]` in one Prisma transaction (`db.$transaction`).
- **Stock check:** Server Action re-validates `stockQuantity` against overlapping-date bookings (a Prisma raw query checking `EquipmentBookingLine` joined to `EquipmentBooking` for date-range overlap on the same `equipmentItemId`) before confirming — returns a structured `{ error: "insufficient_stock", availableQuantity }` the client surfaces as an inline correction rather than a generic failure toast.
- **Validation:** `EquipmentBookingSchema.refine` enforces `endDate > startDate`; `quantity` capped at 200 per line as a sanity bound against bot abuse of the public booking form.

### 7. Machine-Readability

`GET /api/v1/equipment/search?category=booths` (same faceted-search pattern as the Document Catalog, see [07-catalog-documents-pricing.md](07-catalog-documents-pricing.md)) exposes clean JSON for LLM/RAG price-comparison queries; `/llms.txt` links to this endpoint under `## Equipment Rental` rather than listing every SKU.
