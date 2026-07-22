import { useLocale, useTranslations } from "next-intl";
import type { DocumentType } from "@/content/legal-translation";

export function PricingTierTable({ document }: { document: DocumentType }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("LegalTranslation");

  const tiers = [
    {
      key: "standard",
      label: { en: "Standard", ar: "قياسية" },
      price: document.basePrice,
      turnaround: document.avgTurnaroundHours,
      highlight: false,
    },
    {
      key: "certified",
      label: { en: "Certified", ar: "معتمدة" },
      price: Math.round(document.basePrice * 1.4),
      turnaround: document.avgTurnaroundHours,
      highlight: true,
    },
    {
      key: "express",
      label: { en: "Express Certified", ar: "معتمدة عاجلة" },
      price: Math.round(document.basePrice * 1.4 * 1.5),
      turnaround: Math.max(4, Math.round(document.avgTurnaroundHours / 3)),
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.key}
          className={`rounded-xl border p-5 ${
            tier.highlight ? "border-accent-500 ring-2 ring-accent-500" : "border-slate-200"
          } bg-white`}
        >
          {tier.highlight && (
            <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-caption font-semibold text-accent-600">
              {locale === "ar" ? "الأكثر طلباً" : "Most Popular"}
            </span>
          )}
          <p className="mt-2 text-h3 font-semibold text-slate-900">{tier.label[locale] ?? tier.label.en}</p>
          <p className="mt-2 text-display-lg font-extrabold text-primary-600">${tier.price}</p>
          <p className="mt-1 text-caption text-slate-500">
            {t("turnaround", { hours: tier.turnaround })}
          </p>
        </div>
      ))}
    </div>
  );
}
