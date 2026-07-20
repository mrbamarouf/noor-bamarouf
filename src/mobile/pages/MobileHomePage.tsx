import { Link } from "react-router-dom";
import { LogoAsset } from "../../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { Project } from "../../types";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

function MobileArrow() {
  const { language } = useLanguage();
  return <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>;
}

function MobileProjectRoom({ project, index, asset = "cover" }: { project: Project; index: number; asset?: "cover" | "hero" }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);
  const image = asset === "hero" ? project.heroImage : project.coverImage;

  return (
    <Link className="m-v2-project-room" to={`/work/${project.slug}`} data-reveal>
      <div className="m-v2-project-room__visual">
        <MobileVisual project={project} image={image} asset={asset} sizes="(max-width: 900px) 100vw, 1px" />
        <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="m-v2-project-room__copy">
        <p>{dictionary.categories[project.category]} / {project.year}</p>
        <h3><bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi></h3>
        <span>{dictionary.actions.openProject} <MobileArrow /></span>
      </div>
    </Link>
  );
}

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const selected = projects.slice(0, 5);
  const archive = projects.slice(5);

  return (
    <div className="m-page m-home m-home--v2">
      <section className="m-room m-room--hero" aria-labelledby="mobile-home-title">
        <div className="m-room__atmosphere" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <LogoAsset variant="hero" priority />
        <div className="m-room--hero__copy" data-reveal>
          <p>{words.heroLabel}</p>
          <h1 id="mobile-home-title">{words.heroTitle}</h1>
          <p>{words.heroBody}</p>
          <Link className="m-primary-link" to="/work">
            <span>{dictionary.actions.viewWork}</span>
            <MobileArrow />
          </Link>
        </div>
      </section>

      <section className="m-room m-room--work" aria-labelledby="mobile-selected-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.featuredLabel}</p>
          <h2 id="mobile-selected-title">{words.featuredTitle}</h2>
          <span>{words.featuredBody}</span>
        </div>
        <div className="m-v2-selected-stack">
          {selected.map((project, index) => (
            <MobileProjectRoom key={project.slug} project={project} index={index} asset={index === 0 || index === 2 ? "hero" : "cover"} />
          ))}
        </div>
      </section>

      <section className="m-room m-room--about" aria-labelledby="mobile-about-title">
        <div className="m-room--about__visual" data-reveal>
          <MobileVisual project={projects[6]} image={projects[6].gallery[0]} asset="gallery-1" sizes="(max-width: 900px) 82vw, 1px" />
        </div>
        <div className="m-room__heading" data-reveal>
          <p>{words.aboutLabel}</p>
          <h2 id="mobile-about-title">{words.aboutTitle}</h2>
          <span>{words.aboutBody}</span>
          <Link className="m-text-link" to="/about">
            <span>{dictionary.actions.readStory}</span>
            <MobileArrow />
          </Link>
        </div>
      </section>

      <section className="m-room m-room--services" id="services" aria-labelledby="mobile-services-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.servicesLabel}</p>
          <h2 id="mobile-services-title">{words.servicesTitle}</h2>
          <span>{words.servicesBody}</span>
        </div>
        <MobileServicesShowcase />
      </section>

      <section className="m-room m-room--process" aria-labelledby="mobile-process-title">
        <div className="m-room__heading m-room__heading--dark" data-reveal>
          <p>{words.processLabel}</p>
          <h2 id="mobile-process-title">{words.processTitle}</h2>
          <span>{words.processBody}</span>
        </div>
        <ol>
          {dictionary.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="m-room m-room--archive" aria-labelledby="mobile-archive-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.archiveLabel}</p>
          <h2 id="mobile-archive-title">{words.archiveTitle}</h2>
          <span>{words.archiveBody}</span>
        </div>
        <div className="m-v2-archive-list">
          {archive.map((project, index) => (
            <Link key={project.slug} to={`/work/${project.slug}`} data-reveal>
              <span dir="ltr">{String(index + 6).padStart(2, "0")}</span>
              <strong><bdi dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</bdi></strong>
              <i>{dictionary.categories[project.category]}</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="m-room m-room--contact" aria-labelledby="mobile-contact-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.contactLabel}</p>
          <h2 id="mobile-contact-title">{words.contactTitle}</h2>
          <span>{words.contactBody}</span>
        </div>
        <div className="m-room--contact__methods" data-reveal>
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.ui.whatsapp}<span aria-hidden="true">↗</span>
          </a>
          <a href={getEmailHref(language)}>
            {dictionary.ui.email}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
