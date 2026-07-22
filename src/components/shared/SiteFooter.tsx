import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { Phone, Smartphone, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  {
    titleKey: "services",
    items: [
      { href: "/legal-translation", key: "legalTranslation" },
      { href: "/interpretation", key: "interpretation" },
      { href: "/equipment", key: "equipment" },
      { href: "/documents", key: "documents" },
    ],
  },
  {
    titleKey: "company",
    items: [
      { href: "/company/about", key: "about" },
      { href: "/careers", key: "careers" },
      { href: "/contact", key: "contact" },
      { href: "/knowledge", key: "knowledge" },
    ],
  },
] as const;

export function SiteFooter() {
  const t = useTranslations("Nav");
  const tf = useTranslations("Footer");

  return (
    <footer className="border-t border-slate-200 bg-primary-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Logo height={40} href={null} className="brightness-0 invert" />
          <p className="mt-4 max-w-xs text-caption text-slate-400">
            Jusor Alkalimat Translation Services
          </p>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.titleKey}>
            <h3 className="text-caption font-semibold uppercase tracking-wide text-slate-400">
              {t(group.titleKey)}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body text-slate-300 transition-colors hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-slate-400">
            {t("contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-body text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" />
              <span>{tf("address")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-accent-400" />
              <a href="tel:0042548674" className="hover:text-white">
                04-2548674
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Smartphone className="size-4 shrink-0 text-accent-400" />
              <a href="tel:0503244329" className="hover:text-white">
                0503244329
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-accent-400" />
              <a href="mailto:info@jusortans.com" className="hover:text-white">
                info@jusortans.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-3 px-4 py-6 text-caption text-slate-400 md:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} JUSOR (جسور). {tf("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
