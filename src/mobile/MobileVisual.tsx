import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getProjectAssetDimensions } from "../data/projectAssetDimensions";
import type { Project, ProjectImage } from "../types";

export type MobileAsset = "cover" | "hero" | `gallery-${number}` | (string & {});

interface MobileVisualProps {
  project: Project;
  image: ProjectImage;
  asset: MobileAsset;
  className?: string;
  loading?: "lazy" | "eager";
  fit?: "cover" | "contain";
  shape?: "circle";
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
  fit = "contain",
  shape,
  formatOverride,
}: MobileVisualProps) {
  const { language } = useLanguage();
  const src = getMobileAssetSource(project, image, asset, formatOverride);
  const dimensions = getProjectAssetDimensions(src.slice(1));
  const style = {
    "--m-visual-ratio": dimensions ? `${dimensions.width} / ${dimensions.height}` : "1 / 1",
    "--m-visual-fit": fit,
  } as CSSProperties;

  return (
    <figure
      className={`m-visual ${shape ? `m-visual--shape-${shape}` : ""} ${className}`}
      data-project={project.slug}
      data-asset={asset}
      data-fit={fit}
      data-shape={shape}
      style={style}
    >
      <img
        src={src}
        alt={image.alt[language]}
        loading={loading}
        decoding="async"
        width={dimensions?.width ?? 1200}
        height={dimensions?.height ?? 1200}
        sizes="(max-width: 900px) 100vw, 50vw"
      />
    </figure>
  );
}
