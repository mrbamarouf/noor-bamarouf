import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getDesktopProjectCover, getProjectImageByAsset, getProjectThemeStyle } from "../data/projectPresentation";
import { getProjectDisplayTitle, getProjectTitleDirection, projects } from "../data/projects";
import type { Project } from "../types";
import { localizeMobileDigits } from "./MobileChapterSystem";
import { MobileArrow } from "./MobilePrimitives";
import { MobileVisual } from "./MobileVisual";
import { mobileHomeCopy } from "./mobileCopy";

const rotationMs = 6400;
const featuredSlugs = [
  "red-bull-marvel",
  "wello",
  "matcha",
  "jeddah-railway",
  "wemo-delights",
  "impostor",
  "nirto-cold-brew",
  "ansab-holding",
] as const;

function findFeaturedProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing featured mobile project: ${slug}`);
  return project;
}

const featuredProjects = featuredSlugs.map(findFeaturedProject);

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function MobileFeaturedShowcase() {
  const { dictionary, direction, language } = useLanguage();
  const copy = mobileHomeCopy[language];
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerActive, setPointerActive] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const interacting = pointerActive || focusWithin;
  const activeProject = featuredProjects[activeIndex] ?? featuredProjects[0];
  const activeCover = getDesktopProjectCover(activeProject);
  const activeImage = getProjectImageByAsset(activeProject, activeCover.asset);

  useEffect(() => {
    if (reducedMotion || interacting || featuredProjects.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredProjects.length);
    }, rotationMs);
    return () => window.clearInterval(timer);
  }, [interacting, reducedMotion]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % featuredProjects.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    setPointerActive(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start !== null) {
      const delta = event.clientX - start;
      if (Math.abs(delta) > 44) {
        const movedToNext = direction === "rtl" ? delta > 0 : delta < 0;
        if (movedToNext) showNext();
        else showPrevious();
      }
    }
    setPointerActive(false);
  };

  return (
    <div
      className="m-featured-showcase"
      style={getProjectThemeStyle(activeProject) as CSSProperties}
      data-project={activeProject.slug}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      role="group"
      aria-roledescription="carousel"
      aria-label={copy.featuredLabel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null;
        setPointerActive(false);
      }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <Link className="m-featured-showcase__visual" to={`/work/${activeProject.slug}`} key={`visual-${activeProject.slug}`}>
        <MobileVisual
          project={activeProject}
          image={activeImage}
          asset={activeCover.asset}
          fit={activeCover.fit}
          formatOverride={activeCover.format}
          loading="eager"
        />
      </Link>

      <div className="m-featured-showcase__copy" key={`copy-${activeProject.slug}`} aria-live="polite">
        <div className="m-featured-showcase__meta">
          <span>{copy.featuredLabel}</span>
          <span dir="ltr">
            {localizeMobileDigits(String(activeIndex + 1).padStart(2, "0"), language)} / {localizeMobileDigits(String(featuredProjects.length).padStart(2, "0"), language)}
          </span>
        </div>
        <h2 dir={getProjectTitleDirection(activeProject, language)}><bdi>{getProjectDisplayTitle(activeProject, language)}</bdi></h2>
        <strong>{dictionary.categories[activeProject.category]}</strong>
        <p>{activeProject.shortDescription[language]}</p>
        <Link className="m-featured-showcase__cta" to={`/work/${activeProject.slug}`}>
          {dictionary.actions.openProject} <MobileArrow />
        </Link>
      </div>

      <div className="m-featured-showcase__controls">
        <button type="button" onClick={showPrevious} aria-label={language === "ar" ? "المشروع السابق" : "Previous featured project"}>
          <span aria-hidden="true">{direction === "rtl" ? "→" : "←"}</span>
        </button>
        <div className="m-featured-showcase__progress" aria-hidden="true">
          {featuredProjects.map((project, index) => <i key={project.slug} className={index === activeIndex ? "is-active" : ""} />)}
        </div>
        <button type="button" onClick={showNext} aria-label={language === "ar" ? "المشروع التالي" : "Next featured project"}>
          <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>
        </button>
      </div>
    </div>
  );
}
