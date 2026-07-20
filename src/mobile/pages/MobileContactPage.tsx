import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-contact-page m-contact-page--v2">
      <section className="m-room m-room--contact-route" aria-labelledby="mobile-contact-page-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.contactLabel}</p>
          <h1 id="mobile-contact-page-title">{dictionary.contactPage.title}</h1>
          <span>{dictionary.contactPage.body}</span>
        </div>

        <div className="m-room--contact__methods" data-reveal>
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            <strong>{dictionary.actions.contactByWhatsApp}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={getEmailHref(language)}>
            <strong>{dictionary.actions.sendEmail}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="m-contact-route__note" data-reveal>{dictionary.contactPage.methodBody}</p>
      </section>

      <section className="m-room m-room--contact-visual" aria-label={words.contactLabel}>
        <MobileVisual
          project={projects[6]}
          image={projects[6].gallery[4]}
          asset="gallery-5"
          sizes="(max-width: 900px) 100vw, 1px"
        />
        <div className="m-room--contact-visual__actions" data-reveal>
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            <span>{dictionary.ui.whatsapp}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={getEmailHref(language)}>
            <span>{dictionary.ui.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
