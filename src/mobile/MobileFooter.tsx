import { useLocation } from "react-router-dom";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { getProjectThemeStyle } from "../data/projectPresentation";
import { getProject } from "../data/projects";
import { mobileCopy } from "./mobileCopy";
import type { CSSProperties } from "react";

export function MobileFooter() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];
  const location = useLocation();
  const projectSlug = location.pathname.startsWith("/work/") ? location.pathname.split("/").filter(Boolean)[1] : undefined;
  const activeProject = getProject(projectSlug);
  const projectThemeStyle = activeProject ? (getProjectThemeStyle(activeProject) as CSSProperties) : undefined;

  return (
    <footer className={`m-footer ${activeProject ? "m-footer--case" : ""}`} style={projectThemeStyle}>
      <div className="m-footer__brand">
        <LogoAsset variant="footer" />
        <p>{dictionary.footer.line}</p>
      </div>

      <div className="m-footer__actions">
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.ui.whatsapp}<span aria-hidden="true">↗</span></a>
        <a href={getEmailHref(language)}>{dictionary.ui.email}<span aria-hidden="true">↗</span></a>
      </div>

      <div className="m-footer__base">
        <small>© 2026 {words.copyright}</small>
      </div>
    </footer>
  );
}
