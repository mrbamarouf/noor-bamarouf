import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { serviceOrder } from "../data/content";
import { projects } from "../data/projects";
import type { ServiceKey } from "../types";
import { mobileCopy } from "./mobileCopy";
import { MobileVisual, type MobileAsset } from "./MobileVisual";

const serviceReferences: Record<ServiceKey, { projectIndex: number; asset: MobileAsset }> = {
  brandIdentity: { projectIndex: 1, asset: "cover" },
  logoDesign: { projectIndex: 10, asset: "hero" },
  graphicDesign: { projectIndex: 2, asset: "hero" },
  packagingDesign: { projectIndex: 0, asset: "cover" },
  printDesign: { projectIndex: 10, asset: "gallery-1" },
  socialMediaDesign: { projectIndex: 7, asset: "cover" },
  editorialDesign: { projectIndex: 11, asset: "cover" },
  creativeDirection: { projectIndex: 6, asset: "hero" },
};

export function MobileServicesShowcase() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const [active, setActive] = useState(0);

  return (
    <div className="m-services-accordion" data-reveal>
      {serviceOrder.map((service, index) => {
        const open = active === index;
        const reference = serviceReferences[service];
        const project = projects[reference.projectIndex];
        const image = reference.asset === "cover"
          ? project.coverImage
          : reference.asset === "hero"
            ? project.heroImage
            : project.gallery[0];

        return (
          <section className={`m-service-item ${open ? "is-open" : ""}`} key={service}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`mobile-service-${service}`}
              onClick={() => setActive(index)}
            >
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{dictionary.services[service].title}</strong>
              <i aria-hidden="true">{open ? "−" : "+"}</i>
            </button>
            <div id={`mobile-service-${service}`} className="m-service-item__panel" hidden={!open}>
              <p>{dictionary.services[service].description}</p>
              <div className="m-service-item__reference">
                <MobileVisual project={project} image={image} asset={reference.asset} sizes="(max-width: 900px) 88vw, 1px" />
                <span>{words.serviceReference} / {project.title}</span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
