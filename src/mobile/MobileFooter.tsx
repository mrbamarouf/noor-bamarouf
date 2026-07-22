import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";

export function MobileFooter({ caseMode = false }: { caseMode?: boolean }) {
  const { dictionary, language } = useLanguage();

  return (
    <footer className={`m-footer ${caseMode ? "m-footer--project" : ""}`}>
      <div className="m-footer__brand">
        <LogoAsset variant="footer" />
        <p>{dictionary.footer.line}</p>
      </div>
      <div className="m-footer__contact">
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">{dictionary.ui.whatsapp}</a>
        <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
      </div>
      <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
      <p className="m-footer__copyright">© 2026 {dictionary.footer.copyright}</p>
    </footer>
  );
}
