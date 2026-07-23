import { LogoAsset } from "../../components/LogoAsset";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileExternalCta, MobilePageCopy } from "../MobilePrimitives";
import { mobileContactCopy } from "../mobileCopy";

const chapters = makeMobileChapters([
  ["Contact", "التواصل"],
  ["Contact methods", "طرق التواصل"],
  ["Footer", "التذييل"],
]);

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const copy = mobileContactCopy[language];
  const whatsapp = getWhatsAppHref(language);
  const email = getEmailHref(language);

  return (
    <MobileChapterController chapters={chapters} className="m-contact">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-contact-hero">
        <MobilePageCopy label={copy.label} title={copy.title} body={copy.body} titleId={`${chapters[0].id}-title`}>
          <div className="m-actions m-actions--stack">
            <MobileExternalCta href={whatsapp} target="_blank" rel="noopener noreferrer">{copy.whatsapp} <MobileArrow /></MobileExternalCta>
            <MobileExternalCta className="m-cta--quiet" href={email}>{copy.email}</MobileExternalCta>
          </div>
        </MobilePageCopy>
        <LogoAsset className="m-contact-hero__mark" variant="hero" priority />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-contact-methods">
        <MobilePageCopy label={copy.methodsLabel} title={copy.methodsTitle} body={copy.methodsBody} titleId={`${chapters[1].id}-title`} />
        <div className="m-contact-methods__links">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer"><span>{dictionary.ui.whatsapp}</span><strong>{contactDetails.whatsappDisplay}</strong><MobileArrow /></a>
          <a href={email}><span>{dictionary.ui.email}</span><strong>{contactDetails.email}</strong><MobileArrow /></a>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={chapters.length} className="m-footer-page"><MobileFooter /></MobileChapterSection>
    </MobileChapterController>
  );
}
