import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectVisual, type ProjectVisualAsset } from "../components/ProjectVisual";
import { getNextProject, getProject } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function galleryAsset(index: number): ProjectVisualAsset {
  return `gallery-${index + 1}` as ProjectVisualAsset;
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { dictionary, direction, language } = useLanguage();

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = getNextProject(project.slug);

  return (
    <article className="page project-page">
      <header className="project-hero" data-reveal>
        <Link className="text-link" to="/work">
          {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
        </Link>
        <div className="project-hero__title">
          <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
          <h1>{project.title}</h1>
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

      <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
        <span>{dictionary.actions.nextProject}</span>
        <Link to={`/work/${nextProject.slug}`} data-cursor="view">
          {direction === "rtl" ? "← " : null}
          {nextProject.title}
          {direction === "rtl" ? null : " →"}
        </Link>
      </nav>
    </article>
  );
}
