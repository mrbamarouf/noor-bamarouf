import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { ScrollProgress } from "./components/ScrollProgress";
import { getProject } from "./data/projects";
import { useLanguage } from "./context/LanguageContext";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { WorkPage } from "./pages/WorkPage";

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
      "/": `Nour Bamarouf | ${dictionary.hero.descriptor}`,
      "/about": `${dictionary.nav.about} | Nour Bamarouf`,
      "/work": `${dictionary.nav.work} | Nour Bamarouf`,
      "/contact": `${dictionary.nav.contact} | Nour Bamarouf`,
    };
    document.title = project
      ? `${project.title} | Nour Bamarouf`
      : pageTitleMap[location.pathname] ?? `Nour Bamarouf | ${dictionary.hero.descriptor}`;

    const description = project
      ? project.shortDescription[language]
      : location.pathname === "/contact"
        ? dictionary.contactPage.body
        : location.pathname === "/about"
          ? dictionary.aboutPage.body
          : dictionary.hero.body;
    document.querySelector("meta[name='description']")?.setAttribute("content", description);
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
