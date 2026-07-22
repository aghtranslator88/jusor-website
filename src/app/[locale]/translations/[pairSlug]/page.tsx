import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Users } from "lucide-react";
import { languagePairs, getLanguagePairBySlug } from "@/content/legal-translation";
import { documentTypes } from "@/content/legal-translation";
import { DocumentTypeGrid } from "@/components/legal-translation/DocumentTypeGrid";

type Locale = "en" | "ar";

export function generateStaticParams() {
  return languagePairs.map((p) => ({ pairSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pairSlug: string }>;
}): Promise<Metadata> {
  const { locale, pairSlug } = await params;
  const pair = getLanguagePairBySlug(pairSlug);
  if (!pair) return {};
  const l = locale as Locale;
  const title = `${pair.sourceName[l] ?? pair.sourceName.en} → ${pair.targetName[l] ?? pair.targetName.en}`;

  return {
    title,
    description: pair.definitionBlock[l] ?? pair.definitionBlock.en,
    alternates: { canonical: `/${locale}/translations/${pairSlug}` },
  };
}

export default async function LanguagePairPage({
  params,
}: {
  params: Promise<{ locale: string; pairSlug: string }>;
}) {
  const { locale, pairSlug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const pair = getLanguagePairBySlug(pairSlug);
  if (!pair) notFound();

  const t = await getTranslations({ locale, namespace: "LegalTranslation" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${t("pairsFor")} ${pair.sourceName[l]}–${pair.targetName[l]}`,
    provider: { "@type": "Organization", name: "JUSOR" },
    availableLanguage: [pair.sourceCode, pair.targetCode],
    url: `${siteUrl}/${locale}/translations/${pairSlug}`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-primary-50 px-5 py-2.5 text-h3 font-semibold text-primary-700">
          {pair.sourceName[l] ?? pair.sourceName.en}
        </span>
        <ArrowRight className="size-6 text-accent-500 rtl:rotate-180" aria-hidden />
        <span className="rounded-full bg-primary-50 px-5 py-2.5 text-h3 font-semibold text-primary-700">
          {pair.targetName[l] ?? pair.targetName.en}
        </span>
      </div>

      <h1 className="mt-6 text-display-lg font-extrabold text-slate-900">
        {t("pairsFor")} {pair.sourceName[l]}–{pair.targetName[l]}
      </h1>

      <div data-answer-block className="mx-auto mt-6 max-w-2xl rounded-e-lg border-s-4 border-primary-600 bg-primary-50 p-5 text-start text-body-lg text-slate-700">
        {pair.definitionBlock[l] ?? pair.definitionBlock.en}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-body text-slate-600">
        <Users className="size-4 text-primary-500" aria-hidden />
        {t("translatorPool", { count: pair.translatorPoolSize })}
      </div>

      <section className="mt-12 text-start">
        <h2 className="text-center text-h2 font-bold text-slate-900">{t("documentsTitle")}</h2>
        <div className="mt-6">
          <DocumentTypeGrid documents={documentTypes} />
        </div>
      </section>

      <Link
        href="/quotes/submit"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
      >
        {t("getQuote")}
        <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
      </Link>
    </main>
  );
}
