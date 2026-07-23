import { ArtFrame } from "./ArtFrame";
import type { ProjectImage } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { getProjectAssetDimensions } from "../data/projectAssetDimensions";
import type { CSSProperties } from "react";

export type ProjectVisualAsset = "cover" | "hero" | `gallery-${number}` | (string & {});
export type ProjectVisualFit = "contain" | "cover";
const imageDimensions = {
  portrait: { width: 720, height: 984 },
  landscape: { width: 1536, height: 1024 },
  square: { width: 1024, height: 1024 },
  wide: { width: 1600, height: 900 },
} as const;

interface ProjectVisualProps {
  image: ProjectImage;
  projectSlug?: string;
  asset?: ProjectVisualAsset;
  ratio?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  loading?: "lazy" | "eager";
  fit?: ProjectVisualFit;
  shape?: "circle";
  preserveAspect?: boolean;
  formatOverride?: ProjectImage["format"];
}

export function ProjectVisual({
  image,
  projectSlug,
  asset,
  ratio = "portrait",
  className = "",
  loading = "lazy",
  fit = "contain",
  shape,
  preserveAspect = true,
  formatOverride,
}: ProjectVisualProps) {
  const { language } = useLanguage();
  const imageFormat = formatOverride ?? image.format ?? "jpg";
  const imageFolder = image.folder ?? "concept-projects";
  const src = projectSlug && asset ? `/${imageFolder}/${projectSlug}/${asset}.${imageFormat}` : undefined;
  const assetDimensions = src ? getProjectAssetDimensions(src.slice(1)) : undefined;
  const dimensions = preserveAspect && assetDimensions ? assetDimensions : imageDimensions[ratio];
  const visualStyle =
    preserveAspect && assetDimensions
      ? ({
          "--visual-ratio": `${assetDimensions.width} / ${assetDimensions.height}`,
        } as CSSProperties)
      : undefined;

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
      className={`project-visual project-visual--${ratio} project-visual--fit-${fit} ${shape ? `project-visual--shape-${shape}` : ""} ${className}`}
      data-project={projectSlug}
      data-asset={asset}
      data-fit={fit}
      data-shape={shape}
      style={visualStyle}
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
