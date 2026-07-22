"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ArticleFAQAccordion({
  title,
  faqs,
}: {
  title: string;
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-12">
      <h2 className="text-h2 font-bold text-slate-900">{title}</h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
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
              {open && <div className="px-5 pb-4 text-body text-slate-600">{faq.answer}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
