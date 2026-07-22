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
    materialTitle: "The surfaces Noor watches closely",
    materials: [
      ["Type", "How the voice moves on the page."],
      ["Color", "How the mood settles before the message."],
      ["Material", "How the work feels in the hand."],
      ["Image", "How a crop creates memory."],
      ["Space", "How quiet gives the idea room."],
    ],
    rhythmTitle: "A working rhythm with room for instinct.",
    rhythmWords: ["look", "shape", "edit"],
    rhythm: [
      ["Read", "Understand the brand, audience, references, and desired feeling."],
      ["Compose", "Build visual routes through typography, proportion, texture, and use."],
      ["Refine", "Reduce the system until the strongest idea remains clear."],
      ["Prepare", "Organize final assets so the work can live beyond the screen."],
    ],
    bilingualTitle: "Arabic and English are treated as different visual materials.",
    bilingualBody:
      "The page, the line break, and the reading direction are adjusted so each language feels designed in its own rhythm.",
    sampleOne: "balance",
    sampleTwo: "اتزان",
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
    materialTitle: "السطوح التي تنتبه لها نور",
    materials: [
      ["الخط", "كيف يتحرك الصوت على الصفحة."],
      ["اللون", "كيف يستقر الشعور قبل الرسالة."],
      ["الخامة", "كيف يبدو العمل في اليد."],
      ["الصورة", "كيف يصنع القص ذاكرة."],
      ["المساحة", "كيف يمنح الهدوء الفكرة مجالًا."],
    ],
    rhythmTitle: "إيقاع عمل يترك مساحة للحدس.",
    rhythmWords: ["النظر", "الصياغة", "الصقل"],
    rhythm: [
      ["القراءة", "فهم العلامة والجمهور والمراجع والإحساس المطلوب."],
      ["التكوين", "بناء مسارات بصرية عبر الخط والتناسب والملمس والاستخدام."],
      ["التهذيب", "اختصار النظام حتى تبقى الفكرة الأقوى واضحة."],
      ["التجهيز", "تنظيم الملفات النهائية ليعيش العمل خارج الشاشة."],
    ],
    bilingualTitle: "تتعامل نور مع العربية والإنجليزية كخامتين بصريتين مختلفتين.",
    bilingualBody:
      "تتغير الصفحة وفواصل السطر واتجاه القراءة حتى تشعر كل لغة بأنها صُممت بإيقاعها الخاص.",
    sampleOne: "اتزان",
    sampleTwo: "balance",
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
