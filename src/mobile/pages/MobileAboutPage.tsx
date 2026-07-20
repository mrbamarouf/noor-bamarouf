import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { MobileVisual } from "../MobileVisual";
import { mobileCopy } from "../mobileCopy";

export function MobileAboutPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-about-page m-about-page--v2">
      <section className="m-room m-room--about-route" aria-labelledby="mobile-about-page-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.aboutLabel}</p>
          <h1 id="mobile-about-page-title">{dictionary.aboutPage.title}</h1>
          <span>{dictionary.aboutPage.body}</span>
        </div>
        <MobileVisual project={projects[1]} image={projects[1].gallery[1]} asset="gallery-2" loading="eager" sizes="(max-width: 900px) 100vw, 1px" />
      </section>

      <section className="m-room m-room--about-essay">
        <div className="m-room__heading" data-reveal>
          <p>{dictionary.sections.creativeDirection}</p>
          <h2>{dictionary.home.aboutQuote}</h2>
          <span>{dictionary.aboutPage.philosophy}</span>
        </div>
        <MobileVisual project={projects[6]} image={projects[6].gallery[0]} asset="gallery-1" sizes="(max-width: 900px) 84vw, 1px" />
      </section>

      <section className="m-room m-room--about-values" aria-labelledby="mobile-values-title">
        <div className="m-room__heading" data-reveal>
          <p>{dictionary.sections.values}</p>
          <h2 id="mobile-values-title">{dictionary.sections.values}</h2>
        </div>
        <ol className="m-v2-archive-list">
          {dictionary.values.map((value, index) => (
            <li key={value} data-reveal>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ol>
        <Link className="m-primary-link" to="/contact">
          <span>{dictionary.actions.startProject}</span>
          <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
        </Link>
      </section>
    </div>
  );
}
