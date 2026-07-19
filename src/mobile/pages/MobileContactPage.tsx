import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileChapterHeading } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-contact-page">
      <section className="m-contact-page__hero">
        <MobileChapterHeading number="01" label={words.contactLabel} title={dictionary.contactPage.title} text={dictionary.contactPage.body} />
        <div className="m-contact-page__actions" data-reveal>
          <a className="m-contact-method m-contact-method--primary" href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            <span>01</span><strong>{dictionary.actions.contactByWhatsApp}</strong><i aria-hidden="true">↗</i>
          </a>
          <a className="m-contact-method" href={getEmailHref(language)}>
            <span>02</span><strong>{dictionary.actions.sendEmail}</strong><i aria-hidden="true">↗</i>
          </a>
        </div>
        <p className="m-contact-page__note" data-reveal>{words.contactNote}</p>
      </section>
      <div className="m-contact-page__image" data-reveal>
        <MobileVisual project={projects[6]} image={projects[6].gallery[0]} asset="gallery-1" />
      </div>
    </div>
  );
}
