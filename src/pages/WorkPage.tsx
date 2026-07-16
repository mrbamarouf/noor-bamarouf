import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArtFrame } from "../components/ArtFrame";
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
      <section className="page-hero page-hero--work" aria-labelledby="work-title">
        <span className="section__index">{dictionary.nav.work}</span>
        <h1 id="work-title">{dictionary.nav.work}</h1>
        <p>{dictionary.home.selectedIntro}</p>
      </section>

      <section className="work-archive" aria-label={dictionary.home.archiveTitle}>
        <div className="filter-bar" role="list" aria-label="Project categories">
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
              <ArtFrame
                variant={project.heroImage.variant}
                alt={project.heroImage.alt}
                ratio={index % 3 === 0 ? "landscape" : index % 3 === 1 ? "portrait" : "square"}
              />
              <span>{project.year} / {dictionary.categories[project.category]}</span>
              <strong>{project.title}</strong>
              <p>{project.shortDescription[language]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
