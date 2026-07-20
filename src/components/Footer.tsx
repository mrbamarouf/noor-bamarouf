import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

export function Footer() {
  const { dictionary, direction, language } = useLanguage();

  return (
    <footer className="site-footer site-footer--v2">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <LogoAsset variant="footer" />
          <p>{dictionary.footer.line}</p>
        </div>
        <div className="site-footer__actions">
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.actions.contactByWhatsApp}
          </a>
          <a href={getEmailHref(language)}>
            {dictionary.actions.sendEmail}
          </a>
        </div>
        <div className="site-footer__base">
          <p>© 2026 {dictionary.footer.copyright}</p>
          <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {dictionary.actions.backToTop} <span aria-hidden="true">{direction === "rtl" ? "↑" : "↑"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
