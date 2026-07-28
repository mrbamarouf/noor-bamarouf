import { ContactIcon } from "../components/ContactIcon";
import { DecorativeNbLogo } from "../components/DecorativeNbLogo";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";

export function ContactPage() {
  const { dictionary, language } = useLanguage();
  const whatsappHref = getWhatsAppHref(language);
  const emailHref = getEmailHref(language);

  return (
    <div className="desktop-page desktop-contact-page">
      <section className="desktop-contact-page__hero" aria-labelledby="contact-title" data-reveal>
        <div className="desktop-contact-page__copy desktop-section-flow">
          <span className="desktop-kicker">{dictionary.nav.contact}</span>
          <h1 id="contact-title">{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
          <div className="desktop-contact-page__actions">
            <a
              className="desktop-button desktop-button--primary contact-action-link"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contactDetails.aria.whatsapp[language]}
            >
              <ContactIcon type="whatsapp" />
              <span>{contactDetails.whatsappDisplay}</span>
            </a>
            <a className="desktop-button desktop-button--ghost contact-action-link" href={emailHref} aria-label={contactDetails.aria.email[language]}>
              <ContactIcon type="email" />
              <span>{contactDetails.emailDisplay}</span>
            </a>
          </div>
        </div>
        <figure className="desktop-contact-page__signature" aria-label="NOOR BAMAROUF">
          <DecorativeNbLogo priority />
          <figcaption>{dictionary.hero.studioNote}</figcaption>
        </figure>
      </section>

      <section className="desktop-contact-page__methods" aria-label={dictionary.ui.connect} data-reveal>
        <article>
          <span>{dictionary.ui.whatsapp}</span>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={contactDetails.aria.whatsapp[language]}>
            <ContactIcon type="whatsapp" />
            <bdi>{contactDetails.whatsappDisplay}</bdi>
          </a>
        </article>
        <article>
          <span>{dictionary.ui.email}</span>
          <a href={emailHref} aria-label={contactDetails.aria.email[language]}>
            <ContactIcon type="email" />
            <bdi>{contactDetails.emailDisplay}</bdi>
          </a>
        </article>
        <p>{dictionary.contactPage.methodBody}</p>
      </section>
    </div>
  );
}
