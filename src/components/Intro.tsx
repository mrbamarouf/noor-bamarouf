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
    const leaveTimer = window.setTimeout(() => setLeaving(true), 3920);
    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 4480);

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
      <div className="intro__paper-field" aria-hidden="true">
        <span className="intro__paper intro__paper--left" />
        <span className="intro__paper intro__paper--right" />
        <span className="intro__paper intro__paper--centre" />
      </div>
      <div className="intro__composition">
        <div className="intro__mark-assembly">
          <div className="intro__mark-fragment intro__mark-fragment--upper" aria-hidden="true">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__mark-fragment intro__mark-fragment--middle" aria-hidden="true">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__mark-fragment intro__mark-fragment--lower" aria-hidden="true">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__registration intro__registration--first" aria-hidden="true">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__registration intro__registration--second" aria-hidden="true">
            <LogoAsset variant="intro" priority />
          </div>
          <div className="intro__mark-final">
            <LogoAsset variant="intro" priority />
          </div>
        </div>
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
