import { Link } from "react-router-dom";
import { accreditationCopy, accreditations } from "../../data/accreditations";
import { useLanguage } from "../../context/LanguageContext";
import { makeMobileChapters, MobileChapterController, MobileChapterSection } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileArrow, MobileExternalCta, MobilePageCopy } from "../MobilePrimitives";

const chapters = makeMobileChapters([
  ["Accreditations", "الاعتمادات"],
  ["Certificate 01", "الشهادة ٠١"],
  ["Details 01", "تفاصيل ٠١"],
  ["Certificate 02", "الشهادة ٠٢"],
  ["Details 02", "تفاصيل ٠٢"],
  ["Footer", "التذييل"],
]);

function MobileAccreditationDetails({ item }: { item: (typeof accreditations)[number] }) {
  const { language } = useLanguage();
  const details = [
    [item.issuerLabel[language], item.issuer[language]],
    [item.detailLabel[language], item.detail[language]],
    [item.issueLabel[language], item.issueDate[language]],
    [item.expiryLabel[language], item.expiryDate[language]],
  ];

  return (
    <dl className="m-accreditation-details">
      {details.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MobileAccreditationsPage() {
  const { language } = useLanguage();
  const copy = accreditationCopy[language];
  const first = accreditations[0];
  const second = accreditations[1];

  if (!first || !second) return null;

  return (
    <MobileChapterController chapters={chapters} className="m-accreditations">
      <MobileChapterSection chapter={chapters[0]} index={0} total={chapters.length} className="m-accreditations-hero">
        <MobilePageCopy label={copy.label} title={copy.title} body={copy.intro} titleId={`${chapters[0].id}-title`}>
          <Link className="m-text-link" to="#chapter-02">
            {copy.credibilityTitle} <MobileArrow />
          </Link>
        </MobilePageCopy>
        <div className="m-accreditations-hero__seal" aria-hidden="true">
          <span>{copy.credibilityBody}</span>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={chapters.length} className="m-accreditation-document-page">
        <MobilePageCopy label={first.number} title={first.title[language]} titleId={`${chapters[1].id}-title`} />
        <a className="m-accreditation-document" href={first.pdfHref} target="_blank" rel="noopener noreferrer" aria-label={`${first.action[language]}: ${first.title[language]}`}>
          <img src={first.previewSrc} alt={first.alt[language]} />
        </a>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={chapters.length} className="m-accreditation-details-page">
        <MobilePageCopy label={copy.label} title={first.title[language]} body={copy.openHint} titleId={`${chapters[2].id}-title`}>
          <MobileAccreditationDetails item={first} />
          <MobileExternalCta href={first.pdfHref} target="_blank" rel="noopener noreferrer">
            {first.action[language]} <MobileArrow />
          </MobileExternalCta>
        </MobilePageCopy>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={chapters.length} className="m-accreditation-document-page m-accreditation-document-page--wide">
        <MobilePageCopy label={second.number} title={second.title[language]} titleId={`${chapters[3].id}-title`} />
        <a className="m-accreditation-document" href={second.pdfHref} target="_blank" rel="noopener noreferrer" aria-label={`${second.action[language]}: ${second.title[language]}`}>
          <img src={second.previewSrc} alt={second.alt[language]} />
        </a>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[4]} index={4} total={chapters.length} className="m-accreditation-details-page">
        <MobilePageCopy label={copy.label} title={second.title[language]} body={copy.openHint} titleId={`${chapters[4].id}-title`}>
          <MobileAccreditationDetails item={second} />
          <MobileExternalCta href={second.pdfHref} target="_blank" rel="noopener noreferrer">
            {second.action[language]} <MobileArrow />
          </MobileExternalCta>
        </MobilePageCopy>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[5]} index={5} total={chapters.length} className="m-footer-page">
        <MobilePageCopy label={copy.label} title={copy.closingTitle} body={copy.footerReference} titleId={`${chapters[5].id}-title`} />
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
