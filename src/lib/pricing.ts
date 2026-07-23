// Client-side pricing calculator mirroring the engine specced in
// docs/spec/02-api-server-actions.md §3.1 (POST /api/v1/quotes/calculate).
// Runs entirely in the browser for now since no live database/API is
// connected — see docs/spec/03-page-home.md for the server-side version
// this will be replaced by once Prisma is wired to a real Postgres instance.

export type ServiceTier = "STANDARD" | "PROFESSIONAL" | "CERTIFIED" | "SWORN_LEGAL";
export type TurnaroundSpeed = "ECONOMY_72H" | "STANDARD_24H" | "EXPRESS_12H" | "URGENT_4H";

const TIER_MULTIPLIER: Record<ServiceTier, number> = {
  STANDARD: 1.0,
  PROFESSIONAL: 1.35,
  CERTIFIED: 1.6,
  SWORN_LEGAL: 2.1,
};

const TURNAROUND_MULTIPLIER: Record<TurnaroundSpeed, number> = {
  ECONOMY_72H: 0.9,
  STANDARD_24H: 1.0,
  EXPRESS_12H: 1.4,
  URGENT_4H: 1.9,
};

const TURNAROUND_HOURS: Record<TurnaroundSpeed, number> = {
  ECONOMY_72H: 72,
  STANDARD_24H: 24,
  EXPRESS_12H: 12,
  URGENT_4H: 4,
};

const CERTIFICATION_FEE = 15;

export type PriceBreakdown = {
  subtotal: number;
  rushFee: number;
  certificationFee: number;
  total: number;
  estimatedDeliveryHours: number;
};

export function calculateQuotePrice({
  basePrice,
  tier,
  turnaround,
}: {
  basePrice: number;
  tier: ServiceTier;
  turnaround: TurnaroundSpeed;
}): PriceBreakdown {
  const tierAdjusted = basePrice * TIER_MULTIPLIER[tier];
  const turnaroundMultiplier = TURNAROUND_MULTIPLIER[turnaround];
  const rushFee = Math.max(0, tierAdjusted * (turnaroundMultiplier - 1));
  const certificationFee = tier === "CERTIFIED" || tier === "SWORN_LEGAL" ? CERTIFICATION_FEE : 0;
  const subtotal = Math.round(tierAdjusted * 100) / 100;
  const total = Math.round((subtotal + rushFee + certificationFee) * 100) / 100;

  return {
    subtotal,
    rushFee: Math.round(rushFee * 100) / 100,
    certificationFee,
    total,
    estimatedDeliveryHours: TURNAROUND_HOURS[turnaround],
  };
}
