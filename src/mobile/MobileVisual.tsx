import { useLanguage } from "../context/LanguageContext";
import type { Project, ProjectImage } from "../types";

export type MobileAsset = "cover" | "hero" | `gallery-${number}`;

interface MobileVisualProps {
  project: Project;
  image: ProjectImage;
  asset: MobileAsset;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  fit?: "cover" | "contain";
}

export function getMobileAssetSource(project: Project, image: ProjectImage, asset: MobileAsset) {
  const format = image.format ?? "jpg";
  const folder = image.folder ?? "concept-projects";
  return `/${folder}/${project.slug}/${asset}.${format}`;
}

export function MobileVisual({
  project,
  image,
  asset,
  className = "",
  loading = "lazy",
  sizes = "100vw",
  fit = "cover",
}: MobileVisualProps) {
  const { language } = useLanguage();

  return (
    <figure
      className={`m-visual m-visual--${fit} ${className}`}
      data-project={project.slug}
      data-asset={asset}
    >
      <img
        src={getMobileAssetSource(project, image, asset)}
        alt={image.alt[language]}
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : "auto"}
        decoding="async"
        width="1600"
        height="1200"
        sizes={sizes}
      />
    </figure>
  );
}
