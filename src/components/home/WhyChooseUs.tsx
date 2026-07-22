import { useTranslations } from "next-intl";
import type { HomeContent } from "@/data/home-content";
import { DynamicIcon } from "@/components/shared/icon-map";

export function WhyChooseUs({ items }: { items: HomeContent["whyChooseUs"] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-h2 font-bold text-slate-900">
          {t("whyChooseUsTitle")}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white shadow-card">
                <DynamicIcon name={item.icon} className="size-7 text-accent-500" />
              </div>
              <h3 className="mt-4 text-h3 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-body text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
