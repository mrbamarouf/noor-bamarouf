import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  getProject,
  getProjectDisplayTitle,
  getProjectTitleDirection,
  projects,
} from "../../data/projects";
import {
  getProjectImageByAsset,
  getProjectPresentation,
  type PresentationSection,
  type PresentationVisual,
} from "../../data/projectPresentation";
import type { Language, Project } from "../../types";
import { MobileChapterHeader } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

function resolveSectionCopy(project: Project, section: PresentationSection, language: Language) {
  if (section.copy) return section.copy[language];
  if (section.copyKey) return project.caseStudy[section.copyKey][language];
  return undefined;
}

function MobileCaseVisual({
  project,
  visual,
}: {
  project: Project;
  visual: PresentationVisual;
}) {
  const { language } = useLanguage();
  const image = getProjectImageByAsset(project, visual.source ?? visual.asset);

  return (
    <article className={`m-case-visual m-case-visual--${visual.kind}`} data-kind={visual.kind} data-reveal>
      <MobileVisual
        project={project}
        image={image}
        asset={visual.asset}
        fit={visual.fit ?? "contain"}
        loading="eager"
        formatOverride={visual.format}
        sizes="(max-width: 900px) 100vw, 1px"
      />
      {visual.caption ? <p>{visual.caption[language]}</p> : null}
    </article>
  );
}

function MobileCaseSection({
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

  return (
    <section className={`m-case-section m-case-section--${section.layout} m-case-section--${section.tone ?? "ivory"}`}>
      <MobileChapterHeader
        number={String(index + 3).padStart(2, "0")}
        label={section.label[language]}
        title={section.title[language]}
        text={copy}
        tone={section.tone === "dark" || section.tone === "brand" ? "dark" : "light"}
      />
      <div className="m-case-section__visuals">
        {section.visuals.map((visual) => (
          <MobileCaseVisual key={`${project.slug}-${section.id}-${visual.asset}`} project={project} visual={visual} />
        ))}
      </div>
    </section>
  );
}

export function MobileProjectPage() {
  const { slug } = useParams();
  const { dictionary, language } = useLanguage();
  const project = getProject(slug);
  const words = mobileCopy[language];

  if (!project) return <Navigate to="/work" replace />;

  const presentation = getProjectPresentation(project);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);
  const heroImage = getProjectImageByAsset(project, presentation.hero.asset);

  return (
    <article className="m-page m-project-page m-project-page--asset-aware" data-project={project.slug}>
      <header className="m-project-cover">
        <div className="m-project-cover__nav">
          <Link to="/work">{language === "ar" ? "→" : "←"}<span>{dictionary.actions.backToWork}</span></Link>
          <span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="m-project-cover__copy" data-reveal>
          <p>{dictionary.categories[project.category]} <span aria-hidden="true">/</span> {project.year}</p>
          <h1><bdi dir={titleDirection}>{title}</bdi></h1>
          <span>{project.projectType[language]}</span>
        </div>
        <div className="m-project-cover__visual" data-reveal>
          <MobileVisual
            project={project}
            image={heroImage}
            asset={presentation.hero.asset}
            fit={presentation.hero.fit ?? "contain"}
            loading="eager"
            sizes="(max-width: 900px) 100vw, 1px"
          />
          <p><span>{words.issue}</span><span>{String(index + 1).padStart(2, "0")}</span></p>
        </div>
      </header>

      <section className="m-project-overview" aria-labelledby="mobile-project-overview-title">
        <MobileChapterHeader
          id="mobile-project-overview-title"
          number="01"
          label={words.projectStory}
          title={dictionary.sections.overview}
          text={project.fullDescription[language]}
        />
        <dl data-reveal>
          <div><dt>{dictionary.ui.projectFormat}</dt><dd>{project.projectType[language]}</dd></div>
          <div><dt>{dictionary.sections.capabilities}</dt><dd>{project.services.map((service) => dictionary.services[service].title).join(" · ")}</dd></div>
          <div><dt>{words.year}</dt><dd>{project.year}</dd></div>
        </dl>
      </section>

      <section className="m-project-direction m-project-direction--asset-aware" aria-labelledby="mobile-project-direction-title">
        <MobileChapterHeader
          id="mobile-project-direction-title"
          number="02"
          label={words.projectStory}
          title={dictionary.sections.creativeDirection}
          text={project.caseStudy.direction[language]}
          tone="dark"
        />
        {project.quote ? <blockquote data-reveal>{project.quote[language]}</blockquote> : null}
      </section>

      {project.video ? (
        <section className="m-project-video" data-reveal>
          <video controls playsInline preload="metadata" poster={project.video.poster} aria-label={project.video.label[language]}>
            <source src={project.video.src} type="video/mp4" />
          </video>
        </section>
      ) : null}

      {presentation.sections.map((section, sectionIndex) => (
        <MobileCaseSection key={section.id} index={sectionIndex} project={project} section={section} />
      ))}

      <section className="m-project-system" aria-labelledby="mobile-project-system-title">
        <MobileChapterHeader
          id="mobile-project-system-title"
          number={String(presentation.sections.length + 3).padStart(2, "0")}
          label={dictionary.sections.system}
          title={dictionary.sections.capabilities}
        />
        <ol>
          {project.caseStudy.applications.map((application, applicationIndex) => (
            <li key={application[language]} data-reveal>
              <span dir="ltr">{String(applicationIndex + 1).padStart(2, "0")}</span>
              <strong>{application[language]}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="m-project-specimens">
        {project.colorPalette.length ? (
          <div data-reveal>
            <p>{dictionary.sections.palette}</p>
            <div className="m-project-palette">
              {project.colorPalette.map((color) => <span key={color} style={{ backgroundColor: color }}><i>{color}</i></span>)}
            </div>
          </div>
        ) : null}
        {project.typography.display || project.typography.body ? (
          <div className="m-project-type" data-reveal>
            <p>{dictionary.sections.typography}</p>
            <strong>{project.typography.display}</strong>
            <span>{project.typography.body}</span>
          </div>
        ) : null}
      </section>

      <section className="m-project-outcome" data-reveal>
        <p className="m-chapter-label"><span>{String(presentation.sections.length + 4).padStart(2, "0")}</span><span>{words.finalFrame}</span></p>
        <p>{project.caseStudy.outcome[language]}</p>
        {project.legalNote ? <small>{project.legalNote[language]}</small> : null}
      </section>

      <nav className="m-project-navigation" aria-label={dictionary.ui.projectCategories}>
        <Link to={`/work/${previous.slug}`}>
          <span>{words.previous}</span>
          <strong><bdi dir={getProjectTitleDirection(previous, language)}>{getProjectDisplayTitle(previous, language)}</bdi></strong>
        </Link>
        <Link to={`/work/${next.slug}`}>
          <span>{words.next}</span>
          <strong><bdi dir={getProjectTitleDirection(next, language)}>{getProjectDisplayTitle(next, language)}</bdi></strong>
        </Link>
      </nav>
    </article>
  );
}
