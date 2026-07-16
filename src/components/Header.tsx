import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";

function isHashLink(to: string) {
  return to.includes("#");
}

export function Header() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setMenuOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const focusFirstItem = () => {
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      focusable[0]?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
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

    const focusTimer = window.setTimeout(focusFirstItem, 80);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

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
          ref={menuButtonRef}
          className={`mobile-menu-button ${menuOpen ? "mobile-menu-button--open" : ""}`}
          type="button"
          aria-label={menuOpen ? dictionary.ui.closeMenu : dictionary.ui.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu__panel" role="dialog" aria-modal="true" aria-label={dictionary.ui.menu}>
          <div className="mobile-menu__top">
            <LogoAsset variant="header" priority />
            <button className="mobile-menu__close" type="button" onClick={() => closeMenu()} aria-label={dictionary.ui.closeMenu}>
              <span />
              <span />
            </button>
          </div>
          <nav className="mobile-menu__nav" aria-label={dictionary.ui.menu}>
            {navItems.map((item) => {
              const label = dictionary.nav[item.labelKey];
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive && !isHashLink(item.to) ? "mobile-menu__link--active" : ""}`
                  }
                  onClick={() => {
                    handleHashNav(item.to);
                    closeMenu(false);
                  }}
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mobile-menu__utility">
            <button className="mobile-menu__language" type="button" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
              <span>{language === "en" ? "EN" : "AR"}</span>
              <strong>{language === "en" ? "AR" : "EN"}</strong>
            </button>
          </div>
          <div className="mobile-menu__actions">
            <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer" onClick={() => closeMenu(false)}>
              {dictionary.actions.contactByWhatsApp}
            </a>
            <a href={getEmailHref(language)} onClick={() => closeMenu(false)}>
              {dictionary.actions.sendEmail}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
