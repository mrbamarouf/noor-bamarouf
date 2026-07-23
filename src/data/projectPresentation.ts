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
  ratio?: "portrait" | "landscape" | "square" | "wide";
  shape?: "circle";
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

export interface DesktopProjectCover {
  asset: PresentationAsset;
  ratio: "portrait" | "landscape" | "square" | "wide";
  fit?: "contain" | "cover";
  format?: ProjectImage["format"];
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
  heroAccent?: string;
}

const text = (en: string, ar: string): LocalizedString => ({ en, ar });

const jeddahShowcaseImages: Record<string, ProjectImage> = {
  "showcase/showcase-01": {
    variant: "jeddahRailway",
    scene: "hero",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY opening presentation with bilingual logo over a futuristic train station scene.",
      "عرض افتتاحي لـ JEDDAH RAILWAY مع الشعار ثنائي اللغة فوق مشهد محطة قطار مستقبلية.",
    ),
  },
  "showcase/showcase-02": {
    variant: "jeddahRailway",
    scene: "campaign",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY IMC strategy slide with campaign description and mobile booking screens.",
      "شريحة استراتيجية IMC لـ JEDDAH RAILWAY مع شرح الحملة وشاشات حجز الجوال.",
    ),
  },
  "showcase/showcase-03": {
    variant: "jeddahRailway",
    scene: "social",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY Instagram posts presentation with train and travel visuals.",
      "عرض منشورات Instagram لـ JEDDAH RAILWAY مع مرئيات القطار والسفر.",
    ),
  },
  "showcase/showcase-04": {
    variant: "jeddahRailway",
    scene: "social",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY Instagram story designs with station and train imagery.",
      "تصاميم قصص Instagram لـ JEDDAH RAILWAY مع صور المحطة والقطار.",
    ),
  },
  "showcase/showcase-05": {
    variant: "jeddahRailway",
    scene: "signage",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY OOH poster and billboard mockup presentation.",
      "عرض ملصقات وإعلانات خارجية لـ JEDDAH RAILWAY.",
    ),
  },
  "showcase/showcase-06": {
    variant: "jeddahRailway",
    scene: "signage",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY station signage and ticket design presentation.",
      "عرض لوحات محطة وتذكرة لـ JEDDAH RAILWAY.",
    ),
  },
  "showcase/showcase-07": {
    variant: "jeddahRailway",
    scene: "materials",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY promotional items presentation with meal box, neck pillow, and cup.",
      "عرض مواد ترويجية لـ JEDDAH RAILWAY تشمل علبة وجبة ووسادة رقبة وكوب.",
    ),
  },
  "showcase/showcase-08": {
    variant: "jeddahRailway",
    scene: "campaign",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY promotional campaign explanation slide with objectives and insight.",
      "شريحة شرح الحملة الترويجية لـ JEDDAH RAILWAY مع الأهداف والرؤية.",
    ),
  },
  "showcase/showcase-09": {
    variant: "jeddahRailway",
    scene: "social",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY promotional Instagram posts for a travel campaign.",
      "منشورات Instagram ترويجية لـ JEDDAH RAILWAY ضمن حملة سفر.",
    ),
  },
  "showcase/showcase-10": {
    variant: "jeddahRailway",
    scene: "social",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY promotional Instagram story designs for the travel campaign.",
      "تصاميم قصص Instagram ترويجية لـ JEDDAH RAILWAY ضمن حملة السفر.",
    ),
  },
  "showcase/showcase-11": {
    variant: "jeddahRailway",
    scene: "materials",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY campaign promotional items with tag, sticker sheet, and phone notification.",
      "مواد ترويجية لحملة JEDDAH RAILWAY تشمل بطاقة وملصقات وإشعار جوال.",
    ),
  },
  "showcase/showcase-12": {
    variant: "jeddahRailway",
    scene: "materials",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY campaign tote bag promotional item presentation.",
      "عرض حقيبة قماشية ترويجية لحملة JEDDAH RAILWAY.",
    ),
  },
  "showcase/showcase-13": {
    variant: "jeddahRailway",
    scene: "signage",
    format: "png",
    folder: "projects",
    alt: text(
      "JEDDAH RAILWAY campaign booth presentation with branded seating area.",
      "عرض جناح حملة JEDDAH RAILWAY مع مساحة جلوس تحمل الهوية.",
    ),
  },
};

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
    background: "#F7A833",
    surface: "#FFE76B",
    surfaceAlt: "#F15B24",
    foreground: "#18392F",
    mutedForeground: "#2C5B4D",
    ink: "#1E2D28",
    muted: "#2C5B4D",
    accent: "#F15B24",
    accentForeground: "#FFF7E8",
    accent2: "#54BFB2",
    deep: "#00644E",
    onDeep: "#FFF7E8",
    divider: "rgb(30 45 40 / 0.16)",
    buttonBackground: "#00644E",
    buttonForeground: "#FFF7E8",
    navigationBackground: "#00644E",
    navigationForeground: "#FFF7E8",
    line: "rgb(30 45 40 / 0.16)",
    glow: "rgb(241 91 36 / 0.18)",
    heroAccent: "#FFE76B",
  },
  matcha: {
    background: "#E6D2C8",
    surface: "#F5E8DC",
    surfaceAlt: "#C8CEAE",
    foreground: "#26311F",
    mutedForeground: "#566047",
    ink: "#2F3B27",
    muted: "#667056",
    accent: "#687457",
    accentForeground: "#FFF8F1",
    accent2: "#D8B8B3",
    deep: "#5F6C47",
    onDeep: "#FFF8F1",
    divider: "rgb(47 59 39 / 0.15)",
    buttonBackground: "#5F6C47",
    buttonForeground: "#FFF8F1",
    navigationBackground: "#5F6C47",
    navigationForeground: "#FFF8F1",
    line: "rgb(47 59 39 / 0.15)",
    glow: "rgb(216 184 179 / 0.2)",
    heroAccent: "#F5E8DC",
  },
  "jeddah-railway": {
    background: "#064B5A",
    surface: "#0B5666",
    surfaceAlt: "#0A6070",
    foreground: "#EEF2E6",
    mutedForeground: "#D1DED7",
    ink: "#EEF2E6",
    muted: "#D1DED7",
    accent: "#68B85D",
    accentForeground: "#053E4A",
    accent2: "#F58A4A",
    deep: "#033A47",
    onDeep: "#F2F2E5",
    divider: "rgb(238 242 230 / 0.2)",
    buttonBackground: "#EEF2E6",
    buttonForeground: "#053E4A",
    navigationBackground: "#033A47",
    navigationForeground: "#F3F1E3",
    line: "rgb(238 242 230 / 0.2)",
    glow: "rgb(104 184 93 / 0.16)",
    heroAccent: "#F58A4A",
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
    background: "#087DC2",
    surface: "#00A7D8",
    surfaceAlt: "#ED1C24",
    foreground: "#FFFFFF",
    mutedForeground: "#EAF8FF",
    ink: "#FFFFFF",
    muted: "#DDF7FF",
    accent: "#FFD600",
    accentForeground: "#050505",
    accent2: "#ED1C24",
    deep: "#050505",
    onDeep: "#FFFFFF",
    divider: "rgb(255 255 255 / 0.24)",
    buttonBackground: "#FFD600",
    buttonForeground: "#050505",
    navigationBackground: "#ED1C24",
    navigationForeground: "#FFFFFF",
    line: "rgb(255 255 255 / 0.24)",
    glow: "rgb(255 214 0 / 0.24)",
    heroAccent: "#FFD600",
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
    background: "#5F4467",
    surface: "#F4C6D1",
    surfaceAlt: "#2E1D3D",
    foreground: "#FFF4E4",
    mutedForeground: "#EBD1D5",
    ink: "#FFF4E4",
    muted: "#EBD1D5",
    accent: "#F4C6D1",
    accentForeground: "#2E1D3D",
    accent2: "#E9A3B7",
    deep: "#2E1D3D",
    onDeep: "#FFF4E4",
    divider: "rgb(255 244 228 / 0.2)",
    buttonBackground: "#F4C6D1",
    buttonForeground: "#2E1D3D",
    navigationBackground: "#2E1D3D",
    navigationForeground: "#FFF4E4",
    line: "rgb(255 244 228 / 0.2)",
    glow: "rgb(244 198 209 / 0.2)",
    heroAccent: "#F4C6D1",
  },
  "rahaba-space": {
    background: "#B99A7B",
    surface: "#E3CFBA",
    surfaceAlt: "#805631",
    foreground: "#4A2F21",
    mutedForeground: "#5F4534",
    ink: "#4A2F21",
    muted: "#5F4534",
    accent: "#805631",
    accentForeground: "#FFF4E6",
    accent2: "#AA9584",
    deep: "#4A2F21",
    onDeep: "#FFF4E6",
    divider: "rgb(74 47 33 / 0.16)",
    buttonBackground: "#4A2F21",
    buttonForeground: "#FFF4E6",
    navigationBackground: "#4A2F21",
    navigationForeground: "#FFF4E6",
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
    background: "#DDECE5",
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
    navigationBackground: "#0E5A4D",
    navigationForeground: "#FFFFFF",
    line: "rgb(14 90 77 / 0.16)",
    glow: "rgb(14 90 77 / 0.12)",
  },
  "ansab-holding": {
    background: "#111111",
    surface: "#EFF7E4",
    surfaceAlt: "#1D2A18",
    foreground: "#FFFFFF",
    mutedForeground: "#E5E7DD",
    ink: "#FFFFFF",
    muted: "#E5E7DD",
    accent: "#5EC63D",
    accentForeground: "#111111",
    accent2: "#F6B51E",
    deep: "#111111",
    onDeep: "#FFFFFF",
    divider: "rgb(255 255 255 / 0.18)",
    buttonBackground: "#111111",
    buttonForeground: "#FFFFFF",
    navigationBackground: "#111111",
    navigationForeground: "#FFFFFF",
    line: "rgb(255 255 255 / 0.18)",
    glow: "rgb(94 198 61 / 0.14)",
  },
  "red-sea-transport-logistics": {
    background: "#0C1724",
    surface: "#F7F8FA",
    surfaceAlt: "#2F4E9B",
    foreground: "#F7F8FA",
    mutedForeground: "#D8E2F2",
    ink: "#0C1724",
    muted: "#536073",
    accent: "#CF1D2A",
    accentForeground: "#FFFFFF",
    accent2: "#2F4E9B",
    deep: "#07111D",
    onDeep: "#FFFFFF",
    divider: "rgb(255 255 255 / 0.2)",
    buttonBackground: "#CF1D2A",
    buttonForeground: "#FFFFFF",
    navigationBackground: "#07111D",
    navigationForeground: "#FFFFFF",
    line: "rgb(255 255 255 / 0.2)",
    glow: "rgb(207 29 42 / 0.2)",
    heroAccent: "#3D83A6",
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
    "--case-hero-accent": theme.heroAccent ?? theme.accent,
  };
}

const desktopProjectCovers: Record<string, DesktopProjectCover> = {
  wello: { asset: "cover", ratio: "landscape", fit: "cover" },
  matcha: { asset: "hero", ratio: "wide", fit: "cover" },
  "jeddah-railway": { asset: "showcase/showcase-01", ratio: "wide", fit: "contain", format: "png" },
  "egg-space": { asset: "hero", ratio: "landscape", fit: "contain" },
  "red-bull-marvel": { asset: "hero", ratio: "square", fit: "contain" },
  impostor: { asset: "hero", ratio: "landscape", fit: "contain" },
  "wemo-delights": { asset: "hero", ratio: "landscape", fit: "cover" },
  "rahaba-space": { asset: "gallery-8", ratio: "portrait", fit: "cover" },
  "nirto-cold-brew": { asset: "gallery-8", ratio: "wide", fit: "contain", format: "png" },
  "zahy-store": { asset: "gallery-1", ratio: "square", fit: "contain" },
  "ansab-holding": { asset: "hero", ratio: "landscape", fit: "cover" },
  "red-sea-transport-logistics": { asset: "cover", ratio: "landscape", fit: "cover", format: "png" },
};

export function getDesktopProjectCover(project: Project): DesktopProjectCover {
  return desktopProjectCovers[project.slug] ?? {
    asset: "cover",
    ratio: project.category === "logoDesign" ? "square" : "landscape",
    fit: project.category === "logoDesign" ? "contain" : "cover",
  };
}

const presentationAssetImages: Record<string, Record<string, ProjectImage>> = {
  "jeddah-railway": jeddahShowcaseImages,
};

export function getProjectImageByAsset(project: Project, asset: PresentationAsset): ProjectImage {
  const presentationAsset = presentationAssetImages[project.slug]?.[asset];
  if (presentationAsset) return presentationAsset;
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
    hero: { asset: "cover", kind: "packaging-mockup", ratio: "landscape", emphasis: "full", fit: "cover" },
    sections: [
      {
        id: "packaging-fronts",
        label: text("Packaging", "التغليف"),
        title: text("Flavor family and pouch fronts", "عائلة النكهات وواجهات العبوات"),
        copyKey: "context",
        layout: "packaging",
        visuals: [
          { asset: "gallery-1", kind: "packaging-mockup", emphasis: "wide" },
          { asset: "gallery-2", kind: "packaging-mockup" },
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
          { asset: "gallery-4", kind: "landscape-presentation", emphasis: "full", fit: "cover" },
        ],
      },
    ],
  },
  matcha: {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", ratio: "wide", emphasis: "full", fit: "cover" },
    sections: [
      {
        id: "drink-photography",
        label: text("Beverage Moments", "لحظات المشروب"),
        title: text("Soft drink photography and cup applications", "تصوير ناعم وتطبيقات على الأكواب"),
        copyKey: "context",
        layout: "portrait-grid",
        visuals: [
          { asset: "gallery-2", kind: "square-post", emphasis: "feature" },
          { asset: "cover", kind: "portrait-presentation" },
          { asset: "gallery-1", kind: "portrait-presentation" },
        ],
      },
      {
        id: "packaging-system",
        label: text("Packaging", "التغليف"),
        title: text("Pouch, pattern, and product system", "العبوة والنمط ونظام المنتج"),
        copyKey: "direction",
        layout: "editorial",
        tone: "paper",
        visuals: [
          { asset: "gallery-3", kind: "document-page", emphasis: "feature" },
        ],
      },
    ],
  },
  "jeddah-railway": {
    family: "transport",
    hero: { asset: "showcase/showcase-01", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" },
    sections: [
      {
        id: "strategy",
        label: text("Strategy", "الاستراتيجية"),
        title: text("IMC Strategy", "استراتيجية IMC"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-02", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "instagram-posts",
        label: text("Instagram Posts", "منشورات Instagram"),
        title: text("Instagram Posts", "منشورات Instagram"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-03", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "instagram-story",
        label: text("Instagram Story", "قصص Instagram"),
        title: text("Instagram Story", "قصص Instagram"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-04", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "ooh-posters",
        label: text("OOH Posters", "الإعلانات الخارجية"),
        title: text("OOH Posters", "إعلانات خارجية"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-05", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "station",
        label: text("Station", "المحطة"),
        title: text("Station", "المحطة"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-06", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "promotional-items",
        label: text("Promotional Items", "التوزيعات"),
        title: text("Promotional Items", "التوزيعات"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-07", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "campaign",
        label: text("Campaign", "الحملة"),
        title: text("Promotional Campaign", "الحملة الترويجية"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-08", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "campaign-posts",
        label: text("Campaign Posts", "منشورات الحملة"),
        title: text("Campaign Instagram Posts", "منشورات الحملة"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-09", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "campaign-stories",
        label: text("Campaign Stories", "قصص الحملة"),
        title: text("Campaign Instagram Story", "قصص الحملة"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-10", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "campaign-giveaways",
        label: text("Campaign Giveaways", "توزيعات الحملة"),
        title: text("Campaign Giveaways", "توزيعات الحملة"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-11", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "tote-bags",
        label: text("Tote Bags", "حقائب ترويجية"),
        title: text("Promotional Tote Bags", "حقائب ترويجية"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-12", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
      {
        id: "booth",
        label: text("Booth", "الجناح"),
        title: text("Campaign Booth", "جناح الحملة"),
        layout: "stack",
        visuals: [{ asset: "showcase/showcase-13", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "png" }],
      },
    ],
  },
  "egg-space": {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", ratio: "landscape", emphasis: "full", fit: "contain" },
    sections: [
      {
        id: "final-package",
        label: text("Final Package", "التغليف النهائي"),
        title: text("The cylinder as a finished brand object", "العبوة الأسطوانية كقطعة نهائية تحمل الهوية"),
        copyKey: "context",
        layout: "social-grid",
        visuals: [
          { asset: "cover", kind: "packaging-mockup", emphasis: "feature" },
          { asset: "gallery-5", kind: "square-post" },
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
        ],
      },
    ],
  },
  "red-bull-marvel": {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", ratio: "square", emphasis: "full" },
    sections: [
      {
        id: "can-lineup",
        label: text("Packaging", "التغليف"),
        title: text("Collectible can lineup", "مجموعة علب قابلة للاقتناء"),
        copyKey: "context",
        layout: "social-grid",
        tone: "brand",
        visuals: [
          { asset: "gallery-1", kind: "square-post", emphasis: "feature" },
        ],
      },
      {
        id: "comic-panels",
        label: text("Comic Language", "لغة القصص المصورة"),
        title: text("Hero panels and versus graphics", "لوحات الأبطال ورسومات المواجهة"),
        copyKey: "direction",
        layout: "packaging",
        visuals: [
          { asset: "gallery-2", kind: "square-post" },
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
        layout: "editorial",
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
        ],
      },
    ],
  },
  "wemo-delights": {
    family: "packaging",
    hero: { asset: "hero", kind: "brand-application", ratio: "landscape", emphasis: "full", fit: "cover" },
    sections: [
      {
        id: "brand-story",
        label: text("Story", "القصة"),
        title: text("We + Moments as a visual idea", "We + Moments كفكرة بصرية"),
        copyKey: "context",
        layout: "stack",
        visuals: [
          { asset: "gallery-2", kind: "brand-application", ratio: "landscape", emphasis: "full" },
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
          { asset: "gallery-6", kind: "portrait-presentation" },
        ],
      },
    ],
  },
  "rahaba-space": {
    family: "social",
    hero: { asset: "hero", kind: "social-post", ratio: "landscape", emphasis: "full" },
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
        visuals: [{ asset: "gallery-2", kind: "landscape-presentation", emphasis: "full" }],
      },
    ],
  },
  "nirto-cold-brew": {
    family: "packaging",
    hero: { asset: "hero", kind: "packaging-mockup", ratio: "wide", emphasis: "full", fit: "contain", format: "png" },
    sections: [
      {
        id: "lifestyle",
        label: text("Lifestyle", "مشهد استخدام"),
        title: text("Cold brew in a real coffee moment", "الكولد برو في لحظة قهوة حقيقية"),
        copy: text(
          "The approved lifestyle image adds atmosphere and scale while keeping the can and label clearly present.",
          "تضيف الصورة المعتمدة إحساسًا واقعيًا وحضورًا واضحًا للعبوة مع بقاء الملصق مقروءًا.",
        ),
        layout: "stack",
        tone: "brand",
        visuals: [
          { asset: "gallery-7", kind: "portrait-presentation", emphasis: "feature", format: "jpg" },
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
        id: "technical-layout",
        label: text("Packaging Layout", "مخطط التغليف"),
        title: text("Flat wrap kept as a technical reference", "الغلاف المسطح كمرجع تقني"),
        copyKey: "outcome",
        layout: "document",
        tone: "dark",
        visuals: [{ asset: "gallery-2", kind: "landscape-presentation", emphasis: "wide" }],
      },
    ],
  },
  "zahy-store": {
    family: "logo",
    hero: { asset: "gallery-1", kind: "logo-presentation", ratio: "square", emphasis: "full" },
    sections: [
      {
        id: "logo",
        label: text("Logo", "الشعار"),
        title: text("Supplied logo presentation", "عرض الشعار المقدم"),
        copyKey: "context",
        layout: "logo",
        visuals: [
          { asset: "gallery-2", kind: "logo-presentation", emphasis: "feature" },
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
    hero: { asset: "hero", kind: "logo-presentation", ratio: "landscape", emphasis: "full" },
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
        ],
      },
    ],
  },
  "red-sea-transport-logistics": {
    family: "transport",
    hero: { asset: "hero", kind: "landscape-presentation", ratio: "wide", emphasis: "full", fit: "cover", format: "png" },
    sections: [
      {
        id: "profile-foundation",
        label: text("Company Profile", "الملف التعريفي"),
        title: text("A corporate profile built around movement", "ملف مؤسسي مبني حول الحركة"),
        copy: text(
          "The company profile introduces RED SEA as a land-transport specialist through cinematic trucking imagery, bilingual corporate messaging, directional geometry, and a red and blue identity system built for clarity.",
          "يقدم الملف التعريفي RED SEA بوصفها جهة متخصصة في النقل البري من خلال صور شاحنات سينمائية، ورسائل مؤسسية ثنائية اللغة، وهندسة اتجاهية، ونظام أحمر وأزرق قائم على الوضوح.",
        ),
        layout: "editorial",
        tone: "brand",
        visuals: [
          { asset: "gallery-1", kind: "portrait-presentation", ratio: "portrait", emphasis: "feature", fit: "contain", format: "png" },
          { asset: "gallery-8", kind: "landscape-presentation", ratio: "landscape", emphasis: "wide", fit: "contain", format: "svg" },
        ],
      },
      {
        id: "countries",
        label: text("Countries Served", "الدول التي نخدمها"),
        title: text("A regional land-transport footprint", "امتداد إقليمي للنقل البري"),
        copy: text(
          "The profile identifies the service footprint across Saudi Arabia, Jordan, Kuwait, Bahrain, Qatar, the United Arab Emirates, Oman, and Yemen.",
          "يعرض الملف نطاق الخدمة في المملكة العربية السعودية، الأردن، الكويت، البحرين، قطر، الإمارات العربية المتحدة، عمان، واليمن.",
        ),
        layout: "stack",
        tone: "paper",
        visuals: [
          { asset: "gallery-2", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "svg" },
        ],
      },
      {
        id: "social-system",
        label: text("Social Media System", "نظام محتوى التواصل الاجتماعي"),
        title: text("Approximately 40 branded posts, one logistics language", "ما يقارب 40 منشورًا بلغة لوجستية واحدة"),
        copy: text(
          "A complete communication system was developed across approximately 40 branded social media posts to communicate RED SEA's services, fleet, logistics expertise, company values, and seasonal campaigns.",
          "تم تطوير نظام متكامل لمحتوى التواصل الاجتماعي يضم ما يقارب 40 منشورًا احترافيًا يعرض خدمات البحر الأحمر، أسطولها، خبرتها اللوجستية، قيمها، وحملاتها الموسمية.",
        ),
        layout: "social-grid",
        tone: "dark",
        visuals: [
          { asset: "gallery-9", kind: "social-post", ratio: "square", emphasis: "feature", fit: "contain", format: "jpg" },
          { asset: "gallery-10", kind: "social-post", ratio: "square", fit: "contain", format: "jpg" },
        ],
      },
      {
        id: "logistics-services",
        label: text("Logistics Services", "الخدمات اللوجستية"),
        title: text("Service communication for specialized transport", "محتوى خدمات للنقل المتخصص"),
        copy: text(
          "Service posts translate the corporate offer into clear, direct visual messages for specialized shipping, partial shipments, and tailored logistics solutions.",
          "تحول منشورات الخدمات العرض المؤسسي إلى رسائل بصرية واضحة ومباشرة للشحن المتخصص، والشحن الجزئي، والحلول اللوجستية المصممة حسب الحاجة.",
        ),
        layout: "social-grid",
        tone: "brand",
        visuals: [
          { asset: "gallery-11", kind: "social-post", ratio: "square", emphasis: "feature", fit: "contain", format: "jpg" },
          { asset: "gallery-12", kind: "social-post", ratio: "square", fit: "contain", format: "jpg" },
        ],
      },
      {
        id: "fleet",
        label: text("Truck Types", "أنواع الشاحنات"),
        title: text("Fleet range for express, partial, and cross-border shipments", "تنوع أسطول للشحن السريع والجزئي وعبر الحدود"),
        copy: text(
          "The Red Sea Transport and Logistics Company is distinguished by providing a diverse range of vehicles designed to meet all requirements of land transport. We offer comprehensive solutions tailored to our clients' needs, whether they require same-day express shipments, cost-effective long-distance shipping services, or specialized services for partial transportation and cross-border shipments.",
          "تتميز مؤسسة البحر الأحمر للنقليات بتقديم مجموعة متنوعة من المركبات المصممة لتلبية جميع متطلبات النقل البري. نحن نوفر حلولًا شاملة تناسب احتياجات عملائنا، سواء كانت تتطلب شحنات سريعة في نفس اليوم، أو خدمات شحن طويلة المدى بتكلفة فعالة، أو خدمات متخصصة للنقل الجزئي والشحنات عبر الحدود.",
        ),
        layout: "stack",
        tone: "ivory",
        visuals: [
          { asset: "gallery-3", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "svg" },
          { asset: "gallery-13", kind: "social-post", ratio: "square", fit: "contain", format: "jpg" },
          { asset: "gallery-14", kind: "social-post", ratio: "square", fit: "contain", format: "jpg" },
        ],
      },
      {
        id: "growth",
        label: text("Our Growth", "نموّنا"),
        title: text("Every step leads toward a better future", "كل خطوة تقود نحو مستقبل أفضل"),
        copy: text(
          "The supplied profile presents annual growth values from 2015 through 2024, moving from 1,855 in 2015 to 10,040 in 2024.",
          "يعرض الملف التعريفي قيم النمو السنوية من 2015 حتى 2024، من 1,855 في عام 2015 إلى 10,040 في عام 2024.",
        ),
        layout: "document",
        tone: "paper",
        visuals: [
          { asset: "gallery-4", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "svg" },
        ],
      },
      {
        id: "clients",
        label: text("Key Clients", "عملاؤنا الرئيسيون"),
        title: text("A client field built into the profile system", "حقل عملاء ضمن نظام الملف التعريفي"),
        copy: text(
          "The company profile presents a selection of key clients as a dense corporate logo field, keeping the client page clear, direct, and easy to scan.",
          "يعرض الملف التعريفي مجموعة من العملاء الرئيسيين على هيئة حقل شعارات مؤسسي كثيف وواضح وسهل القراءة.",
        ),
        layout: "document",
        tone: "ivory",
        visuals: [
          { asset: "gallery-5", kind: "landscape-presentation", ratio: "wide", emphasis: "wide", fit: "contain", format: "png" },
        ],
      },
      {
        id: "campaigns",
        label: text("Campaign Design", "تصميم الحملات"),
        title: text("Seasonal communication within the same brand system", "تواصل موسمي ضمن نظام العلامة نفسه"),
        copy: text(
          "The UAE National Day artwork shows how the RED SEA system extends into seasonal campaign communication while keeping the brand mark, bilingual copy, and transport identity present.",
          "يوضح تصميم اليوم الوطني الإماراتي كيف يمتد نظام RED SEA إلى التواصل الموسمي مع الحفاظ على الشعار، والنص ثنائي اللغة، وهوية النقل.",
        ),
        layout: "stack",
        tone: "dark",
        visuals: [
          { asset: "gallery-15", kind: "social-post", ratio: "square", emphasis: "feature", fit: "contain", format: "jpg" },
        ],
      },
      {
        id: "contact",
        label: text("Contact", "التواصل"),
        title: text("Contact information carried as a final profile page", "بيانات التواصل كصفحة ختامية في الملف"),
        copy: text(
          "The contact page includes the phone number 0126650555, the email Info@redsealgx.com, and the office location G5FJ+WF3, Al Sharafeyah, Jeddah 23218, Gulf Plaza, North Tower, third floor, office 311.",
          "تتضمن صفحة التواصل رقم الهاتف 0126650555، والبريد الإلكتروني Info@redsealgx.com، وموقع المكتب G5FJ+WF3، الشرفية، جدة 23218، الخليج بلازا، البرج الشمالي، الدور الثالث، مكتب ٣١١.",
        ),
        layout: "document",
        tone: "paper",
        visuals: [
          { asset: "gallery-6", kind: "full-artwork", ratio: "wide", emphasis: "full", fit: "contain", format: "svg" },
        ],
      },
      {
        id: "closing",
        label: text("Closing", "الختام"),
        title: text("Thank you", "شكرًا"),
        copyKey: "outcome",
        layout: "stack",
        tone: "dark",
        visuals: [
          { asset: "gallery-7", kind: "ultrawide-presentation", ratio: "wide", emphasis: "full", fit: "cover", format: "png" },
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
