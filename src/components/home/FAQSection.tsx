"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { HomeContent } from "@/data/home-content";

export function FAQSection({ faqs }: { faqs: HomeContent["faqs"] }) {
  const t = useTranslations("Home");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">{t("faqTitle")}</h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-h3 font-semibold text-slate-900"
              >
                {faq.question}
                <ChevronDown
                  className={`size-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {open && (
                <div className="px-5 pb-4 text-body text-slate-600">{faq.answer}</div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-body text-slate-600">
        {t("faqPricingLinkText")}{" "}
        <Link href="/documents" className="font-semibold text-primary-600 hover:text-primary-700">
          {t("faqPricingCatalogLink")}
        </Link>{" "}
        {t("faqPricingLinkOr")}{" "}
        <Link href="/quotes/submit" className="font-semibold text-primary-600 hover:text-primary-700">
          {t("faqPricingQuoteLink")}
        </Link>
        .
      </p>
    </section>
  );
}
