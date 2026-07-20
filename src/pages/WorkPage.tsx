import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectVisual } from "../components/ProjectVisual";
import { categoryOrder } from "../data/content";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { CategoryKey } from "../types";

export function WorkPage() {
  const { dictionary, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const availableCategories = useMemo(
    () => categoryOrder.filter((category) => category === "all" || projects.some((project) => project.category === category)),
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="page page--work work-page--v2">
      <section className="work-v2-hero" aria-labelledby="work-title" data-reveal>
        <div className="work-v2-hero__copy">
          <span className="section__index">{dictionary.nav.work}</span>
          <h1 id="work-title">{dictionary.nav.work}</h1>
          <p>{dictionary.home.selectedIntro}</p>
        </div>
        <div className="work-v2-hero__visual" aria-hidden="true">
          <ProjectVisual image={projects[0].heroImage} projectSlug={projects[0].slug} asset="hero" ratio="wide" />
        </div>
      </section>

      <section className="work-v2-archive" aria-label={dictionary.home.archiveTitle} data-reveal>
        <div className="filter-bar" role="list" aria-label={dictionary.ui.projectCategories}>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "filter-button filter-button--active" : "filter-button"}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {dictionary.categories[category]}
            </button>
          ))}
        </div>

        <div className="work-v2-grid" aria-live="polite">
          {filteredProjects.map((project, index) => {
            const title = getProjectDisplayTitle(project, language);

            return (
              <Link
                to={`/work/${project.slug}`}
                className={`work-v2-card work-v2-card--${index % 5}`}
                key={project.slug}
                data-cursor="view"
              >
                <ProjectVisual
                  image={project.coverImage}
                  projectSlug={project.slug}
                  asset="cover"
                  ratio={index % 5 === 0 ? "landscape" : index % 5 === 1 ? "portrait" : "square"}
                />
                <span dir="ltr">{String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0")}</span>
                <strong dir={getProjectTitleDirection(project, language)}>{title}</strong>
                <em>{project.year} / {dictionary.categories[project.category]}</em>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
