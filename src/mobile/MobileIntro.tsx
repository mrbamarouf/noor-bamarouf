import { useEffect, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

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
        <div className="m-intro__atmosphere" aria-hidden="true" />
        <div className="m-intro__shadow-drift" aria-hidden="true" />
        <div className="m-intro__mark">
          <span className="m-intro__mark-shadow" aria-hidden="true" />
          <LogoAsset variant="intro" priority />
        </div>
        <span className="m-intro__impression">
          <img src="/brand/bamarouf-studio-symbol.png" alt="Bamarouf Studio" width="900" height="900" loading="eager" decoding="async" />
        </span>
        <div className="m-intro__light-pass" aria-hidden="true" />
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>{dictionary.actions.skipIntro}</button>
    </section>
  );
}
