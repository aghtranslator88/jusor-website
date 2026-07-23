import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { DocumentCatalog } from "@/components/documents/DocumentCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Documents" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `/${locale}/documents` },
  };
}

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Documents" });

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-display-lg font-extrabold text-slate-900">{t("title")}</h1>
        <p data-answer-block className="mt-4 text-body-lg text-slate-600">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-12">
        <DocumentCatalog />
      </div>
    </main>
  );
}
