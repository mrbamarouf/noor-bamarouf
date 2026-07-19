import { useMemo, useState } from "react";
import { categoryOrder } from "../../data/content";
import { projects } from "../../data/projects";
import { useLanguage } from "../../context/LanguageContext";
import type { CategoryKey } from "../../types";
import { MobileChapterHeading, MobileProjectCard } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

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
      <section className="m-inner-hero m-inner-hero--work">
        <MobileChapterHeading number="01" label={words.projectArchive} title={dictionary.nav.work} text={words.archiveIntro} />
        <div className="m-work-page__cover" data-reveal>
          <MobileVisual project={projects[0]} image={projects[0].heroImage} asset="hero" loading="eager" />
        </div>
      </section>

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

      <section className="m-work-page__archive" aria-live="polite">
        {visible.map((project) => {
          const index = projects.findIndex((item) => item.slug === project.slug);
          return <MobileProjectCard key={project.slug} project={project} index={index} layout={index % 3 === 0 ? "full" : index % 3 === 1 ? "inset" : "offset"} />;
        })}
      </section>
    </div>
  );
}
