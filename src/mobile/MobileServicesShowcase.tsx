import { useLanguage } from "../context/LanguageContext";
import { serviceOrder } from "../data/content";
import { getProjectImageByAsset } from "../data/projectPresentation";
import { projects } from "../data/projects";
import type { Project } from "../types";
import { mobileCopy } from "./mobileCopy";
import { MobileVisual, type MobileAsset } from "./MobileVisual";

const serviceReferences: Record<string, { project: Project; asset: MobileAsset }> = {
  brandIdentity: { project: projects[1], asset: "cover" },
  logoDesign: { project: projects[10], asset: "hero" },
  graphicDesign: { project: projects[2], asset: "hero" },
  packagingDesign: { project: projects[0], asset: "cover" },
  printDesign: { project: projects[2], asset: "gallery-3" },
  socialMediaDesign: { project: projects[7], asset: "cover" },
  editorialDesign: { project: projects[2], asset: "gallery-1" },
  creativeDirection: { project: projects[6], asset: "hero" },
};

export function MobileServicesShowcase() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <div className="m-services-gallery" data-reveal>
      {serviceOrder.map((service, index) => {
        const reference = serviceReferences[service];
        const image = getProjectImageByAsset(reference.project, reference.asset);

        return (
          <article className="m-service-card" key={service}>
            <div className="m-service-card__visual">
              <MobileVisual
                project={reference.project}
                image={image}
                asset={reference.asset}
                sizes="(max-width: 900px) 88vw, 1px"
              />
            </div>
            <div className="m-service-card__copy">
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <h3>{dictionary.services[service].title}</h3>
              <p>{dictionary.services[service].description}</p>
              <small>{words.serviceReference} / {reference.project.title}</small>
            </div>
          </article>
        );
      })}
    </div>
  );
}
