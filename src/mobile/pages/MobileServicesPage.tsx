import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { MobileChapterHeading } from "../MobilePrimitives";
import { MobileServicesShowcase } from "../MobileServicesShowcase";
import { mobileCopy } from "../mobileCopy";

export function MobileServicesPage() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-page m-services-page">
      <section className="m-inner-hero">
        <MobileChapterHeading number="01" label={words.servicesLabel} title={dictionary.nav.services} text={dictionary.home.servicesIntro} />
        <MobileServicesShowcase />
      </section>
      <section className="m-services-page__process">
        <MobileChapterHeading number="02" label={words.processLabel} title={dictionary.home.processTitle} text={dictionary.home.processIntro} />
        <Link className="m-button m-button--primary" to="/contact">{dictionary.actions.startProject}<span aria-hidden="true">{language === "ar" ? "←" : "→"}</span></Link>
      </section>
    </div>
  );
}
