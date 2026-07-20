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
const eggSpaceProject = portfolioProject("egg-space");
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
    project: eggSpaceProject,
    image: eggSpaceProject.gallery[6],
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

function ProjectEntry({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(project, language);
  const titleDirection = getProjectTitleDirection(project, language);
  const asset = featured ? "hero" : index % 3 === 0 ? "hero" : "cover";
  const image = asset === "hero" ? project.heroImage : project.coverImage;
  const ratio = featured ? "wide" : index % 2 === 0 ? "landscape" : "portrait";

  return (
    <Link
      className={featured ? "home-work-entry home-work-entry--feature" : "home-work-entry"}
      to={`/work/${project.slug}`}
      data-cursor="view"
    >
      <ProjectVisual
        image={image}
        projectSlug={project.slug}
        asset={asset}
        ratio={ratio}
        loading={index < 3 ? "eager" : "lazy"}
      />
      <div className="home-work-entry__copy">
        <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
        <p>{dictionary.categories[project.category]} / {project.year}</p>
        <h3 dir={titleDirection}>{title}</h3>
        <small>{project.projectType[language]}</small>
      </div>
    </Link>
  );
}

function SelectedWork({ projects: selectedProjects }: { projects: Project[] }) {
  const { dictionary } = useLanguage();
  const [feature, ...supporting] = selectedProjects;

  return (
    <section className="home-selected" aria-labelledby="selected-title" data-reveal>
      <div className="home-section-heading">
        <span className="section__index">02</span>
        <h2 id="selected-title">{dictionary.home.selectedTitle}</h2>
        <p>{dictionary.home.selectedIntro}</p>
      </div>
      <div className="home-selected__layout">
        {feature ? <ProjectEntry project={feature} index={0} featured /> : null}
        <div className="home-selected__supporting">
          {supporting.map((project, index) => (
            <ProjectEntry project={project} index={index + 1} key={project.slug} />
          ))}
        </div>
      </div>
      <Link className="text-link home-selected__link" to="/work">
        {dictionary.actions.viewAllProjects} <Arrow />
      </Link>
    </section>
  );
}

function AboutNoor() {
  const { dictionary } = useLanguage();

  return (
    <section className="home-about" aria-labelledby="home-about-title" data-reveal>
      <div className="home-about__copy">
        <span className="section__index">03</span>
        <h2 id="home-about-title">{dictionary.home.aboutQuote}</h2>
        <p>{dictionary.home.philosophyBody}</p>
        <Link className="text-link" to="/about">
          {dictionary.actions.readStory} <Arrow />
        </Link>
      </div>
      <div className="home-about__visuals" aria-hidden="true">
        <ProjectVisual image={matchaProject.gallery[6]} projectSlug={matchaProject.slug} asset="gallery-7" ratio="wide" fit="cover" />
        <ProjectVisual image={wemoProject.gallery[4]} projectSlug={wemoProject.slug} asset="gallery-5" ratio="portrait" fit="cover" />
      </div>
    </section>
  );
}

function ServicesSection() {
  const { dictionary, language } = useLanguage();
  const [activeService, setActiveService] = useState<ServiceKey>("brandIdentity");
  const preview = servicePreviews[activeService];
  const previewTitle = getProjectDisplayTitle(preview.project, language);

  return (
    <section className="home-services" id="services" aria-labelledby="services-title" data-reveal>
      <div className="home-section-heading">
        <span className="section__index">04</span>
        <h2 id="services-title">{dictionary.nav.services}</h2>
        <p>{dictionary.home.servicesIntro}</p>
      </div>
      <div className="home-services__body">
        <div className="home-services__list">
          {serviceOrder.map((service, index) => {
            const active = service === activeService;

            return (
              <button
                className={active ? "home-service-row home-service-row--active" : "home-service-row"}
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
        <figure className="home-services__preview">
          <ProjectVisual
            image={preview.image}
            projectSlug={preview.project.slug}
            asset={preview.asset}
            ratio={preview.ratio}
          />
          <figcaption dir={getProjectTitleDirection(preview.project, language)}>{previewTitle}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { dictionary } = useLanguage();

  return (
    <section className="home-process" aria-labelledby="process-title" data-reveal>
      <div className="home-section-heading">
        <span className="section__index">05</span>
        <h2 id="process-title">{dictionary.home.processTitle}</h2>
        <p>{dictionary.home.processIntro}</p>
      </div>
      <ol className="home-process__steps">
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

function ArchivePreview({ archiveProjects }: { archiveProjects: Project[] }) {
  const { dictionary, language } = useLanguage();

  return (
    <section className="home-archive" aria-labelledby="archive-title" data-reveal>
      <div className="home-archive__intro">
        <span className="section__index">06</span>
        <h2 id="archive-title">{dictionary.home.archiveTitle}</h2>
        <p>{dictionary.home.workNote}</p>
      </div>
      <div className="home-archive__list">
        {archiveProjects.map((project, index) => (
          <Link key={project.slug} to={`/work/${project.slug}`} data-cursor="view">
            <span dir="ltr">{String(index + 6).padStart(2, "0")}</span>
            <strong dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</strong>
            <small>{dictionary.categories[project.category]}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContactCallout() {
  const { dictionary, language } = useLanguage();

  return (
    <section className="home-contact" aria-labelledby="home-contact-title" data-reveal>
      <div>
        <span className="section__index">07</span>
        <h2 id="home-contact-title">{dictionary.home.contactTitle}</h2>
        <p>{dictionary.home.contactBody}</p>
      </div>
      <div className="home-contact__actions">
        <a className="button button--primary" href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
          {dictionary.actions.contactByWhatsApp} <Arrow />
        </a>
        <a className="button button--quiet" href={getEmailHref(language)}>
          {dictionary.actions.sendEmail}
        </a>
      </div>
    </section>
  );
}

export function HomePage() {
  const { dictionary, language } = useLanguage();
  const selectedProjects = projects.slice(0, 5);
  const archivePreviewProjects = projects.slice(5);
  const heroTitle = language === "ar" ? "نور بامعروف" : "NOOR BAMAROUF";
  const heroDisciplines = [
    dictionary.services.brandIdentity.title,
    dictionary.services.packagingDesign.title,
    dictionary.services.printDesign.title,
    dictionary.services.editorialDesign.title,
    dictionary.services.socialMediaDesign.title,
    dictionary.services.creativeDirection.title,
  ];

  return (
    <div className="page page--home page--rebuild">
      <section className="home-hero" aria-labelledby="hero-title" data-reveal>
        <div className="home-hero__identity">
          <LogoAsset variant="hero" priority />
          <p>{dictionary.hero.descriptor}</p>
        </div>
        <div className="home-hero__copy">
          <span className="section__index">01 / {dictionary.hero.edition}</span>
          <h1 id="hero-title">{heroTitle}</h1>
          <p>{dictionary.hero.body}</p>
          <ul aria-label={dictionary.sections.capabilities}>
            {heroDisciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
          <div className="home-hero__actions">
            <Link className="button button--primary" to="/work">
              {dictionary.actions.viewWork} <Arrow />
            </Link>
            <Link className="button button--quiet" to="/contact">
              {dictionary.actions.startProject}
            </Link>
          </div>
        </div>
        <Link className="home-hero__feature" to={`/work/${welloProject.slug}`} data-cursor="view">
          <ProjectVisual
            image={welloProject.heroImage}
            projectSlug={welloProject.slug}
            asset="hero"
            ratio="wide"
            fit="cover"
            loading="eager"
          />
          <span>{dictionary.actions.openProject}</span>
        </Link>
      </section>

      <SelectedWork projects={selectedProjects} />
      <AboutNoor />
      <ServicesSection />
      <ProcessSection />
      <ArchivePreview archiveProjects={archivePreviewProjects} />
      <ContactCallout />
    </div>
  );
}
