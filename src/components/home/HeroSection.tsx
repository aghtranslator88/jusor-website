import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { primaryOffice } from "@/content/company";

export function HeroSection() {
  const t = useTranslations("Home");
  const tWa = useTranslations("WhatsApp");

  return (
    <section className="relative overflow-hidden bg-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
      <Image
        src="/images/hero/home-earth-lights.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-primary-700/75" />
      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-display-lg font-extrabold text-white">
          {t("heroHeadline")}
        </h1>
        <p className="mt-6 text-body-lg text-primary-50/90" data-answer-block>
          {t("heroDefinition")}
        </p>
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
          <a
            href={primaryOffice.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-body font-semibold text-white shadow-sm transition-colors hover:bg-[#20bd5a]"
          >
            <MessageCircle className="size-4 fill-current text-white" aria-hidden />
            <span>{tWa("chatButton")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
