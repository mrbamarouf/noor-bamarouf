import { Link } from "react-router-dom";
import { BamaroufStudioLink } from "../components/BamaroufStudioLink";
import { LogoAsset } from "../components/LogoAsset";
import { getEmailHref, getWhatsAppHref } from "../config/contact";
import { navItems } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

function navTarget(to: string) {
  return to === "/#services" ? "/services" : to;
}

export function MobileFooter({ caseMode = false }: { caseMode?: boolean }) {
  const { dictionary, language } = useLanguage();

  return (
    <footer className={`m-footer ${caseMode ? "m-footer--case" : ""}`}>
      <div className="m-footer__identity">
        <LogoAsset variant="footer" />
        <p>{dictionary.footer.line}</p>
      </div>
      <nav className="m-footer__nav" aria-label={dictionary.ui.footerNavigation}>
        {navItems.map((item) => (
          <Link key={item.labelKey} to={navTarget(item.to)}>
            {dictionary.nav[item.labelKey]}
          </Link>
        ))}
      </nav>
      <div className="m-footer__contact" aria-label={dictionary.ui.connect}>
        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
          {dictionary.ui.whatsapp}
        </a>
        <a href={getEmailHref(language)}>{dictionary.ui.email}</a>
      </div>
      <BamaroufStudioLink copy={dictionary.ecosystem} variant="footer" />
      <p className="m-footer__copyright">© 2026 {dictionary.footer.copyright}</p>
    </footer>
  );
}
