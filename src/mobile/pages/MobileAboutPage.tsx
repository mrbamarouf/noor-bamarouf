import { LogoAsset } from "../../components/LogoAsset";
import { useLanguage } from "../../context/LanguageContext";
import { MobileChapterController, MobileChapterSection, type MobileChapterDefinition } from "../MobileChapterSystem";
import { MobileFooter } from "../MobileFooter";
import { MobileTextLink } from "../MobilePrimitives";

const chapters: MobileChapterDefinition[] = [
  { id: "chapter-01", title: { en: "Noor", ar: "نور" } },
  { id: "chapter-02", title: { en: "Point of view", ar: "وجهة النظر" } },
  { id: "chapter-03", title: { en: "Values", ar: "القيم" } },
  { id: "chapter-04", title: { en: "Begin", ar: "البدء" } },
];

const aboutText = {
  en: {
    opening: "A designer’s eye for quiet detail.",
    body: "Noor Bamarouf creates identities, visual systems, print, packaging, and editorial experiences with a calm, detail-led approach.",
    philosophy: "The work begins with listening, then moves through references, materials, type, color, and composition until the visual language feels clear.",
    values: "Principles behind the work.",
    invite: "Share a project note when the idea needs a visual language with restraint, softness, and precision.",
  },
  ar: {
    opening: "عين مصممة للتفاصيل الهادئة.",
    body: "تصمم نور بامعروف هويات وأنظمة بصرية ومطبوعات وتجارب تغليف وتحرير بأسلوب هادئ يهتم بالتفاصيل.",
    philosophy: "يبدأ العمل بالاستماع، ثم ينتقل عبر المراجع والمواد والخطوط واللون والتكوين، حتى تصبح اللغة البصرية واضحة.",
    values: "المبادئ التي تقود العمل.",
    invite: "شاركي ملاحظة عن المشروع عندما تحتاج الفكرة إلى لغة بصرية هادئة وناعمة ودقيقة.",
  },
};

export function MobileAboutPage() {
  const { dictionary, language } = useLanguage();
  const text = aboutText[language];
  const total = chapters.length;

  return (
    <MobileChapterController chapters={chapters} className="m-about-page">
      <MobileChapterSection chapter={chapters[0]} index={0} total={total} className="m-about-opening">
        <div className="m-about-opening__mark" aria-hidden="true">
          <LogoAsset variant="hero" priority />
        </div>
        <div className="m-chapter-copy">
          <p>{dictionary.nav.about}</p>
          <h1 id={`${chapters[0].id}-title`}>{text.opening}</h1>
          <p>{text.body}</p>
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[1]} index={1} total={total} className="m-about-philosophy">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[1].id}-title`}>{dictionary.home.philosophyTitle}</h2>
          <p>{text.philosophy}</p>
        </div>
        <div className="m-about-quiet-grid" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[2]} index={2} total={total} className="m-about-values">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[2].id}-title`}>{text.values}</h2>
        </div>
        <div className="m-value-cloud">
          {dictionary.values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </MobileChapterSection>

      <MobileChapterSection chapter={chapters[3]} index={3} total={total} className="m-about-invite m-global-end">
        <div className="m-chapter-copy">
          <h2 id={`${chapters[3].id}-title`}>{dictionary.home.contactTitle}</h2>
          <p>{text.invite}</p>
          <MobileTextLink to="/contact">{dictionary.actions.startProject}</MobileTextLink>
        </div>
        <MobileFooter />
      </MobileChapterSection>
    </MobileChapterController>
  );
}
