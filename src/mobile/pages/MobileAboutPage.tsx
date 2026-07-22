import { LogoAsset } from "../../components/LogoAsset";
import { useLanguage } from "../../context/LanguageContext";
import { makeMobileChapters, MobileChapterController, MobileChapterSection, localizeMobileDigits } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink, MobilePageCopy } from "../MobilePrimitives";
import { mobileAboutCopy } from "../mobileCopy";

const chapters = makeMobileChapters([
  ["About Noor", "عن نور"],
  ["Point of view", "وجهة النظر"],
  ["Principles", "المبادئ"],
  ["Principles", "المبادئ"],
  ["Working rhythm", "إيقاع العمل"],
  ["Understanding", "الفهم"],
  ["Selected work", "الأعمال المختارة"],
  ["Footer", "التذييل"],
]);

export function MobileAboutPage() {
  const { language } = useLanguage();
  const copy = mobileAboutCopy[language];
  const principleGroups = [copy.materials.slice(0, 3), copy.materials.slice(3)];

  return (
    <MobileChapterController chapters={chapters} className={`m-about m-about--${language}`}>
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-about-entry">
        <MobilePageCopy label={copy.entryLabel} title={copy.entryTitle} body={copy.entryBody} titleId={`${chapters[0].id}-title`}>
          <MobileCtaLink className="m-text-link" to="/work">{copy.entryLink} <MobileArrow /></MobileCtaLink>
        </MobilePageCopy>
        <LogoAsset className="m-about-entry__mark" variant="hero" priority />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-about-thesis">
        <MobilePageCopy title={copy.thesis} body={copy.thesisNote} titleId={`${chapters[1].id}-title`} />
        <ol className="m-observations">
          {copy.observations.map((item, index) => <li key={item}><span dir="ltr">0{index + 1}</span><p>{item}</p></li>)}
        </ol>
      </MobileChapterSection>

      {principleGroups.map((group, groupIndex) => (
        <MobileChapterSection key={groupIndex} chapter={chapters[2 + groupIndex]} index={2 + groupIndex} total={chapters.length} className={`m-about-principles m-about-principles--${groupIndex + 1}`}>
          <MobilePageCopy title={copy.materialTitle} titleId={`${chapters[2 + groupIndex].id}-title`} />
          <div className="m-principles">
            {group.map(([title, body], index) => (
              <article key={title}>
                <span dir="ltr">{localizeMobileDigits(String(index + 1 + groupIndex * 3).padStart(2, "0"), language)}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </MobileChapterSection>
      ))}

      <MobileChapterSection chapter={chapters[4]} index={4} total={chapters.length} className="m-about-rhythm">
        <div className="m-about-rhythm__words" aria-hidden="true">{copy.rhythmWords.map((word) => <span key={word}>{word}</span>)}</div>
        <MobilePageCopy title={copy.rhythmTitle} titleId={`${chapters[4].id}-title`} />
        <ol className="m-rhythm-list">
          {copy.rhythm.map(([title, body], index) => (
            <li key={title}><span dir="ltr">0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>
          ))}
        </ol>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[5]} index={5} total={chapters.length} className="m-about-understanding">
        <span className="m-about-understanding__word" aria-hidden="true">{language === "ar" ? "الغاية" : "purpose"}</span>
        <MobilePageCopy title={copy.understandingTitle} body={copy.understandingBody} titleId={`${chapters[5].id}-title`} />
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[6]} index={6} total={chapters.length} className="m-about-closing">
        <LogoAsset className="m-about-closing__mark" variant="hero" />
        <MobilePageCopy title={copy.closing} titleId={`${chapters[6].id}-title`}>
          <MobileCtaLink to="/work">{copy.closingLink} <MobileArrow /></MobileCtaLink>
        </MobilePageCopy>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[7]} index={7} total={chapters.length} className="m-footer-page">
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
