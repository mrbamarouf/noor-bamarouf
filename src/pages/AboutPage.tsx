import { Link } from "react-router-dom";
import { ProjectVisual } from "../components/ProjectVisual";
import { serviceOrder } from "../data/content";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function Arrow() {
  const { direction } = useLanguage();
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

export function AboutPage() {
  const { dictionary } = useLanguage();
  const matcha = projects.find((project) => project.slug === "matcha") ?? projects[0];
  const wemo = projects.find((project) => project.slug === "wemo-delights") ?? projects[0];
  const wello = projects.find((project) => project.slug === "wello") ?? projects[0];

  return (
    <div className="page about-page about-page--v2">
      <section className="about-v2-hero" aria-labelledby="about-page-title" data-reveal>
        <div className="about-v2-hero__copy">
          <span className="section__index">{dictionary.nav.about}</span>
          <h1 id="about-page-title">{dictionary.aboutPage.title}</h1>
          <p>{dictionary.aboutPage.body}</p>
        </div>
        <div className="about-v2-hero__visuals" aria-hidden="true">
          <ProjectVisual image={matcha.gallery[1]} projectSlug={matcha.slug} asset="gallery-2" ratio="square" />
          <ProjectVisual image={wello.coverImage} projectSlug={wello.slug} asset="cover" ratio="landscape" />
        </div>
      </section>

      <section className="about-v2-editorial" data-reveal>
        <ProjectVisual image={wemo.gallery[4]} projectSlug={wemo.slug} asset="gallery-5" ratio="portrait" />
        <div>
          <span className="section__index">{dictionary.sections.creativeDirection}</span>
          <h2>{dictionary.home.aboutQuote}</h2>
          <p>{dictionary.aboutPage.philosophy}</p>
        </div>
      </section>

      <section className="about-v2-values" aria-labelledby="values-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.values}</span>
          <h2 id="values-title">{dictionary.sections.values}</h2>
        </div>
        <ol>
          {dictionary.values.map((value, index) => (
            <li key={value}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-v2-capabilities" aria-labelledby="capabilities-title" data-reveal>
        <div>
          <span className="section__index">{dictionary.sections.capabilities}</span>
          <h2 id="capabilities-title">{dictionary.nav.services}</h2>
        </div>
        <div className="about-v2-capabilities__list">
          {serviceOrder.map((service, index) => (
            <article key={service}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <h3>{dictionary.services[service].title}</h3>
              <p>{dictionary.services[service].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-v2-invitation" aria-labelledby="about-invite-title" data-reveal>
        <h2 id="about-invite-title">{dictionary.aboutPage.invite}</h2>
        <Link className="button button--primary" to="/contact">
          {dictionary.actions.startProject} <Arrow />
        </Link>
      </section>
    </div>
  );
}
