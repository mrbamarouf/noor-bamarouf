import { Link } from "react-router-dom";
import { ArtFrame } from "../components/ArtFrame";
import { serviceOrder } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export function AboutPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="page about-page">
      <section className="about-hero" aria-labelledby="about-page-title">
        <div>
          <span className="section__index">{dictionary.nav.about}</span>
          <h1 id="about-page-title">{dictionary.aboutPage.title}</h1>
        </div>
        <p>{dictionary.aboutPage.body}</p>
      </section>

      <section className="about-editorial">
        <ArtFrame
          variant="studio"
          alt={{
            en: "Studio table with papers, botanical forms, and soft material samples.",
            ar: "طاولة استوديو مع أوراق وأشكال نباتية وعينات مواد ناعمة.",
          }}
          ratio="portrait"
        />
        <div className="about-editorial__statement">
          <span className="section__index">{dictionary.sections.creativeDirection}</span>
          <h2>{dictionary.home.aboutQuote}</h2>
          <p>{dictionary.aboutPage.philosophy}</p>
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <h2 id="values-title">{dictionary.sections.values}</h2>
        <div className="values-list">
          {dictionary.values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div>
          <span className="section__index">{dictionary.sections.capabilities}</span>
          <h2 id="capabilities-title">{dictionary.nav.services}</h2>
        </div>
        <div className="capabilities-list">
          {serviceOrder.map((service) => (
            <article key={service}>
              <h3>{dictionary.services[service].title}</h3>
              <p>{dictionary.services[service].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-invitation" aria-labelledby="about-invite-title">
        <span className="section__index">{dictionary.sections.invitation}</span>
        <h2 id="about-invite-title">{dictionary.aboutPage.invite}</h2>
        <Link className="button button--primary" to="/contact">
          {dictionary.actions.startProject} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
