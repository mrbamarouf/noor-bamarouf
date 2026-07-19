import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import type { Project } from "../types";
import { mobileCopy } from "./mobileCopy";
import { MobileVisual, type MobileAsset } from "./MobileVisual";

export function MobileChapterHeader({
  number,
  label,
  title,
  text,
  id,
  tone = "light",
}: {
  number: string;
  label: string;
  title: string;
  text?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <header className={`m-chapter-head m-chapter-head--${tone}`} data-reveal>
      <p className="m-chapter-label">
        <span>{number}</span>
        <span>{label}</span>
      </p>
      <h2 id={id}>{title}</h2>
      {text ? <p className="m-chapter-summary">{text}</p> : null}
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

export type MobileProjectMode = "cinematic" | "folio" | "poster" | "strip";

export function MobileProjectFeature({
  project,
  index,
  mode,
  asset = "cover",
}: {
  project: Project;
  index: number;
  mode: MobileProjectMode;
  asset?: MobileAsset;
}) {
  const { dictionary, language } = useLanguage();
  const image = asset === "hero" ? project.heroImage : project.coverImage;
  const title = getProjectDisplayTitle(project, language);

  return (
    <article className={`m-project-feature m-project-feature--${mode}`} data-project={project.slug} data-reveal>
      <Link to={`/work/${project.slug}`} aria-label={`${dictionary.actions.openProject}: ${title}`}>
        <div className="m-project-feature__visual">
          <MobileVisual project={project} image={image} asset={asset} sizes="(max-width: 900px) 100vw, 1px" />
          <span className="m-project-feature__number" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="m-project-feature__copy">
          <p>{dictionary.categories[project.category]} <span aria-hidden="true">/</span> {project.year}</p>
          <h3><bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi></h3>
          <span className="m-project-feature__type">{project.projectType[language]}</span>
          <span className="m-project-feature__open">
            {dictionary.actions.openProject}
            <i aria-hidden="true">{language === "ar" ? "←" : "→"}</i>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function MobileArchiveRow({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);

  return (
    <Link className="m-archive-row" to={`/work/${project.slug}`} data-reveal>
      <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      <span className="m-archive-row__title"><bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi></span>
      <small>{dictionary.categories[project.category]}</small>
      <i aria-hidden="true">{language === "ar" ? "←" : "→"}</i>
    </Link>
  );
}

export function MobileSectionRule({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <p className="m-section-rule">
      <span>{children}</span>
      <span aria-hidden="true">{mobileCopy[language].issue}</span>
    </p>
  );
}
