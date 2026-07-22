import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { navItems } from "../data/content";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function navTarget(to: string) {
  return to === "/#services" ? "/services" : to;
}

export function MobileHeader() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeProject = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    return location.pathname.startsWith("/work/") ? getProject(parts[1]) : undefined;
  }, [location.pathname]);
  const projectStyle = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  const close = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) window.setTimeout(() => triggerRef.current?.focus(), 80);
  };

  useEffect(() => {
    close();
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLButtonElement>(".m-menu__close")?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className={`m-header ${activeProject ? "m-header--case" : ""}`} data-project={activeProject?.slug} style={projectStyle}>
        <LogoAsset variant="mobileHeader" asLink priority />
        <div className="m-header__actions">
          <button type="button" className="m-header__language" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
            {language === "en" ? "AR" : "EN"}
          </button>
          <button
            ref={triggerRef}
            type="button"
            className="m-menu-trigger"
            onClick={() => setOpen(true)}
            aria-label={dictionary.ui.openMenu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={`m-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="m-menu__scrim" onClick={() => close(true)} aria-hidden="true" />
        <div ref={panelRef} className="m-menu__panel" role="dialog" aria-modal="true" aria-label={dictionary.ui.menu}>
          <div className="m-menu__top">
            <Link to="/" className="m-menu__logo-link" aria-label="NOOR BAMAROUF home" onClick={() => close()}>
              <LogoAsset variant="menu" priority />
            </Link>
            <button type="button" className="m-menu__close" onClick={() => close(true)} aria-label={dictionary.ui.closeMenu}>
              <span />
              <span />
            </button>
          </div>

          <div className="m-menu__language-row">
            <span>NOOR BAMAROUF</span>
            <button type="button" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>

          <nav className="m-menu__nav" aria-label={dictionary.ui.menu}>
            {navItems.map((item, index) => {
              const to = navTarget(item.to);
              const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

              return (
                <Link key={item.labelKey} to={to} className={active ? "is-active" : ""} onClick={() => close()}>
                  <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{dictionary.nav[item.labelKey]}</strong>
                </Link>
              );
            })}
          </nav>

          <div className="m-menu__contact" aria-label={dictionary.ui.connect}>
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
              {dictionary.ui.whatsapp}
            </a>
            <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
          </div>

          <BamaroufStudioLink copy={dictionary.ecosystem} variant="menu" onClick={() => close()} />
        </div>
      </div>
    </>
  );
}
