import { Link, Navigate, useParams } from "react-router-dom";
import { ArtFrame } from "../components/ArtFrame";
import { getNextProject, getProject } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { dictionary, language } = useLanguage();

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = getNextProject(project.slug);

  return (
    <article className="page project-page">
      <header className="project-hero" data-reveal>
        <Link className="text-link" to="/work">
          ← {dictionary.actions.backToWork}
        </Link>
        <div className="project-hero__title">
          <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
          <span className="project-demo-badge">{dictionary.sections.demoProject}</span>
          <h1>{project.title}</h1>
          <p>{project.fullDescription[language]}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>{dictionary.nav.services}</dt>
            <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
          </div>
          <div>
            <dt>{dictionary.ui.credits}</dt>
            <dd>{project.credits[language]}</dd>
          </div>
        </dl>
      </header>

      <ArtFrame
        className="project-main-image"
        variant={project.heroImage.variant}
        scene={project.heroImage.scene}
        alt={project.heroImage.alt}
        ratio="wide"
      />

      <section className="project-narrative" aria-label={dictionary.sections.overview} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.overview}</span>
          <h2>{project.shortDescription[language]}</h2>
        </div>
        <p>{project.caseStudy.context[language]}</p>
      </section>

      <section className="project-direction" aria-label={dictionary.sections.creativeDirection} data-reveal>
        <ArtFrame
          variant={project.gallery[0].variant}
          scene={project.gallery[0].scene}
          alt={project.gallery[0].alt}
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
          <ArtFrame
            key={`${image.variant}-${index}`}
            variant={image.variant}
            scene={image.scene}
            alt={image.alt}
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
            {project.typography.display}
            <br />
            {project.typography.body}
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
        <div className="project-replacement-note">
          <span className="section__index">{dictionary.sections.replacementPlan}</span>
          <p>{project.caseStudy.replacementNote[language]}</p>
        </div>
      </section>

      <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
        <span>{dictionary.actions.nextProject}</span>
        <Link to={`/work/${nextProject.slug}`} data-cursor="view">
          {nextProject.title}
        </Link>
      </nav>
    </article>
  );
}
