import type { Language } from "../types";

export const contactDetails = {
  email: "hello@noorbamarouf.com",
  whatsappDisplay: "WhatsApp",
  whatsappUrl: "https://wa.me/",
} as const;

const whatsappMessages: Record<Language, string> = {
  en: "Hello Noor, I would like to discuss a design project.",
  ar: "مرحبًا نور، أرغب في مناقشة مشروع تصميم.",
};

const emailSubjects: Record<Language, string> = {
  en: "Project inquiry: Noor Bamarouf",
  ar: "استفسار عن مشروع: نور بامعروف",
};

export function getWhatsAppHref(language: Language) {
  return `${contactDetails.whatsappUrl}?text=${encodeURIComponent(whatsappMessages[language])}`;
}

export function getEmailHref(language: Language) {
  const params = new URLSearchParams({ subject: emailSubjects[language] });
  return `mailto:${contactDetails.email}?${params.toString()}`;
}
