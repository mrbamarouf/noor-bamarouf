import type { CSSProperties } from "react";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { getProjectImageByAsset, getProjectThemeStyle, type PresentationAsset } from "../../data/projectPresentation";
import { getProjectDisplayTitle, projects } from "../../data/projects";
import type { Project, ServiceKey } from "../../types";
import { localizeMobileDigits, makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileExternalCta, MobilePageCopy } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { approvedMobileServices, mobileHomeCopy } from "../mobileCopy";

const serviceMoments: Record<ServiceKey, { project: Project; asset: PresentationAsset; fit?: "contain" | "cover" }> = {
  brandIdentity: { project: projects[6], asset: "hero", fit: "cover" },
  logoDesign: { project: projects[10], asset: "hero", fit: "cover" },
  graphicDesign: { project: projects[2], asset: "showcase/showcase-06", fit: "contain" },
  packagingDesign: { project: projects[8], asset: "hero", fit: "cover" },
  printDesign: { project: projects[3], asset: "cover", fit: "contain" },
  socialMediaDesign: { project: projects[7], asset: "gallery-8", fit: "contain" },
  editorialDesign: { project: projects[1], asset: "gallery-3", fit: "contain" },
  creativeDirection: { project: projects[4], asset: "gallery-2", fit: "contain" },
};

const chapters = makeMobileChapters([
  ["Services", "الخدمات"],
  ...approvedMobileServices.map((service) => [service, service] as [string, string]),
  ["Process", "المنهجية"],
  ["Contact", "التواصل"],
  ["Footer", "التذييل"],
]);

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const copy = mobileHomeCopy[language];

  return (
    <MobileChapterController chapters={chapters} className="m-services">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-services-hero">
        <MobilePageCopy label={copy.capabilitiesLabel} title={copy.capabilitiesTitle} body={dictionary.home.servicesIntro} titleId={`${chapters[0].id}-title`} />
        <ol className="m-services-toc">
          {approvedMobileServices.map((service, index) => (
            <li key={service}><span dir="ltr">0{index + 1}</span><strong>{dictionary.services[service].title}</strong></li>
          ))}
        </ol>
      </MobileChapterSection>

      {approvedMobileServices.map((service, index) => {
        const moment = serviceMoments[service];
        const image = getProjectImageByAsset(moment.project, moment.asset);
        const chapter = chapters[index + 1];
        return (
          <MobileChapterSection key={service} chapter={chapter} index={index + 1} total={chapters.length} className="m-service-page">
            <div className="m-service-page__visual" style={getProjectThemeStyle(moment.project) as CSSProperties}>
              <MobileVisual project={moment.project} image={image} asset={moment.asset} fit={moment.fit} loading="eager" />
              <span>{getProjectDisplayTitle(moment.project, language)}</span>
            </div>
            <div className="m-service-page__copy">
              <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
              <h1 id={`${chapter.id}-title`}>{dictionary.services[service].title}</h1>
              <p>{dictionary.services[service].description}</p>
            </div>
          </MobileChapterSection>
        );
      })}

      <MobileChapterSection chapter={chapters[7]} index={7} total={chapters.length} className="m-services-process">
        <MobilePageCopy label={copy.processLabel} title={copy.processTitle} titleId={`${chapters[7].id}-title`} />
        <ol className="m-process-index">
          {dictionary.process.map((stage, index) => (
            <li key={stage.title}><span dir="ltr">0{index + 1}</span><div><strong>{stage.title}</strong><p>{stage.text}</p></div></li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[8]} index={8} total={chapters.length} className="m-services-contact">
        <MobilePageCopy label={copy.contactLabel} title={copy.contactTitle} body={copy.contactBody} titleId={`${chapters[8].id}-title`}>
          <div className="m-actions m-actions--stack">
            <MobileExternalCta href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.actions.contactByWhatsApp} <MobileArrow /></MobileExternalCta>
            <MobileExternalCta className="m-cta--quiet" href={getEmailHref(language)}>{dictionary.actions.sendEmail}</MobileExternalCta>
          </div>
        </MobilePageCopy>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[9]} index={9} total={chapters.length} className="m-footer-page"><MobileFooter /></MobileChapterSection>
    </MobileChapterController>
  );
}
