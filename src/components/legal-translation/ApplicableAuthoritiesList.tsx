import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Authority, EmbassyRequirement } from "@/content/legal-translation";

export function ApplicableAuthoritiesList({
  requirements,
}: {
  requirements: (EmbassyRequirement & { authority: Authority })[];
}) {
  const locale = useLocale() as "en" | "ar";

  return (
    <div className="flex flex-wrap gap-2.5">
      {requirements.map((req) => (
        <Link
          key={req.authoritySlug}
          href={
            req.authority.type === "EMBASSY"
              ? `/legal-translation/embassies/${req.authority.slug}`
              : `/legal-translation/authorities/${req.authority.slug}`
          }
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-body text-slate-700 shadow-card transition-colors hover:border-primary-300 hover:text-primary-700"
        >
          {req.authority.name[locale] ?? req.authority.name.en}
        </Link>
      ))}
    </div>
  );
}
