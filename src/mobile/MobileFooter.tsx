import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { mobileCopy } from "./mobileCopy";

export function MobileFooter() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <footer className="m-footer">
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
        <button type="button" onClick={backToTop} aria-label={dictionary.actions.backToTop}>↑</button>
      </div>
    </footer>
  );
}
