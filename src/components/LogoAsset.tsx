import { Link } from "react-router-dom";

const APPROVED_LOGO_SRC = "/brand/noor-bamarouf-approved-logo.png";

type LogoAssetVariant = "header" | "intro" | "footer" | "hero";

interface LogoAssetProps {
  variant?: LogoAssetVariant;
  asLink?: boolean;
  className?: string;
  priority?: boolean;
}

function LogoImage({ variant, priority = false }: Pick<LogoAssetProps, "variant" | "priority">) {
  const logoVariant = variant ?? "header";

  return (
    <img
      className={`official-logo official-logo--${logoVariant}`}
      src={APPROVED_LOGO_SRC}
      alt="Noor Bamarouf official logo"
      width="2172"
      height="724"
      decoding="async"
      loading={priority ? "eager" : "lazy"}
    />
  );
}

export function LogoAsset({ variant = "header", asLink = false, className = "", priority = false }: LogoAssetProps) {
  if (asLink) {
    return (
      <Link className={`official-logo-link official-logo-link--${variant} ${className}`} to="/" aria-label="Noor Bamarouf home">
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
