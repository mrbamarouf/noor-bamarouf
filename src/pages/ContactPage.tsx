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
    <div className="page contact-page contact-page--v2">
      <section className="contact-v2-hero" aria-labelledby="contact-title" data-reveal>
        <div className="contact-v2-hero__copy">
          <span className="section__index">{dictionary.nav.contact}</span>
          <h1 id="contact-title">{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
          <div className="contact-v2-hero__actions">
            <a className="button button--primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {dictionary.actions.contactByWhatsApp}
            </a>
            <a className="button button--quiet" href={emailHref}>
              {dictionary.actions.sendEmail}
            </a>
          </div>
        </div>
        <ProjectVisual
          className="contact-v2-hero__visual"
          image={matcha.coverImage}
          projectSlug={matcha.slug}
          asset="cover"
          ratio="portrait"
        />
      </section>

      <section className="contact-v2-methods" aria-label={dictionary.ui.connect} data-reveal>
        <div>
          <span>{dictionary.ui.whatsapp}</span>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">{contactDetails.whatsappDisplay}</a>
        </div>
        <div>
          <span>{dictionary.ui.email}</span>
          <a href={emailHref}>{contactDetails.email}</a>
        </div>
        <p>{dictionary.contactPage.methodBody}</p>
      </section>
    </div>
  );
}
