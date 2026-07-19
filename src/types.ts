export type Language = "en" | "ar";

export type LocalizedString = Record<Language, string>;

export type ServiceKey =
  | "brandIdentity"
  | "graphicDesign"
  | "packagingDesign"
  | "printDesign"
  | "socialMediaDesign"
  | "editorialDesign"
  | "creativeDirection";

export type CategoryKey =
  | "all"
  | "branding"
  | "graphicDesign"
  | "packaging"
  | "print"
  | "socialMedia"
  | "editorial"
  | "creativeDirection";

export type ArtVariant =
  | "wello"
  | "aurora"
  | "elysian"
  | "luna"
  | "kinfolk"
  | "atelier"
  | "monolith"
  | "sora"
  | "forma"
  | "noma"
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
  format?: "jpg" | "png";
  alt: LocalizedString;
}

export interface ProjectCaseStudy {
  context: LocalizedString;
  direction: LocalizedString;
  applications: LocalizedString[];
  outcome: LocalizedString;
}

export interface Project {
  title: string;
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
  caseStudy: ProjectCaseStudy;
  colorPalette: string[];
  typography: {
    display: string;
    body: string;
  };
  quote?: LocalizedString;
}
