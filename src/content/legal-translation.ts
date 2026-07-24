// Static content for the Certified Legal Translation Hub, structured to
// mirror the Authority / DocumentType / EmbassyRequirement / LanguagePair
// Prisma models (docs/spec/01-database-schema.prisma) until a live database
// is connected — see docs/spec/04-hub-legal-translation.md for the page
// specs this content drives. Real-world facts (fees, turnaround, required
// documents) are sourced from UAE government/embassy public guidance and the
// Knowledge Base articles already published in src/content/blog.ts.

import type { LocalizedText } from "./blog";

export type AuthorityType =
  | "EMBASSY"
  | "MINISTRY"
  | "COURT"
  | "UNIVERSITY"
  | "IMMIGRATION_OFFICE";

export type DocumentCategory =
  | "CIVIL_REGISTRY"
  | "IDENTITY"
  | "ACADEMIC"
  | "COMMERCIAL"
  | "LEGAL"
  | "MEDICAL"
  | "IMMIGRATION";

export type Authority = {
  slug: string;
  type: AuthorityType;
  countryCode: string;
  name: LocalizedText;
  description: LocalizedText;
  definitionBlock: LocalizedText;
  relatedArticleSlug?: string;
};

export type DocumentType = {
  slug: string;
  category: DocumentCategory;
  name: LocalizedText;
  description: LocalizedText;
  definitionBlock: LocalizedText;
  basePrice: number;
  avgTurnaroundHours: number;
  requiredUploads: { key: string; label: LocalizedText }[];
  relatedArticleSlug?: string;
};

export type EmbassyRequirement = {
  authoritySlug: string;
  documentSlug: string;
  requiresApostille: boolean;
  requiresNotarization: boolean;
  requiresSwornTranslator: boolean;
  turnaroundHours: number;
  checklist: LocalizedText[];
};

export type LanguagePair = {
  slug: string;
  sourceCode: string;
  targetCode: string;
  sourceName: LocalizedText;
  targetName: LocalizedText;
  definitionBlock: LocalizedText;
  demandTier: 1 | 2;
  translatorPoolSize: number;
};

export const authorities: Authority[] = [
  {
    slug: "uk-visa-application-centre-dubai",
    type: "EMBASSY",
    countryCode: "GB",
    name: { en: "UK Visa Application Centre — Dubai", ar: "مركز طلبات التأشيرة البريطانية — دبي" },
    description: {
      en: "Handles UK visa, settlement, and immigration document processing for applicants in the UAE.",
      ar: "يتولى معالجة طلبات التأشيرة البريطانية والاستقرار والهجرة لمقدمي الطلبات في الإمارات.",
    },
    definitionBlock: {
      en: "The UK Visa Application Centre in Dubai processes UK visa and immigration applications for UAE residents, requiring certified English translation of any supporting document not already in English — including birth certificates, marriage certificates, and financial statements — sealed by a UAE Ministry of Justice-licensed translator.",
      ar: "يتولى مركز طلبات التأشيرة البريطانية في دبي معالجة طلبات التأشيرة والهجرة البريطانية لمقيمي الإمارات، ويشترط ترجمة معتمدة للإنجليزية لأي مستند داعم غير صادر بالإنجليزية أصلاً — كشهادات الميلاد والزواج والبيانات المالية — بختم مترجم مرخص من وزارة العدل الإماراتية.",
    },
  },
  {
    slug: "us-consulate-general-dubai",
    type: "EMBASSY",
    countryCode: "US",
    name: { en: "U.S. Consulate General — Dubai", ar: "القنصلية الأمريكية العامة — دبي" },
    description: {
      en: "Processes U.S. visa, citizenship, and civil document requirements for applicants based in the UAE.",
      ar: "تتولى معالجة متطلبات التأشيرة الأمريكية والجنسية والمستندات المدنية لمقدمي الطلبات المقيمين في الإمارات.",
    },
    definitionBlock: {
      en: "The U.S. Consulate General in Dubai requires certified English translation of any foreign-language civil or financial document submitted with visa, fiancé(e), or citizenship applications, typically accompanied by a signed translator's certificate of accuracy.",
      ar: "تشترط القنصلية الأمريكية في دبي ترجمة معتمدة للإنجليزية لأي مستند مدني أو مالي بلغة أجنبية يُقدَّم ضمن طلبات التأشيرة أو الخطوبة أو الجنسية، مصحوبة عادة بشهادة دقة موقعة من المترجم.",
    },
  },
  {
    slug: "canadian-consulate-dubai",
    type: "EMBASSY",
    countryCode: "CA",
    name: { en: "Consulate General of Canada — Dubai", ar: "القنصلية العامة الكندية — دبي" },
    description: {
      en: "Supports Canadian visa, permanent residency, and study permit applications from the UAE.",
      ar: "تدعم طلبات التأشيرة الكندية والإقامة الدائمة وتصاريح الدراسة من الإمارات.",
    },
    definitionBlock: {
      en: "The Consulate General of Canada in Dubai requires certified English or French translation of any supporting document not originally in those languages for visa, permanent residency, or study permit applications, following IRCC translation guidelines.",
      ar: "تشترط القنصلية الكندية في دبي ترجمة معتمدة للإنجليزية أو الفرنسية لأي مستند داعم غير صادر أصلاً بهاتين اللغتين ضمن طلبات التأشيرة أو الإقامة الدائمة أو تصريح الدراسة، وفق إرشادات دائرة الهجرة الكندية IRCC.",
    },
  },
  {
    slug: "german-consulate-dubai",
    type: "EMBASSY",
    countryCode: "DE",
    name: { en: "German Consulate General — Dubai", ar: "القنصلية الألمانية العامة — دبي" },
    description: {
      en: "Handles German visa, work permit, and civil document legalization for applicants in the UAE.",
      ar: "تتولى معالجة التأشيرة الألمانية وتصاريح العمل وتصديق المستندات المدنية لمقدمي الطلبات في الإمارات.",
    },
    definitionBlock: {
      en: "The German Consulate General in Dubai requires certified German translation of civil and academic documents — prepared by a translator sworn in Germany or licensed by the UAE Ministry of Justice — for national visa, work permit, and family reunification applications.",
      ar: "تشترط القنصلية الألمانية في دبي ترجمة معتمدة للألمانية للمستندات المدنية والأكاديمية — من مترجم محلّف في ألمانيا أو مرخص من وزارة العدل الإماراتية — لطلبات التأشيرة الوطنية وتصاريح العمل ولمّ الشمل العائلي.",
    },
  },
  {
    slug: "uae-ministry-of-foreign-affairs",
    type: "MINISTRY",
    countryCode: "AE",
    name: { en: "UAE Ministry of Foreign Affairs (MOFA)", ar: "وزارة الخارجية الإماراتية" },
    description: {
      en: "The final attestation authority validating documents for international legal use, now largely processed via the eDAS 2.0 digital portal.",
      ar: "الجهة النهائية للتصديق التي تمنح المستندات الصفة القانونية الدولية، وتُعالَج غالباً عبر بوابة eDAS 2.0 الرقمية.",
    },
    definitionBlock: {
      en: "The UAE Ministry of Foreign Affairs (MOFA) provides the final legal attestation validating a foreign document for use in the UAE, or a UAE-issued document for use abroad, typically required immediately after certified translation and Ministry of Justice authentication.",
      ar: "توفر وزارة الخارجية الإماراتية التصديق القانوني النهائي الذي يمنح المستند الأجنبي صفة قانونية داخل الدولة، أو يمنح المستند الإماراتي صفة دولية، ويُطلب عادة بعد الترجمة المعتمدة وتصديق وزارة العدل مباشرة.",
    },
    relatedArticleSlug: "mofa-moj-attestation-guide-dubai",
  },
  {
    slug: "uae-ministry-of-justice",
    type: "MINISTRY",
    countryCode: "AE",
    name: { en: "UAE Ministry of Justice (MOJ)", ar: "وزارة العدل الإماراتية" },
    description: {
      en: "Licenses and regulates certified legal translators, notarizes contracts, and authenticates translator seals for international use.",
      ar: "ترخص وتنظم عمل المترجمين القانونيين المعتمدين، وتوثّق العقود، وتصادق على أختام المترجمين للاستخدام الدولي.",
    },
    definitionBlock: {
      en: "The UAE Ministry of Justice licenses certified legal translators, operates the Notary Public and Digital Notary systems, and authenticates translator seals on documents destined for international use or submission to embassies and foreign courts.",
      ar: "ترخص وزارة العدل الإماراتية المترجمين القانونيين المعتمدين، وتدير أنظمة الكاتب العدل والكاتب العدل الرقمي، وتصادق على أختام المترجمين للمستندات الموجهة للاستخدام الدولي أو التقديم للسفارات والمحاكم الأجنبية.",
    },
    relatedArticleSlug: "mofa-moj-attestation-guide-dubai",
  },
  {
    slug: "dubai-courts",
    type: "COURT",
    countryCode: "AE",
    name: { en: "Dubai Courts", ar: "محاكم دبي" },
    description: {
      en: "Onshore civil, commercial, and criminal courts requiring Arabic-language certified translation for all foreign-language filings and evidence.",
      ar: "المحاكم المحلية المدنية والتجارية والجنائية التي تشترط الترجمة المعتمدة للعربية لكافة المذكرات والأدلة الأجنبية.",
    },
    definitionBlock: {
      en: "Dubai Courts operate under a codified Civil Law system requiring Arabic as the sole official language for all pleadings, motions, and evidentiary submissions — making certified legal translation a procedural necessity for any foreign-language contract, statement, or exhibit.",
      ar: "تعمل محاكم دبي وفق نظام قانون مدني مكتوب يشترط اللغة العربية كلغة رسمية وحيدة لكافة الدفوع والمذكرات ومستندات الإثبات — ما يجعل الترجمة القانونية المعتمدة ضرورة إجرائية لأي عقد أو إفادة أو مستند أجنبي.",
    },
    relatedArticleSlug: "certified-translation-statements-of-claim-court-judgments-dubai",
  },
  {
    slug: "difc-courts",
    type: "COURT",
    countryCode: "AE",
    name: { en: "DIFC Courts", ar: "محاكم مركز دبي المالي العالمي" },
    description: {
      en: "The offshore Common Law courts of the Dubai International Financial Centre, handling civil and commercial disputes in English.",
      ar: "المحاكم الأجنبية القائمة على القانون العام في مركز دبي المالي العالمي، وتتولى النزاعات المدنية والتجارية بالإنجليزية.",
    },
    definitionBlock: {
      en: "The DIFC Courts operate under an English-language Common Law framework, but still require certified Arabic translation of judgments and orders when enforcement is sought before onshore Dubai Courts or federal authorities.",
      ar: "تعمل محاكم مركز دبي المالي العالمي وفق نظام القانون العام باللغة الإنجليزية، لكنها لا تزال تشترط ترجمة معتمدة للعربية للأحكام والأوامر عند طلب التنفيذ أمام محاكم دبي المحلية أو الجهات الاتحادية.",
    },
  },
  {
    slug: "federal-tax-authority",
    type: "MINISTRY",
    countryCode: "AE",
    name: { en: "Federal Tax Authority (FTA)", ar: "الهيئة الاتحادية للضرائب" },
    description: {
      en: "Regulates corporate tax and VAT compliance, requiring Arabic-language or certified-translated financial records during audits.",
      ar: "تنظم الامتثال لضريبة الشركات وضريبة القيمة المضافة، وتشترط سجلات مالية بالعربية أو مترجمة ترجمة معتمدة أثناء التدقيق.",
    },
    definitionBlock: {
      en: "The Federal Tax Authority requires audited financial statements, transfer pricing files, and tax objection memorandums to be maintained in Arabic or accompanied by a Ministry of Justice-licensed certified translation during tax audits and dispute proceedings.",
      ar: "تشترط الهيئة الاتحادية للضرائب أن تكون القوائم المالية المدققة وملفات التسعير التحويلي ومذكرات الاعتراضات الضريبية بالعربية أو مصحوبة بترجمة معتمدة من مترجم مرخص لدى وزارة العدل أثناء التدقيق والمنازعات الضريبية.",
    },
    relatedArticleSlug: "corporate-tax-vat-fta-compliance-translation-dubai",
  },
  {
    slug: "ministry-of-education",
    type: "MINISTRY",
    countryCode: "AE",
    name: { en: "UAE Ministry of Education (MOE)", ar: "وزارة التربية والتعليم الإماراتية" },
    description: {
      en: "Equates and attests foreign academic degrees for employment and residency purposes in the UAE.",
      ar: "تعادل وتصادق على الشهادات الجامعية الأجنبية لأغراض التوظيف والإقامة في الإمارات.",
    },
    definitionBlock: {
      en: "The UAE Ministry of Education attests and equates foreign degree certificates for employment and residency visa purposes, requiring a certified Arabic translation of the degree and transcript alongside the original attestation chain from the issuing country.",
      ar: "تصادق وزارة التربية والتعليم الإماراتية وتعادل الشهادات الجامعية الأجنبية لأغراض التوظيف وتأشيرات الإقامة، وتشترط ترجمة معتمدة للعربية للشهادة وكشف الدرجات إلى جانب سلسلة التصديق الأصلية من بلد الإصدار.",
    },
    relatedArticleSlug: "degree-certificate-attestation-dubai",
  },
];

export const documentTypes: DocumentType[] = [
  {
    "slug": "birth-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "UAE Birth Certificate",
      "ar": "شهادة ميلاد صادرة من الإمارات"
    },
    "description": {
      "en": "Certified legal translation of UAE Birth Certificate (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ميلاد صادرة من الإمارات (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of UAE Birth Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ميلاد صادرة من الإمارات بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "UAE Birth Certificate (PDF/Image)",
          "ar": "شهادة ميلاد صادرة من الإمارات (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "egyptian-digital-birth-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Egyptian Digital Birth Certificate",
      "ar": "شهادة ميلاد مصرية (مميكنه)"
    },
    "description": {
      "en": "Certified legal translation of Egyptian Digital Birth Certificate (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ميلاد مصرية (مميكنه) (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Egyptian Digital Birth Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ميلاد مصرية (مميكنه) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Egyptian Digital Birth Certificate (PDF/Image)",
          "ar": "شهادة ميلاد مصرية (مميكنه) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "egyptian-standard-birth-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Egyptian Standard Birth Certificate",
      "ar": "شهادة ميلاد مصرية (عاديه)"
    },
    "description": {
      "en": "Certified legal translation of Egyptian Standard Birth Certificate (105 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ميلاد مصرية (عاديه) (105 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Egyptian Standard Birth Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (105 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ميلاد مصرية (عاديه) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (105 درهم)."
    },
    "basePrice": 105,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Egyptian Standard Birth Certificate (PDF/Image)",
          "ar": "شهادة ميلاد مصرية (عاديه) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "syrian-birth-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Syrian Birth Certificate",
      "ar": "شهادة ميلاد سورية"
    },
    "description": {
      "en": "Certified legal translation of Syrian Birth Certificate (105 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ميلاد سورية (105 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Syrian Birth Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (105 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ميلاد سورية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (105 درهم)."
    },
    "basePrice": 105,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Syrian Birth Certificate (PDF/Image)",
          "ar": "شهادة ميلاد سورية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "jordanian-foreign-birth-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Jordanian & Foreign Birth Certificate",
      "ar": "شهادة ميلاد أردنية / جنسيات أخرى"
    },
    "description": {
      "en": "Certified legal translation of Jordanian & Foreign Birth Certificate (105 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ميلاد أردنية / جنسيات أخرى (105 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Jordanian & Foreign Birth Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (105 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ميلاد أردنية / جنسيات أخرى بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (105 درهم)."
    },
    "basePrice": 105,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Jordanian & Foreign Birth Certificate (PDF/Image)",
          "ar": "شهادة ميلاد أردنية / جنسيات أخرى (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "death-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Death Certificate (UAE / Foreign)",
      "ar": "شهادة وفاة (إماراتية أو أجنبية)"
    },
    "description": {
      "en": "Certified legal translation of Death Certificate (UAE / Foreign) (60 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة وفاة (إماراتية أو أجنبية) (60 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Death Certificate (UAE / Foreign) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (60 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة وفاة (إماراتية أو أجنبية) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (60 درهم)."
    },
    "basePrice": 60,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Death Certificate (UAE / Foreign) (PDF/Image)",
          "ar": "شهادة وفاة (إماراتية أو أجنبية) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "marriage-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Dubai Courts Marriage Certificate",
      "ar": "عقد زواج صادر من محاكم دبي"
    },
    "description": {
      "en": "Certified legal translation of Dubai Courts Marriage Certificate (60 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد زواج صادر من محاكم دبي (60 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Dubai Courts Marriage Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (60 AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد زواج صادر من محاكم دبي بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (60 درهم)."
    },
    "basePrice": 60,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Dubai Courts Marriage Certificate (PDF/Image)",
          "ar": "عقد زواج صادر من محاكم دبي (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "sharjah-marriage-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Sharjah Marriage Certificate",
      "ar": "عقد زواج صادر من الشارقة"
    },
    "description": {
      "en": "Certified legal translation of Sharjah Marriage Certificate (60 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد زواج صادر من الشارقة (60 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Sharjah Marriage Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (60 AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد زواج صادر من الشارقة بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (60 درهم)."
    },
    "basePrice": 60,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Sharjah Marriage Certificate (PDF/Image)",
          "ar": "عقد زواج صادر من الشارقة (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "egyptian-digital-marriage-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Egyptian Digital Marriage Certificate",
      "ar": "عقد زواج مصري (مميكن)"
    },
    "description": {
      "en": "Certified legal translation of Egyptian Digital Marriage Certificate (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد زواج مصري (مميكن) (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Egyptian Digital Marriage Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد زواج مصري (مميكن) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Egyptian Digital Marriage Certificate (PDF/Image)",
          "ar": "عقد زواج مصري (مميكن) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "egyptian-standard-marriage-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Egyptian Standard Marriage Certificate",
      "ar": "عقد زواج مصري (عادي)"
    },
    "description": {
      "en": "Certified legal translation of Egyptian Standard Marriage Certificate (105 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد زواج مصري (عادي) (105 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Egyptian Standard Marriage Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (105 AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد زواج مصري (عادي) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (105 درهم)."
    },
    "basePrice": 105,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Egyptian Standard Marriage Certificate (PDF/Image)",
          "ar": "عقد زواج مصري (عادي) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "syrian-marriage-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Syrian Marriage Certificate",
      "ar": "عقد زواج سوري"
    },
    "description": {
      "en": "Certified legal translation of Syrian Marriage Certificate (105 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد زواج سوري (105 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Syrian Marriage Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (105 AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد زواج سوري بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (105 درهم)."
    },
    "basePrice": 105,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Syrian Marriage Certificate (PDF/Image)",
          "ar": "عقد زواج سوري (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "divorce-certificate",
    "category": "CIVIL_REGISTRY",
    "name": {
      "en": "Divorce Certificate / Decree",
      "ar": "اشهاد طلاق / وثيقة طلاق"
    },
    "description": {
      "en": "Certified legal translation of Divorce Certificate / Decree (40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ اشهاد طلاق / وثيقة طلاق (40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Divorce Certificate / Decree is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ اشهاد طلاق / وثيقة طلاق بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Divorce Certificate / Decree (PDF/Image)",
          "ar": "اشهاد طلاق / وثيقة طلاق (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "dubai-ejari-tenancy-contract",
    "category": "LEGAL",
    "name": {
      "en": "Dubai Ejari Tenancy Contract",
      "ar": "عقد إيجار دبي (إيجاري / Ejari)"
    },
    "description": {
      "en": "Certified legal translation of Dubai Ejari Tenancy Contract (40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد إيجار دبي (إيجاري / Ejari) (40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Dubai Ejari Tenancy Contract is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد إيجار دبي (إيجاري / Ejari) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Dubai Ejari Tenancy Contract (PDF/Image)",
          "ar": "عقد إيجار دبي (إيجاري / Ejari) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "sharjah-tenancy-contract",
    "category": "LEGAL",
    "name": {
      "en": "Sharjah Tenancy Contract",
      "ar": "عقد إيجار الشارقة"
    },
    "description": {
      "en": "Certified legal translation of Sharjah Tenancy Contract (40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد إيجار الشارقة (40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Sharjah Tenancy Contract is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد إيجار الشارقة بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Sharjah Tenancy Contract (PDF/Image)",
          "ar": "عقد إيجار الشارقة (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "uae-tenancy-contract",
    "category": "LEGAL",
    "name": {
      "en": "Ajman & UAE Tenancy Contract",
      "ar": "عقد إيجار عجمان / باقي الإمارات"
    },
    "description": {
      "en": "Certified legal translation of Ajman & UAE Tenancy Contract (40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد إيجار عجمان / باقي الإمارات (40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Ajman & UAE Tenancy Contract is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد إيجار عجمان / باقي الإمارات بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Ajman & UAE Tenancy Contract (PDF/Image)",
          "ar": "عقد إيجار عجمان / باقي الإمارات (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "property-title-deed",
    "category": "LEGAL",
    "name": {
      "en": "Property Title Deed",
      "ar": "سند ملكية عقار (Title Deed)"
    },
    "description": {
      "en": "Certified legal translation of Property Title Deed (60 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ سند ملكية عقار (Title Deed) (60 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Property Title Deed is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (60 AED).",
      "ar": "تتم الترجمة المعتمدة لـ سند ملكية عقار (Title Deed) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (60 درهم)."
    },
    "basePrice": 60,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Property Title Deed (PDF/Image)",
          "ar": "سند ملكية عقار (Title Deed) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "site-plan-certificate",
    "category": "LEGAL",
    "name": {
      "en": "Site Plan / Real Estate Certificate",
      "ar": "شهادة الاستمارة العقارية / المخطط"
    },
    "description": {
      "en": "Certified legal translation of Site Plan / Real Estate Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة الاستمارة العقارية / المخطط (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Site Plan / Real Estate Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة الاستمارة العقارية / المخطط بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Site Plan / Real Estate Certificate (PDF/Image)",
          "ar": "شهادة الاستمارة العقارية / المخطط (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "dubai-ded-trade-license",
    "category": "COMMERCIAL",
    "name": {
      "en": "Dubai DED Trade License",
      "ar": "رخصة تجارية صادرة من دبي (DED)"
    },
    "description": {
      "en": "Certified legal translation of Dubai DED Trade License (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ رخصة تجارية صادرة من دبي (DED) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Dubai DED Trade License is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ رخصة تجارية صادرة من دبي (DED) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Dubai DED Trade License (PDF/Image)",
          "ar": "رخصة تجارية صادرة من دبي (DED) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "free-zone-trade-license",
    "category": "COMMERCIAL",
    "name": {
      "en": "Free Zone Trade License",
      "ar": "رخصة تجارية منطقة حرة (JAFZA / DAFZA / RAKEZ)"
    },
    "description": {
      "en": "Certified legal translation of Free Zone Trade License (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ رخصة تجارية منطقة حرة (JAFZA / DAFZA / RAKEZ) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Free Zone Trade License is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ رخصة تجارية منطقة حرة (JAFZA / DAFZA / RAKEZ) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Free Zone Trade License (PDF/Image)",
          "ar": "رخصة تجارية منطقة حرة (JAFZA / DAFZA / RAKEZ) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "commercial-register-moa",
    "category": "COMMERCIAL",
    "name": {
      "en": "Memorandum of Association (MOA)",
      "ar": "عقد تأسيس شركة (MOA) - صفحة أولى / ملخص"
    },
    "description": {
      "en": "Certified legal translation of Memorandum of Association (MOA) (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد تأسيس شركة (MOA) - صفحة أولى / ملخص (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Memorandum of Association (MOA) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد تأسيس شركة (MOA) - صفحة أولى / ملخص بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Memorandum of Association (MOA) (PDF/Image)",
          "ar": "عقد تأسيس شركة (MOA) - صفحة أولى / ملخص (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "commercial-register-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Commercial Register Certificate",
      "ar": "شهادة السجل التجاري"
    },
    "description": {
      "en": "Certified legal translation of Commercial Register Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة السجل التجاري (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Commercial Register Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة السجل التجاري بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Commercial Register Certificate (PDF/Image)",
          "ar": "شهادة السجل التجاري (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "business-activity-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Business Activity License Certificate",
      "ar": "شهادة استمرارية حيازة / رخصة نشاط"
    },
    "description": {
      "en": "Certified legal translation of Business Activity License Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة استمرارية حيازة / رخصة نشاط (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Business Activity License Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة استمرارية حيازة / رخصة نشاط بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Business Activity License Certificate (PDF/Image)",
          "ar": "شهادة استمرارية حيازة / رخصة نشاط (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "degree-certificate",
    "category": "ACADEMIC",
    "name": {
      "en": "University Degree Certificate",
      "ar": "شهادة التخرج الجامعية (إماراتية أو خارجية)"
    },
    "description": {
      "en": "Certified legal translation of University Degree Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة التخرج الجامعية (إماراتية أو خارجية) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of University Degree Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة التخرج الجامعية (إماراتية أو خارجية) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "University Degree Certificate (PDF/Image)",
          "ar": "شهادة التخرج الجامعية (إماراتية أو خارجية) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "academic-transcript",
    "category": "ACADEMIC",
    "name": {
      "en": "Academic Transcript (Single Page)",
      "ar": "كشف الدرجات الجامعي (صفحة واحدة)"
    },
    "description": {
      "en": "Certified legal translation of Academic Transcript (Single Page) (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ كشف الدرجات الجامعي (صفحة واحدة) (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Academic Transcript (Single Page) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ كشف الدرجات الجامعي (صفحة واحدة) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Academic Transcript (Single Page) (PDF/Image)",
          "ar": "كشف الدرجات الجامعي (صفحة واحدة) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "high-school-certificate",
    "category": "ACADEMIC",
    "name": {
      "en": "High School Diploma / School Certificate",
      "ar": "شهادة الثانوية العامة / المدرسية"
    },
    "description": {
      "en": "Certified legal translation of High School Diploma / School Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة الثانوية العامة / المدرسية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of High School Diploma / School Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة الثانوية العامة / المدرسية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "High School Diploma / School Certificate (PDF/Image)",
          "ar": "شهادة الثانوية العامة / المدرسية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "vocational-diploma",
    "category": "ACADEMIC",
    "name": {
      "en": "Vocational / Technical Diploma",
      "ar": "شهادة الدبلوم المهني / الفني"
    },
    "description": {
      "en": "Certified legal translation of Vocational / Technical Diploma (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة الدبلوم المهني / الفني (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Vocational / Technical Diploma is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة الدبلوم المهني / الفني بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Vocational / Technical Diploma (PDF/Image)",
          "ar": "شهادة الدبلوم المهني / الفني (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "uae-police-clearance",
    "category": "IDENTITY",
    "name": {
      "en": "UAE Police Clearance Certificate",
      "ar": "شهادة حسن سير وسلوك (إماراتية)"
    },
    "description": {
      "en": "Certified legal translation of UAE Police Clearance Certificate (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة حسن سير وسلوك (إماراتية) (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of UAE Police Clearance Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة حسن سير وسلوك (إماراتية) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "UAE Police Clearance Certificate (PDF/Image)",
          "ar": "شهادة حسن سير وسلوك (إماراتية) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "foreign-criminal-record",
    "category": "IDENTITY",
    "name": {
      "en": "Foreign Criminal Record Certificate",
      "ar": "شهادة بحث حالة جنائية (خارجية)"
    },
    "description": {
      "en": "Certified legal translation of Foreign Criminal Record Certificate (40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة بحث حالة جنائية (خارجية) (40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Foreign Criminal Record Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة بحث حالة جنائية (خارجية) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Foreign Criminal Record Certificate (PDF/Image)",
          "ar": "شهادة بحث حالة جنائية (خارجية) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "driving-license",
    "category": "IDENTITY",
    "name": {
      "en": "Driving License (UAE / Foreign)",
      "ar": "رخصة قيادة إماراتية / أجنبية"
    },
    "description": {
      "en": "Certified legal translation of Driving License (UAE / Foreign) (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ رخصة قيادة إماراتية / أجنبية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Driving License (UAE / Foreign) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ رخصة قيادة إماراتية / أجنبية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Driving License (UAE / Foreign) (PDF/Image)",
          "ar": "رخصة قيادة إماراتية / أجنبية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "passport-national-id",
    "category": "IDENTITY",
    "name": {
      "en": "Passport / National ID Card",
      "ar": "جواز سفر / بطاقة هوية"
    },
    "description": {
      "en": "Certified legal translation of Passport / National ID Card (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ جواز سفر / بطاقة هوية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Passport / National ID Card is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ جواز سفر / بطاقة هوية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Passport / National ID Card (PDF/Image)",
          "ar": "جواز سفر / بطاقة هوية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "bank-statement",
    "category": "COMMERCIAL",
    "name": {
      "en": "Bank Account Statement",
      "ar": "كشف حساب بنكي (Bank Statement)"
    },
    "description": {
      "en": "Certified legal translation of Bank Account Statement (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ كشف حساب بنكي (Bank Statement) (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Bank Account Statement is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ كشف حساب بنكي (Bank Statement) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Bank Account Statement (PDF/Image)",
          "ar": "كشف حساب بنكي (Bank Statement) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "bank-clearance-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Bank Clearance / Debt Certificate",
      "ar": "شهادة مديونية / براءة ذمة بنكية"
    },
    "description": {
      "en": "Certified legal translation of Bank Clearance / Debt Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة مديونية / براءة ذمة بنكية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Bank Clearance / Debt Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة مديونية / براءة ذمة بنكية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Bank Clearance / Debt Certificate (PDF/Image)",
          "ar": "شهادة مديونية / براءة ذمة بنكية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "financial-audit-report",
    "category": "COMMERCIAL",
    "name": {
      "en": "Financial Audit Report / Balance Sheet",
      "ar": "ميزانية عمومية / تقرير تدقيق مالی"
    },
    "description": {
      "en": "Certified legal translation of Financial Audit Report / Balance Sheet (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ ميزانية عمومية / تقرير تدقيق مالی (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Financial Audit Report / Balance Sheet is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ ميزانية عمومية / تقرير تدقيق مالی بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Financial Audit Report / Balance Sheet (PDF/Image)",
          "ar": "ميزانية عمومية / تقرير تدقيق مالی (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "salary-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Salary Certificate / Employment Letter",
      "ar": "خطابات الراتب / شهادة استمرار عمل"
    },
    "description": {
      "en": "Certified legal translation of Salary Certificate / Employment Letter (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ خطابات الراتب / شهادة استمرار عمل (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Salary Certificate / Employment Letter is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ خطابات الراتب / شهادة استمرار عمل بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Salary Certificate / Employment Letter (PDF/Image)",
          "ar": "خطابات الراتب / شهادة استمرار عمل (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "experience-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Experience Certificate",
      "ar": "شهادة خبرة عملية"
    },
    "description": {
      "en": "Certified legal translation of Experience Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة خبرة عملية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Experience Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة خبرة عملية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Experience Certificate (PDF/Image)",
          "ar": "شهادة خبرة عملية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "mohre-employment-contract",
    "category": "COMMERCIAL",
    "name": {
      "en": "MOHRE Employment Contract",
      "ar": "عقد عمل صادر من وزارة الموارد البشرية (MOHRE)"
    },
    "description": {
      "en": "Certified legal translation of MOHRE Employment Contract (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ عقد عمل صادر من وزارة الموارد البشرية (MOHRE) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of MOHRE Employment Contract is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ عقد عمل صادر من وزارة الموارد البشرية (MOHRE) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "MOHRE Employment Contract (PDF/Image)",
          "ar": "عقد عمل صادر من وزارة الموارد البشرية (MOHRE) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "statement-of-claim",
    "category": "LEGAL",
    "name": {
      "en": "Statement of Claim / Lawsuit Petition",
      "ar": "صحيفة دعوى / لائحة دعوى قضائية"
    },
    "description": {
      "en": "Certified legal translation of Statement of Claim / Lawsuit Petition (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ صحيفة دعوى / لائحة دعوى قضائية (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Statement of Claim / Lawsuit Petition is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ صحيفة دعوى / لائحة دعوى قضائية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Statement of Claim / Lawsuit Petition (PDF/Image)",
          "ar": "صحيفة دعوى / لائحة دعوى قضائية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "court-judgment",
    "category": "LEGAL",
    "name": {
      "en": "Court Judgment / Court Ruling",
      "ar": "حكم محكمة ابتدائي / استئناف / تمييز"
    },
    "description": {
      "en": "Certified legal translation of Court Judgment / Court Ruling (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ حكم محكمة ابتدائي / استئناف / تمييز (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Court Judgment / Court Ruling is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ حكم محكمة ابتدائي / استئناف / تمييز بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Court Judgment / Court Ruling (PDF/Image)",
          "ar": "حكم محكمة ابتدائي / استئناف / تمييز (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "defense-memorandum",
    "category": "LEGAL",
    "name": {
      "en": "Defense Memorandum / Written Submissions",
      "ar": "مذكرة دفاع / مذكرة جوابية"
    },
    "description": {
      "en": "Certified legal translation of Defense Memorandum / Written Submissions (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ مذكرة دفاع / مذكرة جوابية (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Defense Memorandum / Written Submissions is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ مذكرة دفاع / مذكرة جوابية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Defense Memorandum / Written Submissions (PDF/Image)",
          "ar": "مذكرة دفاع / مذكرة جوابية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "power-of-attorney",
    "category": "LEGAL",
    "name": {
      "en": "Power of Attorney (General / Special)",
      "ar": "وكالة عامة / وكالة خاصة (POA)"
    },
    "description": {
      "en": "Certified legal translation of Power of Attorney (General / Special) (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ وكالة عامة / وكالة خاصة (POA) (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Power of Attorney (General / Special) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ وكالة عامة / وكالة خاصة (POA) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Power of Attorney (General / Special) (PDF/Image)",
          "ar": "وكالة عامة / وكالة خاصة (POA) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "official-declaration",
    "category": "LEGAL",
    "name": {
      "en": "Official Declaration / Undertaking",
      "ar": "إقرار / تعهد رسمي"
    },
    "description": {
      "en": "Certified legal translation of Official Declaration / Undertaking (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ إقرار / تعهد رسمي (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Official Declaration / Undertaking is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ إقرار / تعهد رسمي بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Official Declaration / Undertaking (PDF/Image)",
          "ar": "إقرار / تعهد رسمي (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "legal-notice",
    "category": "LEGAL",
    "name": {
      "en": "Legal Notice / Judicial Warning",
      "ar": "إنذار عدلي / إخطار قانوني"
    },
    "description": {
      "en": "Certified legal translation of Legal Notice / Judicial Warning (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ إنذار عدلي / إخطار قانوني (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Legal Notice / Judicial Warning is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ إنذار عدلي / إخطار قانوني بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Legal Notice / Judicial Warning (PDF/Image)",
          "ar": "إنذار عدلي / إخطار قانوني (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "medical-report",
    "category": "MEDICAL",
    "name": {
      "en": "DHA Medical Report",
      "ar": "تقرير طبي صادر من هيئة الصحة بدبي (DHA)"
    },
    "description": {
      "en": "Certified legal translation of DHA Medical Report (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ تقرير طبي صادر من هيئة الصحة بدبي (DHA) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of DHA Medical Report is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ تقرير طبي صادر من هيئة الصحة بدبي (DHA) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "DHA Medical Report (PDF/Image)",
          "ar": "تقرير طبي صادر من هيئة الصحة بدبي (DHA) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "hospital-medical-report",
    "category": "MEDICAL",
    "name": {
      "en": "Hospital Medical Report",
      "ar": "تقرير طبي صادر من مستشفى إماراتي / خارجي"
    },
    "description": {
      "en": "Certified legal translation of Hospital Medical Report (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ تقرير طبي صادر من مستشفى إماراتي / خارجي (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Hospital Medical Report is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ تقرير طبي صادر من مستشفى إماراتي / خارجي بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Hospital Medical Report (PDF/Image)",
          "ar": "تقرير طبي صادر من مستشفى إماراتي / خارجي (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "medical-fitness-report",
    "category": "MEDICAL",
    "name": {
      "en": "Medical Fitness Report (Visa/Work)",
      "ar": "تقرير لياقة طبية لإقامة / عمل"
    },
    "description": {
      "en": "Certified legal translation of Medical Fitness Report (Visa/Work) (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ تقرير لياقة طبية لإقامة / عمل (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Medical Fitness Report (Visa/Work) is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ تقرير لياقة طبية لإقامة / عمل بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Medical Fitness Report (Visa/Work) (PDF/Image)",
          "ar": "تقرير لياقة طبية لإقامة / عمل (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "vaccination-certificate",
    "category": "MEDICAL",
    "name": {
      "en": "Vaccination Certificate / Health Card",
      "ar": "شهادة تطعيمات / دفتر صحي"
    },
    "description": {
      "en": "Certified legal translation of Vaccination Certificate / Health Card (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة تطعيمات / دفتر صحي (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Vaccination Certificate / Health Card is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة تطعيمات / دفتر صحي بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Vaccination Certificate / Health Card (PDF/Image)",
          "ar": "شهادة تطعيمات / دفتر صحي (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "medical-invoices",
    "category": "MEDICAL",
    "name": {
      "en": "Medical Invoices / Hospital Receipts",
      "ar": "فاتورة علاج / إيصالات مستشفى"
    },
    "description": {
      "en": "Certified legal translation of Medical Invoices / Hospital Receipts (20 - 30 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ فاتورة علاج / إيصالات مستشفى (20 - 30 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Medical Invoices / Hospital Receipts is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (20 - 30 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ فاتورة علاج / إيصالات مستشفى بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (20 - 30 / صفحة درهم)."
    },
    "basePrice": 30,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Medical Invoices / Hospital Receipts (PDF/Image)",
          "ar": "فاتورة علاج / إيصالات مستشفى (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "certificate-of-origin",
    "category": "COMMERCIAL",
    "name": {
      "en": "Certificate of Origin / Bill of Lading",
      "ar": "شهادة منشأ / بوليصة شحن (Bill of Lading)"
    },
    "description": {
      "en": "Certified legal translation of Certificate of Origin / Bill of Lading (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة منشأ / بوليصة شحن (Bill of Lading) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Certificate of Origin / Bill of Lading is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة منشأ / بوليصة شحن (Bill of Lading) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Certificate of Origin / Bill of Lading (PDF/Image)",
          "ar": "شهادة منشأ / بوليصة شحن (Bill of Lading) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "customs-declaration-invoice",
    "category": "COMMERCIAL",
    "name": {
      "en": "Customs Declaration / Commercial Invoice",
      "ar": "بيان جمركي / الفاتورة التجارية"
    },
    "description": {
      "en": "Certified legal translation of Customs Declaration / Commercial Invoice (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ بيان جمركي / الفاتورة التجارية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Customs Declaration / Commercial Invoice is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ بيان جمركي / الفاتورة التجارية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Customs Declaration / Commercial Invoice (PDF/Image)",
          "ar": "بيان جمركي / الفاتورة التجارية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "certificate-of-conformity",
    "category": "LEGAL",
    "name": {
      "en": "Certificate of Conformity / Quality Test",
      "ar": "شهادة مطابقة / فحص جودة"
    },
    "description": {
      "en": "Certified legal translation of Certificate of Conformity / Quality Test (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة مطابقة / فحص جودة (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Certificate of Conformity / Quality Test is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة مطابقة / فحص جودة بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Certificate of Conformity / Quality Test (PDF/Image)",
          "ar": "شهادة مطابقة / فحص جودة (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "technical-manual",
    "category": "LEGAL",
    "name": {
      "en": "Technical Manual / Operating Guide",
      "ar": "كتالوج فني / دليل تشغيل"
    },
    "description": {
      "en": "Certified legal translation of Technical Manual / Operating Guide (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ كتالوج فني / دليل تشغيل (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Technical Manual / Operating Guide is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ كتالوج فني / دليل تشغيل بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Technical Manual / Operating Guide (PDF/Image)",
          "ar": "كتالوج فني / دليل تشغيل (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "trademark-patent-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Trademark Registration / Patent Certificate",
      "ar": "شهادة تسجيل علامة تجارية / براءة اختراع"
    },
    "description": {
      "en": "Certified legal translation of Trademark Registration / Patent Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة تسجيل علامة تجارية / براءة اختراع (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Trademark Registration / Patent Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة تسجيل علامة تجارية / براءة اختراع بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Trademark Registration / Patent Certificate (PDF/Image)",
          "ar": "شهادة تسجيل علامة تجارية / براءة اختراع (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "share-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Share Certificate / Stock Ownership",
      "ar": "شهادة إسهام / أسهم شركة"
    },
    "description": {
      "en": "Certified legal translation of Share Certificate / Stock Ownership (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة إسهام / أسهم شركة (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Share Certificate / Stock Ownership is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة إسهام / أسهم شركة بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Share Certificate / Stock Ownership (PDF/Image)",
          "ar": "شهادة إسهام / أسهم شركة (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "board-resolution",
    "category": "COMMERCIAL",
    "name": {
      "en": "Board of Directors Resolution",
      "ar": "قرار مجلس إدارة (Board Resolution)"
    },
    "description": {
      "en": "Certified legal translation of Board of Directors Resolution (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ قرار مجلس إدارة (Board Resolution) (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Board of Directors Resolution is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ قرار مجلس إدارة (Board Resolution) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Board of Directors Resolution (PDF/Image)",
          "ar": "قرار مجلس إدارة (Board Resolution) (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "recommendation-letter",
    "category": "ACADEMIC",
    "name": {
      "en": "Academic / Professional Recommendation Letter",
      "ar": "خطابات توصية أركان / توصية أكاديمية"
    },
    "description": {
      "en": "Certified legal translation of Academic / Professional Recommendation Letter (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ خطابات توصية أركان / توصية أكاديمية (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Academic / Professional Recommendation Letter is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ خطابات توصية أركان / توصية أكاديمية بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Academic / Professional Recommendation Letter (PDF/Image)",
          "ar": "خطابات توصية أركان / توصية أكاديمية (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "land-grant-certificate",
    "category": "LEGAL",
    "name": {
      "en": "Land Grant / Allotment Certificate",
      "ar": "شهادة تخصيص أراضي / منح"
    },
    "description": {
      "en": "Certified legal translation of Land Grant / Allotment Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة تخصيص أراضي / منح (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Land Grant / Allotment Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة تخصيص أراضي / منح بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Land Grant / Allotment Certificate (PDF/Image)",
          "ar": "شهادة تخصيص أراضي / منح (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "building-completion-certificate",
    "category": "LEGAL",
    "name": {
      "en": "Building Completion / Excavation Certificate",
      "ar": "شهادة إنجاز مبنى / حفر"
    },
    "description": {
      "en": "Certified legal translation of Building Completion / Excavation Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة إنجاز مبنى / حفر (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Building Completion / Excavation Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة إنجاز مبنى / حفر بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Building Completion / Excavation Certificate (PDF/Image)",
          "ar": "شهادة إنجاز مبنى / حفر (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "engineering-expert-report",
    "category": "LEGAL",
    "name": {
      "en": "Engineering Expert Report / Property Valuation",
      "ar": "تقرير خبرة هندسي / تقييم عقاري"
    },
    "description": {
      "en": "Certified legal translation of Engineering Expert Report / Property Valuation (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ تقرير خبرة هندسي / تقييم عقاري (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Engineering Expert Report / Property Valuation is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ تقرير خبرة هندسي / تقييم عقاري بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Engineering Expert Report / Property Valuation (PDF/Image)",
          "ar": "تقرير خبرة هندسي / تقييم عقاري (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "police-traffic-report",
    "category": "IDENTITY",
    "name": {
      "en": "Police Traffic Accident Report",
      "ar": "تقرير شرطة / حادث سير"
    },
    "description": {
      "en": "Certified legal translation of Police Traffic Accident Report (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ تقرير شرطة / حادث سير (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Police Traffic Accident Report is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ تقرير شرطة / حادث سير بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Police Traffic Accident Report (PDF/Image)",
          "ar": "تقرير شرطة / حادث سير (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "insurance-policy",
    "category": "COMMERCIAL",
    "name": {
      "en": "Vehicle / Health Insurance Policy",
      "ar": "وثيقة تأمين سيارات / صحي"
    },
    "description": {
      "en": "Certified legal translation of Vehicle / Health Insurance Policy (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ وثيقة تأمين سيارات / صحي (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Vehicle / Health Insurance Policy is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ وثيقة تأمين سيارات / صحي بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Vehicle / Health Insurance Policy (PDF/Image)",
          "ar": "وثيقة تأمين سيارات / صحي (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "legal-consultant-certificate",
    "category": "LEGAL",
    "name": {
      "en": "Lawyers / Consultants Roll Certificate",
      "ar": "شهادة قيد في جدول المحامين / الاستشاريين"
    },
    "description": {
      "en": "Certified legal translation of Lawyers / Consultants Roll Certificate (30 - 40 / صفحة AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة قيد في جدول المحامين / الاستشاريين (30 - 40 / صفحة درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Lawyers / Consultants Roll Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (30 - 40 / صفحة AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة قيد في جدول المحامين / الاستشاريين بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (30 - 40 / صفحة درهم)."
    },
    "basePrice": 40,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Lawyers / Consultants Roll Certificate (PDF/Image)",
          "ar": "شهادة قيد في جدول المحامين / الاستشاريين (PDF أو صورة)"
        }
      }
    ]
  },
  {
    "slug": "vat-tax-certificate",
    "category": "COMMERCIAL",
    "name": {
      "en": "Tax Registration / VAT Certificate",
      "ar": "شهادة ضريبية / القيمة المضافة (VAT Certificate)"
    },
    "description": {
      "en": "Certified legal translation of Tax Registration / VAT Certificate (50 AED) accepted by UAE ministries, courts, and international embassies.",
      "ar": "ترجمة قانونية معتمدة لـ شهادة ضريبية / القيمة المضافة (VAT Certificate) (50 درهم) مقبولة لدى الوزارات والمحاكم الإماراتية والسفارات الدولية."
    },
    "definitionBlock": {
      "en": "Certified translation of Tax Registration / VAT Certificate is performed by MOJ-licensed translators in compliance with UAE legal standards, complete with official stamp, seal, and certificate of accuracy (50 AED).",
      "ar": "تتم الترجمة المعتمدة لـ شهادة ضريبية / القيمة المضافة (VAT Certificate) بواسطة مترجمين مرخصين من وزارة العدل الإماراتية وفق المعايير القانونية الرسمية مع الختم والشهادة المعتمدة (50 درهم)."
    },
    "basePrice": 50,
    "avgTurnaroundHours": 24,
    "requiredUploads": [
      {
        "key": "source_document",
        "label": {
          "en": "Tax Registration / VAT Certificate (PDF/Image)",
          "ar": "شهادة ضريبية / القيمة المضافة (VAT Certificate) (PDF أو صورة)"
        }
      }
    ]
  }
];

export const embassyRequirements: EmbassyRequirement[] = [
  // UK Visa Application Centre
  { authoritySlug: "uk-visa-application-centre-dubai", documentSlug: "birth-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original or certified copy of birth certificate", ar: "أصل شهادة الميلاد أو نسخة معتمدة" }, { en: "Certified English translation with translator's stamp", ar: "ترجمة معتمدة للإنجليزية بختم المترجم" }] },
  { authoritySlug: "uk-visa-application-centre-dubai", documentSlug: "marriage-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original marriage certificate", ar: "أصل عقد الزواج" }, { en: "Certified English translation", ar: "ترجمة معتمدة للإنجليزية" }] },
  { authoritySlug: "uk-visa-application-centre-dubai", documentSlug: "passport-national-id", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: false, turnaroundHours: 12,
    checklist: [{ en: "Clear passport bio-data page scan", ar: "صورة واضحة لصفحة بيانات جواز السفر" }] },

  // US Consulate
  { authoritySlug: "us-consulate-general-dubai", documentSlug: "birth-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original or certified copy of birth certificate", ar: "أصل شهادة الميلاد أو نسخة معتمدة" }, { en: "Signed certificate of translation accuracy", ar: "شهادة دقة ترجمة موقعة" }] },
  { authoritySlug: "us-consulate-general-dubai", documentSlug: "marriage-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original marriage certificate", ar: "أصل عقد الزواج" }, { en: "Certified English translation", ar: "ترجمة معتمدة للإنجليزية" }] },

  // Canadian Consulate
  { authoritySlug: "canadian-consulate-dubai", documentSlug: "degree-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Degree certificate and transcript", ar: "الشهادة الجامعية وكشف الدرجات" }, { en: "Certified English or French translation", ar: "ترجمة معتمدة للإنجليزية أو الفرنسية" }] },
  { authoritySlug: "canadian-consulate-dubai", documentSlug: "birth-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original birth certificate", ar: "أصل شهادة الميلاد" }, { en: "Certified translation per IRCC guidelines", ar: "ترجمة معتمدة وفق إرشادات IRCC" }] },

  // German Consulate
  { authoritySlug: "german-consulate-dubai", documentSlug: "degree-certificate", requiresApostille: true, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Degree certificate and transcript", ar: "الشهادة الجامعية وكشف الدرجات" }, { en: "Certified German translation", ar: "ترجمة معتمدة للألمانية" }, { en: "Apostille from issuing country", ar: "تصديق أبوستيل من بلد الإصدار" }] },
  { authoritySlug: "german-consulate-dubai", documentSlug: "marriage-certificate", requiresApostille: true, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Original marriage certificate", ar: "أصل عقد الزواج" }, { en: "Certified German translation", ar: "ترجمة معتمدة للألمانية" }] },

  // UAE MOFA
  { authoritySlug: "uae-ministry-of-foreign-affairs", documentSlug: "commercial-register-moa", requiresApostille: false, requiresNotarization: true, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Commercial register / MOA original", ar: "أصل السجل التجاري / عقد التأسيس" }, { en: "MOJ-notarized certified translation", ar: "ترجمة معتمدة موثقة من وزارة العدل" }, { en: "MOFA attestation (eDAS 2.0 for commercial invoices)", ar: "تصديق وزارة الخارجية (eDAS 2.0 للفواتير التجارية)" }] },
  { authoritySlug: "uae-ministry-of-foreign-affairs", documentSlug: "degree-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Degree certificate with home-country attestation", ar: "الشهادة الجامعية مع تصديق بلد الإصدار" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }] },

  // UAE MOJ
  { authoritySlug: "uae-ministry-of-justice", documentSlug: "power-of-attorney", requiresApostille: false, requiresNotarization: true, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Power of attorney draft", ar: "مسودة الوكالة القانونية" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }, { en: "Notary Public appointment", ar: "موعد لدى الكاتب العدل" }] },
  { authoritySlug: "uae-ministry-of-justice", documentSlug: "commercial-register-moa", requiresApostille: false, requiresNotarization: true, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Commercial register / MOA", ar: "السجل التجاري / عقد التأسيس" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }] },

  // Dubai Courts
  { authoritySlug: "dubai-courts", documentSlug: "court-judgment", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 48,
    checklist: [{ en: "Original judgment or arbitral award", ar: "أصل الحكم أو قرار التحكيم" }, { en: "Certified Arabic translation sealed by MOJ-licensed translator", ar: "ترجمة معتمدة للعربية بختم مترجم مرخص من وزارة العدل" }] },
  { authoritySlug: "dubai-courts", documentSlug: "power-of-attorney", requiresApostille: false, requiresNotarization: true, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Power of attorney", ar: "الوكالة القانونية" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }] },

  // Federal Tax Authority
  { authoritySlug: "federal-tax-authority", documentSlug: "commercial-register-moa", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Audited financial statements", ar: "القوائم المالية المدققة" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }] },

  // Ministry of Education
  { authoritySlug: "ministry-of-education", documentSlug: "degree-certificate", requiresApostille: false, requiresNotarization: false, requiresSwornTranslator: true, turnaroundHours: 24,
    checklist: [{ en: "Degree certificate and transcript", ar: "الشهادة الجامعية وكشف الدرجات" }, { en: "Home-country attestation chain", ar: "سلسلة تصديق بلد الإصدار" }, { en: "Certified Arabic translation", ar: "ترجمة معتمدة للعربية" }] },
];

export const languagePairs: LanguagePair[] = [
  {
    slug: "arabic-to-english",
    sourceCode: "ar",
    targetCode: "en",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "English", ar: "الإنجليزية" },
    definitionBlock: {
      en: "JUSOR provides professional Arabic-to-English translation for legal, business, academic, and medical documents, delivered by a vetted pool of native-speaking linguists. Certified and standard tiers are available with turnaround from 4 to 72 hours.",
      ar: "تقدم جسور ترجمة احترافية من العربية إلى الإنجليزية للمستندات القانونية والتجارية والأكاديمية والطبية، عبر فريق موثوق من المترجمين الأصليين. تتوفر فئات معتمدة وقياسية بأوقات تسليم من 4 إلى 72 ساعة.",
    },
    demandTier: 1,
    translatorPoolSize: 42,
  },
  {
    slug: "english-to-arabic",
    sourceCode: "en",
    targetCode: "ar",
    sourceName: { en: "English", ar: "الإنجليزية" },
    targetName: { en: "Arabic", ar: "العربية" },
    definitionBlock: {
      en: "JUSOR provides professional English-to-Arabic translation for legal, business, academic, and medical documents, delivered by a vetted pool of native-speaking linguists. Certified and standard tiers are available with turnaround from 4 to 72 hours.",
      ar: "تقدم جسور ترجمة احترافية من الإنجليزية إلى العربية للمستندات القانونية والتجارية والأكاديمية والطبية، عبر فريق موثوق من المترجمين الأصليين. تتوفر فئات معتمدة وقياسية بأوقات تسليم من 4 إلى 72 ساعة.",
    },
    demandTier: 1,
    translatorPoolSize: 38,
  },
  {
    slug: "arabic-to-french",
    sourceCode: "ar",
    targetCode: "fr",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "French", ar: "الفرنسية" },
    definitionBlock: {
      en: "JUSOR provides certified Arabic-to-French translation for legal, immigration, and academic documents, commonly used for Canadian and European visa and residency applications, with turnaround from 24 to 72 hours.",
      ar: "تقدم جسور ترجمة معتمدة من العربية إلى الفرنسية للمستندات القانونية ومستندات الهجرة والمستندات الأكاديمية، وتُستخدم غالباً لطلبات التأشيرة والإقامة الكندية والأوروبية، بأوقات تسليم من 24 إلى 72 ساعة.",
    },
    demandTier: 2,
    translatorPoolSize: 14,
  },
  {
    slug: "arabic-to-german",
    sourceCode: "ar",
    targetCode: "de",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "German", ar: "الألمانية" },
    definitionBlock: {
      en: "JUSOR provides certified Arabic-to-German translation for civil, academic, and legal documents required by German consulates and universities, with sworn-translator options for full recognition in Germany.",
      ar: "تقدم جسور ترجمة معتمدة من العربية إلى الألمانية للمستندات المدنية والأكاديمية والقانونية التي تطلبها القنصليات والجامعات الألمانية، مع خيار مترجم محلّف لضمان الاعتراف الكامل في ألمانيا.",
    },
    demandTier: 2,
    translatorPoolSize: 11,
  },
  {
    slug: "arabic-to-spanish",
    sourceCode: "ar",
    targetCode: "es",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "Spanish", ar: "الإسبانية" },
    definitionBlock: {
      en: "JUSOR provides certified Arabic-to-Spanish translation for legal, civil, and business documents, supporting residency, education, and trade applications across Spain and Latin America.",
      ar: "تقدم جسور ترجمة معتمدة من العربية إلى الإسبانية للمستندات القانونية والمدنية والتجارية، لدعم طلبات الإقامة والتعليم والتجارة في إسبانيا وأمريكا اللاتينية.",
    },
    demandTier: 2,
    translatorPoolSize: 9,
  },
  {
    slug: "arabic-to-urdu",
    sourceCode: "ar",
    targetCode: "ur",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "Urdu", ar: "الأردية" },
    definitionBlock: {
      en: "JUSOR provides certified Arabic-to-Urdu translation for civil, employment, and legal documents, widely used by the South Asian resident community in the UAE for visa, labor, and family matters.",
      ar: "تقدم جسور ترجمة معتمدة من العربية إلى الأردية للمستندات المدنية والوظيفية والقانونية، وتُستخدم على نطاق واسع من الجالية الجنوب آسيوية في الإمارات لمعاملات التأشيرة والعمل والأسرة.",
    },
    demandTier: 2,
    translatorPoolSize: 16,
  },
  {
    slug: "arabic-to-hindi",
    sourceCode: "ar",
    targetCode: "hi",
    sourceName: { en: "Arabic", ar: "العربية" },
    targetName: { en: "Hindi", ar: "الهندية" },
    definitionBlock: {
      en: "JUSOR provides certified Arabic-to-Hindi translation for civil, employment, and legal documents, serving the large Indian resident community in the UAE for visa, labor, and family sponsorship needs.",
      ar: "تقدم جسور ترجمة معتمدة من العربية إلى الهندية للمستندات المدنية والوظيفية والقانونية، لخدمة الجالية الهندية الكبيرة في الإمارات لاحتياجات التأشيرة والعمل والكفالة العائلية.",
    },
    demandTier: 2,
    translatorPoolSize: 15,
  },
];

export const documentCategoryLabels: Record<DocumentCategory, LocalizedText> = {
  CIVIL_REGISTRY: { en: "Civil Registry", ar: "السجل المدني" },
  IDENTITY: { en: "Identity", ar: "الهوية" },
  ACADEMIC: { en: "Academic", ar: "أكاديمي" },
  COMMERCIAL: { en: "Commercial", ar: "تجاري" },
  LEGAL: { en: "Legal", ar: "قانوني" },
  MEDICAL: { en: "Medical", ar: "طبي" },
  IMMIGRATION: { en: "Immigration", ar: "الهجرة" },
};

export function getAuthorityBySlug(slug: string) {
  return authorities.find((a) => a.slug === slug);
}

export function getDocumentTypeBySlug(slug: string) {
  return documentTypes.find((d) => d.slug === slug);
}

export function getLanguagePairBySlug(slug: string) {
  return languagePairs.find((p) => p.slug === slug);
}

export function getRequirementsForAuthority(authoritySlug: string) {
  return embassyRequirements
    .filter((r) => r.authoritySlug === authoritySlug)
    .map((r) => ({ ...r, documentType: getDocumentTypeBySlug(r.documentSlug)! }))
    .filter((r) => r.documentType);
}

export function getAuthoritiesForDocument(documentSlug: string) {
  return embassyRequirements
    .filter((r) => r.documentSlug === documentSlug)
    .map((r) => ({ ...r, authority: getAuthorityBySlug(r.authoritySlug)! }))
    .filter((r) => r.authority);
}
