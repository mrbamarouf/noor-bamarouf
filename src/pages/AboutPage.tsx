import { Link } from "react-router-dom";
import { DecorativeNbLogo } from "../components/DecorativeNbLogo";
import { useLanguage } from "../context/LanguageContext";

const aboutAtelierCopy = {
  en: {
    entryLabel: "About Noor",
    entryTitle: "A practice of quiet attention.",
    entryBody:
      "Noor Bamarouf designs identity, packaging, print, editorial, and social visuals with a calm eye for proportion, material, and meaning.",
    entryLink: "Enter the archive",
    thesis: "The work is not a style applied at the end.",
    thesisNote:
      "It is built through listening, visual research, restraint, and the final edit that makes every mark feel necessary.",
    observations: [
      "Listen for the feeling behind the brief.",
      "Let type, color, and space carry the idea.",
      "Remove anything that does not sharpen the work.",
    ],
    materialTitle: "The principles behind the work",
    materials: [
      ["Clarity", "Every decision should make the brand easier to recognize, understand, and remember."],
      ["Purpose", "Visual choices begin with the reason behind the brand, not decoration."],
      ["Balance", "Type, color, image, and space are held in a calm, considered relationship."],
      ["Detail", "Small refinements carry the feeling of the whole system."],
      ["Consistency", "Each touchpoint should feel connected without becoming repetitive."],
    ],
    rhythmTitle: "A working rhythm with room for instinct.",
    rhythmWords: ["look", "shape", "edit"],
    rhythm: [
      ["Read", "Understand the brand, audience, references, and desired feeling."],
      ["Compose", "Build visual routes through typography, proportion, texture, and use."],
      ["Refine", "Reduce the system until the strongest idea remains clear."],
      ["Prepare", "Organize final assets so the work can live beyond the screen."],
    ],
    bilingualTitle: "Understanding comes before form.",
    bilingualBody:
      "Before a mark, layout, or visual system is created, the brand is read closely: its purpose, audience, tone, and the feeling it needs to leave behind. Noor's work begins there, then turns that understanding into visuals that feel calm, precise, and memorable.",
    sampleOne: "purpose",
    sampleTwo: "clarity",
    closing: "See the work as a set of visual worlds, each shaped with its own atmosphere.",
    closingLink: "Explore selected work",
  },
  ar: {
    entryLabel: "عن نور",
    entryTitle: "ممارسة هادئة لرؤية التفاصيل.",
    entryBody:
      "تصمم نور بامعروف الهويات البصرية والتغليف والمطبوعات والتجارب التحريرية والاجتماعية بعين تهتم بالتناسب والخامة والمعنى.",
    entryLink: "استعرضي الأرشيف",
    thesis: "العمل ليس أسلوبًا يضاف في النهاية.",
    thesisNote:
      "يتشكل من الاستماع والبحث البصري والاتزان، ثم من تحرير أخير يجعل كل علامة في مكانها.",
    observations: [
      "فهم الإحساس الكامن خلف الملخص.",
      "ترك الخط واللون والمسافة تحمل الفكرة.",
      "حذف ما لا يزيد العمل وضوحًا.",
    ],
    materialTitle: "المبادئ التي توجه العمل",
    materials: [
      ["الوضوح", "كل قرار بصري يساعد العلامة على أن تُفهم وتُتذكر بثقة."],
      ["الغاية", "تبدأ المعالجة من سبب وجود العلامة قبل الشكل أو الزخرفة."],
      ["الاتزان", "يتكوّن العمل من علاقة هادئة بين الخط واللون والصورة والمساحة."],
      ["العناية", "التفاصيل الصغيرة تمنح النظام إحساسه الكامل."],
      ["الاتساق", "كل نقطة ظهور يجب أن تبدو مرتبطة بما قبلها دون تكرار جامد."],
    ],
    rhythmTitle: "إيقاع عمل يترك مساحة للحدس.",
    rhythmWords: ["النظر", "الصياغة", "الصقل"],
    rhythm: [
      ["القراءة", "فهم العلامة والجمهور والمراجع والإحساس المطلوب."],
      ["التكوين", "بناء مسارات بصرية عبر الخط والتناسب والملمس والاستخدام."],
      ["التهذيب", "اختصار النظام حتى تبقى الفكرة الأقوى واضحة."],
      ["التجهيز", "تنظيم الملفات النهائية ليعيش العمل خارج الشاشة."],
    ],
    bilingualTitle: "الفهم يسبق الشكل.",
    bilingualBody:
      "قبل الشعار أو التخطيط أو النظام البصري، تبدأ نور بقراءة العلامة بهدوء: غايتها، جمهورها، نبرتها، والأثر الذي ينبغي أن تتركه. من هذا الفهم تتكوّن حلول بصرية واضحة، دقيقة، وقابلة للتذكر.",
    sampleOne: "الغاية",
    sampleTwo: "الوضوح",
    closing: "شاهدي الأعمال كعوالم بصرية مختلفة، لكل مشروع مناخه الخاص.",
    closingLink: "استعراض الأعمال المختارة",
  },
} as const;

function Arrow({ direction }: { direction: "ltr" | "rtl" }) {
  return <span aria-hidden="true">{direction === "rtl" ? "←" : "→"}</span>;
}

export function AboutPage() {
  const { language, direction } = useLanguage();
  const copy = aboutAtelierCopy[language];

  return (
    <div className={`desktop-page noor-about-atelier noor-about-atelier--${language}`}>
      <section className="noor-about-atelier__entry" aria-labelledby="about-atelier-title" data-reveal>
        <div className="noor-about-atelier__entry-copy desktop-section-flow">
          <p className="noor-about-atelier__folio">{copy.entryLabel}</p>
          <h1 id="about-atelier-title">{copy.entryTitle}</h1>
          <p>{copy.entryBody}</p>
          <Link className="noor-about-atelier__link" to="/work">
            {copy.entryLink}
            <Arrow direction={direction} />
          </Link>
        </div>
        <figure className="noor-about-atelier__entry-mark" aria-hidden="true">
          <DecorativeNbLogo priority />
        </figure>
      </section>

      <section className="noor-about-atelier__thesis" aria-labelledby="about-atelier-thesis" data-reveal>
        <h2 id="about-atelier-thesis">{copy.thesis}</h2>
        <div className="noor-about-atelier__thesis-note">
          <p>{copy.thesisNote}</p>
          <ul>
            {copy.observations.map((observation) => (
              <li key={observation}>{observation}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="noor-about-atelier__materials" aria-labelledby="about-atelier-materials" data-reveal>
        <h2 id="about-atelier-materials">{copy.materialTitle}</h2>
        <div className="noor-about-atelier__material-rail">
          {copy.materials.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="noor-about-atelier__rhythm" aria-labelledby="about-atelier-rhythm" data-reveal>
        <div className="noor-about-atelier__rhythm-wall" aria-hidden="true">
          {copy.rhythmWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
        <div className="noor-about-atelier__rhythm-copy">
          <h2 id="about-atelier-rhythm">{copy.rhythmTitle}</h2>
          <ol>
            {copy.rhythm.map(([title, text], index) => (
              <li key={title}>
                <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="noor-about-atelier__bilingual" aria-labelledby="about-atelier-bilingual" data-reveal>
        <div className="noor-about-atelier__language-samples" aria-hidden="true">
          <span>{copy.sampleOne}</span>
          <span>{copy.sampleTwo}</span>
        </div>
        <div className="noor-about-atelier__bilingual-copy">
          <h2 id="about-atelier-bilingual">{copy.bilingualTitle}</h2>
          <p>{copy.bilingualBody}</p>
        </div>
      </section>

      <section className="noor-about-atelier__closing" aria-label={copy.closing} data-reveal>
        <p>{copy.closing}</p>
        <Link className="noor-about-atelier__link noor-about-atelier__link--light" to="/work">
          {copy.closingLink}
          <Arrow direction={direction} />
        </Link>
      </section>
    </div>
  );
}
