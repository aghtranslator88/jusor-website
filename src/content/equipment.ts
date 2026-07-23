// Static content for the Equipment Rental catalog, mirroring the
// EquipmentItem model (docs/spec/01-database-schema.prisma) until a live
// database is connected — see docs/spec/06-hub-interpretation-equipment.md
// for the page pattern this follows.

import type { LocalizedText } from "./blog";

export type EquipmentCategory =
  | "BOOTH"
  | "AUDIO_SYSTEM"
  | "RECEIVER"
  | "HEADSET"
  | "MICROPHONE"
  | "TRANSMITTER";

export type EquipmentSpec = { label: LocalizedText; value: LocalizedText };

export type EquipmentItem = {
  slug: string;
  category: EquipmentCategory;
  name: LocalizedText;
  description: LocalizedText;
  specifications: EquipmentSpec[];
  dailyRate: number;
  stockQuantity: number;
};

export const equipmentCategoryLabels: Record<EquipmentCategory, LocalizedText> = {
  BOOTH: { en: "Interpretation Booths", ar: "كابينات الترجمة" },
  AUDIO_SYSTEM: { en: "Audio Systems", ar: "أنظمة الصوت" },
  RECEIVER: { en: "Receivers", ar: "أجهزة الاستقبال" },
  HEADSET: { en: "Headsets", ar: "سماعات الرأس" },
  MICROPHONE: { en: "Microphones", ar: "الميكروفونات" },
  TRANSMITTER: { en: "Transmitters", ar: "أجهزة الإرسال" },
};

export const equipmentItems: EquipmentItem[] = [
  {
    slug: "tabletop-interpretation-booth",
    category: "BOOTH",
    name: { en: "Tabletop Interpretation Booth", ar: "كابينة ترجمة سطح الطاولة" },
    description: {
      en: "Compact ISO 4043-compliant tabletop booth for single or double interpreters, ideal for smaller conference rooms.",
      ar: "كابينة مدمجة سطح الطاولة مطابقة لمعيار ISO 4043، لمترجم واحد أو مترجمين، مثالية لقاعات المؤتمرات الصغيرة.",
    },
    specifications: [
      { label: { en: "Occupancy", ar: "السعة" }, value: { en: "1–2 interpreters", ar: "مترجم إلى مترجمين" } },
      { label: { en: "Soundproofing", ar: "العزل الصوتي" }, value: { en: "≥ 25 dB attenuation", ar: "تخفيف ≥ 25 ديسيبل" } },
      { label: { en: "Dimensions", ar: "الأبعاد" }, value: { en: "1.6m × 0.8m × 0.9m", ar: "1.6م × 0.8م × 0.9م" } },
      { label: { en: "Ventilation", ar: "التهوية" }, value: { en: "Built-in silent fan", ar: "مروحة صامتة مدمجة" } },
    ],
    dailyRate: 180,
    stockQuantity: 6,
  },
  {
    slug: "full-size-interpretation-booth",
    category: "BOOTH",
    name: { en: "Full-Size Interpretation Booth", ar: "كابينة ترجمة كاملة الحجم" },
    description: {
      en: "Free-standing ISO 2603-compliant full-size booth for major conferences requiring maximum interpreter comfort and soundproofing.",
      ar: "كابينة قائمة بذاتها كاملة الحجم مطابقة لمعيار ISO 2603، للمؤتمرات الكبرى التي تتطلب أقصى راحة وعزل صوتي للمترجم.",
    },
    specifications: [
      { label: { en: "Occupancy", ar: "السعة" }, value: { en: "2 interpreters", ar: "مترجمان" } },
      { label: { en: "Soundproofing", ar: "العزل الصوتي" }, value: { en: "≥ 30 dB attenuation, ISO 2603", ar: "تخفيف ≥ 30 ديسيبل، ISO 2603" } },
      { label: { en: "Dimensions", ar: "الأبعاد" }, value: { en: "2.4m × 1.6m × 2.0m", ar: "2.4م × 1.6م × 2.0م" } },
      { label: { en: "Visibility", ar: "الرؤية" }, value: { en: "Full-height glass front panel", ar: "لوحة زجاجية أمامية كاملة الارتفاع" } },
    ],
    dailyRate: 320,
    stockQuantity: 4,
  },
  {
    slug: "wireless-tour-guide-receiver",
    category: "RECEIVER",
    name: { en: "Wireless Tour-Guide Receiver", ar: "جهاز استقبال لاسلكي للجولات" },
    description: {
      en: "Compact multi-channel receiver with earpiece, used by conference attendees or tour groups to listen to interpreted audio.",
      ar: "جهاز استقبال مدمج متعدد القنوات مع سماعة أذن، يستخدمه الحضور أو مجموعات الجولات للاستماع للصوت المترجم.",
    },
    specifications: [
      { label: { en: "Channels", ar: "القنوات" }, value: { en: "Up to 16 selectable channels", ar: "حتى 16 قناة قابلة للاختيار" } },
      { label: { en: "Battery Life", ar: "عمر البطارية" }, value: { en: "20 hours continuous use", ar: "20 ساعة استخدام متواصل" } },
      { label: { en: "Range", ar: "المدى" }, value: { en: "Up to 100m line-of-sight", ar: "حتى 100م بخط رؤية مباشر" } },
    ],
    dailyRate: 8,
    stockQuantity: 500,
  },
  {
    slug: "multichannel-audio-transmitter",
    category: "TRANSMITTER",
    name: { en: "Multi-Channel Audio Transmitter", ar: "جهاز إرسال صوتي متعدد القنوات" },
    description: {
      en: "Rack-mounted IR or RF transmitter distributing multiple interpreted language channels to audience receivers.",
      ar: "جهاز إرسال بالأشعة تحت الحمراء أو الترددات اللاسلكية يوزع عدة قنوات لغوية مترجمة على أجهزة استقبال الحضور.",
    },
    specifications: [
      { label: { en: "Channels", ar: "القنوات" }, value: { en: "Up to 32 simultaneous channels", ar: "حتى 32 قناة متزامنة" } },
      { label: { en: "Technology", ar: "التقنية" }, value: { en: "Infrared (IR) or 2.4GHz RF", ar: "أشعة تحت حمراء أو ترددات لاسلكية 2.4 جيجاهرتز" } },
      { label: { en: "Coverage", ar: "التغطية" }, value: { en: "Up to 500m² per unit", ar: "حتى 500 م² لكل وحدة" } },
    ],
    dailyRate: 65,
    stockQuantity: 20,
  },
  {
    slug: "conference-gooseneck-microphone",
    category: "MICROPHONE",
    name: { en: "Conference Gooseneck Microphone", ar: "ميكروفون مؤتمرات مرن" },
    description: {
      en: "Table-mounted gooseneck microphone with mute button and status LED, used by speakers and panelists.",
      ar: "ميكروفون مرن مثبت على الطاولة مع زر كتم ومؤشر LED، يستخدمه المتحدثون وأعضاء اللجان.",
    },
    specifications: [
      { label: { en: "Pickup Pattern", ar: "نمط الالتقاط" }, value: { en: "Cardioid, unidirectional", ar: "قلبي أحادي الاتجاه" } },
      { label: { en: "Connection", ar: "التوصيل" }, value: { en: "Wired, XLR or proprietary bus", ar: "سلكي، XLR أو ناقل خاص" } },
      { label: { en: "Features", ar: "الميزات" }, value: { en: "Mute button, LED ring", ar: "زر كتم، حلقة إضاءة LED" } },
    ],
    dailyRate: 15,
    stockQuantity: 80,
  },
  {
    slug: "professional-interpreter-headset",
    category: "HEADSET",
    name: { en: "Professional Interpreter Headset", ar: "سماعة رأس احترافية للمترجم" },
    description: {
      en: "Dual-muff headset with boom microphone designed for extended simultaneous interpretation sessions inside the booth.",
      ar: "سماعة رأس مزدوجة مع ميكروفون قابل للتعديل مصممة لجلسات الترجمة الفورية المتزامنة الطويلة داخل الكابينة.",
    },
    specifications: [
      { label: { en: "Type", ar: "النوع" }, value: { en: "Closed-back, dual muff", ar: "مغلقة الخلفية، مزدوجة الأذن" } },
      { label: { en: "Microphone", ar: "الميكروفون" }, value: { en: "Adjustable boom, noise-cancelling", ar: "ذراع قابل للتعديل، عازل للضوضاء" } },
      { label: { en: "Comfort", ar: "الراحة" }, value: { en: "Padded ear cups, rated for 8h+ sessions", ar: "وسائد أذن مبطنة، مناسبة لجلسات تفوق 8 ساعات" } },
    ],
    dailyRate: 12,
    stockQuantity: 60,
  },
  {
    slug: "portable-pa-audio-system",
    category: "AUDIO_SYSTEM",
    name: { en: "Portable PA Audio System", ar: "نظام صوت متنقل" },
    description: {
      en: "Battery-powered portable PA system with mixer, suitable for panel discussions, site visits, and smaller venues without house sound.",
      ar: "نظام صوت متنقل يعمل بالبطارية مع خلاط صوت، مناسب لجلسات النقاش والزيارات الميدانية والقاعات الصغيرة التي لا تملك نظام صوت ثابت.",
    },
    specifications: [
      { label: { en: "Power", ar: "الطاقة" }, value: { en: "Battery + AC, 8h runtime", ar: "بطارية + تيار متردد، 8 ساعات تشغيل" } },
      { label: { en: "Inputs", ar: "المداخل" }, value: { en: "4-channel mixer, wireless mic support", ar: "خلاط 4 قنوات، دعم ميكروفون لاسلكي" } },
      { label: { en: "Coverage", ar: "التغطية" }, value: { en: "Suitable for up to 150 attendees", ar: "مناسب لحتى 150 حاضراً" } },
    ],
    dailyRate: 90,
    stockQuantity: 10,
  },
];

export function getEquipmentBySlug(slug: string) {
  return equipmentItems.find((e) => e.slug === slug);
}
