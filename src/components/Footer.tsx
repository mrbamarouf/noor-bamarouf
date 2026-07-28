import { Link } from "react-router-dom";
import { contactDetails, getEmailHref, getWhatsAppHref } from "../config/contact";
import { accreditationCopy, accreditationsPath } from "../data/accreditations";
import { navItems } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { BamaroufStudioLink } from "./BamaroufStudioLink";
import { ContactIcon } from "./ContactIcon";
import { LogoAsset } from "./LogoAsset";
import { StudioSocialLinks } from "./StudioSocialLinks";

export function Footer() {
  const { dictionary, language } = useLanguage();

  return (
    <footer className="desktop-footer noor-global-footer-v3">
      <div className="desktop-footer__inner">
        <div className="desktop-footer__identity">
          <LogoAsset variant="footer" />
          <p>{dictionary.footer.line}</p>
          <Link className="desktop-footer__accreditation" to={accreditationsPath}>
            {accreditationCopy[language].footerReference}
          </Link>
        </div>
        <nav className="desktop-footer__nav" aria-label={dictionary.ui.footerNavigation}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {dictionary.nav[item.labelKey]}
            </Link>
          ))}
        </nav>
        <div className="desktop-footer__contact">
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer" aria-label={contactDetails.aria.whatsapp[language]}>
            <ContactIcon type="whatsapp" />
            <span>{dictionary.ui.whatsapp}</span>
          </a>
          <a href={getEmailHref(language)} aria-label={contactDetails.aria.email[language]}>
            <ContactIcon type="email" />
            <span>{dictionary.ui.email}</span>
          </a>
        </div>
        <div className="desktop-footer__studio">
          <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
          <StudioSocialLinks language={language} variant="footer" />
        </div>
        <div className="desktop-footer__base">
          <p>© 2026 {dictionary.footer.copyright}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {dictionary.actions.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
