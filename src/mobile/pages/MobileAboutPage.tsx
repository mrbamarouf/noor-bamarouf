import { LogoAsset } from "../../components/LogoAsset";
import { useLanguage } from "../../context/LanguageContext";
import { aboutSharedContent } from "../../data/aboutContent";
import { getProjectImageByAsset } from "../../data/projectPresentation";
import { projects } from "../../data/projects";
import { makeMobileChapters, MobileChapterController, MobileChapterSection, localizeMobileDigits } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileCtaLink, MobilePageCopy } from "../MobilePrimitives";
import { MobileVisual } from "../MobileVisual";
import { mobileAboutCopy } from "../mobileCopy";

function requireAboutProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing mobile About visual project: ${slug}`);
  return project;
}

const mobileAboutVisuals = {
  entry: { project: requireAboutProject("matcha"), asset: "hero" as const, fit: "cover" as const },
  thesis: { project: requireAboutProject("wello"), asset: "cover" as const, fit: "contain" as const },
  philosophy: { project: requireAboutProject("rahaba-space"), asset: "gallery-8" as const, fit: "cover" as const },
};

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
  const shared = aboutSharedContent[language];
  const principleGroups = [shared.principles.items.slice(0, 3), shared.principles.items.slice(3)];

  return (
    <MobileChapterController chapters={chapters} className={`m-about m-about--${language}`}>
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-about-entry">
        <MobilePageCopy label={copy.entryLabel} title={copy.entryTitle} body={copy.entryBody} titleId={`${chapters[0].id}-title`}>
          <MobileCtaLink className="m-text-link" to="/work">{copy.entryLink} <MobileArrow /></MobileCtaLink>
        </MobilePageCopy>
        <div className="m-about-entry__art">
          <MobileVisual
            project={mobileAboutVisuals.entry.project}
            image={getProjectImageByAsset(mobileAboutVisuals.entry.project, mobileAboutVisuals.entry.asset)}
            asset={mobileAboutVisuals.entry.asset}
            fit={mobileAboutVisuals.entry.fit}
            loading="eager"
          />
          <LogoAsset className="m-about-entry__mark" variant="hero" priority />
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-about-thesis">
        <MobilePageCopy title={copy.thesis} body={copy.thesisNote} titleId={`${chapters[1].id}-title`} />
        <MobileVisual
          className="m-about-thesis__visual"
          project={mobileAboutVisuals.thesis.project}
          image={getProjectImageByAsset(mobileAboutVisuals.thesis.project, mobileAboutVisuals.thesis.asset)}
          asset={mobileAboutVisuals.thesis.asset}
          fit={mobileAboutVisuals.thesis.fit}
        />
        <ol className="m-observations">
          {copy.observations.map((item, index) => <li key={item}><span dir="ltr">0{index + 1}</span><p>{item}</p></li>)}
        </ol>
      </MobileChapterSection>

      {principleGroups.map((group, groupIndex) => (
        <MobileChapterSection key={groupIndex} chapter={chapters[2 + groupIndex]} index={2 + groupIndex} total={chapters.length} className={`m-about-principles m-about-principles--${groupIndex + 1}`}>
          <MobilePageCopy title={shared.principles.title} titleId={`${chapters[2 + groupIndex].id}-title`} />
          <div className="m-principles">
            {group.map((item, index) => (
              <article key={item.title}>
                <span dir="ltr">{localizeMobileDigits(String(index + 1 + groupIndex * 3).padStart(2, "0"), language)}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
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
        <span className="m-about-understanding__phrase" aria-hidden="true">{shared.philosophy.visualPhrase}</span>
        <MobileVisual
          className="m-about-understanding__visual"
          project={mobileAboutVisuals.philosophy.project}
          image={getProjectImageByAsset(mobileAboutVisuals.philosophy.project, mobileAboutVisuals.philosophy.asset)}
          asset={mobileAboutVisuals.philosophy.asset}
          fit={mobileAboutVisuals.philosophy.fit}
        />
        <MobilePageCopy title={shared.philosophy.title} body={shared.philosophy.body} titleId={`${chapters[5].id}-title`} />
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
