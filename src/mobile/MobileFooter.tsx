import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { ContactIcon } from "../components/ContactIcon";
import { LogoAsset } from "../components/LogoAsset";
import { StudioSocialLinks } from "../components/StudioSocialLinks";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../config/contact";
import { useLanguage } from "../context/LanguageContext";
import { accreditationCopy, accreditationsPath } from "../data/accreditations";
import { Link } from "react-router-dom";

export function MobileFooter({ caseMode = false }: { caseMode?: boolean }) {
  const { dictionary, language } = useLanguage();

  return (
    <footer className={`m-footer ${caseMode ? "m-footer--project" : ""}`}>
      <div className="m-footer__brand">
        <LogoAsset variant="footer" />
        <p>{dictionary.footer.line}</p>
        <Link className="m-footer__accreditation" to={accreditationsPath}>
          {accreditationCopy[language].footerReference}
        </Link>
      </div>
      <div className="m-footer__contact">
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer" aria-label={contactDetails.aria.whatsapp[language]}>
          <ContactIcon type="whatsapp" />
          <span>{dictionary.ui.whatsapp}</span>
        </a>
        <a href={getEmailHref(language)} aria-label={contactDetails.aria.email[language]}>
          <ContactIcon type="email" />
          <span>{dictionary.ui.email}</span>
        </a>
      </div>
      <div className="m-footer__studio">
        <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
        <StudioSocialLinks language={language} variant="footer" />
      </div>
      <p className="m-footer__copyright">© 2026 {dictionary.footer.copyright}</p>
    </footer>
  );
}
