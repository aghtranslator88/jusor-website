import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import {
  aboutMeta,
  aboutHero,
  trustBarItems,
  aboutVision,
  aboutMission,
  aboutPromise,
  processSteps,
  certifiedVsOtherServices,
  geoQuestions,
  comparisonTable,
  faqItems,
  credentialLine,
  aboutLastUpdated,
} from "@/content/about";
import { TrustBar } from "@/components/about/TrustBar";
import { ProcessStepper } from "@/components/about/ProcessStepper";
import { CredentialBlock } from "@/components/about/CredentialBlock";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { GlobeVideoBackground, SealIllustration, OfficeIllustration } from "@/components/about/AboutVisuals";

type Locale = "en" | "ar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const title = aboutMeta.title[l] ?? aboutMeta.title.en!;
  const description = aboutMeta.description[l] ?? aboutMeta.description.en!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";

  return {
    title,
    description,
    alternates: getAlternates(locale, "/about"),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/about`,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      // TODO: replace with a dedicated 1200x630 og-about.jpg branded card
      // (logo + tagline + "Approved by the UAE Ministry of Justice").
      images: [{ url: "/brand/logo-512.png", width: 512, height: 512 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const isAr = l === "ar";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const pageUrl = `${siteUrl}/${locale}/about`;
  const title = aboutMeta.title[l] ?? aboutMeta.title.en!;
  const description = aboutMeta.description[l] ?? aboutMeta.description.en!;

  // The organization entity (LocalBusiness, @id "#organization") is emitted
  // once, sitewide, in src/app/[locale]/layout.tsx — including the official
  // name confirmed by the owner, areaServed, availableLanguage, and
  // hasCredential (MOJ approval, no license number). Do NOT re-emit a
  // second LocalBusiness block with the same @id here: two JSON-LD objects
  // sharing one @id but different properties is invalid duplicate
  // structured data. This page only references that entity via @id.
  //
  // Also intentionally omitted from the org entity (see layout.tsx and
  // src/content/about.ts for the full reasoning): geo (lat/lng) — not yet
  // supplied, do not fabricate; sameAs — no real social/GBP URLs confirmed
  // yet, a placeholder string would be an invalid URL in production schema.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: isAr ? "ar-AE" : "en-AE",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        dateModified: aboutLastUpdated,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isAr ? "الرئيسية" : "Home",
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isAr ? "نبذة عنا" : "About Us",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question[l] ?? item.question.en,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer[l] ?? item.answer.en,
          },
        })),
      },
    ],
  };

  const lastUpdatedLabel = isAr
    ? `آخر تحديث: ${new Date(aboutLastUpdated).toLocaleDateString("ar-AE", { year: "numeric", month: "long", day: "numeric" })}`
    : `Last updated: ${new Date(aboutLastUpdated).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}`;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2.1 Hero */}
      <section className="relative overflow-hidden bg-primary-700 px-4 py-24 text-center md:px-8 md:py-32">
        <GlobeVideoBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-700/80" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-wider text-primary-50">
            {isAr ? "جسور" : "JUSOR"}
          </span>
          <h1 className="mt-5 text-display-lg font-extrabold text-white">{aboutHero.h1[l] ?? aboutHero.h1.en}</h1>
          <p className="mt-4 text-body-lg text-primary-50/90">{aboutHero.tagline[l] ?? aboutHero.tagline.en}</p>
          <TrustBar items={trustBarItems.map((item) => ({ icon: item.icon, label: item.label[l] ?? item.label.en! }))} />
        </div>
      </section>

      {/* 2.2 Vision */}
      <section className="bg-slate-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-display-lg font-black leading-none text-primary-200" aria-hidden>
            &ldquo;
          </span>
          <h2 className="-mt-6 text-h2 font-bold text-slate-900">{isAr ? "الرؤية" : "Vision"}</h2>
          <p data-answer-block className={`mt-5 text-body-lg text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
            {aboutVision[l] ?? aboutVision.en}
          </p>
        </div>
      </section>

      {/* 2.3 Mission + credential visual */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wider text-primary-600">
            {isAr ? "من نحن" : "Who We Are"}
          </p>
          <h2 className="mt-2 text-h2 font-bold text-slate-900">{isAr ? "رسالتنا" : "Mission"}</h2>
          <div data-answer-block className={`mt-5 space-y-4 text-body-lg text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
            {(aboutMission[l] ?? aboutMission.en!).split("\n\n").map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
        <div className="order-first md:order-last">
          <SealIllustration />
        </div>
      </section>

      {/* 3.3 Question-based headings + 3.4 definition pattern */}
      <section className="bg-slate-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10">
          {geoQuestions.map((q) => (
            <div key={q.question.en} className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="text-h3 font-bold text-slate-900">{q.question[l] ?? q.question.en}</h2>
              <p data-answer-block className={`mt-3 text-body text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
                {q.answer[l] ?? q.answer.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3.6 Comparison table */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-center text-h2 font-bold text-slate-900">
          {isAr ? "الترجمة المعتمدة مقابل الترجمة العادية" : "Certified vs. Standard Translation"}
        </h2>
        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 shadow-card">
          <table className="w-full border-collapse text-start text-body">
            <thead>
              <tr className="bg-primary-700">
                <th className="p-4 text-start font-semibold text-white">{isAr ? "المعيار" : "Feature"}</th>
                <th className="p-4 text-start font-semibold text-white">{isAr ? "معتمدة" : "Certified"}</th>
                <th className="p-4 text-start font-semibold text-white">{isAr ? "عادية" : "Standard"}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, i) => (
                <tr key={row.feature.en} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                  <td className="p-4 font-medium text-slate-900">{row.feature[l] ?? row.feature.en}</td>
                  <td className="p-4 text-slate-600">{row.certified[l] ?? row.certified.en}</td>
                  <td className="p-4 text-slate-600">{row.standard[l] ?? row.standard.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* COMPLIANCE: certified legal translation (MOJ-approved, named pairs
          only) must stay visually and textually separate from other, wider-
          language, non-certified services. Do not merge these two cards or
          move the "60+ languages" homepage claim into this block. */}
      <section className="bg-slate-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary-600 bg-white p-6 shadow-card-hover">
            <h3 className="text-h3 font-bold text-primary-900">
              {certifiedVsOtherServices.certified.title[l] ?? certifiedVsOtherServices.certified.title.en}
            </h3>
            <p className={`mt-3 text-body text-slate-700 ${isAr ? "leading-[1.9]" : ""}`}>
              {certifiedVsOtherServices.certified.body[l] ?? certifiedVsOtherServices.certified.body.en}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-h3 font-bold text-slate-900">
              {certifiedVsOtherServices.other.title[l] ?? certifiedVsOtherServices.other.title.en}
            </h3>
            <p className={`mt-3 text-body text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
              {certifiedVsOtherServices.other.body[l] ?? certifiedVsOtherServices.other.body.en}
            </p>
            <Link
              href="/services"
              className="mt-4 inline-block text-body font-semibold text-primary-600 hover:text-primary-700"
            >
              {isAr ? "استكشف خدمات الترجمة والتعريب الأخرى" : "Explore our other translation & localization services"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2.4 Promise — distinct visual treatment, contrasting band */}
      <section className="bg-primary-900 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className={`space-y-6 text-h2 font-semibold text-white md:text-display-lg ${isAr ? "leading-[1.5]" : "leading-snug"}`}>
            {(aboutPromise[l] ?? aboutPromise.en!).split("\n\n").map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 How We Work */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-center text-h2 font-bold text-slate-900">{isAr ? "كيف نعمل" : "How We Work"}</h2>
        <ProcessStepper
          steps={processSteps.map((s) => ({
            title: s.title[l] ?? s.title.en!,
            body: s.body[l] ?? s.body.en!,
          }))}
        />
        <div className="mt-14">
          <OfficeIllustration />
        </div>
      </section>

      {/* 3.8 FAQ */}
      <AboutFAQ
        title={isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        arabic={isAr}
        items={faqItems.map((item) => ({
          question: item.question[l] ?? item.question.en!,
          answer: item.answer[l] ?? item.answer.en!,
        }))}
      />

      {/* Internal links (§8) + 3.7 Last updated + 2.6 Credential block */}
      <section className="bg-slate-50 px-4 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
          <p className="text-body text-slate-600">
            {isAr ? (
              <>
                راجع <Link href="/services" className="font-semibold text-primary-600 hover:text-primary-700">خدمات الترجمة والتعريب لدينا</Link>،
                أو تواصل مع <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">مكتبنا في دبي</Link>،
                أو اطّلع على <Link href="/legal-translation" className="font-semibold text-primary-600 hover:text-primary-700">مركز الترجمة القانونية المعتمدة</Link>.
              </>
            ) : (
              <>
                Explore our <Link href="/services" className="font-semibold text-primary-600 hover:text-primary-700">translation and localization services</Link>,
                reach our <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">Dubai office</Link>,
                or visit the <Link href="/legal-translation" className="font-semibold text-primary-600 hover:text-primary-700">certified legal translation hub</Link>.
              </>
            )}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <CredentialBlock line={credentialLine[l] ?? credentialLine.en!} className="text-slate-700" />
            <p className="mt-3 text-caption text-slate-400">{lastUpdatedLabel}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
