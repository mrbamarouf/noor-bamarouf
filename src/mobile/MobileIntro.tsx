import { useCallback, useEffect, useMemo, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

const INTRO_STORAGE_KEY = "noor-mobile-intro-complete";

export function MobileIntro() {
  const { dictionary } = useLanguage();
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(INTRO_STORAGE_KEY);
  });
  const [leaving, setLeaving] = useState(false);

  const finish = useCallback(() => {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), reduceMotion ? 1 : 420);
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    if (reduceMotion) {
      finish();
      return;
    }

    const timer = window.setTimeout(finish, 2700);
    return () => window.clearTimeout(timer);
  }, [finish, reduceMotion, visible]);

  if (!visible) return null;

  return (
    <div className={`m-intro ${leaving ? "is-leaving" : ""}`} role="status" aria-label={dictionary.intro.descriptor}>
      <div className="m-intro__paper m-intro__paper--one" aria-hidden="true" />
      <div className="m-intro__paper m-intro__paper--two" aria-hidden="true" />
      <div className="m-intro__light" aria-hidden="true" />
      <div className="m-intro__mark">
        <LogoAsset variant="hero" priority />
      </div>
      <button type="button" className="m-intro__skip" onClick={finish}>
        {dictionary.actions.skipIntro}
      </button>
    </div>
  );
}
