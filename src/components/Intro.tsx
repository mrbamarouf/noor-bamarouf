import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { BrandMark } from "./BrandMark";

const INTRO_KEY = "nour-intro-played";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Intro() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(INTRO_KEY) === "true" || prefersReducedMotion()) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2800);
    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setVisible(false);
    }, 3600);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
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
    <section className={`intro ${leaving ? "intro--leaving" : ""}`} aria-label="Opening sequence">
      <div className="intro__paper" />
      <div className="intro__center">
        <BrandMark variant="stacked" />
        <p>{dictionary.intro.descriptor}</p>
      </div>
      <button className="intro__skip" type="button" onClick={skip}>
        {dictionary.actions.skipIntro}
      </button>
    </section>
  );
}
