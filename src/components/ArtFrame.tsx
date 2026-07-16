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

export function ArtFrame({ variant, alt, ratio = "portrait", className = "", loading = "lazy" }: ArtFrameProps) {
  const { language } = useLanguage();

  return (
    <figure
      className={`art-frame art-frame--${variant} art-frame--${ratio} ${className}`}
      role="img"
      aria-label={alt[language]}
      data-loading={loading}
    >
      <div className="art-frame__wash" />
      <div className="art-frame__shadow-leaf leaf-one" />
      <div className="art-frame__shadow-leaf leaf-two" />
      <div className="art-frame__object object-main">
        <span>{variantLabels[variant]}</span>
      </div>
      <div className="art-frame__object object-paper" />
      <div className="art-frame__object object-vase">
        <span />
      </div>
      <div className="art-frame__stem stem-one" />
      <div className="art-frame__stem stem-two" />
      <div className="art-frame__dot dot-one" />
      <div className="art-frame__dot dot-two" />
      <div className="art-frame__dot dot-three" />
    </figure>
  );
}
