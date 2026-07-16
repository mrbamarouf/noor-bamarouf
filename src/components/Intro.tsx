import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const INTRO_KEY = "nour-intro-played";

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
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2600);
    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 3000);

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
      <div className="intro__composition" aria-label="Nour Bamarouf Graphic Design">
        <div className="intro__monogram" aria-hidden="true">
          <span className="intro__monogram-n">N</span>
          <span className="intro__monogram-b">B</span>
          <svg className="intro__branch" viewBox="0 0 120 92" focusable="false" aria-hidden="true">
            <path className="intro__branch-stem" pathLength={1} d="M9 74 C31 61 45 40 61 10" />
            <path className="intro__branch-stem" pathLength={1} d="M40 48 C58 49 72 41 87 25" />
            <path className="intro__branch-leaf" d="M57 10 C76 10 88 0 95 0 C91 16 76 27 61 25 C58 19 57 14 57 10Z" />
            <path className="intro__branch-leaf" d="M81 25 C98 24 109 15 116 16 C111 31 96 39 84 36 C82 32 81 28 81 25Z" />
            <path className="intro__branch-leaf" d="M35 53 C48 53 57 45 63 45 C59 58 49 66 38 62 C36 59 35 56 35 53Z" />
            <path className="intro__branch-leaf" d="M23 65 C35 67 43 61 49 62 C43 74 33 79 24 74 C23 70 23 67 23 65Z" />
          </svg>
        </div>

        <div className="intro__wordmark-wrap">
          <h1 className="intro__wordmark">
            <span>NOUR</span>
            <span>BAMAROUF</span>
          </h1>
          <p className="intro__descriptor" lang="en">
            <span />
            GRAPHIC DESIGN
            <span />
          </p>
        </div>
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
