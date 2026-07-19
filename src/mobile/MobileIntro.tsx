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
    const leave = window.setTimeout(() => setLeaving(true), 2900);
    const finish = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 3400);

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
      <div className="m-intro__logo-reveal">
        <LogoAsset variant="intro" priority />
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
