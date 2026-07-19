import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileChapterHeader } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-contact-page">
      <section className="m-contact-cover" aria-labelledby="mobile-contact-page-title">
        <div className="m-contact-cover__copy">
          <MobileChapterHeader
            id="mobile-contact-page-title"
            number="01"
            label={words.contactLabel}
            title={words.contactTitle}
            text={words.contactBody}
          />
          <div className="m-contact-cover__methods" data-reveal>
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
              <span dir="ltr">01</span><strong>{dictionary.actions.contactByWhatsApp}</strong><i aria-hidden="true">↗</i>
            </a>
            <a href={getEmailHref(language)}>
              <span dir="ltr">02</span><strong>{dictionary.actions.sendEmail}</strong><i aria-hidden="true">↗</i>
            </a>
          </div>
          <p className="m-contact-cover__note" data-reveal>{dictionary.contactPage.methodBody}</p>
        </div>
        <div className="m-contact-cover__visual" data-reveal>
          <MobileVisual project={projects[6]} image={projects[6].gallery[4]} asset="gallery-5" sizes="(max-width: 900px) 100vw, 1px" />
        </div>
      </section>
    </div>
  );
}
