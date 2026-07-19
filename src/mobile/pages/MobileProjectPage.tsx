import { Navigate, Link, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getProject, getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import { MobileChapterHeading } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileProjectPage() {
  const { slug } = useParams();
  const { dictionary, language } = useLanguage();
  const project = getProject(slug);
  const words = mobileCopy[language];

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const title = getProjectDisplayTitle(project, language);
  const firstGallery = project.gallery.slice(0, 2);
  const middleGallery = project.gallery.slice(2, 5);
  const finalGallery = project.gallery.slice(5);

  return (
    <article className="m-page m-project-page">
      <header className="m-project-hero">
        <div className="m-project-hero__top" data-reveal>
          <Link to="/work" className="m-project-hero__back">{language === "ar" ? "→" : "←"} {dictionary.actions.backToWork}</Link>
          <span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="m-project-hero__title" data-reveal>
          <p>{dictionary.categories[project.category]} / {project.year}</p>
          <h1 dir={getProjectTitleDirection(project, language)}>{title}</h1>
          <p>{project.projectType[language]}</p>
        </div>
        <MobileVisual project={project} image={project.heroImage} asset="hero" className="m-project-hero__visual" loading="eager" />
      </header>

      <section className="m-project-overview">
        <MobileChapterHeading number="01" label={words.projectStory} title={dictionary.sections.overview} />
        <p className="m-project-overview__lead" data-reveal>{project.fullDescription[language]}</p>
        <dl data-reveal>
          <div><dt>{dictionary.ui.projectFormat}</dt><dd>{project.projectType[language]}</dd></div>
          <div><dt>{dictionary.sections.capabilities}</dt><dd>{project.services.map((service) => dictionary.services[service].title).join(" · ")}</dd></div>
          <div><dt>{project.credits[language]}</dt><dd>{project.year}</dd></div>
        </dl>
      </section>

      <section className="m-project-gallery m-project-gallery--opening" aria-label={dictionary.sections.gallery}>
        {firstGallery.map((image, galleryIndex) => (
          <div className={galleryIndex === 0 ? "m-project-gallery__wide" : "m-project-gallery__inset"} key={`${project.slug}-opening-${galleryIndex}`} data-reveal>
            <MobileVisual project={project} image={image} asset={`gallery-${galleryIndex + 1}`} />
            <span>{String(galleryIndex + 1).padStart(2, "0")} / {words.detail}</span>
          </div>
        ))}
      </section>

      <section className="m-project-direction">
        <MobileChapterHeading number="02" label={dictionary.sections.creativeDirection} title={dictionary.sections.creativeDirection} />
        <p data-reveal>{project.caseStudy.direction[language]}</p>
        {project.quote ? <blockquote data-reveal>{project.quote[language]}</blockquote> : null}
      </section>

      {project.video ? (
        <section className="m-project-video" data-reveal>
          <video controls playsInline preload="metadata" poster={project.video.poster} aria-label={project.video.label[language]}>
            <source src={project.video.src} type="video/mp4" />
          </video>
        </section>
      ) : null}

      <section className="m-project-gallery m-project-gallery--middle" aria-label={dictionary.sections.applications}>
        {middleGallery.map((image, galleryIndex) => {
          const assetIndex = galleryIndex + 3;
          return (
            <div className={`m-project-gallery__frame m-project-gallery__frame--${galleryIndex % 3}`} key={`${project.slug}-middle-${galleryIndex}`} data-reveal>
              <MobileVisual project={project} image={image} asset={`gallery-${assetIndex}`} />
            </div>
          );
        })}
      </section>

      <section className="m-project-system">
        <MobileChapterHeading number="03" label={dictionary.sections.system} title={dictionary.sections.applications} />
        <p data-reveal>{project.caseStudy.context[language]}</p>
        <ol>
          {project.caseStudy.applications.map((application, applicationIndex) => (
            <li key={application[language]} data-reveal><span>{String(applicationIndex + 1).padStart(2, "0")}</span><strong>{application[language]}</strong></li>
          ))}
        </ol>
      </section>

      <section className="m-project-specimens">
        <div data-reveal>
          <p className="m-kicker"><span>04</span><span>{dictionary.sections.palette}</span></p>
          <div className="m-project-palette">
            {project.colorPalette.map((color) => <span key={color} style={{ backgroundColor: color }}><i>{color}</i></span>)}
          </div>
        </div>
        <div className="m-project-type" data-reveal>
          <p className="m-kicker"><span>05</span><span>{dictionary.sections.typography}</span></p>
          <strong>{project.typography.display}</strong>
          <span>{project.typography.body}</span>
        </div>
      </section>

      {finalGallery.length ? (
        <section className="m-project-gallery m-project-gallery--final" aria-label={words.finalFrame}>
          <p className="m-kicker"><span>06</span><span>{words.finalFrame}</span></p>
          {finalGallery.map((image, galleryIndex) => {
            const assetIndex = galleryIndex + 6;
            return <MobileVisual key={`${project.slug}-final-${galleryIndex}`} project={project} image={image} asset={`gallery-${assetIndex}`} className={galleryIndex % 2 ? "is-inset" : ""} />;
          })}
        </section>
      ) : null}

      <section className="m-project-outcome" data-reveal>
        <p className="m-kicker"><span>07</span><span>{dictionary.sections.outcome}</span></p>
        <p>{project.caseStudy.outcome[language]}</p>
        {project.legalNote ? <small>{project.legalNote[language]}</small> : null}
      </section>

      <nav className="m-project-navigation" aria-label={dictionary.ui.projectCategories}>
        <Link to={`/work/${previous.slug}`}>
          <span>{words.previous}</span>
          <strong dir={getProjectTitleDirection(previous, language)}>{getProjectDisplayTitle(previous, language)}</strong>
        </Link>
        <Link to={`/work/${next.slug}`}>
          <span>{words.next}</span>
          <strong dir={getProjectTitleDirection(next, language)}>{getProjectDisplayTitle(next, language)}</strong>
        </Link>
      </nav>
    </article>
  );
}
