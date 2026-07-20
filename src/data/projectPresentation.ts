import type { LocalizedString, Project, ProjectImage } from "../types";

export type PresentationAsset = "cover" | "hero" | `gallery-${number}` | (string & {});
export type PresentationKind =
  | "billboard"
  | "brand-application"
  | "detail-crop"
  | "document-page"
  | "document-spread"
  | "full-artwork"
  | "landscape-presentation"
  | "logo-presentation"
  | "packaging-mockup"
  | "portrait-presentation"
  | "social-post"
  | "story-frame"
  | "square-post"
  | "ultrawide-presentation";
export type PresentationLayout =
  | "billboard"
  | "document"
  | "editorial"
  | "logo"
  | "packaging"
  | "portrait-grid"
  | "social-grid"
  | "stack"
  | "strip";
export type PresentationTone = "brand" | "dark" | "ivory" | "paper";

export interface PresentationVisual {
  asset: PresentationAsset;
  source?: PresentationAsset;
  kind: PresentationKind;
  format?: ProjectImage["format"];
  fit?: "contain" | "cover";
  emphasis?: "feature" | "full" | "regular" | "wide";
  caption?: LocalizedString;
}

export interface PresentationSection {
  id: string;
  label: LocalizedString;
  title: LocalizedString;
  copyKey?: "context" | "direction" | "outcome";
  copy?: LocalizedString;
  layout: PresentationLayout;
  tone?: PresentationTone;
  visuals: PresentationVisual[];
}

export interface ProjectPresentation {
  family:
    | "campaign"
    | "logo"
    | "mixed-social"
    | "packaging"
    | "social"
    | "transport";
  hero: PresentationVisual;
  sections: PresentationSection[];
}

const text = (en: string, ar: string): LocalizedString => ({ en, ar });

export function getProjectImageByAsset(project: Project, asset: PresentationAsset): ProjectImage {
  if (asset === "cover") return project.coverImage;
  if (asset === "hero") return project.heroImage;
  if (!asset.startsWith("gallery-")) return project.gallery[0] ?? project.coverImage;

  const galleryIndex = Number(asset.replace("gallery-", "")) - 1;
  const image = project.gallery[galleryIndex];

  if (!image) {
    throw new Error(`Missing ${asset} for project ${project.slug}`);
  }

  return image;
}

export const projectPresentations: Record<string, ProjectPresentation> = {
  wello: {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", emphasis: "full" },
    sections: [
      {
        id: "packaging-fronts",
        label: text("Packaging", "التغليف"),
        title: text("Flavor family and pouch fronts", "عائلة النكهات وواجهات العبوات"),
        copyKey: "context",
        layout: "packaging",
        visuals: [
          { asset: "cover", kind: "packaging-mockup", emphasis: "wide" },
          { asset: "gallery-3", kind: "packaging-mockup" },
          { asset: "gallery-6", kind: "packaging-mockup", emphasis: "wide" },
        ],
      },
      {
        id: "breakfast-scenes",
        label: text("Applications", "التطبيقات"),
        title: text("Product scenes and breakfast cues", "مشاهد المنتج وإشارات الإفطار"),
        copyKey: "direction",
        layout: "editorial",
        tone: "paper",
        visuals: [
          { asset: "gallery-1", kind: "square-post", emphasis: "feature" },
          { asset: "gallery-2", kind: "landscape-presentation" },
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "presentation-boards",
        label: text("Final Gallery", "المعرض النهائي"),
        title: text("Complete packaging story", "قصة تغليف مكتملة"),
        copyKey: "outcome",
        layout: "social-grid",
        visuals: [
          { asset: "gallery-5", kind: "landscape-presentation" },
          { asset: "gallery-7", kind: "landscape-presentation" },
          { asset: "gallery-8", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
  matcha: {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", emphasis: "full" },
    sections: [
      {
        id: "drink-photography",
        label: text("Beverage Moments", "لحظات المشروب"),
        title: text("Soft drink photography and cup applications", "تصوير ناعم وتطبيقات على الأكواب"),
        copyKey: "context",
        layout: "portrait-grid",
        visuals: [
          { asset: "cover", kind: "portrait-presentation" },
          { asset: "gallery-2", kind: "square-post", emphasis: "feature" },
          { asset: "gallery-4", kind: "portrait-presentation" },
        ],
      },
      {
        id: "social-system",
        label: text("Social System", "النظام الاجتماعي"),
        title: text("Profile, posts, and campaign language", "الحساب والمنشورات ولغة الحملة"),
        copyKey: "direction",
        layout: "editorial",
        tone: "paper",
        visuals: [
          { asset: "gallery-3", kind: "document-page", emphasis: "feature" },
          { asset: "gallery-1", kind: "document-page" },
          { asset: "gallery-5", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "packaging-applications",
        label: text("Applications", "التطبيقات"),
        title: text("Packaging and drinkware family", "عائلة التغليف والأكواب"),
        copyKey: "outcome",
        layout: "packaging",
        visuals: [
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation" },
          { asset: "gallery-8", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
  "jeddah-railway": {
    family: "transport",
    hero: { asset: "hero", kind: "billboard", emphasis: "full" },
    sections: [
      {
        id: "strategy-and-app",
        label: text("Strategy", "الاستراتيجية"),
        title: text("Booking screens and campaign structure", "شاشات الحجز وبنية الحملة"),
        copyKey: "context",
        layout: "document",
        visuals: [
          { asset: "gallery-1", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "touchpoints",
        label: text("Touchpoints", "نقاط التطبيق"),
        title: text("OOH, booth, and promotional materials", "إعلانات خارجية وجناح ومواد ترويجية"),
        copyKey: "direction",
        layout: "social-grid",
        tone: "dark",
        visuals: [
          { asset: "cover", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-3", kind: "ultrawide-presentation", emphasis: "full" },
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "closing",
        label: text("Closing", "الختام"),
        title: text("Final travel identity frame", "مشهد ختامي لهوية السفر"),
        copyKey: "outcome",
        layout: "stack",
        visuals: [{ asset: "gallery-5", kind: "landscape-presentation", emphasis: "full" }],
      },
    ],
  },
  "egg-space": {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", emphasis: "full" },
    sections: [
      {
        id: "concept-process",
        label: text("Concept", "الفكرة"),
        title: text("The idea and process behind the cylinder", "الفكرة والعملية خلف العبوة الأسطوانية"),
        copyKey: "context",
        layout: "portrait-grid",
        visuals: [
          { asset: "gallery-1", kind: "square-post", emphasis: "feature" },
          { asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "print-construction",
        label: text("Print Design", "التصميم الطباعي"),
        title: text("2D wrap, lid, base, and printed result", "الغلاف والغطاء والقاعدة والنتيجة المطبوعة"),
        copyKey: "direction",
        layout: "packaging",
        tone: "paper",
        visuals: [
          { asset: "gallery-3", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation" },
        ],
      },
      {
        id: "final-package",
        label: text("Final Package", "التغليف النهائي"),
        title: text("Mockup, prototype, and closing graphic", "نموذج وعينة وتفصيل ختامي"),
        copyKey: "outcome",
        layout: "social-grid",
        visuals: [
          { asset: "cover", kind: "square-post" },
          { asset: "gallery-5", kind: "square-post" },
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-8", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
  "red-bull-marvel": {
    family: "packaging",
    hero: { asset: "hero", kind: "square-post", emphasis: "full" },
    sections: [
      {
        id: "can-lineup",
        label: text("Packaging", "التغليف"),
        title: text("Collectible can lineup", "مجموعة علب قابلة للاقتناء"),
        copyKey: "context",
        layout: "social-grid",
        tone: "brand",
        visuals: [
          { asset: "cover", kind: "square-post", emphasis: "feature" },
          { asset: "gallery-3", kind: "square-post" },
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "comic-panels",
        label: text("Comic Language", "لغة القصص المصورة"),
        title: text("Hero panels and versus graphics", "لوحات الأبطال ورسومات المواجهة"),
        copyKey: "direction",
        layout: "packaging",
        visuals: [
          { asset: "gallery-1", kind: "square-post" },
          { asset: "gallery-2", kind: "square-post" },
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "campaign-boards",
        label: text("Presentation Boards", "لوحات العرض"),
        title: text("Promotional packaging visuals", "مرئيات ترويجية للتغليف"),
        copyKey: "outcome",
        layout: "social-grid",
        visuals: [
          { asset: "gallery-5", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-8", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
  impostor: {
    family: "campaign",
    hero: { asset: "hero", kind: "landscape-presentation", emphasis: "full" },
    sections: [
      {
        id: "campaign-elements",
        label: text("Campaign Elements", "عناصر الحملة"),
        title: text("Logo, icon, and warning system", "الشعار والأيقونة ونظام التحذير"),
        copyKey: "context",
        layout: "portrait-grid",
        tone: "dark",
        visuals: [
          { asset: "gallery-1", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-2", kind: "landscape-presentation" },
          { asset: "gallery-3", kind: "landscape-presentation" },
        ],
      },
      {
        id: "social-app",
        label: text("Social / App", "المنشورات والتطبيق"),
        title: text("Bilingual warning posts", "منشورات تحذيرية ثنائية اللغة"),
        copyKey: "direction",
        layout: "billboard",
        visuals: [
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-5", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "applications",
        label: text("Applications", "التطبيقات"),
        title: text("Navigation and promotional items", "تطبيقات إرشادية ومواد ترويجية"),
        copyKey: "outcome",
        layout: "stack",
        visuals: [
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "cover", kind: "square-post" },
        ],
      },
    ],
  },
  "wemo-delights": {
    family: "packaging",
    hero: { asset: "hero", kind: "brand-application", emphasis: "full" },
    sections: [
      {
        id: "brand-story",
        label: text("Story", "القصة"),
        title: text("We + Moments as a visual idea", "We + Moments كفكرة بصرية"),
        copyKey: "context",
        layout: "document",
        visuals: [
          { asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-1", kind: "portrait-presentation" },
        ],
      },
      {
        id: "product-applications",
        label: text("Applications", "التطبيقات"),
        title: text("Cookie sleeves and delivery bag", "أغلفة الكوكيز وحقيبة التوصيل"),
        copyKey: "direction",
        layout: "portrait-grid",
        tone: "paper",
        visuals: [
          { asset: "gallery-4", kind: "portrait-presentation" },
          { asset: "gallery-5", kind: "portrait-presentation" },
          { asset: "gallery-3", kind: "square-post" },
        ],
      },
      {
        id: "final-details",
        label: text("Details", "التفاصيل"),
        title: text("Color, texture, and brand closeups", "اللون والملمس ولقطات الهوية"),
        copyKey: "outcome",
        layout: "social-grid",
        visuals: [
          { asset: "cover", kind: "square-post" },
          { asset: "gallery-6", kind: "portrait-presentation" },
        ],
      },
    ],
  },
  "rahaba-space": {
    family: "social",
    hero: { asset: "hero", kind: "social-post", emphasis: "full" },
    sections: [
      {
        id: "post-overview",
        label: text("Social Media Posts", "منشورات وسائل التواصل"),
        title: text("Six supplied post designs", "ستة تصاميم منشورات مقدمة"),
        copyKey: "context",
        layout: "social-grid",
        visuals: [
          { asset: "cover", kind: "social-post", emphasis: "full" },
        ],
      },
      {
        id: "individual-posts",
        label: text("Post Set", "مجموعة المنشورات"),
        title: text("Readable vertical post frames", "منشورات عمودية قابلة للقراءة"),
        copyKey: "direction",
        layout: "portrait-grid",
        tone: "paper",
        visuals: [
          { asset: "gallery-4", kind: "portrait-presentation" },
          { asset: "gallery-5", kind: "portrait-presentation" },
          { asset: "gallery-6", kind: "portrait-presentation" },
          { asset: "gallery-7", kind: "portrait-presentation" },
          { asset: "gallery-8", kind: "portrait-presentation" },
          { asset: "gallery-9", kind: "portrait-presentation" },
        ],
      },
      {
        id: "final-gallery",
        label: text("Final Gallery", "المعرض النهائي"),
        title: text("A calm Pilates social presence", "حضور اجتماعي هادئ لعالم البيلاتس"),
        copyKey: "outcome",
        layout: "stack",
        visuals: [{ asset: "gallery-3", kind: "square-post", emphasis: "full" }],
      },
    ],
  },
  "nirto-cold-brew": {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", emphasis: "full" },
    sections: [
      {
        id: "packaging-concept",
        label: text("Packaging Concept", "فكرة التغليف"),
        title: text("Can presentation and full wrap", "عرض العبوة والعمل الفني الكامل"),
        copyKey: "context",
        layout: "packaging",
        visuals: [
          { asset: "cover", kind: "packaging-mockup", emphasis: "wide" },
          { asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
      {
        id: "label-panels",
        label: text("Design Details", "تفاصيل التصميم"),
        title: text("Front, side, and nutrition panels", "الواجهة والجانب ولوحة المعلومات"),
        copyKey: "direction",
        layout: "portrait-grid",
        tone: "paper",
        visuals: [
          { asset: "gallery-1", kind: "portrait-presentation" },
          { asset: "gallery-4", kind: "portrait-presentation" },
          { asset: "gallery-5", kind: "portrait-presentation" },
          { asset: "gallery-6", kind: "portrait-presentation" },
        ],
      },
      {
        id: "closeups",
        label: text("Close-ups", "لقطات قريبة"),
        title: text("Coffee texture and label detail", "ملمس القهوة وتفاصيل الملصق"),
        copyKey: "outcome",
        layout: "stack",
        visuals: [{ asset: "gallery-3", kind: "square-post", emphasis: "feature" }],
      },
    ],
  },
  "zahy-store": {
    family: "logo",
    hero: { asset: "hero", kind: "logo-presentation", emphasis: "full" },
    sections: [
      {
        id: "logo",
        label: text("Logo", "الشعار"),
        title: text("Supplied logo presentation", "عرض الشعار المقدم"),
        copyKey: "context",
        layout: "logo",
        visuals: [
          { asset: "gallery-1", kind: "logo-presentation", emphasis: "feature" },
          { asset: "gallery-2", kind: "logo-presentation" },
          { asset: "gallery-3", kind: "logo-presentation" },
          { asset: "gallery-4", kind: "logo-presentation" },
        ],
      },
      {
        id: "color-final",
        label: text("Color", "اللون"),
        title: text("Minimal final logo plates", "لوحات شعار نهائية ومختصرة"),
        copyKey: "outcome",
        layout: "document",
        tone: "paper",
        visuals: [
          { asset: "gallery-5", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "cover", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
  "ansab-holding": {
    family: "logo",
    hero: { asset: "hero", kind: "logo-presentation", emphasis: "full" },
    sections: [
      {
        id: "lockups",
        label: text("Logo", "الشعار"),
        title: text("Bilingual logo lockup", "تكوين شعار ثنائي اللغة"),
        copyKey: "context",
        layout: "logo",
        visuals: [
          { asset: "gallery-1", kind: "logo-presentation", emphasis: "feature" },
          { asset: "gallery-2", kind: "logo-presentation" },
          { asset: "gallery-3", kind: "logo-presentation" },
          { asset: "gallery-4", kind: "logo-presentation" },
        ],
      },
      {
        id: "color-versions",
        label: text("Color", "اللون"),
        title: text("Supplied color versions", "النسخ اللونية المقدمة"),
        copyKey: "direction",
        layout: "document",
        tone: "paper",
        visuals: [{ asset: "gallery-5", kind: "landscape-presentation", emphasis: "wide" }],
      },
      {
        id: "final-gallery",
        label: text("Final Gallery", "المعرض النهائي"),
        title: text("Logo presentation on natural imagery", "عرض الشعار فوق مشهد طبيعي"),
        copyKey: "outcome",
        layout: "stack",
        visuals: [
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "full" },
          { asset: "cover", kind: "portrait-presentation" },
        ],
      },
    ],
  },
  "red-sea": {
    family: "mixed-social",
    hero: { asset: "hero", kind: "brand-application", emphasis: "full" },
    sections: [
      {
        id: "company-profile",
        label: text("Company Profile", "الملف التعريفي"),
        title: text("Readable company profile presentation", "عرض واضح للملف التعريفي"),
        copyKey: "context",
        layout: "document",
        visuals: [
          { asset: "details/profile-cover", source: "gallery-1", format: "png", kind: "document-page", emphasis: "wide" },
          { asset: "details/profile-truck-types", source: "gallery-1", format: "png", kind: "document-page", emphasis: "wide" },
          { asset: "details/profile-spread", source: "gallery-1", format: "png", kind: "document-spread", emphasis: "wide" },
          { asset: "gallery-6", kind: "document-spread", emphasis: "wide" },
        ],
      },
      {
        id: "social-media-posts",
        label: text("Social Media Posts", "منشورات وسائل التواصل"),
        title: text("Selected feed and post designs", "تصاميم مختارة للشبكة والمنشورات"),
        copyKey: "direction",
        layout: "social-grid",
        tone: "paper",
        visuals: [
          { asset: "details/post-vision", source: "gallery-5", format: "png", kind: "square-post", emphasis: "feature" },
          { asset: "details/post-fragile", source: "gallery-5", format: "png", kind: "square-post" },
          { asset: "gallery-2", kind: "social-post", emphasis: "wide" },
        ],
      },
      {
        id: "stories-highlights",
        label: text("Stories / Highlights", "القصص والهايلايت"),
        title: text("Vertical communication and quick identifiers", "تواصل عمودي ومعرّفات سريعة"),
        copy: text(
          "Stories and highlight-style visuals are kept together so the mobile communication system stays legible and separate from the company profile.",
          "تُعرض القصص ومرئيات الهايلايت معًا حتى يبقى نظام التواصل العمودي واضحًا ومنفصلًا عن الملف التعريفي.",
        ),
        layout: "portrait-grid",
        tone: "dark",
        visuals: [
          { asset: "details/story-riyadh", source: "gallery-3", format: "png", kind: "story-frame" },
          { asset: "details/story-containers", source: "gallery-3", format: "png", kind: "story-frame" },
          { asset: "details/story-oman", source: "gallery-3", format: "png", kind: "story-frame" },
          { asset: "details/story-truck", source: "gallery-3", format: "png", kind: "story-frame" },
          { asset: "details/highlight-contact", source: "gallery-4", format: "png", kind: "document-page", emphasis: "wide" },
          { asset: "details/highlight-cards", source: "gallery-4", format: "png", kind: "document-spread", emphasis: "wide" },
        ],
      },
      {
        id: "campaign-and-selected",
        label: text("Campaign / Selected Visuals", "الحملة ومرئيات مختارة"),
        title: text("Campaign materials and closing overview", "مواد الحملة ولمحة ختامية"),
        copyKey: "outcome",
        layout: "billboard",
        visuals: [
          { asset: "details/post-national-day", source: "gallery-5", format: "png", kind: "square-post", emphasis: "wide" },
          { asset: "gallery-8", kind: "brand-application", emphasis: "wide" },
          { asset: "gallery-7", kind: "landscape-presentation", emphasis: "wide" },
        ],
      },
    ],
  },
};

export function getProjectPresentation(project: Project): ProjectPresentation {
  const presentation = projectPresentations[project.slug];

  if (presentation) return presentation;

  return {
    family: "packaging",
    hero: { asset: "hero", kind: "full-artwork", emphasis: "full" },
    sections: [
      {
        id: "gallery",
        label: text("Gallery", "المعرض"),
        title: project.projectType,
        copyKey: "context",
        layout: "editorial",
        visuals: project.gallery.map((_, index) => ({
          asset: `gallery-${index + 1}` as PresentationAsset,
          kind: "full-artwork",
        })),
      },
    ],
  };
}
