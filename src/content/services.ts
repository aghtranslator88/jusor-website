// Static content for the Translation & Localization Services hub, mirroring
// the Service/ServiceCategory Prisma models (docs/spec/01-database-schema.prisma)
// until a live database is connected — see
// docs/spec/05-hub-translation-localization.md for the page pattern.

import type { LocalizedText } from "./blog";

export type ServiceContent = {
  slug: string;
  iconKey: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  definitionBlock: LocalizedText;
  capabilities: LocalizedText[];
  supportsHybridAI: boolean;
  complianceNote?: LocalizedText;
  basePricePerWord: number;
  faqs: { question: LocalizedText; answer: LocalizedText }[];
};

export const services: ServiceContent[] = [
  {
    slug: "website-localization",
    iconKey: "Globe",
    name: { en: "Website Localization", ar: "توطين المواقع الإلكترونية" },
    shortDescription: {
      en: "Full-site translation with RTL layout adaptation and hreflang SEO.",
      ar: "ترجمة كاملة للموقع مع تكييف تخطيط RTL وتحسين محركات البحث.",
    },
    definitionBlock: {
      en: "Website localization is the adaptation of a site's copy, layout, and metadata for a target market — including RTL mirroring for Arabic, locale-specific hreflang tags, and cultural adaptation of imagery. JUSOR combines AI-assisted string extraction with native linguist review to localize sites without breaking SEO equity or layout integrity.",
      ar: "توطين المواقع الإلكترونية هو تكييف محتوى الموقع وتخطيطه وبياناته الوصفية للسوق المستهدف — بما في ذلك عكس التخطيط للعربية (RTL)، وعلامات hreflang الخاصة باللغة، والتكييف الثقافي للصور. تجمع جسور بين استخراج النصوص بمساعدة الذكاء الاصطناعي ومراجعة لغوية بشرية لتوطين المواقع دون الإضرار بترتيب محركات البحث أو سلامة التخطيط.",
    },
    capabilities: [
      { en: "CMS-integrated translation (WordPress, Webflow, Shopify)", ar: "ترجمة متكاملة مع أنظمة إدارة المحتوى (WordPress، Webflow، Shopify)" },
      { en: "RTL layout QA for Arabic and Urdu markets", ar: "فحص جودة تخطيط RTL للأسواق العربية والأردية" },
      { en: "hreflang and canonical tag implementation review", ar: "مراجعة تطبيق علامات hreflang والروابط الأساسية" },
      { en: "SEO-preserving meta title/description localization", ar: "توطين العناوين والأوصاف الوصفية مع الحفاظ على تحسين محركات البحث" },
    ],
    supportsHybridAI: true,
    basePricePerWord: 0.13,
    faqs: [
      {
        question: { en: "Will localizing my site hurt my SEO rankings?", ar: "هل سيؤثر توطين موقعي سلباً على ترتيبي في محركات البحث؟" },
        answer: {
          en: "No — our process preserves canonical URLs, implements correct hreflang tags, and localizes metadata alongside content, which typically improves rankings in the target market rather than harming existing ones.",
          ar: "لا — تحافظ عمليتنا على الروابط الأساسية، وتطبق علامات hreflang الصحيحة، وتوطن البيانات الوصفية جنباً إلى جنب مع المحتوى، ما يحسّن الترتيب في السوق المستهدف عادة بدلاً من الإضرار بالترتيب الحالي.",
        },
      },
      {
        question: { en: "Do you support RTL layout testing, not just translation?", ar: "هل تدعمون اختبار تخطيط RTL وليس الترجمة فقط؟" },
        answer: {
          en: "Yes — we perform visual QA on the mirrored Arabic layout to catch broken components, icon direction issues, and text-overflow before launch.",
          ar: "نعم — نجري فحص جودة بصري للتخطيط العربي المعكوس لاكتشاف المكونات المكسورة ومشاكل اتجاه الأيقونات وتجاوز النص قبل الإطلاق.",
        },
      },
    ],
  },
  {
    slug: "software-localization",
    iconKey: "Smartphone",
    name: { en: "Software & App Localization", ar: "توطين البرمجيات والتطبيقات" },
    shortDescription: {
      en: "String extraction, pseudo-localization QA, CI/CD-integrated workflows.",
      ar: "استخراج النصوص، اختبار جودة الترجمة، وتكامل مع بيئات التطوير المستمر.",
    },
    definitionBlock: {
      en: "Software localization is the adaptation of an application's UI text, date/number formats, and layout — including RTL support — for a target market, beyond literal translation. JUSOR combines AI-assisted string extraction with native linguist review and pseudo-localization QA, integrating directly with Crowdin, Phrase, and Trados workflows for continuous-delivery pipelines.",
      ar: "توطين البرمجيات هو تكييف نصوص واجهة التطبيق وتنسيقات التاريخ والأرقام والتخطيط — بما في ذلك دعم RTL — للسوق المستهدف، بما يتجاوز الترجمة الحرفية. تجمع جسور بين استخراج النصوص بمساعدة الذكاء الاصطناعي ومراجعة لغوية بشرية واختبار توطين وهمي، مع تكامل مباشر مع أدوات Crowdin وPhrase وTrados ضمن خطوط التسليم المستمر.",
    },
    capabilities: [
      { en: "String extraction from iOS/Android/web codebases", ar: "استخراج النصوص من قواعد أكواد iOS وAndroid والويب" },
      { en: "Pseudo-localization QA to catch text-truncation bugs early", ar: "اختبار توطين وهمي لاكتشاف مشاكل اقتطاع النص مبكراً" },
      { en: "CI/CD integration via Crowdin, Phrase, and Trados", ar: "تكامل مع خطوط التسليم المستمر عبر Crowdin وPhrase وTrados" },
      { en: "RTL UI testing for Arabic-language app releases", ar: "اختبار واجهة RTL لإصدارات التطبيقات باللغة العربية" },
    ],
    supportsHybridAI: true,
    basePricePerWord: 0.14,
    faqs: [
      {
        question: { en: "Can you integrate directly with our translation management system?", ar: "هل يمكنكم التكامل مباشرة مع نظام إدارة الترجمة لدينا؟" },
        answer: {
          en: "Yes — we work natively inside Crowdin, Phrase, and Trados, so new strings sync automatically without manual file handoffs.",
          ar: "نعم — نعمل مباشرة داخل Crowdin وPhrase وTrados، بحيث تتم مزامنة النصوص الجديدة تلقائياً دون تسليم ملفات يدوي.",
        },
      },
      {
        question: { en: "What is pseudo-localization and why does it matter?", ar: "ما هو التوطين الوهمي ولماذا يهم؟" },
        answer: {
          en: "Pseudo-localization replaces UI strings with elongated placeholder text to catch layout truncation and hard-coded strings before real translation begins, saving rework later.",
          ar: "يستبدل التوطين الوهمي نصوص الواجهة بنص بديل مطوّل لاكتشاف اقتطاع التخطيط والنصوص المكتوبة بشكل ثابت قبل بدء الترجمة الفعلية، ما يوفر إعادة العمل لاحقاً.",
        },
      },
    ],
  },
  {
    slug: "game-localization",
    iconKey: "Gamepad2",
    name: { en: "Game Localization", ar: "توطين الألعاب" },
    shortDescription: {
      en: "In-game text, voice-over, and cultural adaptation for global releases.",
      ar: "ترجمة نصوص الألعاب والتعليق الصوتي والتكييف الثقافي للإصدارات العالمية.",
    },
    definitionBlock: {
      en: "Game localization adapts in-game text, voice-over, UI, and cultural references for a target market while preserving tone, humor, and character voice. JUSOR localizes games across genres with native linguists experienced in gaming terminology, supporting simship (simultaneous shipment) release schedules.",
      ar: "توطين الألعاب يكيّف النصوص داخل اللعبة والتعليق الصوتي والواجهة والمراجع الثقافية للسوق المستهدف مع الحفاظ على النبرة والفكاهة وصوت الشخصية. توطن جسور الألعاب عبر مختلف الأنواع بمترجمين أصليين ذوي خبرة في مصطلحات الألعاب، وتدعم جداول الإصدار المتزامن (simship).",
    },
    capabilities: [
      { en: "In-game text and UI string translation with character-limit awareness", ar: "ترجمة نصوص اللعبة والواجهة مع مراعاة حدود عدد الأحرف" },
      { en: "Voice-over casting and dubbing coordination", ar: "تنسيق اختيار الأصوات والدبلجة" },
      { en: "Cultural adaptation of jokes, idioms, and references", ar: "التكييف الثقافي للنكات والتعابير والمراجع" },
      { en: "Simship-ready workflows for day-one global releases", ar: "سير عمل جاهز للإصدار المتزامن للإطلاق العالمي في اليوم الأول" },
    ],
    supportsHybridAI: false,
    basePricePerWord: 0.16,
    faqs: [
      {
        question: { en: "Can you handle character limits in dialogue boxes?", ar: "هل يمكنكم مراعاة حدود الأحرف في مربعات الحوار؟" },
        answer: {
          en: "Yes — our linguists work within specified character limits per string, flagging any translations that would overflow the original UI space.",
          ar: "نعم — يعمل مترجمونا ضمن حدود الأحرف المحددة لكل نص، مع تحديد أي ترجمة قد تتجاوز مساحة الواجهة الأصلية.",
        },
      },
    ],
  },
  {
    slug: "technical-translation",
    iconKey: "FileCog",
    name: { en: "Technical Translation", ar: "الترجمة التقنية" },
    shortDescription: {
      en: "Manuals, engineering specs, and technical documentation translated with precision.",
      ar: "ترجمة الأدلة والمواصفات الهندسية والوثائق التقنية بدقة.",
    },
    definitionBlock: {
      en: "Technical translation renders manuals, engineering specifications, and technical documentation into a target language while preserving exact terminology, units, and formatting. JUSOR assigns subject-matter-qualified translators for engineering, IT, and manufacturing documentation, not generalist linguists.",
      ar: "الترجمة التقنية تنقل الأدلة والمواصفات الهندسية والوثائق التقنية إلى اللغة المطلوبة مع الحفاظ على المصطلحات والوحدات والتنسيق بدقة. تسند جسور الوثائق الهندسية وتقنية المعلومات والتصنيع لمترجمين متخصصين في المجال، لا لمترجمين عموميين.",
    },
    capabilities: [
      { en: "Engineering, IT, and manufacturing subject-matter translators", ar: "مترجمون متخصصون في الهندسة وتقنية المعلومات والتصنيع" },
      { en: "Terminology management and glossary consistency across documents", ar: "إدارة المصطلحات وضمان الاتساق عبر المستندات" },
      { en: "Desktop publishing (DTP) for diagrams, tables, and CAD annotations", ar: "نشر مكتبي للمخططات والجداول وتعليقات CAD" },
    ],
    supportsHybridAI: true,
    basePricePerWord: 0.15,
    faqs: [
      {
        question: { en: "Do your translators have engineering backgrounds?", ar: "هل يمتلك مترجموكم خلفية هندسية؟" },
        answer: {
          en: "Yes — technical documents are assigned to linguists with relevant engineering, IT, or manufacturing subject-matter expertise, not general-purpose translators.",
          ar: "نعم — تُسند المستندات التقنية لمترجمين ذوي خبرة متخصصة في الهندسة أو تقنية المعلومات أو التصنيع، لا لمترجمين عموميين.",
        },
      },
    ],
  },
  {
    slug: "medical-translation",
    iconKey: "Stethoscope",
    name: { en: "Medical Translation", ar: "الترجمة الطبية" },
    shortDescription: {
      en: "Precise, confidential translation of medical reports and records.",
      ar: "ترجمة دقيقة وسرية للتقارير والسجلات الطبية.",
    },
    definitionBlock: {
      en: "Medical translation renders clinical records, pharmaceutical documentation, and patient reports into a target language with exact medical terminology and strict confidentiality protocols. JUSOR assigns medically trained linguists for clinical trial documents, patient records, and pharmaceutical labeling.",
      ar: "الترجمة الطبية تنقل السجلات السريرية والوثائق الصيدلانية وتقارير المرضى إلى اللغة المطلوبة بمصطلحات طبية دقيقة وبروتوكولات سرية صارمة. تسند جسور وثائق التجارب السريرية وسجلات المرضى وملصقات الأدوية لمترجمين مؤهلين طبياً.",
    },
    capabilities: [
      { en: "Medically trained linguists for clinical and pharmaceutical content", ar: "مترجمون مؤهلون طبياً للمحتوى السريري والصيدلاني" },
      { en: "Strict confidentiality protocols and signed NDAs", ar: "بروتوكولات سرية صارمة واتفاقيات عدم إفصاح موقعة" },
      { en: "Clinical trial documentation and patient-reported outcome translation", ar: "ترجمة وثائق التجارب السريرية ونتائج المرضى المُبلَّغ عنها" },
    ],
    supportsHybridAI: false,
    complianceNote: {
      en: "All medical translation projects are handled under strict data confidentiality protocols and NDA, with translator access limited on a need-to-know basis.",
      ar: "تُدار جميع مشاريع الترجمة الطبية وفق بروتوكولات سرية بيانات صارمة واتفاقية عدم إفصاح، مع تقييد وصول المترجمين حسب الحاجة فقط.",
    },
    basePricePerWord: 0.17,
    faqs: [
      {
        question: { en: "How is patient data kept confidential during translation?", ar: "كيف تُحفظ سرية بيانات المرضى أثناء الترجمة؟" },
        answer: {
          en: "We enforce signed NDAs with every linguist, restrict document access on a need-to-know basis, and use secure file transfer — never open email attachments — for medical records.",
          ar: "نطبق اتفاقيات عدم إفصاح موقعة مع كل مترجم، ونقيّد الوصول للمستندات حسب الحاجة فقط، ونستخدم نقل ملفات آمناً — وليس مرفقات بريد إلكتروني مفتوحة — للسجلات الطبية.",
        },
      },
    ],
  },
  {
    slug: "financial-translation",
    iconKey: "Landmark",
    name: { en: "Financial Translation", ar: "الترجمة المالية" },
    shortDescription: {
      en: "Accurate translation of statements, audits, and financial disclosures.",
      ar: "ترجمة دقيقة للبيانات المالية والتقارير والإفصاحات.",
    },
    definitionBlock: {
      en: "Financial translation renders audited statements, tax reports, and investor disclosures into a target language while preserving IFRS-aligned terminology and exact numeric accuracy. JUSOR's financial division processes annual reports, prospectuses, and audit files for corporate and banking clients.",
      ar: "الترجمة المالية تنقل القوائم المدققة والتقارير الضريبية وإفصاحات المستثمرين إلى اللغة المطلوبة مع الحفاظ على مصطلحات متوافقة مع معايير IFRS ودقة رقمية كاملة. يعالج قسم الترجمة المالية لدى جسور التقارير السنوية ونشرات الاكتتاب وملفات التدقيق لعملاء الشركات والبنوك.",
    },
    capabilities: [
      { en: "IFRS/IAS-aligned terminology for financial statements", ar: "مصطلحات متوافقة مع معايير IFRS/IAS للقوائم المالية" },
      { en: "Numeric table preservation via desktop publishing tools", ar: "الحفاظ على الجداول الرقمية عبر أدوات النشر المكتبي" },
      { en: "Investor prospectus and annual report translation", ar: "ترجمة نشرات الاكتتاب والتقارير السنوية" },
    ],
    supportsHybridAI: true,
    basePricePerWord: 0.16,
    faqs: [
      {
        question: { en: "Can you preserve complex financial table formatting?", ar: "هل يمكنكم الحفاظ على تنسيق الجداول المالية المعقدة؟" },
        answer: {
          en: "Yes — we use desktop publishing tools to lock numeric cells and translate only text labels, preserving the original table structure exactly.",
          ar: "نعم — نستخدم أدوات نشر مكتبي لقفل الخلايا الرقمية وترجمة النصوص فقط، مع الحفاظ على بنية الجدول الأصلية تماماً.",
        },
      },
    ],
  },
  {
    slug: "voice-over-subtitling",
    iconKey: "Speaker",
    name: { en: "Voice-over & Subtitling", ar: "التعليق الصوتي والترجمة النصية" },
    shortDescription: {
      en: "Professional dubbing and subtitle localization for media.",
      ar: "دبلجة احترافية وتوطين الترجمة النصية للمحتوى الإعلامي.",
    },
    definitionBlock: {
      en: "Voice-over and subtitling services adapt spoken and on-screen text for film, corporate video, and e-learning content, including timed subtitle files (SRT/VTT) and professional dubbing with native voice talent. JUSOR delivers broadcast-ready localized media across 60+ language pairs.",
      ar: "خدمات التعليق الصوتي والترجمة النصية تكيّف النص المنطوق والمعروض على الشاشة للأفلام وفيديوهات الشركات والمحتوى التعليمي، بما في ذلك ملفات الترجمة النصية المؤقتة (SRT/VTT) والدبلجة الاحترافية بأصوات أصلية. تقدم جسور محتوى إعلامياً موطّناً جاهزاً للبث عبر أكثر من 60 زوجاً لغوياً.",
    },
    capabilities: [
      { en: "Timed subtitle files (SRT/VTT) with reading-speed optimization", ar: "ملفات ترجمة نصية مؤقتة (SRT/VTT) محسّنة لسرعة القراءة" },
      { en: "Native voice-over talent casting and studio dubbing", ar: "اختيار أصوات أصلية ودبلجة استوديو احترافية" },
      { en: "Broadcast-ready delivery for film, corporate video, and e-learning", ar: "تسليم جاهز للبث للأفلام وفيديوهات الشركات والمحتوى التعليمي" },
    ],
    supportsHybridAI: false,
    basePricePerWord: 0.12,
    faqs: [
      {
        question: { en: "Do you provide native voice talent, not text-to-speech?", ar: "هل تقدمون أصواتاً بشرية أصلية وليس تحويل نص إلى كلام؟" },
        answer: {
          en: "Yes — our dubbing service uses professional native voice talent recorded in studio, not synthetic text-to-speech, for broadcast-quality results.",
          ar: "نعم — تستخدم خدمة الدبلجة لدينا أصواتاً بشرية أصلية احترافية مسجلة في استوديو، وليس تحويل نص إلى كلام اصطناعي، لضمان جودة تصلح للبث.",
        },
      },
    ],
  },
  {
    slug: "ai-human-hybrid",
    iconKey: "Sparkles",
    name: { en: "AI + Human Review Hybrid Translation", ar: "الترجمة الهجينة (ذكاء اصطناعي وبشري)" },
    shortDescription: {
      en: "AI-accelerated draft translation with full native linguist review and QA.",
      ar: "ترجمة أولية مسرّعة بالذكاء الاصطناعي مع مراجعة لغوية بشرية كاملة وضبط جودة.",
    },
    definitionBlock: {
      en: "AI + human hybrid translation combines a machine-generated first-pass draft with full native-linguist review and a dedicated QA pass, cutting turnaround time while preserving human-verified accuracy. JUSOR uses this workflow for high-volume content such as product catalogs, help centers, and internal documentation.",
      ar: "الترجمة الهجينة تجمع بين مسودة أولية تُنتج بالذكاء الاصطناعي ومراجعة لغوية بشرية كاملة وضبط جودة مخصص، ما يقلل وقت التسليم مع الحفاظ على دقة موثقة بشرياً. تستخدم جسور هذا السير في المحتوى عالي الحجم مثل كتالوجات المنتجات ومراكز المساعدة والوثائق الداخلية.",
    },
    capabilities: [
      { en: "AI-accelerated first-pass draft translation", ar: "مسودة ترجمة أولية مسرّعة بالذكاء الاصطناعي" },
      { en: "Full native-linguist review pass on every AI draft", ar: "مراجعة لغوية بشرية كاملة لكل مسودة ذكاء اصطناعي" },
      { en: "Dedicated QA pass before final delivery", ar: "ضبط جودة مخصص قبل التسليم النهائي" },
      { en: "Best suited for high-volume, lower-formality content", ar: "الأنسب للمحتوى عالي الحجم ومنخفض الرسمية" },
    ],
    supportsHybridAI: true,
    basePricePerWord: 0.09,
    faqs: [
      {
        question: { en: "Is AI-translated content actually reviewed by a human?", ar: "هل يراجع إنسان فعلياً المحتوى المترجم بالذكاء الاصطناعي؟" },
        answer: {
          en: "Yes — every AI-generated draft goes through a full native-linguist review and a separate QA pass before delivery. No AI output ships unreviewed.",
          ar: "نعم — تمر كل مسودة تُنتج بالذكاء الاصطناعي بمراجعة لغوية بشرية كاملة وضبط جودة منفصل قبل التسليم. لا يُسلَّم أي ناتج ذكاء اصطناعي دون مراجعة.",
        },
      },
      {
        question: { en: "What content is a good fit for the hybrid workflow?", ar: "ما المحتوى المناسب لسير العمل الهجين؟" },
        answer: {
          en: "High-volume, lower-formality content like product catalogs, help center articles, and internal documentation — not certified legal or medical documents, which require full human translation from the start.",
          ar: "المحتوى عالي الحجم ومنخفض الرسمية مثل كتالوجات المنتجات ومقالات مراكز المساعدة والوثائق الداخلية — وليس المستندات القانونية أو الطبية المعتمدة التي تتطلب ترجمة بشرية كاملة من البداية.",
        },
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
