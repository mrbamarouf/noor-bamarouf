import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/content";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

function isHashLink(to: string) {
  return to.includes("#");
}

export function Header() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) {
        return;
      }

      const focusable = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const handleHashNav = (to: string) => {
    const [, hash] = to.split("#");
    if (location.pathname !== "/") {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <LogoAsset variant="header" asLink priority />
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const label = dictionary.nav[item.labelKey];
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `site-nav__link ${isActive && !isHashLink(item.to) ? "site-nav__link--active" : ""}`
                }
                onClick={() => handleHashNav(item.to)}
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
        <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label="Switch language">
          <span>{language === "en" ? "AR" : "EN"}</span>
        </button>
        <button
          className="mobile-menu-button"
          type="button"
          ref={menuButtonRef}
          aria-label={menuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        ref={menuPanelRef}
      >
        <div className="mobile-menu__panel">
          <div className="mobile-menu__top">
            <LogoAsset variant="footer" priority />
            <button
              className="mobile-menu__close"
              type="button"
              ref={closeButtonRef}
              aria-label="Close mobile menu"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-menu__nav" aria-label={dictionary.ui.footerNavigation}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => {
                  handleHashNav(item.to);
                  setMenuOpen(false);
                }}
              >
                {dictionary.nav[item.labelKey]}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__language">
            <span>{language === "en" ? "Language" : "اللغة"}</span>
            <button type="button" onClick={toggleLanguage} aria-label="Switch language">
              {language === "en" ? "AR" : "EN"}
            </button>
          </div>
          <div className="mobile-menu__actions">
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
              {dictionary.actions.contactByWhatsApp}
            </a>
            <a href={getEmailHref(language)}>
              {dictionary.actions.sendEmail}
            </a>
          </div>
          <Link className="mobile-menu__home" to="/" onClick={() => setMenuOpen(false)}>
            Nour Bamarouf
          </Link>
        </div>
      </div>
    </header>
  );
}
