import { getProjectPresentation, getProjectThemeStyle, type PresentationAsset, type PresentationKind } from "../data/projectPresentation";
import type { LocalizedString, Project } from "../types";
import type { CSSProperties } from "react";

export type MobileImageTreatment =
  | "billboard"
  | "document"
  | "full-bleed"
  | "logo"
  | "packaging"
  | "portrait"
  | "social-post"
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
  projectTitle: string;
  projectTitleAr: string;
  category: Project["category"];
  year: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColors: string[];
  textColors: {
    foreground: string;
    muted: string;
    accent: string;
  };
  typographyMood: string;
  heroAsset: PresentationAsset;
  assetCategories: PresentationKind[];
  imageTreatmentRules: MobileImageTreatment[];
  ctaStyle: "filled" | "outline" | "project";
  transitionStyle: "color-world" | "soft-fade" | "sharp-cut";
  nextProjectBehavior: "inherit-current-world-until-activation";
  chapters: MobileProjectWorldChapter[];
  style: CSSProperties;
}

const assetTreatmentMap: Record<PresentationKind, MobileImageTreatment> = {
  billboard: "billboard",
  "brand-application": "full-bleed",
  "detail-crop": "wide",
  "document-page": "document",
  "document-spread": "document",
  "full-artwork": "full-bleed",
  "landscape-presentation": "wide",
  "logo-presentation": "logo",
  "packaging-mockup": "packaging",
  "portrait-presentation": "portrait",
  "social-post": "social-post",
  "story-frame": "story",
  "square-post": "social-post",
  "ultrawide-presentation": "wide",
};

function cssValue(style: Record<string, string>, key: string, fallback: string) {
  return style[key] ?? fallback;
}

export function getMobileProjectWorld(project: Project): MobileProjectWorldTheme {
  const style = getProjectThemeStyle(project);
  const presentation = getProjectPresentation(project);
  const assetCategories = Array.from(
    new Set([
      presentation.hero.kind,
      ...presentation.sections.flatMap((section) => section.visuals.map((visual) => visual.kind)),
    ]),
  );
  const imageTreatmentRules = Array.from(new Set(assetCategories.map((kind) => assetTreatmentMap[kind])));
  const chapters: MobileProjectWorldChapter[] = [
    {
      id: "chapter-01",
      title: { en: "Introduction", ar: "المقدمة" },
      asset: presentation.hero.asset,
      imageTreatment: assetTreatmentMap[presentation.hero.kind],
    },
    ...presentation.sections.map((section, index) => ({
      id: `chapter-${String(index + 2).padStart(2, "0")}`,
      title: section.title,
      asset: section.visuals[0]?.asset,
      imageTreatment: section.visuals[0] ? assetTreatmentMap[section.visuals[0].kind] : undefined,
    })),
  ];

  return {
    projectSlug: project.slug,
    projectTitle: project.title,
    projectTitleAr: project.displayTitle?.ar ?? project.title,
    category: project.category,
    year: project.year,
    primaryColor: cssValue(style, "--case-accent", project.colorPalette[0] ?? "#2D2924"),
    secondaryColor: cssValue(style, "--case-accent-2", project.colorPalette[1] ?? "#999C81"),
    backgroundColors: [
      cssValue(style, "--case-bg", project.colorPalette[0] ?? "#F7F1EA"),
      cssValue(style, "--case-surface", project.colorPalette[1] ?? "#FFFBF5"),
      cssValue(style, "--case-deep", project.colorPalette[2] ?? "#303A2E"),
    ],
    textColors: {
      foreground: cssValue(style, "--case-foreground", "#2D2924"),
      muted: cssValue(style, "--case-muted-foreground", "#6F655D"),
      accent: cssValue(style, "--case-accent", "#B96866"),
    },
    typographyMood: `${project.typography.display} / ${project.typography.body}`,
    heroAsset: presentation.hero.asset,
    assetCategories,
    imageTreatmentRules,
    ctaStyle: "project",
    transitionStyle: "color-world",
    nextProjectBehavior: "inherit-current-world-until-activation",
    chapters,
    style: {
      "--noor-mobile-project-bg": cssValue(style, "--case-bg", "#F7F1EA"),
      "--noor-mobile-project-surface": cssValue(style, "--case-surface", "#FFFBF5"),
      "--noor-mobile-project-fg": cssValue(style, "--case-foreground", "#2D2924"),
      "--noor-mobile-project-muted": cssValue(style, "--case-muted-foreground", "#6F655D"),
      "--noor-mobile-project-accent": cssValue(style, "--case-accent", "#B96866"),
      "--noor-mobile-project-accent-2": cssValue(style, "--case-accent-2", "#999C81"),
      "--noor-mobile-project-line": cssValue(style, "--case-divider", "rgb(45 41 36 / 0.15)"),
    } as CSSProperties,
  };
}
