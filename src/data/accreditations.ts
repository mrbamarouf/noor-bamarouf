import type { Language, LocalizedString } from "../types";

export const accreditationsPath = "/accreditations";

export interface AccreditationItem {
  id: string;
  number: string;
  title: LocalizedString;
  issuerLabel: LocalizedString;
  issuer: LocalizedString;
  detailLabel: LocalizedString;
  detail: LocalizedString;
  issueLabel: LocalizedString;
  issueDate: LocalizedString;
  expiryLabel: LocalizedString;
  expiryDate: LocalizedString;
  previewSrc: string;
  pdfHref: string;
  action: LocalizedString;
  alt: LocalizedString;
}

export const accreditationCopy: Record<
  Language,
  {
    metaTitle: string;
    navTitle: string;
    title: string;
    intro: string;
    label: string;
    credibilityTitle: string;
    credibilityBody: string;
    footerReference: string;
    closingTitle: string;
    closingBody: string;
    openHint: string;
  }
> = {
  en: {
    metaTitle: "Official Accreditations | Noor Bamarouf",
    navTitle: "Accreditations",
    title: "Official Accreditations",
    intro:
      "Official certificates supporting Noor Bamarouf’s professional practice in graphic design and visual communication.",
    label: "Registered Practice",
    credibilityTitle: "Officially Registered Graphic Designer",
    credibilityBody: "Freelancing Practitioner & Productive Family Certificates",
    footerReference: "Officially registered for graphic design practice in Saudi Arabia.",
    closingTitle: "Professional practice, documented with care.",
    closingBody:
      "These accreditations support Noor’s independent design practice and can be reviewed through the privacy-safe certificate copies.",
    openHint: "The certificate opens in a new tab.",
  },
  ar: {
    metaTitle: "الاعتمادات الرسمية | نور بامعروف",
    navTitle: "الاعتمادات",
    title: "الاعتمادات الرسمية",
    intro: "وثائق رسمية تدعم ممارسة نور بامعروف المهنية في مجال التصميم الجرافيكي والاتصال البصري.",
    label: "ممارسة موثقة",
    credibilityTitle: "مصممة جرافيك مسجلة رسميًا",
    credibilityBody: "وثيقة عمل حر وشهادة أسرة منتجة",
    footerReference: "مسجلة رسميًا لممارسة نشاط التصميم الجرافيكي في المملكة العربية السعودية.",
    closingTitle: "ممارسة مهنية موثقة بعناية.",
    closingBody: "تدعم هذه الاعتمادات ممارسة نور المستقلة في التصميم، ويمكن مراجعتها من خلال نسخ آمنة للعرض.",
    openHint: "تفتح الشهادة في تبويب جديد.",
  },
};

export const accreditations: AccreditationItem[] = [
  {
    id: "freelancing-practitioner",
    number: "01",
    title: {
      en: "Freelancing Practitioner Certificate",
      ar: "وثيقة ممارس حر",
    },
    issuerLabel: {
      en: "Issuer",
      ar: "الجهة المصدرة",
    },
    issuer: {
      en: "Ministry of Human Resources and Social Development",
      ar: "وزارة الموارد البشرية والتنمية الاجتماعية",
    },
    detailLabel: {
      en: "Speciality",
      ar: "التخصص",
    },
    detail: {
      en: "Graphic Designer",
      ar: "مصمم جرافيكس",
    },
    issueLabel: {
      en: "Issue date",
      ar: "تاريخ الإصدار",
    },
    issueDate: {
      en: "24 July 2026",
      ar: "24 يوليو 2026",
    },
    expiryLabel: {
      en: "Expiry date",
      ar: "تاريخ الانتهاء",
    },
    expiryDate: {
      en: "24 July 2027",
      ar: "24 يوليو 2027",
    },
    previewSrc: "/official-accreditation-assets/noor-freelance-certificate-preview.png",
    pdfHref: "/official-accreditation-assets/noor-freelance-certificate.pdf",
    action: {
      en: "View Certificate",
      ar: "عرض الوثيقة",
    },
    alt: {
      en: "Privacy-safe preview of Noor Bamarouf’s freelancing practitioner certificate",
      ar: "معاينة آمنة لوثيقة ممارس حر الخاصة بنور بامعروف",
    },
  },
  {
    id: "productive-family",
    number: "02",
    title: {
      en: "Productive Family Certificate",
      ar: "شهادة أسرة منتجة",
    },
    issuerLabel: {
      en: "Issuer",
      ar: "الجهة المصدرة",
    },
    issuer: {
      en: "Social Development Bank / National Productive Families Platform",
      ar: "بنك التنمية الاجتماعية / المنصة الوطنية للأسر المنتجة",
    },
    detailLabel: {
      en: "Activity",
      ar: "النشاط",
    },
    detail: {
      en: "Graphic Design Services",
      ar: "خدمات التصميم: تصميم الجرافيكس",
    },
    issueLabel: {
      en: "Issue date",
      ar: "تاريخ الإصدار",
    },
    issueDate: {
      en: "24 July 2026",
      ar: "24 يوليو 2026",
    },
    expiryLabel: {
      en: "Valid until",
      ar: "صالحة حتى",
    },
    expiryDate: {
      en: "24 July 2029",
      ar: "24 يوليو 2029",
    },
    previewSrc: "/official-accreditation-assets/noor-productive-family-certificate-preview.png",
    pdfHref: "/official-accreditation-assets/noor-productive-family-certificate.pdf",
    action: {
      en: "View Certificate",
      ar: "عرض الشهادة",
    },
    alt: {
      en: "Privacy-safe preview of Noor Bamarouf’s productive family certificate",
      ar: "معاينة آمنة لشهادة أسرة منتجة الخاصة بنور بامعروف",
    },
  },
];
