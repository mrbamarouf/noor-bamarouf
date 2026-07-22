import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { ScrollProgress } from "./components/ScrollProgress";
import { getProject, getProjectDisplayTitle } from "./data/projects";
import { useLanguage } from "./context/LanguageContext";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { WorkPage } from "./pages/WorkPage";
import { MobileApp } from "./mobile/MobileApp";
import { useMobileViewport } from "./mobile/useMobileViewport";

const PRODUCTION_ORIGIN = "https://noorbamarouf.com";
const BRAND_TITLE = "NOOR BAMAROUF";
const BRAND_IMAGE = `${PRODUCTION_ORIGIN}/brand/noor-final/noor-nb-social.png`;

function setNamedMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

function ScrollManager() {
  const location = useLocation();
  const { dictionary, language } = useLanguage();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const projectPathParts = location.pathname.split("/").filter(Boolean);
    const projectSlug = location.pathname.startsWith("/work/") ? projectPathParts[1] : undefined;
    const project = getProject(projectSlug);
    const pageTitleMap: Record<string, string> = {
      "/": `${BRAND_TITLE} | ${dictionary.hero.descriptor}`,
      "/about": `${dictionary.nav.about} | ${BRAND_TITLE}`,
      "/work": `${dictionary.nav.work} | ${BRAND_TITLE}`,
      "/contact": `${dictionary.nav.contact} | ${BRAND_TITLE}`,
    };
    const title = project
      ? `${getProjectDisplayTitle(project, language)} | ${BRAND_TITLE}`
      : pageTitleMap[location.pathname] ?? `${BRAND_TITLE} | ${dictionary.hero.descriptor}`;
    document.title = title;

    const description = project
      ? project.shortDescription[language]
      : location.pathname === "/contact"
        ? dictionary.contactPage.body
        : location.pathname === "/about"
          ? dictionary.aboutPage.body
          : dictionary.hero.body;
    const canonicalPath = project || pageTitleMap[location.pathname] ? location.pathname : "/";
    const canonicalUrl = `${PRODUCTION_ORIGIN}${canonicalPath === "/" ? "/" : canonicalPath}`;

    document.querySelector<HTMLLinkElement>("link[rel='canonical']")?.setAttribute("href", canonicalUrl);
    setNamedMeta("meta[name='description']", description);
    setNamedMeta("meta[property='og:title']", title);
    setNamedMeta("meta[property='og:description']", description);
    setNamedMeta("meta[property='og:url']", canonicalUrl);
    setNamedMeta("meta[property='og:image']", BRAND_IMAGE);
    setNamedMeta("meta[name='twitter:title']", title);
    setNamedMeta("meta[name='twitter:description']", description);
    setNamedMeta("meta[name='twitter:url']", canonicalUrl);
    setNamedMeta("meta[name='twitter:image']", BRAND_IMAGE);

    const structuredData = document.getElementById("structured-data");
    if (structuredData) {
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: BRAND_TITLE,
        url: PRODUCTION_ORIGIN,
        image: BRAND_IMAGE,
        jobTitle: "Graphic Designer",
      });
    }
  }, [dictionary, language, location.pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

export function App() {
  const { dictionary } = useLanguage();
  const isMobile = useMobileViewport();

  if (isMobile) {
    return <MobileApp manager={<ScrollManager />} />;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dictionary.actions.skipToContent}
      </a>
      <Intro />
      <Header />
      <ScrollProgress />
      <ScrollManager />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
