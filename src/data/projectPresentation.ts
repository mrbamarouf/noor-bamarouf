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

interface ProjectWorldTheme {
  background: string;
  surface: string;
  surfaceAlt: string;
  foreground: string;
  mutedForeground: string;
  ink: string;
  muted: string;
  accent: string;
  accentForeground: string;
  accent2: string;
  deep: string;
  onDeep: string;
  divider: string;
  buttonBackground: string;
  buttonForeground: string;
  navigationBackground: string;
  navigationForeground: string;
  line: string;
  glow: string;
}

const text = (en: string, ar: string): LocalizedString => ({ en, ar });

const defaultProjectWorld: ProjectWorldTheme = {
  background: "#F7F1EA",
  surface: "#FFFBF5",
  surfaceAlt: "#EFE2D4",
  foreground: "#2D2924",
  mutedForeground: "#6F655D",
  ink: "#2D2924",
  muted: "#6F655D",
  accent: "#B96866",
  accentForeground: "#FFF8F1",
  accent2: "#596447",
  deep: "#303A2E",
  onDeep: "#F8F1E8",
  divider: "rgb(45 41 36 / 0.15)",
  buttonBackground: "#303A2E",
  buttonForeground: "#F8F1E8",
  navigationBackground: "#FFFBF5",
  navigationForeground: "#2D2924",
  line: "rgb(45 41 36 / 0.15)",
  glow: "rgb(185 104 102 / 0.16)",
};

const projectWorlds: Record<string, ProjectWorldTheme> = {
  wello: {
    background: "#FFF3DA",
    surface: "#FFF9EA",
    surfaceAlt: "#FFE3AA",
    foreground: "#1E2D28",
    mutedForeground: "#59645C",
    ink: "#1E2D28",
    muted: "#59645C",
    accent: "#F15B24",
    accentForeground: "#FFF7E8",
    accent2: "#54BFB2",
    deep: "#00644E",
    onDeep: "#FFF7E8",
    divider: "rgb(30 45 40 / 0.16)",
    buttonBackground: "#00644E",
    buttonForeground: "#FFF7E8",
    navigationBackground: "#FFF9EA",
    navigationForeground: "#1E2D28",
    line: "rgb(30 45 40 / 0.16)",
    glow: "rgb(241 91 36 / 0.18)",
  },
  matcha: {
    background: "#F4E8DE",
    surface: "#FCF5EA",
    surfaceAlt: "#E8D3C8",
    foreground: "#2F3B27",
    mutedForeground: "#667056",
    ink: "#2F3B27",
    muted: "#667056",
    accent: "#D8B8B3",
    accentForeground: "#2F3B27",
    accent2: "#8A946F",
    deep: "#5F6C47",
    onDeep: "#FFF8F1",
    divider: "rgb(47 59 39 / 0.15)",
    buttonBackground: "#5F6C47",
    buttonForeground: "#FFF8F1",
    navigationBackground: "#FCF5EA",
    navigationForeground: "#2F3B27",
    line: "rgb(47 59 39 / 0.15)",
    glow: "rgb(216 184 179 / 0.2)",
  },
  "jeddah-railway": {
    background: "#EAF4F1",
    surface: "#F7F3E6",
    surfaceAlt: "#D6F0EA",
    foreground: "#073D4C",
    mutedForeground: "#45666A",
    ink: "#073D4C",
    muted: "#45666A",
    accent: "#0D9B8F",
    accentForeground: "#F5F4E9",
    accent2: "#F28D45",
    deep: "#073D4C",
    onDeep: "#F5F4E9",
    divider: "rgb(7 61 76 / 0.16)",
    buttonBackground: "#073D4C",
    buttonForeground: "#F5F4E9",
    navigationBackground: "#F7F3E6",
    navigationForeground: "#073D4C",
    line: "rgb(7 61 76 / 0.16)",
    glow: "rgb(13 155 143 / 0.18)",
  },
  "egg-space": {
    background: "#17072F",
    surface: "#231043",
    surfaceAlt: "#2A0B5C",
    foreground: "#F8F3EA",
    mutedForeground: "#D8CDEA",
    ink: "#F8F3EA",
    muted: "#D8CDEA",
    accent: "#FDB914",
    accentForeground: "#17072F",
    accent2: "#8C63F1",
    deep: "#0D041E",
    onDeep: "#FFF7E5",
    divider: "rgb(248 243 234 / 0.16)",
    buttonBackground: "#FDB914",
    buttonForeground: "#17072F",
    navigationBackground: "#0D041E",
    navigationForeground: "#FFF7E5",
    line: "rgb(248 243 234 / 0.16)",
    glow: "rgb(253 185 20 / 0.18)",
  },
  "red-bull-marvel": {
    background: "#101010",
    surface: "#1A1A1A",
    surfaceAlt: "#241715",
    foreground: "#FFFFFF",
    mutedForeground: "#D9D6CC",
    ink: "#FFFFFF",
    muted: "#D9D6CC",
    accent: "#FFD600",
    accentForeground: "#101010",
    accent2: "#087DC2",
    deep: "#ED1C24",
    onDeep: "#FFFFFF",
    divider: "rgb(255 255 255 / 0.18)",
    buttonBackground: "#FFD600",
    buttonForeground: "#101010",
    navigationBackground: "#101010",
    navigationForeground: "#FFFFFF",
    line: "rgb(255 255 255 / 0.18)",
    glow: "rgb(237 28 36 / 0.2)",
  },
  impostor: {
    background: "#080808",
    surface: "#151515",
    surfaceAlt: "#24120F",
    foreground: "#FFFFFF",
    mutedForeground: "#D7CDC5",
    ink: "#FFFFFF",
    muted: "#D7CDC5",
    accent: "#E50909",
    accentForeground: "#FFFFFF",
    accent2: "#FFD84D",
    deep: "#000000",
    onDeep: "#FFFFFF",
    divider: "rgb(255 255 255 / 0.17)",
    buttonBackground: "#E50909",
    buttonForeground: "#FFFFFF",
    navigationBackground: "#000000",
    navigationForeground: "#FFFFFF",
    line: "rgb(255 255 255 / 0.17)",
    glow: "rgb(229 9 9 / 0.2)",
  },
  "wemo-delights": {
    background: "#F2E3CE",
    surface: "#FFF5E8",
    surfaceAlt: "#EBD1D5",
    foreground: "#2E1D3D",
    mutedForeground: "#74596D",
    ink: "#2E1D3D",
    muted: "#74596D",
    accent: "#5F4467",
    accentForeground: "#FFF4E4",
    accent2: "#B88952",
    deep: "#2E1D3D",
    onDeep: "#FFF4E4",
    divider: "rgb(46 29 61 / 0.16)",
    buttonBackground: "#2E1D3D",
    buttonForeground: "#FFF4E4",
    navigationBackground: "#FFF5E8",
    navigationForeground: "#2E1D3D",
    line: "rgb(46 29 61 / 0.16)",
    glow: "rgb(244 198 209 / 0.2)",
  },
  "rahaba-space": {
    background: "#F3E8D8",
    surface: "#FBF3E7",
    surfaceAlt: "#E3CFBA",
    foreground: "#4A2F21",
    mutedForeground: "#7B634F",
    ink: "#4A2F21",
    muted: "#7B634F",
    accent: "#805631",
    accentForeground: "#FFF4E6",
    accent2: "#AA9584",
    deep: "#4A2F21",
    onDeep: "#FFF4E6",
    divider: "rgb(74 47 33 / 0.16)",
    buttonBackground: "#4A2F21",
    buttonForeground: "#FFF4E6",
    navigationBackground: "#FBF3E7",
    navigationForeground: "#4A2F21",
    line: "rgb(74 47 33 / 0.16)",
    glow: "rgb(170 149 132 / 0.22)",
  },
  "nirto-cold-brew": {
    background: "#080706",
    surface: "#140D09",
    surfaceAlt: "#2A120C",
    foreground: "#F0D7A2",
    mutedForeground: "#C19B67",
    ink: "#F0D7A2",
    muted: "#C19B67",
    accent: "#D99A38",
    accentForeground: "#080706",
    accent2: "#9C4B1E",
    deep: "#050403",
    onDeep: "#FFEFD2",
    divider: "rgb(240 215 162 / 0.18)",
    buttonBackground: "#D99A38",
    buttonForeground: "#080706",
    navigationBackground: "#050403",
    navigationForeground: "#FFEFD2",
    line: "rgb(240 215 162 / 0.18)",
    glow: "rgb(217 154 56 / 0.18)",
  },
  "zahy-store": {
    background: "#F8F6F0",
    surface: "#FFFFFF",
    surfaceAlt: "#E9F1EC",
    foreground: "#0E5A4D",
    mutedForeground: "#5F786F",
    ink: "#0E5A4D",
    muted: "#5F786F",
    accent: "#0E5A4D",
    accentForeground: "#FFFFFF",
    accent2: "#A9C8BB",
    deep: "#0E5A4D",
    onDeep: "#FFFFFF",
    divider: "rgb(14 90 77 / 0.16)",
    buttonBackground: "#0E5A4D",
    buttonForeground: "#FFFFFF",
    navigationBackground: "#FFFFFF",
    navigationForeground: "#0E5A4D",
    line: "rgb(14 90 77 / 0.16)",
    glow: "rgb(14 90 77 / 0.12)",
  },
  "ansab-holding": {
    background: "#F8F6F0",
    surface: "#FFFFFF",
    surfaceAlt: "#EFF7E4",
    foreground: "#111111",
    mutedForeground: "#5E5E5A",
    ink: "#111111",
    muted: "#5E5E5A",
    accent: "#5EC63D",
    accentForeground: "#111111",
    accent2: "#F6B51E",
    deep: "#111111",
    onDeep: "#FFFFFF",
    divider: "rgb(17 17 17 / 0.15)",
    buttonBackground: "#111111",
    buttonForeground: "#FFFFFF",
    navigationBackground: "#FFFFFF",
    navigationForeground: "#111111",
    line: "rgb(17 17 17 / 0.15)",
    glow: "rgb(94 198 61 / 0.14)",
  },
};

export function getProjectThemeStyle(project: Project): Record<string, string> {
  const theme = projectWorlds[project.slug] ?? defaultProjectWorld;

  return {
    "--case-bg": theme.background,
    "--case-surface": theme.surface,
    "--case-surface-alt": theme.surfaceAlt,
    "--case-foreground": theme.foreground,
    "--case-muted-foreground": theme.mutedForeground,
    "--case-ink": theme.ink,
    "--case-muted": theme.muted,
    "--case-accent": theme.accent,
    "--case-accent-foreground": theme.accentForeground,
    "--case-accent-2": theme.accent2,
    "--case-deep": theme.deep,
    "--case-on-deep": theme.onDeep,
    "--case-divider": theme.divider,
    "--case-button-bg": theme.buttonBackground,
    "--case-button-fg": theme.buttonForeground,
    "--case-nav-bg": theme.navigationBackground,
    "--case-nav-fg": theme.navigationForeground,
    "--case-line": theme.line,
    "--case-glow": theme.glow,
  };
}

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
    hero: { asset: "cover", kind: "packaging-mockup", emphasis: "full" },
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
        id: "final-package",
        label: text("Final Package", "التغليف النهائي"),
        title: text("The cylinder as a finished brand object", "العبوة الأسطوانية كقطعة نهائية تحمل الهوية"),
        copyKey: "context",
        layout: "social-grid",
        visuals: [
          { asset: "cover", kind: "packaging-mockup" },
          { asset: "gallery-5", kind: "packaging-mockup" },
          { asset: "gallery-6", kind: "landscape-presentation", emphasis: "wide" },
          { asset: "gallery-8", kind: "landscape-presentation", emphasis: "wide" },
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
        id: "concept-process",
        label: text("Design System", "نظام التصميم"),
        title: text("Concept note and production structure", "الفكرة وبنية الإنتاج"),
        copyKey: "outcome",
        layout: "portrait-grid",
        tone: "dark",
        visuals: [
          { asset: "gallery-1", kind: "square-post", emphasis: "feature" },
          { asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" },
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
        id: "finished-can",
        label: text("Finished Visuals", "المرئيات النهائية"),
        title: text("Cold brew can presentation", "عرض عبوة الكولد برو"),
        copyKey: "context",
        layout: "packaging",
        visuals: [{ asset: "cover", kind: "packaging-mockup", emphasis: "wide" }],
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
        id: "technical-layout",
        label: text("Packaging Layout", "مخطط التغليف"),
        title: text("Flat wrap kept as a technical reference", "الغلاف المسطح كمرجع تقني"),
        copyKey: "outcome",
        layout: "document",
        tone: "dark",
        visuals: [{ asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" }],
      },
      {
        id: "closeups",
        label: text("Closing Detail", "تفصيل ختامي"),
        title: text("Coffee texture and label finish", "ملمس القهوة ولمسة الملصق النهائية"),
        copyKey: "direction",
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
