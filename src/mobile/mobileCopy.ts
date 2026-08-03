import type { LocalizedString, ServiceKey } from "../types";

export const mobileHomeCopy = {
  en: {
    heroRole: "Independent Graphic Designer",
    heroTitle: "NOOR BAMAROUF",
    heroBody: "Visual identities, packaging, print, editorial, and social experiences shaped with intention and thoughtful detail.",
    metrics: ["Projects", "Disciplines", "Categories"],
    selectedLabel: "Selected Work",
    selectedTitle: "A curated sequence of finished visual worlds.",
    selectedBody: "A focused edit across identity, packaging, social media, campaigns, print, and logo work.",
    featuredLabel: "Featured Project",
    pointLabel: "Point of View",
    pointTitle: "Quiet design becomes memorable when every choice has a reason.",
    pointBody: "Proportion, material, color, and hierarchy are refined until the idea feels clear and complete.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "Design disciplines connected by one considered process.",
    capabilitiesContinuationTitle: "Coherent systems across every format.",
    processLabel: "Process",
    processTitle: "From understanding to exploration.",
    processContinuationTitle: "From refinement to final delivery.",
    processClosing: "A clear process protects the idea while every detail is resolved.",
    archiveLabel: "Project Archive",
    archiveTitle: "All projects, kept easy to scan.",
    archiveBody: "The archive follows the approved portfolio order and project categories.",
    archiveContinuationTitle: "The archive continues.",
    archiveContinuationBody: "Five more project worlds, each with its own visual language.",
    contactLabel: "Begin a Project",
    contactTitle: "Let’s work together.",
    contactBody: "Share a short overview of your project, its scope, timeline, and the direction you would like the work to express.",
  },
  ar: {
    heroRole: "مصممة جرافيك مستقلة",
    heroTitle: "نور بامعروف",
    heroBody: "هويات بصرية وتغليف ومطبوعات وتجارب تحريرية واجتماعية تُصاغ بعناية وغاية واضحة.",
    metrics: ["المشاريع", "التخصصات", "الفئات"],
    selectedLabel: "أعمال مختارة",
    selectedTitle: "تتابع من عوالم بصرية مكتملة.",
    selectedBody: "اختيار مركز من أعمال الهوية والتغليف والتواصل الاجتماعي والحملات والمطبوعات والشعارات.",
    featuredLabel: "مشروع مختار",
    pointLabel: "وجهة نظر",
    pointTitle: "يترسخ التصميم الهادئ عندما يكون لكل اختيار سبب.",
    pointBody: "تُصقل النسبة والخامة واللون والهرمية حتى تصبح الفكرة واضحة ومكتملة.",
    capabilitiesLabel: "القدرات",
    capabilitiesTitle: "تخصصات تصميمية يجمعها مسار مدروس.",
    capabilitiesContinuationTitle: "أنظمة متماسكة عبر كل صيغة.",
    processLabel: "المنهجية",
    processTitle: "من الفهم إلى الاستكشاف.",
    processContinuationTitle: "من الصقل إلى التسليم.",
    processClosing: "مسار واضح يحمي الفكرة حتى تستقر كل التفاصيل في مكانها.",
    archiveLabel: "أرشيف المشاريع",
    archiveTitle: "كل المشاريع في فهرس سهل القراءة.",
    archiveBody: "يحافظ الأرشيف على ترتيب المشاريع وفئاتها المعتمدة.",
    archiveContinuationTitle: "بقية الأرشيف.",
    archiveContinuationBody: "خمسة عوالم إضافية، لكل مشروع لغته البصرية الخاصة.",
    contactLabel: "ابدأ مشروعًا",
    contactTitle: "لنعمل معًا.",
    contactBody: "شاركنا نبذة قصيرة عن المشروع، نطاق العمل، التوقيت، والاتجاه الذي ترغب أن يعكسه التصميم.",
  },
} as const;

export const mobileContactCopy = {
  en: {
    label: "Begin a Project",
    title: "Let’s work together.",
    body: "Share a short overview of your project, its scope, timeline, and the direction you would like the work to express.",
    whatsapp: "Contact via WhatsApp",
    email: "Send an email",
    methodsLabel: "Contact Methods",
    methodsTitle: "Choose the clearest way to begin.",
    methodsBody: "WhatsApp is useful for the first conversation. Email works well for references, files, and longer project details.",
  },
  ar: {
    label: "ابدأ مشروعًا",
    title: "لنعمل معًا.",
    body: "شاركنا نبذة قصيرة عن المشروع، نطاق العمل، التوقيت، والاتجاه الذي ترغب أن يعكسه التصميم.",
    whatsapp: "تواصل عبر واتساب",
    email: "إرسال بريد إلكتروني",
    methodsLabel: "طرق التواصل",
    methodsTitle: "اختر الطريقة الأنسب للبدء.",
    methodsBody: "واتساب مناسب للمحادثة الأولى، والبريد الإلكتروني أفضل لإرسال المراجع والملفات وتفاصيل المشروع الأطول.",
  },
} as const;

export const mobileAboutCopy = {
  en: {
    entryLabel: "About Noor",
    entryTitle: "A practice of quiet attention.",
    entryBody: "Noor Bamarouf designs identity, packaging, print, editorial, and social visuals with a calm eye for proportion, material, and meaning.",
    entryLink: "Enter the archive",
    thesis: "The work is not a style applied at the end.",
    thesisNote: "It is built through listening, visual research, restraint, and the final edit that makes every mark feel necessary.",
    observations: [
      "Listen for the feeling behind the brief.",
      "Let type, color, and space carry the idea.",
      "Remove anything that does not sharpen the work.",
    ],
    rhythmTitle: "A working rhythm with room for instinct.",
    rhythmWords: ["look", "shape", "edit"],
    rhythm: [
      ["Read", "Understand the brand, audience, references, and desired feeling."],
      ["Compose", "Build visual routes through typography, proportion, texture, and use."],
      ["Refine", "Reduce the system until the strongest idea remains clear."],
      ["Prepare", "Organize final assets so the work can live beyond the screen."],
    ],
    closing: "See the work as a set of visual worlds, each shaped with its own atmosphere.",
    closingLink: "Explore selected work",
  },
  ar: {
    entryLabel: "عن نور",
    entryTitle: "ممارسة هادئة لرؤية التفاصيل.",
    entryBody: "تصمم نور بامعروف الهويات البصرية والتغليف والمطبوعات والتجارب التحريرية والاجتماعية بعين تهتم بالتناسب والخامة والمعنى.",
    entryLink: "استعرضي الأرشيف",
    thesis: "العمل ليس أسلوبًا يضاف في النهاية.",
    thesisNote: "يتشكل من الاستماع والبحث البصري والاتزان، ثم من تحرير أخير يجعل كل علامة في مكانها.",
    observations: [
      "فهم الإحساس الكامن خلف الملخص.",
      "ترك الخط واللون والمسافة تحمل الفكرة.",
      "حذف ما لا يزيد العمل وضوحًا.",
    ],
    rhythmTitle: "إيقاع عمل يترك مساحة للحدس.",
    rhythmWords: ["النظر", "الصياغة", "الصقل"],
    rhythm: [
      ["القراءة", "فهم العلامة والجمهور والمراجع والإحساس المطلوب."],
      ["التكوين", "بناء مسارات بصرية عبر الخط والتناسب والملمس والاستخدام."],
      ["التهذيب", "اختصار النظام حتى تبقى الفكرة الأقوى واضحة."],
      ["التجهيز", "تنظيم الملفات النهائية ليعيش العمل خارج الشاشة."],
    ],
    closing: "شاهدي الأعمال كعوالم بصرية مختلفة، لكل مشروع مناخه الخاص.",
    closingLink: "استعراض الأعمال المختارة",
  },
} as const;

export const mobileWorkHeroCopy = {
  en: {
    label: "Selected Work",
    title: "A curated archive of visual worlds.",
    body: "Identity, packaging, print, editorial, and social work, each project shaped through its own visual language.",
    projectLabel: "Projects",
    categoryLabel: "Categories",
  },
  ar: {
    label: "أعمال مختارة",
    title: "أرشيف بصري لعوالم مختلفة.",
    body: "مشاريع في الهوية والتغليف والمطبوعات والتصميم التحريري والتواصل الاجتماعي، لكل مشروع لغته البصرية الخاصة.",
    projectLabel: "مشروعًا",
    categoryLabel: "فئات",
  },
} as const;

export const mobileProjectCopy = {
  en: { overview: "Overview", direction: "Creative direction", system: "Design system", previous: "Previous project", next: "Next project" },
  ar: { overview: "نظرة عامة", direction: "التوجيه الإبداعي", system: "نظام التصميم", previous: "المشروع السابق", next: "المشروع التالي" },
} as const;

export const mobileProcessCopy = {
  en: [
    { title: "Discover", text: "We begin by understanding the brand, its audience, and the feeling the work should leave." },
    { title: "Define", text: "We clarify the scope, priorities, and visual direction before design begins." },
    { title: "Explore", text: "We develop focused visual routes through type, color, image, and material." },
    { title: "Refine", text: "We test and resolve each detail until the system feels clear and complete." },
    { title: "Deliver", text: "We prepare the final assets with consistency across every approved format." },
  ],
  ar: [
    { title: "الاكتشاف", text: "فهم العلامة، الجمهور، مستوى الذائقة، القيود، والإحساس المطلوب." },
    { title: "التحديد", text: "صياغة الاستراتيجية، المراجع، نطاق العمل، والاتجاه البصري قبل الإنتاج." },
    { title: "الاستكشاف", text: "بناء مسارات بصرية متباينة لاكتشاف الاتجاه الأنسب للعلامة." },
    { title: "الصقل", text: "تحرير واختبار وضبط المسار الأقوى حتى يبدو كل عنصر مقصودًا." },
    { title: "التسليم", text: "تجهيز الملفات النهائية، الإرشادات، والأصول المنظمة للاستخدام والتوسع." },
  ],
} as const;

export const approvedMobileServices: ServiceKey[] = [
  "brandIdentity",
  "packagingDesign",
  "printDesign",
  "socialMediaDesign",
  "editorialDesign",
  "creativeDirection",
];

export function text(en: string, ar: string): LocalizedString {
  return { en, ar };
}
