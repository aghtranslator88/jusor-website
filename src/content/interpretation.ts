// Static content for the Interpretation Services hub, structured to mirror
// the InterpretationMode enum and EquipmentItem model
// (docs/spec/01-database-schema.prisma) until a live database is connected —
// see docs/spec/06-hub-interpretation-equipment.md for the page pattern this
// follows.

import type { LocalizedText } from "./blog";

export type InterpretationMode = {
  slug: "booth-rental" | "simultaneous" | "consecutive" | "remote-rsi";
  iconKey: string;
  name: LocalizedText;
  tagline: LocalizedText;
  definitionBlock: LocalizedText;
  whenToUse: LocalizedText[];
  alternativeSlug?: string;
  alternativeReason?: LocalizedText;
  isEquipment: boolean;
};

export const interpretationModes: InterpretationMode[] = [
  {
    slug: "simultaneous",
    iconKey: "Mic",
    name: { en: "Simultaneous Interpretation", ar: "الترجمة الفورية المتزامنة" },
    tagline: {
      en: "Real-time interpretation delivered as the speaker talks — no pauses, full conference flow.",
      ar: "ترجمة فورية آنية أثناء حديث المتحدث — دون توقف، مع الحفاظ على سير المؤتمر.",
    },
    definitionBlock: {
      en: "Simultaneous interpretation is real-time spoken translation delivered as the speaker talks, typically using a soundproof booth, microphone, and wireless receivers for the audience. JUSOR provides ISO 2603-compliant simultaneous interpretation for conferences, summits, and multilingual events, with certified interpreters and full booth/audio equipment rental available in the same booking.",
      ar: "الترجمة الفورية المتزامنة هي ترجمة صوتية آنية تُقدَّم أثناء حديث المتحدث مباشرة، وتستخدم عادة كابينة عازلة للصوت وميكروفوناً وأجهزة استقبال لاسلكية للحضور. تقدم جسور ترجمة فورية متزامنة مطابقة لمعيار ISO 2603 للمؤتمرات والقمم والفعاليات متعددة اللغات، مع مترجمين معتمدين وإمكانية تأجير كابينة وأجهزة الصوت الكاملة ضمن نفس الحجز.",
    },
    whenToUse: [
      { en: "Large conferences, summits, or multi-day events with a packed agenda", ar: "المؤتمرات الكبرى والقمم والفعاليات متعددة الأيام ذات الأجندة المزدحمة" },
      { en: "Multilingual audiences who need to listen in their own language without delay", ar: "الحضور متعدد اللغات الذين يحتاجون للاستماع بلغتهم دون تأخير" },
      { en: "Live broadcast or streamed events where pacing cannot pause", ar: "الفعاليات المذاعة أو المبثوثة مباشرة حيث لا يمكن إيقاف الإيقاع" },
    ],
    alternativeSlug: "consecutive",
    alternativeReason: {
      en: "For smaller meetings, negotiations, or site visits where pauses are acceptable, consecutive interpretation is more cost-effective.",
      ar: "للاجتماعات الصغيرة أو المفاوضات أو الزيارات الميدانية حيث يمكن قبول التوقفات، تُعد الترجمة التتابعية أكثر جدوى من حيث التكلفة.",
    },
    isEquipment: false,
  },
  {
    slug: "consecutive",
    iconKey: "MessageSquare",
    name: { en: "Consecutive Interpretation", ar: "الترجمة التتابعية" },
    tagline: {
      en: "The interpreter speaks after the speaker pauses — ideal for meetings, negotiations, and site visits.",
      ar: "يتحدث المترجم بعد توقف المتحدث — مثالية للاجتماعات والمفاوضات والزيارات الميدانية.",
    },
    definitionBlock: {
      en: "Consecutive interpretation is spoken translation delivered after the speaker pauses, typically in segments of one to five minutes, without requiring booth or wireless equipment. JUSOR provides consecutive interpretation for business meetings, legal proceedings, medical consultations, and factory or site visits across 60+ language pairs.",
      ar: "الترجمة التتابعية هي ترجمة صوتية تُقدَّم بعد توقف المتحدث، عادة في مقاطع من دقيقة إلى خمس دقائق، دون الحاجة لكابينة أو أجهزة لاسلكية. تقدم جسور الترجمة التتابعية لاجتماعات الأعمال والإجراءات القانونية والاستشارات الطبية وزيارات المصانع والمواقع عبر أكثر من 60 زوجاً لغوياً.",
    },
    whenToUse: [
      { en: "Business meetings, negotiations, and one-on-one discussions", ar: "اجتماعات الأعمال والمفاوضات والمناقشات الفردية" },
      { en: "Legal depositions, medical consultations, and factory/site visits", ar: "الإفادات القانونية والاستشارات الطبية وزيارات المصانع والمواقع" },
      { en: "Smaller events where no booth or wireless equipment is available", ar: "الفعاليات الصغيرة التي لا تتوفر فيها كابينة أو أجهزة لاسلكية" },
    ],
    alternativeSlug: "simultaneous",
    alternativeReason: {
      en: "For large conferences or events where pausing after every sentence would double the runtime, simultaneous interpretation keeps the agenda on schedule.",
      ar: "للمؤتمرات الكبرى أو الفعاليات التي يؤدي فيها التوقف بعد كل جملة لمضاعفة الوقت المستغرق، تحافظ الترجمة الفورية المتزامنة على الالتزام بالجدول الزمني.",
    },
    isEquipment: false,
  },
  {
    slug: "remote-rsi",
    iconKey: "Video",
    name: { en: "Remote Interpretation (RSI)", ar: "الترجمة الفورية عن بُعد (RSI)" },
    tagline: {
      en: "Simultaneous interpretation delivered over Zoom, Teams, or a dedicated RSI platform — no on-site booth required.",
      ar: "ترجمة فورية متزامنة عبر Zoom أو Teams أو منصة RSI مخصصة — دون الحاجة لكابينة في الموقع.",
    },
    definitionBlock: {
      en: "Remote Simultaneous Interpretation (RSI) delivers real-time interpretation over video-conferencing platforms such as Zoom and Microsoft Teams, or a dedicated RSI platform, with interpreters working from a certified remote hub or on-site mobile booth. JUSOR supports hybrid and fully virtual multilingual events without requiring physical booth installation.",
      ar: "الترجمة الفورية المتزامنة عن بُعد (RSI) تقدم ترجمة فورية آنية عبر منصات الاجتماعات المرئية مثل Zoom وMicrosoft Teams أو منصة RSI مخصصة، مع عمل المترجمين من مركز بُعد معتمد أو كابينة متنقلة في الموقع. تدعم جسور الفعاليات الهجينة والافتراضية بالكامل متعددة اللغات دون الحاجة لتركيب كابينة فعلية.",
    },
    whenToUse: [
      { en: "Fully virtual or hybrid conferences and webinars", ar: "المؤتمرات والندوات الافتراضية بالكامل أو الهجينة" },
      { en: "Multi-region events where flying in interpreters isn't practical", ar: "الفعاليات متعددة المناطق حيث لا يُعد استقدام المترجمين عملياً" },
      { en: "Board meetings and earnings calls needing discreet, on-demand language support", ar: "اجتماعات مجلس الإدارة ومكالمات الأرباح التي تحتاج دعماً لغوياً فورياً وسرياً" },
    ],
    alternativeSlug: "simultaneous",
    alternativeReason: {
      en: "For fully in-person events where all attendees are in one room, on-site simultaneous interpretation with a physical booth delivers the most reliable audio experience.",
      ar: "للفعاليات الحضورية بالكامل حيث يتواجد جميع الحضور في قاعة واحدة، توفر الترجمة الفورية المتزامنة في الموقع بكابينة فعلية أفضل تجربة صوتية موثوقة.",
    },
    isEquipment: false,
  },
  {
    slug: "booth-rental",
    iconKey: "Speaker",
    name: { en: "Interpretation Booth Rental", ar: "تأجير كابينات الترجمة الفورية" },
    tagline: {
      en: "ISO 2603-compliant soundproof booths, wireless receivers, and full technical setup for on-site simultaneous interpretation.",
      ar: "كابينات عازلة للصوت مطابقة لمعيار ISO 2603، وأجهزة استقبال لاسلكية، وتركيب فني كامل للترجمة الفورية في الموقع.",
    },
    definitionBlock: {
      en: "Interpretation booth rental provides ISO 2603-compliant soundproof booths, interpreter consoles, wireless transmitters, and audience receivers for on-site simultaneous interpretation, delivered with technician setup and testing before the event. JUSOR rents single and double-occupant booths sized for conferences of any scale in Dubai.",
      ar: "يوفر تأجير كابينات الترجمة الفورية كابينات عازلة للصوت مطابقة لمعيار ISO 2603، ووحدات تحكم للمترجمين، وأجهزة إرسال لاسلكية، وأجهزة استقبال للحضور، مع تركيب فني واختبار قبل الفعالية. تؤجر جسور كابينات لمترجم واحد أو مترجمَين بمقاسات تناسب المؤتمرات من أي حجم في دبي.",
    },
    whenToUse: [
      { en: "On-site conferences requiring physical simultaneous interpretation booths", ar: "المؤتمرات الحضورية التي تتطلب كابينات ترجمة فورية فعلية" },
      { en: "Events needing ISO 2603/4043-compliant soundproofing for interpreter comfort", ar: "الفعاليات التي تحتاج عزلاً صوتياً مطابقاً لمعيار ISO 2603/4043 لراحة المترجم" },
      { en: "Multi-language events requiring several parallel booths and channels", ar: "الفعاليات متعددة اللغات التي تتطلب عدة كابينات وقنوات متوازية" },
    ],
    isEquipment: true,
  },
];

export function getInterpretationModeBySlug(slug: string) {
  return interpretationModes.find((m) => m.slug === slug);
}

export type BoothSpec = {
  key: string;
  label: LocalizedText;
  value: LocalizedText;
};

export const boothSpecifications: BoothSpec[] = [
  { key: "standard", label: { en: "Standard (ISO 4043)", ar: "قياسية (ISO 4043)" }, value: { en: "Single/double occupant, tabletop or full-size", ar: "لمترجم أو مترجمين، طاولة أو حجم كامل" } },
  { key: "soundproofing", label: { en: "Soundproofing", ar: "العزل الصوتي" }, value: { en: "≥ 30 dB attenuation, ISO 2603-compliant", ar: "تخفيف ≥ 30 ديسيبل، مطابق لمعيار ISO 2603" } },
  { key: "console", label: { en: "Interpreter Console", ar: "وحدة تحكم المترجم" }, value: { en: "Dual-channel, relay-capable, mute/cough button", ar: "قناتان، قابلة للترحيل، زر كتم/سعال" } },
  { key: "receivers", label: { en: "Audience Receivers", ar: "أجهزة استقبال الحضور" }, value: { en: "Up to 500 units with multi-channel selector", ar: "حتى 500 وحدة مع محدد قنوات متعدد" } },
  { key: "setup", label: { en: "Setup & Testing", ar: "التركيب والاختبار" }, value: { en: "On-site technician, sound check before event start", ar: "فني في الموقع، فحص صوتي قبل بدء الفعالية" } },
];
