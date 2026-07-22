import type { AnchorHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import type { Project } from "../types";
import { localizeMobileDigits } from "./MobileChapterSystem";

export function MobileArrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

export function MobileCtaLink({ className = "", children, ...props }: LinkProps) {
  return (
    <Link className={`m-cta ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function MobileExternalCta({
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`m-cta ${className}`} {...props}>
      {children}
    </a>
  );
}

export function MobileProjectLine({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

  return (
    <Link className="m-project-line" to={`/work/${project.slug}`}>
      <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
      <strong dir={getProjectTitleDirection(project, language)}>
        <bdi>{getProjectDisplayTitle(project, language)}</bdi>
      </strong>
      <small>{dictionary.categories[project.category]}</small>
    </Link>
  );
}
