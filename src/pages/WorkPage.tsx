import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DecorativeNbLogo } from "../components/DecorativeNbLogo";
import { ProjectVisual } from "../components/ProjectVisual";
import { categoryOrder } from "../data/content";
import { getDesktopProjectCover, getProjectImageByAsset, getProjectThemeStyle } from "../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { CategoryKey } from "../types";
import type { CSSProperties } from "react";

const workHeroCopy = {
  en: {
    label: "SELECTED WORK",
    title: "A curated archive of visual worlds.",
    body: "Identity, packaging, print, editorial, and social work, each project shaped through its own visual language.",
    projectLabel: "Projects",
    categoryLabel: "Categories",
  },
  ar: {
    label: "أعمال مختارة",
    title: "أرشيف بصري لعوالم مختلفة.",
    body: "مشاريع في الهوية والتغليف والمطبوعات والتصميم التحريري والتواصل الاجتماعي، لكل مشروع لغته البصرية الخاصة.",
    projectLabel: "مشروعًا",
    categoryLabel: "فئات",
  },
} as const;

export function WorkPage() {
  const { dictionary, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const heroCopy = workHeroCopy[language];
  const numberFormatter = useMemo(() => new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US"), [language]);

  const availableCategories = useMemo(
    () => categoryOrder.filter((category) => category === "all" || projects.some((project) => project.category === category)),
    [],
  );

  const projectCount = projects.length;
  const categoryCount = useMemo(() => new Set(projects.map((project) => project.category)).size, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="desktop-page desktop-work">
      <section className="desktop-work__hero" aria-labelledby="desktop-work-title" data-reveal>
        <div className="desktop-work__hero-copy desktop-section-flow">
          <span className="desktop-kicker">{heroCopy.label}</span>
          <h1 id="desktop-work-title">{heroCopy.title}</h1>
          <p>{heroCopy.body}</p>
          <dl className="desktop-work__hero-metrics" aria-label={dictionary.home.archiveTitle}>
            <div>
              <dt>{heroCopy.projectLabel}</dt>
              <dd>{numberFormatter.format(projectCount)}</dd>
            </div>
            <div>
              <dt>{heroCopy.categoryLabel}</dt>
              <dd>{numberFormatter.format(categoryCount)}</dd>
            </div>
          </dl>
        </div>
        <div className="desktop-work__hero-identity" aria-hidden="true">
          <DecorativeNbLogo priority />
        </div>
      </section>

      <section className="desktop-work__archive" aria-label={dictionary.home.archiveTitle} data-reveal>
        <div className="desktop-filter" role="list" aria-label={dictionary.ui.projectCategories}>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "desktop-filter__button desktop-filter__button--active" : "desktop-filter__button"}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {dictionary.categories[category]}
            </button>
          ))}
        </div>

        <div className="desktop-work-grid" aria-live="polite">
          {filteredProjects.map((project, index) => {
            const title = getProjectDisplayTitle(project, language);
            const absoluteIndex = projects.findIndex((item) => item.slug === project.slug);
            const cover = getDesktopProjectCover(project);
            const coverImage = getProjectImageByAsset(project, cover.asset);
            const themeStyle = getProjectThemeStyle(project) as CSSProperties;

            return (
              <Link
                to={`/work/${project.slug}`}
                className="desktop-work-tile"
                key={project.slug}
                data-cursor="view"
                style={themeStyle}
              >
                <ProjectVisual
                  image={coverImage}
                  projectSlug={project.slug}
                  asset={cover.asset}
                  ratio={cover.ratio}
                  fit={cover.fit}
                  formatOverride={cover.format}
                  loading={index < 4 ? "eager" : "lazy"}
                  preserveAspect={false}
                />
                <div>
                  <span dir="ltr">{String(absoluteIndex + 1).padStart(2, "0")}</span>
                  <strong dir={getProjectTitleDirection(project, language)}>{title}</strong>
                  <small>{project.year} / {dictionary.categories[project.category]}</small>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
