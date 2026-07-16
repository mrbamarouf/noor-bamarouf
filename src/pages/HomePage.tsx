import { Link } from "react-router-dom";
import { useState } from "react";
import { ArtFrame } from "../components/ArtFrame";
import { BrandMark } from "../components/BrandMark";
import { serviceOrder } from "../data/content";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { ArtVariant, Project, ServiceKey } from "../types";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

  return (
    <Link className="project-feature" to={`/work/${project.slug}`} data-cursor="view">
      <span className="project-feature__number">{String(index + 1).padStart(2, "0")}</span>
      <ArtFrame
        variant={project.heroImage.variant}
        alt={project.heroImage.alt}
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
    graphicDesign: "aurora",
    packagingDesign: "nude",
    printDesign: "kinfolk",
    socialMediaDesign: "luna",
    editorialDesign: "elysian",
    creativeDirection: "studio",
  };

  return (
    <section className="section services-section" id="services" aria-labelledby="services-title" data-reveal>
      <div className="section__index">{dictionary.nav.services}</div>
      <div className="services-section__header">
        <h2 id="services-title">{dictionary.nav.services}</h2>
        <p>
          {dictionary.home.contactBody}
        </p>
        <div className="service-preview" aria-hidden="true">
          <ArtFrame
            variant={serviceVisuals[activeService]}
            alt={{
              en: "Service art direction preview.",
              ar: "معاينة بصرية للخدمة.",
            }}
            ratio="square"
          />
        </div>
      </div>
      <div className="services-list">
        {serviceOrder.map((service, index) => (
          <button
            className={activeService === service ? "service-row service-row--active" : "service-row"}
            key={service}
            type="button"
            onMouseEnter={() => setActiveService(service)}
            onFocus={() => setActiveService(service)}
            aria-pressed={activeService === service}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{dictionary.services[service].title}</h3>
            <p>{dictionary.services[service].description}</p>
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
        <ArtFrame variant={featured.heroImage.variant} alt={featured.heroImage.alt} ratio="wide" />
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

  return (
    <div className="page page--home">
      <section className="hero" aria-labelledby="hero-title" data-reveal>
        <div className="hero__backdrop" />
        <div className="hero__identity">
          <BrandMark variant="compact" />
        </div>
        <div className="hero__content">
          <p className="hero__descriptor">{dictionary.hero.descriptor}</p>
          <h1 id="hero-title">
            <span>NOUR</span>
            <span>BAMAROUF</span>
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
        <div className="hero__visual">
          <ArtFrame
            variant="flora"
            alt={{
              en: "Editorial still life with paper, botanical stems, and soft green glass.",
              ar: "تكوين تحريري بأوراق وسيقان نباتية وزجاج أخضر ناعم.",
            }}
            ratio="portrait"
            loading="eager"
          />
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
          alt={{
            en: "Studio material study with paper, blush ceramics, and soft shadows.",
            ar: "دراسة مواد في الاستوديو مع ورق وخزف وردي وظلال ناعمة.",
          }}
          ratio="landscape"
        />
      </section>

      <ServicesSection />

      <section className="philosophy-section" aria-labelledby="philosophy-title" data-reveal>
        <div className="philosophy-section__line" />
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
              <ArtFrame variant={project.heroImage.variant} alt={project.heroImage.alt} ratio="square" />
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
        <Link className="button button--primary" to="/contact">
          {dictionary.actions.startProject} <Arrow />
        </Link>
      </section>
      <span className="sr-only" lang={language}>
        {dictionary.nav.home}
      </span>
    </div>
  );
}
