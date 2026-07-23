import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Phone, Smartphone, Mail, Clock, ExternalLink } from "lucide-react";
import { primaryOffice } from "@/content/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company" });

  return {
    title: t("officesTitle"),
    description: t("officesSubtitle"),
    alternates: { canonical: `/${locale}/company/offices` },
  };
}

export default async function OfficesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Company" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JUSOR — Jusor Alkalimat Translation Services",
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryOffice.addressLine,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    telephone: primaryOffice.phone,
    email: primaryOffice.email,
    url: `${siteUrl}/${locale}/company/offices`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center">
        <h1 className="text-display-lg font-extrabold text-slate-900">{t("officesTitle")}</h1>
        <p data-answer-block className="mt-4 text-body-lg text-slate-600">
          {t("officesSubtitle")}
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <h2 className="text-h3 font-semibold text-slate-900">Dubai</h2>
        <ul className="mt-5 space-y-4">
          <li className="flex items-start gap-3 text-body text-slate-700">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
            {primaryOffice.addressLine}
          </li>
          <li className="flex items-center gap-3 text-body text-slate-700">
            <Phone className="size-5 shrink-0 text-primary-600" aria-hidden />
            <a href={primaryOffice.phoneHref} className="hover:text-primary-700">
              {primaryOffice.phone}
            </a>
          </li>
          <li className="flex items-center gap-3 text-body text-slate-700">
            <Smartphone className="size-5 shrink-0 text-primary-600" aria-hidden />
            <a href={primaryOffice.mobileHref} className="hover:text-primary-700">
              {primaryOffice.mobile}
            </a>
          </li>
          <li className="flex items-center gap-3 text-body text-slate-700">
            <Mail className="size-5 shrink-0 text-primary-600" aria-hidden />
            <a href={`mailto:${primaryOffice.email}`} className="hover:text-primary-700">
              {primaryOffice.email}
            </a>
          </li>
          <li className="flex items-center gap-3 text-body text-slate-700">
            <Clock className="size-5 shrink-0 text-primary-600" aria-hidden />
            {t("officeHours")}
          </li>
        </ul>

        <a
          href={primaryOffice.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-body font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {t("getDirections")}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </main>
  );
}
