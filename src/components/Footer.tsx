import { Link } from "react-router-dom";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { navItems } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { BamaroufStudioLink } from "./BamaroufStudioLink";
import { LogoAsset } from "./LogoAsset";

export function Footer() {
  const { dictionary, language } = useLanguage();

  return (
    <footer className="desktop-footer noor-global-footer-v3">
      <div className="desktop-footer__inner">
        <div className="desktop-footer__identity">
          <LogoAsset variant="footer" />
          <p>{dictionary.footer.line}</p>
        </div>
        <nav className="desktop-footer__nav" aria-label={dictionary.ui.footerNavigation}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {dictionary.nav[item.labelKey]}
            </Link>
          ))}
        </nav>
        <div className="desktop-footer__contact">
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.ui.whatsapp}
          </a>
          <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
        </div>
        <div className="desktop-footer__studio">
          <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
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
