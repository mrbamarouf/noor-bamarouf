import type { Project, ProjectImage } from "../types";
import { useLanguage } from "../context/LanguageContext";

type MobileAsset = "cover" | "hero" | `gallery-${number}`;

interface MobileVisualProps {
  project: Project;
  image: ProjectImage;
  asset: MobileAsset;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}

export function MobileVisual({
  project,
  image,
  asset,
  className = "",
  loading = "lazy",
  sizes = "100vw",
}: MobileVisualProps) {
  const { language } = useLanguage();
  const format = image.format ?? "jpg";
  const folder = image.folder ?? "concept-projects";

  return (
    <figure className={`m-visual ${className}`} data-project={project.slug}>
      <img
        src={`/${folder}/${project.slug}/${asset}.${format}`}
        alt={image.alt[language]}
        loading={loading}
        decoding="async"
        width="1200"
        height="900"
        sizes={sizes}
      />
    </figure>
  );
}
