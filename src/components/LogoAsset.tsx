import { Link } from "react-router-dom";

const FULL_LOGO_SRC = "/brand/nour-logo-full-transparent.png";
const FOOTER_LOGO_SRC = "/brand/nour-logo-footer-transparent.png";
const MONOGRAM_LOGO_SRC = "/brand/nour-logo-monogram-transparent.png";

type LogoAssetVariant = "header" | "intro" | "footer" | "hero";

interface LogoAssetProps {
  variant?: LogoAssetVariant;
  asLink?: boolean;
  className?: string;
  priority?: boolean;
}

function LogoImage({ variant, priority = false }: Pick<LogoAssetProps, "variant" | "priority">) {
  const logoVariant = variant ?? "header";
  const source = logoVariant === "footer" ? FOOTER_LOGO_SRC : FULL_LOGO_SRC;

  return (
    <picture>
      {logoVariant === "header" ? <source media="(max-width: 720px)" srcSet={MONOGRAM_LOGO_SRC} /> : null}
      <img
        className={`official-logo official-logo--${logoVariant}`}
        src={source}
        alt="Nour Bamarouf official logo"
        decoding="async"
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}

export function LogoAsset({ variant = "header", asLink = false, className = "", priority = false }: LogoAssetProps) {
  if (asLink) {
    return (
      <Link className={`official-logo-link official-logo-link--${variant} ${className}`} to="/" aria-label="Nour Bamarouf home">
        <LogoImage variant={variant} priority={priority} />
      </Link>
    );
  }

  return (
    <span className={`official-logo-wrap official-logo-wrap--${variant} ${className}`}>
      <LogoImage variant={variant} priority={priority} />
    </span>
  );
}
