import { LogoAsset } from "../components/LogoAsset";
import { useLanguage } from "../context/LanguageContext";
import { mobileCopy } from "./mobileCopy";

const STUDIO_URL = "https://bamaroufstudio.com/";

export function MobileFooter() {
  const { dictionary, language } = useLanguage();
  const words = mobileCopy[language];

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <footer className="m-footer">
      <p className="m-footer__chapter"><span>08</span><span>{dictionary.ecosystem.name}</span></p>
      <div className="m-footer__brand">
        <LogoAsset variant="footer" />
        <p>{dictionary.footer.line}</p>
      </div>

      <a className="m-footer__studio" href={STUDIO_URL} aria-label={dictionary.ecosystem.label}>
        <span aria-hidden="true">
          <img src="/brand/bamarouf-studio-symbol.png" alt="" width="900" height="900" loading="lazy" decoding="async" />
        </span>
        <strong>{dictionary.ecosystem.footerLine}</strong>
        <i aria-hidden="true">{language === "ar" ? "←" : "→"}</i>
      </a>

      <div className="m-footer__base">
        <small>© 2026 {words.copyright}</small>
        <button type="button" onClick={backToTop} aria-label={dictionary.actions.backToTop}>↑</button>
      </div>
    </footer>
  );
}
