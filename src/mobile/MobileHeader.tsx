import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { navItems } from "../data/content";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { useMobileChapterContext } from "./MobileChapterSystem";

function mobileTarget(to: string) {
  return to === "/#services" ? "/services" : to;
}

export function MobileHeader() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const { activeChapterId } = useMobileChapterContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const activeProject = useMemo(() => {
    const slug = location.pathname.startsWith("/work/") ? location.pathname.split("/")[2] : undefined;
    return getProject(slug);
  }, [location.pathname]);
  const style = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const switchLanguage = () => {
    if (activeChapterId) {
      window.history.replaceState(window.history.state, "", `${location.pathname}${location.search}#${activeChapterId}`);
    }
    toggleLanguage();
  };

  return (
    <>
      <header className={`m-header ${activeProject ? "m-header--project" : ""}`} style={style}>
        <LogoAsset variant="mobileHeader" asLink priority />
        <div className="m-header__tools">
          <button type="button" className="m-language" onClick={switchLanguage} aria-label={dictionary.ui.languageSwitch}>
            {language === "en" ? "AR" : "EN"}
          </button>
          <button
            type="button"
            className="m-menu-button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={dictionary.ui.openMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`m-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="m-menu__surface">
          <div className="m-menu__head">
            <LogoAsset variant="menu" asLink priority />
            <button ref={closeRef} type="button" className="m-menu__close" onClick={() => setOpen(false)} aria-label={dictionary.ui.closeMenu}>
              <span />
              <span />
            </button>
          </div>

          <nav className="m-menu__nav" aria-label={dictionary.ui.menu}>
            {navItems.map((item) => {
              const to = mobileTarget(item.to);
              const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
              return (
                <Link key={item.labelKey} to={to} onClick={() => setOpen(false)} className={active ? "is-active" : ""}>
                  {dictionary.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>

          <div className="m-menu__actions">
            <button type="button" onClick={switchLanguage}>{language === "en" ? "العربية" : "English"}</button>
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.ui.whatsapp}</a>
            <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
          </div>

          <BamaroufStudioLink copy={dictionary.ecosystem} variant="menu" onClick={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
