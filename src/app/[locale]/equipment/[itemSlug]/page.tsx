import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/metadata";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import { ChevronRight, Speaker, PackageCheck } from "lucide-react";
import { equipmentItems, getEquipmentBySlug, equipmentCategoryLabels } from "@/content/equipment";
import { EquipmentSpecTable } from "@/components/equipment/EquipmentSpecTable";
import { EquipmentBookingForm } from "@/components/equipment/EquipmentBookingForm";

type Locale = "en" | "ar";

export function generateStaticParams() {
  return equipmentItems.flatMap((item) =>
    routing.locales.map((locale) => ({ locale, itemSlug: item.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; itemSlug: string }>;
}): Promise<Metadata> {
  const { locale, itemSlug } = await params;
  const item = getEquipmentBySlug(itemSlug);
  if (!item) return {};
  const l = locale as Locale;

  return {
    title: item.name[l] ?? item.name.en,
    description: item.description[l] ?? item.description.en,
    alternates: getAlternates(locale, `/equipment/${itemSlug}`),
  };
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; itemSlug: string }>;
}) {
  const { locale, itemSlug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const item = getEquipmentBySlug(itemSlug);
  if (!item) notFound();

  const t = await getTranslations({ locale, namespace: "Equipment" });
  const name = item.name[l] ?? item.name.en ?? "";
  const relatedItems = equipmentItems.filter((e) => e.category === item.category && e.slug !== item.slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    category: item.category,
    additionalProperty: item.specifications.map((s) => ({
      "@type": "PropertyValue",
      name: s.label.en,
      value: s.value.en,
    })),
    offers: {
      "@type": "Offer",
      price: item.dailyRate,
      priceCurrency: "USD",
      availability: item.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteUrl}/${locale}/equipment/${itemSlug}`,
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-1.5 text-caption text-slate-500">
        <Link href="/equipment" className="hover:text-primary-600">
          {t("hubTitle")}
        </Link>
        <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden />
        <span className="truncate text-slate-700">{name}</span>
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-50">
          <Speaker className="size-7 text-primary-600" aria-hidden />
        </div>
        <div>
          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-caption text-slate-600">
            {equipmentCategoryLabels[item.category][l] ?? equipmentCategoryLabels[item.category].en}
          </span>
          <h1 className="mt-1 text-display-lg font-extrabold text-slate-900">{name}</h1>
        </div>
      </div>

      <p data-answer-block className="mt-6 text-body-lg text-slate-700">
        {item.description[l] ?? item.description.en}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <p className="text-h2 font-bold text-primary-600">{t("perDay", { price: item.dailyRate })}</p>
        <span className="inline-flex items-center gap-1.5 text-body text-slate-500">
          <PackageCheck className="size-4 text-success" aria-hidden />
          {t("stockAvailable", { count: item.stockQuantity })}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <EquipmentSpecTable specifications={item.specifications} />
        <div>
          <EquipmentBookingForm itemName={name} />
          <WhatsAppCTA variant="inline" equipmentName={name} className="mt-6" />
        </div>
      </div>

      {relatedItems.length > 0 && (
        <section className="mt-14">
          <h2 className="text-h2 font-bold text-slate-900">{t("categoryFacet")}</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedItems.map((related) => (
              <Link
                key={related.slug}
                href={`/equipment/${related.slug}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                  <Speaker className="size-5 text-primary-600" aria-hidden />
                </div>
                <span className="text-body font-medium text-slate-800">{related.name[l] ?? related.name.en}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
