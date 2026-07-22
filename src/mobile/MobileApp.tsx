import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollProgress } from "../components/ScrollProgress";
import { useLanguage } from "../context/LanguageContext";
import { MobileChapterIndicator, MobileChapterProvider } from "./MobileChapterSystem";
import { MobileFooter } from "./MobileFooter";
import { MobileHeader } from "./MobileHeader";
import { MobileIntro } from "./MobileIntro";
import { MobileAboutPage } from "./pages/MobileAboutPage";
import { MobileContactPage } from "./pages/MobileContactPage";
import { MobileHomePage } from "./pages/MobileHomePage";
import { MobileProjectPage } from "./pages/MobileProjectPage";
import { MobileServicesPage } from "./pages/MobileServicesPage";
import { MobileWorkPage } from "./pages/MobileWorkPage";

export function MobileApp({ manager }: { manager: React.ReactNode }) {
  const { dictionary } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.body.classList.add("mobile-experience");
    return () => document.body.classList.remove("mobile-experience");
  }, []);

  return (
    <MobileChapterProvider>
      <div className="m-app noor-mobile-shell">
        <a className="skip-link" href="#main-content">{dictionary.actions.skipToContent}</a>
        <MobileIntro />
        <MobileHeader />
        <MobileChapterIndicator />
        <ScrollProgress />
        {manager}
        <main id="main-content">
          <Routes>
            <Route path="/" element={<MobileHomePage />} />
            <Route path="/about" element={<MobileAboutPage />} />
            <Route path="/work" element={<MobileWorkPage />} />
            <Route path="/work/:slug" element={<MobileProjectPage />} />
            <Route path="/services" element={<MobileServicesPage />} />
            <Route path="/contact" element={<MobileContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {isHome ? null : <MobileFooter />}
      </div>
    </MobileChapterProvider>
  );
}
