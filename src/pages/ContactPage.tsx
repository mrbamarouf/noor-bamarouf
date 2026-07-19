import { ProjectVisual } from "../components/ProjectVisual";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../config/contact";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

export function ContactPage() {
  const { dictionary, language } = useLanguage();
  const whatsappHref = getWhatsAppHref(language);
  const emailHref = getEmailHref(language);
  const matcha = projects.find((project) => project.slug === "matcha") ?? projects[0];

  return (
    <div className="page contact-page">
      <section className="contact-hero" aria-labelledby="contact-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.nav.contact}</span>
          <h1 id="contact-title">{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
        </div>
        <address className="contact-quick-links">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <span>{dictionary.ui.whatsapp}</span>
            <strong>{contactDetails.whatsappDisplay}</strong>
          </a>
          <a href={emailHref}>
            <span>{dictionary.ui.email}</span>
            <strong>{contactDetails.email}</strong>
          </a>
        </address>
      </section>

      <section className="contact-layout" data-reveal>
        <ProjectVisual
          className="contact-layout__visual"
          image={matcha.coverImage}
          projectSlug={matcha.slug}
          asset="cover"
          ratio="portrait"
        />

        <div className="contact-panel">
          <span className="section__index">{dictionary.ui.connect}</span>
          <h2>{dictionary.contactPage.methodTitle}</h2>
          <p>{dictionary.contactPage.methodBody}</p>
          <div className="contact-actions">
            <a className="button button--primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {dictionary.actions.contactByWhatsApp}
            </a>
            <a className="button button--quiet" href={emailHref}>
              {dictionary.actions.sendEmail}
            </a>
          </div>
          <dl className="contact-details">
            <div>
              <dt>{dictionary.ui.whatsapp}</dt>
              <dd>{contactDetails.whatsappDisplay}</dd>
            </div>
            <div>
              <dt>{dictionary.ui.email}</dt>
              <dd>{contactDetails.email}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
