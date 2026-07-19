import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectVisual, type ProjectVisualAsset } from "../components/ProjectVisual";
import { getNextProject, getProject, getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function galleryAsset(index: number): ProjectVisualAsset {
  return `gallery-${index + 1}` as ProjectVisualAsset;
}

const logoCaseLabels = {
  en: {
    logo: "Logo",
    logoConcept: "Logo Concept",
    symbol: "Symbol",
    typography: "Typography",
    color: "Color",
    finalPresentation: "Final Presentation",
    symbolText: "The Arabic symbol is the main visual element in the supplied logo, drawn with a compact vertical rhythm.",
    typographyText: "The supplied Latin wordmark uses open spacing beneath the symbol to keep the name clear and calm.",
    colorText: "The mark is presented in a deep green tone, with clean neutral space around it.",
  },
  ar: {
    logo: "الشعار",
    logoConcept: "فكرة الشعار",
    symbol: "الرمز",
    typography: "الخط",
    color: "اللون",
    finalPresentation: "العرض النهائي",
    symbolText: "الرمز العربي هو العنصر البصري الرئيسي في الشعار المقدم، بإيقاع عمودي مركز وواضح.",
    typographyText: "تعتمد العلامة النصية اللاتينية المقدمة على تباعد هادئ أسفل الرمز ليبقى الاسم واضحًا.",
    colorText: "يظهر الشعار بلون أخضر عميق مع مساحة محايدة ونظيفة حوله.",
  },
} as const;

const ansabLogoLabels = {
  en: {
    logo: "Logo",
    logoConcept: "Logo Concept",
    symbol: "Symbol",
    lockup: "Arabic / English Lockup",
    color: "Color",
    finalGallery: "Final Gallery",
    symbolText: "The symbol is shown as a close crop from the supplied lockup, keeping the organic shape and star detail visible.",
    lockupText: "The supplied presentation includes both the Latin Ansab wordmark and the Arabic أنساب القابضة name in one bilingual composition.",
    colorText: "The PDF includes four color versions, presented together as the supplied color detail.",
  },
  ar: {
    logo: "الشعار",
    logoConcept: "فكرة الشعار",
    symbol: "الرمز",
    lockup: "التكوين العربي / الإنجليزي",
    color: "اللون",
    finalGallery: "المعرض النهائي",
    symbolText: "يظهر الرمز كلقطة قريبة من التكوين المقدم، مع الحفاظ على الشكل العضوي وتفصيل النجمة.",
    lockupText: "يتضمن العرض المقدم العلامة النصية اللاتينية Ansab والاسم العربي أنساب القابضة ضمن تكوين ثنائي اللغة.",
    colorText: "يتضمن ملف PDF أربع نسخ لونية، معروضة معًا كتفصيل لوني مقدم ضمن المشروع.",
  },
} as const;

const redSeaLabels = {
  en: {
    profileIdentity: "Profile Identity",
    instagramFeed: "Instagram Feed",
    storyDesigns: "Story Designs",
    highlightCovers: "Highlight Covers",
    featuredPosts: "Featured Posts",
    campaignHighlights: "Campaign Highlights",
    detailCrops: "Detail Crops",
    finalGallery: "Final Gallery",
    profileText: "Selected company profile visuals and logistics support pages establish the social system's corporate base.",
    feedText: "A compact edit of feed posts shows the range: service messaging, shipping scenes, delivery moments, and seasonal artwork.",
    storyText: "The story suite uses city imagery, trucks, and blue-red overlays to keep vertical communication focused and quickly readable.",
    highlightText: "Profile and highlight-style visuals are grouped as quick identifiers for services, contact prompts, and number-led notes.",
    campaignText: "Selected campaign materials are presented as design moments only, with no unsupported results claims added.",
    detailText: "Close crops show the usable pieces of the system: logo placement, route graphics, service cards, city panels, and logistics imagery.",
  },
  ar: {
    profileIdentity: "هوية الملف",
    instagramFeed: "شبكة Instagram",
    storyDesigns: "تصاميم القصص",
    highlightCovers: "أغلفة الهايلايت",
    featuredPosts: "منشورات مختارة",
    campaignHighlights: "مواد الحملة",
    detailCrops: "لقطات التفاصيل",
    finalGallery: "المعرض النهائي",
    profileText: "تؤسس مرئيات الملف التعريفي وصفحات الدعم اللوجستي المختارة قاعدة بصرية واضحة لنظام التواصل.",
    feedText: "يعرض تحرير مختصر للمنشورات تنوع العمل: رسائل خدمات، مشاهد شحن، لحظات توصيل، وعمل موسمي.",
    storyText: "تستخدم مجموعة القصص صور المدن والشاحنات والطبقات الزرقاء والحمراء ليبقى التواصل العمودي مركزًا وسريع القراءة.",
    highlightText: "تجمع مرئيات الملف والهايلايت كمعرّفات سريعة للخدمات، وسائل التواصل، وملاحظات رقمية.",
    campaignText: "تعرض مواد الحملة المختارة بوصفها لحظات تصميم فقط، دون إضافة نتائج أو ادعاءات غير موثقة.",
    detailText: "تُظهر اللقطات القريبة عناصر النظام القابلة للاستخدام: موضع الشعار، رسومات المسار، بطاقات الخدمات، لوحات المدن، وصور اللوجستيات.",
  },
} as const;

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { dictionary, direction, language } = useLanguage();

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = getNextProject(project.slug);
  const projectTitle = getProjectDisplayTitle(project, language);
  const projectTitleDirection = getProjectTitleDirection(project, language);
  const nextProjectTitle = getProjectDisplayTitle(nextProject, language);
  const nextProjectTitleDirection = getProjectTitleDirection(nextProject, language);

  if (project.slug === "red-sea") {
    const labels = redSeaLabels[language];

    return (
      <article className="page project-page project-page--red-sea">
        <header className="project-hero red-sea-hero" data-reveal>
          <Link className="text-link" to="/work">
            {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
          </Link>
          <div className="project-hero__title">
            <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
            <h1 dir={projectTitleDirection}>{projectTitle}</h1>
            <p>{project.fullDescription[language]}</p>
          </div>
          <dl className="project-meta">
            <div>
              <dt>{dictionary.nav.services}</dt>
              <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
            </div>
            <div>
              <dt>{dictionary.ui.projectFormat}</dt>
              <dd>{project.credits[language]}</dd>
            </div>
          </dl>
        </header>

        <ProjectVisual
          className="project-main-image red-sea-main"
          image={project.heroImage}
          projectSlug={project.slug}
          asset="hero"
          ratio="wide"
          loading="eager"
        />

        <section className="project-narrative red-sea-overview" aria-label={dictionary.sections.overview} data-reveal>
          <div>
            <span className="section__index">{dictionary.sections.overview}</span>
            <h2>{project.shortDescription[language]}</h2>
          </div>
          <p>{project.caseStudy.context[language]}</p>
        </section>

        <section className="red-sea-section red-sea-section--identity" aria-label={labels.profileIdentity} data-reveal>
          <div>
            <span className="section__index">{labels.profileIdentity}</span>
            <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
            <p>{labels.profileText}</p>
          </div>
          <ProjectVisual
            image={project.gallery[0]}
            projectSlug={project.slug}
            asset="gallery-1"
            ratio="wide"
          />
        </section>

        <section className="red-sea-section red-sea-section--feed" aria-label={labels.instagramFeed} data-reveal>
          <ProjectVisual
            image={project.gallery[1]}
            projectSlug={project.slug}
            asset="gallery-2"
            ratio="wide"
          />
          <div>
            <span className="section__index">{labels.instagramFeed}</span>
            <h2>{labels.featuredPosts}</h2>
            <p>{labels.feedText}</p>
          </div>
        </section>

        <section className="red-sea-pair" aria-label={`${labels.storyDesigns} / ${labels.highlightCovers}`} data-reveal>
          <article>
            <span className="section__index">{labels.storyDesigns}</span>
            <ProjectVisual
              image={project.gallery[2]}
              projectSlug={project.slug}
              asset="gallery-3"
              ratio="wide"
            />
            <p>{labels.storyText}</p>
          </article>
          <article>
            <span className="section__index">{labels.highlightCovers}</span>
            <ProjectVisual
              image={project.gallery[3]}
              projectSlug={project.slug}
              asset="gallery-4"
              ratio="wide"
            />
            <p>{labels.highlightText}</p>
          </article>
        </section>

        <section className="red-sea-section red-sea-section--campaign" aria-label={labels.campaignHighlights} data-reveal>
          <div>
            <span className="section__index">{labels.campaignHighlights}</span>
            <h2>{labels.campaignHighlights}</h2>
            <p>{labels.campaignText}</p>
          </div>
          <div className="red-sea-section__stack">
            <ProjectVisual
              image={project.gallery[4]}
              projectSlug={project.slug}
              asset="gallery-5"
              ratio="wide"
            />
            <ProjectVisual
              image={project.gallery[5]}
              projectSlug={project.slug}
              asset="gallery-6"
              ratio="wide"
            />
          </div>
        </section>

        <section className="red-sea-system" aria-label={labels.detailCrops} data-reveal>
          <ProjectVisual
            image={project.gallery[6]}
            projectSlug={project.slug}
            asset="gallery-7"
            ratio="wide"
          />
          <div>
            <span className="section__index">{labels.detailCrops}</span>
            <p>{labels.detailText}</p>
            <div className="palette-row palette-row--large">
              {project.colorPalette.map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
            <ul>
              {project.caseStudy.applications.map((application) => (
                <li key={application.en}>{application[language]}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="red-sea-final" aria-label={labels.finalGallery} data-reveal>
          <div>
            <span className="section__index">{labels.finalGallery}</span>
            <h2>{project.caseStudy.outcome[language]}</h2>
          </div>
          <ProjectVisual
            image={project.gallery[7]}
            projectSlug={project.slug}
            asset="gallery-8"
            ratio="wide"
          />
        </section>

        <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
          <span>{dictionary.actions.nextProject}</span>
          <Link to={`/work/${nextProject.slug}`} data-cursor="view">
            {direction === "rtl" ? "← " : null}
            <span dir={nextProjectTitleDirection}>{nextProjectTitle}</span>
            {direction === "rtl" ? null : " →"}
          </Link>
        </nav>
      </article>
    );
  }

  if (project.slug === "ansab-holding") {
    const labels = ansabLogoLabels[language];

    return (
      <article className="page project-page project-page--logo project-page--ansab">
        <header className="project-hero logo-project-hero" data-reveal>
          <Link className="text-link" to="/work">
            {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
          </Link>
          <div className="project-hero__title">
            <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
            <h1 dir={projectTitleDirection}>{projectTitle}</h1>
            <p>{project.fullDescription[language]}</p>
          </div>
          <dl className="project-meta">
            <div>
              <dt>{dictionary.nav.services}</dt>
              <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
            </div>
            <div>
              <dt>{dictionary.ui.projectFormat}</dt>
              <dd>{project.credits[language]}</dd>
            </div>
          </dl>
        </header>

        <ProjectVisual
          className="project-main-image logo-project__hero-mark"
          image={project.heroImage}
          projectSlug={project.slug}
          asset="hero"
          ratio="wide"
          loading="eager"
        />

        <section className="logo-case logo-case--logo" aria-label={labels.logo} data-reveal>
          <span className="section__index">{labels.logo}</span>
          <ProjectVisual
            image={project.gallery[0]}
            projectSlug={project.slug}
            asset="gallery-1"
            ratio="square"
          />
          <p>{project.caseStudy.context[language]}</p>
        </section>

        <section className="logo-case logo-case--concept" aria-label={labels.logoConcept} data-reveal>
          <div>
            <span className="section__index">{labels.logoConcept}</span>
            <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
            <p>{project.caseStudy.direction[language]}</p>
          </div>
          <ProjectVisual
            image={project.gallery[1]}
            projectSlug={project.slug}
            asset="gallery-2"
            ratio="square"
          />
        </section>

        <section className="logo-case logo-case--lockup" aria-label={labels.lockup} data-reveal>
          <div>
            <span className="section__index">{labels.symbol}</span>
            <p>{labels.symbolText}</p>
          </div>
          <div>
            <span className="section__index">{labels.lockup}</span>
            <p>{labels.lockupText}</p>
          </div>
          <ProjectVisual
            image={project.gallery[2]}
            projectSlug={project.slug}
            asset="gallery-3"
            ratio="square"
          />
          <ProjectVisual
            image={project.gallery[3]}
            projectSlug={project.slug}
            asset="gallery-4"
            ratio="square"
          />
        </section>

        <section className="logo-case logo-case--color" aria-label={labels.color} data-reveal>
          <div>
            <span className="section__index">{labels.color}</span>
            <h2>{labels.color}</h2>
            <p>{labels.colorText}</p>
            <div className="palette-row palette-row--large">
              {project.colorPalette.map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <ProjectVisual
            image={project.gallery[4]}
            projectSlug={project.slug}
            asset="gallery-5"
            ratio="landscape"
          />
        </section>

        <section className="logo-case logo-case--final" aria-label={labels.finalGallery} data-reveal>
          <ProjectVisual
            image={project.gallery[5]}
            projectSlug={project.slug}
            asset="gallery-6"
            ratio="wide"
          />
          <div>
            <span className="section__index">{labels.finalGallery}</span>
            <h2>{project.shortDescription[language]}</h2>
            <p>{project.caseStudy.outcome[language]}</p>
          </div>
        </section>

        <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
          <span>{dictionary.actions.nextProject}</span>
          <Link to={`/work/${nextProject.slug}`} data-cursor="view">
            {direction === "rtl" ? "← " : null}
            <span dir={nextProjectTitleDirection}>{nextProjectTitle}</span>
            {direction === "rtl" ? null : " →"}
          </Link>
        </nav>
      </article>
    );
  }

  if (project.slug === "zahy-store") {
    const labels = logoCaseLabels[language];

    return (
      <article className="page project-page project-page--logo">
        <header className="project-hero logo-project-hero" data-reveal>
          <Link className="text-link" to="/work">
            {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
          </Link>
          <div className="project-hero__title">
            <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
            <h1 dir={projectTitleDirection}>{projectTitle}</h1>
            <p>{project.fullDescription[language]}</p>
          </div>
          <dl className="project-meta">
            <div>
              <dt>{dictionary.nav.services}</dt>
              <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
            </div>
            <div>
              <dt>{dictionary.ui.projectFormat}</dt>
              <dd>{project.credits[language]}</dd>
            </div>
          </dl>
        </header>

        <ProjectVisual
          className="project-main-image logo-project__hero-mark"
          image={project.heroImage}
          projectSlug={project.slug}
          asset="hero"
          ratio="wide"
          loading="eager"
        />

        <section className="logo-case logo-case--logo" aria-label={labels.logo} data-reveal>
          <span className="section__index">{labels.logo}</span>
          <ProjectVisual
            image={project.gallery[0]}
            projectSlug={project.slug}
            asset="gallery-1"
            ratio="square"
          />
          <p>{project.caseStudy.context[language]}</p>
        </section>

        <section className="logo-case logo-case--concept" aria-label={labels.logoConcept} data-reveal>
          <div>
            <span className="section__index">{labels.logoConcept}</span>
            <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
            <p>{project.caseStudy.direction[language]}</p>
          </div>
          <div className="logo-case__details">
            <article>
              <span>{labels.symbol}</span>
              <p>{labels.symbolText}</p>
            </article>
            <article>
              <span>{labels.typography}</span>
              <p>{labels.typographyText}</p>
            </article>
            <article>
              <span>{labels.color}</span>
              <p>{labels.colorText}</p>
              <div className="palette-row palette-row--large">
                {project.colorPalette.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="project-gallery logo-project__gallery" aria-label={dictionary.sections.gallery} data-reveal>
          {project.gallery.slice(1, -1).map((image, index) => (
            <ProjectVisual
              key={`${image.variant}-${index}`}
              image={image}
              projectSlug={project.slug}
              asset={galleryAsset(index + 1)}
              ratio={index % 2 === 0 ? "square" : "landscape"}
            />
          ))}
        </section>

        <section className="logo-case logo-case--final" aria-label={labels.finalPresentation} data-reveal>
          <ProjectVisual
            image={project.gallery[project.gallery.length - 1]}
            projectSlug={project.slug}
            asset={galleryAsset(project.gallery.length - 1)}
            ratio="landscape"
          />
          <div>
            <span className="section__index">{labels.finalPresentation}</span>
            <h2>{project.shortDescription[language]}</h2>
            <p>{project.caseStudy.outcome[language]}</p>
          </div>
        </section>

        <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
          <span>{dictionary.actions.nextProject}</span>
          <Link to={`/work/${nextProject.slug}`} data-cursor="view">
            {direction === "rtl" ? "← " : null}
            <span dir={nextProjectTitleDirection}>{nextProjectTitle}</span>
            {direction === "rtl" ? null : " →"}
          </Link>
        </nav>
      </article>
    );
  }

  return (
    <article className="page project-page">
      <header className="project-hero" data-reveal>
        <Link className="text-link" to="/work">
          {direction === "rtl" ? `${dictionary.actions.backToWork} →` : `← ${dictionary.actions.backToWork}`}
        </Link>
        <div className="project-hero__title">
          <span>{project.year} / {dictionary.categories[project.category]} / {project.projectType[language]}</span>
          <h1 dir={projectTitleDirection}>{projectTitle}</h1>
          <p>{project.fullDescription[language]}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>{dictionary.nav.services}</dt>
            <dd>{project.services.map((service) => dictionary.services[service].title).join(", ")}</dd>
          </div>
          <div>
            <dt>{dictionary.ui.projectFormat}</dt>
            <dd>{project.credits[language]}</dd>
          </div>
        </dl>
      </header>

      <ProjectVisual
        className="project-main-image"
        image={project.heroImage}
        projectSlug={project.slug}
        asset="hero"
        ratio="wide"
        loading="eager"
      />

      {project.video ? (
        <section className="project-video" aria-label={project.video.label[language]} data-reveal>
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={project.video.poster}
          >
            <source src={project.video.src} type="video/mp4" />
          </video>
        </section>
      ) : null}

      <section className="project-narrative" aria-label={dictionary.sections.overview} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.overview}</span>
          <h2>{project.shortDescription[language]}</h2>
        </div>
        <p>{project.caseStudy.context[language]}</p>
      </section>

      <section className="project-direction" aria-label={dictionary.sections.creativeDirection} data-reveal>
        <ProjectVisual
          image={project.gallery[0]}
          projectSlug={project.slug}
          asset="gallery-1"
          ratio="portrait"
        />
        <div>
          <span className="section__index">{dictionary.sections.creativeDirection}</span>
          <h2>{project.quote?.[language] ?? project.projectType[language]}</h2>
          <p>{project.caseStudy.direction[language]}</p>
        </div>
      </section>

      <section className="project-gallery" aria-label={dictionary.sections.gallery} data-reveal>
        {project.gallery.map((image, index) => (
          <ProjectVisual
            key={`${image.variant}-${index}`}
            image={image}
            projectSlug={project.slug}
            asset={galleryAsset(index)}
            ratio={index === 0 ? "portrait" : index === 1 ? "landscape" : index === 2 ? "square" : "portrait"}
          />
        ))}
      </section>

      <section className="project-system" aria-label={dictionary.sections.system} data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.palette}</span>
          <div className="palette-row palette-row--large">
            {project.colorPalette.map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="project-system__type">
          <span className="section__index">{dictionary.sections.typography}</span>
          <p>
            <span>{project.typography.display}</span>
            <span>{project.typography.body}</span>
          </p>
        </div>
        <div className="project-applications">
          <span className="section__index">{dictionary.sections.applications}</span>
          <ul>
            {project.caseStudy.applications.map((application) => (
              <li key={application.en}>{application[language]}</li>
            ))}
          </ul>
        </div>
        <div className="project-outcome-note">
          <span className="section__index">{dictionary.sections.outcome}</span>
          <p>{project.caseStudy.outcome[language]}</p>
        </div>
      </section>

      {project.legalNote ? (
        <p className="project-legal-note" data-reveal>{project.legalNote[language]}</p>
      ) : null}

      <nav className="next-project" aria-label={dictionary.actions.nextProject} data-reveal>
        <span>{dictionary.actions.nextProject}</span>
        <Link to={`/work/${nextProject.slug}`} data-cursor="view">
          {direction === "rtl" ? "← " : null}
          <span dir={nextProjectTitleDirection}>{nextProjectTitle}</span>
          {direction === "rtl" ? null : " →"}
        </Link>
      </nav>
    </article>
  );
}
