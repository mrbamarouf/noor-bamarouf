import type { ArtVariant, LocalizedString } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ArtFrameProps {
  variant: ArtVariant;
  alt: LocalizedString;
  ratio?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  loading?: "lazy" | "eager";
}

const variantLabels: Record<ArtVariant, string> = {
  flora: "FLORA",
  aurora: "AURORA",
  elysian: "ELYSIAN",
  nude: "NUDE",
  luna: "LUNA",
  kinfolk: "KINFOLK",
  studio: "STUDIO",
  materials: "MATERIAL",
  archive: "ARCHIVE",
};

const variantMarks: Record<ArtVariant, string> = {
  flora: "Pressed paper",
  aurora: "Campaign board",
  elysian: "Issue 01",
  nude: "Sleeve system",
  luna: "Social suite",
  kinfolk: "Print story",
  studio: "Studio marks",
  materials: "Material study",
  archive: "Archive folio",
};

export function ArtFrame({ variant, alt, ratio = "portrait", className = "", loading = "lazy" }: ArtFrameProps) {
  const { language } = useLanguage();

  return (
    <figure
      className={`art-frame art-frame--${variant} art-frame--${ratio} ${className}`}
      role="img"
      aria-label={alt[language]}
      data-loading={loading}
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
        <span>NB</span>
      </div>
      <div className="art-frame__ribbon" />
      <div className="art-frame__caption-strip">
        <span>{variantLabels[variant]}</span>
      </div>
    </figure>
  );
}
