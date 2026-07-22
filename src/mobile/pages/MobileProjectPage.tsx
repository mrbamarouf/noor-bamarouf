import { useMemo, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  getProjectImageByAsset,
  getProjectPresentation,
  getProjectThemeStyle,
  type PresentationSection,
  type PresentationVisual,
} from "../../data/projectPresentation";
import {
  getProject,
  getProjectDisplayTitle,
  getProjectTitleDirection,
  projects,
} from "../../data/projects";
import type { Language, LocalizedString, Project } from "../../types";
import {
  localizeMobileDigits,
  MobileChapterController,
  MobileChapterSection,
  type MobileChapterDefinition,
} from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow } from "../MobilePrimitives";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { mobileProjectCopy } from "../mobileCopy";

function chapterTitle(en: string, ar: string): LocalizedString {
  return { en, ar };
}

function resolveSectionCopy(project: Project, section: PresentationSection, language: Language) {
  if (section.copy) return section.copy[language];
  if (section.copyKey) return project.caseStudy[section.copyKey][language];
  return undefined;
}

function getSectionVisualChunks(section: PresentationSection) {
  const chunkSize = section.layout === "stack" ? 1 : 2;
  const chunks: PresentationVisual[][] = [];

  for (let index = 0; index < section.visuals.length; index += chunkSize) {
    chunks.push(section.visuals.slice(index, index + chunkSize));
  }

  return chunks.length ? chunks : [[]];
}

type ProjectChapterKind =
  | "direction"
  | "final"
  | "hero"
  | "meta"
  | "overview"
  | "section"
  | "system"
  | "video";

interface ProjectFlowChapter extends MobileChapterDefinition {
  kind: ProjectChapterKind;
  section?: PresentationSection;
  visuals?: PresentationVisual[];
  partIndex?: number;
}

function buildProjectFlow(project: Project): ProjectFlowChapter[] {
  const presentation = getProjectPresentation(project);
  const flow: ProjectFlowChapter[] = [];
  const nextId = () => `chapter-${String(flow.length + 1).padStart(2, "0")}`;

  flow.push({
    id: nextId(),
    title: chapterTitle(project.title, project.displayTitle?.ar ?? project.title),
    kind: "hero",
  });
  flow.push({
    id: nextId(),
    title: chapterTitle("Project details", "تفاصيل المشروع"),
    kind: "meta",
  });
  flow.push({
    id: nextId(),
    title: chapterTitle("Overview", "نظرة عامة"),
    kind: "overview",
  });
  flow.push({
    id: nextId(),
    title: chapterTitle("Creative direction", "التوجيه الإبداعي"),
    kind: "direction",
  });

  if (project.video) {
    flow.push({
      id: nextId(),
      title: project.video.label,
      kind: "video",
    });
  }

  presentation.sections.forEach((section) => {
    getSectionVisualChunks(section).forEach((visuals, partIndex) => {
      flow.push({
        id: nextId(),
        title: section.label,
        kind: "section",
        section,
        visuals,
        partIndex,
      });
    });
  });

  flow.push({
    id: nextId(),
    title: chapterTitle("Design system", "نظام التصميم"),
    kind: "system",
  });
  flow.push({
    id: nextId(),
    title: chapterTitle("Final presentation", "العرض الختامي"),
    kind: "final",
  });

  return flow;
}

function ProjectVisualUnit({ project, visual }: { project: Project; visual: PresentationVisual }) {
  const asset = (visual.source ?? visual.asset) as MobileAsset;
  const image = getProjectImageByAsset(project, asset);

  return (
    <MobileVisual
      project={project}
      image={image}
      asset={asset}
      fit={visual.fit ?? "contain"}
      formatOverride={visual.format}
      className={`m-case-visual m-case-visual--${visual.kind}`}
      loading="eager"
    />
  );
}

function ProjectHeroChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();
  const presentation = getProjectPresentation(project);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);
  const heroAsset = (presentation.hero.source ?? presentation.hero.asset) as MobileAsset;
  const heroImage = getProjectImageByAsset(project, heroAsset);

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className={`m-project-hero m-project-hero--${project.slug}`}>
      <div className="m-project-hero__nav">
        <Link to="/work">
          <MobileArrow />
          <span>{dictionary.actions.backToWork}</span>
        </Link>
        <span dir="ltr">
          {localizeMobileDigits(String(projectIndex + 1).padStart(2, "0"), language)} / {localizeMobileDigits(String(projects.length).padStart(2, "0"), language)}
        </span>
      </div>
      <div className="m-project-hero__visual">
        <MobileVisual
          project={project}
          image={heroImage}
          asset={heroAsset}
          fit={presentation.hero.fit ?? "contain"}
          formatOverride={presentation.hero.format}
          loading="eager"
        />
      </div>
      <div className="m-project-hero__copy">
        <p>{dictionary.categories[project.category]} / {project.year}</p>
        <h1 id={`${chapter.id}-title`}>
          <bdi dir={titleDirection}>{title}</bdi>
        </h1>
        <span>{project.shortDescription[language]}</span>
      </div>
    </MobileChapterSection>
  );
}

function ProjectMetaChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-meta">
      <div className="m-chapter-copy">
        <p>{dictionary.sections.overview}</p>
        <h2 id={`${chapter.id}-title`}>{chapter.title[language]}</h2>
        <p>{project.fullDescription[language]}</p>
      </div>
      <dl className="m-project-facts">
        <div>
          <dt>{dictionary.nav.services}</dt>
          <dd>{project.services.map((service) => dictionary.services[service].title).join(" · ")}</dd>
        </div>
        <div>
          <dt>{dictionary.ui.projectFormat}</dt>
          <dd>{project.projectType[language]}</dd>
        </div>
        <div>
          <dt>{dictionary.sections.overview}</dt>
          <dd>{project.credits[language]}</dd>
        </div>
      </dl>
    </MobileChapterSection>
  );
}

function ProjectOverviewChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-overview">
      <div className="m-chapter-copy">
        <p>{mobileProjectCopy[language].projectStory}</p>
        <h2 id={`${chapter.id}-title`}>{dictionary.sections.overview}</h2>
        <p>{project.caseStudy.context[language]}</p>
      </div>
    </MobileChapterSection>
  );
}

function ProjectDirectionChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-direction">
      <div className="m-chapter-copy">
        <p>{mobileProjectCopy[language].projectWorld}</p>
        <h2 id={`${chapter.id}-title`}>{dictionary.sections.creativeDirection}</h2>
        <p>{project.caseStudy.direction[language]}</p>
      </div>
      {project.quote ? <blockquote>{project.quote[language]}</blockquote> : null}
    </MobileChapterSection>
  );
}

function ProjectVideoChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { language } = useLanguage();

  if (!project.video) return null;

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-video">
      <div className="m-project-gallery__copy">
        <p>{project.video.label[language]}</p>
        <h2 id={`${chapter.id}-title`}>{project.video.label[language]}</h2>
        <span>{project.shortDescription[language]}</span>
      </div>
      <video controls muted playsInline preload="metadata" poster={project.video.poster}>
        <source src={project.video.src} type="video/mp4" />
      </video>
    </MobileChapterSection>
  );
}

function ProjectSectionChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { language } = useLanguage();
  const section = chapter.section;
  const visuals = chapter.visuals ?? [];

  if (!section) return null;

  const copy = chapter.partIndex === 0 ? resolveSectionCopy(project, section, language) : undefined;
  const isContinuation = (chapter.partIndex ?? 0) > 0;

  return (
    <MobileChapterSection
      chapter={chapter}
      index={index}
      total={total}
      className={`m-project-gallery m-project-gallery--${section.layout} ${isContinuation ? "m-project-gallery--continuation" : ""}`}
    >
      <div className="m-project-gallery__copy">
        <p>{section.label[language]}</p>
        <h2 id={`${chapter.id}-title`}>{section.title[language]}</h2>
        {copy ? <span>{copy}</span> : null}
      </div>
      <div className="m-project-gallery__visuals" data-count={visuals.length}>
        {visuals.map((visual) => (
          <ProjectVisualUnit key={`${project.slug}-${chapter.id}-${visual.asset}`} project={project} visual={visual} />
        ))}
      </div>
    </MobileChapterSection>
  );
}

function ProjectSystemChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-system">
      <div className="m-chapter-copy">
        <p>{dictionary.sections.system}</p>
        <h2 id={`${chapter.id}-title`}>{chapter.title[language]}</h2>
      </div>
      <div className="m-project-system__details">
        {project.colorPalette.length ? (
          <div className="m-project-system__group" aria-label={dictionary.sections.palette}>
            <span>{dictionary.sections.palette}</span>
            <div className="m-project-palette">
              {project.colorPalette.map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        ) : null}
        <div className="m-project-system__group">
          <span>{dictionary.sections.typography}</span>
          <p className="m-project-typography">
            <strong>{project.typography.display}</strong>
            <small>{project.typography.body}</small>
          </p>
        </div>
        <div className="m-project-system__group">
          <span>{dictionary.sections.applications}</span>
          <ol>
            {project.caseStudy.applications.map((application, applicationIndex) => (
              <li key={application.en}>
                <span dir="ltr">{String(applicationIndex + 1).padStart(2, "0")}</span>
                <strong>{application[language]}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MobileChapterSection>
  );
}

function ProjectFinalChapter({
  chapter,
  index,
  total,
  project,
}: {
  chapter: ProjectFlowChapter;
  index: number;
  total: number;
  project: Project;
}) {
  const { dictionary, language } = useLanguage();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];
  const words = mobileProjectCopy[language];
  const presentation = getProjectPresentation(project);
  const closingAsset = (presentation.hero.source ?? presentation.hero.asset) as MobileAsset;
  const closingImage = getProjectImageByAsset(project, closingAsset);

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-project-final">
      <div className="m-chapter-copy">
        <p>{words.finalFrame}</p>
        <h2 id={`${chapter.id}-title`}>{dictionary.sections.outcome}</h2>
        <p>{project.caseStudy.outcome[language]}</p>
        {project.legalNote ? <small>{project.legalNote[language]}</small> : null}
      </div>
      <div className="m-project-final__visual">
        <MobileVisual
          project={project}
          image={closingImage}
          asset={closingAsset}
          fit={presentation.hero.fit ?? "contain"}
          formatOverride={presentation.hero.format}
          loading="eager"
        />
      </div>
      <nav className="m-project-next" aria-label={dictionary.actions.nextProject}>
        <Link to={`/work/${previous.slug}`}>
          <span>{words.previous}</span>
          <strong>
            <bdi dir={getProjectTitleDirection(previous, language)}>{getProjectDisplayTitle(previous, language)}</bdi>
          </strong>
        </Link>
        <Link to={`/work/${next.slug}`}>
          <span>{words.next}</span>
          <strong>
            <bdi dir={getProjectTitleDirection(next, language)}>{getProjectDisplayTitle(next, language)}</bdi>
          </strong>
        </Link>
      </nav>
      <MobileFooter caseMode />
    </MobileChapterSection>
  );
}

export function MobileProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const chapters = useMemo(() => (project ? buildProjectFlow(project) : []), [project]);

  if (!project) return <Navigate to="/work" replace />;

  const total = chapters.length;

  return (
    <article
      className={`m-project-page m-project-page--${project.slug}`}
      data-project={project.slug}
      style={getProjectThemeStyle(project) as CSSProperties}
    >
      <MobileChapterController chapters={chapters} className="m-project-scroll">
        {chapters.map((chapter, index) => {
          if (chapter.kind === "hero") return <ProjectHeroChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "meta") return <ProjectMetaChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "overview") return <ProjectOverviewChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "direction") return <ProjectDirectionChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "video") return <ProjectVideoChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "section") return <ProjectSectionChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          if (chapter.kind === "system") return <ProjectSystemChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
          return <ProjectFinalChapter key={chapter.id} chapter={chapter} index={index} total={total} project={project} />;
        })}
      </MobileChapterController>
    </article>
  );
}
