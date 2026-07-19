import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { categoryOrder } from "../../data/content";
import { projects } from "../../data/projects";
import type { CategoryKey } from "../../types";
import { MobileChapterHeader, MobileProjectFeature, type MobileProjectMode } from "../MobilePrimitives";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

const workModes: MobileProjectMode[] = [
  "cinematic", "poster", "strip", "folio",
  "cinematic", "poster", "strip", "folio",
  "cinematic", "strip", "poster", "folio",
];

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
    <div className="m-page m-work-page">
      <section className="m-route-cover" aria-labelledby="mobile-work-title">
        <div className="m-route-cover__copy">
          <MobileChapterHeader
            id="mobile-work-title"
            number="01"
            label={words.archiveLabel}
            title={words.archiveTitle}
            text={words.archiveBody}
          />
        </div>
        <div className="m-route-cover__visual" data-reveal>
          <MobileVisual project={projects[2]} image={projects[2].heroImage} asset="hero" loading="eager" sizes="(max-width: 900px) 100vw, 1px" />
          <span>{String(projects.length).padStart(2, "0")} / {words.allProjects}</span>
        </div>
      </section>

      <div className="m-filter-shell">
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

      <section className="m-work-index" aria-live="polite">
        {visible.map((project) => {
          const index = projects.findIndex((item) => item.slug === project.slug);
          return (
            <MobileProjectFeature
              key={project.slug}
              project={project}
              index={index}
              mode={workModes[index]}
              asset={workAssets[index]}
            />
          );
        })}
      </section>
    </div>
  );
}
