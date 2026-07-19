import { Link } from "react-router-dom";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileChapterHeading, MobileProjectCard, MobileTextLink } from "../MobilePrimitives";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const selected = projects.slice(0, 6);
  const archive = projects.slice(6);
  const process = [...dictionary.process.slice(0, 4), dictionary.process[dictionary.process.length - 1]];

  return (
    <div className="m-page m-home">
      <section className="m-home-hero" aria-labelledby="mobile-home-title">
        <div className="m-home-hero__copy" data-reveal>
          <p className="m-kicker"><span>01</span><span>{dictionary.hero.descriptor}</span></p>
          <h1 id="mobile-home-title"><span>{dictionary.hero.lineOne}</span><span>{dictionary.hero.lineTwo}</span></h1>
          <p>{dictionary.hero.body}</p>
          <div className="m-home-hero__actions">
            <Link className="m-button m-button--primary" to="/work">{dictionary.actions.viewWork}<span aria-hidden="true">{language === "ar" ? "←" : "→"}</span></Link>
            <Link className="m-button m-button--quiet" to="/contact">{dictionary.actions.startProject}</Link>
          </div>
        </div>
        <div className="m-home-hero__image" data-reveal>
          <MobileVisual project={projects[0]} image={projects[0].heroImage} asset="hero" loading="eager" />
          <p><span>{dictionary.hero.cue}</span><span>{words.scroll} ↓</span></p>
        </div>
      </section>

      <section className="m-chapter m-selected" aria-labelledby="mobile-selected-title">
        <MobileChapterHeading id="mobile-selected-title" number="02" label={words.featuredSelection} title={dictionary.home.selectedTitle} text={dictionary.home.selectedIntro} />
        <div className="m-selected__sequence">
          {selected.map((project, index) => (
            <MobileProjectCard key={project.slug} project={project} index={index} layout={index % 3 === 0 ? "full" : index % 3 === 1 ? "inset" : "offset"} />
          ))}
        </div>
        <MobileTextLink to="/work">{dictionary.actions.viewAllProjects}</MobileTextLink>
      </section>

      <section className="m-philosophy" aria-labelledby="mobile-philosophy-title" data-reveal>
        <p className="m-kicker"><span>03</span><span>{words.philosophyLabel}</span></p>
        <h2 id="mobile-philosophy-title">{dictionary.home.philosophyTitle}</h2>
        <p>{dictionary.home.philosophyBody}</p>
      </section>

      <section className="m-chapter m-about-chapter" aria-labelledby="mobile-about-title">
        <MobileChapterHeading id="mobile-about-title" number="04" label={dictionary.nav.about} title={dictionary.home.aboutTitle} />
        <div className="m-about-chapter__visual" data-reveal>
          <MobileVisual project={projects[1]} image={projects[1].gallery[3]} asset="gallery-4" />
          <MobileVisual project={projects[6]} image={projects[6].gallery[0]} asset="gallery-1" />
        </div>
        <blockquote data-reveal>{dictionary.home.aboutQuote}</blockquote>
        <p data-reveal>{dictionary.home.aboutBody}</p>
        <MobileTextLink to="/about">{dictionary.actions.readStory}</MobileTextLink>
      </section>

      <section className="m-chapter m-services-chapter" id="services" aria-labelledby="mobile-services-title">
        <MobileChapterHeading id="mobile-services-title" number="05" label={words.servicesLabel} title={dictionary.nav.services} text={dictionary.home.servicesIntro} />
        <MobileServicesShowcase />
        <MobileTextLink to="/services">{dictionary.nav.services}</MobileTextLink>
      </section>

      <section className="m-process-story" aria-labelledby="mobile-process-title">
        <MobileChapterHeading id="mobile-process-title" number="06" label={words.processLabel} title={dictionary.home.processTitle} text={dictionary.home.processIntro} />
        <ol>
          {process.map((step, index) => (
            <li key={`${step.title}-${index}`} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="m-chapter m-archive-chapter" aria-labelledby="mobile-archive-title">
        <MobileChapterHeading id="mobile-archive-title" number="07" label={words.projectIndex} title={dictionary.home.archiveTitle} text={dictionary.home.workNote} />
        <div className="m-archive-chapter__grid">
          {archive.map((project, index) => <MobileProjectCard key={project.slug} project={project} index={index + 6} layout={index % 2 ? "offset" : "inset"} />)}
        </div>
        <MobileTextLink to="/work">{dictionary.actions.viewAllProjects}</MobileTextLink>
      </section>

      <section className="m-contact-chapter" aria-labelledby="mobile-contact-title" data-reveal>
        <p className="m-kicker"><span>08</span><span>{words.contactLabel}</span></p>
        <h2 id="mobile-contact-title">{dictionary.home.contactTitle}</h2>
        <p>{dictionary.home.contactBody}</p>
        <div>
          <a className="m-button m-button--primary" href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.actions.contactByWhatsApp}<span aria-hidden="true">↗</span></a>
          <a className="m-button m-button--quiet" href={getEmailHref(language)}>{dictionary.actions.sendEmail}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </div>
  );
}
