import { Link } from "react-router-dom";
import { LogoAsset } from "../../components/LogoAsset";
import { useLanguage } from "../../context/LanguageContext";
import { serviceOrder } from "../../data/content";
import { getProjectImageByAsset, getProjectPresentation } from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { LocalizedString, Project } from "../../types";
import {
  getMobileChapterAnchor,
  localizeMobileDigits,
  MobileChapterController,
  MobileChapterSection,
  type MobileChapterDefinition,
} from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileProjectLine, MobileTextLink } from "../MobilePrimitives";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { getMobileProjectWorld } from "../mobileProjectWorlds";
import { mobileCopy } from "../mobileCopy";

const chapterTitles: LocalizedString[] = [
  { en: "Entry", ar: "الدخول" },
  { en: "Selected work", ar: "أعمال مختارة" },
  { en: "Archive", ar: "الأرشيف" },
  { en: "About", ar: "عن نور" },
  { en: "Services", ar: "الخدمات" },
  { en: "Process", ar: "المنهجية" },
  { en: "Contact", ar: "التواصل" },
];

const chapters: MobileChapterDefinition[] = chapterTitles.map((title, index) => ({
  id: getMobileChapterAnchor(index),
  title,
}));

const homeText = {
  en: {
    title: "NOOR BAMAROUF",
    label: "Independent Graphic Designer",
    body: "Visual identities, packaging, print, editorial, and social experiences shaped with intention and thoughtful detail.",
    workTitle: "Each project opens as its own visual world.",
    workBody: "A first pass through the archive, led by real finished portfolio projects.",
    archiveTitle: "A compact project index.",
    archiveBody: "Move through the complete portfolio without reducing the work to a compressed grid.",
    aboutTitle: "A quiet eye for visual language.",
    aboutBody: "Noor works through proportion, material, rhythm, and restraint until every detail feels intentional.",
    servicesTitle: "Focused disciplines, one point of view.",
    servicesBody: "Identity, packaging, print, editorial, and social design, shaped with clarity and care.",
    processTitle: "From listening to final form.",
    processBody: "A measured path that keeps the idea clear while every visual decision becomes sharper.",
    contactTitle: "Begin with a short note.",
    contactBody: "Share the scope, timing, and feeling you want the work to hold.",
  },
  ar: {
    title: "نور بامعروف",
    label: "مصممة جرافيك مستقلة",
    body: "هويات بصرية، تغليف، مطبوعات، تصميم تحريري، وتجارب اجتماعية تُصاغ بنية واضحة وتفاصيل مدروسة.",
    workTitle: "كل مشروع يفتح عالمه البصري الخاص.",
    workBody: "مرور أول على الأرشيف، يبدأ بمشاريع حقيقية مكتملة في البورتفوليو.",
    archiveTitle: "فهرس مختصر للمشاريع.",
    archiveBody: "استعراض كامل للأعمال دون تحويلها إلى شبكة مصغرة ومزدحمة.",
    aboutTitle: "عين هادئة للغة البصرية.",
    aboutBody: "تعمل نور عبر التناسب والخامة والإيقاع والهدوء، حتى يبدو كل تفصيل مقصودًا.",
    servicesTitle: "تخصصات مركزة بمنظور واحد.",
    servicesBody: "هوية، تغليف، مطبوعات، تصميم تحريري، وتصميم اجتماعي يصاغ بوضوح وعناية.",
    processTitle: "من الإصغاء إلى الصورة النهائية.",
    processBody: "مسار مدروس يحافظ على وضوح الفكرة بينما تصبح القرارات البصرية أكثر دقة.",
    contactTitle: "ابدئي بملاحظة قصيرة.",
    contactBody: "شاركي نطاق المشروع وتوقيته والإحساس الذي تريدين أن يحمله.",
  },
};

function Metric({ value, label }: { value: number; label: string }) {
  const { language } = useLanguage();

  return (
    <span>
      <strong>{localizeMobileDigits(String(value), language)}</strong>
      <small>{label}</small>
    </span>
  );
}

function ProjectFeature({ project, asset }: { project: Project; asset?: MobileAsset }) {
  const { dictionary, language } = useLanguage();
  const presentation = getProjectPresentation(project);
  const selectedAsset = asset ?? presentation.hero.asset;
  const visual = getProjectImageByAsset(project, selectedAsset);
  const world = getMobileProjectWorld(project);
  const title = getProjectDisplayTitle(project, language);

  return (
    <Link className="m-project-feature" to={`/work/${project.slug}`} style={world.style} data-project={project.slug}>
      <MobileVisual
        project={project}
        image={visual}
        asset={selectedAsset}
        fit={presentation.hero.fit ?? "contain"}
        loading="eager"
        formatOverride={presentation.hero.format}
      />
      <span>
        <small>{dictionary.categories[project.category]}</small>
        <strong>
          <bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi>
        </strong>
      </span>
    </Link>
  );
}

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const text = homeText[language];
  const total = chapters.length;
  const categoryCount = new Set(projects.map((project) => project.category)).size;
  const disciplineCount = new Set(projects.flatMap((project) => project.services)).size;

  return (
    <MobileChapterController chapters={chapters} className="m-home" >
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-home-cover">
        <div className="m-home-cover__mark" aria-hidden="true">
          <LogoAsset variant="hero" priority />
        </div>
        <div className="m-home-cover__copy">
          <p>{text.label}</p>
          <h1 id={`${chapters[0].id}-title`}>{text.title}</h1>
          <p>{text.body}</p>
          <div className="m-actions">
            <Link to="/work">
              <span>{dictionary.actions.viewWork}</span>
              <MobileArrow />
            </Link>
            <Link to="/contact">
              <span>{dictionary.actions.startProject}</span>
              <MobileArrow />
            </Link>
          </div>
        </div>
        <div className="m-metrics" aria-label={language === "ar" ? "إحصاءات البورتفوليو" : "Portfolio metrics"}>
          <Metric value={projects.length} label={words.projects} />
          <Metric value={disciplineCount} label={words.disciplines} />
          <Metric value={categoryCount} label={words.categories} />
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={total} className="m-home-selected">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[1].id}-title`}>{text.workTitle}</h2>
          <p>{text.workBody}</p>
        </div>
        <div className="m-feature-stack">
          <ProjectFeature project={projects[0]} />
          <ProjectFeature project={projects[1]} />
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={total} className="m-home-archive">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[2].id}-title`}>{text.archiveTitle}</h2>
          <p>{text.archiveBody}</p>
        </div>
        <div className="m-line-list">
          {projects.slice(0, 6).map((project, index) => (
            <MobileProjectLine key={project.slug} project={project} index={index} />
          ))}
        </div>
        <MobileTextLink to="/work">{words.allProjects}</MobileTextLink>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={total} className="m-home-about">
        <div className="m-home-about__mark" aria-hidden="true">
          <LogoAsset variant="hero" />
        </div>
        <div className="m-chapter-copy">
          <h2 id={`${chapters[3].id}-title`}>{text.aboutTitle}</h2>
          <p>{text.aboutBody}</p>
          <MobileTextLink to="/about">{dictionary.actions.readStory}</MobileTextLink>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[4]} index={4} total={total} className="m-home-services">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[4].id}-title`}>{text.servicesTitle}</h2>
          <p>{text.servicesBody}</p>
        </div>
        <div className="m-service-strip">
          {serviceOrder.slice(0, 5).map((service, index) => (
            <span key={service}>
              <small dir="ltr">{String(index + 1).padStart(2, "0")}</small>
              <strong>{dictionary.services[service].title}</strong>
            </span>
          ))}
        </div>
        <MobileTextLink to="/services">{dictionary.nav.services}</MobileTextLink>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[5]} index={5} total={total} className="m-home-process">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[5].id}-title`}>{text.processTitle}</h2>
          <p>{text.processBody}</p>
        </div>
        <ol className="m-process-list">
          {dictionary.process.map((step, index) => (
            <li key={step.title}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[6]} index={6} total={total} className="m-home-contact">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[6].id}-title`}>{text.contactTitle}</h2>
          <p>{text.contactBody}</p>
        </div>
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
