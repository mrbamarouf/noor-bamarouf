import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";

export function MobileFooter() {
  const { dictionary, language } = useLanguage();

  return (
    <footer className="m-footer">
      <LogoAsset variant="footer" />
      <p>{dictionary.footer.line}</p>
      <div className="m-footer__actions">
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
          {dictionary.ui.whatsapp}
        </a>
        <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
      </div>
      <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
      <small>© 2026 {dictionary.footer.copyright}</small>
    </footer>
  );
}
