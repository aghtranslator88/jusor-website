import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { jakarta, cairo, tajawal } from "../fonts";
import { routing, getLangDir, type AppLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import { primaryOffice } from "@/content/company";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com"
    ),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
    icons: {
      icon: [
        { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/brand/icon-180.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/brand/logo-512.png", width: 512, height: 512 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getLangDir(locale);
  const isArabic = locale === "ar";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "JUSOR — Certified Translation, Localization & Interpretation",
        legalName: "Jusor Alkalimat Translation Services",
        // Official registered name, confirmed by the business owner — kept
        // as alternateName rather than replacing `name`/`legalName` above so
        // this single-page addition doesn't ripple into every other page's
        // existing branding without a separate, deliberate pass. See
        // src/content/about.ts header comment for the full explanation.
        alternateName: [
          "JUSOR ALKALIMAT TRANSLATION EDITING & PROOFREADING SERVICES",
          "جسور الكلمات لخدمات الترجمة والتدقيق واللغوي",
        ],
        url: siteUrl,
        logo: `${siteUrl}/brand/logo-512.png`,
        image: `${siteUrl}/brand/logo-512.png`,
        telephone: primaryOffice.phone,
        email: primaryOffice.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: primaryOffice.addressLine,
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "City", name: "Dubai" },
        ],
        availableLanguage: ["ar", "en"],
        // MOJ approval confirmed by the owner; no license number is
        // published at the owner's request (see src/content/about.ts).
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "Certified Legal Translation Approval",
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Ministry of Justice, United Arab Emirates",
          },
        },
        priceRange: "$$",
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${jakarta.variable} ${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${isArabic ? "font-arabic" : "font-sans"}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-body font-semibold focus:text-primary-700 focus:shadow-lg"
          >
            {isArabic ? "تخطَّ إلى المحتوى الرئيسي" : "Skip to main content"}
          </a>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <WhatsAppCTA variant="floating" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
