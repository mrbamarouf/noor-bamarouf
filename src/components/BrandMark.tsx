import { Link } from "react-router-dom";

type BrandMarkVariant = "full" | "compact" | "stacked";

interface BrandMarkProps {
  variant?: BrandMarkVariant;
  asLink?: boolean;
  className?: string;
}

function Monogram() {
  return (
    <span className="brand-monogram" aria-hidden="true">
      <span className="brand-monogram__n">N</span>
      <span className="brand-monogram__b">B</span>
      <svg className="brand-branch" viewBox="0 0 120 92" focusable="false" aria-hidden="true">
        <path className="branch-stem" d="M9 74 C31 61 45 40 61 10" />
        <path className="branch-stem" d="M40 48 C58 49 72 41 87 25" />
        <path className="branch-leaf" d="M57 10 C76 10 88 0 95 0 C91 16 76 27 61 25 C58 19 57 14 57 10Z" />
        <path className="branch-leaf" d="M81 25 C98 24 109 15 116 16 C111 31 96 39 84 36 C82 32 81 28 81 25Z" />
        <path className="branch-leaf" d="M35 53 C48 53 57 45 63 45 C59 58 49 66 38 62 C36 59 35 56 35 53Z" />
        <path className="branch-leaf" d="M23 65 C35 67 43 61 49 62 C43 74 33 79 24 74 C23 70 23 67 23 65Z" />
      </svg>
    </span>
  );
}

function MarkContent({ variant }: { variant: BrandMarkVariant }) {
  return (
    <span className={`brand-mark brand-mark--${variant}`}>
      <Monogram />
      {variant !== "compact" ? (
        <span className="brand-wordmark-wrap">
          <span className="brand-wordmark" aria-label="Nour Bamarouf">
            <span>NOUR</span>
            <span>BAMAROUF</span>
          </span>
          <span className="brand-descriptor">
            <span />
            GRAPHIC DESIGN
            <span />
          </span>
        </span>
      ) : (
        <span className="sr-only">Nour Bamarouf</span>
      )}
    </span>
  );
}

export function BrandMark({ variant = "full", asLink = false, className = "" }: BrandMarkProps) {
  if (asLink) {
    return (
      <Link to="/" className={`brand-link ${className}`} aria-label="Nour Bamarouf home">
        <MarkContent variant={variant} />
      </Link>
    );
  }

  return (
    <span className={className}>
      <MarkContent variant={variant} />
    </span>
  );
}
