import { Link } from "react-router-dom";
import { LogoAsset } from "../../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import {
  MobileArchiveRow,
  MobileChapterHeader,
  MobileProjectFeature,
  MobileTextLink,
} from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileHomePage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const selected = projects.slice(0, 4);
  const archive = projects.slice(4);

  return (
    <div className="m-page m-home">
      <section className="m-cover" aria-labelledby="mobile-home-title">
        <div className="m-cover__brand-field" data-reveal aria-hidden="true">
          <span className="m-cover__field m-cover__field--rose" />
          <span className="m-cover__field m-cover__field--sage" />
          <span className="m-cover__field m-cover__field--paper" />
          <span className="m-cover__rule m-cover__rule--one" />
          <span className="m-cover__rule m-cover__rule--two" />
          <span className="m-cover__star m-cover__star--one">✦</span>
          <span className="m-cover__star m-cover__star--two">✦</span>
        </div>
        <div className="m-cover__folio" data-reveal>
          <LogoAsset variant="hero" priority />
          <p className="m-chapter-label"><span>01</span><span>{words.heroLabel}</span></p>
          <h1 id="mobile-home-title">{words.heroTitle}</h1>
          <p className="m-cover__body">{words.heroBody}</p>
          <Link className="m-primary-link" to="/work">
            <span>{dictionary.actions.viewWork}</span>
            <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
          </Link>
        </div>
      </section>

      <section className="m-chapter m-selected" aria-labelledby="mobile-selected-title">
        <MobileChapterHeader
          id="mobile-selected-title"
          number="02"
          label={words.featuredLabel}
          title={words.featuredTitle}
          text={words.featuredBody}
        />
        <div className="m-selected__sequence">
          <MobileProjectFeature project={selected[0]} index={0} mode="cinematic" asset="hero" />
          <MobileProjectFeature project={selected[1]} index={1} mode="folio" />
          <MobileProjectFeature project={selected[2]} index={2} mode="strip" asset="hero" />
          <MobileProjectFeature project={selected[3]} index={3} mode="poster" />
        </div>
        <MobileTextLink to="/work">{dictionary.actions.viewAllProjects}</MobileTextLink>
      </section>

      <section className="m-about-chapter" aria-labelledby="mobile-about-title">
        <div className="m-about-chapter__visual" data-reveal>
          <MobileVisual project={projects[6]} image={projects[6].gallery[0]} asset="gallery-1" sizes="(max-width: 900px) 78vw, 1px" />
          <span aria-hidden="true">03</span>
        </div>
        <div className="m-about-chapter__copy">
          <MobileChapterHeader
            id="mobile-about-title"
            number="03"
            label={words.aboutLabel}
            title={words.aboutTitle}
            text={words.aboutBody}
          />
          <MobileTextLink to="/about">{dictionary.actions.readStory}</MobileTextLink>
        </div>
      </section>

      <section className="m-chapter m-services-chapter" id="services" aria-labelledby="mobile-services-title">
        <MobileChapterHeader
          id="mobile-services-title"
          number="04"
          label={words.servicesLabel}
          title={words.servicesTitle}
          text={words.servicesBody}
        />
        <MobileServicesShowcase />
      </section>

      <section className="m-process-chapter" aria-labelledby="mobile-process-title">
        <MobileChapterHeader
          id="mobile-process-title"
          number="05"
          label={words.processLabel}
          title={words.processTitle}
          text={words.processBody}
          tone="dark"
        />
        <ol>
          {dictionary.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="m-chapter m-archive-chapter" aria-labelledby="mobile-archive-title">
        <MobileChapterHeader
          id="mobile-archive-title"
          number="06"
          label={words.archiveLabel}
          title={words.archiveTitle}
          text={words.archiveBody}
        />
        <div className="m-archive-list">
          {archive.map((project, index) => <MobileArchiveRow key={project.slug} project={project} index={index + 4} />)}
        </div>
        <MobileTextLink to="/work">{dictionary.actions.viewAllProjects}</MobileTextLink>
      </section>

      <section className="m-contact-chapter" aria-labelledby="mobile-contact-title">
        <p className="m-chapter-label"><span>07</span><span>{words.contactLabel}</span></p>
        <h2 id="mobile-contact-title">{words.contactTitle}</h2>
        <p>{words.contactBody}</p>
        <div className="m-contact-chapter__methods">
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            <span>01</span><strong>{dictionary.ui.whatsapp}</strong><i aria-hidden="true">↗</i>
          </a>
          <a href={getEmailHref(language)}>
            <span>02</span><strong>{dictionary.ui.email}</strong><i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>
    </div>
  );
}
