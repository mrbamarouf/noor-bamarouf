import { DecorativeNbLogo } from "../../components/DecorativeNbLogo";
import { useLanguage } from "../../context/LanguageContext";
import { makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink } from "../MobilePrimitives";
import { mobileAboutCopy } from "../mobileCopy";

const aboutChapters = makeMobileChapters([
  ["About Noor", "عن نور"],
  ["Point of View", "وجهة النظر"],
  ["Materials", "الخامات"],
  ["Working Rhythm", "إيقاع العمل"],
  ["Bilingual Design", "تصميم ثنائي اللغة"],
  ["Closing", "الخاتمة"],
  ["Footer", "التذييل"],
]);

export function MobileAboutPage() {
  const { direction, language } = useLanguage();
  const copy = mobileAboutCopy[language];
  const total = aboutChapters.length;

  return (
    <MobileChapterController chapters={aboutChapters} className="m-about-page">
      <MobileChapterSection chapter={aboutChapters[0]} index={0} total={total} className="m-about-entry">
        <div className="m-section-copy">
          <span>{copy.entryLabel}</span>
          <h1 id={`${aboutChapters[0].id}-title`}>{copy.entryTitle}</h1>
          <p>{copy.entryBody}</p>
          <MobileCtaLink to="/work">
            {copy.entryLink} <MobileArrow />
          </MobileCtaLink>
        </div>
        <DecorativeNbLogo className="m-about-entry__mark" priority />
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[1]} index={1} total={total} className="m-about-thesis">
        <div className="m-section-copy m-section-copy--large">
          <span>{copy.entryLabel}</span>
          <h2 id={`${aboutChapters[1].id}-title`}>{copy.thesis}</h2>
          <p>{copy.thesisNote}</p>
        </div>
        <ul className="m-observation-list">
          {copy.observations.map((observation) => (
            <li key={observation}>{observation}</li>
          ))}
        </ul>
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[2]} index={2} total={total} className="m-about-materials">
        <div className="m-section-copy">
          <span>{language === "ar" ? "تفاصيل محسوسة" : "Tactile Detail"}</span>
          <h2 id={`${aboutChapters[2].id}-title`}>{copy.materialTitle}</h2>
        </div>
        <div className="m-material-rail">
          {copy.materials.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[3]} index={3} total={total} className="m-about-rhythm">
        <div className="m-rhythm-words" aria-hidden="true">
          {copy.rhythmWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
        <div className="m-section-copy">
          <span>{language === "ar" ? "منهجية" : "Approach"}</span>
          <h2 id={`${aboutChapters[3].id}-title`}>{copy.rhythmTitle}</h2>
        </div>
        <ol className="m-process-list m-process-list--compact">
          {copy.rhythm.map(([title, text], index) => (
            <li key={title}>
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[4]} index={4} total={total} className="m-about-bilingual">
        <div className="m-language-pair" aria-hidden="true">
          <span>{copy.sampleOne}</span>
          <span>{copy.sampleTwo}</span>
        </div>
        <div className="m-section-copy">
          <span>{language === "ar" ? "إيقاع اللغة" : "Language Rhythm"}</span>
          <h2 id={`${aboutChapters[4].id}-title`}>{copy.bilingualTitle}</h2>
          <p>{copy.bilingualBody}</p>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[5]} index={5} total={total} className="m-about-closing">
        <div className="m-section-copy m-section-copy--center">
          <h2 id={`${aboutChapters[5].id}-title`}>{copy.closing}</h2>
          <MobileCtaLink to="/work">
            {copy.closingLink}
            <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>
          </MobileCtaLink>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={aboutChapters[6]} index={6} total={total} className="m-footer-chapter">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
