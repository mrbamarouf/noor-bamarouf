import type { CSSProperties } from "react";
import {
  getProjectPresentation,
  getProjectThemeStyle,
  type PresentationAsset,
  type PresentationKind,
} from "../data/projectPresentation";
import type { LocalizedString, Project } from "../types";

export type MobileImageTreatment =
  | "billboard"
  | "document"
  | "logo"
  | "packaging"
  | "portrait"
  | "social"
  | "story"
  | "wide";

export interface MobileProjectWorldChapter {
  id: string;
  title: LocalizedString;
  asset?: PresentationAsset;
  imageTreatment?: MobileImageTreatment;
}

export interface MobileProjectWorldTheme {
  projectSlug: string;
  heroAsset: PresentationAsset;
  imageTreatmentRules: MobileImageTreatment[];
  chapters: MobileProjectWorldChapter[];
  style: CSSProperties;
}

const assetTreatmentMap: Record<PresentationKind, MobileImageTreatment> = {
  billboard: "billboard",
  "brand-application": "wide",
  "detail-crop": "wide",
  "document-page": "document",
  "document-spread": "document",
  "full-artwork": "wide",
  "landscape-presentation": "wide",
  "logo-presentation": "logo",
  "packaging-mockup": "packaging",
  "portrait-presentation": "portrait",
  "social-post": "social",
  "story-frame": "story",
  "square-post": "social",
  "ultrawide-presentation": "wide",
};

function cssValue(style: Record<string, string>, key: string, fallback: string) {
  return style[key] ?? fallback;
}

function parseHexColor(value: string) {
  const normalized = value.trim();
  const short = normalized.match(/^#([0-9a-f]{3})$/i);
  const long = normalized.match(/^#([0-9a-f]{6})$/i);

  if (short) {
    return short[1].split("").map((part) => parseInt(`${part}${part}`, 16));
  }

  if (long) {
    return [0, 2, 4].map((index) => parseInt(long[1].slice(index, index + 2), 16));
  }

  return undefined;
}

function relativeLuminance(color: number[]) {
  const [r, g, b] = color.map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(colorA: string, colorB: string) {
  const parsedA = parseHexColor(colorA);
  const parsedB = parseHexColor(colorB);

  if (!parsedA || !parsedB) return Number.POSITIVE_INFINITY;

  const luminanceA = relativeLuminance(parsedA);
  const luminanceB = relativeLuminance(parsedB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);

  return (lighter + 0.05) / (darker + 0.05);
}

function readableSurfaceText(surface: string, preferred: string, darkFallback: string, lightFallback: string) {
  if (contrastRatio(surface, preferred) >= 4.5) return preferred;
  return relativeLuminance(parseHexColor(surface) ?? [255, 255, 255]) > 0.5 ? darkFallback : lightFallback;
}

export function getMobileProjectWorld(project: Project): MobileProjectWorldTheme {
  const theme = getProjectThemeStyle(project);
  const presentation = getProjectPresentation(project);
  const caseSurface = cssValue(theme, "--case-surface", "#FFFBF5");
  const caseForeground = cssValue(theme, "--case-foreground", "#2D2924");
  const caseAccentForeground = cssValue(theme, "--case-accent-foreground", "#111111");
  const caseDeep = cssValue(theme, "--case-deep", "#303A2E");
  const caseOnDeep = cssValue(theme, "--case-on-deep", "#F8F1E8");
  const kinds = [
    presentation.hero.kind,
    ...presentation.sections.flatMap((section) => section.visuals.map((visual) => visual.kind)),
  ];

  return {
    projectSlug: project.slug,
    heroAsset: presentation.hero.asset,
    imageTreatmentRules: Array.from(new Set(kinds.map((kind) => assetTreatmentMap[kind]))),
    chapters: [
      {
        id: "chapter-01",
        title: { en: "Opening", ar: "الافتتاحية" },
        asset: presentation.hero.asset,
        imageTreatment: assetTreatmentMap[presentation.hero.kind],
      },
      ...presentation.sections.map((section, index) => ({
        id: `chapter-${String(index + 4).padStart(2, "0")}`,
        title: section.title,
        asset: section.visuals[0]?.asset,
        imageTreatment: section.visuals[0] ? assetTreatmentMap[section.visuals[0].kind] : undefined,
      })),
    ],
    style: {
      "--m-case-bg": cssValue(theme, "--case-bg", "#F7F1EA"),
      "--m-case-surface": caseSurface,
      "--m-case-surface-alt": cssValue(theme, "--case-surface-alt", "#EFE2D4"),
      "--m-case-fg": caseForeground,
      "--m-case-on-surface": readableSurfaceText(caseSurface, caseForeground, caseAccentForeground, caseOnDeep),
      "--m-case-muted": cssValue(theme, "--case-muted-foreground", "#6F655D"),
      "--m-case-accent": cssValue(theme, "--case-accent", "#B96866"),
      "--m-case-accent-fg": caseAccentForeground,
      "--m-case-accent-2": cssValue(theme, "--case-accent-2", "#999C81"),
      "--m-case-deep": caseDeep,
      "--m-case-on-deep": readableSurfaceText(caseDeep, caseOnDeep, caseAccentForeground, caseForeground),
      "--m-case-line": cssValue(theme, "--case-divider", "rgb(45 41 36 / 0.15)"),
      ...theme,
    } as CSSProperties,
  };
}
