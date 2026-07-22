import mammoth from "mammoth";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/blog-source");
const OUT = path.join(ROOT, ".tmp-brand", "extracted");

const files = [
  "Certified Legal and Financial Translation for Corporate Tax, VAT, and Regulatory Compliance with the Federal Tax Authority (FTA) in Dubai.docx",
  "الترجمة القانونية والمالية لضريبة الشركات، ضريبة القيمة المضافة، وملفات الامتثال للهيئة الاتحادية للضرائب في دبي.docx",
  "Professional Guide to UAE Ministry of Foreign Affairs (MOFA) and Ministry of Justice (MOJ) Attestation in Dubai.docx",
  "الدليل المهني لتصديقات وزارة الخارجية ووزارة العدل والكاتب العدل في دبي والإمارات.docx",
  "Certified Translation for Dubai Tourist Visa Applications A Complete Guide.docx",
  "ترجمة مستندات تأشيرة السياحة لدبي.docx",
  "Certified Legal Translation for Real Estate Mortgages and Banking Documents in Dubai (Bank Statements, Utility Bills, and This is validated by securing a translation of utility bills and proof of address (suc.docx",
  "دليلك الشامل للترجمة القانونية المعتمدة لمستندات الرهن العقاري والتمويل المصرفي في دبي.docx",
];

await mkdir(OUT, { recursive: true });

for (const [i, file] of files.entries()) {
  const buffer = await readFile(path.join(SRC, file));
  const result = await mammoth.extractRawText({ buffer });
  await writeFile(path.join(OUT, `${i}.txt`), result.value, "utf-8");
  console.log(`[${i}] ${file} -> ${result.value.length} chars`);
}
