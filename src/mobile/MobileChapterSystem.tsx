import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Link, useLocation } from "react-router-dom";
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

function localizeDigits(value: string, language: Language) {
  if (language !== "ar") return value;
  return value.replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
}

export function formatMobileChapterNumber(value: number, language: Language) {
  return localizeDigits(String(value).padStart(2, "0"), language);
}

export function formatMobileChapterFraction(index: number, total: number, language: Language) {
  const current = formatMobileChapterNumber(index + 1, language);
  const count = formatMobileChapterNumber(total, language);
  return `${current} / ${count}`;
}

function MobileChapterCount({ index, total, language }: { index: number; total: number; language: Language }) {
  return (
    <span
      className="noor-mobile-chapter__count"
      dir="ltr"
      aria-label={formatMobileChapterFraction(index, total, language)}
    >
      <span>{formatMobileChapterNumber(index + 1, language)}</span>
      <span aria-hidden="true">/</span>
      <span>{formatMobileChapterNumber(total, language)}</span>
    </span>
  );
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
    () => ({
      chapters,
      activeChapterId,
      activeChapterIndex,
      setChapters,
      setActiveChapterId,
    }),
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
  children,
}: {
  chapters: MobileChapterDefinition[];
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const location = useLocation();
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
    let frame = 0;

    const updateActiveChapter = () => {
      frame = 0;
      const headerOffset = 92;
      const candidates = chapters
        .map((chapter) => {
          const node = document.getElementById(chapter.id);
          if (!node) return null;
          const rect = node.getBoundingClientRect();
          return {
            id: chapter.id,
            distance: Math.abs(rect.top - headerOffset),
            isReadable: rect.bottom > headerOffset && rect.top < window.innerHeight * 0.78,
          };
        })
        .filter((entry): entry is { id: string; distance: number; isReadable: boolean } => Boolean(entry));

      const visible = candidates.filter((entry) => entry.isReadable);
      const nearest = (visible.length ? visible : candidates).sort((a, b) => a.distance - b.distance)[0];
      if (nearest) setActiveChapterId(nearest.id);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveChapter);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [chapters, setActiveChapterId]);

  useEffect(() => {
    const current = activeChapterRef.current;
    if (!current) return;
    window.requestAnimationFrame(() => {
      document.getElementById(current)?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }, [language]);

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id || !chapters.some((chapter) => chapter.id === id)) return;

    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
      setActiveChapterId(id);
    });
  }, [chapters, location.hash, setActiveChapterId]);

  return <>{children}</>;
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
      className={`noor-mobile-chapter ${className}`}
      data-mobile-chapter
      data-chapter-index={index + 1}
      aria-labelledby={`${chapter.id}-title`}
    >
      <p className="noor-mobile-chapter__eyebrow">
        <MobileChapterCount index={index} total={total} language={language} />
        <span>{chapter.title[language]}</span>
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
  const progress = `${((activeChapterIndex + 1) / chapters.length) * 100}%`;

  return (
    <aside
      className="noor-mobile-chapter-indicator"
      aria-live="polite"
      aria-label={language === "ar" ? "الفصل الحالي" : "Current chapter"}
    >
      <MobileChapterCount index={activeChapterIndex} total={chapters.length} language={language} />
      <strong>{activeChapter.title[language]}</strong>
      <i style={{ "--noor-mobile-progress": progress } as CSSProperties} aria-hidden="true" />
    </aside>
  );
}

export function MobileChapterMenuIndex({ onNavigate }: { onNavigate: () => void }) {
  const { language } = useLanguage();
  const location = useLocation();
  const { activeChapterId, activeChapterIndex, chapters } = useMobileChapterContext();

  if (!chapters.length) return null;

  return (
    <nav className="noor-mobile-menu-chapters" aria-label={language === "ar" ? "فصول الصفحة" : "Page chapters"}>
      <p>
        <span>{language === "ar" ? "فصول الصفحة" : "Page chapters"}</span>
        <MobileChapterCount index={activeChapterIndex} total={chapters.length} language={language} />
      </p>
      {chapters.map((chapter, index) => (
        <Link
          key={chapter.id}
          to={`${location.pathname}#${chapter.id}`}
          className={activeChapterId === chapter.id ? "is-active" : ""}
          onClick={onNavigate}
        >
          <span dir="ltr">{formatMobileChapterNumber(index + 1, language)}</span>
          <strong>{chapter.title[language]}</strong>
        </Link>
      ))}
    </nav>
  );
}
