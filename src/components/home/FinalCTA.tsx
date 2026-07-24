import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const t = useTranslations("Home");
  const tn = useTranslations("Nav");

  const links = [
    { href: "/about", key: "about" },
    { href: "/legal-translation", key: "legalTranslation" },
    { href: "/documents", key: "documents" },
    { href: "/knowledge", key: "knowledge" },
    { href: "/careers", key: "careers" },
    { href: "/contact", key: "contact" },
  ] as const;

  return (
    <section className="bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-h2 font-bold text-white">{t("finalCtaTitle")}</h2>
        <p className="mt-4 text-body-lg text-primary-50/90">{t("finalCtaSubtitle")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quotes/submit"
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
          >
            {t("ctaPrimary")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-body font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        <nav aria-label={t("finalCtaTitle")} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/15 pt-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body text-primary-100 underline-offset-4 hover:text-white hover:underline"
            >
              {tn(link.key)}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
