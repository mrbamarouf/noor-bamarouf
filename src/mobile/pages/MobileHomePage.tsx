import { Link } from "react-router-dom";
import { LogoAsset } from "../../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { serviceOrder } from "../../data/content";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { Project } from "../../types";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

function MobileArrow() {
  const { language } = useLanguage();
  return <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>;
}

function ChapterMarker({ number, label }: { number: string; label: string }) {
  return (
    <p className="m-v3-chapter-label">
      <span dir="ltr">{number}</span>
      <span>{label}</span>
    </p>
  );
}

function ProjectFeature({ project, index, asset = "cover" }: { project: Project; index: number; asset?: "cover" | "hero" }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);
  const image = asset === "hero" ? project.heroImage : project.coverImage;

  return (
    <Link className="m-v3-project-feature" to={`/work/${project.slug}`} data-reveal>
      <MobileVisual project={project} image={image} asset={asset} sizes="(max-width: 900px) 100vw, 1px" />
      <div>
        <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
        <p>{dictionary.categories[project.category]} / {project.year}</p>
        <h3><bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi></h3>
        <small>{dictionary.actions.openProject} <MobileArrow /></small>
      </div>
    </Link>
  );
}

function ArchiveRow({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

  return (
    <Link className="m-v3-archive-row" to={`/work/${project.slug}`} data-reveal>
      <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      <strong><bdi dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</bdi></strong>
      <small>{dictionary.categories[project.category]}</small>
      <i aria-hidden="true">{language === "ar" ? "←" : "→"}</i>
    </Link>
  );
}

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const [welloProject, matchaProject, jeddahProject] = projects;
  const aboutProject = projects.find((project) => project.slug === "wemo-delights") ?? projects[6];
  const serviceReference = projects.find((project) => project.slug === "rahaba-space") ?? projects[7];

  return (
    <div className="m-page m-home m-home--v3">
      <section className="m-v3-chapter m-v3-hero" aria-labelledby="mobile-home-title">
        <div className="m-v3-hero__top">
          <LogoAsset variant="hero" priority />
          <ChapterMarker number="01" label={words.heroLabel} />
        </div>
        <div className="m-v3-hero__copy" data-reveal>
          <h1 id="mobile-home-title">{language === "ar" ? "نور بامعروف" : "NOOR BAMAROUF"}</h1>
          <p>{words.heroBody}</p>
          <Link className="m-primary-link" to="/work">
            <span>{dictionary.actions.viewWork}</span>
            <MobileArrow />
          </Link>
        </div>
        <div className="m-v3-hero__visual" data-reveal>
          <MobileVisual
            project={welloProject}
            image={welloProject.heroImage}
            asset="hero"
            fit="cover"
            loading="eager"
            sizes="(max-width: 900px) 100vw, 1px"
          />
        </div>
      </section>

      <section className="m-v3-chapter m-v3-selected" aria-labelledby="mobile-selected-title">
        <ChapterMarker number="02" label={words.featuredLabel} />
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-selected-title">{words.featuredTitle}</h2>
          <p>{words.featuredBody}</p>
        </div>
        <ProjectFeature project={welloProject} index={0} asset="hero" />
        <div className="m-v3-selected__duo">
          <ProjectFeature project={matchaProject} index={1} />
          <ProjectFeature project={jeddahProject} index={2} asset="hero" />
        </div>
      </section>

      <section className="m-v3-chapter m-v3-about" aria-labelledby="mobile-about-title">
        <ChapterMarker number="03" label={words.aboutLabel} />
        <div className="m-v3-about__visual" data-reveal>
          <MobileVisual
            project={aboutProject}
            image={aboutProject.gallery[0]}
            asset="gallery-1"
            sizes="(max-width: 900px) 100vw, 1px"
          />
        </div>
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-about-title">{words.aboutTitle}</h2>
          <p>{words.aboutBody}</p>
          <Link className="m-text-link" to="/about">
            <span>{dictionary.actions.readStory}</span>
            <MobileArrow />
          </Link>
        </div>
      </section>

      <section className="m-v3-chapter m-v3-services" id="services" aria-labelledby="mobile-services-title">
        <ChapterMarker number="04" label={words.servicesLabel} />
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-services-title">{words.servicesTitle}</h2>
          <p>{words.servicesBody}</p>
        </div>
        <div className="m-v3-services__reference" data-reveal>
          <MobileVisual
            project={serviceReference}
            image={serviceReference.coverImage}
            asset="cover"
            sizes="(max-width: 900px) 100vw, 1px"
          />
        </div>
        <div className="m-v3-services__list">
          {serviceOrder.map((service, index) => (
            <Link key={service} to="/services" data-reveal>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{dictionary.services[service].title}</strong>
              <small>{dictionary.services[service].description}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="m-v3-chapter m-v3-process" aria-labelledby="mobile-process-title">
        <ChapterMarker number="05" label={words.processLabel} />
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-process-title">{words.processTitle}</h2>
          <p>{words.processBody}</p>
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

      <section className="m-v3-chapter m-v3-archive" aria-labelledby="mobile-archive-title">
        <ChapterMarker number="06" label={words.archiveLabel} />
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-archive-title">{words.archiveTitle}</h2>
          <p>{words.archiveBody}</p>
        </div>
        <div className="m-v3-archive__list">
          {projects.map((project, index) => (
            <ArchiveRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="m-v3-chapter m-v3-contact" aria-labelledby="mobile-contact-title">
        <ChapterMarker number="07" label={words.contactLabel} />
        <div className="m-v3-section-copy" data-reveal>
          <h2 id="mobile-contact-title">{words.contactTitle}</h2>
          <p>{words.contactBody}</p>
        </div>
        <div className="m-v3-contact__methods" data-reveal>
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            <span>{dictionary.ui.whatsapp}</span>
            <i aria-hidden="true">↗</i>
          </a>
          <a href={getEmailHref(language)}>
            <span>{dictionary.ui.email}</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>
    </div>
  );
}
