import { useEffect, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";
import { mobileCopy } from "./mobileCopy";

const INTRO_KEY = "noor-intro-played";

function isReload() {
  const navigation = performance.getEntriesByType("navigation")[0];
  return navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";
}

export function MobileIntro() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
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
    const leaveTimer = window.setTimeout(() => setLeaving(true), 3880);
    const finishTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 4440);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  const skip = () => {
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 420);
  };

  if (!visible) return null;

  return (
    <section className={`m-intro ${leaving ? "m-intro--leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="m-intro__material" aria-hidden="true" />
      <div className="m-intro__stage">
        <div className="m-intro__underlay" aria-hidden="true" />
        <figure className="m-intro__proof" aria-hidden="true">
          <img src="/concept-projects/matcha/cover.jpg" alt="" width="1080" height="1620" loading="eager" decoding="async" />
        </figure>
        <div className="m-intro__leaf m-intro__leaf--one" aria-hidden="true" />
        <div className="m-intro__leaf m-intro__leaf--two" aria-hidden="true" />
        <div className="m-intro__folio">
          <p className="m-intro__meta"><span>{words.issue}</span><span>00</span></p>
          <div className="m-intro__mark-window">
            <LogoAsset variant="intro" priority />
          </div>
          <p className="m-intro__caption">{dictionary.intro.descriptor}</p>
          <span className="m-intro__seal">
            <img src="/brand/bamarouf-studio-compact.png" alt="Bamarouf Studio" width="820" height="1011" loading="eager" decoding="async" />
          </span>
        </div>
        <div className="m-intro__light" aria-hidden="true" />
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>{dictionary.actions.skipIntro}</button>
    </section>
  );
}
