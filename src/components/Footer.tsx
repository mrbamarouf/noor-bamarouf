import { Link } from "react-router-dom";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { navItems, serviceOrder } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { LogoAsset } from "./LogoAsset";

export function Footer() {
  const { dictionary, language } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <LogoAsset variant="footer" />
          <p>{dictionary.footer.line}</p>
        </div>
        <nav className="footer-list" aria-label={dictionary.ui.footerNavigation}>
          <h2>{dictionary.nav.home}</h2>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {dictionary.nav[item.labelKey]}
            </Link>
          ))}
        </nav>
        <div className="footer-list">
          <h2>{dictionary.nav.services}</h2>
          {serviceOrder.slice(0, 5).map((service) => (
            <span key={service}>{dictionary.services[service].title}</span>
          ))}
        </div>
        <div className="footer-list">
          <h2>{dictionary.nav.contact}</h2>
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.actions.contactByWhatsApp}
          </a>
          <a href={getEmailHref(language)}>
            {dictionary.actions.sendEmail}
          </a>
        </div>
        <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {dictionary.actions.backToTop}
        </button>
        <p className="site-footer__copyright">© 2026 {dictionary.footer.copyright}</p>
      </div>
    </footer>
  );
}
