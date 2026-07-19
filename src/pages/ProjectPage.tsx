import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectVisual, type ProjectVisualAsset } from "../components/ProjectVisual";
import { getNextProject, getProject, getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function galleryAsset(index: number): ProjectVisualAsset {
  return `gallery-${index + 1}` as ProjectVisualAsset;
}

const logoCaseLabels = {
  en: {
    logo: "Logo",
    logoConcept: "Logo Concept",
    symbol: "Symbol",
    typography: "Typography",
    color: "Color",
    finalPresentation: "Final Presentation",
    symbolText: "The Arabic symbol is the main visual element in the supplied logo, drawn with a compact vertical rhythm.",
    typographyText: "The supplied Latin wordmark uses open spacing beneath the symbol to keep the name clear and calm.",
    colorText: "The mark is presented in a deep green tone, with clean neutral space around it.",
  },
  ar: {
    logo: "الشعار",
    logoConcept: "فكرة الشعار",
    symbol: "الرمز",
    typography: "الخط",
    color: "اللون",
    finalPresentation: "العرض النهائي",
    symbolText: "الرمز العربي هو العنصر البصري الرئيسي في الشعار المقدم، بإيقاع عمودي مركز وواضح.",
    typographyText: "تعتمد العلامة النصية اللاتينية المقدمة على تباعد هادئ أسفل الرمز ليبقى الاسم واضحًا.",
    colorText: "يظهر الشعار بلون أخضر عميق مع مساحة محايدة ونظيفة حوله.",
  },
} as const;

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { dictionary, direction, language } = useLanguage();

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = getNextProject(project.slug);
  const projectTitle = getProjectDisplayTitle(project, language);
  const projectTitleDirection = getProjectTitleDirection(project, language);
  const nextProjectTitle = getProjectDisplayTitle(nextProject, language);
  const nextProjectTitleDirection = getProjectTitleDirection(nextProject, language);

  if (project.slug === "zahy-store") {
    const labels = logoCaseLabels[language];

    return (
      <article className="page project-page project-page--logo">
        <header className="project-hero logo-project-hero" data-reveal>
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
          className="project-main-image logo-project__hero-mark"
          image={project.heroImage}
          projectSlug={project.slug}
          asset="hero"
          ratio="wide"
          loading="eager"
        />

        <section className="logo-case logo-case--logo" aria-label={labels.logo} data-reveal>
          <span className="section__index">{labels.logo}</span>
          <ProjectVisual
            image={project.gallery[0]}
            projectSlug={project.slug}
            asset="gallery-1"
            ratio="square"
          />
          <p>{project.caseStudy.context[language]}</p>
        </section>

        <section className="logo-case logo-case--concept" aria-label={labels.logoConcept} data-reveal>
          <div>
            <span className="section__index">{labels.logoConcept}</span>
            <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
            <p>{project.caseStudy.direction[language]}</p>
          </div>
          <div className="logo-case__details">
            <article>
              <span>{labels.symbol}</span>
              <p>{labels.symbolText}</p>
            </article>
            <article>
              <span>{labels.typography}</span>
              <p>{labels.typographyText}</p>
            </article>
            <article>
              <span>{labels.color}</span>
              <p>{labels.colorText}</p>
              <div className="palette-row palette-row--large">
                {project.colorPalette.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="logo-case logo-case--final" aria-label={labels.finalPresentation} data-reveal>
          <ProjectVisual
            image={project.gallery[2]}
            projectSlug={project.slug}
            asset="gallery-3"
            ratio="square"
          />
          <div>
            <span className="section__index">{labels.finalPresentation}</span>
            <h2>{project.shortDescription[language]}</h2>
            <p>{project.caseStudy.outcome[language]}</p>
          </div>
        </section>

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

  return (
    <article className="page project-page">
      <header className="project-hero" data-reveal>
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
        className="project-main-image"
        image={project.heroImage}
        projectSlug={project.slug}
        asset="hero"
        ratio="wide"
        loading="eager"
      />

      {project.video ? (
        <section className="project-video" aria-label={project.video.label[language]} data-reveal>
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={project.video.poster}
          >
            <source src={project.video.src} type="video/mp4" />
          </video>
        </section>
      ) : null}

      <section className="project-narrative" aria-label={dictionary.sections.overview} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.overview}</span>
          <h2>{project.shortDescription[language]}</h2>
        </div>
        <p>{project.caseStudy.context[language]}</p>
      </section>

      <section className="project-direction" aria-label={dictionary.sections.creativeDirection} data-reveal>
        <ProjectVisual
          image={project.gallery[0]}
          projectSlug={project.slug}
          asset="gallery-1"
          ratio="portrait"
        />
        <div>
          <span className="section__index">{dictionary.sections.creativeDirection}</span>
          <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
          <p>{project.caseStudy.direction[language]}</p>
        </div>
      </section>

      <section className="project-gallery" aria-label={dictionary.sections.gallery} data-reveal>
        {project.gallery.map((image, index) => (
          <ProjectVisual
            key={`${image.variant}-${index}`}
            image={image}
            projectSlug={project.slug}
            asset={galleryAsset(index)}
            ratio={index === 0 ? "portrait" : index === 1 ? "landscape" : index === 2 ? "square" : "portrait"}
          />
        ))}
      </section>

      <section className="project-system" aria-label={dictionary.sections.system} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.palette}</span>
          <div className="palette-row palette-row--large">
            {project.colorPalette.map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="project-system__type">
          <span className="section__index">{dictionary.sections.typography}</span>
          <p>
            <span>{project.typography.display}</span>
            <span>{project.typography.body}</span>
          </p>
        </div>
        <div className="project-applications">
          <span className="section__index">{dictionary.sections.applications}</span>
          <ul>
            {project.caseStudy.applications.map((application) => (
              <li key={application.en}>{application[language]}</li>
            ))}
          </ul>
        </div>
        <div className="project-outcome-note">
          <span className="section__index">{dictionary.sections.outcome}</span>
          <p>{project.caseStudy.outcome[language]}</p>
        </div>
      </section>

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
