import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Clock } from "lucide-react";
import type { BlogPostContent } from "@/content/blog";
import { blogCategories } from "@/content/blog";

export function ArticleCard({ post }: { post: BlogPostContent }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("Knowledge");
  const category = blogCategories.find((c) => c.slug === post.category);

  return (
    <Link
      href={`/knowledge/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-primary-600">
        <Image
          src={`/blog/${post.slug}-${locale}.png`}
          alt={post.title[locale] ?? post.title.en ?? ""}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-caption font-medium text-primary-700">
          {category?.label[locale] ?? category?.label.en}
        </span>
        <h3 className="mt-3 text-h3 font-semibold text-slate-900">
          {post.title[locale] ?? post.title.en}
        </h3>
        <p className="mt-2 line-clamp-2 text-body text-slate-600">
          {post.excerpt[locale] ?? post.excerpt.en}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-caption text-slate-500">
          <Clock className="size-3.5" aria-hidden />
          <span>{t("readingTime", { minutes: post.readingTimeMins })}</span>
        </div>
      </div>
    </Link>
  );
}
