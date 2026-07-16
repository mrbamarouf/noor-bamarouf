import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, languageMeta } from "../data/content";
import type { Language } from "../types";

interface LanguageContextValue {
  language: Language;
  direction: "ltr" | "rtl";
  dictionary: (typeof copy)[Language];
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem("noor-language");
  if (stored === "ar" || stored === "en") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem("noor-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = languageMeta[language].dir;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    updateLanguage(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    updateLanguage((current) => (current === "en" ? "ar" : "en"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction: languageMeta[language].dir,
      dictionary: copy[language],
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
