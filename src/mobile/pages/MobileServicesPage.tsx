import { useLanguage } from "../../context/LanguageContext";
import { serviceOrder } from "../../data/content";
import { projects } from "../../data/projects";
import { MobileChapterController, MobileChapterSection, type MobileChapterDefinition } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileProjectLine, MobileTextLink } from "../MobilePrimitives";

const chapters: MobileChapterDefinition[] = [
  { id: "chapter-01", title: { en: "Services", ar: "الخدمات" } },
  { id: "chapter-02", title: { en: "Identity and objects", ar: "الهوية والمواد" } },
  { id: "chapter-03", title: { en: "Print and social", ar: "المطبوعات والتواصل" } },
  { id: "chapter-04", title: { en: "Process", ar: "المنهجية" } },
  { id: "chapter-05", title: { en: "Contact", ar: "التواصل" } },
];

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const total = chapters.length;
  const firstGroup = serviceOrder.slice(0, 4);
  const secondGroup = serviceOrder.slice(4);
  const referenceProjects = projects.slice(0, 4);

  return (
    <MobileChapterController chapters={chapters} className="m-services-page">
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-services-intro">
        <div className="m-chapter-copy">
          <p>{dictionary.nav.services}</p>
          <h1 id={`${chapters[0].id}-title`}>
            {language === "ar" ? "خدمات مصممة حول وضوح العلامة." : "Services shaped around brand clarity."}
          </h1>
          <p>{dictionary.home.servicesIntro}</p>
        </div>
        <div className="m-line-list m-line-list--soft">
          {referenceProjects.map((project, index) => (
            <MobileProjectLine key={project.slug} project={project} index={index} />
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={total} className="m-services-group">
        <div className="m-service-list">
          {firstGroup.map((service, index) => (
            <article key={service}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <h2 id={index === 0 ? `${chapters[1].id}-title` : undefined}>{dictionary.services[service].title}</h2>
              <p>{dictionary.services[service].description}</p>
            </article>
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={total} className="m-services-group m-services-group--alt">
        <div className="m-service-list">
          {secondGroup.map((service, index) => (
            <article key={service}>
              <span dir="ltr">{String(index + 5).padStart(2, "0")}</span>
              <h2 id={index === 0 ? `${chapters[2].id}-title` : undefined}>{dictionary.services[service].title}</h2>
              <p>{dictionary.services[service].description}</p>
            </article>
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={total} className="m-services-process">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[3].id}-title`}>{dictionary.home.processTitle}</h2>
          <p>{dictionary.home.processIntro}</p>
        </div>
        <ol className="m-process-list">
          {dictionary.process.map((step, index) => (
            <li key={step.title}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[4]} index={4} total={total} className="m-global-end">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[4].id}-title`}>{dictionary.home.contactTitle}</h2>
          <p>{dictionary.home.contactBody}</p>
          <MobileTextLink to="/contact">{dictionary.actions.startProject}</MobileTextLink>
        </div>
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
