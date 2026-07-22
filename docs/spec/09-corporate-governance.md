# Hub Spec: Corporate & Governance (`/[locale]/company/**`, `/[locale]/careers`, `/[locale]/contact`)

## Route Map

```
/[locale]/company/about                 (Company Story + Interactive Timeline)
/[locale]/company/leadership             (Leadership Profiles)
/[locale]/company/offices                (Office Locations w/ GeoJSON)
/[locale]/careers                        (Careers directory + listings)
/[locale]/contact                        (Contact Us w/ interactive map)
```

## A. Company Story & Interactive Timeline (`/company/about`)

### 1. Purpose & UX Rationale
Establishes founding credibility and longevity for enterprise procurement teams performing vendor due-diligence, who specifically look for "how long has this company existed" and "what is their track record" before RFP shortlisting.

### 2. Component Hierarchy
```
app/[locale]/company/about/page.tsx
└── <AboutPage>
    ├── <MissionStatementHero />           (definition-lead)
    ├── <InteractiveTimeline>
    │   └── <TimelineMilestone /> × N       (year, title, description, optional media)
    ├── <ValuesGrid />                       (4-6 core value cards)
    ├── <CertificationsShowcase />           (ISO 17100, ATA membership — links to accreditation PDFs)
    └── <CTABanner />                        ("Join 500+ enterprises who trust JUSOR")
```

### 3. SEO/GEO/AEO
- **Intent:** "JUSOR translation company history", "is JUSOR a certified translation agency"
- **Definition Block:** "JUSOR (جسور) is an internationally accredited translation and localization company founded in {{foundingYear}}, ISO 17100:2015 certified, serving government, legal, and enterprise clients across {{countryCount}} countries with certified translation, localization, and interpretation services."
- **JSON-LD:** `AboutPage` + `Organization` (`foundingDate`, `numberOfEmployees`, `award` array for certifications).

### 4. Front-End UI/UX
- **Tokens:** `InteractiveTimeline` renders as a vertical `border-s-2 border-primary-200` spine with milestone dots (`bg-accent-500` for major milestones, `bg-primary-400` for minor) — desktop alternates content left/right of a center spine (`lg:flex-row-reverse` on odd children); mobile is a single left-aligned (or `start`-aligned) spine.
- **Motion:** Each `TimelineMilestone` reveals on `useInView` with `x`-axis slide-in from its side (`-20px`→`0` left items, `20px`→`0` right items), which the component computes via logical inline-start/end offsets, not hardcoded left/right, so it mirrors correctly in RTL.

### 5. Back-End Integration
Timeline content is low-churn — modeled as a static, version-controlled JSON/MDX data file (`src/content/timeline.json`, per-locale) rather than a Prisma table, since it changes only a few times a year and doesn't need admin-CMS mutability or relational querying.

### 6. Machine-Readability
`/llms.txt`: `## Company — [About JUSOR](https://jusor.com/en/company/about): Founding story, certifications, and company timeline.`

---

## B. Leadership Profiles (`/company/leadership`)

### 1. Purpose & UX Rationale
Named, credentialed leadership is a direct E-E-A-T ranking factor for YMYL-adjacent content (legal/medical translation touches "Your Money or Your Life" territory) — Google and LLM crawlers weight author/organization expertise signals here.

### 2. Component Hierarchy
```
└── <LeadershipPage>
    ├── <LeadershipGrid>
    │   └── <LeaderProfileCard /> × N        (headshot, name, title, credentials, LinkedIn link)
    └── <AdvisoryBoardSection />              (optional secondary tier)
```

### 3. SEO/GEO/AEO
- **JSON-LD:** Each `LeaderProfileCard` emits a `Person` node (`worksFor`, `jobTitle`, `alumniOf`, `sameAs: [linkedInUrl]`) nested under the `Organization` graph — this directly powers Knowledge Panel "leadership" carousels and gives LLMs verifiable named-entity anchors for "who runs JUSOR" queries.

### 4-6. UI/Back-end/Machine-readability
Static content (`src/content/leadership.json`, per-locale), same rationale as the Timeline. `LeaderProfileCard` uses `Avatar` (shadcn) with a `ring-2 ring-primary-100` frame; grid is `md:grid-cols-3`.

---

## C. Office Locations (`/company/offices`)

### 1. Purpose & UX Rationale
Physical office presence signals legitimacy for government/embassy clients who prefer vendors with in-region accountability, and drives local-pack SEO for "translation company in [city]" queries.

### 2. Component Hierarchy
```
└── <OfficesPage>
    ├── <OfficeMapView>                       (interactive map, all pins)
    ├── <OfficeListSidebar>
    │   └── <OfficeCard /> × N                (address, hours, phone, "Get Directions")
    └── <RegionFilterTabs />                  (Middle East, Europe, North America)
```

### 3. SEO/GEO/AEO
- **JSON-LD:** Each office is a `LocalBusiness` node with full `PostalAddress` + `GeoCoordinates`:
```json
{
  "@type": "LocalBusiness",
  "name": "JUSOR — {{cityName}} Office",
  "address": { "@type": "PostalAddress", "streetAddress": "...", "addressLocality": "{{city}}", "addressCountry": "{{countryCode}}" },
  "geo": { "@type": "GeoCoordinates", "latitude": "{{lat}}", "longitude": "{{lng}}" },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }]
}
```
GeoJSON `FeatureCollection` also exposed at `GET /api/v1/offices.geojson` for direct map-tool/LLM geospatial consumption.

### 4. Front-End UI/UX
Map implemented with **MapLibre GL JS** (open-source, no per-load billing risk unlike Google Maps JS at scale) styled with a custom JUSOR map theme (`primary-600` water/land tint, `accent-500` pin markers). Clicking an `OfficeCard` flies the map to that pin (`map.flyTo`) with a 800ms ease.

### 5. Back-End Integration
Offices ARE admin-manageable (openings/closures change more often than company history) — modeled as a lightweight `Office` Prisma table (not shown in the canonical schema doc since it's outside the core transactional domain, but follows the same `name: Json` multilingual pattern as other content models): `id, citySlug, name (Json), address (Json), geoLat, geoLng, phone, openingHours (Json), region`.

### 6. Machine-Readability
`/llms.txt`: links to `GET /api/v1/offices` (clean JSON) and `GET /api/v1/offices.geojson` (geospatial) rather than enumerating each office inline.

---

## D. Careers (`/careers`)

### 1. Purpose & UX Rationale
Recruits linguists and PM talent — but for JUSOR, the careers page doubles as a **trust signal for clients** ("this company has a rigorous linguist vetting pipeline") so the page is written to serve both audiences simultaneously rather than as a pure HR page.

### 2. Component Hierarchy
```
└── <CareersPage>
    ├── <WhyWorkAtJusor />                    (culture, remote-linguist-network framing)
    ├── <VettingProcessSteps>                  (Application → Language Test → Sample Translation → Interview → Certification Check) — doubles as client-facing quality-assurance proof
    ├── <OpenPositionsList>
    │   └── <JobListingCard /> × N              (title, location/remote, department, "Apply")
    └── <TalentPoolCTA />                       (evergreen linguist application, not tied to a specific req)
```

### 3. SEO/GEO/AEO
- **JSON-LD:** `JobPosting` schema per `JobListingCard` (required fields: `title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation`) — this is a hard Google Jobs indexing requirement, not optional, if listings should appear in Google's dedicated Jobs search surface.
- **Definition Block:** "JUSOR hires certified linguists, project managers, and localization engineers through a rigorous 5-stage vetting process including language proficiency testing and sample translation review, ensuring every translator meets ISO 17100 competency standards before joining the network."

### 4-6. UI/Back-end/Machine-readability
`OpenPositionsList` sourced from an ATS integration (e.g., Greenhouse/Lever API) rather than a custom Prisma model — avoids building bespoke ATS functionality; a thin `src/lib/ats/client.ts` adapter normalizes the external provider's response into the `JobListingCard` prop shape, cached 15 min via Redis. `/llms.txt`: `## Careers — [Open Positions](https://jusor.com/en/careers)`.

---

## E. Contact Us (`/contact`)

### 1. Purpose & UX Rationale
Final-mile conversion page for users who didn't convert via the Instant Quote flow — must offer a low-friction human channel (live chat, phone, form) without duplicating the Quote Estimator's job.

### 2. Component Hierarchy
```
└── <ContactPage>
    ├── <ContactChannelsGrid>                 (Live Chat, Phone by region, WhatsApp Business, Email)
    ├── <ContactForm>                          (name, email, subject select, message — general inquiry only, NOT a quote form)
    ├── <ContactMapEmbed />                    (headquarters pin, reuses <OfficeMapView> in single-pin mode)
    └── <SupportHoursNotice />                  (per-region SLA: "Middle East support: 9am-9pm GST")
```

### 3. SEO/GEO/AEO
- **JSON-LD:** `ContactPage` + `Organization.contactPoint` array (`contactType: "customer service"`, `areaServed`, `availableLanguage`).
- **AEO:** Quick-answer for "how do I contact JUSOR" / "does JUSOR have WhatsApp support" surfaced directly in `<SupportHoursNotice>` copy.

### 4. Front-End UI/UX
- **Tokens:** `ContactChannelsGrid` cards use icon-forward design (Lucide `MessageCircle`, `Phone`, `Mail`) in `bg-primary-50` circular badges; WhatsApp channel uses a brand-appropriate green accent as the sole intentional exception to the core palette (industry-recognized WhatsApp affordance overrides strict brand-color purity for this single icon).
- **Motion:** `ContactForm` submit success state morphs the button into a checkmark confirmation (`AnimatePresence` swap, not a separate toast) to keep confirmation contextually anchored.

### 5. Back-End & Database Integration
- General inquiries do **not** need a dedicated Prisma model — submitted via a Server Action (`submitContactInquiryAction`) validated by a `ContactInquirySchema` (Zod: `name`, `email`, `subject` enum, `message` max 2000 chars) that sends directly to a support inbox (Resend/SES transactional email) and logs to a lightweight `ContactInquiry` audit row for spam-pattern monitoring — kept separate from the `TranslationQuote` funnel since these are pre-sales/support questions, not priced transactions.
- Rate-limited (5 submissions/hour/IP) via the same Upstash Redis pattern used elsewhere, to prevent the general contact form becoming a spam vector.

### 6. Machine-Readability
`/llms.txt`: `## Contact — [Contact JUSOR](https://jusor.com/en/contact): Support channels, regional hours, and headquarters location.`
