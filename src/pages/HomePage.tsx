import { Link } from "react-router-dom";
import { useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent } from "react";
import { ArtFrame } from "../components/ArtFrame";
import { LogoAsset } from "../components/LogoAsset";
import { ProjectVisual } from "../components/ProjectVisual";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { serviceOrder } from "../data/content";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { ArtScene, ArtVariant, Project, ServiceKey } from "../types";

function Arrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

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
      <strong>{project.title}</strong>
      <span>{project.shortDescription[language]}</span>
    </Link>
  );
}

function ServicesSection() {
  const { dictionary } = useLanguage();
  const [activeService, setActiveService] = useState<ServiceKey>("brandIdentity");
  const serviceVisuals: Record<ServiceKey, ArtVariant> = {
    brandIdentity: "flora",
    graphicDesign: "monolith",
    packagingDesign: "noma",
    printDesign: "kinfolk",
    socialMediaDesign: "luna",
    editorialDesign: "elysian",
    creativeDirection: "atelier",
  };
  const serviceScenes: Record<ServiceKey, ArtScene> = {
    brandIdentity: "stationery",
    graphicDesign: "signage",
    packagingDesign: "packaging",
    printDesign: "print",
    socialMediaDesign: "social",
    editorialDesign: "editorial",
    creativeDirection: "campaign",
  };

  return (
    <section className="section services-section" id="services" aria-labelledby="services-title" data-reveal>
      <div className="section__index">{dictionary.nav.services}</div>
      <div className="services-section__header">
        <h2 id="services-title">{dictionary.nav.services}</h2>
        <p>
          {dictionary.home.contactBody}
        </p>
      </div>
      <div className="service-preview" aria-hidden="true">
        <ArtFrame
          variant={serviceVisuals[activeService]}
          scene={serviceScenes[activeService]}
          alt={{
            en: "Service art direction preview.",
            ar: "معاينة بصرية للخدمة.",
          }}
          ratio="square"
        />
      </div>
      <div className="services-list">
        {serviceOrder.map((service, index) => (
          <button
            className={activeService === service ? "service-row service-row--active" : "service-row"}
            key={service}
            type="button"
            onMouseEnter={() => setActiveService(service)}
            onFocus={() => setActiveService(service)}
            onClick={() => setActiveService(service)}
            aria-expanded={activeService === service}
            aria-controls={`service-panel-${service}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{dictionary.services[service].title}</h3>
            <p id={`service-panel-${service}`}>{dictionary.services[service].description}</p>
          </button>
        ))}
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

function FeaturedStory() {
  const { dictionary, language } = useLanguage();
  const featured = projects[0];

  return (
    <section className="featured-story" aria-labelledby="featured-title" data-reveal>
      <div className="featured-story__visual">
        <ProjectVisual
          image={featured.heroImage}
          projectSlug={featured.slug}
          asset="hero"
          ratio="wide"
        />
      </div>
      <div className="featured-story__content">
        <span className="section__index">{dictionary.home.featuredTitle}</span>
        <h2 id="featured-title">{featured.title}</h2>
        <p>{featured.fullDescription[language]}</p>
        <div className="palette-row" aria-label={dictionary.sections.palette}>
          {featured.colorPalette.map((color) => (
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
            <dd>{featured.typography.display} / {featured.typography.body}</dd>
          </div>
        </dl>
        <Link className="text-link" to={`/work/${featured.slug}`}>
          {dictionary.actions.readStory} <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  const { dictionary, language } = useLanguage();
  const selected = projects.slice(0, 4);
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
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-stage">
            <ProjectVisual
              className="hero__main-frame"
              image={projects[0].heroImage}
              projectSlug={projects[0].slug}
              asset="hero"
              ratio="wide"
              loading="eager"
            />
            <div className="hero__caption">
              <span>{dictionary.hero.materialNote}</span>
            </div>
          </div>
          <div className="hero__studio-note">
            <span />
            <p>{dictionary.hero.studioNote}</p>
          </div>
        </div>
        <div className="hero__side-note">
          <span>{dictionary.hero.cue}</span>
        </div>
      </section>

      <section className="section selected-work" aria-labelledby="selected-title" data-reveal>
        <div className="selected-work__intro">
          <span className="section__index">{dictionary.home.selectedTitle}</span>
          <h2 id="selected-title">{dictionary.home.selectedTitle}</h2>
          <p>{dictionary.home.selectedIntro}</p>
        </div>
        <div className="selected-work__grid">
          {selected.map((project, index) => (
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
        <ArtFrame
          variant="materials"
          scene="materials"
          alt={{
            en: "Studio material study with paper, blush ceramics, and soft shadows.",
            ar: "دراسة مواد في الاستوديو مع ورق وخزف وردي وظلال ناعمة.",
          }}
          ratio="landscape"
        />
      </section>

      <ServicesSection />

      <section className="philosophy-section" aria-labelledby="philosophy-title" data-reveal>
        <h2 id="philosophy-title">{dictionary.home.philosophyTitle}</h2>
        <p>{dictionary.home.philosophyBody}</p>
      </section>

      <ProcessSection />
      <FeaturedStory />

      <section className="archive-preview" aria-labelledby="archive-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.home.archiveTitle}</span>
          <h2 id="archive-title">{dictionary.home.archiveTitle}</h2>
        </div>
        <div className="archive-strip">
          {projects.slice(2).map((project) => (
            <Link key={project.slug} to={`/work/${project.slug}`} data-cursor="view">
              <ProjectVisual
                image={project.coverImage}
                projectSlug={project.slug}
                asset="cover"
                ratio="square"
              />
              <span>{project.title}</span>
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
