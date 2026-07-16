import type { Language } from "../types";

// TEMPORARY CONTACT DETAILS — replace with client-approved information before final launch.
export const contactDetails = {
  email: "hello@noorbamarouf.com",
  whatsappDisplay: "+966 50 000 0000",
  whatsappUrl: "https://wa.me/966500000000",
} as const;

const whatsappMessages: Record<Language, string> = {
  en: "Hello Nour, I would like to discuss a design project.",
  ar: "مرحبًا نور، أرغب في مناقشة مشروع تصميم.",
};

const emailSubjects: Record<Language, string> = {
  en: "Project inquiry — Nour Bamarouf",
  ar: "استفسار عن مشروع — نور بامعروف",
};

export function getWhatsAppHref(language: Language) {
  return `${contactDetails.whatsappUrl}?text=${encodeURIComponent(whatsappMessages[language])}`;
}

export function getEmailHref(language: Language) {
  const params = new URLSearchParams({ subject: emailSubjects[language] });
  return `mailto:${contactDetails.email}?${params.toString()}`;
}
