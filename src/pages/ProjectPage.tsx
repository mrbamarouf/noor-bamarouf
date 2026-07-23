import type { CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectVisual } from "../components/ProjectVisual";
import { useLanguage } from "../context/LanguageContext";
import {
  getNextProject,
  getProject,
  getProjectDisplayTitle,
  getProjectTitleDirection,
} from "../data/projects";
import {
  getProjectImageByAsset,
  getProjectPresentation,
  getProjectThemeStyle,
  type PresentationSection,
  type PresentationVisual,
} from "../data/projectPresentation";
import type { Language, LocalizedString, Project } from "../types";

function resolveSectionCopy(project: Project, section: PresentationSection, language: Language) {
  if (section.copy) return section.copy[language];
  if (section.copyKey) return project.caseStudy[section.copyKey][language];
  return undefined;
}

function visualRatio(visual: PresentationVisual): "portrait" | "landscape" | "square" | "wide" {
  if (visual.ratio) return visual.ratio;
  if (visual.kind === "portrait-presentation" || visual.kind === "story-frame") return "portrait";
  if (visual.kind === "social-post" || visual.kind === "square-post" || visual.kind === "logo-presentation") return "square";
  if (visual.kind === "billboard" || visual.kind === "ultrawide-presentation" || visual.emphasis === "full") return "wide";
  return "landscape";
}

function visualFit(visual: PresentationVisual, project: Project): "contain" | "cover" {
  if (visual.fit) return visual.fit;
  if (project.category === "logoDesign") return "contain";
  return "contain";
}

function CaseVisual({
  project,
  visual,
  loading = "lazy",
}: {
  project: Project;
  visual: PresentationVisual;
  loading?: "lazy" | "eager";
}) {
  const { language } = useLanguage();
  const image = getProjectImageByAsset(project, visual.source ?? visual.asset);

  return (
    <article
      className={`desktop-case-visual desktop-case-visual--${visual.kind} desktop-case-visual--${visual.emphasis ?? "regular"} desktop-case-visual--shape-${visual.shape ?? "rect"}`}
      data-kind={visual.kind}
      data-shape={visual.shape ?? "rect"}
    >
      <ProjectVisual
        className="desktop-case-visual__media"
        image={image}
        projectSlug={project.slug}
        asset={visual.asset}
        ratio={visualRatio(visual)}
        fit={visualFit(visual, project)}
        shape={visual.shape}
        loading={loading}
        formatOverride={visual.format}
      />
      {visual.caption ? <p>{visual.caption[language]}</p> : null}
    </article>
  );
}

function CaseSection({
  index,
  project,
  section,
}: {
  index: number;
  project: Project;
  section: PresentationSection;
}) {
  const { language } = useLanguage();
  const copy = resolveSectionCopy(project, section, language);
  const hasVisuals = section.visuals.length > 0;
  const sectionNumber =
    project.slug === "jeddah-railway"
      ? index + 2
      : project.slug === "red-sea-transport-logistics"
        ? index + 3
        : index + 4;

  return (
    <section
      className={`desktop-case-section desktop-case-section--${section.layout} desktop-case-section--${section.tone ?? "clear"} ${hasVisuals ? "" : "desktop-case-section--text-only"}`}
      aria-labelledby={`desktop-case-section-${section.id}`}
      data-reveal
    >
      <div className="desktop-case-section__copy">
        <span className="desktop-kicker">{String(sectionNumber).padStart(2, "0")} / {section.label[language]}</span>
        <h2 id={`desktop-case-section-${section.id}`}>{section.title[language]}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
      {hasVisuals ? (
        <div className="desktop-case-section__visuals" data-count={section.visuals.length}>
          {section.visuals.map((visual) => (
            <CaseVisual
              key={`${project.slug}-${section.id}-${visual.asset}`}
              project={project}
              visual={visual}
              loading="eager"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ProjectVideo({ project }: { project: Project }) {
  const { language } = useLanguage();

  if (!project.video) return null;

  return (
    <section className="desktop-project-video" aria-label={project.video.label[language]} data-reveal>
      <div>
        <span className="desktop-kicker">{project.video.label[language]}</span>
        <p>{project.shortDescription[language]}</p>
      </div>
      <video controls muted playsInline preload="metadata" poster={project.video.poster}>
        <source src={project.video.src} type="video/mp4" />
      </video>
    </section>
  );
}

function ProjectSystem({ project }: { project: Project }) {
  const { dictionary, language } = useLanguage();

  return (
    <section className="desktop-project-system" aria-label={dictionary.sections.system} data-reveal>
      <div>
        <span className="desktop-kicker">{dictionary.sections.palette}</span>
        <div className="desktop-palette">
          {project.colorPalette.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <div>
        <span className="desktop-kicker">{dictionary.sections.typography}</span>
        <p>
          <strong>{project.typography.display}</strong>
          <small>{project.typography.body}</small>
        </p>
      </div>
      <div>
        <span className="desktop-kicker">{dictionary.sections.applications}</span>
        <ul>
          {project.caseStudy.applications.map((application: LocalizedString) => (
            <li key={application.en}>{application[language]}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { dictionary, direction, language } = useLanguage();

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const presentation = getProjectPresentation(project);
  const nextProject = getNextProject(project.slug);
  const projectTitle = getProjectDisplayTitle(project, language);
  const projectTitleDirection = getProjectTitleDirection(project, language);
  const nextProjectTitle = getProjectDisplayTitle(nextProject, language);
  const nextProjectTitleDirection = getProjectTitleDirection(nextProject, language);
  const heroImage = getProjectImageByAsset(project, presentation.hero.source ?? presentation.hero.asset);
  const themeStyle = getProjectThemeStyle(project) as CSSProperties;
  const overviewKicker =
    project.slug === "jeddah-railway"
      ? dictionary.sections.overview
      : project.slug === "red-sea-transport-logistics"
        ? language === "ar" ? "02 / عن الشركة" : "02 / About the company"
        : `03 / ${dictionary.sections.overview}`;

  return (
    <article
      className={`desktop-project desktop-project--${presentation.family} desktop-project--${project.slug}`}
      data-project={project.slug}
      style={themeStyle}
    >
      <header className="desktop-project-hero" data-reveal>
        <Link className="desktop-project-hero__back" to="/work">
          {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
        </Link>
        <ProjectVisual
          className={`desktop-project-hero__visual desktop-project-hero__visual--${presentation.hero.kind} desktop-project-hero__visual--shape-${presentation.hero.shape ?? "rect"}`}
          image={heroImage}
          projectSlug={project.slug}
          asset={presentation.hero.asset}
          ratio={visualRatio(presentation.hero)}
          fit={visualFit(presentation.hero, project)}
          shape={presentation.hero.shape}
          loading="eager"
          formatOverride={presentation.hero.format}
        />
        <div className="desktop-project-hero__summary">
          <span className="desktop-kicker">
            {project.year} / {dictionary.categories[project.category]}
          </span>
          <h1 id="desktop-project-title" dir={projectTitleDirection}>{projectTitle}</h1>
          <p>{project.shortDescription[language]}</p>
        </div>
      </header>

      <section className="desktop-project-intro" aria-label={dictionary.sections.overview} data-reveal>
        <dl className="desktop-project-meta">
          <div>
            <dt>{dictionary.nav.services}</dt>
            <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
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
      </section>

      <section className="desktop-project-overview" aria-label={dictionary.sections.overview} data-reveal>
        <span className="desktop-kicker">{overviewKicker}</span>
        <div>
          <p>{project.caseStudy.context[language]}</p>
          <p>{project.caseStudy.direction[language]}</p>
        </div>
      </section>

      <ProjectVideo project={project} />

      {presentation.sections.map((section, index) => (
        <CaseSection key={section.id} index={index} project={project} section={section} />
      ))}

      {project.slug === "red-sea-transport-logistics" ? null : <ProjectSystem project={project} />}

      {project.legalNote ? (
        <p className="desktop-project-legal" data-reveal>{project.legalNote[language]}</p>
      ) : null}

      <nav className="desktop-next-project" aria-label={dictionary.actions.nextProject} data-reveal>
        <span>{dictionary.actions.nextProject}</span>
        <Link to={`/work/${nextProject.slug}`} data-cursor="view">
          {direction === "rtl" ? "← " : null}
          <span dir={nextProjectTitleDirection}>{nextProjectTitle}</span>
          {direction === "rtl" ? null : " →"}
        </Link>
      </nav>
    </article>
  );
}
