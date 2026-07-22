import { useTranslations } from "next-intl";
import type { HomeContent } from "@/data/home-content";
import { DynamicIcon } from "@/components/shared/icon-map";

export function ServicesGrid({ services }: { services: HomeContent["services"] }) {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">
        {t("servicesTitle")}
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.slug}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
              <DynamicIcon name={service.icon} className="size-6 text-primary-600" />
            </div>
            <h3 className="mt-4 text-h3 font-semibold text-slate-900">{service.name}</h3>
            <p className="mt-2 text-body text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
