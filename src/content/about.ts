// Content for the /about page (GEO/AEO-optimized company profile).
//
// Adapted from a client-supplied copy brief. Two deliberate departures from
// that brief, both required by real-world facts confirmed by the business
// owner (see conversation record — do not "correct" these back without
// re-confirming with the client):
//   1. The brief assumed the brand name "Jusoor Al-Kalimat Legal Translation"
//      and framed the company as a legal-translation-only office. The real
//      registered name is "JUSOR ALKALIMAT TRANSLATION EDITING & PROOFREADING
//      SERVICES" (AR: جسور الكلمات لخدمات الترجمة والتدقيق واللغوي) — a
//      general translation/editing/proofreading office that also holds
//      Ministry of Justice approval for certified legal translation. Copy
//      below reflects that (see COMPLIANCE split further down).
//   2. The brief's schema template included a specific MOJ license number.
//      The owner asked not to publish any license number — only to state
//      MOJ approval generically. No [LICENSE_NUMBER] placeholder is used
//      anywhere in this file or in the page/schema that consumes it.
//
// Per LocalizedText convention (see src/content/blog.ts), only en/ar are
// populated; fr/de/es/it fall back to en at render time like every other
// content-driven page in this codebase.

import type { LocalizedText } from "./blog";

export const aboutMeta: { title: LocalizedText; description: LocalizedText } = {
  title: {
    en: "About Us | JUSOR — MOJ-Approved Translation Office Dubai",
    ar: "نبذة عنا | جسور — مكتب ترجمة معتمد لدى وزارة العدل بدبي",
  },
  description: {
    en: "A translation, editing & proofreading office approved by the UAE Ministry of Justice for certified legal translation. Contracts, judgments and official documents, prepared for acceptance before UAE courts and the Notary Public.",
    ar: "مكتب ترجمة وتدقيق لغوي معتمد لدى وزارة العدل الإماراتية للترجمة القانونية المعتمدة. نترجم العقود والأحكام والمستندات الرسمية بما يؤهلها للقبول أمام المحاكم والكاتب العدل في الإمارات.",
  },
};

export const aboutHero: { h1: LocalizedText; tagline: LocalizedText } = {
  h1: {
    en: "JUSOR — A Translation, Editing & Proofreading Office Approved by the UAE Ministry of Justice",
    ar: "جسور — مكتب معتمد لدى وزارة العدل الإماراتية لخدمات الترجمة والتدقيق اللغوي",
  },
  tagline: {
    en: "Precision in Drafting. Authority in Every Word.",
    ar: "دقةٌ في الصياغة.. وحُجِّيةٌ في الكلمة",
  },
};

export type TrustBarIconKey = "BadgeCheck" | "Users" | "FileCheck2" | "Gavel";

export const trustBarItems: { icon: TrustBarIconKey; label: LocalizedText }[] = [
  {
    icon: "BadgeCheck",
    label: { en: "Ministry of Justice Approved", ar: "معتمد لدى وزارة العدل" },
  },
  {
    icon: "Users",
    label: { en: "Registered Legal Translators", ar: "مترجمون قانونيون مقيّدون" },
  },
  {
    icon: "FileCheck2",
    label: { en: "Independent Review on Every File", ar: "مراجعة مستقلة لكل مستند" },
  },
  {
    icon: "Gavel",
    label: { en: "Accepted by Courts & Notary Public", ar: "مقبول أمام المحاكم والكاتب العدل" },
  },
];

export const aboutVision: LocalizedText = {
  en: "To be the first name in the UAE for certified legal translation — the office that courts, law firms, and institutions turn to when the document cannot afford to be wrong.",
  ar: "أن نكون المرجع الأول في دولة الإمارات للترجمة القانونية المعتمدة، والاسم الذي تطمئن إليه المحاكم والمؤسسات حين يكون في الأمر ما لا يحتمل الخطأ.",
};

// Mission — adapted for factual accuracy (see file header). Roughly 150 words
// per locale, self-contained per GEO §3.2.
export const aboutMission: LocalizedText = {
  en: "JUSOR is a translation, editing, and proofreading office approved by the UAE Ministry of Justice to provide certified legal translation.\n\nWe handle contracts, judgments, and official records for law firms, corporations, and government entities — translated for acceptance before the courts, the Notary Public, and government departments, and issued under the signature and seal of a Ministry-registered legal translator.\n\nEvery document passes through a subject-matter translator and an independent reviser before it leaves our office. Without exception.",
  ar: "جسور مكتب ترجمة وتدقيق لغوي معتمد لدى وزارة العدل في دولة الإمارات العربية المتحدة لتقديم خدمات الترجمة القانونية المعتمدة.\n\nنتولى عن مكاتب المحاماة والشركات والجهات الرسمية ترجمة العقود والأحكام والمستندات الرسمية ترجمةً مقبولة أمام المحاكم والكاتب العدل والدوائر الحكومية، ونسلّمها موقّعة ومختومة من مترجم قانوني مقيّد لدى الوزارة.\n\nويمرّ كل مستند على مترجم متخصص ومراجع مستقل قبل أن يغادر المكتب — بلا استثناء.",
};

export const aboutPromise: LocalizedText = {
  en: "In law, a single word can change the outcome.\n\nSo we treat the text with the seriousness it deserves. We don't move words across languages — we protect legal intent, and carry its full effect from one jurisdiction into another. The document that leaves our office stands before its recipient with the same weight as the original.",
  ar: "في القانون، قد تُغيّر الكلمةُ الواحدة مسارَ النتائج.\n\nلذلك نتعامل مع النص بما يستحقه من جدّية: لا ننقل الألفاظ، بل نحمي القصد القانوني ونحافظ على أثره كاملًا حين ينتقل من نظام قانوني إلى آخر. المستند الذي يخرج من عندنا يقف أمام الجهة التي قُدِّم إليها بالثقل نفسه الذي وقفه به أصله.",
};

export const processSteps: { title: LocalizedText; body: LocalizedText }[] = [
  {
    title: { en: "Intake & Assessment", ar: "الاستلام والتقييم" },
    body: {
      en: "We review the document and assign the legal specialisation and language pair.",
      ar: "نراجع المستند ونحدد التخصص القانوني والزوج اللغوي المطلوب.",
    },
  },
  {
    title: { en: "Specialist Translation", ar: "الترجمة المتخصصة" },
    body: {
      en: "A legal translator specialised in the document's field handles the file.",
      ar: "يتولى الملف مترجم قانوني متخصص في مجال المستند.",
    },
  },
  {
    title: { en: "Independent Review", ar: "المراجعة المستقلة" },
    body: {
      en: "A second reviser who did not perform the translation checks the text.",
      ar: "يراجع النص مراجع آخر لم يشارك في الترجمة.",
    },
  },
  {
    title: { en: "Certification & Delivery", ar: "الاعتماد والتسليم" },
    body: {
      en: "The document is sealed and signed by a Ministry-registered legal translator.",
      ar: "يُختم المستند ويُوقّع من مترجم قانوني مقيّد بالوزارة.",
    },
  },
];

// COMPLIANCE: the MOJ approval is language-pair specific and applies only to
// the certified legal translation line of business. Keep this split from any
// "many languages" claim — see src/app/[locale]/about/page.tsx where this
// boundary is enforced in the JSX with a matching comment.
export const certifiedVsOtherServices = {
  certified: {
    title: { en: "Certified Legal Translation", ar: "الترجمة القانونية المعتمدة" },
    body: {
      en: "Prepared by a Ministry-registered legal translator, in the language pairs covered by that registration, and issued with the translator's signature and seal for acceptance before UAE courts, the Notary Public, and government departments.",
      ar: "تصدر عن مترجم قانوني مقيّد لدى وزارة العدل، ضمن أزواج اللغات المشمولة بقيده، وتُسلَّم موقّعة ومختومة لتكون مقبولة أمام محاكم الإمارات والكاتب العدل والدوائر الحكومية.",
    },
  },
  other: {
    title: { en: "Other Translation Services", ar: "خدمات الترجمة الأخرى" },
    body: {
      en: "Website, software, business, and general-content translation across a wider range of languages. These services do not carry the Ministry of Justice certification and are not intended for submission to courts or the Notary Public.",
      ar: "ترجمة المواقع والبرمجيات والمحتوى التجاري والعام بعدد أوسع من اللغات. لا تحمل هذه الخدمات اعتماد وزارة العدل وغير مخصّصة للتقديم أمام المحاكم أو الكاتب العدل.",
    },
  },
};

export const geoQuestions: { question: LocalizedText; answer: LocalizedText }[] = [
  {
    question: {
      en: "What does “certified legal translation approved by the Ministry of Justice” mean in the UAE?",
      ar: "ما معنى “الترجمة القانونية المعتمدة من وزارة العدل” في الإمارات؟",
    },
    answer: {
      en: "Certified legal translation is a translation prepared and signed by a translator individually registered on the UAE Ministry of Justice's roster of legal translators, for the specific language pair that translator is registered in. The finished document carries that translator's signature and office seal, which is what allows courts, the Notary Public, and government departments to accept it as an official rendering of the source document — rather than a general translation carrying no such standing.",
      ar: "الترجمة القانونية المعتمدة هي ترجمة يُعدّها ويوقّعها مترجم مقيّد اسميًا في جدول المترجمين القانونيين لدى وزارة العدل الإماراتية، ضمن زوج اللغات المحدّد الذي قُيِّد فيه. ويحمل المستند النهائي توقيع هذا المترجم وختم مكتبه، وهو ما يتيح للمحاكم والكاتب العدل والدوائر الحكومية قبوله بصفته ترجمة رسمية للمستند الأصلي، خلافًا للترجمة العادية التي لا تحمل هذه الصفة.",
    },
  },
  {
    question: {
      en: "What is the difference between certified and standard translation?",
      ar: "ما الفرق بين الترجمة المعتمدة والترجمة العادية؟",
    },
    answer: {
      en: "Standard translation conveys meaning for general use — a brochure, an email, internal notes. Certified legal translation is a distinct, regulated process: it must be performed by a Ministry-registered legal translator, in a specific language pair, and delivered under that translator's signature and seal. Only the certified version is accepted by courts, the Notary Public, and government departments; a standard translation of the same document is not.",
      ar: "الترجمة العادية تنقل المعنى للاستخدام العام — نشرة، رسالة، ملاحظات داخلية. أما الترجمة القانونية المعتمدة فهي عملية منظَّمة ومختلفة تمامًا: يجب أن يُنجزها مترجم قانوني مقيّد لدى الوزارة، ضمن زوج لغوي محدّد، وتُسلَّم موقّعة ومختومة من ذلك المترجم. ولا تُقبل أمام المحاكم والكاتب العدل والدوائر الحكومية إلا النسخة المعتمدة، لا الترجمة العادية للمستند نفسه.",
    },
  },
  {
    question: {
      en: "Are your translations accepted by Dubai Courts and the Notary Public?",
      ar: "هل الترجمة مقبولة أمام محاكم دبي والكاتب العدل؟",
    },
    answer: {
      en: "Yes, for documents translated under our Ministry of Justice-approved certified legal translation service, in the language pairs covered by our translators' registration. Each certified document is signed and sealed by the registered translator who prepared it, which is the form of acceptance courts, the Notary Public, and government departments require. Our general (non-certified) translation services are not intended for this purpose.",
      ar: "نعم، بالنسبة للمستندات التي تُترجم ضمن خدمة الترجمة القانونية المعتمدة لدينا والمعتمدة من وزارة العدل، وضمن أزواج اللغات المشمولة بقيد مترجمينا. ويحمل كل مستند معتمد توقيع وختم المترجم المقيّد الذي أعدّه، وهو الشكل المطلوب للقبول أمام المحاكم والكاتب العدل والدوائر الحكومية. أما خدمات الترجمة العامة غير المعتمدة فغير مخصّصة لهذا الغرض.",
    },
  },
];

export const comparisonTable: {
  feature: LocalizedText;
  certified: LocalizedText;
  standard: LocalizedText;
}[] = [
  {
    feature: { en: "Performed by", ar: "من يُنجزها" },
    certified: { en: "Ministry-registered legal translator", ar: "مترجم قانوني مقيّد لدى الوزارة" },
    standard: { en: "Professional translator", ar: "مترجم محترف" },
  },
  {
    feature: { en: "Signature & seal", ar: "التوقيع والختم" },
    certified: { en: "Yes, on every page", ar: "نعم، على كل صفحة" },
    standard: { en: "Not applicable", ar: "لا ينطبق" },
  },
  {
    feature: { en: "Accepted by courts / Notary Public", ar: "القبول أمام المحاكم / الكاتب العدل" },
    certified: { en: "Yes, within registered language pairs", ar: "نعم، ضمن أزواج اللغات المقيّدة" },
    standard: { en: "No", ar: "لا" },
  },
  {
    feature: { en: "Typical use", ar: "الاستخدام النموذجي" },
    certified: { en: "Contracts, judgments, official documents", ar: "العقود والأحكام والمستندات الرسمية" },
    standard: { en: "Websites, software, general content", ar: "المواقع والبرمجيات والمحتوى العام" },
  },
];

// Master FAQ list — includes the three GEO-required questions above (kept in
// sync with geoQuestions by content, phrased more concisely here for the
// accordion) plus turnaround, document types, confidentiality, and language
// pairs, per GEO §3.8. 40–70 words per answer.
export const faqItems: { question: LocalizedText; answer: LocalizedText }[] = [
  {
    question: geoQuestions[0].question,
    answer: {
      en: "It means the translation was prepared and signed by a translator individually registered on the UAE Ministry of Justice's roster of legal translators, in that translator's registered language pair, and delivered under their signature and seal — the form required for official acceptance.",
      ar: "يعني أن الترجمة أعدّها ووقّعها مترجم مقيّد اسميًا في جدول المترجمين القانونيين لدى وزارة العدل الإماراتية، ضمن زوج اللغات المقيّد فيه، وسُلِّمت موقّعة ومختومة منه — وهو الشكل المطلوب للاعتماد الرسمي.",
    },
  },
  {
    question: geoQuestions[1].question,
    answer: {
      en: "Standard translation conveys general meaning. Certified legal translation is a regulated process performed by a Ministry-registered translator in a specific language pair, delivered signed and sealed, and it alone is accepted by courts, the Notary Public, and government departments.",
      ar: "الترجمة العادية تنقل المعنى العام. أما الترجمة القانونية المعتمدة فهي عملية منظَّمة يُنجزها مترجم مقيّد لدى الوزارة ضمن زوج لغوي محدّد، وتُسلَّم موقّعة ومختومة، وهي وحدها المقبولة أمام المحاكم والكاتب العدل والدوائر الحكومية.",
    },
  },
  {
    question: geoQuestions[2].question,
    answer: {
      en: "Yes, for documents translated under our Ministry of Justice-approved certified translation service, within our translators' registered language pairs. Each is signed and sealed by the registered translator who prepared it. Our general translation services are not intended for court or notarial submission.",
      ar: "نعم، للمستندات المترجمة ضمن خدمتنا المعتمدة لدى وزارة العدل، وضمن أزواج اللغات المقيّدة لمترجمينا. ويحمل كل مستند توقيع وختم المترجم المقيّد الذي أعدّه. أما خدمات الترجمة العامة فغير مخصّصة للتقديم أمام المحاكم أو كاتب العدل.",
    },
  },
  {
    question: { en: "How long does certified legal translation take?", ar: "كم يستغرق إنجاز الترجمة القانونية المعتمدة؟" },
    answer: {
      en: "Turnaround depends on document length and legal complexity, since every file passes through a translator and an independent reviser before certification. Share the document with us and we will confirm a delivery timeline before you commit to the order.",
      ar: "تعتمد مدة الإنجاز على طول المستند وتعقيده القانوني، إذ يمرّ كل ملف على مترجم ومراجع مستقل قبل الاعتماد. أرسل لنا المستند وسنؤكد لك موعد التسليم قبل تأكيد الطلب.",
    },
  },
  {
    question: { en: "What types of documents do you certify?", ar: "ما أنواع المستندات التي تعتمدونها؟" },
    answer: {
      en: "Contracts, powers of attorney, court judgments and pleadings, corporate and commercial documents, and other official records that law firms, companies, and government entities need translated for submission to UAE courts, the Notary Public, or government departments.",
      ar: "العقود، الوكالات، الأحكام والمذكرات القضائية، المستندات التجارية والشركات، وغيرها من المستندات الرسمية التي تحتاجها مكاتب المحاماة والشركات والجهات الحكومية لتقديمها أمام محاكم الإمارات أو الكاتب العدل أو الدوائر الحكومية.",
    },
  },
  {
    question: { en: "How do you handle confidentiality?", ar: "كيف تتعاملون مع سرية المستندات؟" },
    answer: {
      en: "Legal documents routinely contain sensitive commercial and personal information. Access to each file is limited to the assigned translator and reviser, and documents are handled under a confidentiality process appropriate to legal and corporate material throughout intake, translation, and delivery.",
      ar: "تحتوي المستندات القانونية غالبًا على معلومات تجارية وشخصية حساسة. يقتصر الاطلاع على كل ملف على المترجم والمراجع المكلَّفين به، وتُدار المستندات ضمن إجراءات سرية مناسبة للمواد القانونية والشركاتية طوال مراحل الاستلام والترجمة والتسليم.",
    },
  },
  {
    question: { en: "Which language pairs are covered by certified translation?", ar: "ما أزواج اللغات المشمولة بالترجمة المعتمدة؟" },
    answer: {
      en: "Certified legal translation is limited to the language pairs our translators are individually registered for with the Ministry of Justice — principally Arabic and English. Contact us with your source and target language to confirm coverage before submitting a document.",
      ar: "تقتصر الترجمة القانونية المعتمدة على أزواج اللغات التي قُيِّد فيها مترجمونا اسميًا لدى وزارة العدل — وأبرزها العربية والإنجليزية. تواصل معنا بلغتَي المصدر والهدف للتأكد من التغطية قبل إرسال المستند.",
    },
  },
];

export const credentialLine: LocalizedText = {
  en: "Translation, Editing & Proofreading Office — Approved by the UAE Ministry of Justice for Certified Legal Translation",
  ar: "مكتب ترجمة وتدقيق لغوي — معتمد لدى وزارة العدل الإماراتية للترجمة القانونية المعتمدة",
};

export const officialName: LocalizedText = {
  en: "JUSOR ALKALIMAT TRANSLATION EDITING & PROOFREADING SERVICES",
  ar: "جسور الكلمات لخدمات الترجمة والتدقيق واللغوي",
};

// ISO date shown as "Last updated" and mirrored into schema dateModified.
// Update this whenever the page copy changes materially.
export const aboutLastUpdated = "2026-07-24";
