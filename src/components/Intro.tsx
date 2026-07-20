import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

const INTRO_KEY = "noor-intro-played";
const INTRO_ENTER_MS = 2380;
const INTRO_EXIT_MS = 540;
const INTRO_REDUCED_ENTER_MS = 680;
const INTRO_REDUCED_EXIT_MS = 180;
const INTRO_FAILSAFE_MS = 4300;

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
    if (typeof window === "undefined") {
      return;
    }

    const hasPlayedInSession = window.sessionStorage.getItem(INTRO_KEY) === "true";
    if (!isPageReload() && hasPlayedInSession) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const enterMs = reduceMotion ? INTRO_REDUCED_ENTER_MS : INTRO_ENTER_MS;
    const exitMs = reduceMotion ? INTRO_REDUCED_EXIT_MS : INTRO_EXIT_MS;
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
    const doneTimer = window.setTimeout(() => finish(), enterMs + exitMs);
    const failSafeTimer = window.setTimeout(() => finish(false), INTRO_FAILSAFE_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failSafeTimer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [finish]);

  const skip = () => {
    setLeaving(true);
    window.setTimeout(() => finish(), 260);
  };

  if (!visible) {
    return null;
  }

  return (
    <section className={`intro ${leaving ? "intro--leaving" : ""}`} aria-label={dictionary.intro.descriptor}>
      <div className="intro__field" aria-hidden="true">
        <span className="intro__aura intro__aura--blush" />
        <span className="intro__aura intro__aura--olive" />
        <span className="intro__light-pass" />
        <span className="intro__texture" />
      </div>
      <div className="intro__stage" aria-hidden="true">
        <div className="intro__mark-reveal">
          <LogoAsset variant="intro" priority />
        </div>
        <p className="intro__wordmark">NOOR BAMAROUF</p>
        <span className="intro__role">{dictionary.intro.descriptor}</span>
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
