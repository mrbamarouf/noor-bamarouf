import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

function isHashLink(to: string) {
  return to.includes("#");
}

export function Header() {
  const { dictionary, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      </div>
    </header>
  );
}
