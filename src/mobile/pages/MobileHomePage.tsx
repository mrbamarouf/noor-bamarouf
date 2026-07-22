import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DecorativeNbLogo } from "../../components/DecorativeNbLogo";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import {
  getDesktopProjectCover,
  getProjectImageByAsset,
  getProjectThemeStyle,
  type PresentationAsset,
} from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import type { Project, ServiceKey } from "../../types";
import { makeMobileChapters, MobileChapterController, MobileChapterSection, localizeMobileDigits } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileExternalCta, MobileCtaLink } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { approvedMobileServices, mobileHomeCopy } from "../mobileCopy";
import type { CSSProperties } from "react";

interface HomeMoment {
  project: Project;
  asset: PresentationAsset;
  fit?: "contain" | "cover";
  format?: "jpg" | "png" | "webp";
}

const selectedMoments: HomeMoment[] = [
  { project: projects[0], asset: "cover", fit: "cover" },
  { project: projects[1], asset: "hero", fit: "cover" },
  { project: projects[4], asset: "hero", fit: "contain" },
  { project: projects[7], asset: "gallery-8", fit: "cover" },
  { project: projects[6], asset: "hero", fit: "cover" },
  { project: projects[2], asset: "showcase/showcase-01", fit: "contain", format: "png" },
];

const featuredProjects = [
  "red-bull-marvel",
  "wello",
  "matcha",
  "jeddah-railway",
  "wemo-delights",
  "impostor",
  "nirto-cold-brew",
  "ansab-holding",
].map((slug) => {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);
  return project;
});

const servicePreviewMoments: Partial<Record<ServiceKey, HomeMoment>> = {
  brandIdentity: { project: projects[6], asset: "hero", fit: "cover" },
  packagingDesign: { project: projects[8], asset: "hero", fit: "cover" },
  printDesign: { project: projects[3], asset: "cover", fit: "cover" },
  socialMediaDesign: { project: projects[7], asset: "gallery-8", fit: "cover" },
  editorialDesign: { project: projects[1], asset: "gallery-3", fit: "cover" },
  creativeDirection: { project: projects[4], asset: "gallery-2", fit: "contain" },
};

const chapters = makeMobileChapters([
  ["Hero", "البداية"],
  ["Selected Work", "أعمال مختارة"],
  ["Featured Project", "مشروع مختار"],
  ["Point of View", "وجهة نظر"],
  ["Capabilities", "القدرات"],
  ["Process", "المنهجية"],
  ["Project Archive", "أرشيف المشاريع"],
  ["Contact", "التواصل"],
  ["Footer", "التذييل"],
]);

function numberString(value: number, language: "en" | "ar") {
  return localizeMobileDigits(String(value), language);
}

function ProjectMiniCard({ moment, index }: { moment: HomeMoment; index: number }) {
  const { dictionary, language } = useLanguage();
  const image = getProjectImageByAsset(moment.project, moment.asset);

  return (
    <Link className="m-project-card" to={`/work/${moment.project.slug}`} style={getProjectThemeStyle(moment.project) as CSSProperties}>
      <MobileVisual
        project={moment.project}
        image={image}
        asset={moment.asset}
        fit={moment.fit}
        formatOverride={moment.format}
        loading={index < 2 ? "eager" : "lazy"}
      />
      <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
      <strong dir={getProjectTitleDirection(moment.project, language)}>
        <bdi>{getProjectDisplayTitle(moment.project, language)}</bdi>
      </strong>
      <small>{dictionary.categories[moment.project.category]}</small>
    </Link>
  );
}

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const copy = mobileHomeCopy[language];
  const visibleServiceKeys = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.services))), []);
  const visibleCategoryKeys = useMemo(() => new Set(projects.map((project) => project.category)), []);
  const metrics = [
    { value: projects.length, label: copy.metrics[0] },
    { value: visibleServiceKeys.length, label: copy.metrics[1] },
    { value: visibleCategoryKeys.size, label: copy.metrics[2] },
  ];
  const featured = featuredProjects[0];
  const featuredCover = getDesktopProjectCover(featured);
  const featuredImage = getProjectImageByAsset(featured, featuredCover.asset);

  return (
    <MobileChapterController chapters={chapters} className="m-home">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-home-hero">
        <div className="m-section-copy">
          <span>{copy.heroRole}</span>
          <h1 id={`${chapters[0].id}-title`}>{copy.heroTitle}</h1>
          <p>{copy.heroBody}</p>
          <div className="m-actions">
            <MobileCtaLink to="/work">
              {dictionary.actions.viewWork} <MobileArrow />
            </MobileCtaLink>
            <MobileCtaLink className="m-cta--ghost" to="/contact">
              {dictionary.actions.startProject}
            </MobileCtaLink>
          </div>
        </div>
        <DecorativeNbLogo className="m-home-hero__mark" priority />
        <dl className="m-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dd>{numberString(metric.value, language)}</dd>
              <dt>{metric.label}</dt>
            </div>
          ))}
        </dl>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-home-selected">
        <div className="m-section-copy">
          <span>{copy.selectedLabel}</span>
          <h2 id={`${chapters[1].id}-title`}>{copy.selectedTitle}</h2>
          <p>{copy.selectedBody}</p>
        </div>
        <div className="m-project-strip">
          {selectedMoments.map((moment, index) => (
            <ProjectMiniCard key={`${moment.project.slug}-${moment.asset}`} moment={moment} index={index} />
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={chapters.length} className="m-home-featured" >
        <div className="m-case-card" style={getProjectThemeStyle(featured) as CSSProperties}>
          <MobileVisual
            project={featured}
            image={featuredImage}
            asset={featuredCover.asset}
            fit={featuredCover.fit}
            formatOverride={featuredCover.format}
            loading="eager"
          />
          <div>
            <span>{copy.featuredLabel}</span>
            <h2 id={`${chapters[2].id}-title`} dir={getProjectTitleDirection(featured, language)}>
              <bdi>{getProjectDisplayTitle(featured, language)}</bdi>
            </h2>
            <p>{featured.shortDescription[language]}</p>
            <MobileCtaLink to={`/work/${featured.slug}`}>
              {dictionary.actions.openProject} <MobileArrow />
            </MobileCtaLink>
          </div>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={chapters.length} className="m-home-point">
        <DecorativeNbLogo className="m-large-mark" />
        <div className="m-section-copy">
          <span>{copy.pointLabel}</span>
          <h2 id={`${chapters[3].id}-title`}>{copy.pointTitle}</h2>
          <p>{copy.pointBody}</p>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[4]} index={4} total={chapters.length} className="m-home-capabilities">
        <div className="m-section-copy">
          <span>{copy.capabilitiesLabel}</span>
          <h2 id={`${chapters[4].id}-title`}>{copy.capabilitiesTitle}</h2>
        </div>
        <ol className="m-service-ledger">
          {approvedMobileServices.map((service, index) => {
            const moment = servicePreviewMoments[service];
            return (
              <li key={service}>
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{dictionary.services[service].title}</strong>
                  <p>{dictionary.services[service].description}</p>
                </div>
                {moment ? (
                  <MobileVisual
                    project={moment.project}
                    image={getProjectImageByAsset(moment.project, moment.asset)}
                    asset={moment.asset}
                    fit={moment.fit}
                    formatOverride={moment.format}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[5]} index={5} total={chapters.length} className="m-home-process">
        <div className="m-section-copy">
          <span>{copy.processLabel}</span>
          <h2 id={`${chapters[5].id}-title`}>{copy.processTitle}</h2>
        </div>
        <ol className="m-process-list">
          {dictionary.process.map((stage, index) => (
            <li key={stage.title}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.title}</strong>
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[6]} index={6} total={chapters.length} className="m-home-archive">
        <div className="m-section-copy">
          <span>{copy.archiveLabel}</span>
          <h2 id={`${chapters[6].id}-title`}>{copy.archiveTitle}</h2>
          <p>{copy.archiveBody}</p>
        </div>
        <div className="m-line-list">
          {projects.map((project, index) => (
            <Link key={project.slug} to={`/work/${project.slug}`}>
              <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
              <strong dir={getProjectTitleDirection(project, language)}>
                <bdi>{getProjectDisplayTitle(project, language)}</bdi>
              </strong>
              <small>{dictionary.categories[project.category]}</small>
            </Link>
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[7]} index={7} total={chapters.length} className="m-home-contact m-global-contact">
        <div className="m-section-copy">
          <span>{copy.contactLabel}</span>
          <h2 id={`${chapters[7].id}-title`}>{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
          <div className="m-actions">
            <MobileExternalCta href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
              {dictionary.ui.whatsapp} <MobileArrow />
            </MobileExternalCta>
            <MobileExternalCta className="m-cta--ghost" href={getEmailHref(language)}>
              {dictionary.ui.email}
            </MobileExternalCta>
          </div>
        </div>
        <DecorativeNbLogo className="m-contact-mark" />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[8]} index={8} total={chapters.length} className="m-footer-chapter">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
