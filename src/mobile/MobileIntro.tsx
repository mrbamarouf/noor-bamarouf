import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "../components/LogoAsset";

const INTRO_KEY = "noor-intro-played";

function isReload() {
  const navigation = performance.getEntriesByType("navigation")[0];
  return navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";
}

export function MobileIntro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if (reducedMotion || (played && !isReload())) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    setVisible(true);
    const leave = window.setTimeout(() => setLeaving(true), 2800);
    const finish = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 3360);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(finish);
    };
  }, []);

  const skip = () => {
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 420);
  };

  if (!visible) {
    return null;
  }

  return (
    <section className={`m-intro ${leaving ? "m-intro--leaving" : ""}`} aria-label="Opening sequence">
      <div className="m-intro__material" aria-hidden="true" />
      <div className="m-intro__atelier">
        <div className="m-intro__vellum" aria-hidden="true" />
        <figure className="m-intro__print-sheet" aria-hidden="true">
          <div className="m-intro__print-image">
            <img
              src="/concept-projects/matcha/hero.jpg"
              alt=""
              width="1672"
              height="941"
              decoding="async"
              loading="eager"
            />
          </div>
          <figcaption>
            <span>01 / 12</span>
            <span>PACKAGING / IDENTITY</span>
          </figcaption>
        </figure>
        <div className="m-intro__identity-sheet">
          <div className="m-intro__editorial-meta" aria-hidden="true">
            <span>PORTFOLIO</span>
            <span>2026</span>
          </div>
          <div className="m-intro__mark-reveal">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="m-intro__identity-note" aria-hidden="true">
            <span>DESIGN</span>
            <span>PRINT</span>
            <span>EDITORIAL</span>
          </div>
          <div className="m-intro__studio-seal">
            <img
              src="/brand/bamarouf-studio-compact.png"
              alt="Bamarouf Studio"
              width="820"
              height="1011"
              decoding="async"
              loading="eager"
            />
          </div>
        </div>
        <div className="m-intro__light-pass" aria-hidden="true" />
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
