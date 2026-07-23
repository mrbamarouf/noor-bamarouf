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
import { getProject, getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { Language, LocalizedString, Project } from "../../types";
import { localizeMobileDigits, MobileChapterController, MobileChapterSection, type MobileChapterDefinition } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow } from "../MobilePrimitives";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { mobileProjectCopy } from "../mobileCopy";

type FlowKind = "direction" | "footer" | "hero" | "navigation" | "overview" | "section" | "system" | "video";

interface ProjectChapter extends MobileChapterDefinition {
  kind: FlowKind;
  section?: PresentationSection;
  visuals?: PresentationVisual[];
  part?: number;
}

function localized(en: string, ar: string): LocalizedString {
  return { en, ar };
}

function visualKey(visual: PresentationVisual) {
  return visual.source ?? visual.asset;
}

function chunkVisuals(visuals: PresentationVisual[]) {
  const chunks: PresentationVisual[][] = [];
  let pending: PresentationVisual[] = [];

  const flush = () => {
    if (pending.length) chunks.push(pending);
    pending = [];
  };

  visuals.forEach((visual) => {
    const single = visual.kind === "full-artwork" || visual.kind === "billboard" || visual.kind === "ultrawide-presentation" || visual.emphasis === "full";
    if (single) {
      flush();
      chunks.push([visual]);
      return;
    }
    pending.push(visual);
    if (pending.length === 2) flush();
  });
  flush();
  return chunks;
}

function buildFlow(project: Project): ProjectChapter[] {
  const presentation = getProjectPresentation(project);
  const result: ProjectChapter[] = [];
  const add = (chapter: Omit<ProjectChapter, "id">) => result.push({ ...chapter, id: `chapter-${String(result.length + 1).padStart(2, "0")}` });
  const flat = presentation.sections.flatMap((section) => section.visuals);
  const heroKey = visualKey(presentation.hero);
  const lastOccurrence = new Map<string, number>();
  flat.forEach((visual, index) => lastOccurrence.set(visualKey(visual), index));
  let flatIndex = 0;

  add({ kind: "hero", title: localized(project.title, project.displayTitle?.ar ?? project.title) });
  add({ kind: "overview", title: localized("Overview", "نظرة عامة") });
  add({ kind: "direction", title: localized("Creative direction", "التوجيه الإبداعي") });
  if (project.video) add({ kind: "video", title: project.video.label });

  presentation.sections.forEach((section) => {
    const uniqueVisuals = section.visuals.filter((visual) => {
      const key = visualKey(visual);
      const keep = key !== heroKey && lastOccurrence.get(key) === flatIndex;
      flatIndex += 1;
      return keep;
    });
    chunkVisuals(uniqueVisuals).forEach((visuals, part) => {
      add({ kind: "section", title: section.label, section, visuals, part });
    });
  });

  add({ kind: "system", title: localized("Design system", "نظام التصميم") });
  add({ kind: "navigation", title: localized("Continue exploring", "مواصلة الاستكشاف") });
  add({ kind: "footer", title: localized("Footer", "التذييل") });
  return result;
}

function sectionCopy(project: Project, section: PresentationSection, language: Language) {
  if (section.copy) return section.copy[language];
  if (section.copyKey) return project.caseStudy[section.copyKey][language];
  return undefined;
}

function visualFit(project: Project, visual: PresentationVisual) {
  if (visual.fit) return visual.fit;
  if (project.category === "logoDesign" || visual.kind === "full-artwork") return "contain";
  return "contain";
}

function ProjectHero({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { dictionary, language } = useLanguage();
  const presentation = getProjectPresentation(project);
  const asset = (presentation.hero.source ?? presentation.hero.asset) as MobileAsset;
  const image = getProjectImageByAsset(project, asset);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className={`m-case-hero m-case-hero--${presentation.family}`}>
      <div className="m-case-hero__nav">
        <Link to="/work"><MobileArrow /> {dictionary.actions.backToWork}</Link>
        <span dir="ltr">{localizeMobileDigits(String(projectIndex + 1).padStart(2, "0"), language)} / {localizeMobileDigits(String(projects.length).padStart(2, "0"), language)}</span>
      </div>
      <MobileVisual project={project} image={image} asset={asset} fit={visualFit(project, presentation.hero)} formatOverride={presentation.hero.format} loading="eager" />
      <div className="m-case-hero__copy">
        <p>{project.year} / {dictionary.categories[project.category]}</p>
        <h1 id={`${chapter.id}-title`} dir={getProjectTitleDirection(project, language)}><bdi>{getProjectDisplayTitle(project, language)}</bdi></h1>
        <span>{project.shortDescription[language]}</span>
      </div>
    </MobileChapterSection>
  );
}

function ProjectOverview({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { dictionary, language } = useLanguage();
  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-case-overview">
      <div className="m-case-copy">
        <span>{mobileProjectCopy[language].overview}</span>
        <h1 id={`${chapter.id}-title`}>{project.projectType[language]}</h1>
        <p>{project.caseStudy.context[language]}</p>
      </div>
      <dl className="m-case-facts">
        <div><dt>{dictionary.nav.services}</dt><dd>{project.services.map((service) => dictionary.services[service].title).join(" · ")}</dd></div>
        <div><dt>{dictionary.ui.projectFormat}</dt><dd>{project.credits[language]}</dd></div>
      </dl>
    </MobileChapterSection>
  );
}

function ProjectDirection({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { language } = useLanguage();
  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-case-direction">
      <div className="m-case-copy">
        <span>{mobileProjectCopy[language].direction}</span>
        <h1 id={`${chapter.id}-title`}>{chapter.title[language]}</h1>
        <p>{project.caseStudy.direction[language]}</p>
      </div>
      {project.quote ? <blockquote>{project.quote[language]}</blockquote> : null}
    </MobileChapterSection>
  );
}

function ProjectSection({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { language } = useLanguage();
  const section = chapter.section!;
  const visuals = chapter.visuals ?? [];
  const copy = chapter.part === 0 ? sectionCopy(project, section, language) : undefined;

  return (
    <MobileChapterSection
      chapter={chapter}
      index={index}
      total={total}
      className={`m-case-gallery m-case-gallery--${section.layout} m-case-gallery--${section.tone ?? "clear"}`}
    >
      <div className="m-case-gallery__head">
        <span>{section.label[language]}{chapter.part ? ` / ${localizeMobileDigits(String(chapter.part + 1), language)}` : ""}</span>
        <h1 id={`${chapter.id}-title`}>{section.title[language]}</h1>
        {copy ? <p>{copy}</p> : null}
      </div>
      <div className="m-case-gallery__media" data-count={visuals.length}>
        {visuals.map((visual) => {
          const asset = visualKey(visual) as MobileAsset;
          return (
            <MobileVisual
              key={`${section.id}-${asset}`}
              project={project}
              image={getProjectImageByAsset(project, asset)}
              asset={asset}
              fit={visualFit(project, visual)}
              formatOverride={visual.format}
              className={`m-case-media m-case-media--${visual.kind}`}
              loading="eager"
            />
          );
        })}
      </div>
    </MobileChapterSection>
  );
}

function ProjectSystem({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { dictionary, language } = useLanguage();
  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-case-system">
      <div className="m-case-copy"><span>{mobileProjectCopy[language].system}</span><h1 id={`${chapter.id}-title`}>{dictionary.sections.system}</h1></div>
      <div className="m-case-system__content">
        <div><span>{dictionary.sections.palette}</span><div className="m-case-palette">{project.colorPalette.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</div></div>
        <div><span>{dictionary.sections.typography}</span><strong>{project.typography.display}</strong><small>{project.typography.body}</small></div>
        <div><span>{dictionary.sections.applications}</span><ul>{project.caseStudy.applications.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div>
      </div>
    </MobileChapterSection>
  );
}

function ProjectNavigation({ project, chapter, index, total }: { project: Project; chapter: ProjectChapter; index: number; total: number }) {
  const { language } = useLanguage();
  const current = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(current - 1 + projects.length) % projects.length];
  const next = projects[(current + 1) % projects.length];
  const copy = mobileProjectCopy[language];

  return (
    <MobileChapterSection chapter={chapter} index={index} total={total} className="m-case-navigation">
      <h1 id={`${chapter.id}-title`}>{chapter.title[language]}</h1>
      <nav>
        <Link to={`/work/${previous.slug}`}><span>{copy.previous}</span><strong dir={getProjectTitleDirection(previous, language)}><bdi>{getProjectDisplayTitle(previous, language)}</bdi></strong></Link>
        <Link to={`/work/${next.slug}`}><span>{copy.next}</span><strong dir={getProjectTitleDirection(next, language)}><bdi>{getProjectDisplayTitle(next, language)}</bdi></strong></Link>
      </nav>
    </MobileChapterSection>
  );
}

export function MobileProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { language } = useLanguage();
  const flow = useMemo(() => project ? buildFlow(project) : [], [project]);

  if (!project) return <Navigate to="/work" replace />;
  const theme = getProjectThemeStyle(project) as CSSProperties;

  return (
    <article className={`m-case m-case--${project.slug} m-case--${getProjectPresentation(project).family}`} style={theme}>
      <MobileChapterController chapters={flow} className="m-case-book">
        {flow.map((chapter, index) => {
          if (chapter.kind === "hero") return <ProjectHero key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "overview") return <ProjectOverview key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "direction") return <ProjectDirection key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "section") return <ProjectSection key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "system") return <ProjectSystem key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "navigation") return <ProjectNavigation key={chapter.id} project={project} chapter={chapter} index={index} total={flow.length} />;
          if (chapter.kind === "video" && project.video) return (
            <MobileChapterSection key={chapter.id} chapter={chapter} index={index} total={flow.length} className="m-case-video">
              <div className="m-case-copy"><span>{project.video.label[language]}</span><h1 id={`${chapter.id}-title`}>{getProjectDisplayTitle(project, language)}</h1></div>
              <video controls muted playsInline preload="metadata" poster={project.video.poster}><source src={project.video.src} type="video/mp4" /></video>
            </MobileChapterSection>
          );
          return <MobileChapterSection key={chapter.id} chapter={chapter} index={index} total={flow.length} className="m-case-footer"><MobileFooter caseMode /></MobileChapterSection>;
        })}
      </MobileChapterController>
    </article>
  );
}
