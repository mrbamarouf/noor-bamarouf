import { useMemo, useState } from "react";
import { LogoAsset } from "../../components/LogoAsset";
import { useLanguage } from "../../context/LanguageContext";
import { categoryOrder } from "../../data/content";
import { getProjectImageByAsset } from "../../data/projectPresentation";
import { projects } from "../../data/projects";
import type { CategoryKey } from "../../types";
import { localizeMobileDigits, makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobilePageCopy, MobileProjectSpread } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileWorkHeroCopy } from "../mobileCopy";

function requireWorkProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing mobile Work hero project: ${slug}`);
  return project;
}

const workHeroMoments = {
  primary: { project: requireWorkProject("wemo-delights"), asset: "hero" as const },
  accent: { project: requireWorkProject("ansab-holding"), asset: "cover" as const },
};

export function MobileWorkPage() {
  const { dictionary, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const copy = mobileWorkHeroCopy[language];
  const availableCategories = useMemo(
    () => categoryOrder.filter((category) => category === "all" || projects.some((project) => project.category === category)),
    [],
  );
  const filtered = useMemo(
    () => activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );
  const categoryCount = useMemo(() => new Set(projects.map((project) => project.category)).size, []);
  const chapters = useMemo(() => makeMobileChapters([
    ["Selected work", "أعمال مختارة"],
    ["Archive filters", "تصنيف الأرشيف"],
    ...filtered.map((project) => [project.title, project.displayTitle?.ar ?? project.title] as [string, string]),
    ["Footer", "التذييل"],
  ]), [filtered]);

  return (
    <MobileChapterController chapters={chapters} className="m-work">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-work-hero">
        <MobilePageCopy label={copy.label} title={copy.title} body={copy.body} titleId={`${chapters[0].id}-title`} />
        <div className="m-work-hero__art" aria-hidden="true">
          <MobileVisual
            className="m-work-hero__work m-work-hero__work--primary"
            project={workHeroMoments.primary.project}
            image={getProjectImageByAsset(workHeroMoments.primary.project, workHeroMoments.primary.asset)}
            asset={workHeroMoments.primary.asset}
            fit="cover"
            loading="eager"
          />
          <MobileVisual
            className="m-work-hero__work m-work-hero__work--accent"
            project={workHeroMoments.accent.project}
            image={getProjectImageByAsset(workHeroMoments.accent.project, workHeroMoments.accent.asset)}
            asset={workHeroMoments.accent.asset}
            fit="contain"
            loading="eager"
          />
          <LogoAsset className="m-work-hero__mark" variant="hero" priority />
        </div>
        <dl className="m-metrics m-metrics--two">
          <div><dd>{localizeMobileDigits(String(projects.length), language)}</dd><dt>{copy.projectLabel}</dt></div>
          <div><dd>{localizeMobileDigits(String(categoryCount), language)}</dd><dt>{copy.categoryLabel}</dt></div>
        </dl>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-work-filter">
        <MobilePageCopy label={dictionary.ui.projectCategories} title={dictionary.home.archiveTitle} body={dictionary.home.workNote} titleId={`${chapters[1].id}-title`} />
        <div className="m-filter-grid" role="list" aria-label={dictionary.ui.projectCategories}>
          {availableCategories.map((category) => (
            <button key={category} type="button" className={activeCategory === category ? "is-active" : ""} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
              {dictionary.categories[category]}
            </button>
          ))}
        </div>
        <p className="m-work-filter__result">{localizeMobileDigits(String(filtered.length), language)} {copy.projectLabel}</p>
      </MobileChapterSection>

      {filtered.map((project, index) => {
        const absoluteIndex = projects.findIndex((item) => item.slug === project.slug);
        return (
          <MobileChapterSection key={project.slug} chapter={chapters[index + 2]} index={index + 2} total={chapters.length} className={`m-work-project m-work-project--${project.slug}`}>
            <MobileProjectSpread project={project} index={absoluteIndex} priority={index < 2} />
          </MobileChapterSection>
        );
      })}

      <MobileChapterSection chapter={chapters[chapters.length - 1]} index={chapters.length - 1} total={chapters.length} className="m-footer-page">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
