import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { MobileChapterMenuIndex } from "./MobileChapterSystem";
import { mobileCopy } from "./mobileCopy";
import type { CSSProperties } from "react";

const darkProjectHeaderSlugs = new Set([
  "egg-space",
  "red-bull-marvel",
  "impostor",
  "nirto-cold-brew",
]);

export function MobileHeader() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const words = mobileCopy[language];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const previousY = lastScrollYRef.current;
      setScrolled(currentY > 12);
      setHidden(currentY > 140 && currentY > previousY + 18);
      if (currentY < previousY - 10 || currentY < 80) {
        setHidden(false);
      }
      lastScrollYRef.current = Math.max(0, currentY);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => close(false), [close, location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLButtonElement>(".m-menu__close")?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [close, open]);

  const links = [
    { to: "/", label: dictionary.nav.home, end: true },
    { to: "/about", label: dictionary.nav.about },
    { to: "/work", label: dictionary.nav.work },
    { to: "/services", label: dictionary.nav.services },
    { to: "/contact", label: dictionary.nav.contact },
  ];
  const currentProjectSlug = location.pathname.startsWith("/work/") ? location.pathname.split("/")[2] : "";
  const activeProject = getProject(currentProjectSlug);
  const isDarkProjectHeader = darkProjectHeaderSlugs.has(currentProjectSlug);
  const projectThemeStyle = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  return (
    <>
      <header
        className={`m-header ${scrolled ? "m-header--scrolled" : ""} ${activeProject ? "m-header--case" : ""} ${isDarkProjectHeader ? "m-header--on-dark" : ""}`}
        data-hidden={hidden && !open ? "true" : "false"}
        style={projectThemeStyle}
      >
        <LogoAsset variant="mobileHeader" asLink priority />
        <div className="m-header__tools">
          <button type="button" className="m-header__language" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
            {language === "en" ? "AR" : "EN"}
          </button>
          <button
            ref={triggerRef}
            type="button"
            className="m-menu-trigger"
            aria-label={words.openMenu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={`m-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div ref={panelRef} className="m-menu__panel" role="dialog" aria-modal="true" aria-label={words.menuLabel}>
          <div className="m-menu__top">
            <Link to="/" className="m-menu__brand" aria-label="NOOR BAMAROUF home" onClick={() => close()}>
              <LogoAsset variant="menu" priority />
            </Link>
            <button type="button" className="m-menu__close" onClick={() => close(true)} aria-label={words.closeMenu}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className="m-menu__heading">
            <span>{words.chapters}</span>
            <button type="button" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>

          <nav className="m-menu__nav" aria-label={words.menuLabel}>
            {links.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "is-active" : "")}
                onClick={() => close()}
              >
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <i aria-hidden="true">{language === "ar" ? "←" : "→"}</i>
              </NavLink>
            ))}
          </nav>

          <MobileChapterMenuIndex onNavigate={() => close()} />

          <BamaroufStudioLink copy={dictionary.ecosystem} variant="menu" onClick={() => close()} />

          <div className="m-menu__contact">
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.ui.whatsapp}<span aria-hidden="true">↗</span></a>
            <a href={getEmailHref(language)}>{dictionary.ui.email}<span aria-hidden="true">↗</span></a>
          </div>

          <p className="m-menu__copyright">© 2026 {language === "ar" ? "نور بامعروف" : "NOOR BAMAROUF"}</p>
        </div>
      </div>
    </>
  );
}
