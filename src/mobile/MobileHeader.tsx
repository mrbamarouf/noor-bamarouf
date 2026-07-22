import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { mobileCopy } from "./mobileCopy";

export function MobileHeader() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const words = mobileCopy[language];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const projectSlug = location.pathname.startsWith("/work/") ? location.pathname.split("/").filter(Boolean)[1] : undefined;
  const activeProject = getProject(projectSlug);
  const projectStyle = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => close(false), [close, location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLButtonElement>(".m-menu__close")?.focus(), 90);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }

      if (event.key !== "Tab") return;

      const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (!controls.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];

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
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [close, open]);

  const links = [
    { to: "/", label: dictionary.nav.home, end: true },
    { to: "/about", label: dictionary.nav.about },
    { to: "/work", label: dictionary.nav.work },
    { to: "/services", label: dictionary.nav.services },
    { to: "/contact", label: dictionary.nav.contact },
  ];

  return (
    <>
      <header
        className={`m-header ${activeProject ? "m-header--case" : ""}`}
        data-project={activeProject?.slug}
        style={projectStyle}
      >
        <LogoAsset variant="mobileHeader" asLink priority />
        <div className="m-header__actions">
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
            <Link to="/" className="m-menu__logo-link" aria-label="NOOR BAMAROUF home" onClick={() => close()}>
              <LogoAsset variant="menu" priority />
            </Link>
            <button type="button" className="m-menu__close" onClick={() => close(true)} aria-label={words.closeMenu}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className="m-menu__language-row">
            <span>{words.menuTitle}</span>
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
              </NavLink>
            ))}
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
