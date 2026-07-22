import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { blogPosts, getBlogPostBySlug, blogCategories } from "@/content/blog";
import { ArticleBody } from "@/components/knowledge/ArticleBody";
import { ArticleFAQAccordion } from "@/components/knowledge/ArticleFAQAccordion";
import { Link } from "@/i18n/navigation";
import { Clock, ChevronRight } from "lucide-react";

type Locale = "en" | "ar";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const l = locale as Locale;

  return {
    title: post.title[l] ?? post.title.en,
    description: post.excerpt[l] ?? post.excerpt.en,
    alternates: { canonical: `/${locale}/knowledge/${slug}` },
    openGraph: {
      title: post.title[l] ?? post.title.en,
      description: post.excerpt[l] ?? post.excerpt.en,
      images: [{ url: `/blog/${post.slug}-${l}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Knowledge" });
  const category = blogCategories.find((c) => c.slug === post.category);
  const title = post.title[l] ?? post.title.en ?? "";
  const definitionBlock = post.definitionBlock[l] ?? post.definitionBlock.en ?? "";
  const bodyMarkdown = post.bodyMarkdown[l] ?? post.bodyMarkdown.en ?? "";
  const faqs = post.faqs.map((f) => ({
    question: f.question[l] ?? f.question.en ?? "",
    answer: f.answer[l] ?? f.answer.en ?? "",
  }));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description: post.excerpt[l] ?? post.excerpt.en,
        image: `${siteUrl}/blog/${post.slug}-${l}.png`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@type": "Organization", name: "JUSOR" },
        publisher: { "@type": "Organization", name: "JUSOR", logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo-512.png` } },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("title"), item: `${siteUrl}/${locale}/knowledge` },
          { "@type": "ListItem", position: 2, name: title },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-1.5 text-caption text-slate-500">
        <Link href="/knowledge" className="hover:text-primary-600">
          {t("title")}
        </Link>
        <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden />
        <span className="truncate text-slate-700">{title}</span>
      </nav>

      <span className="mt-4 inline-block w-fit rounded-full bg-primary-50 px-3 py-1 text-caption font-medium text-primary-700">
        {category?.label[l] ?? category?.label.en}
      </span>

      <h1 className="mt-3 text-display-lg font-extrabold text-slate-900">{title}</h1>

      <div className="mt-3 flex items-center gap-1.5 text-caption text-slate-500">
        <Clock className="size-3.5" aria-hidden />
        <span>{t("readingTime", { minutes: post.readingTimeMins })}</span>
      </div>

      <div className="relative mt-6 aspect-[1200/630] w-full overflow-hidden rounded-2xl">
        <Image
          src={`/blog/${post.slug}-${l}.png`}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div
        data-answer-block
        className="mt-8 rounded-e-lg border-s-4 border-primary-600 bg-primary-50 p-5 text-body-lg text-slate-700"
      >
        {definitionBlock}
      </div>

      <ArticleBody markdown={bodyMarkdown} />

      <ArticleFAQAccordion title={t("faqTitle")} faqs={faqs} />
    </main>
  );
}
