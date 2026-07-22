import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Languages
  const [en, ar, fr, de] = await Promise.all([
    db.language.upsert({
      where: { code: "en" },
      update: {},
      create: { code: "en", name: { en: "English", ar: "الإنجليزية", fr: "Anglais", de: "Englisch", es: "Inglés", it: "Inglese" }, nativeName: "English", isRtl: false },
    }),
    db.language.upsert({
      where: { code: "ar" },
      update: {},
      create: { code: "ar", name: { en: "Arabic", ar: "العربية", fr: "Arabe", de: "Arabisch", es: "Árabe", it: "Arabo" }, nativeName: "العربية", isRtl: true },
    }),
    db.language.upsert({
      where: { code: "fr" },
      update: {},
      create: { code: "fr", name: { en: "French", ar: "الفرنسية", fr: "Français", de: "Französisch", es: "Francés", it: "Francese" }, nativeName: "Français", isRtl: false },
    }),
    db.language.upsert({
      where: { code: "de" },
      update: {},
      create: { code: "de", name: { en: "German", ar: "الألمانية", fr: "Allemand", de: "Deutsch", es: "Alemán", it: "Tedesco" }, nativeName: "Deutsch", isRtl: false },
    }),
  ]);

  await db.languagePair.upsert({
    where: { sourceLanguageId_targetLanguageId: { sourceLanguageId: ar.id, targetLanguageId: en.id } },
    update: {},
    create: {
      slug: "arabic-to-english",
      sourceLanguageId: ar.id,
      targetLanguageId: en.id,
      definitionBlock: {
        en: "JUSOR provides professional Arabic-to-English translation for legal, business, academic, and medical documents, delivered by a vetted pool of native-speaking linguists. Certified and standard tiers are available with turnaround from 4 to 72 hours, supporting embassy, immigration, and corporate localization requirements.",
      },
      demandTier: 1,
      perWordRateModifier: 1.0,
      translatorPoolSize: 42,
    },
  });

  await db.languagePair.upsert({
    where: { sourceLanguageId_targetLanguageId: { sourceLanguageId: en.id, targetLanguageId: ar.id } },
    update: {},
    create: {
      slug: "english-to-arabic",
      sourceLanguageId: en.id,
      targetLanguageId: ar.id,
      definitionBlock: {
        en: "JUSOR provides professional English-to-Arabic translation for legal, business, academic, and medical documents, delivered by a vetted pool of native-speaking linguists. Certified and standard tiers are available with turnaround from 4 to 72 hours.",
      },
      demandTier: 1,
      perWordRateModifier: 1.0,
      translatorPoolSize: 38,
    },
  });

  // Service Category + Services
  const legalCategory = await db.serviceCategory.upsert({
    where: { slug: "legal-translation" },
    update: {},
    create: {
      slug: "legal-translation",
      name: { en: "Legal & Certified Translation", ar: "الترجمة القانونية والمعتمدة" },
      description: { en: "Certified, embassy-recognized translation for official and legal documents." },
      iconKey: "ShieldCheck",
      sortOrder: 1,
    },
  });

  const generalTranslation = await db.service.upsert({
    where: { slug: "general-translation" },
    update: {},
    create: {
      slug: "general-translation",
      categoryId: legalCategory.id,
      name: { en: "Certified Document Translation", ar: "ترجمة المستندات المعتمدة" },
      shortDescription: { en: "Certified translation for official documents, accepted by embassies and government authorities." },
      definitionBlock: {
        en: "Certified document translation is an official, word-for-word rendering of a source document accompanied by a signed certificate of accuracy, accepted by embassies, courts, and immigration authorities worldwide.",
      },
      basePricePerWord: 0.14,
      minCharge: 25,
      supportsHybridAI: true,
    },
  });

  // Document Types
  await db.documentType.upsert({
    where: { slug: "birth-certificate" },
    update: {},
    create: {
      slug: "birth-certificate",
      serviceId: generalTranslation.id,
      category: "CIVIL_REGISTRY",
      name: { en: "Birth Certificate", ar: "شهادة الميلاد" },
      description: { en: "Certified translation of birth certificates for visa, immigration, and legal use." },
      definitionBlock: {
        en: "A certified birth certificate translation is an official, word-for-word rendering of your birth certificate, accompanied by a signed certificate of accuracy, typically delivered within 24 hours and accepted by embassies and immigration authorities worldwide.",
      },
      basePrice: 35,
      avgTurnaroundHours: 24,
      requiredUploads: [{ key: "source_document", label: { en: "Birth Certificate (PDF/Image)" }, required: true, accept: ["application/pdf", "image/jpeg", "image/png"] }],
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
