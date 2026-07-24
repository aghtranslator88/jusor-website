// Static placeholder content for the Home Page Hub, structured to mirror the
// shape this will eventually take once sourced from Prisma (Service,
// ServiceCategory, FAQ — see docs/spec/01-database-schema.prisma). Full EN/AR
// copy is provided; other locales fall back to EN until the CMS/DB is wired
// up (see docs/spec/03-page-home.md).

export type HomeContent = {
  services: { icon: string; slug: string; name: string; description: string }[];
  whyChooseUs: { icon: string; title: string; description: string; href: string }[];
  stats: { value: number; suffix: string; label: string }[];
  languages: { name: string; href?: string }[];
  workflow: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

const en: HomeContent = {
  services: [
    { icon: "ShieldCheck", slug: "legal-translation", name: "Certified Legal Translation", description: "Embassy-recognized translation for birth certificates, contracts, and court documents." },
    { icon: "Globe", slug: "website-localization", name: "Website Localization", description: "Full-site translation with RTL layout adaptation and hreflang SEO." },
    { icon: "Smartphone", slug: "software-localization", name: "Software & App Localization", description: "String extraction, pseudo-localization QA, CI/CD-integrated workflows." },
    { icon: "Gamepad2", slug: "game-localization", name: "Game Localization", description: "In-game text, voice-over, and cultural adaptation for global releases." },
    { icon: "Stethoscope", slug: "medical-translation", name: "Medical Translation", description: "Precise, confidential translation of medical reports and records." },
    { icon: "Landmark", slug: "financial-translation", name: "Financial Translation", description: "Accurate translation of statements, audits, and financial disclosures." },
    { icon: "Mic", slug: "interpretation", name: "Interpretation Services", description: "Simultaneous, consecutive, court, and remote interpretation." },
    { icon: "Speaker", slug: "voice-over-subtitling", name: "Voice-over & Subtitling", description: "Professional dubbing and subtitle localization for media." },
  ],
  whyChooseUs: [
    { icon: "BadgeCheck", title: "ISO 17100 Certified", description: "Every translation meets internationally recognized quality standards.", href: "/about" },
    { icon: "Users", title: "Vetted Linguist Network", description: "Native-speaking translators screened through a rigorous 5-stage process.", href: "/careers" },
    { icon: "Clock", title: "4-Hour Express Delivery", description: "Urgent turnaround options without compromising accuracy.", href: "/documents" },
    { icon: "ShieldCheck", title: "Embassy-Recognized Certification", description: "Accepted by embassies, courts, and immigration authorities worldwide.", href: "/legal-translation" },
  ],
  stats: [
    { value: 48000, suffix: "+", label: "Documents Translated" },
    { value: 60, suffix: "+", label: "Language Pairs" },
    { value: 35, suffix: "+", label: "Countries Served" },
    { value: 24, suffix: "h", label: "Average Turnaround" },
  ],
  languages: [
    { name: "Arabic", href: "/translations/arabic-to-english" },
    { name: "English", href: "/translations/arabic-to-english" },
    { name: "French", href: "/translations/arabic-to-french" },
    { name: "German", href: "/translations/arabic-to-german" },
    { name: "Spanish", href: "/translations/arabic-to-spanish" },
    { name: "Italian" },
    { name: "Turkish" },
    { name: "Urdu", href: "/translations/arabic-to-urdu" },
    { name: "Hindi", href: "/translations/arabic-to-hindi" },
    { name: "Chinese" },
    { name: "Russian" },
    { name: "Portuguese" },
  ],
  workflow: [
    { title: "Upload", description: "Submit your document and get an instant price estimate." },
    { title: "Quote & Confirm", description: "Review the breakdown and confirm your service tier and turnaround." },
    { title: "Translate & QA", description: "A certified linguist translates your document, then a second reviewer checks it." },
    { title: "Certified Delivery", description: "Receive your certified translation, ready for embassy or legal submission." },
  ],
  faqs: [
    { question: "How much does certified translation cost?", answer: "Pricing depends on the document type, language pair, and turnaround speed you choose. Use our instant quote estimator for an exact price, or browse the full document pricing catalog." },
    { question: "How long does certified translation take?", answer: "Standard turnaround is 24 hours; express options are available in as little as 4 hours depending on document length and language pair." },
    { question: "Is JUSOR's certified translation accepted by embassies?", answer: "Yes. JUSOR translations are prepared by ISO 17100-certified linguists and include a signed certificate of accuracy accepted by embassies, courts, and immigration authorities worldwide." },
    { question: "What languages does JUSOR support?", answer: "JUSOR supports 60+ language pairs including Arabic, English, French, German, Spanish, Italian, Turkish, Urdu, Hindi, Chinese, Russian, and Portuguese." },
  ],
};

const ar: HomeContent = {
  services: [
    { icon: "ShieldCheck", slug: "legal-translation", name: "الترجمة القانونية المعتمدة", description: "ترجمة معتمدة ومعترف بها لدى السفارات لشهادات الميلاد والعقود والمستندات القضائية." },
    { icon: "Globe", slug: "website-localization", name: "توطين المواقع الإلكترونية", description: "ترجمة كاملة للموقع مع تكييف تخطيط RTL وتحسين محركات البحث." },
    { icon: "Smartphone", slug: "software-localization", name: "توطين البرمجيات والتطبيقات", description: "استخراج النصوص، اختبار جودة الترجمة، وتكامل مع بيئات التطوير المستمر." },
    { icon: "Gamepad2", slug: "game-localization", name: "توطين الألعاب", description: "ترجمة نصوص الألعاب والتعليق الصوتي والتكييف الثقافي للإصدارات العالمية." },
    { icon: "Stethoscope", slug: "medical-translation", name: "الترجمة الطبية", description: "ترجمة دقيقة وسرية للتقارير والسجلات الطبية." },
    { icon: "Landmark", slug: "financial-translation", name: "الترجمة المالية", description: "ترجمة دقيقة للبيانات المالية والتقارير والإفصاحات." },
    { icon: "Mic", slug: "interpretation", name: "خدمات الترجمة الفورية", description: "ترجمة فورية وتتابعية وقضائية وعن بعد." },
    { icon: "Speaker", slug: "voice-over-subtitling", name: "التعليق الصوتي والترجمة النصية", description: "دبلجة احترافية وتوطين الترجمة النصية للمحتوى الإعلامي." },
  ],
  whyChooseUs: [
    { icon: "BadgeCheck", title: "معتمدة وفق آيزو 17100", description: "كل ترجمة تلتزم بمعايير الجودة المعترف بها دولياً.", href: "/about" },
    { icon: "Users", title: "شبكة مترجمين موثوقة", description: "مترجمون أصليون تم فرزهم عبر عملية تحقق من خمس مراحل.", href: "/careers" },
    { icon: "Clock", title: "تسليم سريع خلال 4 ساعات", description: "خيارات تسليم عاجلة دون المساس بالدقة.", href: "/documents" },
    { icon: "ShieldCheck", title: "اعتماد معترف به من السفارات", description: "مقبولة لدى السفارات والمحاكم وسلطات الهجرة حول العالم.", href: "/legal-translation" },
  ],
  stats: [
    { value: 48000, suffix: "+", label: "مستند مترجم" },
    { value: 60, suffix: "+", label: "زوج لغوي" },
    { value: 35, suffix: "+", label: "دولة نخدمها" },
    { value: 24, suffix: "س", label: "متوسط وقت التسليم" },
  ],
  languages: [
    { name: "العربية", href: "/translations/arabic-to-english" },
    { name: "الإنجليزية", href: "/translations/arabic-to-english" },
    { name: "الفرنسية", href: "/translations/arabic-to-french" },
    { name: "الألمانية", href: "/translations/arabic-to-german" },
    { name: "الإسبانية", href: "/translations/arabic-to-spanish" },
    { name: "الإيطالية" },
    { name: "التركية" },
    { name: "الأردية", href: "/translations/arabic-to-urdu" },
    { name: "الهندية", href: "/translations/arabic-to-hindi" },
    { name: "الصينية" },
    { name: "الروسية" },
    { name: "البرتغالية" },
  ],
  workflow: [
    { title: "الرفع", description: "أرسل مستندك واحصل على تقدير سعري فوري." },
    { title: "عرض السعر والتأكيد", description: "راجع التفاصيل وأكّد فئة الخدمة ووقت التسليم." },
    { title: "الترجمة والمراجعة", description: "يقوم مترجم معتمد بترجمة مستندك، ثم يراجعه مدقق ثانٍ." },
    { title: "التسليم المعتمد", description: "استلم ترجمتك المعتمدة جاهزة للتقديم للسفارة أو الجهات القانونية." },
  ],
  faqs: [
    { question: "كم تكلفة الترجمة المعتمدة؟", answer: "تعتمد التكلفة على نوع المستند وزوج اللغة وسرعة التسليم التي تختارها. استخدم أداة عرض السعر الفوري للحصول على سعر دقيق، أو تصفّح كتالوج الأسعار الكامل." },
    { question: "كم تستغرق الترجمة المعتمدة؟", answer: "وقت التسليم القياسي 24 ساعة، مع خيارات سريعة تصل إلى 4 ساعات حسب طول المستند وزوج اللغة." },
    { question: "هل ترجمات جسور مقبولة لدى السفارات؟", answer: "نعم. تُعد ترجمات جسور من قبل مترجمين معتمدين وفق آيزو 17100 وتتضمن شهادة دقة موقعة مقبولة لدى السفارات والمحاكم وسلطات الهجرة حول العالم." },
    { question: "ما اللغات التي تدعمها جسور؟", answer: "تدعم جسور أكثر من 60 زوجاً لغوياً منها العربية والإنجليزية والفرنسية والألمانية والإسبانية والإيطالية والتركية والأردية والهندية والصينية والروسية والبرتغالية." },
  ],
};

const contentByLocale: Record<string, HomeContent> = { en, ar };

export function getHomeContent(locale: string): HomeContent {
  return contentByLocale[locale] ?? en;
}
