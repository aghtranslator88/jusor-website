import { useLocale, useTranslations } from "next-intl";
import type { DocumentType } from "@/content/legal-translation";

export function PricingTierTable({ document }: { document: DocumentType }) {
  const locale = useLocale();
  const t = useTranslations("LegalTranslation");

  const standardPrice = document.basePrice;
  const expressPrice = Math.round((standardPrice * 1.5) / 10) * 10;

  const tiers = [
    {
      key: "standard",
      label: t("standardTier"),
      price: standardPrice,
      turnaroundText: t("turnaround", { hours: 24 }),
      highlight: true,
    },
    {
      key: "express",
      label: t("expressTier"),
      price: expressPrice,
      turnaroundText: t("expressTurnaround"),
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tiers.map((tier) => (
        <div
          key={tier.key}
          className={`flex flex-col justify-between rounded-xl border p-6 ${
            tier.highlight ? "border-primary-600 ring-2 ring-primary-600/20" : "border-slate-200"
          } bg-white shadow-sm`}
        >
          <div>
            {tier.highlight && (
              <span className="rounded-full bg-primary-50 px-3 py-1 text-caption font-semibold text-primary-700">
                {locale === "ar" ? "الأكثر طلباً" : "Most Popular"}
              </span>
            )}
            <h3 className="mt-2 text-h3 font-bold text-slate-900">{tier.label}</h3>
            <p className="mt-3 text-display-md font-extrabold text-primary-600">
              {t("aedPrice", { price: tier.price })}
            </p>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-caption font-medium text-slate-600">
              ⚡ {tier.turnaroundText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
