import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/metadata";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import { ChevronRight, FileCheck2 } from "lucide-react";
import {
  documentTypes,
  getDocumentTypeBySlug,
  getAuthoritiesForDocument,
} from "@/content/legal-translation";
import { PricingTierTable } from "@/components/legal-translation/PricingTierTable";
import { ApplicableAuthoritiesList } from "@/components/legal-translation/ApplicableAuthoritiesList";

type Locale = "en" | "ar";

export function generateStaticParams() {
  return documentTypes.flatMap((d) =>
    routing.locales.map((locale) => ({ locale, documentSlug: d.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; documentSlug: string }>;
}): Promise<Metadata> {
  const { locale, documentSlug } = await params;
  const doc = getDocumentTypeBySlug(documentSlug);
  if (!doc) return {};
  const l = locale as Locale;

  return {
    title: doc.name[l] ?? doc.name.en,
    description: doc.description[l] ?? doc.description.en,
    alternates: getAlternates(locale, `/legal-translation/documents/${documentSlug}`),
  };
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; documentSlug: string }>;
}) {
  const { locale, documentSlug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const doc = getDocumentTypeBySlug(documentSlug);
  if (!doc) notFound();

  const t = await getTranslations({ locale, namespace: "LegalTranslation" });
  const applicableAuthorities = getAuthoritiesForDocument(documentSlug);
  const docName = doc.name[l] ?? doc.name.en ?? "";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const standardPrice = doc.basePrice;
  const expressPrice = Math.round((standardPrice * 1.5) / 10) * 10;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: docName,
        category: doc.category,
        offers: [
          {
            "@type": "Offer",
            name: "Standard",
            price: standardPrice,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Express",
            price: expressPrice,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("hubTitle"), item: `${siteUrl}/${locale}/legal-translation` },
          { "@type": "ListItem", position: 2, name: docName },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-1.5 text-caption text-slate-500">
        <Link href="/legal-translation" className="hover:text-primary-600">
          {t("hubTitle")}
        </Link>
        <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden />
        <span className="truncate text-slate-700">{docName}</span>
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-50">
          <FileCheck2 className="size-7 text-primary-600" aria-hidden />
        </div>
        <h1 className="text-display-lg font-extrabold text-slate-900">{docName}</h1>
      </div>

      <div data-answer-block className="mt-6 rounded-e-lg border-s-4 border-primary-600 bg-primary-50 p-5 text-body-lg text-slate-700">
        {doc.definitionBlock[l] ?? doc.definitionBlock.en}
      </div>

      <section className="mt-10">
        <PricingTierTable document={doc} />
      </section>

      <WhatsAppCTA variant="inline" documentName={docName} className="mt-10" />

      <section className="mt-10">
        <h2 className="text-h2 font-bold text-slate-900">
          {locale === "ar" ? "المستندات المطلوب رفعها" : "Required Uploads"}
        </h2>
        <ul className="mt-4 space-y-2 text-body text-slate-700">
          {doc.requiredUploads.map((upload) => (
            <li key={upload.key} className="flex items-center gap-2">
              <FileCheck2 className="size-4 text-primary-500" aria-hidden />
              {upload.label[l] ?? upload.label.en}
            </li>
          ))}
        </ul>
      </section>

      {applicableAuthorities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-h2 font-bold text-slate-900">{t("applicableAuthorities")}</h2>
          <div className="mt-5">
            <ApplicableAuthoritiesList requirements={applicableAuthorities} />
          </div>
        </section>
      )}

      {doc.relatedArticleSlug && (
        <Link
          href={`/knowledge/${doc.relatedArticleSlug}`}
          className="mt-10 inline-flex items-center text-body font-semibold text-primary-600 hover:underline"
        >
          {t("relatedReading")} →
        </Link>
      )}
    </main>
  );
}
