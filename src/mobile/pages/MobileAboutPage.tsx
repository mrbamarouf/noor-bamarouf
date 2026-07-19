import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileChapterHeading } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileAboutPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-about-page">
      <section className="m-inner-hero m-about-page__hero">
        <MobileChapterHeading number="01" label={dictionary.nav.about} title={dictionary.aboutPage.title} />
        <p className="m-about-page__lead" data-reveal>{words.profile}</p>
        <div className="m-about-page__portrait" data-reveal>
          <MobileVisual project={projects[1]} image={projects[1].gallery[3]} asset="gallery-4" loading="eager" />
          <p>{dictionary.hero.materialNote}</p>
        </div>
      </section>

      <section className="m-about-page__essay" data-reveal>
        <p className="m-kicker"><span>02</span><span>{dictionary.sections.overview}</span></p>
        <p>{dictionary.aboutPage.body}</p>
        <blockquote>{dictionary.home.aboutQuote}</blockquote>
        <p>{dictionary.aboutPage.philosophy}</p>
      </section>

      <section className="m-about-page__values" aria-labelledby="m-values-title">
        <MobileChapterHeading id="m-values-title" number="03" label={dictionary.sections.values} title={dictionary.sections.values} />
        <ol>
          {dictionary.values.map((value, index) => <li key={value} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong></li>)}
        </ol>
      </section>

      <section className="m-about-page__invitation" data-reveal>
        <p className="m-kicker"><span>04</span><span>{dictionary.sections.invitation}</span></p>
        <h2>{dictionary.aboutPage.invite}</h2>
        <Link className="m-button m-button--primary" to="/contact">{dictionary.actions.startProject}<span aria-hidden="true">{language === "ar" ? "←" : "→"}</span></Link>
      </section>
    </div>
  );
}
