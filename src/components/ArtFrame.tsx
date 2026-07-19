import type { ArtScene, ArtVariant, LocalizedString } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ArtFrameProps {
  variant: ArtVariant;
  alt: LocalizedString;
  scene?: ArtScene;
  ratio?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  loading?: "lazy" | "eager";
}

const variantLabels: Record<ArtVariant, string> = {
  wello: "WELLO",
  matcha: "MATCHA",
  jeddahRailway: "JEDDAH",
  eggSpace: "EGG SPACE",
  luna: "LUNA",
  atelier: "ATELIER",
  monolith: "MONOLITH",
  sora: "SORA",
  forma: "FORMA",
  noma: "NOMA",
  studio: "STUDIO",
  materials: "MATERIAL",
  archive: "ARCHIVE",
};

const variantMarks: Record<ArtVariant, string> = {
  wello: "Super oats",
  matcha: "Tea ritual",
  jeddahRailway: "Railway line",
  eggSpace: "Egg packaging",
  luna: "Social suite",
  atelier: "Garment mark",
  monolith: "Site system",
  sora: "Cafe service",
  forma: "Object study",
  noma: "Batch label",
  studio: "Studio marks",
  materials: "Material study",
  archive: "Archive folio",
};

const variantInitials: Record<ArtVariant, string> = {
  wello: "WO",
  matcha: "MA",
  jeddahRailway: "JR",
  eggSpace: "ES",
  luna: "LU",
  atelier: "AT",
  monolith: "MO",
  sora: "SO",
  forma: "FO",
  noma: "NO",
  studio: "ST",
  materials: "MT",
  archive: "AR",
};

export function ArtFrame({
  variant,
  alt,
  scene = "cover",
  ratio = "portrait",
  className = "",
  loading = "lazy",
}: ArtFrameProps) {
  const { language } = useLanguage();

  return (
    <figure
      className={`art-frame art-frame--${variant} art-frame--scene-${scene} art-frame--${ratio} ${className}`}
      role="img"
      aria-label={alt[language]}
      data-loading={loading}
      data-scene={scene}
    >
      <div className="art-frame__texture" />
      <div className="art-frame__wash" />
      <div className="art-frame__shadow-leaf leaf-one" />
      <div className="art-frame__shadow-leaf leaf-two" />
      <div className="art-frame__object object-main">
        <span>{variantLabels[variant]}</span>
      </div>
      <div className="art-frame__object object-paper" />
      <div className="art-frame__folio folio-one" />
      <div className="art-frame__folio folio-two" />
      <div className="art-frame__rule rule-one" />
      <div className="art-frame__rule rule-two" />
      <div className="art-frame__object object-vase">
        <span />
      </div>
      <div className="art-frame__stem stem-one" />
      <div className="art-frame__stem stem-two" />
      <div className="art-frame__dot dot-one" />
      <div className="art-frame__dot dot-two" />
      <div className="art-frame__dot dot-three" />
      <div className="art-frame__artifact artifact-one">
        <span>{variantMarks[variant]}</span>
      </div>
      <div className="art-frame__artifact artifact-two" />
      <div className="art-frame__artifact artifact-three" />
      <div className="art-frame__artifact artifact-four" />
      <div className="art-frame__editorial-spread">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="art-frame__package">
        <span />
        <span />
      </div>
      <div className="art-frame__social-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="art-frame__seal">
        <span>{variantInitials[variant]}</span>
      </div>
      <div className="art-frame__ribbon" />
      <div className="art-frame__caption-strip">
        <span>{variantLabels[variant]}</span>
      </div>
    </figure>
  );
}
