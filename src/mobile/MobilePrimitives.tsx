import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { Project } from "../types";
import { MobileVisual } from "./MobileVisual";
import { mobileCopy } from "./mobileCopy";

export function MobileChapterHeading({
  number,
  label,
  title,
  text,
  align = "start",
  id,
}: {
  number: string;
  label: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  id?: string;
}) {
  const { language } = useLanguage();
  return (
    <header className={`m-chapter-heading m-chapter-heading--${align}`} data-reveal>
      <p className="m-kicker"><span>{mobileCopy[language].chapter} {number}</span><span>{label}</span></p>
      <h2 id={id}>{title}</h2>
      {text ? <p className="m-chapter-heading__text">{text}</p> : null}
    </header>
  );
}

export function MobileTextLink({ to, children }: { to: string; children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <Link className="m-text-link" to={to}>
      <span>{children}</span>
      <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
    </Link>
  );
}

export function MobileProjectCard({ project, index, layout = "inset" }: { project: Project; index: number; layout?: "full" | "inset" | "offset" }) {
  const { dictionary, language } = useLanguage();
  return (
    <article className={`m-project-card m-project-card--${layout}`} data-reveal>
      <Link to={`/work/${project.slug}`} aria-label={`${dictionary.actions.openProject}: ${getProjectDisplayTitle(project, language)}`}>
        <MobileVisual project={project} image={project.coverImage} asset="cover" />
        <div className="m-project-card__meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{dictionary.categories[project.category]} / {project.year}</span>
        </div>
        <h3 dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</h3>
        <p>{project.projectType[language]}</p>
        <span className="m-project-card__action">{dictionary.actions.openProject}<i aria-hidden="true">{language === "ar" ? "←" : "→"}</i></span>
      </Link>
    </article>
  );
}
