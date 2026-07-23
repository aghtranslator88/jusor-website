import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/metadata";
import { authorities, getAuthorityBySlug } from "@/content/legal-translation";
import { AuthorityDetailPage } from "@/components/legal-translation/AuthorityDetailPage";

type Locale = "en" | "ar";

export function generateStaticParams() {
  return authorities
    .filter((a) => a.type !== "EMBASSY")
    .flatMap((a) => routing.locales.map((locale) => ({ locale, authoritySlug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; authoritySlug: string }>;
}): Promise<Metadata> {
  const { locale, authoritySlug } = await params;
  const authority = getAuthorityBySlug(authoritySlug);
  if (!authority || authority.type === "EMBASSY") return {};
  const l = locale as Locale;

  return {
    title: authority.name[l] ?? authority.name.en,
    description: authority.description[l] ?? authority.description.en,
    alternates: getAlternates(locale, `/legal-translation/authorities/${authoritySlug}`),
  };
}

export default async function AuthorityPage({
  params,
}: {
  params: Promise<{ locale: string; authoritySlug: string }>;
}) {
  const { locale, authoritySlug } = await params;
  setRequestLocale(locale);

  const authority = getAuthorityBySlug(authoritySlug);
  if (!authority || authority.type === "EMBASSY") notFound();

  return <AuthorityDetailPage authority={authority} locale={locale} />;
}
