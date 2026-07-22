import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/content";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { BamaroufStudioLink } from "./BamaroufStudioLink";
import { LogoAsset } from "./LogoAsset";
import type { CSSProperties } from "react";

function isHashLink(to: string) {
  return to.includes("#");
}

export function Header() {
  const { dictionary, direction, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const projectSlug = location.pathname.startsWith("/work/") ? location.pathname.split("/").filter(Boolean)[1] : undefined;
  const activeProject = getProject(projectSlug);
  const projectThemeStyle = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  const handleHashNav = (to: string) => {
    const [, hash] = to.split("#");
    if (!hash || location.pathname !== "/") return;

    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header className={activeProject ? "desktop-header desktop-header--case" : "desktop-header"} style={projectThemeStyle}>
      <div className="desktop-header__inner">
        <LogoAsset variant="header" asLink priority className="desktop-header__logo" />
        <nav className="desktop-header__nav" aria-label="Primary navigation" dir={direction}>
          {navItems.map((item) => {
            const label = dictionary.nav[item.labelKey];
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `desktop-header__link ${isActive && !isHashLink(item.to) ? "desktop-header__link--active" : ""}`
                }
                onClick={() => handleHashNav(item.to)}
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
        <div className="desktop-header__tools">
          <BamaroufStudioLink copy={dictionary.ecosystem} variant="header" />
          <button className="desktop-header__language" type="button" onClick={toggleLanguage} aria-label={dictionary.ui.languageSwitch}>
            <span>{language === "en" ? "AR" : "EN"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
