import { studioSocialHeading, studioSocialLinks, type StudioSocialPlatform } from "../config/social";
import type { Language } from "../types";

interface StudioSocialLinksProps {
  language: Language;
  variant: "footer" | "menu";
}

function SocialIcon({ platform }: { platform: StudioSocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.7" cy="7.4" r="0.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M13.7 4v9.2a4.5 4.5 0 1 1-4.5-4.5" />
      <path d="M13.7 4c.7 2.7 2.4 4.3 5.1 4.6" />
    </svg>
  );
}

export function StudioSocialLinks({ language, variant }: StudioSocialLinksProps) {
  return (
    <div className={`studio-social-links studio-social-links--${variant}`} role="group" aria-label={studioSocialHeading[language]}>
      <span className="studio-social-links__label">{studioSocialHeading[language]}</span>
      <div className="studio-social-links__items">
        {studioSocialLinks.map((link) => (
          <a
            key={link.platform}
            className="studio-social-links__link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel[language]}
          >
            <SocialIcon platform={link.platform} />
            <span>{link.label[language]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
