import { useLanguage } from "../../context/LanguageContext";
import { MobileTextLink } from "../MobilePrimitives";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import { mobileCopy } from "../mobileCopy";

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-services-page m-services-page--v2">
      <section className="m-room m-room--services-route" aria-labelledby="mobile-services-page-title">
        <div className="m-room__heading" data-reveal>
          <p>{words.servicesLabel}</p>
          <h1 id="mobile-services-page-title">{words.servicesTitle}</h1>
          <span>{words.servicesBody}</span>
        </div>
        <MobileServicesShowcase />
      </section>

      <section className="m-room m-room--process m-room--process-route" aria-labelledby="mobile-services-process-title">
        <div className="m-room__heading m-room__heading--dark" data-reveal>
          <p>{words.processLabel}</p>
          <h2 id="mobile-services-process-title">{words.processTitle}</h2>
          <span>{words.processBody}</span>
        </div>
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
