import { ChevronDown } from "lucide-react";

// Deliberately a plain server component using native <details>/<summary>
// rather than this repo's usual "use client" + useState accordion pattern
// (see src/components/home/FAQSection.tsx). That pattern only renders the
// answer of whichever item is open by default into the initial HTML — every
// other answer is missing from the server-rendered markup until a user
// clicks it client-side. Since AI crawlers (GPTBot, ClaudeBot, etc.) don't
// execute JavaScript, that would make 3 of 4 answers invisible to them,
// which conflicts with this page's non-negotiable SSR-copy requirement.
// <details>/<summary> keeps every Q&A in the server HTML regardless of JS.
export function AboutFAQ({
  title,
  items,
  arabic = false,
}: {
  title: string;
  items: { question: string; answer: string }[];
  arabic?: boolean;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">{title}</h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-start text-h3 font-semibold text-slate-900">{item.question}</h3>
              <ChevronDown
                className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className={`mt-3 text-body text-slate-600 ${arabic ? "leading-[1.9]" : ""}`}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
