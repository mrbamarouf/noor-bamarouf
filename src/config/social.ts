import type { Language } from "../types";

export type StudioSocialPlatform = "instagram" | "tiktok";

export interface StudioSocialLink {
  platform: StudioSocialPlatform;
  href: string;
  label: Record<Language, string>;
  ariaLabel: Record<Language, string>;
}

export const studioSocialHeading: Record<Language, string> = {
  en: "Follow BAMAROUF STUDIO",
  ar: "تابع بامعروف استديو",
};

export const studioSocialLinks: StudioSocialLink[] = [
  {
    platform: "instagram",
    href: "https://www.instagram.com/bamaroufstudio?igsh=MWs0dW0ybzZrMmE4Mw==",
    label: {
      en: "Instagram",
      ar: "إنستغرام",
    },
    ariaLabel: {
      en: "Open BAMAROUF STUDIO on Instagram",
      ar: "فتح حساب بامعروف استديو على إنستغرام",
    },
  },
  {
    platform: "tiktok",
    href: "https://www.tiktok.com/@bamaroufstudio?_r=1&_t=ZS-98H5HT7bxqf",
    label: {
      en: "TikTok",
      ar: "تيك توك",
    },
    ariaLabel: {
      en: "Open BAMAROUF STUDIO on TikTok",
      ar: "فتح حساب بامعروف استديو على تيك توك",
    },
  },
];
