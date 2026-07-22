import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DecorativeNbLogo } from "../components/DecorativeNbLogo";
import { ProjectVisual, type ProjectVisualAsset } from "../components/ProjectVisual";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import {
  getDesktopProjectCover,
  getProjectImageByAsset,
  getProjectThemeStyle,
} from "../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import type { Project, ServiceKey } from "../types";
import type { CSSProperties } from "react";

interface HomeProjectMoment {
  project: Project;
  asset: ProjectVisualAsset;
  ratio: "portrait" | "landscape" | "square" | "wide";
  fit?: "contain" | "cover";
  format?: "jpg" | "png" | "webp";
  tone?: "lead" | "quiet" | "color" | "tall";
}

const approvedServices: ServiceKey[] = [
  "brandIdentity",
  "packagingDesign",
  "printDesign",
  "socialMediaDesign",
  "editorialDesign",
  "creativeDirection",
];

function findProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);
  return project;
}

const featuredRotationMs = 6400;
const featuredProjectSlugs = [
  "red-bull-marvel",
  "wello",
  "matcha",
  "jeddah-railway",
  "wemo-delights",
  "impostor",
  "nirto-cold-brew",
  "ansab-holding",
] as const;

const featuredShowcaseProjects = featuredProjectSlugs.map(findProject);

const selectedMoments: HomeProjectMoment[] = [
  { project: findProject("wello"), asset: "cover", ratio: "wide", fit: "contain", tone: "lead" },
  { project: findProject("matcha"), asset: "hero", ratio: "wide", fit: "cover", tone: "quiet" },
  { project: findProject("red-bull-marvel"), asset: "hero", ratio: "square", fit: "contain", tone: "color" },
  { project: findProject("rahaba-space"), asset: "gallery-8", ratio: "portrait", fit: "cover", tone: "tall" },
  { project: findProject("wemo-delights"), asset: "hero", ratio: "landscape", fit: "cover", tone: "quiet" },
  { project: findProject("jeddah-railway"), asset: "showcase/showcase-01", ratio: "wide", fit: "contain", format: "png" },
  { project: findProject("ansab-holding"), asset: "hero", ratio: "landscape", fit: "cover", tone: "quiet" },
];

const servicePreviewMoments: Record<ServiceKey, HomeProjectMoment> = {
  brandIdentity: { project: findProject("wemo-delights"), asset: "hero", ratio: "landscape", fit: "cover" },
  logoDesign: { project: findProject("ansab-holding"), asset: "hero", ratio: "landscape", fit: "cover" },
  graphicDesign: { project: findProject("red-bull-marvel"), asset: "hero", ratio: "square", fit: "contain" },
  packagingDesign: { project: findProject("nirto-cold-brew"), asset: "hero", ratio: "landscape", fit: "cover" },
  printDesign: { project: findProject("egg-space"), asset: "cover", ratio: "square", fit: "cover" },
  socialMediaDesign: { project: findProject("rahaba-space"), asset: "gallery-8", ratio: "portrait", fit: "cover" },
  editorialDesign: { project: findProject("matcha"), asset: "gallery-3", ratio: "landscape", fit: "cover" },
  creativeDirection: { project: findProject("red-bull-marvel"), asset: "gallery-2", ratio: "square", fit: "contain" },
};

const homeCopy = {
  en: {
    heroRole: "Independent Graphic Designer",
    heroTitle: "NOOR BAMAROUF",
    heroBody:
      "I create visual identities, packaging, print, editorial, and social experiences shaped with intention and thoughtful detail.",
    metrics: ["Projects", "Disciplines", "Categories"],
    serviceLine: "Identity / Packaging / Print / Editorial / Social",
    selectedLabel: "Selected Work",
    selectedTitle: "A curated sequence of finished visual worlds.",
    selectedBody: "A focused edit across identity, packaging, social media, campaigns, print, and logo work.",
    featuredLabel: "Featured Project",
    pointLabel: "Point of View",
    pointTitle: "Quiet design becomes memorable when every material, crop, and mark has a reason.",
    pointBody:
      "Noor’s work is shaped through proportion, tactile detail, restrained color, and clear hierarchy, so each piece can feel considered without becoming loud.",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "A compact index of services, connected to finished work.",
    processLabel: "Process",
    processTitle: "A measured route from first feeling to final files.",
    archiveLabel: "Project Archive",
    archiveTitle: "All projects, kept easy to scan.",
    archiveBody: "The archive reads directly from the portfolio data, preserving order and routes.",
    contactLabel: "BEGIN A PROJECT",
    contactTitle: "Let’s create something considered.",
    contactBody: "Share a short project note and begin the conversation.",
    whatsapp: "WhatsApp",
    email: "Email",
    viewProject: "View project",
    previousFeatured: "Previous featured project",
    nextFeatured: "Next featured project",
  },
  ar: {
    heroRole: "مصممة جرافيك مستقلة",
    heroTitle: "نور بامعروف",
    heroBody: "أصمم هويات بصرية وتغليفًا ومطبوعات وتجارب تحريرية واجتماعية بتفاصيل مدروسة وغاية واضحة.",
    metrics: ["المشاريع", "التخصصات", "الفئات"],
    serviceLine: "هوية / تغليف / طباعة / تحرير بصري / محتوى اجتماعي",
    selectedLabel: "أعمال مختارة",
    selectedTitle: "تتابع من عوالم بصرية مكتملة.",
    selectedBody: "اختيار مركز من أعمال الهوية والتغليف والتواصل الاجتماعي والحملات والمطبوعات والشعارات.",
    featuredLabel: "مشروع مختار",
    pointLabel: "وجهة نظر",
    pointTitle: "يصبح التصميم الهادئ راسخًا عندما يكون لكل مادة وقصّة وعلامة سبب واضح.",
    pointBody:
      "يتشكل عمل نور عبر النسبة، التفاصيل الملموسة، اللون المضبوط، والهرمية الواضحة، حتى تبدو كل قطعة مدروسة دون أن تصبح صاخبة.",
    capabilitiesLabel: "القدرات",
    capabilitiesTitle: "فهرس مختصر للخدمات، متصل بأعمال منجزة.",
    processLabel: "المنهجية",
    processTitle: "مسار متزن من الإحساس الأول إلى الملفات النهائية.",
    archiveLabel: "أرشيف المشاريع",
    archiveTitle: "كل المشاريع في فهرس سهل القراءة.",
    archiveBody: "يعتمد الأرشيف مباشرة على بيانات البورتفوليو، مع الحفاظ على الترتيب والروابط.",
    contactLabel: "ابدأ مشروعًا",
    contactTitle: "لنصنع شيئًا مدروسًا.",
    contactBody: "شاركينا نبذة قصيرة عن المشروع ولنبدأ الحديث.",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    viewProject: "عرض المشروع",
    previousFeatured: "المشروع المختار السابق",
    nextFeatured: "المشروع المختار التالي",
  },
} as const;

function Arrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function ProjectMomentCard({ moment, index }: { moment: HomeProjectMoment; index: number }) {
  const { dictionary, language } = useLanguage();
  const title = getProjectDisplayTitle(moment.project, language);
  const coverImage = getProjectImageByAsset(moment.project, moment.asset);

  return (
    <Link
      className={`noor-home-v3__work-card noor-home-v3__work-card--${index + 1}`}
      to={`/work/${moment.project.slug}`}
      data-tone={moment.tone ?? "standard"}
      data-cursor="view"
    >
      <ProjectVisual
        image={coverImage}
        projectSlug={moment.project.slug}
        asset={moment.asset}
        ratio={moment.ratio}
        fit={moment.fit}
        formatOverride={moment.format}
        loading={index < 3 ? "eager" : "lazy"}
        preserveAspect={false}
      />
      <div className="noor-home-v3__work-meta">
        <span dir="ltr">{formatIndex(index)}</span>
        <h3 dir={getProjectTitleDirection(moment.project, language)}>{title}</h3>
        <p>{dictionary.categories[moment.project.category]}</p>
      </div>
    </Link>
  );
}

function SignatureHero() {
  const { dictionary, direction, language } = useLanguage();
  const copy = homeCopy[language];
  const visibleServiceKeys = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.services))), []);
  const visibleCategoryKeys = useMemo(() => new Set(projects.map((project) => project.category)), []);
  const numberFormatter = new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US");
  const metrics = [
    { value: projects.length, label: copy.metrics[0] },
    { value: visibleServiceKeys.length, label: copy.metrics[1] },
    { value: visibleCategoryKeys.size, label: copy.metrics[2] },
  ];

  return (
    <section className="noor-home-v3__hero" aria-labelledby="noor-home-v3-hero-title" data-reveal>
      <div className="noor-home-v3__hero-copy desktop-section-flow">
        <span className="noor-home-v3__label">{copy.heroRole}</span>
        <h1 id="noor-home-v3-hero-title">{copy.heroTitle}</h1>
        <span className="noor-home-v3__hero-rule" aria-hidden="true" />
        <p>{copy.heroBody}</p>
        <div className="noor-home-v3__actions">
          <Link className="desktop-button desktop-button--primary" to="/work">
            {dictionary.actions.viewWork} <Arrow />
          </Link>
          <Link className="desktop-button desktop-button--ghost" to="/contact">
            {dictionary.actions.startProject}
          </Link>
        </div>
      </div>
      <div className="noor-home-v3__hero-visual" aria-label={dictionary.hero.descriptor}>
        <DecorativeNbLogo priority className="noor-home-v3__hero-mark" />
      </div>
      <dl className="noor-home-v3__metrics">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dd dir={direction === "rtl" ? "rtl" : "ltr"}>{numberFormatter.format(metric.value)}</dd>
            <dt>{metric.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SelectedWork() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <section className="noor-home-v3__selected" aria-labelledby="noor-home-v3-selected-title" data-reveal>
      <div className="noor-home-v3__section-head desktop-section-flow">
        <span className="noor-home-v3__label">{copy.selectedLabel}</span>
        <h2 id="noor-home-v3-selected-title">{copy.selectedTitle}</h2>
        <p>{copy.selectedBody}</p>
      </div>
      <div className="noor-home-v3__work-grid">
        {selectedMoments.map((moment, index) => (
          <ProjectMomentCard key={`${moment.project.slug}-${moment.asset}`} moment={moment} index={index} />
        ))}
      </div>
    </section>
  );
}

function FeaturedInterruption() {
  const { dictionary, direction, language } = useLanguage();
  const copy = homeCopy[language];
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeProject = featuredShowcaseProjects[activeIndex] ?? featuredShowcaseProjects[0];
  const activeCover = getDesktopProjectCover(activeProject);
  const activeImage = getProjectImageByAsset(activeProject, activeCover.asset);
  const projectTitle = getProjectDisplayTitle(activeProject, language);
  const projectCategory = dictionary.categories[activeProject.category];
  const projectDescription = activeProject.shortDescription[language];
  const previousArrow = direction === "rtl" ? "→" : "←";
  const nextArrow = direction === "rtl" ? "←" : "→";

  useEffect(() => {
    if (prefersReducedMotion || isPaused || featuredShowcaseProjects.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % featuredShowcaseProjects.length);
    }, featuredRotationMs);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const showPreviousProject = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + featuredShowcaseProjects.length) % featuredShowcaseProjects.length);
  };

  const showNextProject = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % featuredShowcaseProjects.length);
  };

  return (
    <section
      className="noor-home-v3__feature"
      aria-labelledby="noor-home-v3-feature-title"
      style={getProjectThemeStyle(activeProject) as CSSProperties}
      data-project={activeProject.slug}
      data-paused={isPaused || prefersReducedMotion ? "true" : "false"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
      data-reveal
    >
      <div className="noor-home-v3__feature-copy desktop-section-flow" key={`copy-${activeProject.slug}`}>
        <span>{copy.featuredLabel}</span>
        <h2 id="noor-home-v3-feature-title" dir={getProjectTitleDirection(activeProject, language)}>
          {projectTitle}
        </h2>
        <strong>{projectCategory}</strong>
        <p>{projectDescription}</p>
        <Link to={`/work/${activeProject.slug}`}>
          {copy.viewProject} <Arrow />
        </Link>
      </div>
      <Link
        className="noor-home-v3__feature-visual"
        key={`visual-${activeProject.slug}`}
        to={`/work/${activeProject.slug}`}
        data-cursor="view"
      >
        <ProjectVisual
          image={activeImage}
          projectSlug={activeProject.slug}
          asset={activeCover.asset}
          ratio={activeCover.ratio}
          fit={activeCover.fit}
          formatOverride={activeCover.format}
          loading="lazy"
          preserveAspect={false}
        />
        <div>
          <strong dir={getProjectTitleDirection(activeProject, language)}>{projectTitle}</strong>
          <span>{activeProject.projectType[language]}</span>
        </div>
      </Link>
      <div className="noor-home-v3__feature-controls" aria-label={copy.featuredLabel}>
        <button type="button" onClick={showPreviousProject} aria-label={copy.previousFeatured}>
          <span aria-hidden="true">{previousArrow}</span>
        </button>
        <div className="noor-home-v3__feature-dots">
          {featuredShowcaseProjects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`${copy.viewProject}: ${getProjectDisplayTitle(project, language)}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span dir="ltr">{formatIndex(index)}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={showNextProject} aria-label={copy.nextFeatured}>
          <span aria-hidden="true">{nextArrow}</span>
        </button>
      </div>
    </section>
  );
}

function PointOfView() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <section className="noor-home-v3__point" aria-labelledby="noor-home-v3-point-title" data-reveal>
      <div className="noor-home-v3__point-material" aria-hidden="true">
        <DecorativeNbLogo />
      </div>
      <div className="noor-home-v3__point-copy desktop-section-flow">
        <span className="noor-home-v3__label">{copy.pointLabel}</span>
        <h2 id="noor-home-v3-point-title">{copy.pointTitle}</h2>
        <p>{copy.pointBody}</p>
      </div>
    </section>
  );
}

function Capabilities() {
  const { dictionary, language } = useLanguage();
  const copy = homeCopy[language];
  const [activeService, setActiveService] = useState<ServiceKey>("brandIdentity");
  const activeMoment = servicePreviewMoments[activeService];
  const activeImage = getProjectImageByAsset(activeMoment.project, activeMoment.asset);
  const activeTitle = getProjectDisplayTitle(activeMoment.project, language);
  const activePreviewKey = `${activeService}-${activeMoment.project.slug}-${activeMoment.asset}-${language}`;

  const activateService = (service: ServiceKey) => {
    setActiveService((currentService) => (currentService === service ? currentService : service));
  };

  return (
    <section className="noor-home-v3__capabilities" id="services" aria-labelledby="noor-home-v3-capabilities-title" data-reveal>
      <div className="noor-home-v3__section-head noor-home-v3__section-head--compact desktop-section-flow">
        <span className="noor-home-v3__label">{copy.capabilitiesLabel}</span>
        <h2 id="noor-home-v3-capabilities-title">{copy.capabilitiesTitle}</h2>
      </div>
      <div className="noor-home-v3__service-shell">
        <div
          key={activePreviewKey}
          className="noor-home-v3__service-preview"
          style={getProjectThemeStyle(activeMoment.project) as CSSProperties}
          data-active-service={activeService}
        >
          <ProjectVisual
            key={`visual-${activePreviewKey}`}
            image={activeImage}
            projectSlug={activeMoment.project.slug}
            asset={activeMoment.asset}
            ratio={activeMoment.ratio}
            fit={activeMoment.fit}
            formatOverride={activeMoment.format}
            preserveAspect={false}
          />
          <span key={`title-${activePreviewKey}`} dir={getProjectTitleDirection(activeMoment.project, language)}>
            {activeTitle}
          </span>
        </div>
        <ol className="noor-home-v3__service-list">
          {approvedServices.map((service, index) => (
            <li key={service}>
              <button
                type="button"
                className={service === activeService ? "is-active" : ""}
                onMouseEnter={() => activateService(service)}
                onFocus={() => activateService(service)}
                onClick={() => activateService(service)}
              >
                <span dir="ltr">{formatIndex(index)}</span>
                <strong>{dictionary.services[service].title}</strong>
                <small>{dictionary.services[service].description}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Process() {
  const { dictionary, language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <section className="noor-home-v3__process" aria-labelledby="noor-home-v3-process-title" data-reveal>
      <div className="noor-home-v3__section-head noor-home-v3__section-head--compact desktop-section-flow">
        <span className="noor-home-v3__label">{copy.processLabel}</span>
        <h2 id="noor-home-v3-process-title">{copy.processTitle}</h2>
      </div>
      <ol>
        {dictionary.process.map((stage, index) => (
          <li key={stage.title}>
            <span dir="ltr">{formatIndex(index)}</span>
            <div>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectArchive() {
  const { dictionary, language } = useLanguage();
  const copy = homeCopy[language];
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const activeCover = getDesktopProjectCover(activeProject);

  return (
    <section className="noor-home-v3__archive" aria-labelledby="noor-home-v3-archive-title" data-reveal>
      <div className="noor-home-v3__archive-copy desktop-section-flow">
        <span className="noor-home-v3__label">{copy.archiveLabel}</span>
        <h2 id="noor-home-v3-archive-title">{copy.archiveTitle}</h2>
        <p>{copy.archiveBody}</p>
        <Link className="desktop-text-link" to="/work">
          {dictionary.actions.viewAllProjects} <Arrow />
        </Link>
      </div>
      <div className="noor-home-v3__archive-preview" style={getProjectThemeStyle(activeProject) as CSSProperties}>
        <ProjectVisual
          image={getProjectImageByAsset(activeProject, activeCover.asset)}
          projectSlug={activeProject.slug}
          asset={activeCover.asset}
          ratio={activeCover.ratio}
          fit={activeCover.fit}
          formatOverride={activeCover.format}
          preserveAspect={false}
        />
      </div>
      <div className="noor-home-v3__archive-list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            onMouseEnter={() => setActiveSlug(project.slug)}
            onFocus={() => setActiveSlug(project.slug)}
            data-cursor="view"
          >
            <span dir="ltr">{formatIndex(index)}</span>
            <strong dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</strong>
            <small>{dictionary.categories[project.category]}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContactChapter() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <section className="noor-home-v3__contact" aria-labelledby="noor-home-v3-contact-title" data-reveal>
      <div className="noor-home-v3__contact-copy desktop-section-flow">
        <span className="noor-home-v3__label">{copy.contactLabel}</span>
        <h2 id="noor-home-v3-contact-title">{copy.contactTitle}</h2>
        <p>{copy.contactBody}</p>
        <div className="noor-home-v3__actions">
          <a className="desktop-button desktop-button--primary" href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {copy.whatsapp} <Arrow />
          </a>
          <a className="desktop-button desktop-button--ghost" href={getEmailHref(language)}>
            {copy.email}
          </a>
        </div>
      </div>
      <div className="noor-home-v3__contact-art" aria-hidden="true">
        <DecorativeNbLogo />
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="desktop-page noor-home-v3">
      <SignatureHero />
      <SelectedWork />
      <FeaturedInterruption />
      <PointOfView />
      <Capabilities />
      <Process />
      <ProjectArchive />
      <ContactChapter />
    </div>
  );
}
