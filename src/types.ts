export type Language = "en" | "ar";

export type LocalizedString = Record<Language, string>;

export type ServiceKey =
  | "brandIdentity"
  | "logoDesign"
  | "graphicDesign"
  | "packagingDesign"
  | "printDesign"
  | "socialMediaDesign"
  | "editorialDesign"
  | "creativeDirection";

export type CategoryKey =
  | "all"
  | "branding"
  | "logoDesign"
  | "graphicDesign"
  | "packaging"
  | "print"
  | "socialMedia"
  | "awareness"
  | "editorial"
  | "creativeDirection";

export type ArtVariant =
  | "wello"
  | "matcha"
  | "jeddahRailway"
  | "eggSpace"
  | "redBullMarvel"
  | "impostor"
  | "wemoDelights"
  | "rahabaSpace"
  | "nirtoColdBrew"
  | "zahyStore"
  | "ansabHolding"
  | "studio"
  | "materials"
  | "archive";

export type ArtScene =
  | "cover"
  | "hero"
  | "stationery"
  | "packaging"
  | "editorial"
  | "social"
  | "print"
  | "materials"
  | "signage"
  | "campaign";

export interface ProjectImage {
  variant: ArtVariant;
  scene?: ArtScene;
  format?: "jpg" | "png" | "webp";
  folder?: "concept-projects" | "projects";
  alt: LocalizedString;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  label: LocalizedString;
}

export interface ProjectCaseStudy {
  context: LocalizedString;
  direction: LocalizedString;
  applications: LocalizedString[];
  outcome: LocalizedString;
}

export interface Project {
  title: string;
  displayTitle?: LocalizedString;
  slug: string;
  year: string;
  category: CategoryKey;
  projectType: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  services: ServiceKey[];
  credits: LocalizedString;
  coverImage: ProjectImage;
  heroImage: ProjectImage;
  gallery: ProjectImage[];
  video?: ProjectVideo;
  caseStudy: ProjectCaseStudy;
  colorPalette: string[];
  typography: {
    display: string;
    body: string;
  };
  quote?: LocalizedString;
  legalNote?: LocalizedString;
}
