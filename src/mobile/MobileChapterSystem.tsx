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

export function makeMobileChapters(titles: Array<LocalizedString | [string, string]>): MobileChapterDefinition[] {
  return titles.map((title, index) => ({
    id: getMobileChapterAnchor(index),
    title: Array.isArray(title) ? { en: title[0], ar: title[1] } : title,
  }));
}

export function MobileChapterProvider({ children }: { children: ReactNode }) {
  const [chapters, updateChapters] = useState<MobileChapterDefinition[]>([]);
  const [activeChapterId, updateActiveChapterId] = useState("");

  const setChapters = useCallback((next: MobileChapterDefinition[]) => {
    updateChapters(next);
    updateActiveChapterId((current) => (next.some((chapter) => chapter.id === current) ? current : next[0]?.id ?? ""));
  }, []);

  const setActiveChapterId = useCallback((id: string) => {
    updateActiveChapterId((current) => (current === id ? current : id));
  }, []);

  const activeChapterIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapterId));
  const value = useMemo(
    () => ({ chapters, activeChapterId, activeChapterIndex, setChapters, setActiveChapterId }),
    [activeChapterId, activeChapterIndex, chapters, setActiveChapterId, setChapters],
  );

  return <MobileChapterContext.Provider value={value}>{children}</MobileChapterContext.Provider>;
}

export function useMobileChapterContext() {
  const context = useContext(MobileChapterContext);
  if (!context) throw new Error("useMobileChapterContext must be used within MobileChapterProvider");
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
  const location = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { activeChapterId, setActiveChapterId, setChapters } = useMobileChapterContext();

  useEffect(() => {
    setChapters(chapters);
    return () => setChapters([]);
  }, [chapters, setChapters]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || !chapters.length) return;

    const nodes = chapters
      .map((chapter) => root.querySelector<HTMLElement>(`#${chapter.id}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const requested = location.hash.replace("#", "");
    const initialId = [requested, chapters[0].id].find((id) => chapters.some((chapter) => chapter.id === id));
    const initial = nodes.find((node) => node.id === initialId) ?? nodes[0];

    root.style.scrollBehavior = "auto";
    root.scrollTop = initial.offsetTop;
    const restoreScrollBehavior = window.requestAnimationFrame(() => {
      root.style.removeProperty("scroll-behavior");
    });
    setActiveChapterId(initial.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current?.target.id) return;
        setActiveChapterId(current.target.id);
      },
      { root, threshold: [0.55, 0.7, 0.9] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      window.cancelAnimationFrame(restoreScrollBehavior);
      root.style.removeProperty("scroll-behavior");
      observer.disconnect();
    };
  }, [chapters, location.hash, location.pathname, setActiveChapterId]);

  useEffect(() => {
    if (!activeChapterId || !chapters.some((chapter) => chapter.id === activeChapterId)) return;
    const nextUrl = `${location.pathname}${location.search}#${activeChapterId}`;
    if (`${location.pathname}${location.search}${location.hash}` !== nextUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }, [activeChapterId, chapters, location.hash, location.pathname, location.search]);

  return (
    <div ref={scrollerRef} className={`m-book ${className}`} data-mobile-scroller>
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

  return (
    <section
      id={chapter.id}
      className={`m-page ${className}`}
      data-mobile-chapter
      data-chapter-index={index + 1}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="m-page__folio" aria-label={`${index + 1} of ${total}`}>
        <span dir="ltr">{formatMobileChapterNumber(index + 1, language)}</span>
        <i aria-hidden="true" />
        <span dir="ltr">{formatMobileChapterNumber(total, language)}</span>
      </div>
      <div className="m-page__content">{children}</div>
    </section>
  );
}
