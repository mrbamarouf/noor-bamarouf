import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getProjectImageByAsset, getProjectPresentation } from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { MobileChapterDefinition } from "../MobileChapterSystem";
import {
  getMobileChapterAnchor,
  localizeMobileDigits,
  MobileChapterController,
  MobileChapterSection,
} from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileProjectLine } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { getMobileProjectWorld } from "../mobileProjectWorlds";
import { mobileCopy } from "../mobileCopy";

function getWorkChapters(): MobileChapterDefinition[] {
  return [
    { id: getMobileChapterAnchor(0), title: { en: "Archive opening", ar: "افتتاحية الأرشيف" } },
    ...projects.slice(0, 5).map((project, index) => ({
      id: getMobileChapterAnchor(index + 1),
      title: { en: project.title, ar: project.displayTitle?.ar ?? project.title },
    })),
    { id: getMobileChapterAnchor(6), title: { en: "Project index", ar: "فهرس المشاريع" } },
    { id: getMobileChapterAnchor(7), title: { en: "Contact", ar: "التواصل" } },
  ];
}

function WorkSpotlight({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { dictionary, language } = useLanguage();
  const presentation = getProjectPresentation(project);
  const image = getProjectImageByAsset(project, presentation.hero.asset);
  const world = getMobileProjectWorld(project);

  return (
    <Link className="m-work-spotlight" to={`/work/${project.slug}`} style={world.style} data-project={project.slug}>
      <MobileVisual
        project={project}
        image={image}
        asset={presentation.hero.asset}
        fit={presentation.hero.fit ?? "contain"}
        formatOverride={presentation.hero.format}
        loading="eager"
      />
      <span className="m-work-spotlight__meta">
        <small dir="ltr">
          {localizeMobileDigits(String(index + 1).padStart(2, "0"), language)} / {localizeMobileDigits(String(projects.length).padStart(2, "0"), language)}
        </small>
        <strong>
          <bdi dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</bdi>
        </strong>
        <em>{dictionary.categories[project.category]}</em>
        <span>
          {dictionary.actions.openProject}
          <MobileArrow />
        </span>
      </span>
    </Link>
  );
}

export function MobileWorkPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const chapters = getWorkChapters();
  const total = chapters.length;
  const categoryCount = new Set(projects.map((project) => project.category)).size;

  return (
    <MobileChapterController chapters={chapters} className="m-work-page">
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-work-intro">
        <div className="m-chapter-copy">
          <p>{dictionary.nav.work}</p>
          <h1 id={`${chapters[0].id}-title`}>
            {language === "ar" ? "أرشيف بصري لعوالم مختلفة." : "A curated archive of visual worlds."}
          </h1>
          <p>
            {language === "ar"
              ? "مشاريع في الهوية والتغليف والمطبوعات والتصميم التحريري والتواصل الاجتماعي، لكل مشروع لغته الخاصة."
              : "Identity, packaging, print, editorial, and social work, each project shaped through its own visual language."}
          </p>
        </div>
        <div className="m-metrics m-metrics--work">
          <span>
            <strong>{localizeMobileDigits(String(projects.length), language)}</strong>
            <small>{words.projects}</small>
          </span>
          <span>
            <strong>{localizeMobileDigits(String(categoryCount), language)}</strong>
            <small>{words.categories}</small>
          </span>
        </div>
      </MobileChapterSection>

      {projects.slice(0, 5).map((project, index) => (
        <MobileChapterSection key={project.slug} chapter={chapters[index + 1]} index={index + 1} total={total} className="m-work-project">
          <WorkSpotlight project={project} index={index} />
        </MobileChapterSection>
      ))}

      <MobileChapterSection chapter={chapters[6]} index={6} total={total} className="m-work-index">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[6].id}-title`}>{words.allProjects}</h2>
          <p>{dictionary.home.workNote}</p>
        </div>
        <div className="m-line-list">
          {projects.map((project, index) => (
            <MobileProjectLine key={project.slug} project={project} index={index} />
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[7]} index={7} total={total} className="m-global-end">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
