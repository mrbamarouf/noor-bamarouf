import { getEmailHref, getWhatsAppHref } from "../../config/contact";
import { useLanguage } from "../../context/LanguageContext";
import { MobileChapterController, MobileChapterSection, type MobileChapterDefinition } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";

const chapters: MobileChapterDefinition[] = [
  { id: "chapter-01", title: { en: "Contact", ar: "التواصل" } },
  { id: "chapter-02", title: { en: "Begin", ar: "البدء" } },
];

export function MobileContactPage() {
  const { dictionary, language } = useLanguage();
  const total = chapters.length;

  return (
    <MobileChapterController chapters={chapters} className="m-contact-page">
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-contact-opening">
        <div className="m-chapter-copy">
          <p>{dictionary.nav.contact}</p>
          <h1 id={`${chapters[0].id}-title`}>{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
        </div>
        <div className="m-contact-actions">
          <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
            {dictionary.actions.contactByWhatsApp}
          </a>
          <a href={getEmailHref(language)}>{dictionary.actions.sendEmail}</a>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={total} className="m-global-end">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[1].id}-title`}>{dictionary.contactPage.methodTitle}</h2>
          <p>{dictionary.contactPage.methodBody}</p>
        </div>
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
