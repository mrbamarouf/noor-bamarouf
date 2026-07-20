import { useLanguage } from "../context/LanguageContext";
import type { Project, ProjectImage } from "../types";
import { getProjectAssetDimensions } from "../data/projectAssetDimensions";
import type { CSSProperties } from "react";

export type MobileAsset = "cover" | "hero" | `gallery-${number}` | (string & {});

interface MobileVisualProps {
  project: Project;
  image: ProjectImage;
  asset: MobileAsset;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  fit?: "cover" | "contain";
  preserveAspect?: boolean;
  formatOverride?: ProjectImage["format"];
}

export function getMobileAssetSource(project: Project, image: ProjectImage, asset: MobileAsset, formatOverride?: ProjectImage["format"]) {
  const format = formatOverride ?? image.format ?? "jpg";
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
  fit = "contain",
  preserveAspect = true,
  formatOverride,
}: MobileVisualProps) {
  const { language } = useLanguage();
  const src = getMobileAssetSource(project, image, asset, formatOverride);
  const dimensions = getProjectAssetDimensions(src.slice(1));
  const visualStyle =
    preserveAspect && dimensions
      ? ({
          "--m-visual-ratio": `${dimensions.width} / ${dimensions.height}`,
        } as CSSProperties)
      : undefined;

  return (
    <figure
      className={`m-visual m-visual--${fit} ${className}`}
      data-project={project.slug}
      data-asset={asset}
      data-fit={fit}
      style={visualStyle}
    >
      <img
        src={src}
        alt={image.alt[language]}
        loading={loading}
        decoding="async"
        width={dimensions?.width ?? 1600}
        height={dimensions?.height ?? 1200}
        sizes={sizes}
      />
    </figure>
  );
}
