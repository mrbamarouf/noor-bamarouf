import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import type { Language, LocalizedString } from "../types";

export interface MobileChapterDefinition {
  id: string;
  title: LocalizedString;
}

interface MobileChapterContextValue {
  chapters: MobileChapterDefinition[];
  activeChapterId: string;
  activeChapterIndex: number;
  setChapters: (chapters: MobileChapterDefinition[]) => void;
  setActiveChapterId: (id: string) => void;
}

const MobileChapterContext = createContext<MobileChapterContextValue | undefined>(undefined);

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function localizeMobileDigits(value: string, language: Language) {
  if (language !== "ar") return value;
  return value.replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
}

export function formatMobileChapterNumber(value: number, language: Language) {
  return localizeMobileDigits(String(value).padStart(2, "0"), language);
}

function getMobileTextDirection(value: string) {
  return /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
}

function scrollMobileChapterIntoPlace(root: HTMLElement, target: HTMLElement) {
  root.scrollTo({ top: target.offsetTop, behavior: "auto" });
}

export function getMobileChapterAnchor(index: number) {
  return `chapter-${String(index + 1).padStart(2, "0")}`;
}

export function MobileChapterProvider({ children }: { children: ReactNode }) {
  const [chapters, updateChapters] = useState<MobileChapterDefinition[]>([]);
  const [activeChapterId, updateActiveChapterId] = useState("");

  const setChapters = useCallback((nextChapters: MobileChapterDefinition[]) => {
    updateChapters(nextChapters);
    updateActiveChapterId((current) => {
      if (nextChapters.some((chapter) => chapter.id === current)) return current;
      return nextChapters[0]?.id ?? "";
    });
  }, []);

  const setActiveChapterId = useCallback((id: string) => {
    updateActiveChapterId((current) => (current === id ? current : id));
  }, []);

  const activeChapterIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeChapterId),
  );

  const value = useMemo<MobileChapterContextValue>(
    () => ({ chapters, activeChapterId, activeChapterIndex, setChapters, setActiveChapterId }),
    [activeChapterId, activeChapterIndex, chapters, setActiveChapterId, setChapters],
  );

  return <MobileChapterContext.Provider value={value}>{children}</MobileChapterContext.Provider>;
}

export function useMobileChapterContext() {
  const context = useContext(MobileChapterContext);
  if (!context) {
    throw new Error("useMobileChapterContext must be used within MobileChapterProvider");
  }
  return context;
}

export function MobileChapterController({
  chapters,
  className = "",
  children,
}: {
  chapters: MobileChapterDefinition[];
  className?: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const location = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { activeChapterId, setActiveChapterId, setChapters } = useMobileChapterContext();
  const activeChapterRef = useRef(activeChapterId);

  useEffect(() => {
    activeChapterRef.current = activeChapterId;
  }, [activeChapterId]);

  useEffect(() => {
    setChapters(chapters);
    return () => setChapters([]);
  }, [chapters, setChapters]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const chapterNodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!chapterNodes.length) return;

    let frame = 0;

    const updateNearest = () => {
      frame = 0;
      const rootRect = root.getBoundingClientRect();
      const target = chapterNodes
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            id: node.id,
            distance: Math.abs(rect.top - rootRect.top),
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      if (target) setActiveChapterId(target.id);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateNearest);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveChapterId(visible.target.id);
        }
      },
      {
        root,
        threshold: [0.45, 0.6, 0.75],
        rootMargin: "-18% 0px -28% 0px",
      },
    );

    chapterNodes.forEach((node) => observer.observe(node));
    root.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateNearest();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [chapters, setActiveChapterId]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const id = location.hash.replace("#", "");
    const target = id && chapters.some((chapter) => chapter.id === id) ? document.getElementById(id) : undefined;

    window.requestAnimationFrame(() => {
      if (target) {
        scrollMobileChapterIntoPlace(root, target);
        setActiveChapterId(target.id);
        window.setTimeout(() => scrollMobileChapterIntoPlace(root, target), 80);
        return;
      }

      root.scrollTo({ top: 0, behavior: "auto" });
      if (chapters[0]) setActiveChapterId(chapters[0].id);
    });
  }, [chapters, location.pathname, location.hash, setActiveChapterId]);

  useEffect(() => {
    const root = scrollerRef.current;
    const current = activeChapterRef.current;
    if (!root || !current) return;

    window.requestAnimationFrame(() => {
      const target = document.getElementById(current);
      if (target) {
        scrollMobileChapterIntoPlace(root, target);
        window.setTimeout(() => scrollMobileChapterIntoPlace(root, target), 80);
      }
    });
  }, [language]);

  return (
    <div ref={scrollerRef} className={`m-chapter-scroll ${className}`} data-mobile-scroller>
      {children}
    </div>
  );
}

export function MobileChapterSection({
  chapter,
  index,
  total,
  className = "",
  children,
}: {
  chapter: MobileChapterDefinition;
  index: number;
  total: number;
  className?: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const title = chapter.title[language];

  return (
    <section
      id={chapter.id}
      className={`m-chapter ${className}`}
      data-mobile-chapter
      data-chapter-index={index + 1}
      aria-labelledby={`${chapter.id}-title`}
    >
      <p className="m-chapter__marker">
        <span dir="ltr">{formatMobileChapterNumber(index + 1, language)}</span>
        <span aria-hidden="true">/</span>
        <span dir="ltr">{formatMobileChapterNumber(total, language)}</span>
        <strong dir={getMobileTextDirection(title)}>
          <bdi>{title}</bdi>
        </strong>
      </p>
      {children}
    </section>
  );
}

export function MobileChapterIndicator() {
  const { language } = useLanguage();
  const { activeChapterIndex, chapters } = useMobileChapterContext();

  if (!chapters.length) return null;

  const activeChapter = chapters[activeChapterIndex] ?? chapters[0];
  const title = activeChapter.title[language];

  return (
    <aside className="m-chapter-indicator" aria-live="polite" aria-label={language === "ar" ? "الفصل الحالي" : "Current chapter"}>
      <span dir="ltr">{formatMobileChapterNumber(activeChapterIndex + 1, language)}</span>
      <strong dir={getMobileTextDirection(title)}>
        <bdi>{title}</bdi>
      </strong>
    </aside>
  );
}

export function MobileChapterMenuIndex() {
  return null;
}
