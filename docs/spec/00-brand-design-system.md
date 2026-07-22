# JUSOR (جسور) — Brand & Design System Blueprint

> Canonical design-token source for every page spec in `/docs/spec`. All component specs reference these tokens by name — do not hardcode raw hex values in component code; consume them through Tailwind theme extension + CSS variables so dark-mode and RTL theming stay centralized.

## 1. Brand Rationale

JUSOR (جسور — "Bridges") positions the company as the connective infrastructure between languages, cultures, and legal systems. Every design decision reinforces three attributes:

| Attribute | Visual Expression |
|---|---|
| **Trust & Enterprise Authority** | Deep, saturated Primary Blue as the dominant chrome color; generous whitespace; serif-free geometric type for legal/government contexts |
| **Energy & Bridging Action** | Accent Orange reserved *exclusively* for conversion actions (CTAs, active states, progress indicators) — never decorative |
| **Speed & Precision** | Sharp 8px-grid spacing, snappy 150–250ms motion curves, no skeuomorphism |

## 2. Color Tokens

### 2.1 Core Palette (CSS Custom Properties)

```css
:root {
  /* Primary — Trust Blue */
  --color-primary-50:  #EBF3FA; /* = Secondary Soft Blue, doubles as primary-50 */
  --color-primary-100: #D3E4F3;
  --color-primary-200: #A7C9E7;
  --color-primary-300: #7BAEDB;
  --color-primary-400: #4F93CF;
  --color-primary-500: #2A72B0;
  --color-primary-600: #0F3D6C; /* BRAND PRIMARY */
  --color-primary-700: #0C3159;
  --color-primary-800: #092546;
  --color-primary-900: #061933;

  /* Accent — Action Orange */
  --color-accent-50:  #FDF0EA;
  --color-accent-100: #FBDCCC;
  --color-accent-200: #F5B899;
  --color-accent-300: #EF9366;
  --color-accent-400: #EA7A47;
  --color-accent-500: #E65A28; /* BRAND ACCENT */
  --color-accent-600: #C4471C;
  --color-accent-700: #9C3816;
  --color-accent-800: #742910;
  --color-accent-900: #4C1B0B;

  /* Neutral — Slate Scale */
  --color-slate-50:  #F8FAFC;
  --color-slate-100: #F1F5F9;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-400: #94A3B8;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1E293B;
  --color-slate-900: #0F172A;

  /* Semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-danger:  #DC2626;
  --color-info:    var(--color-primary-500);

  /* Surface */
  --surface-page: var(--color-slate-50);
  --surface-card: #FFFFFF;
  --surface-inverse: var(--color-primary-600);
}

:root[data-theme='dark'] {
  --surface-page: var(--color-slate-900);
  --surface-card: var(--color-slate-800);
  --color-primary-50: #0C2038; /* re-mapped for dark surfaces */
}
```

### 2.2 Tailwind Theme Extension (`tailwind.config.ts`)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--color-primary-50)", 100: "var(--color-primary-100)",
          200: "var(--color-primary-200)", 300: "var(--color-primary-300)",
          400: "var(--color-primary-400)", 500: "var(--color-primary-500)",
          600: "var(--color-primary-600)", 700: "var(--color-primary-700)",
          800: "var(--color-primary-800)", 900: "var(--color-primary-900)",
          DEFAULT: "var(--color-primary-600)",
        },
        accent: {
          50: "var(--color-accent-50)", 100: "var(--color-accent-100)",
          200: "var(--color-accent-200)", 300: "var(--color-accent-300)",
          400: "var(--color-accent-400)", 500: "var(--color-accent-500)",
          600: "var(--color-accent-600)", 700: "var(--color-accent-700)",
          800: "var(--color-accent-800)", 900: "var(--color-accent-900)",
          DEFAULT: "var(--color-accent-500)",
        },
        slate: {
          50: "var(--color-slate-50)", 100: "var(--color-slate-100)",
          200: "var(--color-slate-200)", 300: "var(--color-slate-300)",
          400: "var(--color-slate-400)", 500: "var(--color-slate-500)",
          600: "var(--color-slate-600)", 700: "var(--color-slate-700)",
          800: "var(--color-slate-800)", 900: "var(--color-slate-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem" },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 6px -1px rgb(15 23 42 / 0.06)",
        "card-hover": "0 8px 24px -4px rgb(15 61 108 / 0.16)",
        "cta-glow": "0 4px 14px 0 rgb(230 90 40 / 0.35)",
      },
      keyframes: {
        "count-up": { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "ticker-scroll": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        "count-up": "count-up 0.4s ease-out",
        "ticker-scroll": "ticker-scroll 32s linear infinite",
      },
    },
  },
};
export default config;
```

## 3. Typography System

| Context | Font Family | Source | Weight Usage |
|---|---|---|---|
| LTR body/UI (EN, FR, DE, ES, IT) | **Plus Jakarta Sans** | `next/font/google` variable font | 400 body, 500 UI labels, 600 subheads, 700–800 display |
| RTL body/UI (AR) | **Cairo** (primary), **Tajawal** (fallback for dense numeral-heavy tables) | `next/font/google`, self-hosted `.woff2` fallback for offline PDF generation | 400 body, 600 subheads, 700 display |

### 3.1 Font Loading (`app/fonts.ts`)

```ts
import { Plus_Jakarta_Sans, Cairo, Tajawal } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
  display: "swap",
});
```

Applied at the root layout via `dir`-aware class binding: `className={cn(jakarta.variable, cairo.variable, tajawal.variable, locale === "ar" ? "font-arabic" : "font-sans")}`.

### 3.2 Type Scale (fluid, `clamp()`-based)

| Token | Mobile (390px) | Desktop (1440px) | Usage |
|---|---|---|---|
| `text-display-xl` | 32px / 1.15 | 64px / 1.05 | Hero H1 |
| `text-display-lg` | 28px / 1.2 | 48px / 1.1 | Section H1 |
| `text-h2` | 24px / 1.25 | 36px / 1.2 | Section headers, AEO question headers |
| `text-h3` | 20px / 1.3 | 24px / 1.3 | Card titles, sub-questions |
| `text-body-lg` | 17px / 1.6 | 18px / 1.65 | Lead paragraphs, definition blocks |
| `text-body` | 15px / 1.6 | 16px / 1.65 | Default body |
| `text-caption` | 13px / 1.5 | 13px / 1.5 | Metadata, badges, timestamps |

## 4. Spacing, Radius & Elevation

- **Grid unit:** 4px base, 8px rhythm for section padding (`py-16 md:py-24` standard section block).
- **Container:** `max-w-7xl` (1280px) with `px-4 md:px-8` gutters; content-heavy pages (blog article, document detail) use `max-w-3xl` reading column.
- **Radius:** `rounded-xl` (14px) default card radius; `rounded-full` for badges/pills/avatars; `rounded-2xl` (20px) for hero media and modal sheets.
- **Elevation:** flat `shadow-card` at rest → `shadow-card-hover` + `-translate-y-1` on hover for interactive cards (150ms ease-out). CTAs use `shadow-cta-glow`.

## 5. Iconography & Imagery

- **Icon set:** Lucide Icons exclusively, 1.5px stroke, sized `20/24/32` per context. Custom brand glyphs (bridge motif) built as inline SVG components in `src/components/icons/brand/`.
- **Photography direction:** Real document/desk photography with a cool blue color grade (`#0F3D6C` duotone overlay at 8–12% opacity on hero imagery) to unify stock/photographed assets across locales.
- **Illustration:** Abstract "bridge/connection" line-art motif (linking two nodes) used as a background texture (10% opacity) on empty states and the Hero — never as a literal photo of a bridge (avoid cliché).

## 6. Motion Principles (Framer Motion)

| Principle | Spec |
|---|---|
| **Entrance** | `initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}` — staggered `0.06s` per sibling via `staggerChildren` |
| **Hover lift (cards)** | `whileHover={{ y: -4 }} transition={{ duration: 0.18 }}` paired with `shadow-card-hover` |
| **CTA press** | `whileTap={{ scale: 0.97 }}` |
| **Page transition** | Cross-fade 200ms on route change (App Router `template.tsx`), no slide (keeps RTL/LTR direction-neutral) |
| **Counters** | `useMotionValue` + `animate()` counting from 0 → target over 1.6s when section enters viewport (`useInView`, `once: true`) |
| **Reduced motion** | All animation variants wrapped with `useReducedMotion()` guard → falls back to opacity-only 0.15s fade |

## 7. RTL / LTR Internationalization Rules

- **Library:** `next-intl` with `[locale]` segment routing (`/en/...`, `/ar/...`, `/fr/...`, `/de/...`, `/es/...`, `/it/...`).
- **Direction:** `<html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>` set in root layout via `getLangDir` (from `rtl-detect` or `next-intl` locale metadata).
- **Logical properties only:** Tailwind logical utilities (`ps-4`/`pe-4`, `ms-auto`/`me-auto`, `start-0`/`end-0`) — physical `left-*`/`right-*`/`pl-*`/`pr-*` are **banned** in component code (enforced via ESLint custom rule `no-physical-tailwind`).
- **Iconography mirroring:** Directional icons (arrows, chevrons, "send") auto-flip via a `<DirectionalIcon>` wrapper that applies `scale-x-[-1]` when `dir === 'rtl'`; non-directional icons (document, clock, shield) never flip.
- **Numerals:** Arabic locale renders Western Arabic numerals (0–9) for prices/dates by default (Gulf commercial convention), with an optional Eastern Arabic-Indic numeral toggle in `/ar` footer for KSA/Gulf audiences — controlled by `numberingSystem: 'arab'` in `Intl.NumberFormat` when the toggle is active.
- **Font pairing switch:** handled automatically by the `font-sans`/`font-arabic` class on `<body>`, driven by `locale`.

## 8. Component Library Baseline

Built on **shadcn/ui** (Radix primitives + Tailwind), extended with JUSOR-specific composites:

- `Button` — variants: `primary` (accent-500 bg), `secondary` (primary-600 bg), `outline` (primary-600 border), `ghost`, `link`. Sizes: `sm/md/lg/xl`. All variants RTL-safe (icon slot uses `gap-2` + logical order).
- `Badge` — `certified` (primary-50 bg / primary-700 text + Lucide `ShieldCheck`), `express` (accent-50 bg / accent-600 text + Lucide `Zap`), `status-*` (success/warning/danger backgrounds at 10% opacity).
- `Card`, `Accordion` (AEO FAQ), `Tabs`, `Dialog`, `Sheet` (mobile filter drawer), `Combobox` (language picker, searchable), `DataTable` (admin + equipment specs), `Stepper` (quote wizard, translation workflow), `Tooltip`, `Toast` (Sonner).
- Custom: `<PriceBreakdown>`, `<TurnaroundBadge>`, `<LanguagePairSelector>`, `<FileDropzone>` (S3/R2 presigned upload), `<StatCounter>`, `<TrustBar>`.

## 9. Accessibility Baseline

- WCAG 2.2 AA contrast minimum: body text ≥ 4.5:1 (Primary-600 on white = 8.9:1 ✅; Accent-500 on white = 3.9:1 ⚠️ → accent text reserved for ≥18px/bold or paired with white-on-accent-500 button backgrounds, never small text-on-white).
- All interactive components keyboard-navigable via Radix's built-in focus management; visible focus ring: `focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2`.
- Form errors announced via `aria-live="polite"` region in all multi-step flows (Quote Estimator, Equipment Booking).

## 10. Figma Token Layout (Design ↔ Code Sync)

See [`10-system-architecture-summary.md`](10-system-architecture-summary.md#figma-tokens-layout) for the full Figma variable-collection structure that mirrors this file 1:1 (Tokens Studio export format, `tokens.json`).
