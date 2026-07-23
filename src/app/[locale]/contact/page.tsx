import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";
import { Phone, Smartphone, Mail, MapPin, MessageCircle } from "lucide-react";
import { primaryOffice } from "@/content/company";
import { ContactForm } from "@/components/company/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company" });

  return {
    title: t("contactTitle"),
    description: t("contactSubtitle"),
    alternates: getAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
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
    "@type": "ContactPage",
    url: `${siteUrl}/${locale}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "JUSOR",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: primaryOffice.phone,
          email: primaryOffice.email,
          areaServed: "AE",
          availableLanguage: ["en", "ar"],
        },
      ],
    },
  };

  const channels = [
    { icon: Phone, label: primaryOffice.phone, href: primaryOffice.phoneHref },
    { icon: Smartphone, label: primaryOffice.mobile, href: primaryOffice.mobileHref },
    { icon: MessageCircle, label: t("whatsapp"), href: primaryOffice.whatsappHref, accent: true },
    { icon: Mail, label: primaryOffice.email, href: `mailto:${primaryOffice.email}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center">
        <h1 className="text-display-lg font-extrabold text-slate-900">{t("contactTitle")}</h1>
        <p data-answer-block className="mx-auto mt-4 max-w-2xl text-body-lg text-slate-600">
          {t("contactSubtitle")}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-h3 font-semibold text-slate-900">{t("contactChannelsTitle")}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-full ${
                    channel.accent ? "bg-[#25D366]/10" : "bg-primary-50"
                  }`}
                >
                  <channel.icon
                    className={`size-5 ${channel.accent ? "text-[#25D366]" : "text-primary-600"}`}
                    aria-hidden
                  />
                </div>
                <span className="text-caption font-medium text-slate-700">{channel.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-body text-slate-600">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
            <div>
              <p>{primaryOffice.addressLine}</p>
              <p className="mt-1 text-caption text-slate-500">{t("officeHours")}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
