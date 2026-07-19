import { Link } from "react-router-dom";

const APPROVED_LOGO_SOURCES = {
  header: "/brand/noor-final/noor-nb-header-desktop.png",
  mobileHeader: "/brand/noor-final/noor-nb-header-mobile.png",
  menu: "/brand/noor-final/noor-nb-menu.png",
  intro: "/brand/noor-final/noor-nb-intro.png",
  footer: "/brand/noor-final/noor-nb-footer.png",
  hero: "/brand/noor-final/noor-nb-master.png",
} as const;

type LogoAssetVariant = keyof typeof APPROVED_LOGO_SOURCES;

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
      src={APPROVED_LOGO_SOURCES[logoVariant]}
      alt="Noor Bamarouf official logo"
      width="1200"
      height="1200"
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
