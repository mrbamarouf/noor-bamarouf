import { useCallback, useEffect, useRef, useState } from "react";
import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";

const INTRO_KEY = "noor-intro-played";
const MOBILE_INTRO_ENTER_MS = 2360;
const MOBILE_INTRO_EXIT_MS = 520;
const MOBILE_INTRO_REDUCED_ENTER_MS = 620;
const MOBILE_INTRO_REDUCED_EXIT_MS = 180;
const MOBILE_INTRO_FAILSAFE_MS = 4200;

function isReload() {
  const navigation = performance.getEntriesByType("navigation")[0];
  return navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";
}

export function MobileIntro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const completedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const focusTargetRef = useRef<HTMLElement | null>(null);

  const restoreFocus = useCallback(() => {
    const previousTarget = focusTargetRef.current;
    if (previousTarget && document.contains(previousTarget) && previousTarget !== document.body) {
      previousTarget.focus({ preventScroll: true });
      return;
    }

    const main = document.getElementById("main-content");
    if (!main) {
      return;
    }

    const hadTabIndex = main.hasAttribute("tabindex");
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    if (!hadTabIndex) {
      main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
    }
  }, []);

  const finish = useCallback((restore = true) => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    window.sessionStorage.setItem(INTRO_KEY, "true");
    cleanupRef.current?.();
    cleanupRef.current = null;
    setVisible(false);

    if (restore) {
      window.requestAnimationFrame(restoreFocus);
    }
  }, [restoreFocus]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if (played && !isReload()) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    const enterMs = reducedMotion ? MOBILE_INTRO_REDUCED_ENTER_MS : MOBILE_INTRO_ENTER_MS;
    const exitMs = reducedMotion ? MOBILE_INTRO_REDUCED_EXIT_MS : MOBILE_INTRO_EXIT_MS;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const activeElement = document.activeElement;

    focusTargetRef.current = activeElement instanceof HTMLElement ? activeElement : null;
    completedRef.current = false;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    cleanupRef.current = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), enterMs);
    const finishTimer = window.setTimeout(() => finish(), enterMs + exitMs);
    const failSafeTimer = window.setTimeout(() => finish(false), MOBILE_INTRO_FAILSAFE_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(failSafeTimer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [finish]);

  const skip = () => {
    setLeaving(true);
    window.setTimeout(() => finish(), 260);
  };

  if (!visible) return null;

  return (
    <section className={`m-intro ${leaving ? "m-intro--leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="m-intro__atmosphere" aria-hidden="true">
        <span className="m-intro__paper m-intro__paper--base" />
        <span className="m-intro__paper m-intro__paper--blush" />
        <span className="m-intro__paper m-intro__paper--sage" />
        <span className="m-intro__light-pass" />
        <span className="m-intro__grain" />
      </div>
      <div className="m-intro__stage" aria-hidden="true">
        <div className="m-intro__mark">
          <LogoAsset variant="intro" priority />
        </div>
      </div>
      <button type="button" className="m-intro__skip" onClick={skip}>{dictionary.actions.skipIntro}</button>
    </section>
  );
}
