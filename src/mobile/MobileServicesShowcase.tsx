import { useState } from "react";
import { serviceOrder } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { mobileCopy } from "./mobileCopy";

export function MobileServicesShowcase() {
  const { dictionary, language } = useLanguage();
  const [active, setActive] = useState(0);
  const service = serviceOrder[active];
  const words = mobileCopy[language];

  const move = (amount: number) => {
    setActive((current) => (current + amount + serviceOrder.length) % serviceOrder.length);
  };

  return (
    <div className="m-service-showcase" data-reveal>
      <div className="m-service-showcase__stage" aria-live="polite">
        <p className="m-service-showcase__count">
          <span>{words.servicePosition}</span>
          <span className="m-service-showcase__position" dir="ltr">
            <strong>{String(active + 1).padStart(2, "0")}</strong>
            <span>/ {String(serviceOrder.length).padStart(2, "0")}</span>
          </span>
        </p>
        <h3>{dictionary.services[service].title}</h3>
        <p className="m-service-showcase__description">{dictionary.services[service].description}</p>
        <div className="m-service-showcase__controls">
          <button type="button" onClick={() => move(language === "ar" ? 1 : -1)} aria-label={words.previous}>←</button>
          <button type="button" onClick={() => move(language === "ar" ? -1 : 1)} aria-label={words.next}>→</button>
        </div>
      </div>
      <div className="m-service-showcase__rail" role="tablist" aria-label={dictionary.nav.services}>
        {serviceOrder.map((key, index) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{dictionary.services[key].title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
