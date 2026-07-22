import { useEffect, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MobileChapterIndicator, MobileChapterProvider } from "./MobileChapterSystem";
import { MobileHeader } from "./MobileHeader";
import { MobileIntro } from "./MobileIntro";
import { MobileAboutPage } from "./pages/MobileAboutPage";
import { MobileContactPage } from "./pages/MobileContactPage";
import { MobileHomePage } from "./pages/MobileHomePage";
import { MobileProjectPage } from "./pages/MobileProjectPage";
import { MobileServicesPage } from "./pages/MobileServicesPage";
import { MobileWorkPage } from "./pages/MobileWorkPage";

export function MobileApp({ manager }: { manager: ReactNode }) {
  const { dictionary } = useLanguage();

  useEffect(() => {
    document.body.classList.add("mobile-experience");
    document.documentElement.classList.add("mobile-experience-root");

    return () => {
      document.body.classList.remove("mobile-experience");
      document.documentElement.classList.remove("mobile-experience-root");
    };
  }, []);

  return (
    <MobileChapterProvider>
      <div className="m-app noor-mobile-shell">
        <a className="skip-link" href="#main-content">
          {dictionary.actions.skipToContent}
        </a>
        <MobileIntro />
        <MobileHeader />
        <MobileChapterIndicator />
        {manager}
        <main id="main-content" className="m-main">
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
      </div>
    </MobileChapterProvider>
  );
}
