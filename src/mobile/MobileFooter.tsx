import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { mobileCopy } from "./mobileCopy";

export function MobileFooter() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  return (
    <footer className="m-footer">
      <LogoAsset variant="footer" />
      <p>{dictionary.footer.line}</p>
      <div className="m-footer__actions">
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
          <span>{dictionary.ui.whatsapp}</span><span aria-hidden="true">↗</span>
        </a>
        <a href={getEmailHref(language)}>
          <span>{dictionary.ui.email}</span><span aria-hidden="true">↗</span>
        </a>
      </div>
      <small>© 2026 {words.copyright}</small>
    </footer>
  );
}
