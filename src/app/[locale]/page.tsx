import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getHomeContent } from "@/data/home-content";
import { getAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
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

  // The organization entity (@id "#organization") is emitted once, sitewide,
  // in src/app/[locale]/layout.tsx. Do NOT re-emit it here — an earlier
  // version of this page duplicated it as a separate "Organization" node
  // with the same @id but different property values (name, missing
  // hasCredential/areaServed/etc.), which is invalid duplicate structured
  // data. This page only references that entity via @id.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center md:px-8">
        <p className="text-body text-slate-600">
          {locale === "ar" ? (
            <>
              اطّلع على{" "}
              <Link href="/about" className="font-semibold text-primary-600 hover:text-primary-700">
                اعتماد جسور لدى وزارة العدل وطريقة عملنا في الترجمة القانونية المعتمدة
              </Link>
              .
            </>
          ) : (
            <>
              Learn about{" "}
              <Link href="/about" className="font-semibold text-primary-600 hover:text-primary-700">
                JUSOR&apos;s Ministry of Justice approval and certified legal translation process
              </Link>
              .
            </>
          )}
        </p>
      </section>
    </main>
  );
}
