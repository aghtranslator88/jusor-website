import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Landmark, Gavel, Globe2, GraduationCap, ShieldCheck } from "lucide-react";
import type { Authority } from "@/content/legal-translation";
import { getRequirementsForAuthority } from "@/content/legal-translation";
import { RequirementsChecklist } from "./RequirementsChecklist";

type Locale = "en" | "ar";

const TYPE_ICON = {
  EMBASSY: Globe2,
  MINISTRY: Landmark,
  COURT: Gavel,
  UNIVERSITY: GraduationCap,
  IMMIGRATION_OFFICE: ShieldCheck,
} as const;

export async function AuthorityDetailPage({
  authority,
  locale,
}: {
  authority: Authority;
  locale: string;
}) {
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "LegalTranslation" });
  const requirements = getRequirementsForAuthority(authority.slug);
  const Icon = TYPE_ICON[authority.type];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <nav className="flex items-center gap-1.5 text-caption text-slate-500">
        <Link href="/legal-translation" className="hover:text-primary-600">
          {t("hubTitle")}
        </Link>
        <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden />
        <span className="truncate text-slate-700">{authority.name[l] ?? authority.name.en}</span>
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-50">
          <Icon className="size-7 text-primary-600" aria-hidden />
        </div>
        <h1 className="text-display-lg font-extrabold text-slate-900">
          {authority.name[l] ?? authority.name.en}
        </h1>
      </div>

      <div data-answer-block className="mt-6 rounded-e-lg border-s-4 border-primary-600 bg-primary-50 p-5 text-body-lg text-slate-700">
        {authority.definitionBlock[l] ?? authority.definitionBlock.en}
      </div>

      {requirements.length > 0 && (
        <section className="mt-10">
          <h2 className="text-h2 font-bold text-slate-900">{t("requirementsTitle")}</h2>
          <div className="mt-5">
            <RequirementsChecklist requirements={requirements} />
          </div>
        </section>
      )}

      {authority.relatedArticleSlug && (
        <Link
          href={`/knowledge/${authority.relatedArticleSlug}`}
          className="mt-8 inline-flex items-center text-body font-semibold text-primary-600 hover:underline"
        >
          {t("relatedReading")} →
        </Link>
      )}
    </main>
  );
}
