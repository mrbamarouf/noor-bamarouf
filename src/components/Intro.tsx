import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

const INTRO_KEY = "noor-intro-played";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isPageReload() {
  const navigation = performance.getEntriesByType("navigation")[0];
  return navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";
}

export function Intro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasPlayedInSession = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if ((!isPageReload() && hasPlayedInSession) || prefersReducedMotion()) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2800);
    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 3360);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  const skip = () => {
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 320);
  };

  if (!visible) {
    return null;
  }

  return (
    <section className={`intro ${leaving ? "intro--leaving" : ""}`} aria-label="Opening sequence">
      <div className="intro__material" aria-hidden="true" />
      <div className="intro__atelier">
        <div className="intro__vellum" aria-hidden="true" />
        <figure className="intro__print-sheet" aria-hidden="true">
          <div className="intro__print-image">
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
        <div className="intro__identity-sheet">
          <div className="intro__editorial-meta" aria-hidden="true">
            <span>PORTFOLIO</span>
            <span>2026</span>
          </div>
          <div className="intro__mark-reveal">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__identity-note" aria-hidden="true">
            <span>DESIGN</span>
            <span>PRINT</span>
            <span>EDITORIAL</span>
          </div>
          <div className="intro__studio-seal">
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
        <div className="intro__light-pass" aria-hidden="true" />
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
