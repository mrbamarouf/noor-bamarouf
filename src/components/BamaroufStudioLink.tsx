const BAMAROUF_STUDIO_URL = "https://bamaroufstudio.com";
const STUDIO_SYMBOL_SRC = "/brand/bamarouf-studio-symbol.png";
const STUDIO_LOCKUP_SRC = "/brand/bamarouf-studio-compact.png";

interface BamaroufStudioCopy {
  label: string;
  name: string;
  footerLine: string;
}

interface BamaroufStudioLinkProps {
  copy: BamaroufStudioCopy;
  variant: "header" | "menu" | "footer";
  onClick?: () => void;
}

export function BamaroufStudioLink({ copy, variant, onClick }: BamaroufStudioLinkProps) {
  const imageSrc = variant === "footer" ? STUDIO_LOCKUP_SRC : STUDIO_SYMBOL_SRC;

  return (
    <a
      className={`bamarouf-studio-link bamarouf-studio-link--${variant}`}
      href={BAMAROUF_STUDIO_URL}
      aria-label={copy.label}
      onClick={onClick}
    >
      <span className="bamarouf-studio-link__mark" aria-hidden="true">
        <img
          src={imageSrc}
          alt=""
          width={variant === "footer" ? "820" : "900"}
          height={variant === "footer" ? "1011" : "900"}
          loading="lazy"
          decoding="async"
        />
      </span>
      {variant !== "header" ? (
        <span className="bamarouf-studio-link__content">
          <span className="bamarouf-studio-link__name">{copy.name}</span>
          {variant === "footer" ? <span className="bamarouf-studio-link__line">{copy.footerLine}</span> : null}
        </span>
      ) : null}
    </a>
  );
}
