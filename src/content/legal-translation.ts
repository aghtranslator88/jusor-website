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
    slug: "birth-certificate",
    category: "CIVIL_REGISTRY",
    name: { en: "Birth Certificate", ar: "شهادة الميلاد" },
    description: {
      en: "Certified translation of birth certificates for visa, immigration, and family applications.",
      ar: "ترجمة معتمدة لشهادات الميلاد لطلبات التأشيرة والهجرة والأسرة.",
    },
    definitionBlock: {
      en: "A certified birth certificate translation is a word-for-word rendering of the original document into the target language, accompanied by a signed certificate of accuracy from an MOJ-licensed translator, typically delivered within 24 hours and accepted by embassies and immigration authorities.",
      ar: "الترجمة المعتمدة لشهادة الميلاد هي نقل حرفي للمستند الأصلي إلى اللغة المطلوبة، مصحوبة بشهادة دقة موقعة من مترجم مرخص لدى وزارة العدل، وتُسلَّم عادة خلال 24 ساعة وتُقبل لدى السفارات وسلطات الهجرة.",
    },
    basePrice: 35,
    avgTurnaroundHours: 24,
    requiredUploads: [{ key: "source_document", label: { en: "Birth Certificate (PDF/Image)", ar: "شهادة الميلاد (PDF أو صورة)" } }],
    relatedArticleSlug: "birth-certificate-attestation-dubai",
  },
  {
    slug: "marriage-certificate",
    category: "CIVIL_REGISTRY",
    name: { en: "Marriage Certificate", ar: "عقد الزواج" },
    description: {
      en: "Certified translation of marriage certificates and contracts for visa, residency, and family sponsorship.",
      ar: "ترجمة معتمدة لعقود الزواج لطلبات التأشيرة والإقامة وكفالة الأسرة.",
    },
    definitionBlock: {
      en: "A certified marriage certificate translation renders the original marriage contract or civil certificate into the target language with a signed certificate of accuracy, required by embassies, GDRFA, and immigration authorities for family visa and sponsorship applications.",
      ar: "الترجمة المعتمدة لعقد الزواج تنقل عقد الزواج أو الشهادة المدنية الأصلية إلى اللغة المطلوبة مع شهادة دقة موقعة، وتُطلب من السفارات والإدارة العامة للإقامة وسلطات الهجرة لطلبات التأشيرة العائلية والكفالة.",
    },
    basePrice: 35,
    avgTurnaroundHours: 24,
    requiredUploads: [{ key: "source_document", label: { en: "Marriage Certificate (PDF/Image)", ar: "عقد الزواج (PDF أو صورة)" } }],
    relatedArticleSlug: "marriage-certificate-attestation-translation-dubai",
  },
  {
    slug: "degree-certificate",
    category: "ACADEMIC",
    name: { en: "Degree / Academic Certificate", ar: "الشهادة الجامعية" },
    description: {
      en: "Certified translation of university degrees and transcripts for employment, residency, and MOE equivalency.",
      ar: "ترجمة معتمدة للشهادات الجامعية وكشوف الدرجات للتوظيف والإقامة ومعادلة وزارة التربية والتعليم.",
    },
    definitionBlock: {
      en: "A certified degree translation renders a university diploma and academic transcript into the target language with a signed certificate of accuracy, required by the UAE Ministry of Education for degree equivalency and by employers for work visa applications.",
      ar: "الترجمة المعتمدة للشهادة الجامعية تنقل الدبلوم وكشف الدرجات إلى اللغة المطلوبة مع شهادة دقة موقعة، وتشترطها وزارة التربية والتعليم لمعادلة الشهادات وأصحاب العمل لطلبات تأشيرة العمل.",
    },
    basePrice: 45,
    avgTurnaroundHours: 24,
    requiredUploads: [
      { key: "degree", label: { en: "Degree Certificate", ar: "الشهادة الجامعية" } },
      { key: "transcript", label: { en: "Academic Transcript", ar: "كشف الدرجات" } },
    ],
    relatedArticleSlug: "degree-certificate-attestation-dubai",
  },
  {
    slug: "commercial-register-moa",
    category: "COMMERCIAL",
    name: { en: "Commercial Register / MOA", ar: "السجل التجاري / عقد التأسيس" },
    description: {
      en: "Certified translation of commercial registers, trade licenses, and Memorandums of Association for company formation and banking.",
      ar: "ترجمة معتمدة للسجلات التجارية والرخص التجارية وعقود التأسيس لتأسيس الشركات والمعاملات المصرفية.",
    },
    definitionBlock: {
      en: "A certified commercial register translation renders trade licenses, Memorandums of Association, and company registration certificates into the target language, required by banks, the Ministry of Economy, and free-zone authorities for corporate formation and compliance.",
      ar: "الترجمة المعتمدة للسجل التجاري تنقل الرخص التجارية وعقود التأسيس وشهادات تسجيل الشركات إلى اللغة المطلوبة، وتشترطها البنوك ووزارة الاقتصاد وسلطات المناطق الحرة لتأسيس الشركات والامتثال.",
    },
    basePrice: 60,
    avgTurnaroundHours: 24,
    requiredUploads: [{ key: "source_document", label: { en: "Commercial Register / MOA (PDF)", ar: "السجل التجاري / عقد التأسيس (PDF)" } }],
    relatedArticleSlug: "moa-commercial-documents-attestation-translation-dubai",
  },
  {
    slug: "power-of-attorney",
    category: "LEGAL",
    name: { en: "Power of Attorney", ar: "الوكالة القانونية" },
    description: {
      en: "Certified translation of general and special powers of attorney for notarization and cross-border legal use.",
      ar: "ترجمة معتمدة للوكالات القانونية العامة والخاصة للتوثيق والاستخدام القانوني عبر الحدود.",
    },
    definitionBlock: {
      en: "A certified power of attorney translation renders the granted legal authorities and conditions into the target language with full legal precision, required by the Notary Public and Ministry of Justice for domestic execution or international legalization.",
      ar: "الترجمة المعتمدة للوكالة القانونية تنقل الصلاحيات والشروط الممنوحة إلى اللغة المطلوبة بدقة قانونية كاملة، ويشترطها الكاتب العدل ووزارة العدل للتنفيذ المحلي أو التصديق الدولي.",
    },
    basePrice: 50,
    avgTurnaroundHours: 24,
    requiredUploads: [{ key: "source_document", label: { en: "Power of Attorney (PDF)", ar: "الوكالة القانونية (PDF)" } }],
  },
  {
    slug: "court-judgment",
    category: "LEGAL",
    name: { en: "Court Judgment / Arbitral Award", ar: "الحكم القضائي / قرار التحكيم" },
    description: {
      en: "Certified translation of court judgments and arbitral awards for enforcement or international recognition.",
      ar: "ترجمة معتمدة للأحكام القضائية وقرارات التحكيم لأغراض التنفيذ أو الاعتراف الدولي.",
    },
    definitionBlock: {
      en: "A certified court judgment translation renders a judicial ruling or arbitral award into the target language with full legal and technical precision, required for enforcement (executory formula) before local execution judges or recognition before foreign courts.",
      ar: "الترجمة المعتمدة للحكم القضائي تنقل الحكم أو قرار التحكيم إلى اللغة المطلوبة بدقة قانونية وفنية كاملة، وتُطلب لأغراض التنفيذ أمام قضاة التنفيذ المحليين أو الاعتراف أمام المحاكم الأجنبية.",
    },
    basePrice: 80,
    avgTurnaroundHours: 48,
    requiredUploads: [{ key: "source_document", label: { en: "Judgment / Award (PDF)", ar: "الحكم / القرار (PDF)" } }],
    relatedArticleSlug: "certified-translation-statements-of-claim-court-judgments-dubai",
  },
  {
    slug: "passport-national-id",
    category: "IDENTITY",
    name: { en: "Passport / National ID", ar: "جواز السفر / بطاقة الهوية" },
    description: {
      en: "Certified translation of passports and national ID cards for visa, banking, and residency applications.",
      ar: "ترجمة معتمدة لجوازات السفر وبطاقات الهوية لطلبات التأشيرة والمعاملات المصرفية والإقامة.",
    },
    definitionBlock: {
      en: "A certified passport or national ID translation renders all printed data fields into the target language with exact name-spelling matching, required by banks, embassies, and government authorities to verify identity on official filings.",
      ar: "الترجمة المعتمدة لجواز السفر أو بطاقة الهوية تنقل كافة الحقول المطبوعة إلى اللغة المطلوبة مع تطابق دقيق لتهجئة الاسم، وتشترطها البنوك والسفارات والجهات الحكومية للتحقق من الهوية في المعاملات الرسمية.",
    },
    basePrice: 25,
    avgTurnaroundHours: 12,
    requiredUploads: [{ key: "source_document", label: { en: "Passport / ID (PDF/Image)", ar: "جواز السفر / الهوية (PDF أو صورة)" } }],
  },
  {
    slug: "medical-report",
    category: "MEDICAL",
    name: { en: "Medical Report", ar: "التقرير الطبي" },
    description: {
      en: "Certified translation of medical reports and clinical records for insurance, immigration, and legal evidence.",
      ar: "ترجمة معتمدة للتقارير الطبية والسجلات السريرية للتأمين والهجرة والأدلة القانونية.",
    },
    definitionBlock: {
      en: "A certified medical report translation renders clinical findings, diagnoses, and treatment records into the target language with precise medical terminology, required by insurers, immigration authorities, and courts accepting medical evidence.",
      ar: "الترجمة المعتمدة للتقرير الطبي تنقل النتائج السريرية والتشخيصات وسجلات العلاج إلى اللغة المطلوبة بمصطلحات طبية دقيقة، وتشترطها شركات التأمين وسلطات الهجرة والمحاكم التي تقبل الأدلة الطبية.",
    },
    basePrice: 40,
    avgTurnaroundHours: 24,
    requiredUploads: [{ key: "source_document", label: { en: "Medical Report (PDF)", ar: "التقرير الطبي (PDF)" } }],
    relatedArticleSlug: "medical-pharmaceutical-clinical-translation-dubai",
  },
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
