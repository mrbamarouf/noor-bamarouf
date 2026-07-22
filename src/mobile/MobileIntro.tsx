import { useCallback, useEffect, useRef, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

const INTRO_KEY = "noor-mobile-intro-v4";

function isHardRefresh() {
  const entry = performance.getEntriesByType("navigation")[0];
  return entry instanceof PerformanceNavigationTiming && entry.type === "reload";
}

export function MobileIntro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    window.sessionStorage.setItem(INTRO_KEY, "played");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(INTRO_KEY) === "played" && !isHardRefresh()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 280 : 2150;
    const exit = reduced ? 120 : 520;
    done.current = false;
    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), hold);
    const finishTimer = window.setTimeout(finish, hold + exit);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <section className={`m-intro ${leaving ? "is-leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <img className="m-intro__atmosphere" src="/brand/noor-final/intro-material-atmosphere.jpg" alt="" aria-hidden="true" />
      <span className="m-intro__vellum" aria-hidden="true" />
      <LogoAsset className="m-intro__identity" variant="intro" priority />
      <button type="button" className="m-intro__skip" onClick={() => { setLeaving(true); window.setTimeout(finish, 120); }}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
