import { useLanguage } from "../../context/LanguageContext";
import { MobileChapterHeader, MobileTextLink } from "../MobilePrimitives";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import { mobileCopy } from "../mobileCopy";

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-services-page">
      <section className="m-services-cover" aria-labelledby="mobile-services-page-title">
        <MobileChapterHeader
          id="mobile-services-page-title"
          number="01"
          label={words.servicesLabel}
          title={words.servicesTitle}
          text={words.servicesBody}
        />
        <MobileServicesShowcase />
      </section>

      <section className="m-process-chapter m-process-chapter--route" aria-labelledby="mobile-services-process-title">
        <MobileChapterHeader
          id="mobile-services-process-title"
          number="02"
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
        <MobileTextLink to="/contact">{dictionary.actions.startProject}</MobileTextLink>
      </section>
    </div>
  );
}
