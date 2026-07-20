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
    <section className={`intro ${leaving ? "intro--leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="intro__material" aria-hidden="true" />
      <div className="intro__atmosphere" aria-hidden="true" />
      <div className="intro__shadow-field" aria-hidden="true" />
      <div className="intro__atelier">
        <span className="intro__paper intro__paper--lower" aria-hidden="true" />
        <span className="intro__paper intro__paper--upper" aria-hidden="true" />
        <div className="intro__vellum" aria-hidden="true" />
        <div className="intro__identity-field">
          <span className="intro__mark-shadow" aria-hidden="true" />
          <div className="intro__mark-reveal">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__studio-seal">
            <img
              src="/brand/bamarouf-studio-symbol.png"
              alt="Bamarouf Studio"
              width="900"
              height="900"
              decoding="async"
              loading="eager"
            />
          </div>
        </div>
        <span className="intro__fiber intro__fiber--left" aria-hidden="true" />
        <span className="intro__fiber intro__fiber--right" aria-hidden="true" />
        <div className="intro__light-pass" aria-hidden="true" />
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
