import { Link } from "react-router-dom";

const OFFICIAL_LOGO_SRC = "/brand-reference/nour-logo-official-crop.png";

type LogoAssetVariant = "header" | "intro" | "footer" | "hero";

interface LogoAssetProps {
  variant?: LogoAssetVariant;
  asLink?: boolean;
  className?: string;
  priority?: boolean;
}

function LogoImage({ variant, priority = false }: Pick<LogoAssetProps, "variant" | "priority">) {
  return (
    <img
      className={`official-logo official-logo--${variant ?? "header"}`}
      src={OFFICIAL_LOGO_SRC}
      alt="Nour Bamarouf official logo"
      decoding="async"
      loading={priority ? "eager" : "lazy"}
    />
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
