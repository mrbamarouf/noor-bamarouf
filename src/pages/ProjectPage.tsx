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
  type PresentationSection,
  type PresentationVisual,
} from "../data/projectPresentation";
import type { Language, Project, LocalizedString } from "../types";

function resolveSectionCopy(project: Project, section: PresentationSection, language: Language) {
  if (section.copy) return section.copy[language];
  if (section.copyKey) return project.caseStudy[section.copyKey][language];
  return undefined;
}

function CaseVisual({
  project,
  visual,
  loading = "eager",
}: {
  project: Project;
  visual: PresentationVisual;
  loading?: "lazy" | "eager";
}) {
  const { language } = useLanguage();
  const image = getProjectImageByAsset(project, visual.source ?? visual.asset);

  return (
    <article
      className={`case-visual case-visual--${visual.kind} case-visual--${visual.emphasis ?? "regular"}`}
      data-kind={visual.kind}
    >
      <ProjectVisual
        className="case-visual__media"
        image={image}
        projectSlug={project.slug}
        asset={visual.asset}
        ratio="wide"
        fit={visual.fit ?? "contain"}
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
  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      className={`case-section case-section--${section.layout} case-section--${section.tone ?? "ivory"}`}
      aria-labelledby={`case-section-${section.id}`}
      data-reveal
    >
      <div className="case-section__copy">
        <span className="section__index">{sectionNumber} / {section.label[language]}</span>
        <h2 id={`case-section-${section.id}`}>{section.title[language]}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
      <div className="case-section__visuals">
        {section.visuals.map((visual) => (
          <CaseVisual
            key={`${project.slug}-${section.id}-${visual.asset}`}
            project={project}
            visual={visual}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectVideo({ project }: { project: Project }) {
  const { language } = useLanguage();

  if (!project.video) return null;

  return (
    <section className="case-video" aria-label={project.video.label[language]} data-reveal>
      <div className="case-video__copy">
        <span className="section__index">{project.video.label[language]}</span>
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
    <section className="case-system" aria-label={dictionary.sections.system} data-reveal>
      <div className="case-system__block">
        <span className="section__index">{dictionary.sections.palette}</span>
        <div className="palette-row palette-row--large">
          {project.colorPalette.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <div className="case-system__block case-system__type">
        <span className="section__index">{dictionary.sections.typography}</span>
        <p>
          <span>{project.typography.display}</span>
          <span>{project.typography.body}</span>
        </p>
      </div>
      <div className="case-system__block case-system__applications">
        <span className="section__index">{dictionary.sections.applications}</span>
        <ul>
          {project.caseStudy.applications.map((application: LocalizedString) => (
            <li key={application.en}>{application[language]}</li>
          ))}
        </ul>
      </div>
      <div className="case-system__block case-system__outcome">
        <span className="section__index">{dictionary.sections.outcome}</span>
        <p>{project.caseStudy.outcome[language]}</p>
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
  const heroImage = getProjectImageByAsset(project, presentation.hero.asset);

  return (
    <article
      className={`page project-page project-page--asset-aware project-page--${presentation.family}`}
      data-project={project.slug}
    >
      <header className="project-hero case-hero" data-reveal>
        <Link className="text-link" to="/work">
          {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
        </Link>
        <div className="project-hero__title">
          <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
          <h1 dir={projectTitleDirection}>{projectTitle}</h1>
          <p>{project.fullDescription[language]}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>{dictionary.nav.services}</dt>
            <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
          </div>
          <div>
            <dt>{dictionary.ui.projectFormat}</dt>
            <dd>{project.credits[language]}</dd>
          </div>
        </dl>
      </header>

      <ProjectVisual
        className={`project-main-image project-main-image--${presentation.hero.kind}`}
        image={heroImage}
        projectSlug={project.slug}
        asset={presentation.hero.asset}
        ratio="wide"
        fit={presentation.hero.fit ?? "contain"}
        loading="eager"
      />

      <section className="case-overview" aria-label={dictionary.sections.overview} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.overview}</span>
          <h2>{project.shortDescription[language]}</h2>
        </div>
        <p>{project.caseStudy.context[language]}</p>
      </section>

      <ProjectVideo project={project} />

      {presentation.sections.map((section, index) => (
        <CaseSection key={section.id} index={index} project={project} section={section} />
      ))}

      <ProjectSystem project={project} />

      {project.legalNote ? (
        <p className="project-legal-note" data-reveal>{project.legalNote[language]}</p>
      ) : null}

      <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
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
