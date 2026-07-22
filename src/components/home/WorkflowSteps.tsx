import { useTranslations } from "next-intl";
import type { HomeContent } from "@/data/home-content";

export function WorkflowSteps({ steps }: { steps: HomeContent["workflow"] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-h2 font-bold text-slate-900">
          {t("workflowTitle")}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-xl bg-white p-6 shadow-card">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-600 text-body font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-h3 font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-body text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
