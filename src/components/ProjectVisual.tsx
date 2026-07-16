import { ArtFrame } from "./ArtFrame";
import type { ProjectImage } from "../types";
import { useLanguage } from "../context/LanguageContext";

export type ProjectVisualAsset = "cover" | "hero" | `gallery-${1 | 2 | 3 | 4}`;

interface ProjectVisualProps {
  image: ProjectImage;
  projectSlug?: string;
  asset?: ProjectVisualAsset;
  ratio?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  loading?: "lazy" | "eager";
}

export function ProjectVisual({
  image,
  projectSlug,
  asset,
  ratio = "portrait",
  className = "",
  loading = "lazy",
}: ProjectVisualProps) {
  const { language } = useLanguage();
  const src = projectSlug && asset ? `/demo-projects/${projectSlug}/${asset}.svg` : undefined;

  if (!src) {
    return (
      <ArtFrame
        className={className}
        variant={image.variant}
        scene={image.scene}
        alt={image.alt}
        ratio={ratio}
        loading={loading}
      />
    );
  }

  return (
    <figure
      className={`project-visual project-visual--${ratio} ${className}`}
      data-project={projectSlug}
      data-asset={asset}
    >
      <img src={src} alt={image.alt[language]} loading={loading} decoding="async" />
    </figure>
  );
}
