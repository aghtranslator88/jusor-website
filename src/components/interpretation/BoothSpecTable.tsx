import { useLocale, useTranslations } from "next-intl";
import { boothSpecifications } from "@/content/interpretation";

export function BoothSpecTable() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("Interpretation");

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <h3 className="border-b border-slate-200 px-5 py-4 text-h3 font-semibold text-slate-900">
        {t("specsTitle")}
      </h3>
      <dl>
        {boothSpecifications.map((spec, i) => (
          <div
            key={spec.key}
            className={`grid grid-cols-2 gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
          >
            <dt className="text-caption text-slate-500">{spec.label[locale] ?? spec.label.en}</dt>
            <dd className="text-body font-medium text-slate-900">{spec.value[locale] ?? spec.value.en}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
