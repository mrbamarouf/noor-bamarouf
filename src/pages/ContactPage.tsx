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
            <a className="desktop-button desktop-button--primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {dictionary.actions.contactByWhatsApp}
            </a>
            <a className="desktop-button desktop-button--ghost" href={emailHref}>
              {dictionary.actions.sendEmail}
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
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">{contactDetails.whatsappDisplay}</a>
        </article>
        <article>
          <span>{dictionary.ui.email}</span>
          <a href={emailHref}>{contactDetails.email}</a>
        </article>
        <p>{dictionary.contactPage.methodBody}</p>
      </section>
    </div>
  );
}
