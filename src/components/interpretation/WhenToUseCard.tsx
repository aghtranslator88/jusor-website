import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { InterpretationMode } from "@/content/interpretation";
import { getInterpretationModeBySlug } from "@/content/interpretation";

export function WhenToUseCard({ mode }: { mode: InterpretationMode }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("Interpretation");
  const alternative = mode.alternativeSlug ? getInterpretationModeBySlug(mode.alternativeSlug) : undefined;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-h3 font-semibold text-slate-900">{t("whenToUseTitle")}</h3>
      <ul className="mt-4 space-y-3">
        {mode.whenToUse.map((item) => (
          <li key={item[locale] ?? item.en} className="flex items-start gap-2.5 text-body text-slate-700">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <span>{item[locale] ?? item.en}</span>
          </li>
        ))}
      </ul>

      {alternative && mode.alternativeReason && (
        <div className="mt-5 rounded-lg bg-slate-50 p-4">
          <p className="text-caption font-semibold text-slate-500">{t("alternativeSuggestion")}</p>
          <p className="mt-1 text-body text-slate-600">{mode.alternativeReason[locale] ?? mode.alternativeReason.en}</p>
          <Link
            href={`/interpretation/${alternative.slug}`}
            className="mt-2 inline-flex items-center gap-1 text-body font-semibold text-primary-600 hover:underline"
          >
            {alternative.name[locale] ?? alternative.name.en}
            <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
