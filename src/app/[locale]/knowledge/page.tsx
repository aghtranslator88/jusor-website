import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
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
    alternates: { canonical: `/${locale}/knowledge` },
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
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-display-lg font-extrabold text-slate-900">{t("title")}</h1>
        <p className="mt-4 text-body-lg text-slate-600">{t("subtitle")}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
