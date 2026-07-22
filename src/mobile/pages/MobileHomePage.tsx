import { Link } from "react-router-dom";
import { LogoAsset } from "../../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { serviceOrder } from "../../data/content";
import { getProjectImageByAsset } from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { LocalizedString, Project } from "../../types";
import {
  getMobileChapterAnchor,
  MobileChapterController,
  MobileChapterSection,
  type MobileChapterDefinition,
} from "../MobileChapterSystem";
import { MobileVisual, type MobileAsset } from "../MobileVisual";
import { getMobileProjectWorld } from "../mobileProjectWorlds";

const chapterTitles: LocalizedString[] = [
  { en: "Introduction", ar: "المقدمة" },
  { en: "Selected Work", ar: "أعمال مختارة" },
  { en: "Featured Project", ar: "مشروع بارز" },
  { en: "Archive Index", ar: "فهرس الأعمال" },
  { en: "About Noor", ar: "عن نور" },
  { en: "Services", ar: "الخدمات" },
  { en: "Point of View", ar: "وجهة النظر" },
  { en: "Closing", ar: "الختام" },
];

const homeChapters: MobileChapterDefinition[] = chapterTitles.map((title, index) => ({
  id: getMobileChapterAnchor(index),
  title,
}));

const homeText = {
  en: {
    introLabel: "Independent Graphic Designer",
    introTitle: "NOOR BAMAROUF",
    introBody:
      "Visual identities, packaging, print, editorial, and social experiences shaped with intention and thoughtful detail.",
    selectedTitle: "A project opens as its own world.",
    selectedBody: "The first chapter of the archive leads with finished work, not thumbnails.",
    featuredTitle: "Soft materials, clear systems.",
    featuredBody: "A featured look at project language, color, and tactile presentation.",
    archiveTitle: "The archive stays compact.",
    archiveBody: "Browse the visible portfolio without squeezing it into a miniature grid.",
    aboutTitle: "A quiet eye for visual language.",
    aboutBody:
      "Noor’s work moves through proportion, material, rhythm, and restraint until every detail feels intentional.",
    servicesTitle: "Disciplines with one visual point of view.",
    servicesBody: "A focused service index for identity, print, packaging, editorial, and social design.",
    processTitle: "From listening to final form.",
    processBody: "A measured path that keeps the idea clear while the details become sharper.",
    contactTitle: "Begin with a short note.",
    contactBody: "Share the scope, timing, and feeling you want the work to hold.",
    projectsMetric: "Projects",
    disciplinesMetric: "Disciplines",
    categoriesMetric: "Categories",
    viewAll: "View the full archive",
  },
  ar: {
    introLabel: "مصممة جرافيك مستقلة",
    introTitle: "نور بامعروف",
    introBody:
      "هويات بصرية، تغليف، مطبوعات، تصميم تحريري، وتجارب اجتماعية تُصاغ بنية واضحة وتفاصيل مدروسة.",
    selectedTitle: "كل مشروع يفتح عالمه الخاص.",
    selectedBody: "تبدأ الأعمال المختارة من النتيجة النهائية، لا من شبكة مصغّرة.",
    featuredTitle: "مواد هادئة وأنظمة واضحة.",
    featuredBody: "نظرة مركزة على لغة المشروع، لونه، وحضوره الملموس.",
    archiveTitle: "الأرشيف يبقى مختصرًا.",
    archiveBody: "استعراض الأعمال الظاهرة دون ضغطها داخل شبكة صغيرة.",
    aboutTitle: "عين هادئة للغة البصرية.",
    aboutBody:
      "يتشكل عمل نور عبر التناسب، الخامة، الإيقاع، والهدوء حتى يبدو كل تفصيل مقصودًا.",
    servicesTitle: "تخصصات يجمعها منظور بصري واحد.",
    servicesBody: "فهرس خدمات مركز للهوية والمطبوعات والتغليف والتحرير والتصميم الاجتماعي.",
    processTitle: "من الإصغاء إلى الصورة النهائية.",
    processBody: "مسار مدروس يحافظ على وضوح الفكرة بينما تصبح التفاصيل أكثر دقة.",
    contactTitle: "ابدئي بملاحظة قصيرة.",
    contactBody: "شاركي نطاق المشروع وتوقيته والإحساس الذي تريدين أن يحمله.",
    projectsMetric: "مشاريع",
    disciplinesMetric: "تخصصات",
    categoriesMetric: "فئات",
    viewAll: "استعراض الأرشيف الكامل",
  },
} satisfies Record<"en" | "ar", Record<string, string>>;

function MobileArrow() {
  const { language } = useLanguage();
  return <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>;
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <span>
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}

function ChapterTitle({ chapter, children }: { chapter: MobileChapterDefinition; children: string }) {
  return <h2 id={`${chapter.id}-title`}>{children}</h2>;
}

function ProjectWorldPreview({
  project,
  asset = "hero",
  chapterTitle,
  body,
}: {
  project: Project;
  asset?: MobileAsset;
  chapterTitle: string;
  body: string;
}) {
  const { dictionary, language } = useLanguage();
  const world = getMobileProjectWorld(project);
  const image = getProjectImageByAsset(project, asset);
  const title = getProjectDisplayTitle(project, language);

  return (
    <article className="noor-mobile-project-world" style={world.style} data-project={project.slug}>
      <div className="noor-mobile-project-world__visual">
        <MobileVisual
          project={project}
          image={image}
          asset={asset}
          fit="contain"
          sizes="(max-width: 900px) 100vw, 1px"
        />
      </div>
      <div className="noor-mobile-project-world__copy">
        <p>
          <span>{dictionary.categories[project.category]}</span>
          <span>{project.year}</span>
        </p>
        <h3>{chapterTitle}</h3>
        <strong>
          <bdi dir={getProjectTitleDirection(project, language)}>{title}</bdi>
        </strong>
        <small>{body}</small>
        <Link to={`/work/${project.slug}`}>
          <span>{dictionary.actions.openProject}</span>
          <MobileArrow />
        </Link>
      </div>
    </article>
  );
}

function ArchiveRow({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

  return (
    <Link className="noor-mobile-archive-row" to={`/work/${project.slug}`}>
      <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      <strong>
        <bdi dir={getProjectTitleDirection(project, language)}>
          {getProjectDisplayTitle(project, language)}
        </bdi>
      </strong>
      <small>{dictionary.categories[project.category]}</small>
    </Link>
  );
}

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const text = homeText[language];
  const [welloProject, matchaProject] = projects;
  const categoryCount = new Set(projects.map((project) => project.category)).size;
  const disciplineCount = new Set(projects.flatMap((project) => project.services)).size;
  const total = homeChapters.length;
  const archivePreview = projects.slice(0, 7);

  return (
    <MobileChapterController chapters={homeChapters}>
      <div className="noor-mobile-home" data-noor-mobile-page="home">
        <MobileChapterSection chapter={homeChapters[0]} index={0} total={total} className="noor-mobile-home__intro">
          <div className="noor-mobile-home__intro-mark" aria-hidden="true">
            <LogoAsset variant="hero" priority />
          </div>
          <div className="noor-mobile-home__copy">
            <p className="noor-mobile-home__label">{text.introLabel}</p>
            <h1 id={`${homeChapters[0].id}-title`}>{text.introTitle}</h1>
            <p>{text.introBody}</p>
            <div className="noor-mobile-home__actions">
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
          <div className="noor-mobile-home__metrics" aria-label={language === "ar" ? "إحصاءات الأرشيف" : "Portfolio metrics"}>
            <Metric value={projects.length} label={text.projectsMetric} />
            <Metric value={disciplineCount} label={text.disciplinesMetric} />
            <Metric value={categoryCount} label={text.categoriesMetric} />
          </div>
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[1]} index={1} total={total} className="noor-mobile-home__selected">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[1]}>{text.selectedTitle}</ChapterTitle>
            <p>{text.selectedBody}</p>
          </div>
          <ProjectWorldPreview
            project={welloProject}
            asset="hero"
            chapterTitle={getProjectDisplayTitle(welloProject, language)}
            body={welloProject.shortDescription[language]}
          />
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[2]} index={2} total={total} className="noor-mobile-home__featured">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[2]}>{text.featuredTitle}</ChapterTitle>
            <p>{text.featuredBody}</p>
          </div>
          <ProjectWorldPreview
            project={matchaProject}
            asset={getMobileProjectWorld(matchaProject).heroAsset}
            chapterTitle={getProjectDisplayTitle(matchaProject, language)}
            body={matchaProject.shortDescription[language]}
          />
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[3]} index={3} total={total} className="noor-mobile-home__archive">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[3]}>{text.archiveTitle}</ChapterTitle>
            <p>{text.archiveBody}</p>
          </div>
          <div className="noor-mobile-home__archive-list">
            {archivePreview.map((project, index) => (
              <ArchiveRow key={project.slug} project={project} index={index} />
            ))}
          </div>
          <Link className="noor-mobile-home__text-link" to="/work">
            <span>{text.viewAll}</span>
            <MobileArrow />
          </Link>
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[4]} index={4} total={total} className="noor-mobile-home__about">
          <div className="noor-mobile-home__about-mark" aria-hidden="true">
            <LogoAsset variant="hero" />
          </div>
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[4]}>{text.aboutTitle}</ChapterTitle>
            <p>{text.aboutBody}</p>
            <Link className="noor-mobile-home__text-link" to="/about">
              <span>{dictionary.actions.readStory}</span>
              <MobileArrow />
            </Link>
          </div>
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[5]} index={5} total={total} className="noor-mobile-home__services">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[5]}>{text.servicesTitle}</ChapterTitle>
            <p>{text.servicesBody}</p>
          </div>
          <div className="noor-mobile-home__service-index">
            {serviceOrder.map((service, index) => (
              <Link key={service} to="/services">
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <strong>{dictionary.services[service].title}</strong>
              </Link>
            ))}
          </div>
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[6]} index={6} total={total} className="noor-mobile-home__process">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[6]}>{text.processTitle}</ChapterTitle>
            <p>{text.processBody}</p>
          </div>
          <ol className="noor-mobile-home__timeline">
            {dictionary.process.map((step, index) => (
              <li key={step.title}>
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </MobileChapterSection>

        <MobileChapterSection chapter={homeChapters[7]} index={7} total={total} className="noor-mobile-home__closing">
          <div className="noor-mobile-home__copy">
            <ChapterTitle chapter={homeChapters[7]}>{text.contactTitle}</ChapterTitle>
            <p>{text.contactBody}</p>
          </div>
          <div className="noor-mobile-home__contact-methods">
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
              <span>{dictionary.ui.whatsapp}</span>
              <MobileArrow />
            </a>
            <a href={getEmailHref(language)}>
              <span>{dictionary.ui.email}</span>
              <MobileArrow />
            </a>
          </div>
          <footer className="noor-mobile-home__footer">
            <LogoAsset variant="footer" />
            <p>{dictionary.footer.line}</p>
            <small>© 2026 {language === "ar" ? "نور بامعروف" : "NOOR BAMAROUF"}</small>
          </footer>
        </MobileChapterSection>
      </div>
    </MobileChapterController>
  );
}
