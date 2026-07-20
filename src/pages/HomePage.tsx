import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoAsset } from "../components/LogoAsset";
import { ProjectVisual, type ProjectVisualAsset } from "../components/ProjectVisual";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { serviceOrder } from "../data/content";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { Project, ProjectImage, ServiceKey } from "../types";

function portfolioProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Missing portfolio project: ${slug}`);
  }

  return project;
}

interface ServicePreview {
  project: Project;
  image: ProjectImage;
  asset: ProjectVisualAsset;
  ratio: "portrait" | "landscape" | "square" | "wide";
}

const welloProject = portfolioProject("wello");
const matchaProject = portfolioProject("matcha");
const jeddahProject = portfolioProject("jeddah-railway");
const wemoProject = portfolioProject("wemo-delights");
const ansabProject = portfolioProject("ansab-holding");
const rahabaProject = portfolioProject("rahaba-space");

const servicePreviews: Record<ServiceKey, ServicePreview> = {
  brandIdentity: {
    project: matchaProject,
    image: matchaProject.gallery[6],
    asset: "gallery-7",
    ratio: "landscape",
  },
  logoDesign: {
    project: ansabProject,
    image: ansabProject.coverImage,
    asset: "cover",
    ratio: "square",
  },
  graphicDesign: {
    project: portfolioProject("egg-space"),
    image: portfolioProject("egg-space").gallery[6],
    asset: "gallery-7",
    ratio: "landscape",
  },
  packagingDesign: {
    project: welloProject,
    image: welloProject.coverImage,
    asset: "cover",
    ratio: "landscape",
  },
  printDesign: {
    project: jeddahProject,
    image: jeddahProject.gallery[2],
    asset: "gallery-3",
    ratio: "wide",
  },
  socialMediaDesign: {
    project: rahabaProject,
    image: rahabaProject.coverImage,
    asset: "cover",
    ratio: "square",
  },
  editorialDesign: {
    project: jeddahProject,
    image: jeddahProject.gallery[0],
    asset: "gallery-1",
    ratio: "wide",
  },
  creativeDirection: {
    project: wemoProject,
    image: wemoProject.gallery[1],
    asset: "gallery-2",
    ratio: "landscape",
  },
};

function Arrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

function ProjectRoom({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);
  const useHero = index === 0 || index === 2;
  const asset = useHero ? "hero" : "cover";
  const image = useHero ? project.heroImage : project.coverImage;
  const ratio = index === 0 ? "wide" : index % 3 === 1 ? "portrait" : "landscape";

  return (
    <Link className={`v2-work-card v2-work-card--${index % 4}`} to={`/work/${project.slug}`} data-cursor="view">
      <ProjectVisual
        image={image}
        projectSlug={project.slug}
        asset={asset}
        ratio={ratio}
        loading={index < 3 ? "eager" : "lazy"}
      />
      <span className="v2-work-card__count" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      <span className="v2-work-card__meta">{project.year} / {dictionary.categories[project.category]}</span>
      <strong dir={titleDirection}>{title}</strong>
      <span>{project.shortDescription[language]}</span>
    </Link>
  );
}

function ServicesSection() {
  const { dictionary } = useLanguage();
  const [activeService, setActiveService] = useState<ServiceKey>("brandIdentity");
  const preview = servicePreviews[activeService];

  return (
    <section className="v2-services" id="services" aria-labelledby="services-title" data-reveal>
      <div className="v2-services__intro">
        <span className="section__index">{dictionary.nav.services}</span>
        <h2 id="services-title">{dictionary.nav.services}</h2>
        <p>{dictionary.home.servicesIntro}</p>
      </div>
      <div className="v2-services__visual">
        <ProjectVisual
          className="v2-services__image"
          image={preview.image}
          projectSlug={preview.project.slug}
          asset={preview.asset}
          ratio={preview.ratio}
        />
        <span>{preview.project.title}</span>
      </div>
      <div className="v2-services__list">
        {serviceOrder.map((service, index) => {
          const active = service === activeService;

          return (
            <button
              className={active ? "v2-service-row v2-service-row--active" : "v2-service-row"}
              key={service}
              type="button"
              onClick={() => setActiveService(service)}
              onFocus={() => setActiveService(service)}
              onMouseEnter={() => setActiveService(service)}
              aria-pressed={active}
            >
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{dictionary.services[service].title}</strong>
              <em>{dictionary.services[service].description}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ProcessSection() {
  const { dictionary } = useLanguage();

  return (
    <section className="v2-process" aria-labelledby="process-title" data-reveal>
      <div className="v2-process__intro">
        <span className="section__index">{dictionary.home.processTitle}</span>
        <h2 id="process-title">{dictionary.home.processTitle}</h2>
        <p>{dictionary.home.processIntro}</p>
      </div>
      <ol className="v2-process__steps">
        {dictionary.process.map((stage, index) => (
          <li key={stage.title}>
            <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FeaturedCase({ project }: { project: Project }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);

  return (
    <section className="v2-featured-case" aria-labelledby="featured-title" data-reveal>
      <ProjectVisual
        className="v2-featured-case__image"
        image={project.heroImage}
        projectSlug={project.slug}
        asset="hero"
        ratio="wide"
      />
      <div className="v2-featured-case__copy">
        <span className="section__index">{dictionary.home.featuredTitle}</span>
        <h2 id="featured-title" dir={titleDirection}>{title}</h2>
        <p>{project.fullDescription[language]}</p>
        <div className="palette-row" aria-label={dictionary.sections.palette}>
          {project.colorPalette.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
        <Link className="text-link" to={`/work/${project.slug}`}>
          {dictionary.actions.readStory} <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  const { dictionary, language } = useLanguage();
  const selected = projects.slice(0, 8);
  const archivePreviewProjects = projects.slice(8);

  return (
    <div className="page page--home page--v2">
      <section className="v2-hero" aria-labelledby="hero-title" data-reveal>
        <div className="v2-hero__atmosphere" aria-hidden="true">
          <span className="v2-hero__sheet v2-hero__sheet--one" />
          <span className="v2-hero__sheet v2-hero__sheet--two" />
          <span className="v2-hero__sheet v2-hero__sheet--three" />
          <span className="v2-hero__light" />
          <span className="v2-hero__press-mark" />
        </div>
        <div className="v2-hero__identity">
          <LogoAsset variant="hero" priority />
        </div>
        <div className="v2-hero__copy">
          <p>{dictionary.hero.descriptor}</p>
          <h1 id="hero-title">
            <span>{dictionary.hero.lineOne}</span>
            <span>{dictionary.hero.lineTwo}</span>
          </h1>
          <p>{dictionary.hero.body}</p>
          <div className="v2-hero__actions">
            <Link className="button button--primary" to="/work">
              {dictionary.actions.viewWork} <Arrow />
            </Link>
            <Link className="button button--quiet" to="/contact">
              {dictionary.actions.startProject}
            </Link>
          </div>
        </div>
      </section>

      <section className="v2-material-statement" aria-labelledby="statement-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.home.aboutTitle}</span>
          <h2 id="statement-title">{dictionary.home.aboutQuote}</h2>
        </div>
        <p>{dictionary.home.philosophyBody}</p>
        <div className="v2-material-statement__images" aria-hidden="true">
          <ProjectVisual image={matchaProject.gallery[1]} projectSlug={matchaProject.slug} asset="gallery-2" ratio="square" />
          <ProjectVisual image={wemoProject.gallery[4]} projectSlug={wemoProject.slug} asset="gallery-5" ratio="portrait" />
        </div>
      </section>

      <section className="v2-selected-work" aria-labelledby="selected-title" data-reveal>
        <div className="v2-selected-work__intro">
          <span className="section__index">{dictionary.home.selectedTitle}</span>
          <h2 id="selected-title">{dictionary.home.selectedTitle}</h2>
          <p>{dictionary.home.selectedIntro}</p>
        </div>
        <div className="v2-selected-work__rooms">
          {selected.map((project, index) => (
            <ProjectRoom project={project} index={index} key={project.slug} />
          ))}
        </div>
        <Link className="text-link v2-selected-work__link" to="/work">
          {dictionary.actions.viewAllProjects} <Arrow />
        </Link>
      </section>

      <FeaturedCase project={projects[0]} />
      <ServicesSection />
      <ProcessSection />

      <section className="v2-archive-preview" aria-labelledby="archive-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.home.archiveTitle}</span>
          <h2 id="archive-title">{dictionary.home.archiveTitle}</h2>
          <p>{dictionary.home.workNote}</p>
        </div>
        <div className="v2-archive-preview__list">
          {archivePreviewProjects.map((project) => (
            <Link key={project.slug} to={`/work/${project.slug}`} data-cursor="view">
              <ProjectVisual image={project.coverImage} projectSlug={project.slug} asset="cover" ratio="square" />
              <span dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="v2-contact-cta" aria-labelledby="home-contact-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.nav.contact}</span>
          <h2 id="home-contact-title">{dictionary.home.contactTitle}</h2>
          <p>{dictionary.home.contactBody}</p>
        </div>
        <div className="v2-contact-cta__actions">
          <a className="button button--primary" href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.actions.contactByWhatsApp} <Arrow />
          </a>
          <a className="button button--quiet" href={getEmailHref(language)}>
            {dictionary.actions.sendEmail}
          </a>
        </div>
      </section>
    </div>
  );
}
