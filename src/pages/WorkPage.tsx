import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectVisual } from "../components/ProjectVisual";
import { categoryOrder } from "../data/content";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { CategoryKey } from "../types";

export function WorkPage() {
  const { dictionary, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="page page--work">
      <section className="page-hero page-hero--work" aria-labelledby="work-title" data-reveal>
        <span className="section__index">{dictionary.nav.work}</span>
        <h1 id="work-title">{dictionary.nav.work}</h1>
        <p>{dictionary.home.selectedIntro}</p>
      </section>

      <section className="work-archive" aria-label={dictionary.home.archiveTitle} data-reveal>
        <div className="filter-bar" role="list" aria-label={dictionary.ui.projectCategories}>
          {categoryOrder.map((category) => (
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

        <div className="archive-layout" aria-live="polite">
          {filteredProjects.map((project, index) => (
            <Link
              to={`/work/${project.slug}`}
              className={`archive-item archive-item--${index % 3}`}
              key={project.slug}
              data-cursor="view"
            >
              <ProjectVisual
                image={project.coverImage}
                projectSlug={project.slug}
                asset="cover"
                ratio={index % 3 === 0 ? "landscape" : index % 3 === 1 ? "portrait" : "square"}
              />
              <span>{project.year} / {dictionary.categories[project.category]}</span>
              <strong dir="ltr">{project.title}</strong>
              <p>{project.shortDescription[language]}</p>
            </Link>
          ))}
        </div>
        <p className="work-note">{dictionary.home.workNote}</p>
      </section>
    </div>
  );
}
