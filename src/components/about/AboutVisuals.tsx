// Branded SVG/CSS graphics standing in for real photography (see GEO brief
// §5.1: "if real photography is unavailable, generate clean branded SVG/CSS
// graphics rather than inserting stock placeholders"). Client photography
// should replace each of these when available.

// TODO: replace with client photography — abstract architectural detail of a
// Dubai/UAE government or courts building.
export function HeroPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="about-arch" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M0 80 V40 A40 40 0 0 1 80 40 V80"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#about-arch)" />
    </svg>
  );
}

// TODO: replace with client photography — a real (redacted) sealed and
// stamped translated document.
export function SealIllustration() {
  return (
    <svg
      viewBox="0 0 240 280"
      className="mx-auto h-auto w-full max-w-[220px]"
      role="img"
      aria-label=""
    >
      <rect x="10" y="10" width="200" height="260" rx="10" className="fill-white stroke-slate-200" strokeWidth="2" />
      {[40, 62, 84, 106, 128].map((y) => (
        <rect key={y} x="30" y={y} width={y === 128 ? 90 : 160} height="6" rx="3" className="fill-slate-200" />
      ))}
      <rect x="30" y="160" width="160" height="6" rx="3" className="fill-slate-200" />
      <rect x="30" y="182" width="120" height="6" rx="3" className="fill-slate-200" />
      <g transform="translate(150,190)">
        <circle r="46" className="fill-primary-50 stroke-primary-600" strokeWidth="3" />
        <circle r="36" className="fill-none stroke-primary-600" strokeWidth="1.5" strokeDasharray="4 3" />
        <path
          d="M-14 0 L-4 10 L16 -12"
          className="stroke-primary-700"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

// TODO: replace with client photography — the real office or translators at
// work.
export function OfficeIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="mx-auto h-auto w-full max-w-md"
      role="img"
      aria-label=""
    >
      <rect x="0" y="0" width="320" height="220" rx="16" className="fill-primary-50" />
      <rect x="40" y="120" width="240" height="14" rx="7" className="fill-primary-200" />
      <rect x="60" y="60" width="90" height="60" rx="8" className="fill-white stroke-primary-200" strokeWidth="2" />
      <rect x="170" y="40" width="90" height="80" rx="8" className="fill-white stroke-primary-200" strokeWidth="2" />
      <rect x="80" y="76" width="50" height="6" rx="3" className="fill-slate-200" />
      <rect x="80" y="90" width="35" height="6" rx="3" className="fill-slate-200" />
      <rect x="190" y="56" width="50" height="6" rx="3" className="fill-slate-200" />
      <rect x="190" y="70" width="50" height="6" rx="3" className="fill-slate-200" />
      <rect x="190" y="84" width="30" height="6" rx="3" className="fill-slate-200" />
      <circle cx="105" cy="150" r="10" className="fill-accent-400" />
      <circle cx="215" cy="150" r="10" className="fill-primary-500" />
    </svg>
  );
}
