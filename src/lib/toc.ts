export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/[\s_]+/g, "-");
}

export function extractHeadingsFromMarkdown(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  return headings;
}
