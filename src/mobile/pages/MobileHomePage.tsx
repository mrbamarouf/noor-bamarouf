import { useMemo, type CSSProperties } from "react";
import { LogoAsset } from "../../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { getDesktopProjectCover, getProjectImageByAsset, getProjectThemeStyle } from "../../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../../data/projects";
import { makeMobileChapters, MobileChapterController, MobileChapterSection, localizeMobileDigits } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink, MobileExternalCta, MobilePageCopy } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { approvedMobileServices, mobileHomeCopy } from "../mobileCopy";

const chapters = makeMobileChapters([
  ["Home", "الرئيسية"],
  ["Selected work", "أعمال مختارة"],
  ["Featured project", "مشروع مختار"],
  ["Point of view", "وجهة نظر"],
  ["Capabilities", "القدرات"],
  ["Capabilities", "القدرات"],
  ["Process", "المنهجية"],
  ["Project archive", "أرشيف المشاريع"],
  ["Project archive", "أرشيف المشاريع"],
  ["Contact", "التواصل"],
  ["Footer", "التذييل"],
]);

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const copy = mobileHomeCopy[language];
  const disciplines = useMemo(() => new Set(projects.flatMap((project) => project.services)).size, []);
  const categories = useMemo(() => new Set(projects.map((project) => project.category)).size, []);
  const featured = projects[0];
  const featuredCover = getDesktopProjectCover(featured);
  const archiveGroups = [projects.slice(0, 6), projects.slice(6)];
  const metrics = [projects.length, disciplines, categories];

  return (
    <MobileChapterController chapters={chapters} className="m-home">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-home-hero">
        <MobilePageCopy label={copy.heroRole} title={copy.heroTitle} body={copy.heroBody} titleId={`${chapters[0].id}-title`}>
          <div className="m-actions">
            <MobileCtaLink to="/work">{dictionary.actions.viewWork} <MobileArrow /></MobileCtaLink>
            <MobileCtaLink className="m-cta--quiet" to="/contact">{dictionary.actions.startProject}</MobileCtaLink>
          </div>
        </MobilePageCopy>
        <LogoAsset className="m-home-hero__mark" variant="hero" priority />
        <dl className="m-metrics">
          {metrics.map((value, index) => (
            <div key={copy.metrics[index]}>
              <dd>{localizeMobileDigits(String(value), language)}</dd>
              <dt>{copy.metrics[index]}</dt>
            </div>
          ))}
        </dl>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-home-selected">
        <MobilePageCopy label={copy.selectedLabel} title={copy.selectedTitle} body={copy.selectedBody} titleId={`${chapters[1].id}-title`} />
        <div className="m-selected-composition">
          {[projects[1], projects[4], projects[5]].map((project, index) => {
            const cover = getDesktopProjectCover(project);
            return (
              <MobileCtaLink key={project.slug} to={`/work/${project.slug}`} style={getProjectThemeStyle(project) as CSSProperties}>
                <MobileVisual project={project} image={getProjectImageByAsset(project, cover.asset)} asset={cover.asset} fit={cover.fit} formatOverride={cover.format} loading="eager" />
                <span dir={getProjectTitleDirection(project, language)}><bdi>{getProjectDisplayTitle(project, language)}</bdi></span>
                <small dir="ltr">0{index + 1}</small>
              </MobileCtaLink>
            );
          })}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={chapters.length} className="m-home-featured" >
        <div className="m-featured-world" style={getProjectThemeStyle(featured) as CSSProperties}>
          <MobileVisual project={featured} image={getProjectImageByAsset(featured, featuredCover.asset)} asset={featuredCover.asset} fit={featuredCover.fit} formatOverride={featuredCover.format} loading="eager" />
          <div>
            <span>{copy.featuredLabel}</span>
            <h2 id={`${chapters[2].id}-title`}>{getProjectDisplayTitle(featured, language)}</h2>
            <p>{featured.shortDescription[language]}</p>
            <MobileCtaLink to={`/work/${featured.slug}`}>{dictionary.actions.openProject} <MobileArrow /></MobileCtaLink>
          </div>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={chapters.length} className="m-home-point">
        <LogoAsset className="m-home-point__mark" variant="hero" />
        <MobilePageCopy label={copy.pointLabel} title={copy.pointTitle} body={copy.pointBody} titleId={`${chapters[3].id}-title`} />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[4]} index={4} total={chapters.length} className="m-home-services">
        <MobilePageCopy label={copy.capabilitiesLabel} title={copy.capabilitiesTitle} titleId={`${chapters[4].id}-title`} />
        <ol className="m-service-index">
          {approvedMobileServices.slice(0, 3).map((service, index) => (
            <li key={service}>
              <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
              <div><strong>{dictionary.services[service].title}</strong><p>{dictionary.services[service].description}</p></div>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[5]} index={5} total={chapters.length} className="m-home-services m-home-services--continued">
        <MobilePageCopy label={copy.capabilitiesLabel} title={copy.capabilitiesContinuationTitle} titleId={`${chapters[5].id}-title`} />
        <ol className="m-service-index" start={4}>
          {approvedMobileServices.slice(3).map((service, index) => (
            <li key={service}>
              <span dir="ltr">{localizeMobileDigits(String(index + 4).padStart(2, "0"), language)}</span>
              <div><strong>{dictionary.services[service].title}</strong><p>{dictionary.services[service].description}</p></div>
            </li>
          ))}
        </ol>
        <MobileCtaLink className="m-text-link" to="/services">{dictionary.nav.services} <MobileArrow /></MobileCtaLink>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[6]} index={6} total={chapters.length} className="m-home-process">
        <MobilePageCopy label={copy.processLabel} title={copy.processTitle} titleId={`${chapters[6].id}-title`} />
        <ol className="m-process-index">
          {dictionary.process.map((stage, index) => (
            <li key={stage.title}>
              <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
              <div><strong>{stage.title}</strong><p>{stage.text}</p></div>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      {archiveGroups.map((group, groupIndex) => (
        <MobileChapterSection key={groupIndex} chapter={chapters[7 + groupIndex]} index={7 + groupIndex} total={chapters.length} className="m-home-archive">
          <MobilePageCopy label={copy.archiveLabel} title={groupIndex === 0 ? copy.archiveTitle : dictionary.actions.viewAllProjects} titleId={`${chapters[7 + groupIndex].id}-title`} />
          <div className="m-archive-list">
            {group.map((project) => {
              const index = projects.findIndex((item) => item.slug === project.slug);
              return (
                <MobileCtaLink key={project.slug} to={`/work/${project.slug}`}>
                  <span dir="ltr">{localizeMobileDigits(String(index + 1).padStart(2, "0"), language)}</span>
                  <strong dir={getProjectTitleDirection(project, language)}><bdi>{getProjectDisplayTitle(project, language)}</bdi></strong>
                  <small>{dictionary.categories[project.category]}</small>
                </MobileCtaLink>
              );
            })}
          </div>
          {groupIndex === 1 ? <MobileCtaLink className="m-text-link" to="/work">{dictionary.actions.viewAllProjects} <MobileArrow /></MobileCtaLink> : null}
        </MobileChapterSection>
      ))}

      <MobileChapterSection chapter={chapters[9]} index={9} total={chapters.length} className="m-home-contact">
        <MobilePageCopy label={copy.contactLabel} title={copy.contactTitle} body={copy.contactBody} titleId={`${chapters[9].id}-title`}>
          <div className="m-actions m-actions--stack">
            <MobileExternalCta href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.actions.contactByWhatsApp} <MobileArrow /></MobileExternalCta>
            <MobileExternalCta className="m-cta--quiet" href={getEmailHref(language)}>{dictionary.actions.sendEmail}</MobileExternalCta>
          </div>
        </MobilePageCopy>
        <LogoAsset className="m-home-contact__mark" variant="hero" />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[10]} index={10} total={chapters.length} className="m-footer-page">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
