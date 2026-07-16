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
          <span>{project.year} / {dictionary.categories[project.category]}</span>
          <h1>{project.title}</h1>
          <p>{project.fullDescription[language]}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>{dictionary.nav.services}</dt>
            <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
          </div>
          <div>
            <dt>Credits</dt>
            <dd>{project.credits[language]}</dd>
          </div>
        </dl>
      </header>

      <ArtFrame className="project-main-image" variant={project.heroImage.variant} alt={project.heroImage.alt} ratio="wide" />

      <section className="project-narrative" aria-label={dictionary.sections.overview} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.overview}</span>
          <h2>{project.shortDescription[language]}</h2>
        </div>
        <p>{project.fullDescription[language]}</p>
      </section>

      <section className="project-direction" aria-label={dictionary.sections.creativeDirection} data-reveal>
        <ArtFrame variant={project.gallery[0].variant} alt={project.gallery[0].alt} ratio="portrait" />
        <div>
          <span className="section__index">{dictionary.sections.creativeDirection}</span>
          <h2>{dictionary.home.philosophyTitle}</h2>
          <p>{project.quote?.[language] ?? dictionary.home.philosophyBody}</p>
        </div>
      </section>

      <section className="project-gallery" aria-label={dictionary.sections.gallery} data-reveal>
        {project.gallery.map((image, index) => (
          <ArtFrame
            key={`${image.variant}-${index}`}
            variant={image.variant}
            alt={image.alt}
            ratio={index === 1 ? "landscape" : "square"}
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
        <div>
          <span className="section__index">{dictionary.sections.typography}</span>
          <p>
            {project.typography.display}
            <br />
            {project.typography.body}
          </p>
        </div>
        <div>
          <span className="section__index">{dictionary.sections.outcome}</span>
          <p>{dictionary.home.selectedIntro}</p>
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
