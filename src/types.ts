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
  | "flora"
  | "aurora"
  | "elysian"
  | "nude"
  | "luna"
  | "kinfolk"
  | "studio"
  | "materials"
  | "archive";

export interface ProjectImage {
  variant: ArtVariant;
  alt: LocalizedString;
}

export interface Project {
  title: string;
  slug: string;
  year: string;
  category: CategoryKey;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  services: ServiceKey[];
  credits: LocalizedString;
  heroImage: ProjectImage;
  gallery: ProjectImage[];
  colorPalette: string[];
  typography: {
    display: string;
    body: string;
  };
  quote?: LocalizedString;
}
