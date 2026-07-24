import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { getAlternates } from "@/lib/metadata";
import { blogPosts } from "@/content/blog";
import { ArticleCard } from "@/components/knowledge/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Knowledge" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getAlternates(locale, "/knowledge"),
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Knowledge" });

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <Image
          src="/images/hero/knowledge-dubai-night.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-primary-700/75" />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-display-lg font-extrabold text-white">{t("title")}</h1>
          <p className="mt-4 text-body-lg text-primary-50/90">{t("subtitle")}</p>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
