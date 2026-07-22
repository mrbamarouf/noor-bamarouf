import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { DecorativeNbLogo } from "../../components/DecorativeNbLogo";
import { useLanguage } from "../../context/LanguageContext";
import { categoryOrder } from "../../data/content";
import { getDesktopProjectCover, getProjectImageByAsset, getProjectThemeStyle } from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { CategoryKey, Project } from "../../types";
import {
  localizeMobileDigits,
  makeMobileChapters,
  MobileChapterController,
  MobileChapterSection,
} from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink, MobileProjectLine } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileWorkHeroCopy } from "../mobileCopy";

function ProjectSpotlight({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();
  const cover = getDesktopProjectCover(project);
  const image = getProjectImageByAsset(project, cover.asset);
  const title = getProjectDisplayTitle(project, language);

  return (
    <Link className="m-work-spotlight" to={`/work/${project.slug}`} style={getProjectThemeStyle(project) as CSSProperties}>
      <MobileVisual
        project={project}
        image={image}
        asset={cover.asset}
        fit={cover.fit}
        formatOverride={cover.format}
        loading={index < 2 ? "eager" : "lazy"}
      />
      <span className="m-work-spotlight__meta">
        <small dir="ltr">
          {localizeMobileDigits(String(index + 1).padStart(2, "0"), language)} /{" "}
          {localizeMobileDigits(String(projects.length).padStart(2, "0"), language)}
        </small>
        <strong dir={getProjectTitleDirection(project, language)}>
          <bdi>{title}</bdi>
        </strong>
        <em>{project.year} / {dictionary.categories[project.category]}</em>
        <span>
          {dictionary.actions.openProject} <MobileArrow />
        </span>
      </span>
    </Link>
  );
}

export function MobileWorkPage() {
  const { dictionary, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const copy = mobileWorkHeroCopy[language];
  const availableCategories = useMemo(
    () => categoryOrder.filter((category) => category === "all" || projects.some((project) => project.category === category)),
    [],
  );
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);
  const categoryCount = useMemo(() => new Set(projects.map((project) => project.category)).size, []);
  const chapters = useMemo(
    () =>
      makeMobileChapters([
        ["Selected Work", "أعمال مختارة"],
        ["Project Filters", "تصنيف الأعمال"],
        ...projects.map((project) => [project.title, project.displayTitle?.ar ?? project.title] as [string, string]),
        ["Archive Index", "فهرس الأرشيف"],
        ["Footer", "التذييل"],
      ]),
    [],
  );
  const total = chapters.length;

  return (
    <MobileChapterController chapters={chapters} className="m-work-page">
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-work-intro">
        <div className="m-section-copy">
          <span>{copy.label}</span>
          <h1 id={`${chapters[0].id}-title`}>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
        <DecorativeNbLogo className="m-work-intro__mark" priority />
        <dl className="m-metrics m-metrics--work">
          <div>
            <dd>{localizeMobileDigits(String(projects.length), language)}</dd>
            <dt>{copy.projectLabel}</dt>
          </div>
          <div>
            <dd>{localizeMobileDigits(String(categoryCount), language)}</dd>
            <dt>{copy.categoryLabel}</dt>
          </div>
        </dl>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={total} className="m-work-filters">
        <div className="m-section-copy">
          <span>{dictionary.ui.projectCategories}</span>
          <h2 id={`${chapters[1].id}-title`}>{dictionary.home.archiveTitle}</h2>
          <p>{dictionary.home.workNote}</p>
        </div>
        <div className="m-filter-row" role="list" aria-label={dictionary.ui.projectCategories}>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "is-active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {dictionary.categories[category]}
            </button>
          ))}
        </div>
        <div className="m-line-list">
          {filteredProjects.map((project) => (
            <MobileProjectLine key={project.slug} project={project} index={projects.findIndex((item) => item.slug === project.slug)} />
          ))}
        </div>
      </MobileChapterSection>

      {projects.map((project, index) => (
        <MobileChapterSection key={project.slug} chapter={chapters[index + 2]} index={index + 2} total={total} className="m-work-project">
          <ProjectSpotlight project={project} index={index} />
        </MobileChapterSection>
      ))}

      <MobileChapterSection chapter={chapters[projects.length + 2]} index={projects.length + 2} total={total} className="m-work-index">
        <div className="m-section-copy">
          <span>{dictionary.home.archiveTitle}</span>
          <h2 id={`${chapters[projects.length + 2].id}-title`}>{dictionary.actions.viewAllProjects}</h2>
        </div>
        <div className="m-line-list m-line-list--dense">
          {projects.map((project, index) => (
            <MobileProjectLine key={project.slug} project={project} index={index} />
          ))}
        </div>
        <MobileCtaLink to="/contact">
          {dictionary.actions.startProject} <MobileArrow />
        </MobileCtaLink>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[projects.length + 3]} index={projects.length + 3} total={total} className="m-footer-chapter">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
