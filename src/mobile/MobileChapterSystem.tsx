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

export function getMobileChapterAnchor(index: number) {
  return `chapter-${String(index + 1).padStart(2, "0")}`;
}

function localized(en: string, ar: string): LocalizedString {
  return { en, ar };
}

export function makeMobileChapters(titles: Array<LocalizedString | [string, string]>): MobileChapterDefinition[] {
  return titles.map((title, index) => ({
    id: getMobileChapterAnchor(index),
    title: Array.isArray(title) ? localized(title[0], title[1]) : title,
  }));
}

function textDirection(value: string) {
  return /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
}

function snapToChapter(root: HTMLElement, target: HTMLElement, behavior: ScrollBehavior = "auto") {
  root.scrollTo({ top: target.offsetTop, behavior });
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
  const activeRef = useRef(activeChapterId);

  useEffect(() => {
    activeRef.current = activeChapterId;
  }, [activeChapterId]);

  useEffect(() => {
    setChapters(chapters);
    return () => setChapters([]);
  }, [chapters, setChapters]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const nodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const rootTop = root.getBoundingClientRect().top;
      const closest = nodes
        .map((node) => ({ id: node.id, distance: Math.abs(node.getBoundingClientRect().top - rootTop) }))
        .sort((a, b) => a.distance - b.distance)[0];
      if (closest) setActiveChapterId(closest.id);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveChapterId(visible.target.id);
      },
      { root, threshold: [0.52, 0.68, 0.84] },
    );

    nodes.forEach((node) => observer.observe(node));
    root.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    updateActive();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [chapters, setActiveChapterId]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const id = location.hash.replace("#", "");
    const first = chapters[0] ? document.getElementById(chapters[0].id) : null;
    const target = id && chapters.some((chapter) => chapter.id === id) ? document.getElementById(id) : first;

    window.requestAnimationFrame(() => {
      if (!target) return;
      snapToChapter(root, target);
      setActiveChapterId(target.id);
      window.setTimeout(() => snapToChapter(root, target), 80);
    });
  }, [chapters, location.pathname, location.hash, setActiveChapterId]);

  useEffect(() => {
    const root = scrollerRef.current;
    const current = activeRef.current;
    if (!root || !current) return;

    window.requestAnimationFrame(() => {
      const target = document.getElementById(current);
      if (!target) return;
      snapToChapter(root, target);
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
        <strong dir={textDirection(title)}>
          <bdi>{title}</bdi>
        </strong>
      </p>
      <div className="m-chapter__body">{children}</div>
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
      <strong dir={textDirection(title)}>
        <bdi>{title}</bdi>
      </strong>
    </aside>
  );
}
