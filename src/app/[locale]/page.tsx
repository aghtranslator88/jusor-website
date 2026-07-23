import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getHomeContent } from "@/data/home-content";
import { getAlternates } from "@/lib/metadata";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsSection } from "@/components/home/StatsSection";
import { LanguagesMatrix } from "@/components/home/LanguagesMatrix";
import { WorkflowSteps } from "@/components/home/WorkflowSteps";
import { FAQSection } from "@/components/home/FAQSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates(locale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getHomeContent(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://jusortrans.com/#organization",
        name: "JUSOR",
        alternateName: "جسور",
        url: "https://jusortrans.com",
        logo: "https://jusortrans.com/brand/logo-512.png",
        email: "info@jusortans.com",
        telephone: "+971-4-2548674",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Abu Saif Business Center - Al-Kazim Building - Block A - M Floor - Office 40B, Abu Hail",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      },
      {
        "@type": "Service",
        serviceType: "Certified Translation and Localization",
        provider: { "@id": "https://jusortrans.com/#organization" },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesGrid services={content.services} />
      <WhyChooseUs items={content.whyChooseUs} />
      <StatsSection stats={content.stats} />
      <LanguagesMatrix languages={content.languages} />
      <WorkflowSteps steps={content.workflow} />
      <FAQSection faqs={content.faqs} />
    </main>
  );
}
