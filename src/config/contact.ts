import type { Language } from "../types";

export const contactDetails = {
  email: "Noor.bamarouf0@gmail.com",
  emailDisplay: "Noor.bamarouf0@gmail.com",
  whatsappNumber: "966505805234",
  whatsappDisplay: "+966 50 580 5234",
  whatsappUrl: "https://wa.me/966505805234",
  aria: {
    whatsapp: {
      en: "Contact Noor Bamarouf on WhatsApp at +966 50 580 5234",
      ar: "التواصل مع نور بامعروف عبر واتساب على الرقم +966 50 580 5234",
    },
    email: {
      en: "Email Noor Bamarouf at Noor.bamarouf0@gmail.com",
      ar: "مراسلة نور بامعروف عبر البريد الإلكتروني Noor.bamarouf0@gmail.com",
    },
  },
} as const;

export function getWhatsAppHref(language: Language) {
  void language;
  return contactDetails.whatsappUrl;
}

export function getEmailHref(language: Language) {
  void language;
  return `mailto:${contactDetails.email}`;
}
