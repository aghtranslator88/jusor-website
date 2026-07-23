import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import { Globe2, Landmark, Gavel, GraduationCap, ArrowRight } from "lucide-react";
import { authorities, documentTypes, languagePairs } from "@/content/legal-translation";
import { DocumentTypeGrid } from "@/components/legal-translation/DocumentTypeGrid";

type Locale = "en" | "ar";

const TYPE_ICON = {
  EMBASSY: Globe2,
  MINISTRY: Landmark,
  COURT: Gavel,
  UNIVERSITY: GraduationCap,
  IMMIGRATION_OFFICE: Landmark,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegalTranslation" });

  return {
    title: t("hubTitle"),
    description: t("hubSubtitle"),
    alternates: getAlternates(locale, "/legal-translation"),
  };
}

export default async function LegalTranslationHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "LegalTranslation" });

  const embassies = authorities.filter((a) => a.type === "EMBASSY");
  const govAuthorities = authorities.filter((a) => a.type !== "EMBASSY");

  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display-lg font-extrabold text-white">{t("hubTitle")}</h1>
          <p data-answer-block className="mt-6 text-body-lg text-primary-50/90">
            {t("hubSubtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-h2 font-bold text-slate-900">{t("embassiesTitle")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {embassies.map((authority) => {
            const Icon = TYPE_ICON[authority.type];
            return (
              <Link
                key={authority.slug}
                href={`/legal-translation/embassies/${authority.slug}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                  <Icon className="size-5 text-primary-600" aria-hidden />
                </div>
                <span className="text-body font-medium text-slate-800">
                  {authority.name[l] ?? authority.name.en}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-slate-900">{t("authoritiesTitle")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {govAuthorities.map((authority) => {
              const Icon = TYPE_ICON[authority.type];
              return (
                <Link
                  key={authority.slug}
                  href={`/legal-translation/authorities/${authority.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                    <Icon className="size-5 text-primary-600" aria-hidden />
                  </div>
                  <span className="text-body font-medium text-slate-800">
                    {authority.name[l] ?? authority.name.en}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-h2 font-bold text-slate-900">{t("documentsTitle")}</h2>
        <div className="mt-6">
          <DocumentTypeGrid documents={documentTypes} />
        </div>
      </section>

      <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-slate-900">{t("languagePairsTitle")}</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {languagePairs.map((pair) => (
              <Link
                key={pair.slug}
                href={`/translations/${pair.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-body text-slate-700 shadow-card transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                {pair.sourceName[l] ?? pair.sourceName.en}
                <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                {pair.targetName[l] ?? pair.targetName.en}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
