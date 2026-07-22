import type { CSSProperties } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getProjectImageByAsset, getProjectThemeStyle, type PresentationAsset } from "../../data/projectPresentation";
import { projects } from "../../data/projects";
import type { Project, ServiceKey } from "../../types";
import { makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { approvedMobileServices, mobileHomeCopy } from "../mobileCopy";

interface ServiceMoment {
  project: Project;
  asset: PresentationAsset;
  fit?: "contain" | "cover";
  format?: "jpg" | "png" | "webp";
}

const servicePreviewMoments: Record<ServiceKey, ServiceMoment> = {
  brandIdentity: { project: projects[6], asset: "hero", fit: "cover" },
  logoDesign: { project: projects[10], asset: "hero", fit: "cover" },
  graphicDesign: { project: projects[2], asset: "showcase/showcase-01", fit: "contain", format: "png" },
  packagingDesign: { project: projects[8], asset: "hero", fit: "cover" },
  printDesign: { project: projects[3], asset: "cover", fit: "cover" },
  socialMediaDesign: { project: projects[7], asset: "gallery-8", fit: "cover" },
  editorialDesign: { project: projects[1], asset: "gallery-3", fit: "cover" },
  creativeDirection: { project: projects[4], asset: "gallery-2", fit: "contain" },
};

const servicesChapters = makeMobileChapters([
  ["Services", "الخدمات"],
  ...approvedMobileServices.map((service) => [service, service] as [string, string]),
  ["Process", "المنهجية"],
  ["Contact", "التواصل"],
  ["Footer", "التذييل"],
]);

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const copy = mobileHomeCopy[language];
  const total = servicesChapters.length;

  return (
    <MobileChapterController chapters={servicesChapters} className="m-services-page">
      <MobileChapterSection chapter={servicesChapters[0]} index={0} total={total} className="m-services-intro">
        <div className="m-section-copy">
          <span>{copy.capabilitiesLabel}</span>
          <h1 id={`${servicesChapters[0].id}-title`}>{copy.capabilitiesTitle}</h1>
          <p>{dictionary.home.servicesIntro}</p>
        </div>
        <ol className="m-service-ledger m-service-ledger--index">
          {approvedMobileServices.map((service, index) => (
            <li key={service}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{dictionary.services[service].title}</strong>
                <p>{dictionary.services[service].description}</p>
              </div>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      {approvedMobileServices.map((service, index) => {
        const moment = servicePreviewMoments[service];
        const chapter = servicesChapters[index + 1];

        return (
          <MobileChapterSection key={service} chapter={chapter} index={index + 1} total={total} className="m-service-chapter">
            <div className="m-section-copy">
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <h2 id={`${chapter.id}-title`}>{dictionary.services[service].title}</h2>
              <p>{dictionary.services[service].description}</p>
            </div>
            <div className="m-service-preview" style={getProjectThemeStyle(moment.project) as CSSProperties}>
              <MobileVisual
                project={moment.project}
                image={getProjectImageByAsset(moment.project, moment.asset)}
                asset={moment.asset}
                fit={moment.fit}
                formatOverride={moment.format}
              />
            </div>
          </MobileChapterSection>
        );
      })}

      <MobileChapterSection
        chapter={servicesChapters[approvedMobileServices.length + 1]}
        index={approvedMobileServices.length + 1}
        total={total}
        className="m-services-process"
      >
        <div className="m-section-copy">
          <span>{copy.processLabel}</span>
          <h2 id={`${servicesChapters[approvedMobileServices.length + 1].id}-title`}>{copy.processTitle}</h2>
          <p>{dictionary.home.processIntro}</p>
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

      <MobileChapterSection
        chapter={servicesChapters[approvedMobileServices.length + 2]}
        index={approvedMobileServices.length + 2}
        total={total}
        className="m-global-contact"
      >
        <div className="m-section-copy">
          <span>{copy.contactLabel}</span>
          <h2 id={`${servicesChapters[approvedMobileServices.length + 2].id}-title`}>{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
          <MobileCtaLink to="/contact">
            {dictionary.actions.startProject} <MobileArrow />
          </MobileCtaLink>
        </div>
      </MobileChapterSection>

      <MobileChapterSection
        chapter={servicesChapters[approvedMobileServices.length + 3]}
        index={approvedMobileServices.length + 3}
        total={total}
        className="m-footer-chapter"
      >
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
