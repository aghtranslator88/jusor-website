import { useTranslations } from "next-intl";
import type { HomeContent } from "@/data/home-content";

export function StatsSection({ stats }: { stats: HomeContent["stats"] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-primary-600 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-h2 font-bold text-white">{t("statsTitle")}</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-display-lg font-extrabold text-white">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-1 text-body text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

