import { DecorativeNbLogo } from "../../components/DecorativeNbLogo";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileExternalCta } from "../MobilePrimitives";

const contactChapters = makeMobileChapters([
  ["Contact", "التواصل"],
  ["Methods", "طرق التواصل"],
  ["Footer", "التذييل"],
]);

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const total = contactChapters.length;
  const whatsappHref = getWhatsAppHref(language);
  const emailHref = getEmailHref(language);

  return (
    <MobileChapterController chapters={contactChapters} className="m-contact-page">
      <MobileChapterSection chapter={contactChapters[0]} index={0} total={total} className="m-contact-opening">
        <div className="m-section-copy">
          <span>{dictionary.nav.contact}</span>
          <h1 id={`${contactChapters[0].id}-title`}>{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
          <div className="m-actions">
            <MobileExternalCta href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {dictionary.actions.contactByWhatsApp} <MobileArrow />
            </MobileExternalCta>
            <MobileExternalCta className="m-cta--ghost" href={emailHref}>
              {dictionary.actions.sendEmail}
            </MobileExternalCta>
          </div>
        </div>
        <DecorativeNbLogo className="m-contact-opening__mark" priority />
      </MobileChapterSection>

      <MobileChapterSection chapter={contactChapters[1]} index={1} total={total} className="m-contact-methods">
        <div className="m-section-copy">
          <span>{dictionary.ui.connect}</span>
          <h2 id={`${contactChapters[1].id}-title`}>{dictionary.contactPage.methodTitle}</h2>
          <p>{dictionary.contactPage.methodBody}</p>
        </div>
        <div className="m-contact-ledger">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <span>{dictionary.ui.whatsapp}</span>
            <strong>{contactDetails.whatsappDisplay}</strong>
          </a>
          <a href={emailHref}>
            <span>{dictionary.ui.email}</span>
            <strong>{contactDetails.email}</strong>
          </a>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={contactChapters[2]} index={2} total={total} className="m-footer-chapter">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
