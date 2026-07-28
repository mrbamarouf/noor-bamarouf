import { useCallback, useEffect, useRef, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

const INTRO_KEY = "noor-intro-played";
const INTRO_ENTER_MS = 2320;
const INTRO_EXIT_MS = 560;
const INTRO_REDUCED_ENTER_MS = 520;
const INTRO_REDUCED_EXIT_MS = 160;
const INTRO_FAILSAFE_MS = 4200;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isPageReload() {
  const entry = performance.getEntriesByType("navigation")[0];
  return entry instanceof PerformanceNavigationTiming && entry.type === "reload";
}

export function MobileIntro() {
  const { dictionary, language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const completedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const finish = useCallback((restoreScroll = true) => {
    if (completedRef.current) return;
    completedRef.current = true;
    window.sessionStorage.setItem(INTRO_KEY, "true");
    cleanupRef.current?.();
    cleanupRef.current = null;
    setVisible(false);

    if (restoreScroll) {
      window.requestAnimationFrame(() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasPlayedInSession = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if (!isPageReload() && hasPlayedInSession) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    const reduced = prefersReducedMotion();
    const enterMs = reduced ? INTRO_REDUCED_ENTER_MS : INTRO_ENTER_MS;
    const exitMs = reduced ? INTRO_REDUCED_EXIT_MS : INTRO_EXIT_MS;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    completedRef.current = false;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    cleanupRef.current = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), enterMs);
    const finishTimer = window.setTimeout(finish, enterMs + exitMs);
    const failSafeTimer = window.setTimeout(() => finish(false), INTRO_FAILSAFE_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(failSafeTimer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [finish]);

  if (!visible) return null;

  const name = language === "ar" ? "نور بامعروف" : "NOOR BAMAROUF";
  const skip = () => {
    setLeaving(true);
    window.setTimeout(() => finish(), 220);
  };

  return (
    <section className={`m-intro ${leaving ? "is-leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="m-intro__atmosphere" aria-hidden="true">
        <span className="m-intro__wash m-intro__wash--rose" />
        <span className="m-intro__wash m-intro__wash--sage" />
        <span className="m-intro__beam" />
        <span className="m-intro__grain" />
      </div>
      <div className="m-intro__stage" aria-hidden="true">
        <span className="m-intro__label">{dictionary.intro.descriptor}</span>
        <div className="m-intro__identity">
          <LogoAsset variant="intro" priority />
        </div>
        <p className="m-intro__name">{name}</p>
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
