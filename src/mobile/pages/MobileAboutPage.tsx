import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileChapterHeader } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileAboutPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-about-page">
      <section className="m-about-cover" aria-labelledby="mobile-about-page-title">
        <div className="m-about-cover__copy">
          <MobileChapterHeader
            id="mobile-about-page-title"
            number="01"
            label={words.aboutLabel}
            title={words.aboutTitle}
            text={words.aboutBody}
          />
        </div>
        <div className="m-about-cover__visual" data-reveal>
          <MobileVisual project={projects[1]} image={projects[1].gallery[1]} asset="gallery-2" loading="eager" sizes="(max-width: 900px) 100vw, 1px" />
          <p>{dictionary.hero.materialNote}</p>
        </div>
      </section>

      <section className="m-about-essay">
        <p className="m-chapter-label"><span>02</span><span>{dictionary.sections.overview}</span></p>
        <p className="m-about-essay__lead" data-reveal>{dictionary.aboutPage.body}</p>
        <blockquote data-reveal>{dictionary.home.aboutQuote}</blockquote>
        <p data-reveal>{dictionary.aboutPage.philosophy}</p>
      </section>

      <section className="m-about-values" aria-labelledby="mobile-values-title">
        <MobileChapterHeader
          id="mobile-values-title"
          number="03"
          label={dictionary.sections.values}
          title={dictionary.sections.values}
        />
        <ol>
          {dictionary.values.map((value, index) => (
            <li key={value} data-reveal><span dir="ltr">{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong></li>
          ))}
        </ol>
      </section>

      <section className="m-about-invitation" data-reveal>
        <p>{dictionary.aboutPage.invite}</p>
        <Link className="m-primary-link" to="/contact">
          <span>{dictionary.actions.startProject}</span>
          <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
        </Link>
      </section>
    </div>
  );
}
