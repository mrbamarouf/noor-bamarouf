const DECORATIVE_NB_LOGO = "/brand/noor-final/noor-nb-decorative.png";

interface DecorativeNbLogoProps {
  className?: string;
  priority?: boolean;
}

export function DecorativeNbLogo({ className = "", priority = false }: DecorativeNbLogoProps) {
  return (
    <img
      className={`decorative-nb-logo ${className}`}
      src={DECORATIVE_NB_LOGO}
      alt=""
      width="270"
      height="327"
      decoding="async"
      loading={priority ? "eager" : "lazy"}
    />
  );
}
