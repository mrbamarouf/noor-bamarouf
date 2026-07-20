import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { categoryOrder } from "../../data/content";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { CategoryKey } from "../../types";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

const workAssets: MobileAsset[] = [
  "hero", "cover", "hero", "cover",
  "cover", "hero", "hero", "cover",
  "hero", "cover", "hero", "hero",
];

export function MobileWorkPage() {
  const { dictionary, language } = useLanguage();
  const [category, setCategory] = useState<CategoryKey>("all");
  const words = mobileCopy[language];
  const availableCategories = useMemo(
    () => categoryOrder.filter((key) => key === "all" || projects.some((project) => project.category === key)),
    [],
  );
  const visible = category === "all" ? projects : projects.filter((project) => project.category === category);

  return (
    <div className="m-page m-work-page m-work-page--v2">
      <section className="m-room m-room--work-route" aria-labelledby="mobile-work-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.archiveLabel}</p>
          <h1 id="mobile-work-title">{words.archiveTitle}</h1>
          <span>{words.archiveBody}</span>
        </div>
        <div className="m-work-route__visual" data-reveal>
          <MobileVisual
            project={projects[2]}
            image={projects[2].heroImage}
            asset="hero"
            fit="cover"
            loading="eager"
            sizes="(max-width: 900px) 100vw, 1px"
          />
          <span>{String(projects.length).padStart(2, "0")} / {words.allProjects}</span>
        </div>
      </section>

      <div className="m-filter-shell m-filter-shell--v2">
        <p>{words.filterLabel}</p>
        <div className="m-filter-rail" role="tablist" aria-label={dictionary.ui.projectCategories}>
          {availableCategories.map((key) => (
            <button
              type="button"
              key={key}
              role="tab"
              aria-selected={category === key}
              className={category === key ? "is-active" : ""}
              onClick={() => setCategory(key)}
            >
              {dictionary.categories[key]}
            </button>
          ))}
        </div>
      </div>

      <section className="m-work-index m-work-index--v2" aria-live="polite">
        {visible.map((project) => {
          const index = projects.findIndex((item) => item.slug === project.slug);
          const title = getProjectDisplayTitle(project, language);
          const asset = workAssets[index];
          const image = asset === "hero" ? project.heroImage : project.coverImage;

          return (
            <Link
              key={project.slug}
              className={`m-work-project m-work-project--${index % 3}`}
              to={`/work/${project.slug}`}
              data-reveal
            >
              <div className="m-work-project__visual">
                <MobileVisual project={project} image={image} asset={asset} sizes="(max-width: 900px) 100vw, 1px" />
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="m-work-project__copy">
                <p>{dictionary.categories[project.category]} / {project.year}</p>
                <h2><bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi></h2>
                <span>{project.projectType[language]}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
