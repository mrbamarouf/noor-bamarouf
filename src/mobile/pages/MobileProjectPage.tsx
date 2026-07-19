import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getProject, getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import { MobileChapterHeader } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

const containedProjects = new Set(["zahy-store", "ansab-holding"]);
const galleryModes = ["bleed", "inset", "portrait", "paper", "wide"] as const;

export function MobileProjectPage() {
  const { slug } = useParams();
  const { dictionary, language } = useLanguage();
  const project = getProject(slug);
  const words = mobileCopy[language];

  if (!project) return <Navigate to="/work" replace />;

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);
  const gallery = project.gallery.slice(0, 8);
  const containArtwork = containedProjects.has(project.slug);

  return (
    <article className="m-page m-project-page" data-project={project.slug}>
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
            image={project.heroImage}
            asset="hero"
            loading="eager"
            fit={containArtwork ? "contain" : "cover"}
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
        />
        <p className="m-project-overview__lead" data-reveal>{project.fullDescription[language]}</p>
        <dl data-reveal>
          <div><dt>{dictionary.ui.projectFormat}</dt><dd>{project.projectType[language]}</dd></div>
          <div><dt>{dictionary.sections.capabilities}</dt><dd>{project.services.map((service) => dictionary.services[service].title).join(" · ")}</dd></div>
          <div><dt>{words.year}</dt><dd>{project.year}</dd></div>
        </dl>
      </section>

      {gallery[0] ? (
        <div className="m-project-opening" data-reveal>
          <MobileVisual
            project={project}
            image={gallery[0]}
            asset="gallery-1"
            fit={containArtwork ? "contain" : "cover"}
            sizes="(max-width: 900px) 100vw, 1px"
          />
        </div>
      ) : null}

      <section className="m-project-direction" aria-labelledby="mobile-project-direction-title">
        <MobileChapterHeader
          id="mobile-project-direction-title"
          number="02"
          label={words.projectStory}
          title={dictionary.sections.creativeDirection}
          tone="dark"
        />
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

      {gallery.length > 1 ? (
        <section className="m-project-sequence" aria-labelledby="mobile-project-sequence-title">
          <MobileChapterHeader
            id="mobile-project-sequence-title"
            number="03"
            label={words.visualSequence}
            title={dictionary.sections.gallery}
          />
          <div className="m-project-sequence__gallery">
            {gallery.slice(1).map((image, galleryIndex) => {
              const assetIndex = galleryIndex + 2;
              const mode = galleryModes[galleryIndex % galleryModes.length];
              return (
                <div className={`m-gallery-frame m-gallery-frame--${mode}`} key={`${project.slug}-${assetIndex}`} data-reveal>
                  <MobileVisual
                    project={project}
                    image={image}
                    asset={`gallery-${assetIndex}`}
                    fit={containArtwork || mode === "paper" ? "contain" : "cover"}
                    sizes="(max-width: 900px) 100vw, 1px"
                  />
                  <span dir="ltr">{String(assetIndex).padStart(2, "0")}</span>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="m-project-system" aria-labelledby="mobile-project-system-title">
        <MobileChapterHeader
          id="mobile-project-system-title"
          number="04"
          label={dictionary.sections.system}
          title={dictionary.sections.capabilities}
        />
        <p data-reveal>{project.caseStudy.context[language]}</p>
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
        <p className="m-chapter-label"><span>05</span><span>{words.finalFrame}</span></p>
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
