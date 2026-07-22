import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getDesktopProjectCover, getProjectImageByAsset, getProjectThemeStyle } from "../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import type { Project } from "../types";
import { localizeMobileDigits } from "./MobileChapterSystem";
import { MobileVisual } from "./MobileVisual";

export function MobileArrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

export function MobileCtaLink({ className = "", children, ...props }: LinkProps) {
  return <Link className={`m-cta ${className}`} {...props}>{children}</Link>;
}

export function MobileExternalCta({ className = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`m-cta ${className}`} {...props}>{children}</a>;
}

export function MobilePageCopy({
  label,
  title,
  body,
  titleId,
  children,
  className = "",
}: {
  label?: string;
  title: string;
  body?: string;
  titleId: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`m-copy ${className}`}>
      {label ? <span className="m-copy__label">{label}</span> : null}
      <h1 id={titleId}>{title}</h1>
      {body ? <p>{body}</p> : null}
      {children}
    </div>
  );
}

export function MobileProjectSpread({ project, index, priority = false }: { project: Project; index: number; priority?: boolean }) {
  const { dictionary, language } = useLanguage();
  const cover = getDesktopProjectCover(project);
  const image = getProjectImageByAsset(project, cover.asset);

  return (
    <Link className="m-project-spread" to={`/work/${project.slug}`} style={getProjectThemeStyle(project) as CSSProperties}>
      <MobileVisual
        project={project}
        image={image}
        asset={cover.asset}
        fit={cover.fit}
        formatOverride={cover.format}
        loading={priority ? "eager" : "lazy"}
      />
      <div className="m-project-spread__caption">
        <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
        <strong dir={getProjectTitleDirection(project, language)}><bdi>{getProjectDisplayTitle(project, language)}</bdi></strong>
        <small>{project.year} / {dictionary.categories[project.category]}</small>
        <i><span>{dictionary.actions.openProject}</span> <MobileArrow /></i>
      </div>
    </Link>
  );
}
