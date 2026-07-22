// Knowledge Base articles. Each entry mirrors the BlogPost Prisma model
// (docs/spec/01-database-schema.prisma) with multilingual Json-shaped fields.
// Sourced and adapted from assets/blog-source/*.docx — see docs/spec/08-blog-knowledge-base.md
// for the GEO/AEO structure these follow (definitionBlock = 40-60 word answer block).

export type LocalizedText = Partial<Record<"en" | "ar", string>>;

export type BlogFAQ = { question: LocalizedText; answer: LocalizedText };

export type BlogPostContent = {
  slug: string;
  category: "legal-litigation" | "corporate-finance" | "attestation-visas" | "sector-specialized";
  iconKey: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  definitionBlock: LocalizedText;
  bodyMarkdown: LocalizedText;
  faqs: BlogFAQ[];
  readingTimeMins: number;
  publishedAt: string; // ISO date
};

export const blogPosts: BlogPostContent[] = [
  {
    slug: "certified-translation-statements-of-claim-court-judgments-dubai",
    category: "legal-litigation",
    iconKey: "Gavel",
    title: {
      en: "Certified Legal Translation for Statements of Claim, Defense Briefs, and Court Judgments in Dubai",
      ar: "الترجمة القانونية المعتمدة لصحف الدعاوى، مذكرات الدفاع، والأحكام القضائية في دبي",
    },
    excerpt: {
      en: "Why Arabic-language certified translation is a procedural necessity for Dubai Courts, DIFC Courts, and arbitration filings — and what can go wrong without it.",
      ar: "لماذا تُعد الترجمة القانونية المعتمدة للعربية ضرورة إجرائية أمام محاكم دبي ومركز دبي المالي العالمي والتحكيم — وما الذي قد يحدث دون ذلك.",
    },
    definitionBlock: {
      en: "Certified legal translation for Dubai court litigation is the process of rendering statements of claim, defense briefs, evidentiary exhibits, and judgments into Arabic by a translator licensed by the UAE Ministry of Justice. Since Arabic is the sole official language of onshore court proceedings, an uncertified or imprecise translation can render evidence inadmissible or weaken a legal defense entirely.",
      ar: "الترجمة القانونية المعتمدة لدعاوى محاكم دبي هي نقل صحف الدعاوى ومذكرات الدفاع ومستندات الإثبات والأحكام إلى اللغة العربية بواسطة مترجم مرخص من وزارة العدل الإماراتية. وبما أن العربية هي اللغة الرسمية الوحيدة للتقاضي أمام المحاكم المحلية، فإن أي ترجمة غير معتمدة أو غير دقيقة قد تجعل الأدلة غير مقبولة أو تُضعف الموقف القانوني للمتقاضي تماماً.",
    },
    bodyMarkdown: {
      en: `The UAE, and Dubai in particular, runs a dual-jurisdictional judicial system: onshore Dubai Courts under a codified Civil Law framework, and the offshore DIFC Courts under Common Law. Under the UAE Civil Procedures Law, Arabic is mandated as the sole official language for all pleadings, motions, and evidentiary submissions in onshore courts — making certified legal translation a core procedural necessity, not a formality.

## Why Certified Translation Matters in Litigation

**Admissibility of Evidence.** Onshore courts and the Public Prosecution will not accept a foreign contract, email, bank statement, or technical document as evidence unless it carries a certified Arabic translation sealed by an MOJ-licensed translator. Without that seal, foreign documents are legally inadmissible.

**Preserving Legal Arguments.** The validity of formal defenses — lack of jurisdiction, procedural nullity, statute of limitations — depends entirely on how precisely the translation aligns with codified UAE legal concepts. A loosely translated defense can weaken a case before it's even heard.

**Supporting Court-Appointed Experts.** In complex commercial or engineering disputes, Dubai Courts appoint independent technical experts. Their reports rely on accurately translated ledgers, construction diaries, and correspondence.

**Strict Judicial Deadlines.** Counter-memorandums and appeals run on tight, legally binding timelines — translation vendors must process hundreds of pages without compromising accuracy.

## Documents We Translate

- **Statements of Claim and Notarial Warnings** — the foundational filing summarizing the dispute and relief sought.
- **Defense Briefs, Rejoinders, and Rebuttals** — formal responses outlining procedural and substantive defenses.
- **Evidentiary Exhibits** — commercial agreements, bank statements, audited ledgers, correspondence, expert reports.
- **Court Judgments and Arbitral Awards** — for enforcement (executory formula) before local execution judges, or for international use.

## The Translation Challenge

Bridging Common Law and Civil Law concepts (Equity, Estoppel, Specific Performance) into codified Arabic legal prose requires precise conceptual adaptation — not literal, word-for-word substitution. A misplaced comma or vague pronoun in a defense brief can reverse the legal interpretation of a clause entirely, which is why every legal translation at Jusor Alkalimat goes through rigorous multi-stage proofreading.

## Why Jusor Alkalimat

- **Ministry of Justice-licensed translators** with decades of combined litigation experience.
- **Full regulatory accreditation** — accepted by Dubai Courts, DIFC Courts, Rent Dispute Settlement Centres, and the Public Prosecution.
- **Strict confidentiality** — secure file transmission and binding NDAs for sensitive litigation files.
- **Rapid turnaround** on massive litigation portfolios without compromising ISO-standard accuracy.`,
      ar: `تتميز المنظومة القضائية في دولة الإمارات، وإمارة دبي خصوصاً، بازدواجية القضاء: محاكم دبي المحلية القائمة على نظام القانون المدني المكتوب، ومحاكم مركز دبي المالي العالمي (DIFC) القائمة على القانون العام (Common Law). وبموجب قانون الإجراءات المدنية الاتحادي، تُعد اللغة العربية اللغة الرسمية الوحيدة لكافة الدفوع والمذكرات وصحف الدعاوى أمام المحاكم المحلية — ما يجعل الترجمة القانونية المعتمدة ضرورة إجرائية لا شكلية.

## لماذا تُعد الترجمة المعتمدة أساسية في التقاضي

**قبول الأدلة.** لا تقبل المحاكم المحلية والنيابة العامة أي عقد أو مراسلة أو كشف حساب أجنبي كدليل ما لم يكن مصحوباً بترجمة قانونية معتمدة إلى العربية بختم مترجم مرخص من وزارة العدل. بدون هذا الختم، تكون المستندات الأجنبية غير مقبولة قانوناً.

**الحفاظ على الحجج القانونية.** تعتمد صحة الدفوع الشكلية — كالدفع بعدم الاختصاص أو سقوط الحق بالتقادم — كلياً على مدى دقة الترجمة ومطابقتها للمفاهيم القانونية الإماراتية المدونة.

**دعم الخبراء القضائيين.** في النزاعات التجارية أو الهندسية المعقدة، تنتدب المحاكم خبراء فنيين تعتمد تقاريرهم على دقة ترجمة المستندات الثبوتية.

**المواعيد القضائية الصارمة.** تخضع المذكرات الجوابية والطعون لمهل زمنية ملزمة قانوناً، ما يستلزم شريك ترجمة قادراً على إنجاز مئات الصفحات دون المساس بالدقة.

## المستندات التي نترجمها

- **صحف الدعاوى والإنذارات العدلية** — المستند التأسيسي لأي دعوى.
- **مذكرات الدفاع والرد** — الردود الرسمية التي تعرض الدفوع الشكلية والموضوعية.
- **مستندات الإثبات** — العقود التجارية، كشوف الحسابات، الدفاتر المدققة، تقارير الخبراء.
- **الأحكام القضائية وقرارات التحكيم** — لأغراض التنفيذ أو الاستخدام الدولي.

## تحدي الترجمة القانونية

يتطلب نقل مفاهيم القانون العام (مثل الإنصاف أو التعويض المحدد) إلى صياغة عربية مدونة تكييفاً مفاهيمياً دقيقاً، لا استبدالاً حرفياً. فكل ترجمة قانونية في جسور الكلمات تمر بمراحل تدقيق صارمة ومتعددة لضمان عدم انقلاب المعنى القانوني لأي بند.

## لماذا جسور الكلمات

- **مترجمون مرخصون من وزارة العدل** بخبرة تراكمية في ملفات التقاضي المعقدة.
- **اعتماد تنظيمي كامل** — مقبولة لدى محاكم دبي ومركز دبي المالي العالمي والنيابة العامة.
- **سرية تامة** — أنظمة نقل ملفات آمنة واتفاقيات عدم إفصاح ملزمة.
- **سرعة إنجاز** لملفات التقاضي الضخمة دون المساس بمعايير الجودة.`,
    },
    faqs: [
      {
        question: { en: "Does Arabic have to be used for all Dubai court filings?", ar: "هل يجب استخدام اللغة العربية في جميع ملفات المحاكم بدبي؟" },
        answer: {
          en: "Yes. Under the UAE Civil Procedures Law, Arabic is the sole official language for onshore court proceedings, pleadings, and evidentiary submissions.",
          ar: "نعم. بموجب قانون الإجراءات المدنية الإماراتي، العربية هي اللغة الرسمية الوحيدة للتقاضي والدفوع والمستندات الثبوتية أمام المحاكم المحلية.",
        },
      },
      {
        question: { en: "What happens if a document isn't certified-translated?", ar: "ماذا يحدث إذا لم يكن المستند مترجماً ترجمة معتمدة؟" },
        answer: {
          en: "Foreign-language documents without a certified translation sealed by an MOJ-licensed translator are legally inadmissible as evidence in onshore Dubai Courts.",
          ar: "المستندات الأجنبية غير المصحوبة بترجمة معتمدة بختم مترجم مرخص من وزارة العدل تكون غير مقبولة قانوناً كدليل أمام محاكم دبي المحلية.",
        },
      },
      {
        question: { en: "Do you translate arbitral awards for enforcement?", ar: "هل تترجمون أحكام التحكيم لأغراض التنفيذ؟" },
        answer: {
          en: "Yes — including foreign court judgments and arbitral awards translated for the enforcement (executory formula) process before local execution judges.",
          ar: "نعم، بما في ذلك الأحكام القضائية الأجنبية وقرارات التحكيم المترجمة لأغراض إجراءات التنفيذ أمام قضاة التنفيذ المحليين.",
        },
      },
    ],
    readingTimeMins: 7,
    publishedAt: "2026-07-21",
  },

  {
    slug: "corporate-tax-vat-fta-compliance-translation-dubai",
    category: "corporate-finance",
    iconKey: "Landmark",
    title: {
      en: "Certified Legal and Financial Translation for Corporate Tax, VAT, and Regulatory Compliance with the Federal Tax Authority (FTA) in Dubai",
      ar: "الترجمة القانونية والمالية لضريبة الشركات، ضريبة القيمة المضافة، وملفات الامتثال للهيئة الاتحادية للضرائب في دبي",
    },
    excerpt: {
      en: "Under Federal Decree-Law No. 47 of 2022, tax and accounting records must be maintained in Arabic or certified-translated — here's what that means for compliance.",
      ar: "بموجب المرسوم بقانون اتحادي رقم 47 لسنة 2022، يجب أن تكون السجلات الضريبية والمحاسبية بالعربية أو مترجمة ترجمة معتمدة — إليك ما يعنيه ذلك للامتثال.",
    },
    definitionBlock: {
      en: "Certified corporate tax translation is the FTA-compliant Arabic rendering of audited financial ledgers, transfer pricing files, and tax assessment objections, required under Federal Decree-Law No. 47 of 2022. Companies operating in Dubai must present these records in Arabic during FTA audits, or risk administrative penalties and rejected filings.",
      ar: "الترجمة الضريبية المعتمدة للشركات هي نقل الدفاتر المالية المدققة وملفات التسعير التحويلي واعتراضات التقييمات الضريبية إلى العربية وفق متطلبات الهيئة الاتحادية للضرائب، بموجب المرسوم بقانون اتحادي رقم 47 لسنة 2022. ويجب على الشركات العاملة في دبي تقديم هذه السجلات بالعربية أثناء التدقيق الضريبي، وإلا تعرضت لغرامات إدارية ورفض المعاملات.",
    },
    bodyMarkdown: {
      en: `The UAE's financial and regulatory framework shifted decisively with the full implementation of the Corporate Tax Law and heightened FTA scrutiny of financial records. Financial translation is no longer a simple linguistic conversion — it's a core element of regulatory compliance. A mistranslated accounting term or formatting error in a tax report can expose a company to legal disputes and significant administrative penalties.

Under **Federal Decree-Law No. 47 of 2022** on the Taxation of Corporations and Businesses, the FTA mandates that accounting records, financial ledgers, transactional contracts, and transfer pricing files be maintained in Arabic or accompanied by a certified legal translation.

## Where Certified Translation Is Required

**FTA Audit Compliance.** Taxpayers must present audited accounts and general ledgers in Arabic during tax audits — certified translation prevents administrative non-compliance fines.

**Transfer Pricing Documentation.** Multinational groups must submit Local Files and Master Files justifying intercompany pricing under arm's-length principles. Translation here demands extreme technical precision, since the FTA audits these numbers directly.

**Tax Objections and Appeals.** If the FTA issues an unfavorable assessment, taxpayers can file a Reconsideration Request or appeal before the Tax Dispute Resolution Committee — success depends on precisely translated objections backed by MOJ-licensed certification.

**Audited Financial Statements.** Balance sheets, P&L statements, and auditor reports compliant with IFRS require certified financial translation to preserve numeric accuracy.

## Documents We Handle

- Audited financial statements and general accounting ledgers
- Transfer pricing Local Files and Master Files
- Tax dispute objections and appeal memorandums
- Corporate tax filings, VAT returns, and FTA assessment notices

## The Technical Challenge

Tax translation requires mastering two distinct languages at once: codified UAE tax law (Qualifying Free Zone Person, arm's-length principle, taxable income) and forensic accounting. A single decimal-point error in a translated ledger can distort a company's tax liability entirely — which is why numeric data is locked and cross-verified, not just translated.

## Why Jusor Alkalimat

- **Dedicated tax translators** — corporate lawyers and chartered tax consultants, not generalists.
- **Full regulatory accreditation** with the FTA, Ministry of Finance, UAE Central Bank, and federal judiciary.
- **Rapid turnaround** to meet strict filing and objection deadlines.
- **Three-stage ISO quality control** on every translated financial statement and tax appeal.`,
      ar: `شهدت البيئة التنظيمية والمالية في دولة الإمارات تحولاً جذرياً مع التطبيق الكامل لقانون ضريبة الشركات وتشديد الهيئة الاتحادية للضرائب على مطابقة السجلات المالية. لم تعد الترجمة المالية نقلاً لغوياً بسيطاً، بل ركيزة أساسية للامتثال القانوني والمالي؛ فخطأ في مصطلح محاسبي واحد قد يعرض الشركة لمخاطر قانونية وغرامات ضخمة.

بموجب **المرسوم بقانون اتحادي رقم 47 لسنة 2022** بشأن ضريبة الشركات، تشترط الهيئة أن تكون الدفاتر الحسابية والسجلات المالية وملفات التسعير التحويلي مصاغة بالعربية أو مصحوبة بترجمة قانونية معتمدة.

## متى تكون الترجمة المعتمدة مطلوبة

**الامتثال لتدقيق الهيئة.** يجب تقديم السجلات والدفاتر الحسابية بالعربية عند التدقيق الضريبي، لتجنب غرامات عدم الامتثال.

**وثائق التسعير التحويلي.** تشترط الهيئة تقديم الملف الرئيسي والملف المحلي لتبرير المعاملات البينية وفق مبدأ الاستقلالية — وتتطلب ترجمتها دقة متناهية لأن الهيئة تدقق الأرقام مباشرة.

**الاعتراضات الضريبية.** عند صدور تقييم ضريبي مجحف، يحق للشركة تقديم طلب إعادة نظر أمام لجنة فض المنازعات الضريبية، وتعتمد نتيجته على دقة الترجمة المعتمدة للاعتراض والأدلة المرفقة.

**القوائم المالية المدققة.** الميزانيات وحسابات الأرباح والخسائر المطابقة لمعايير IFRS تتطلب ترجمة مالية معتمدة تحافظ على الدقة الرقمية.

## المستندات التي نتعامل معها

- الدفاتر الحسابية والقوائم المالية المدققة
- الملف الرئيسي والملف المحلي للتسعير التحويلي
- مذكرات الاعتراضات الضريبية وطلبات إعادة النظر
- الإقرارات الضريبية وإشعارات التقييم الصادرة عن الهيئة

## التحدي الفني

تتطلب الترجمة الضريبية إتقان لغتين متزامنتين: قانون الضرائب الإماراتي المدوّن (كالشخص المؤهل في المنطقة الحرة، ومبدأ الاستقلالية) والمحاسبة الجنائية الدقيقة. فخطأ واحد في موضع العلامة العشرية قد يشوه الوعاء الضريبي بالكامل — لذا تُقفل البيانات الرقمية وتُراجع مقارنة بالأصل، لا تُترجم فقط.

## لماذا جسور الكلمات

- **مترجمون متخصصون في الضرائب** من محامين ومستشارين ضريبيين معتمدين، لا مترجمين عموميين.
- **اعتماد تنظيمي كامل** لدى الهيئة الاتحادية للضرائب ووزارة المالية ومصرف الإمارات المركزي.
- **سرعة إنجاز** لالتزام مواعيد الإقرارات والاعتراضات الصارمة.
- **مراجعة ثلاثية وفق ISO** لكل قائمة مالية واعتراض ضريبي مترجم.`,
    },
    faqs: [
      {
        question: { en: "Does the FTA require financial books in Arabic?", ar: "هل تطلب الهيئة الاتحادية للضرائب الدفاتر المالية بالعربية؟" },
        answer: {
          en: "Yes — under the UAE Tax Procedures Law, tax records, audited accounts, and financial reports must be kept and presented in Arabic during audits.",
          ar: "نعم، بموجب قانون الإجراءات الضريبية الإماراتي، يجب حفظ وتقديم السجلات الضريبية والدفاتر المدققة والتقارير المالية بالعربية أثناء التدقيق.",
        },
      },
      {
        question: { en: "What are Transfer Pricing Local and Master Files?", ar: "ما هما الملف المحلي والملف الرئيسي للتسعير التحويلي؟" },
        answer: {
          en: "Documentation justifying that intercompany transactions align with arm's-length principles. Precision matters because the FTA audits these figures directly to verify taxable income.",
          ar: "وثائق تبرر مطابقة المعاملات البينية بين الشركات ذات العلاقة لمبدأ الاستقلالية. الدقة حاسمة لأن الهيئة تدقق هذه الأرقام مباشرة للتحقق من الوعاء الضريبي.",
        },
      },
      {
        question: { en: "Can you translate tax objection letters for the Dispute Resolution Committee?", ar: "هل تترجمون مذكرات الاعتراض للجنة فض المنازعات الضريبية؟" },
        answer: {
          en: "Yes — reconsideration requests, accountant reports, and statements of claim submitted to the Tax Dispute Resolution Committee and federal courts.",
          ar: "نعم — طلبات إعادة النظر وتقارير المحاسبين وصحف الدعاوى المقدمة للجنة فض المنازعات الضريبية والمحاكم الاتحادية.",
        },
      },
    ],
    readingTimeMins: 7,
    publishedAt: "2026-07-21",
  },

  {
    slug: "mofa-moj-attestation-guide-dubai",
    category: "attestation-visas",
    iconKey: "Stamp",
    title: {
      en: "Professional Guide to UAE Ministry of Foreign Affairs (MOFA) and Ministry of Justice (MOJ) Attestation in Dubai",
      ar: "الدليل المهني لتصديقات وزارة الخارجية ووزارة العدل والكاتب العدل في دبي والإمارات",
    },
    excerpt: {
      en: "The difference between MOJ and MOFA attestation, the eDAS 2.0 digital system, and the exact dual-attestation chain your documents need to follow.",
      ar: "الفرق بين تصديقات وزارة العدل ووزارة الخارجية، ونظام eDAS 2.0 الرقمي، وسلسلة التصديق المزدوج التي يجب أن تمر بها مستنداتك بالضبط.",
    },
    definitionBlock: {
      en: "MOFA and MOJ attestation is the mandatory verification chain that authenticates personal and commercial documents for legal use in or outside the UAE. MOJ attestation authenticates notary and translator seals domestically; MOFA attestation is the final seal validating a document internationally, now largely processed through the eDAS 2.0 digital portal.",
      ar: "تصديقات وزارة الخارجية ووزارة العدل هي سلسلة التوثيق الإلزامية التي تمنح المستندات الشخصية والتجارية الصفة القانونية للاستخدام داخل الإمارات أو خارجها. تصديق وزارة العدل يوثّق أختام الكاتب العدل والمترجمين محلياً، بينما تصديق وزارة الخارجية هو الختم النهائي الذي يمنح المستند الصفة الدولية، ويتم غالباً الآن عبر بوابة eDAS 2.0 الرقمية.",
    },
    bodyMarkdown: {
      en: `The UAE's regulatory ecosystem is globally recognized for precision and reliability — a key reason it attracts foreign investment and family settlement. To protect documents from forgery, the government enforces a mandatory attestation framework centered on the Ministry of Justice (MOJ), Notary Public, and Ministry of Foreign Affairs (MOFA), now largely digitized through eDAS 2.0 and the Digital Notary Public.

## 1. Ministry of Justice & Notary Public Attestation

The **Notary Public** (government or licensed private) verifies identities, mental capacity, and signatures for documents like Powers of Attorney, Memorandums of Association, asset purchase agreements, and legal declarations, granting them local enforceability.

The **Digital Notary** system lets parties upload contracts, sign electronically via UAE PASS, and complete notarization over secure video call — no physical visit required.

For a translation to be legally accepted, it must come from a translator registered with the MOJ, which verifies and stamps the translator's seal for documents destined for international use.

## 2. Ministry of Foreign Affairs (MOFA) Attestation

MOFA attestation is the final legal seal validating a foreign document for UAE use, or a UAE document for use abroad.

- **Personal documents** (birth/marriage certificates, degrees, PCC) — standard fee: AED 150/document.
- **Commercial documents** (registration certificates, trade licenses, board resolutions) — standard fee: AED 2,000/document.
- **eDAS 2.0** — businesses importing goods valued AED 10,000+ must attest commercial invoices digitally within 14 days of customs declaration, or face a AED 500/invoice penalty.

## The Dual Attestation Chain

**Documents issued outside the UAE:** attest at the origin country's MOFA → legalize at the UAE Embassy in that country → complete MOFA attestation in the UAE → submit to Jusor Alkalimat for certified Arabic translation → secure MOJ authentication on the translator's seal.

**Documents issued inside the UAE:** notarize or obtain the issuing authority's stamp → secure MOJ attestation → complete MOFA attestation → legalize at the destination country's embassy in the UAE.

## Common Pitfalls

- **Name spelling mismatches** between translated documents and passports/title deeds.
- **Tight statutory deadlines** for customs, court filings, and university admissions.
- **Digital portal friction** — verifying signatures or navigating eDAS 2.0.

## Why Jusor Alkalimat

- **Dual ministerial credentials** — our certified translations are automatically recognized by MOFA and embassies.
- **End-to-end logistics** — we manage the full attestation cycle, not just translation.
- **ISO-certified quality control** across every stamp, seal, and technical detail.`,
      ar: `تتميز البيئة التنظيمية في دولة الإمارات بالدقة والموثوقية العالية، وهو ما يجعلها بيئة جاذبة للاستثمار الأجنبي والاستقرار العائلي. ولحماية المستندات من التزوير، تفرض الدولة منظومة تصديقات إلزامية محورها وزارة العدل، الكاتب العدل، ووزارة الخارجية، أصبحت اليوم رقمية إلى حد كبير عبر eDAS 2.0 والكاتب العدل الرقمي.

## أولاً: تصديقات وزارة العدل والكاتب العدل

يتولى **كاتب العدل** (الحكومي أو الخاص المرخص) التحقق من أهلية الأطراف وتواقيعهم على مستندات مثل الوكالات، عقود التأسيس، وعقود البيع، لمنحها القوة التنفيذية محلياً.

يتيح **الكاتب العدل الرقمي** توثيق العقود وتوقيعها إلكترونياً عبر UAE PASS ومكالمات فيديو آمنة، دون الحاجة لزيارة مركز خدمة.

لتكون الترجمة معتمدة رسمياً، يجب أن تصدر عن مترجم مسجل لدى وزارة العدل، التي تصادق على ختمه وتوقيعه للمستندات الموجهة للاستخدام الدولي.

## ثانياً: تصديقات وزارة الخارجية (MOFA)

تصديق وزارة الخارجية هو الختم القانوني النهائي الذي يمنح المستند الأجنبي صفة قانونية داخل الدولة، أو يمنح المستند الإماراتي صفة دولية.

- **المستندات الشخصية** (شهادات الميلاد والزواج، الشهادات الجامعية) — الرسم الرسمي: 150 درهماً للمستند.
- **المستندات التجارية** (شهادات التسجيل، الرخص التجارية، قرارات مجلس الإدارة) — الرسم الرسمي: 2,000 درهم للمستند.
- **نظام eDAS 2.0** — يجب على مستوردي البضائع بقيمة 10,000 درهم فأكثر تصديق الفواتير التجارية رقمياً خلال 14 يوماً من التصريح الجمركي، وإلا فرضت غرامة 500 درهم لكل فاتورة.

## سلسلة التصديق المزدوج

**المستندات الصادرة خارج الدولة:** تصديق وزارة الخارجية في بلد المنشأ ← تصديق السفارة الإماراتية هناك ← تصديق وزارة الخارجية الإماراتية ← ترجمة معتمدة لدى جسور الكلمات ← تصديق وزارة العدل على ختم المترجم.

**المستندات الصادرة داخل الدولة:** توثيق الكاتب العدل أو ختم الجهة المصدرة ← تصديق وزارة العدل ← تصديق وزارة الخارجية ← تصديق سفارة بلد الوجهة داخل الدولة.

## تحديات شائعة

- **عدم تطابق تهجئة الأسماء** بين المستندات المترجمة وجواز السفر.
- **مواعيد قانونية ضيقة** للجمارك والمحاكم والقبول الجامعي.
- **تعقيد البوابات الرقمية** والتحقق من التواقيع الإلكترونية.

## لماذا جسور الكلمات

- **اعتماد وزاري مزدوج** — ترجماتنا معترف بها تلقائياً من وزارة الخارجية والسفارات.
- **إدارة لوجستية كاملة** — لا نكتفي بالترجمة، بل ندير دورة التصديق كاملة.
- **رقابة جودة معتمدة وفق ISO** على كل ختم وتوقيع وتفصيل فني.`,
    },
    faqs: [
      {
        question: { en: "What's the difference between Notary Public and MOFA attestation?", ar: "ما الفرق بين توثيق الكاتب العدل وتصديق وزارة الخارجية؟" },
        answer: {
          en: "Notary Public verifies identity and signatures locally; MOFA attestation verifies the authenticity of official stamps for international legal validity.",
          ar: "الكاتب العدل يوثّق الهوية والتوقيعات محلياً، بينما تصديق وزارة الخارجية يوثّق صحة الأختام الرسمية لمنح الصفة القانونية الدولية.",
        },
      },
      {
        question: { en: "Can digitally issued certificates with QR codes be attested?", ar: "هل يمكن تصديق الشهادات الرقمية التي تحمل رمز QR؟" },
        answer: {
          en: "Yes — MOFA verifies digitally issued certificates with QR codes and encrypted signatures through direct database links with issuing authorities.",
          ar: "نعم — تتحقق وزارة الخارجية من الشهادات الرقمية ذات رمز QR والتوقيعات المشفرة عبر ربط مباشر بقواعد بيانات الجهات المُصدرة.",
        },
      },
      {
        question: { en: "What's the penalty for late commercial invoice attestation under eDAS 2.0?", ar: "ما غرامة التأخر في تصديق الفواتير التجارية عبر eDAS 2.0؟" },
        answer: {
          en: "AED 500 per invoice if attestation isn't completed within 14 days of the customs declaration date.",
          ar: "500 درهم لكل فاتورة إذا لم يتم التصديق خلال 14 يوماً من تاريخ التصريح الجمركي.",
        },
      },
    ],
    readingTimeMins: 6,
    publishedAt: "2026-07-21",
  },

  {
    slug: "dubai-tourist-visa-translation-guide",
    category: "attestation-visas",
    iconKey: "Plane",
    title: {
      en: "Certified Translation for Dubai Tourist Visa Applications: A Complete Guide",
      ar: "ترجمة مستندات تأشيرة السياحة لدبي: دليلك الشامل لضمان الموافقة",
    },
    excerpt: {
      en: "What the ICP and GDRFA require translated for the 5-year multi-entry tourist visa — bank statements, proof of address, and family documents.",
      ar: "ما الذي تشترط الهيئة الاتحادية للهوية والجنسية والإدارة العامة للإقامة ترجمته لتأشيرة السياحة متعددة الدخول لخمس سنوات.",
    },
    definitionBlock: {
      en: "Certified translation for Dubai tourist visas is the Arabic rendering of financial and civil documents — bank statements, proof of address, marriage and birth certificates — required by the ICP and GDRFA for visa applications. The 5-year multi-entry visa specifically requires proof of a minimum USD 4,000 bank balance, translated with full accounting precision.",
      ar: "الترجمة المعتمدة لتأشيرات السياحة بدبي هي نقل المستندات المالية والمدنية — كشوف الحسابات، إثباتات السكن، شهادات الزواج والميلاد — إلى العربية وفق متطلبات الهيئة الاتحادية للهوية والإدارة العامة للإقامة. وتشترط تأشيرة الخمس سنوات متعددة الدخول تحديداً إثبات رصيد بنكي لا يقل عن 4,000 دولار، مترجماً بدقة محاسبية كاملة.",
    },
    bodyMarkdown: {
      en: `Dubai is a global hub for tourism, entrepreneurship, and luxury living. In line with the Dubai Economic Agenda (D33), the UAE has introduced flexible visa frameworks — most notably the 5-year multi-entry long-term tourist visa and family-sponsored visit visas.

To avoid administrative delays or rejection, immigration regulators mandate that supporting financial and civil documents be submitted with certified Arabic translation.

## Why Certified Translation Matters

**ICP Compliance.** Any supporting document in a foreign language — bank ledgers, property deeds, national IDs — must be accompanied by a certified translation stamped by an MOJ-licensed translator.

**Financial Solvency Verification.** The 5-year multi-entry visa requires proof of a minimum USD 4,000 bank balance over the preceding six months. Bank statements must be translated with absolute accounting precision so underwriting officers can correctly read cash flows.

**Family Relationship Verification.** Joint family visa applications require marriage contracts and children's birth certificates translated into Arabic to confirm relationships and avoid delays.

## Documents You'll Need Translated

- **Audited bank statements** — transaction history, balances, cash-flow indices
- **Proof of address** — utility bills, tenancy agreements, property deeds
- **International travel health insurance** policies
- **Birth and marriage certificates** for family applications

## The Technical Challenge

Bank statements combine dense accounting terminology with multi-column numeric grids. We use desktop-publishing tools to translate only the text labels while locking numerical data, balances, and currency symbols in place — preserving an exact match to the original.

## Why Jusor Alkalimat

- **Official recognition** by the ICP, GDRFA, and federal ministries.
- **Three-stage ISO quality control** on every degree, bank statement, and civil certificate.
- **Rapid turnaround** to meet flight and hotel booking deadlines.`,
      ar: `تتصدر دبي المشهد العالمي في السياحة وريادة الأعمال والعيش الفاخر. وتماشياً مع أجندة دبي الاقتصادية (D33)، استحدثت الإمارات منظومات تأشيرات مرنة، أبرزها تأشيرة السياحة طويلة الأجل متعددة الدخول لخمس سنوات وتأشيرات الزيارة العائلية.

ولتفادي التأخير الإداري أو الرفض، تشترط الجهات التنظيمية تقديم المستندات المالية والمدنية مترجمة ترجمة قانونية معتمدة للعربية.

## لماذا تُعد الترجمة المعتمدة أساسية

**الامتثال لمتطلبات الهيئة الاتحادية للهوية.** أي مستند بلغة أجنبية — كشوف حسابات، سندات ملكية، بطاقات هوية — يجب أن يكون مصحوباً بترجمة معتمدة بختم مترجم مرخص من وزارة العدل.

**التحقق من الملاءة المالية.** تشترط تأشيرة الخمس سنوات إثبات رصيد بنكي لا يقل عن 4,000 دولار خلال الأشهر الستة السابقة، ويجب ترجمة كشوف الحسابات بدقة محاسبية كاملة.

**إثبات صلة القرابة.** تتطلب طلبات التأشيرة العائلية ترجمة عقود الزواج وشهادات ميلاد الأطفال للعربية لتأكيد صلة القرابة وتجنب التأخير.

## المستندات المطلوب ترجمتها

- **كشوف الحسابات البنكية المدققة** — تاريخ المعاملات والأرصدة والتدفقات النقدية
- **إثبات السكن** — فواتير المرافق، عقود الإيجار، سندات الملكية
- **وثائق التأمين الصحي الدولي للسفر**
- **شهادات الميلاد والزواج** للطلبات العائلية

## التحدي الفني

تجمع كشوف الحسابات بين مصطلحات محاسبية دقيقة وجداول رقمية متعددة الأعمدة. نستخدم أدوات نشر مكتبي متخصصة لترجمة النصوص فقط مع تثبيت البيانات الرقمية والأرصدة ورموز العملات — لضمان مطابقة تامة للأصل.

## لماذا جسور الكلمات

- **اعتماد رسمي** لدى الهيئة الاتحادية للهوية والإدارة العامة للإقامة والوزارات الاتحادية.
- **مراجعة ثلاثية وفق ISO** لكل شهادة وكشف حساب مترجم.
- **سرعة إنجاز** للالتزام بمواعيد حجوزات الطيران والفنادق.`,
    },
    faqs: [
      {
        question: { en: "Do immigration authorities require foreign bank statements translated?", ar: "هل تشترط هيئات الهجرة ترجمة كشوف الحسابات الأجنبية؟" },
        answer: {
          en: "Yes — the ICP mandates certified Arabic translation of foreign bank statements and financial proofs for long-term or multi-entry tourist visas.",
          ar: "نعم — تشترط الهيئة الاتحادية للهوية ترجمة معتمدة للعربية لكشوف الحسابات والإثباتات المالية الأجنبية لتأشيرات السياحة طويلة الأجل ومتعددة الدخول.",
        },
      },
      {
        question: { en: "Are your travel document translations accepted by foreign embassies?", ar: "هل ترجماتكم لمستندات السفر مقبولة لدى السفارات الأجنبية؟" },
        answer: {
          en: "Yes — as an MOJ-registered licensed office, our certified translations of travel documents and certificates are accepted by embassies and international registries.",
          ar: "نعم — بصفتنا مكتباً مرخصاً ومسجلاً لدى وزارة العدل، ترجماتنا المعتمدة لمستندات السفر والشهادات مقبولة لدى السفارات والجهات الدولية.",
        },
      },
      {
        question: { en: "How do you ensure names match passport records?", ar: "كيف تضمنون تطابق الأسماء مع بيانات جواز السفر؟" },
        answer: {
          en: "Our quality control team cross-checks all names, dates of birth, and ID numbers against official passport records before delivery.",
          ar: "يقوم فريق مراقبة الجودة بمطابقة جميع الأسماء وتواريخ الميلاد وأرقام الهوية مع جواز السفر الرسمي قبل التسليم.",
        },
      },
    ],
    readingTimeMins: 6,
    publishedAt: "2026-07-21",
  },

  {
    slug: "real-estate-mortgage-banking-translation-dubai",
    category: "sector-specialized",
    iconKey: "Building2",
    title: {
      en: "Certified Legal Translation for Real Estate Mortgages and Banking Documents in Dubai",
      ar: "دليلك الشامل للترجمة القانونية المعتمدة لمستندات الرهن العقاري والتمويل المصرفي في دبي",
    },
    excerpt: {
      en: "KYC/AML compliance, Dubai Land Department registration, and why a single decimal error in a translated bank statement can sink a mortgage file.",
      ar: "الامتثال لمتطلبات اعرف عميلك ومكافحة غسيل الأموال، وتسجيل دائرة الأراضي والأملاك، ولماذا قد يُسقط خطأ عشري واحد ملف الرهن العقاري بأكمله.",
    },
    definitionBlock: {
      en: "Certified mortgage and banking translation renders bank statements, utility bills, salary certificates, and mortgage contracts into Arabic for Dubai banks and the Dubai Land Department. Central Bank KYC/AML rules require certified translation of any foreign-language financial record before a mortgage or bank account application can proceed.",
      ar: "الترجمة المعتمدة للمستندات البنكية والرهن العقاري هي نقل كشوف الحسابات وفواتير المرافق وشهادات الراتب وعقود الرهن إلى العربية لبنوك دبي ودائرة الأراضي والأملاك. وتشترط قواعد اعرف عميلك ومكافحة غسيل الأموال لدى المصرف المركزي ترجمة معتمدة لأي سجل مالي بلغة أجنبية قبل قبول طلب الرهن أو فتح الحساب.",
    },
    bodyMarkdown: {
      en: `Dubai's real estate and investment boom continues to attract international investors and residents pursuing property ownership and major developments. Mortgage and bank financing is the primary channel funding these investments — and because the banking sector is so tightly regulated, local banks and finance companies enforce strict KYC (Know Your Customer) and AML (Anti-Money Laundering) audit procedures under UAE Central Bank rules.

## Why Translation Is Procedurally Required

**KYC/AML Compliance.** Banks like Emirates NBD, ADCB, and FAB cannot process foreign-language bank statements without a certified Arabic (or English) translation verifying the source of funds.

**Creditworthiness Assessment.** Mortgage pre-approval hinges on a precise debt-to-burden ratio analysis. Certified translation of salary certificates, tax returns, and financial statements ensures underwriters read the numbers correctly.

**Dubai Land Department (DLD) Registration.** To register a mortgage on a property, the DLD requires certified Arabic translation of loan offer letters, mortgage agreements, and bank guarantees before issuing the Title Deed with the mortgage annotation.

## Documents We Translate

- **Personal and corporate bank statements** — transaction histories, IBAN/SWIFT codes, cash-flow data
- **Utility bills and proof of address** — DEWA bills, tenancy contracts, municipal statements
- **Salary certificates, employment contracts, and tax returns**
- **Mortgage contracts and credit facility agreements**

## The Technical Challenge

Bank statements pack in hundreds of transactions, specialized abbreviations (direct debit, wire transfer, clearing), and rigid table structures. A single misplaced decimal point can distort a transaction's value entirely — so numeric cells are locked and cross-verified, not re-typed by hand, preserving an exact match to the source document.

## Why Jusor Alkalimat

- **Chartered accountants and financial-legal translators**, not generalists.
- **Full accreditation** with the UAE Central Bank, Dubai Land Department, and licensed commercial banks.
- **Rapid turnaround** to meet property booking and pre-approval deadlines.
- **Three-stage ISO quality control** on every translated bank statement and mortgage contract.`,
      ar: `يشهد قطاع العقارات والاستثمار في دبي طفرة استثنائية تجتذب المستثمرين والمقيمين الدوليين الباحثين عن تملك العقارات وتطوير المشاريع الكبرى. ويمثل التمويل العقاري والمصرفي القناة الرئيسية لتمويل هذه الاستثمارات، ونظراً لصرامة تنظيم القطاع المصرفي، تفرض البنوك المحلية إجراءات تدقيق دقيقة للامتثال لمتطلبات "اعرف عميلك" (KYC) ومكافحة غسيل الأموال (AML) الصادرة عن مصرف الإمارات المركزي.

## لماذا تُعد الترجمة مطلوبة إجرائياً

**الامتثال لمتطلبات KYC/AML.** لا يمكن لبنوك مثل بنك الإمارات دبي الوطني وبنك أبوظبي التجاري وبنك أبوظبي الأول معالجة كشوف حسابات أجنبية دون ترجمة معتمدة للعربية أو الإنجليزية تحقق مصدر الأموال.

**تقييم الجدارة الائتمانية.** تعتمد الموافقة المبدئية للرهن على تحليل دقيق لنسبة الدين إلى الدخل، وتضمن الترجمة المعتمدة لشهادات الراتب والإقرارات الضريبية قراءة صحيحة للأرقام.

**تسجيل دائرة الأراضي والأملاك.** لتسجيل الرهن على عقار، تشترط الدائرة ترجمة معتمدة للعربية لخطابات عرض القرض وعقود الرهن وخطابات الضمان البنكي قبل إصدار صك الملكية الحامل لإشارة الرهن.

## المستندات التي نترجمها

- **كشوف الحسابات الشخصية والتجارية** — تاريخ المعاملات، أرقام IBAN/SWIFT، بيانات التدفق النقدي
- **فواتير المرافق وإثبات السكن** — فواتير DEWA، عقود الإيجار، البيانات البلدية
- **شهادات الراتب وعقود العمل والإقرارات الضريبية**
- **عقود الرهن العقاري واتفاقيات التسهيلات الائتمانية**

## التحدي الفني

تحتوي كشوف الحسابات على مئات المعاملات واختصارات متخصصة (خصم مباشر، حوالة برقية، مقاصة) وجداول صارمة البنية. أي إزاحة في موضع علامة عشرية قد تُشوّه قيمة المعاملة بالكامل — لذا تُقفل الخلايا الرقمية وتُراجع مقارنة بالأصل، لا تُعاد كتابتها يدوياً.

## لماذا جسور الكلمات

- **محاسبون قانونيون ومترجمون ماليون متخصصون**، لا مترجمون عموميون.
- **اعتماد كامل** لدى مصرف الإمارات المركزي ودائرة الأراضي والأملاك والبنوك المرخصة.
- **سرعة إنجاز** للالتزام بمواعيد حجز العقارات والموافقات المبدئية.
- **مراجعة ثلاثية وفق ISO** لكل كشف حساب وعقد رهن مترجم.`,
    },
    faqs: [
      {
        question: { en: "Do Dubai banks require foreign bank statements translated?", ar: "هل تشترط بنوك دبي ترجمة كشوف الحسابات الأجنبية؟" },
        answer: {
          en: "Yes — credit and compliance departments require certified Arabic or English translation of foreign bank statements to verify cash flows.",
          ar: "نعم — تشترط إدارات الائتمان والامتثال ترجمة معتمدة للعربية أو الإنجليزية لكشوف الحسابات الأجنبية للتحقق من التدفقات المالية.",
        },
      },
      {
        question: { en: "Why does translating utility bills matter for a mortgage?", ar: "لماذا تهم ترجمة فواتير المرافق في معاملات الرهن؟" },
        answer: {
          en: "Utility bills serve as primary proof of address under international KYC guidelines — precise translation ensures address details match the mortgage application.",
          ar: "تُعد فواتير المرافق إثبات السكن الأساسي وفق معايير اعرف عميلك الدولية، والترجمة الدقيقة تضمن تطابق بيانات العنوان مع طلب الرهن.",
        },
      },
      {
        question: { en: "Do you translate mortgage agreements for the Dubai Land Department?", ar: "هل تترجمون عقود الرهن لدائرة الأراضي والأملاك؟" },
        answer: {
          en: "Yes — including credit facility contracts, mortgage agreements, salary slips, and utility bills submitted for Title Deed registration.",
          ar: "نعم — بما في ذلك عقود التسهيلات الائتمانية وعقود الرهن وشهادات الراتب وفواتير المرافق المقدمة لتسجيل صك الملكية.",
        },
      },
    ],
    readingTimeMins: 7,
    publishedAt: "2026-07-21",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = [
  { slug: "legal-litigation", label: { en: "Legal & Litigation", ar: "القضايا والتقاضي" } },
  { slug: "corporate-finance", label: { en: "Corporate & Financial Compliance", ar: "الامتثال المؤسسي والمالي" } },
  { slug: "attestation-visas", label: { en: "Attestation & Visas", ar: "التصديقات والتأشيرات" } },
  { slug: "sector-specialized", label: { en: "Sector-Specialized Translation", ar: "الترجمة القطاعية المتخصصة" } },
] as const;
