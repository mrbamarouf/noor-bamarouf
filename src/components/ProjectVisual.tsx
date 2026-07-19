import { ArtFrame } from "./ArtFrame";
import type { ProjectImage } from "../types";
import { useLanguage } from "../context/LanguageContext";

export type ProjectVisualAsset = "cover" | "hero" | `gallery-${number}`;
const imageDimensions = {
  portrait: { width: 720, height: 984 },
  landscape: { width: 1536, height: 1024 },
  square: { width: 1024, height: 1024 },
  wide: { width: 1536, height: 1024 },
} as const;

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
  const imageFormat = image.format ?? "jpg";
  const imageFolder = image.folder ?? "concept-projects";
  const src = projectSlug && asset ? `/${imageFolder}/${projectSlug}/${asset}.${imageFormat}` : undefined;
  const dimensions = imageDimensions[ratio];

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
      <img
        src={src}
        alt={image.alt[language]}
        loading={loading}
        decoding="async"
        width={dimensions.width}
        height={dimensions.height}
        sizes="(max-width: 900px) calc(100vw - 40px), 50vw"
      />
    </figure>
  );
}
