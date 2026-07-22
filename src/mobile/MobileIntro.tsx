import { useCallback, useEffect, useRef, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

const INTRO_KEY = "noor-mobile-intro-rebuilt";
const ENTER_MS = 1700;
const EXIT_MS = 420;
const REDUCED_ENTER_MS = 360;
const REDUCED_EXIT_MS = 120;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isReload() {
  const navigation = performance.getEntriesByType("navigation")[0];
  return navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";
}

export function MobileIntro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const completeRef = useRef(false);

  const finish = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setVisible(false);
  }, []);

  useEffect(() => {
    const played = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if (played && !isReload()) return;

    const reduce = reducedMotion();
    const enter = reduce ? REDUCED_ENTER_MS : ENTER_MS;
    const exit = reduce ? REDUCED_EXIT_MS : EXIT_MS;
    const oldBodyOverflow = document.body.style.overflow;
    const oldHtmlOverflow = document.documentElement.style.overflow;

    completeRef.current = false;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    setVisible(true);

    const leaveTimer = window.setTimeout(() => setLeaving(true), enter);
    const doneTimer = window.setTimeout(finish, enter + exit);

    return () => {
      document.body.style.overflow = oldBodyOverflow;
      document.documentElement.style.overflow = oldHtmlOverflow;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <section className={`m-intro ${leaving ? "m-intro--leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="m-intro__paper" aria-hidden="true" />
      <div className="m-intro__light" aria-hidden="true" />
      <div className="m-intro__grain" aria-hidden="true" />
      <LogoAsset className="m-intro__logo" variant="intro" priority />
      <button className="m-intro__skip" type="button" onClick={() => { setLeaving(true); window.setTimeout(finish, 120); }}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
