import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "FLORA",
    slug: "flora",
    year: "2026",
    category: "branding",
    shortDescription: {
      en: "A soft identity system for a botanical stationery concept.",
      ar: "نظام هوية ناعم لمفهوم قرطاسية نباتي.",
    },
    fullDescription: {
      en: "FLORA explores a quiet brand world built from pressed paper, fine botanical forms, and a muted palette that can move from packaging to print with ease.",
      ar: "يستكشف FLORA عالماً بصرياً هادئاً مبنياً من الورق المضغوط، الأشكال النباتية الدقيقة، ولوحة ألوان مكتومة تنتقل بسلاسة من التغليف إلى المطبوعات.",
    },
    services: ["brandIdentity", "printDesign", "packagingDesign"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "flora",
      alt: {
        en: "Botanical stationery arrangement in blush and sage tones.",
        ar: "ترتيب قرطاسية نباتي بدرجات وردية ومريمية.",
      },
    },
    gallery: [
      { variant: "studio", alt: { en: "Letterhead and envelope system.", ar: "نظام أوراق ومغلفات." } },
      { variant: "materials", alt: { en: "Paper textures and botanical stems.", ar: "خامات ورقية وسيقان نباتية." } },
      { variant: "archive", alt: { en: "Printed identity archive view.", ar: "عرض أرشيف مطبوع للهوية." } },
    ],
    colorPalette: ["#F6EFEA", "#EAC6C6", "#D69085", "#A5AA96", "#6E7F6F"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
    quote: {
      en: "A delicate identity that lets the material do part of the speaking.",
      ar: "هوية رقيقة تسمح للمادة أن تتحدث جزئياً.",
    },
  },
  {
    title: "AURORA",
    slug: "aurora",
    year: "2026",
    category: "creativeDirection",
    shortDescription: {
      en: "Art direction for a calm campaign system with warm editorial pacing.",
      ar: "توجيه فني لنظام حملة هادئ بإيقاع تحريري دافئ.",
    },
    fullDescription: {
      en: "AURORA frames soft product moments through layered paper, delicate marks, and a balanced relationship between blush light and grounded green.",
      ar: "يعرض AURORA لحظات منتج ناعمة عبر الورق المتراكب، العلامات الدقيقة، وعلاقة متوازنة بين الضوء الوردي والأخضر الهادئ.",
    },
    services: ["creativeDirection", "graphicDesign", "socialMediaDesign"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "aurora",
      alt: {
        en: "Layered campaign boards with rose paper and soft shadows.",
        ar: "ألواح حملة متراكبة بورق وردي وظلال ناعمة.",
      },
    },
    gallery: [
      { variant: "flora", alt: { en: "Botanical launch visual.", ar: "مرئية إطلاق نباتية." } },
      { variant: "luna", alt: { en: "Social layout sequence.", ar: "تسلسل تخطيطات للتواصل." } },
      { variant: "materials", alt: { en: "Material palette study.", ar: "دراسة لوحة المواد." } },
    ],
    colorPalette: ["#F7F0EA", "#D99A96", "#C9B8A2", "#A9B29D", "#4E574A"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
  },
  {
    title: "ELYSIAN",
    slug: "elysian",
    year: "2025",
    category: "editorial",
    shortDescription: {
      en: "A publication concept balancing generous type, image rhythm, and paper tone.",
      ar: "مفهوم منشور يوازن بين الخط الواسع، إيقاع الصورة، ونبرة الورق.",
    },
    fullDescription: {
      en: "ELYSIAN is a placeholder editorial system for calm spreads, considered captions, and print layouts that hold a story without visual noise.",
      ar: "ELYSIAN نظام تحريري مؤقت لصفحات هادئة، تعليقات مدروسة، وتخطيطات مطبوعة تحمل القصة دون ضجيج بصري.",
    },
    services: ["editorialDesign", "printDesign", "graphicDesign"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "elysian",
      alt: {
        en: "Open editorial spreads with botanical detail.",
        ar: "صفحات تحريرية مفتوحة مع تفصيل نباتي.",
      },
    },
    gallery: [
      { variant: "archive", alt: { en: "Archive publication stack.", ar: "مجموعة منشورات أرشيفية." } },
      { variant: "studio", alt: { en: "Editorial layout samples.", ar: "عينات تخطيط تحريري." } },
      { variant: "kinfolk", alt: { en: "Campaign booklet concept.", ar: "مفهوم كتيب حملة." } },
    ],
    colorPalette: ["#FAF7F1", "#D7C4AF", "#D3A3A1", "#949C83", "#35362F"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
    quote: {
      en: "The page is treated as a pause, not a container.",
      ar: "تتعامل الصفحة كوقفة، لا كحاوية فقط.",
    },
  },
  {
    title: "NUDE",
    slug: "nude",
    year: "2025",
    category: "packaging",
    shortDescription: {
      en: "A packaging direction shaped around quiet material contrast.",
      ar: "اتجاه تغليف مبني حول تباين مادي هادئ.",
    },
    fullDescription: {
      en: "NUDE is a placeholder packaging study with sleeve systems, restrained labels, and a muted palette that makes softness feel precise.",
      ar: "NUDE دراسة تغليف مؤقتة مع أنظمة أغلفة، ملصقات هادئة، ولوحة مكتومة تجعل النعومة دقيقة.",
    },
    services: ["packagingDesign", "brandIdentity", "creativeDirection"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "nude",
      alt: {
        en: "Minimal packaging forms in blush and paper tones.",
        ar: "أشكال تغليف بسيطة بدرجات وردية وورقية.",
      },
    },
    gallery: [
      { variant: "flora", alt: { en: "Botanical label detail.", ar: "تفصيل ملصق نباتي." } },
      { variant: "aurora", alt: { en: "Packaging campaign board.", ar: "لوح حملة للتغليف." } },
      { variant: "materials", alt: { en: "Sleeves and paper texture.", ar: "أغلفة وخامات ورقية." } },
    ],
    colorPalette: ["#F4ECE5", "#E0BBB0", "#C88E87", "#B6AA98", "#767765"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
  },
  {
    title: "LUNA",
    slug: "luna",
    year: "2025",
    category: "socialMedia",
    shortDescription: {
      en: "A modular social direction with gentle structure and room for imagery.",
      ar: "اتجاه اجتماعي مرن ببنية ناعمة ومساحة للصورة.",
    },
    fullDescription: {
      en: "LUNA sets up a social media language with calm templates, clear hierarchy, and small details that keep each post connected without feeling repeated.",
      ar: "يبني LUNA لغة للتواصل الاجتماعي بقوالب هادئة، تسلسل واضح، وتفاصيل صغيرة تربط كل منشور دون إحساس بالتكرار.",
    },
    services: ["socialMediaDesign", "graphicDesign", "creativeDirection"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "luna",
      alt: {
        en: "Social media grid concept with blush and sage modules.",
        ar: "مفهوم شبكة تواصل بدرجات وردية ومريمية.",
      },
    },
    gallery: [
      { variant: "studio", alt: { en: "Content system boards.", ar: "ألواح نظام المحتوى." } },
      { variant: "aurora", alt: { en: "Campaign preview frames.", ar: "إطارات معاينة الحملة." } },
      { variant: "archive", alt: { en: "Template archive.", ar: "أرشيف القوالب." } },
    ],
    colorPalette: ["#F8F1EC", "#D8A5A0", "#BFC6B3", "#87937E", "#44453E"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
  },
  {
    title: "KINFOLK CONCEPT",
    slug: "kinfolk-concept",
    year: "2024",
    category: "print",
    shortDescription: {
      en: "A campaign print concept using layered objects, calm type, and editorial pacing.",
      ar: "مفهوم حملة مطبوعة يستخدم عناصر متراكبة، خطاً هادئاً، وإيقاعاً تحريرياً.",
    },
    fullDescription: {
      en: "KINFOLK CONCEPT is a temporary campaign study for tactile print pieces, simple sequencing, and a visual system that feels collected rather than crowded.",
      ar: "KINFOLK CONCEPT دراسة حملة مؤقتة لقطع مطبوعة ملموسة، تسلسل بسيط، ونظام بصري يبدو منسقاً لا مزدحماً.",
    },
    services: ["printDesign", "editorialDesign", "creativeDirection"],
    credits: {
      en: "Temporary concept content and art direction placeholder.",
      ar: "محتوى مفاهيمي مؤقت واتجاه فني بديل.",
    },
    heroImage: {
      variant: "kinfolk",
      alt: {
        en: "Editorial campaign materials arranged with soft light.",
        ar: "مواد حملة تحريرية مرتبة بضوء ناعم.",
      },
    },
    gallery: [
      { variant: "elysian", alt: { en: "Printed story spreads.", ar: "صفحات قصة مطبوعة." } },
      { variant: "materials", alt: { en: "Paper and binding detail.", ar: "تفصيل الورق والتجليد." } },
      { variant: "nude", alt: { en: "Campaign package sleeve.", ar: "غلاف حزمة الحملة." } },
    ],
    colorPalette: ["#F3ECE4", "#D1BCA5", "#B88E86", "#7C896F", "#2F332C"],
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
    },
  },
];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const nextIndex = index === -1 ? 0 : (index + 1) % projects.length;
  return projects[nextIndex];
}
