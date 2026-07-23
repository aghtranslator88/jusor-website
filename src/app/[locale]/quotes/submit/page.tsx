import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";
import { QuoteEstimatorForm } from "@/components/quotes/QuoteEstimatorForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Quote" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getAlternates(locale, "/quotes/submit"),
  };
}

export default async function QuoteSubmitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Quote" });

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <div className="text-center">
        <h1 className="text-display-lg font-extrabold text-slate-900">{t("title")}</h1>
        <p data-answer-block className="mx-auto mt-4 max-w-2xl text-body-lg text-slate-600">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12">
        <QuoteEstimatorForm />
      </div>
    </main>
  );
}
