import { Link } from "react-router-dom";
import { useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent } from "react";
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

const matchaProject = portfolioProject("matcha");
const wemoProject = portfolioProject("wemo-delights");

const servicePreviews: Record<ServiceKey, ServicePreview> = {
  brandIdentity: {
    project: matchaProject,
    image: matchaProject.gallery[6],
    asset: "gallery-7",
    ratio: "landscape",
  },
  logoDesign: {
    project: portfolioProject("ansab-holding"),
    image: portfolioProject("ansab-holding").coverImage,
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
    project: portfolioProject("wello"),
    image: portfolioProject("wello").coverImage,
    asset: "cover",
    ratio: "landscape",
  },
  printDesign: {
    project: portfolioProject("jeddah-railway"),
    image: portfolioProject("jeddah-railway").gallery[2],
    asset: "gallery-3",
    ratio: "wide",
  },
  socialMediaDesign: {
    project: portfolioProject("rahaba-space"),
    image: portfolioProject("rahaba-space").coverImage,
    asset: "cover",
    ratio: "square",
  },
  editorialDesign: {
    project: portfolioProject("red-sea"),
    image: portfolioProject("red-sea").gallery[5],
    asset: "gallery-6",
    ratio: "landscape",
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

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();
  const projectTitle = getProjectDisplayTitle(project, language);
  const projectTitleDirection = getProjectTitleDirection(project, language);

  return (
    <Link className="project-feature" to={`/work/${project.slug}`} data-cursor="view">
      <span className="project-feature__number">{String(index + 1).padStart(2, "0")}</span>
      <ProjectVisual
        image={project.coverImage}
        projectSlug={project.slug}
        asset="cover"
        ratio={index === 0 ? "wide" : index % 2 === 0 ? "landscape" : "portrait"}
      />
      <span className="project-feature__meta">
        {project.year} / {dictionary.categories[project.category]}
      </span>
      <strong dir={projectTitleDirection}>{projectTitle}</strong>
      <span>{project.shortDescription[language]}</span>
    </Link>
  );
}

function ServicesSection() {
  const { dictionary } = useLanguage();
  const [activeService, setActiveService] = useState<ServiceKey>("brandIdentity");
  const preview = servicePreviews[activeService];

  return (
    <section className="section services-section" id="services" aria-labelledby="services-title" data-reveal>
      <div className="section__index">{dictionary.nav.services}</div>
      <div className="services-section__header">
        <h2 id="services-title">{dictionary.nav.services}</h2>
        <p className="services-section__desktop-intro">{dictionary.home.contactBody}</p>
        <p className="services-section__mobile-intro">{dictionary.home.servicesIntro}</p>
      </div>
      <div className="service-preview" aria-hidden="true">
        <ProjectVisual
          className="service-preview__visual"
          image={preview.image}
          projectSlug={preview.project.slug}
          asset={preview.asset}
          ratio={preview.ratio}
        />
        <span className="service-preview__project">{preview.project.title}</span>
      </div>
      <div className="services-list">
        {serviceOrder.map((service, index) => {
          const isActive = activeService === service;
          const panelId = `service-panel-${service}`;

          return (
            <button
              className={isActive ? "service-row service-row--active" : "service-row"}
              key={service}
              type="button"
              onClick={() => setActiveService(service)}
              onMouseEnter={() => setActiveService(service)}
              onFocus={() => setActiveService(service)}
              aria-expanded={isActive}
              aria-controls={panelId}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{dictionary.services[service].title}</h3>
              <p id={panelId}>{dictionary.services[service].description}</p>
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
    <section className="section process-section" aria-labelledby="process-title" data-reveal>
      <div className="section__index">{dictionary.home.processTitle}</div>
      <div className="process-section__intro">
        <h2 id="process-title">{dictionary.home.processTitle}</h2>
        <p>{dictionary.home.processIntro}</p>
      </div>
      <div className="process-track" role="list">
        {dictionary.process.map((stage, index) => (
          <article className="process-stage" role="listitem" key={stage.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedStory({ mobile = false, project }: { mobile?: boolean; project: Project }) {
  const { dictionary, language } = useLanguage();
  const projectTitle = getProjectDisplayTitle(project, language);
  const projectTitleDirection = getProjectTitleDirection(project, language);

  return (
    <section
      className={`featured-story featured-story--${mobile ? "mobile" : "desktop"}`}
      aria-labelledby={mobile ? "featured-mobile-title" : "featured-title"}
      data-reveal
    >
      <div className="featured-story__visual">
        <ProjectVisual
          image={mobile ? project.heroImage : project.gallery[2]}
          projectSlug={project.slug}
          asset={mobile ? "hero" : "gallery-3"}
          ratio="wide"
        />
      </div>
      <div className="featured-story__content">
        <span className="section__index">{dictionary.home.featuredTitle}</span>
        <h2 id={mobile ? "featured-mobile-title" : "featured-title"} dir={projectTitleDirection}>{projectTitle}</h2>
        <p>{mobile ? project.shortDescription[language] : project.fullDescription[language]}</p>
        <div className="palette-row" aria-label={dictionary.sections.palette}>
          {project.colorPalette.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
        <dl className="story-details">
          <div>
            <dt>{dictionary.sections.creativeDirection}</dt>
            <dd>{dictionary.services.creativeDirection.description}</dd>
          </div>
          <div>
            <dt>{dictionary.sections.typography}</dt>
            <dd>{project.typography.display} / {project.typography.body}</dd>
          </div>
        </dl>
        <Link className="text-link" to={`/work/${project.slug}`}>
          {dictionary.actions.readStory} <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  const { dictionary, language } = useLanguage();
  const selected = projects.slice(0, 7);
  const mobileSelected = projects.slice(0, 7);
  const archivePreviewProjects = projects.slice(selected.length);
  const mobileFeatured = projects.find((project) => project.slug === "rahaba-space") ?? projects[7];
  const heroRef = useRef<HTMLElement>(null);

  const setHeroDepthFromPoint = (clientX: number, clientY: number) => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    const rect = hero.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--hero-drift-x", `${x * 18}px`);
    hero.style.setProperty("--hero-drift-y", `${y * 12}px`);
  };

  const setHeroDepth = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }

    setHeroDepthFromPoint(event.clientX, event.clientY);
  };

  const setHeroDepthFromMouse = (event: ReactMouseEvent<HTMLElement>) => {
    setHeroDepthFromPoint(event.clientX, event.clientY);
  };

  const resetHeroDepth = () => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    [
      "--hero-drift-x",
      "--hero-drift-y",
    ].forEach((property) => hero.style.setProperty(property, "0px"));
  };

  return (
    <div className="page page--home">
      <section
        className="hero"
        aria-labelledby="hero-title"
        data-reveal
        ref={heroRef}
        onPointerMove={setHeroDepth}
        onMouseMove={setHeroDepthFromMouse}
        onPointerLeave={resetHeroDepth}
        onMouseLeave={resetHeroDepth}
      >
        <div className="hero__backdrop" />
        <div className="hero__content">
          <div className="hero__topline">
            <p className="hero__descriptor">{dictionary.hero.descriptor}</p>
            <p>{dictionary.hero.edition}</p>
          </div>
          <h1 className="hero__logo-title" id="hero-title">
            <LogoAsset variant="hero" priority />
          </h1>
          <p className="hero__statement">
            <span>{dictionary.hero.lineOne}</span>
            <span>{dictionary.hero.lineTwo}</span>
          </p>
          <p className="hero__body">{dictionary.hero.body}</p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/work">
              {dictionary.actions.viewWork} <Arrow />
            </Link>
            <Link className="button button--quiet" to="/contact">
              {dictionary.actions.startProject}
            </Link>
          </div>
        </div>
        <div className="hero__brand-canvas" aria-hidden="true">
          <span className="hero__brand-plane hero__brand-plane--rose" />
          <span className="hero__brand-plane hero__brand-plane--sage" />
          <span className="hero__brand-plane hero__brand-plane--ivory" />
          <span className="hero__brand-rule hero__brand-rule--one" />
          <span className="hero__brand-rule hero__brand-rule--two" />
          <span className="hero__brand-star hero__brand-star--one">✦</span>
          <span className="hero__brand-star hero__brand-star--two">✦</span>
          <div className="hero__brand-emblem">
            <LogoAsset variant="intro" priority />
          </div>
        </div>
      </section>

      <section className="section selected-work" aria-labelledby="selected-title" data-reveal>
        <div className="selected-work__intro">
          <span className="section__index">{dictionary.home.selectedTitle}</span>
          <h2 id="selected-title">{dictionary.home.selectedTitle}</h2>
          <p>{dictionary.home.selectedIntro}</p>
        </div>
        <div className="selected-work__grid selected-work__grid--desktop">
          {selected.map((project, index) => (
            <ProjectFeature project={project} index={index} key={project.slug} />
          ))}
        </div>
        <div className="selected-work__grid selected-work__grid--mobile">
          {mobileSelected.map((project, index) => (
            <ProjectFeature project={project} index={index} key={project.slug} />
          ))}
        </div>
        <Link className="text-link selected-work__link" to="/work">
          {dictionary.actions.viewAllProjects} <Arrow />
        </Link>
      </section>

      <section className="about-slice" aria-labelledby="about-title" data-reveal>
        <div className="about-slice__quote">
          <p>{dictionary.home.aboutQuote}</p>
        </div>
        <div className="about-slice__text">
          <span className="section__index">{dictionary.home.aboutTitle}</span>
          <h2 id="about-title">{dictionary.home.aboutTitle}</h2>
          <p>{dictionary.home.aboutBody}</p>
          <Link className="text-link" to="/about">
            {dictionary.nav.about} <Arrow />
          </Link>
        </div>
        <ProjectVisual
          className="about-slice__visual"
          image={wemoProject.gallery[4]}
          projectSlug={wemoProject.slug}
          asset="gallery-5"
          ratio="landscape"
        />
      </section>

      <ServicesSection />

      <section className="philosophy-section" aria-labelledby="philosophy-title" data-reveal>
        <h2 id="philosophy-title">{dictionary.home.philosophyTitle}</h2>
        <p>{dictionary.home.philosophyBody}</p>
      </section>

      <ProcessSection />
      <FeaturedStory project={projects[0]} />
      <FeaturedStory mobile project={mobileFeatured} />

      <section className="archive-preview" aria-labelledby="archive-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.home.archiveTitle}</span>
          <h2 id="archive-title">{dictionary.home.archiveTitle}</h2>
          <p className="archive-preview__intro">{dictionary.home.workNote}</p>
        </div>
        <div className="archive-strip">
          {archivePreviewProjects.map((project) => (
            <Link
              className={`archive-strip__item archive-strip__item--${project.slug}`}
              key={project.slug}
              to={`/work/${project.slug}`}
              data-cursor="view"
            >
              <ProjectVisual
                image={project.coverImage}
                projectSlug={project.slug}
                asset="cover"
                ratio="square"
                loading="eager"
              />
              <span dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-cta" aria-labelledby="home-contact-title" data-reveal>
        <div>
          <h2 id="home-contact-title">{dictionary.home.contactTitle}</h2>
          <p>{dictionary.home.contactBody}</p>
        </div>
        <div className="contact-cta__actions">
          <a
            className="button button--primary"
            href={getWhatsAppHref(language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dictionary.actions.contactByWhatsApp} <Arrow />
          </a>
          <a className="button button--quiet" href={getEmailHref(language)}>
            {dictionary.actions.sendEmail}
          </a>
        </div>
      </section>
      <span className="sr-only" lang={language}>
        {dictionary.nav.home}
      </span>
    </div>
  );
}
