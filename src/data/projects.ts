import type { Language, Project } from "../types";

export function getProjectDisplayTitle(project: Project, language: Language) {
  return project.displayTitle?.[language] ?? project.title;
}

export function getProjectTitleDirection(project: Project, language: Language) {
  return project.displayTitle?.[language] && language === "ar" ? "rtl" : "ltr";
}

const conceptCredits = {
  en: "Independent Concept",
  ar: "مفهوم مستقل",
};

const officialClientCredits = {
  en: "Official Client Project",
  ar: "مشروع عميل رسمي",
};

const officialPortfolioCredits = {
  en: "Official Portfolio Project",
  ar: "مشروع بورتفوليو رسمي",
};

export const projects: Project[] = [
  {
    title: "WELLO",
    slug: "wello",
    year: "2026",
    category: "packaging",
    projectType: {
      en: "Super Oats Packaging System",
      ar: "نظام تغليف شوفان",
    },
    shortDescription: {
      en: "A bilingual packaging system for WELLO Super Oats, built around bold flavor color, product photography, and breakfast shelf impact.",
      ar: "نظام تغليف ثنائي اللغة لمنتج WELLO Super Oats، مبني على ألوان نكهات جريئة، تصوير المنتج، وحضور واضح على الرف.",
    },
    fullDescription: {
      en: "WELLO is an official client project for a Super Oats product line. The visual system presents three visible flavors, bilingual Arabic and English packaging, nutrition callouts, ingredient-led imagery, and bright breakfast scenes designed for quick recognition.",
      ar: "WELLO مشروع عميل رسمي لخط منتجات Super Oats. يعرض النظام البصري ثلاث نكهات ظاهرة، تغليفاً ثنائي اللغة بالعربية والإنجليزية، إشارات غذائية، صور مكونات واضحة، ومشاهد إفطار مشرقة يسهل تمييزها بسرعة.",
    },
    services: ["packagingDesign", "brandIdentity", "graphicDesign"],
    credits: officialClientCredits,
    coverImage: {
      variant: "wello",
      scene: "packaging",
      format: "png",
      alt: {
        en: "WELLO Super Oats packaging lineup with Choco Hazelnut, Apple Cinnamon, and Banana Peanut Butter pouches.",
        ar: "مجموعة تغليف WELLO Super Oats مع نكهات الشوكولاتة والبندق، التفاح والقرفة، وزبدة الفول السوداني والموز.",
      },
    },
    heroImage: {
      variant: "wello",
      scene: "hero",
      format: "png",
      alt: {
        en: "WELLO hero image showing three Super Oats pouches on a breakfast counter with the message Ultimate Breakfast for Busy Mornings.",
        ar: "صورة رئيسية لـ WELLO تعرض ثلاث عبوات Super Oats على طاولة إفطار مع عبارة Ultimate Breakfast for Busy Mornings.",
      },
    },
    gallery: [
      { variant: "wello", scene: "packaging", format: "png", alt: { en: "Apple Cinnamon WELLO pouch being poured into a breakfast bowl beside milk and oats.", ar: "عبوة WELLO بنكهة التفاح والقرفة وهي تصب في وعاء إفطار بجانب الحليب والشوفان." } },
      { variant: "wello", scene: "materials", format: "png", alt: { en: "Choco Hazelnut WELLO pouch with a bowl, nuts, chocolate, and a repeated brand pattern.", ar: "عبوة WELLO بنكهة الشوكولاتة والبندق مع وعاء ومكسرات وشوكولاتة ونمط متكرر للعلامة." } },
      { variant: "wello", scene: "packaging", format: "png", alt: { en: "Three WELLO Super Oats flavors shown with ingredient photography and distinct color fields.", ar: "ثلاث نكهات من WELLO Super Oats مع صور مكونات ومساحات ألوان مميزة." } },
      { variant: "wello", scene: "campaign", format: "png", alt: { en: "WELLO campaign visual with Super Oats pouches and a busy-morning breakfast message.", ar: "تصميم حملة WELLO مع عبوات Super Oats ورسالة إفطار للصباح المزدحم." } },
    ],
    caseStudy: {
      context: {
        en: "The supplied project assets show a consumer packaging system for oats, where flavor must be understood instantly while the bilingual product information stays clear on small pack surfaces.",
        ar: "تعرض أصول المشروع نظام تغليف استهلاكي للشوفان، حيث يجب أن تكون النكهة مفهومة فوراً مع بقاء معلومات المنتج ثنائية اللغة واضحة على مساحة العبوة الصغيرة.",
      },
      direction: {
        en: "The direction uses a rounded WELLO wordmark, oversized ingredient imagery, curved color blocks, bilingual flavor names, and icon-style benefit callouts to keep the packs energetic and easy to scan.",
        ar: "يعتمد الاتجاه على شعار WELLO بحروف مستديرة، صور مكونات بارزة، مساحات لونية منحنية، أسماء نكهات بالعربية والإنجليزية، وأيقونات فوائد تساعد على قراءة العبوة بسرعة.",
      },
      applications: [
        { en: "Primary Super Oats pouch packaging", ar: "تغليف عبوات Super Oats الرئيسية" },
        { en: "Flavor system for Choco Hazelnut, Apple Cinnamon, and Banana Peanut Butter", ar: "نظام نكهات للشوكولاتة والبندق، التفاح والقرفة، وزبدة الفول السوداني والموز" },
        { en: "Bilingual Arabic and English front-of-pack hierarchy", ar: "هرمية واجهة العبوة بالعربية والإنجليزية" },
        { en: "Campaign and ingredient-led presentation visuals", ar: "مرئيات عرض وحملة مبنية على المكونات" },
      ],
      outcome: {
        en: "A bright, flavor-led packaging presentation that gives WELLO a clear product family, strong shelf recognition, and a flexible visual base for breakfast campaign imagery.",
        ar: "عرض تغليف مشرق تقوده النكهات، يمنح WELLO عائلة منتجات واضحة، تمييزاً قوياً على الرف، وقاعدة بصرية مرنة لصور حملات الإفطار.",
      },
    },
    colorPalette: ["#F7F0E4", "#F15B24", "#F6A33B", "#FFC928", "#54BFB2", "#00644E", "#34383A"],
    typography: {
      display: "Rounded display wordmark",
      body: "Bilingual product sans",
    },
    quote: {
      en: "A breakfast packaging system where flavor, color, and bilingual clarity do the heavy lifting.",
      ar: "نظام تغليف إفطار تقوده النكهة واللون والوضوح ثنائي اللغة.",
    },
  },
  {
    title: "MATCHA",
    slug: "matcha",
    year: "2026",
    category: "packaging",
    projectType: {
      en: "Matcha Beverage Identity",
      ar: "هوية مشروب ماتشا",
    },
    shortDescription: {
      en: "A matcha beverage identity shaped through sage packaging, soft drink photography, social templates, and bilingual campaign language.",
      ar: "هوية مشروب ماتشا تتشكل عبر تغليف أخضر هادئ، تصوير مشروبات ناعم، قوالب اجتماعية، ورسائل حملة بالعربية والإنجليزية.",
    },
    fullDescription: {
      en: "MATCHA is a real portfolio project for a matcha beverage identity. The supplied assets show a sage-and-cream visual system across pouch packaging, hot and iced cup applications, social posts, and Arabic/English campaign graphics.",
      ar: "MATCHA مشروع بورتفوليو حقيقي لهوية مشروب ماتشا. تعرض الأصول نظاماً بصرياً بدرجات الأخضر والكريمي عبر تغليف الأكياس، أكواب ساخنة وباردة، منشورات اجتماعية، ورسائل حملة بالعربية والإنجليزية.",
    },
    services: ["brandIdentity", "packagingDesign", "socialMediaDesign"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "matcha",
      scene: "packaging",
      alt: {
        en: "MATCHA iced drink cup with a branded sage-and-cream sleeve held against soft fabric.",
        ar: "كوب MATCHA بارد مع غلاف أخضر وكريمي يحمل الهوية وسط خامات ناعمة.",
      },
    },
    heroImage: {
      variant: "matcha",
      scene: "hero",
      alt: {
        en: "MATCHA pouch packaging presentation with a single standing pouch and repeated flat-lay pouches.",
        ar: "عرض تغليف MATCHA مع عبوة واقفة ومجموعة عبوات مكررة بتخطيط علوي.",
      },
    },
    gallery: [
      { variant: "matcha", scene: "campaign", alt: { en: "MATCHA campaign poster on a matcha powder texture with Arabic and English messaging.", ar: "ملصق حملة MATCHA فوق ملمس بودرة الماتشا مع رسالة بالعربية والإنجليزية." } },
      { variant: "matcha", scene: "packaging", alt: { en: "Hot matcha cup with latte art, branded sleeve, green tile, and warm shadows.", ar: "كوب ماتشا ساخن مع رسم لاتيه وغلاف يحمل الهوية وبلاط أخضر وظلال دافئة." } },
      { variant: "matcha", scene: "social", alt: { en: "MATCHA social profile presentation with post grid, tote, whisk, drink, and product visuals.", ar: "عرض حساب MATCHA الاجتماعي مع شبكة منشورات وحقيبة وخفاقة ومشروب ومرئيات المنتج." } },
      { variant: "matcha", scene: "packaging", alt: { en: "Iced MATCHA cup application with a branded sleeve and soft editorial styling.", ar: "تطبيق كوب MATCHA بارد مع غلاف الهوية وتنسيق تحريري ناعم." } },
    ],
    caseStudy: {
      context: {
        en: "The supplied material focuses on a beverage brand that needs to feel fresh and recognizable across physical drink moments and social media. The same organic pattern appears on pouches, cups, and posts so the identity stays consistent without relying on heavy copy.",
        ar: "تركز الأصول على علامة مشروبات يجب أن تبدو منعشة وسهلة التمييز عبر لحظات الشرب الواقعية والمنصات الاجتماعية. يظهر النمط العضوي نفسه على الأكياس والأكواب والمنشورات، ليحافظ على تماسك الهوية دون الاعتماد على نصوص كثيرة.",
      },
      direction: {
        en: "The direction combines olive green, cream, and pale blush with a lowercase serif wordmark, soft wavy patterning, matcha powder texture, and close drink photography. The system feels calm but playful, with Arabic and English campaign language where the presentation calls for it.",
        ar: "يجمع الاتجاه بين الأخضر الزيتوني والكريمي والوردي الباهت مع شعار نصي صغير بالحروف اللاتينية، نمط متموج ناعم، ملمس بودرة الماتشا، وتصوير قريب للمشروبات. تبدو الهوية هادئة ومرحة في الوقت نفسه، مع لغة حملة عربية وإنجليزية حين يحتاج العرض إليها.",
      },
      applications: [
        { en: "Pouch packaging and repeat pattern system", ar: "تغليف الأكياس ونظام النمط المتكرر" },
        { en: "Hot and iced cup sleeve applications", ar: "تطبيقات أغلفة الأكواب الساخنة والباردة" },
        { en: "Social profile and feed presentation", ar: "عرض الحساب والشبكة الاجتماعية" },
        { en: "Campaign posters with Arabic and English messaging", ar: "ملصقات حملة برسائل عربية وإنجليزية" },
      ],
      outcome: {
        en: "A cohesive beverage identity presentation that connects packaging, drinkware, social posts, and campaign graphics through one recognizable green-and-cream visual language.",
        ar: "عرض هوية متماسك لمشروب يربط التغليف والأكواب والمنشورات ورسومات الحملة عبر لغة بصرية واضحة بالأخضر والكريمي.",
      },
    },
    colorPalette: ["#F4E8DE", "#D8B8B3", "#C8D0A1", "#8A946F", "#5F6C47", "#2F3B27"],
    typography: {
      display: "Serif mark",
      body: "Rounded type",
    },
    quote: {
      en: "A matcha identity built from soft green, tactile powder, and everyday drink rituals.",
      ar: "هوية ماتشا مبنية من أخضر هادئ، ملمس بودرة، وطقوس مشروب يومية.",
    },
  },
  {
    title: "JEDDAH RAILWAY",
    slug: "jeddah-railway",
    year: "2024",
    category: "branding",
    projectType: {
      en: "Travel Brand Identity",
      ar: "هوية سكة جدة",
    },
    shortDescription: {
      en: "A railway identity and travel campaign for Jeddah, presented through bilingual branding, app screens, OOH, social posts, booth design, and promotional items.",
      ar: "هوية سكة جدة وحملة سفر تعرض العلامة ثنائية اللغة عبر تطبيق، إعلانات خارجية، منشورات اجتماعية، جناح عرض، ومواد ترويجية.",
    },
    fullDescription: {
      en: "JEDDAH RAILWAY is an official portfolio project for a bilingual railway identity and promotional travel campaign. The Behance presentation shows the identity mark, app booking screens, campaign posts, OOH placements, booth design, and branded promotional items.",
      ar: "سكة جدة JEDDAH RAILWAY مشروع بورتفوليو رسمي لهوية سكة ثنائية اللغة وحملة سفر ترويجية. يعرض ملف Behance علامة خطوط جدة الحديدية، شاشات حجز، منشورات حملة، إعلانات خارجية، جناح عرض، ومواد ترويجية تحمل الهوية.",
    },
    services: ["brandIdentity", "graphicDesign", "socialMediaDesign", "creativeDirection"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "jeddahRailway",
      scene: "campaign",
      format: "webp",
      folder: "projects",
      alt: {
        en: "JEDDAH RAILWAY Instagram posts and OOH campaign presentation with train imagery and Arabic messaging.",
        ar: "عرض منشورات Instagram وإعلانات خارجية لـ JEDDAH RAILWAY مع صور قطار ورسائل عربية.",
      },
    },
    heroImage: {
      variant: "jeddahRailway",
      scene: "hero",
      format: "webp",
      folder: "projects",
      alt: {
        en: "JEDDAH RAILWAY hero image with bilingual logo over a futuristic train station scene.",
        ar: "صورة رئيسية لـ JEDDAH RAILWAY مع الشعار ثنائي اللغة فوق مشهد محطة قطار مستقبلية.",
      },
    },
    gallery: [
      { variant: "jeddahRailway", scene: "social", format: "webp", folder: "projects", alt: { en: "JEDDAH RAILWAY IMC strategy board with campaign text and mobile booking screens.", ar: "لوحة استراتيجية IMC لـ JEDDAH RAILWAY مع نص الحملة وشاشات حجز الجوال." } },
      { variant: "jeddahRailway", scene: "campaign", format: "webp", folder: "projects", alt: { en: "JEDDAH RAILWAY promotional campaign board with social posts and Arabic story layouts.", ar: "لوحة حملة JEDDAH RAILWAY الترويجية مع منشورات اجتماعية وتخطيطات قصص عربية." } },
      { variant: "jeddahRailway", scene: "materials", format: "png", folder: "projects", alt: { en: "JEDDAH RAILWAY promotional items including tags, stickers, phone notification, and tote bags.", ar: "مواد ترويجية لـ JEDDAH RAILWAY تشمل بطاقات، ملصقات، إشعار جوال، وحقائب قماشية." } },
      { variant: "jeddahRailway", scene: "signage", format: "webp", folder: "projects", alt: { en: "JEDDAH RAILWAY booth application with branded signage and railway interior styling.", ar: "تطبيق جناح عرض لـ JEDDAH RAILWAY مع لافتة تحمل الهوية وتنسيق داخلي مستوحى من القطار." } },
      { variant: "jeddahRailway", scene: "hero", format: "webp", folder: "projects", alt: { en: "JEDDAH RAILWAY closing visual with the train station scene and thank-you message.", ar: "صورة ختامية لـ JEDDAH RAILWAY مع مشهد محطة القطار ورسالة شكر." } },
    ],
    video: {
      src: "/projects/jeddah-railway/project-video.mp4",
      poster: "/projects/jeddah-railway/hero.webp",
      label: {
        en: "JEDDAH RAILWAY project video",
        ar: "فيديو مشروع JEDDAH RAILWAY",
      },
    },
    caseStudy: {
      context: {
        en: "The project material frames JEDDAH RAILWAY as a travel identity and campaign that promotes railway travel from Jeddah to Saudi regions. The presentation connects brand identity, booking screens, campaign posts, outdoor placements, and promotional touchpoints.",
        ar: "تقدم مواد المشروع سكة جدة كهوية سفر وحملة ترويجية تشجع التنقل بالقطار من جدة إلى مناطق السعودية. يربط العرض بين الهوية، شاشات الحجز، منشورات الحملة، الإعلانات الخارجية، ونقاط الترويج.",
      },
      direction: {
        en: "The visual language uses a teal railway-line system, a circular mark, white bilingual typography, and bright green and orange accents. The tone shown in the project is reliable, joyful, and customer-focused.",
        ar: "تعتمد اللغة البصرية على نظام خطوط سكك باللون الأزرق المخضر، علامة دائرية، كتابة ثنائية اللغة باللون الأبيض، ولمسات خضراء وبرتقالية. ويظهر في العرض أن نبرة الهوية موثوقة، مرحة، ومرتكزة على تجربة العميل.",
      },
      applications: [
        { en: "Bilingual logo and railway identity system", ar: "شعار ثنائي اللغة ونظام هوية للسكة" },
        { en: "Mobile booking and ticket screens", ar: "شاشات حجز وتذاكر للجوال" },
        { en: "Instagram posts, stories, and OOH placements", ar: "منشورات وقصص Instagram وإعلانات خارجية" },
        { en: "Booth design and promotional items", ar: "تصميم جناح عرض ومواد ترويجية" },
      ],
      outcome: {
        en: "A complete presentation system for a railway travel identity, moving from brand mark and app touchpoints to campaign communication, OOH, booth presence, and printed merchandise.",
        ar: "نظام عرض متكامل لهوية سفر بالقطار، ينتقل من العلامة وتطبيقات الجوال إلى تواصل الحملة والإعلانات الخارجية والجناح والمواد المطبوعة.",
      },
    },
    colorPalette: ["#073D4C", "#075568", "#0D9B8F", "#5FC45F", "#F28D45", "#F3F1E3"],
    typography: {
      display: "Bold bilingual sans",
      body: "Clean transport UI type",
    },
    quote: {
      en: "A travel identity where the railway line becomes a full campaign language.",
      ar: "هوية سفر تتحول فيها خطوط السكة إلى لغة حملة كاملة.",
    },
  },
  {
    title: "EGG SPACE",
    slug: "egg-space",
    year: "2023",
    category: "packaging",
    projectType: {
      en: "Product Packaging",
      ar: "تغليف منتج",
    },
    shortDescription: {
      en: "A space-inspired packaging concept designed to protect and present eggs through a playful cylindrical structure and a bold cosmic visual system.",
      ar: "مفهوم تغليف مستوحى من الفضاء، صُمم لحماية البيض وتقديمه داخل عبوة أسطوانية مرحة بهوية بصرية كونية واضحة.",
    },
    fullDescription: {
      en: "EGG SPACE is an official portfolio packaging project for a playful cylindrical egg package. The presentation documents the concept, 2D wrap design, 3D mockup, printed prototype, and process material.",
      ar: "إيج سبيس EGG SPACE مشروع بورتفوليو رسمي لتغليف بيض داخل عبوة أسطوانية مرحة. يوثق العرض الفكرة، تصميم الغلاف ثنائي الأبعاد، النموذج ثلاثي الأبعاد، العينة المطبوعة، ومواد عملية التصميم.",
    },
    services: ["packagingDesign", "graphicDesign", "printDesign"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "eggSpace",
      scene: "packaging",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "EGG SPACE angled cylindrical egg packaging mockup with purple space graphics and yellow egg illustrations.",
        ar: "نموذج عبوة EGG SPACE الأسطوانية بزاوية مع رسومات فضاء بنفسجية ورسوم بيض صفراء.",
      },
    },
    heroImage: {
      variant: "eggSpace",
      scene: "packaging",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "EGG SPACE 3D cylindrical egg packaging mockup on a clean white presentation background.",
        ar: "نموذج ثلاثي الأبعاد لعبوة EGG SPACE الأسطوانية على خلفية عرض بيضاء.",
      },
    },
    gallery: [
      { variant: "eggSpace", scene: "print", format: "jpg", folder: "projects", alt: { en: "EGG SPACE concept statement with the line about space as the safest place for eggs.", ar: "بيان فكرة EGG SPACE مع عبارة عن الفضاء باعتباره المكان الأكثر أماناً للبيض." } },
      { variant: "eggSpace", scene: "materials", format: "jpg", folder: "projects", alt: { en: "EGG SPACE design process board showing production photos and layout work.", ar: "لوحة عملية تصميم EGG SPACE تعرض صور الإنتاج والعمل على التخطيط." } },
      { variant: "eggSpace", scene: "print", format: "jpg", folder: "projects", alt: { en: "EGG SPACE 2D packaging wrap with lid, base, label, and cosmic illustration system.", ar: "تصميم EGG SPACE ثنائي الأبعاد للغلاف والغطاء والقاعدة والملصق والنظام الرسومي الكوني." } },
      { variant: "eggSpace", scene: "packaging", format: "jpg", folder: "projects", alt: { en: "EGG SPACE printed packaging result with cylindrical package and eggs inside.", ar: "النتيجة المطبوعة لعبوة EGG SPACE الأسطوانية مع البيض في الداخل." } },
      { variant: "eggSpace", scene: "hero", format: "jpg", folder: "projects", alt: { en: "EGG SPACE final graphic detail with yellow lettering and the eggs out of the ordinary tagline.", ar: "تفصيل بصري نهائي لـ EGG SPACE مع كتابة صفراء وعبارة Eggs Out of the Ordinary." } },
    ],
    caseStudy: {
      context: {
        en: "The project explores egg packaging through a space metaphor, using a cylindrical form to present the product in a playful, memorable way.",
        ar: "يستكشف المشروع تغليف البيض عبر استعارة الفضاء، مستخدماً شكلاً أسطوانياً لتقديم المنتج بطريقة مرحة وسهلة التذكر.",
      },
      direction: {
        en: "The visual system combines deep purple space fields, yellow egg planets, fried-egg spacecraft, small star details, and a bold hand-drawn title treatment.",
        ar: "يجمع النظام البصري بين مساحات فضائية بنفسجية داكنة، كواكب صفراء تشبه صفار البيض، عناصر بيض طائرة، تفاصيل نجوم صغيرة، ومعالجة عنوان جريئة بطابع مرسوم.",
      },
      applications: [
        { en: "2D cylindrical wrap, lid, and base design", ar: "تصميم الغلاف الأسطواني والغطاء والقاعدة ثنائي الأبعاد" },
        { en: "3D packaging mockup", ar: "نموذج تغليف ثلاثي الأبعاد" },
        { en: "Printed packaging prototype", ar: "عينة تغليف مطبوعة" },
        { en: "Design process documentation", ar: "توثيق عملية التصميم" },
      ],
      outcome: {
        en: "A complete packaging presentation that moves from idea and 2D construction to a 3D mockup and printed cylindrical result.",
        ar: "عرض تغليف متكامل ينتقل من الفكرة والبناء ثنائي الأبعاد إلى نموذج ثلاثي الأبعاد ونتيجة أسطوانية مطبوعة.",
      },
    },
    colorPalette: ["#17072F", "#2A0B5C", "#4B1A96", "#FDB914", "#F8F3EA", "#FFFFFF"],
    typography: {
      display: "Playful display",
      body: "Packaging sans",
    },
    quote: {
      en: "A packaging concept where eggs become planets and the cylinder becomes their safe orbit.",
      ar: "مفهوم تغليف تتحول فيه البيضة إلى كوكب، وتصبح العبوة الأسطوانية مداراً آمناً لها.",
    },
  },
  {
    title: "RED BULL × MARVEL",
    displayTitle: {
      en: "RED BULL ×\u00A0MARVEL",
      ar: "ريد بُل ×\u00A0مارفل",
    },
    slug: "red-bull-marvel",
    year: "2024",
    category: "packaging",
    projectType: {
      en: "LIMITED EDITION",
      ar: "إصدار محدود",
    },
    shortDescription: {
      en: "A limited-edition packaging concept that reimagines Red Bull through a Marvel superhero visual system, combining character energy, bold color, and collectible can variations.",
      ar: "مفهوم لتغليف إصدار محدود يعيد تقديم ريد بُل من خلال نظام بصري مستوحى من أبطال مارفل، يجمع بين طاقة الشخصيات والألوان الجريئة وتصاميم علب قابلة للاقتناء.",
    },
    fullDescription: {
      en: "RED BULL × MARVEL is an independent limited-edition packaging concept exploring a superhero crossover through Red Bull relogo work, collectible can variations, bold comic color, and promotional packaging visuals.",
      ar: "ريد بُل × مارفل مفهوم مستقل لتغليف إصدار محدود يستكشف تقاطعاً بصرياً مستوحى من الأبطال الخارقين عبر تجربة إعادة شعار ريد بُل، تصاميم علب قابلة للاقتناء، ألوان قصص مصورة جريئة، ومرئيات ترويجية للتغليف.",
    },
    services: ["packagingDesign", "brandIdentity", "graphicDesign", "creativeDirection"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "redBullMarvel",
      scene: "packaging",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "RED BULL × MARVEL limited-edition can lineup with superhero-inspired character variations.",
        ar: "مجموعة علب ريد بُل × مارفل لإصدار محدود مع تصاميم مستوحاة من شخصيات الأبطال الخارقين.",
      },
    },
    heroImage: {
      variant: "redBullMarvel",
      scene: "packaging",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "RED BULL × MARVEL collectible can lineup on a bold comic-style blue background.",
        ar: "مجموعة علب ريد بُل × مارفل قابلة للاقتناء على خلفية زرقاء بأسلوب القصص المصورة.",
      },
    },
    gallery: [
      { variant: "redBullMarvel", scene: "packaging", format: "jpg", folder: "projects", alt: { en: "Single RED BULL × MARVEL can design with comic speech bubble and red-yellow character styling.", ar: "تصميم عبوة مفردة لريد بُل × مارفل مع فقاعة قصص مصورة وتنسيق أحمر وأصفر مستوحى من الشخصيات." } },
      { variant: "redBullMarvel", scene: "campaign", format: "jpg", folder: "projects", alt: { en: "RED BULL × MARVEL versus-style visual with two superhero-inspired can variations.", ar: "مرئية بأسلوب المواجهة لريد بُل × مارفل تعرض تصميمين مختلفين للعلب مستوحيين من الأبطال الخارقين." } },
      { variant: "redBullMarvel", scene: "packaging", format: "jpg", folder: "projects", alt: { en: "RED BULL × MARVEL full limited-edition can lineup with character-driven packaging variations.", ar: "المجموعة الكاملة لعبوات ريد بُل × مارفل لإصدار محدود مع تنويعات تغليف قائمة على الشخصيات." } },
    ],
    caseStudy: {
      context: {
        en: "The project frames Red Bull cans as collectible character editions, using superhero cues to create a playful crossover packaging system.",
        ar: "يعامل المشروع علب ريد بُل كإصدارات شخصيات قابلة للاقتناء، مستخدماً إشارات الأبطال الخارقين لبناء نظام تغليف تقاطعي مرح.",
      },
      direction: {
        en: "The visual direction uses comic-book panels, speech-bubble language, saturated red, blue, yellow, green, and black fields, and bold can graphics that signal different hero energies.",
        ar: "يعتمد الاتجاه البصري على لوحات القصص المصورة، لغة فقاعات الكلام، مساحات مشبعة بالأحمر والأزرق والأصفر والأخضر والأسود، ورسومات علب جريئة تميز طاقة كل شخصية.",
      },
      applications: [
        { en: "Red Bull relogo exploration", ar: "استكشاف إعادة شعار ريد بُل" },
        { en: "Superhero-inspired can variations", ar: "تنويعات علب مستوحاة من الأبطال الخارقين" },
        { en: "Limited-edition can lineup", ar: "مجموعة علب إصدار محدود" },
        { en: "Promotional packaging visuals", ar: "مرئيات ترويجية للتغليف" },
      ],
      outcome: {
        en: "A focused packaging presentation that turns character references into a collectible energy-drink can system and bold promotional visuals.",
        ar: "عرض تغليف مركز يحول مراجع الشخصيات إلى نظام علب طاقة قابلة للاقتناء ومرئيات ترويجية جريئة.",
      },
    },
    colorPalette: ["#ED1C24", "#087DC2", "#FFD600", "#111111", "#65B946", "#FFFFFF"],
    typography: {
      display: "Comic display",
      body: "Bold sans",
    },
    quote: {
      en: "A collectible can system built from superhero energy, comic rhythm, and bold color.",
      ar: "نظام علب قابلة للاقتناء مبني على طاقة الأبطال، إيقاع القصص المصورة، والألوان الجريئة.",
    },
    legalNote: {
      en: "Independent design concept created for portfolio presentation. Red Bull and Marvel trademarks belong to their respective owners.",
      ar: "مفهوم تصميم مستقل أُعد للعرض ضمن ملف الأعمال. تعود العلامات التجارية لريد بُل ومارفل إلى مالكيها.",
    },
  },
  {
    title: "IMPOSTOR",
    displayTitle: {
      en: "IMPOSTOR",
      ar: "إمبوستر",
    },
    slug: "impostor",
    year: "2024",
    category: "awareness",
    projectType: {
      en: "NOT ALL CANDY IS CANDY",
      ar: "ليست كل الحلوى حلوى",
    },
    shortDescription: {
      en: "IMPOSTOR is a visual awareness campaign that uses a playful game-inspired language to warn children and families about drugs disguised as candy.",
      ar: "إمبوستر حملة توعوية بصرية تستخدم لغة مستوحاة من الألعاب للتحذير من المخدرات التي قد تُخفى في هيئة حلوى أو منتجات جذابة للأطفال.",
    },
    fullDescription: {
      en: "A visual awareness campaign built around the idea of an impostor hidden among familiar objects. The campaign warns children and families about suspicious substances that may be presented in candy-like forms.",
      ar: "حملة توعوية بصرية تقوم على فكرة وجود عنصر دخيل بين أشياء مألوفة. تهدف الحملة إلى تنبيه الأطفال والعائلات إلى المواد المشبوهة التي قد تُقدَّم بأشكال تشبه الحلوى.",
    },
    services: ["graphicDesign", "socialMediaDesign", "creativeDirection"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "impostor",
      scene: "campaign",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "IMPOSTOR campaign poster with the line Not All Candy Is Candy and game-inspired characters in space.",
        ar: "ملصق حملة إمبوستر مع عبارة ليست كل الحلوى حلوى وشخصيات مستوحاة من الألعاب في الفضاء.",
      },
    },
    heroImage: {
      variant: "impostor",
      scene: "campaign",
      format: "jpg",
      folder: "projects",
      alt: {
        en: "IMPOSTOR awareness campaign hero visual reading Not All Candy Is Candy.",
        ar: "صورة رئيسية لحملة إمبوستر التوعوية تحمل عبارة ليست كل الحلوى حلوى.",
      },
    },
    gallery: [
      { variant: "impostor", scene: "campaign", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR visual elements page with character artwork, color notes, typography, and campaign hashtags.", ar: "صفحة العناصر البصرية لحملة إمبوستر مع الشخصية والألوان والخطوط ووسوم الحملة." } },
      { variant: "impostor", scene: "campaign", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR campaign logo presentation on a starry black background.", ar: "عرض شعار حملة إمبوستر على خلفية سوداء بنجوم." } },
      { variant: "impostor", scene: "campaign", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR app campaign icon with a red character and candy-like substance cue.", ar: "أيقونة حملة إمبوستر مع شخصية حمراء وإشارة لمادة تشبه الحلوى." } },
      { variant: "impostor", scene: "social", format: "jpg", folder: "projects", alt: { en: "Arabic and English IMPOSTOR social campaign posters presented side by side.", ar: "منشورات حملة إمبوستر بالعربية والإنجليزية معروضة جنباً إلى جنب." } },
      { variant: "impostor", scene: "social", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR Arabic and English mobile app campaign applications.", ar: "تطبيقات حملة إمبوستر داخل واجهات جوال بالعربية والإنجليزية." } },
      { variant: "impostor", scene: "signage", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR navigation and transit-style campaign application with a yellow game-inspired character.", ar: "تطبيق توعوي بأسلوب الملاحة والتنقل لحملة إمبوستر مع شخصية صفراء مستوحاة من الألعاب." } },
      { variant: "impostor", scene: "materials", format: "jpg", folder: "projects", alt: { en: "IMPOSTOR promotional items including stickers, round badges, and an arcade cabinet application.", ar: "مواد ترويجية لحملة إمبوستر تشمل ملصقات وشارات دائرية وتطبيقاً على جهاز ألعاب." } },
    ],
    caseStudy: {
      context: {
        en: "The campaign uses the idea of an impostor hidden among familiar objects to make a serious warning easier to notice without using graphic or sensational imagery.",
        ar: "تستخدم الحملة فكرة العنصر الدخيل بين الأشياء المألوفة لتقديم رسالة جادة بطريقة ملفتة من دون صور صادمة أو مبالغة.",
      },
      direction: {
        en: "The visual language combines a starry black environment, red warning typography, game-style characters, bold primary colors, bilingual social layouts, and promotional applications that keep the message direct and memorable.",
        ar: "تجمع اللغة البصرية بين فضاء أسود مرصع بالنجوم، كتابة تحذيرية حمراء، شخصيات بطابع الألعاب، ألوان أساسية قوية، قوالب اجتماعية ثنائية اللغة، وتطبيقات ترويجية تجعل الرسالة مباشرة وسهلة التذكر.",
      },
      applications: [
        { en: "Campaign logo and icon presentation", ar: "عرض شعار الحملة وأيقونتها" },
        { en: "Arabic and English social media posts", ar: "منشورات تواصل بالعربية والإنجليزية" },
        { en: "Mobile app and feed applications", ar: "تطبيقات داخل واجهات الجوال والمنصات" },
        { en: "Transit-style navigation visual", ar: "مرئية تنقل وملاحة بطابع الحملة" },
        { en: "Promotional stickers, badges, and arcade application", ar: "ملصقات وشارات وتطبيق على جهاز ألعاب" },
      ],
      outcome: {
        en: "A complete awareness campaign presentation that translates a sensitive topic into a clear visual system across posters, mobile formats, and promotional touchpoints.",
        ar: "عرض حملة توعوية متكامل يترجم موضوعاً حساساً إلى نظام بصري واضح عبر الملصقات، صيغ الجوال، ونقاط ترويجية متعددة.",
      },
    },
    colorPalette: ["#000000", "#E50909", "#FF7A1A", "#FFD84D", "#1FA64A", "#2057D8", "#FFFFFF"],
    typography: {
      display: "Impostograph",
      body: "Myriad Pro",
    },
    quote: {
      en: "Not all candy is candy.",
      ar: "ليست كل الحلوى حلوى.",
    },
    legalNote: {
      en: "Independent awareness campaign concept created for portfolio presentation. Among Us-related visual references belong to their respective owners.",
      ar: "مفهوم حملة توعوية مستقل أُعد للعرض ضمن ملف الأعمال. تعود العناصر البصرية المرتبطة بلعبة Among Us إلى مالكيها.",
    },
  },
  {
    title: "WEMO DELIGHTS",
    displayTitle: {
      en: "WEMO DELIGHTS",
      ar: "ويمو ديلايتس",
    },
    slug: "wemo-delights",
    year: "2026",
    category: "branding",
    projectType: {
      en: "Brand Identity",
      ar: "هوية بصرية",
    },
    shortDescription: {
      en: "A cookie brand identity inspired by We + Moments, shaped through a playful wordmark, warm story, purple packaging, and soft product applications.",
      ar: "هوية علامة كوكيز مستلهمة من We + Moments، تتشكل عبر شعار مرح، قصة دافئة، تغليف بنفسجي، وتطبيقات منتج ناعمة.",
    },
    fullDescription: {
      en: "WEMO Delights is inspired by We + Moments, the idea that life's sweetest memories are created together. Born from a girl's love for baking cookies, the brand turns ordinary moments into meaningful ones through warmth, joy, and connection.",
      ar: "استُلهم اسم WEMO Delights من عبارة We + Moments، ومن فكرة أن أجمل لحظات الحياة تُصنع حين نتشاركها. بدأت العلامة من شغف فتاة بصناعة الكوكيز، ومن إيمانها بأن كل قطعة قادرة على تحويل لحظة عادية إلى ذكرى تحمل معنى.",
    },
    services: ["brandIdentity", "packagingDesign", "graphicDesign"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "wemoDelights",
      scene: "packaging",
      format: "webp",
      folder: "projects",
      alt: {
        en: "WEMO DELIGHTS logo over cookie dough on a purple baking surface.",
        ar: "شعار WEMO DELIGHTS فوق عجينة كوكيز على سطح خبز بنفسجي.",
      },
    },
    heroImage: {
      variant: "wemoDelights",
      scene: "hero",
      format: "webp",
      folder: "projects",
      alt: {
        en: "WEMO DELIGHTS hero image with hands shaping cookie dough and the brand wordmark centered on the dough.",
        ar: "صورة رئيسية لـ WEMO DELIGHTS مع يدين تشكلان عجينة الكوكيز والشعار في الوسط.",
      },
    },
    gallery: [
      { variant: "wemoDelights", scene: "packaging", format: "webp", folder: "projects", alt: { en: "Close crop of the WEMO DELIGHTS wordmark on a large cookie dough composition.", ar: "لقطة قريبة لشعار WEMO DELIGHTS فوق تكوين عجينة كوكيز كبير." } },
      { variant: "wemoDelights", scene: "campaign", format: "webp", folder: "projects", alt: { en: "WEMO DELIGHTS brand story board with cookie applications, packaging, and purple and pink color cues.", ar: "لوحة قصة علامة WEMO DELIGHTS مع تطبيقات الكوكيز والتغليف وإشارات اللونين البنفسجي والوردي." } },
      { variant: "wemoDelights", scene: "materials", format: "webp", folder: "projects", alt: { en: "Cookie tic-tac-toe application on a purple table with pink game pieces.", ar: "تطبيق كوكيز على لعبة إكس أو على طاولة بنفسجية مع قطع وردية." } },
      { variant: "wemoDelights", scene: "packaging", format: "webp", folder: "projects", alt: { en: "WEMO DELIGHTS cookie sleeves on a cookie dough texture.", ar: "أغلفة كوكيز WEMO DELIGHTS فوق ملمس عجينة كوكيز." } },
      { variant: "wemoDelights", scene: "packaging", format: "webp", folder: "projects", alt: { en: "Purple WEMO DELIGHTS delivery bag handed through a car window.", ar: "حقيبة WEMO DELIGHTS بنفسجية تُسلَّم عبر نافذة سيارة." } },
      { variant: "wemoDelights", scene: "materials", format: "webp", folder: "projects", alt: { en: "WEMO DELIGHTS color palette detail with purple and pink swatches.", ar: "تفصيل لوحة ألوان WEMO DELIGHTS بدرجات البنفسجي والوردي." } },
    ],
    caseStudy: {
      context: {
        en: "The presentation centers on a simple equation: We + Moments = WEMO. The identity frames cookies as shared moments, using the brand story to connect baking, memory, and togetherness.",
        ar: "يقوم العرض على معادلة بسيطة: We + Moments = WEMO. تصوغ الهوية الكوكيز كلحظات مشتركة، وتربط قصة العلامة بين الخَبز والذكرى والقرب.",
      },
      direction: {
        en: "The visual system pairs a soft bubble wordmark with chocolate-chip details, a deep purple field, blush packaging color, striped sleeves, tactile dough photography, and a friendly hand symbol.",
        ar: "يجمع النظام البصري بين شعار فقاعي ناعم، تفاصيل رقائق الشوكولاتة، مساحة بنفسجية عميقة، لون وردي للتغليف، أغلفة مخططة، تصوير ملموس للعجين، ورمز يد ودود.",
      },
      applications: [
        { en: "Primary WEMO DELIGHTS wordmark", ar: "الشعار النصي الرئيسي لـ WEMO DELIGHTS" },
        { en: "Cookie sleeves and delivery bag application", ar: "أغلفة الكوكيز وتطبيق حقيبة التوصيل" },
        { en: "Brand story and color system presentation", ar: "عرض قصة العلامة ونظام الألوان" },
        { en: "Product photography and playful cookie application", ar: "تصوير المنتج وتطبيق كوكيز مرح" },
      ],
      outcome: {
        en: "A focused brand identity presentation that gives WEMO DELIGHTS a warm story, memorable wordmark, clear color system, and visible packaging touchpoints.",
        ar: "عرض هوية بصرية مركز يمنح WEMO DELIGHTS قصة دافئة، شعاراً سهل التذكر، نظام ألوان واضحاً، وتطبيقات تغليف مرئية.",
      },
    },
    colorPalette: ["#5F4467", "#F4C6D1", "#2E1D3D", "#B88952", "#F2E3CE"],
    typography: {
      display: "Bubble wordmark",
      body: "Rounded brand sans",
    },
    quote: {
      en: "We + Moments = WEMO.",
      ar: "We + Moments = WEMO.",
    },
  },
  {
    title: "RAHABA SPACE",
    displayTitle: {
      en: "RAHABA SPACE",
      ar: "رحابة سبيس",
    },
    slug: "rahaba-space",
    year: "2026",
    category: "socialMedia",
    projectType: {
      en: "Six Custom Posts",
      ar: "ستة منشورات مخصصة",
    },
    shortDescription: {
      en: "A set of six custom-designed social media posts for Rahaba Space, shaped around calm Pilates imagery, warm neutral color, and clear visual communication.",
      ar: "مجموعة من ستة منشورات صُممت خصيصًا لرحابة سبيس، بأسلوب يعتمد على صور بيلاتس هادئة، ألوان دافئة، وتواصل بصري واضح.",
    },
    fullDescription: {
      en: "RAHABA SPACE is a Social Media Posts design project composed of six supplied posts. The visual set presents Pilates studio moments through soft photography, beige and brown overlays, Arabic and English post language, and a calm wellness tone.",
      ar: "RAHABA SPACE مشروع تصميم منشورات وسائل التواصل الاجتماعي يتكون من ستة منشورات مقدمة ضمن الملفات. تعرض المجموعة لحظات من عالم البيلاتس عبر تصوير ناعم، طبقات لونية بيج وبنية، نصوص عربية وإنجليزية، ونبرة هادئة مرتبطة بالعافية.",
    },
    services: ["socialMediaDesign", "graphicDesign"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "rahabaSpace",
      scene: "social",
      format: "webp",
      folder: "projects",
      alt: {
        en: "RAHABA SPACE social media grid preview showing six Pilates studio posts.",
        ar: "معاينة شبكة منشورات RAHABA SPACE تعرض ستة تصاميم لاستوديو بيلاتس.",
      },
    },
    heroImage: {
      variant: "rahabaSpace",
      scene: "hero",
      format: "webp",
      folder: "projects",
      alt: {
        en: "RAHABA SPACE hero visual with social media post grid over a soft Pilates studio background.",
        ar: "صورة رئيسية لـ RAHABA SPACE تعرض شبكة منشورات فوق خلفية استوديو بيلاتس ناعمة.",
      },
    },
    gallery: [
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "RAHABA SPACE overview board with profile mark and six social media post designs.", ar: "لوحة عامة لـ RAHABA SPACE مع علامة الحساب وستة تصاميم منشورات." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Landscape crop of the RAHABA SPACE social media post grid.", ar: "لقطة أفقية لشبكة منشورات RAHABA SPACE." } },
      { variant: "rahabaSpace", scene: "materials", format: "webp", folder: "projects", alt: { en: "Close-up detail of Rahaba-branded Pilates mat and studio equipment.", ar: "تفصيل قريب لسجادة بيلاتس ومعدات تحمل علامة رحابة." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba post with a tote bag and Pilates mat in warm natural tones.", ar: "منشور رحابة مع حقيبة وسجادة بيلاتس بدرجات طبيعية دافئة." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba post with a phone-call style prompt for a favorite Pilates studio.", ar: "منشور رحابة بأسلوب تنبيه مكالمة لاستوديو البيلاتس المفضل." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba post showing branded Pilates equipment and neutral floor texture.", ar: "منشور رحابة يعرض معدات بيلاتس وهوية على خامة أرضية محايدة." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba reminder post with Pilates pose and completed prompt.", ar: "منشور تذكير من رحابة مع وضعية بيلاتس ورسالة إتمام." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba post reading Our Pilates Space over a calm studio interior.", ar: "منشور رحابة بعبارة Our Pilates Space فوق مشهد استوديو هادئ." } },
      { variant: "rahabaSpace", scene: "social", format: "webp", folder: "projects", alt: { en: "Rahaba Arabic post with Pilates ball image and body-care message.", ar: "منشور عربي لرحابة مع كرة بيلاتس ورسالة عن الاهتمام بالجسم." } },
    ],
    caseStudy: {
      context: {
        en: "The supplied work is a collection of six custom-designed social media posts created for the client's visual communication. Each post keeps the Pilates theme clear while varying image treatment, typography, and message framing.",
        ar: "يقدم المشروع مجموعة من ستة منشورات صُممت خصيصًا لوسائل التواصل الاجتماعي بما يتوافق مع الهوية البصرية للعميل. يحافظ كل منشور على وضوح عالم البيلاتس مع تنويع معالجة الصورة، الخط، وطريقة صياغة الرسالة.",
      },
      direction: {
        en: "The visual direction uses warm beige and brown tones, soft translucent panels, quiet studio photography, Arabic brand marks, and simple English and Arabic headlines that feel calm rather than promotional.",
        ar: "يعتمد الاتجاه البصري على درجات البيج والبني، طبقات شفافة ناعمة، تصوير هادئ للاستوديو، علامات عربية للعميل، وعناوين عربية وإنجليزية بسيطة تمنح المنشورات حضورًا هادئًا غير دعائي.",
      },
      applications: [
        { en: "Six supplied social media post designs", ar: "ستة تصاميم منشورات مقدمة ضمن الملفات" },
        { en: "English reminder and studio invitation posts", ar: "منشورات تذكير ودعوة للاستوديو باللغة الإنجليزية" },
        { en: "Arabic body-care post", ar: "منشور عربي عن الاهتمام بالجسم" },
        { en: "Pilates studio image and equipment-based layouts", ar: "تخطيطات مبنية على صور الاستوديو ومعدات البيلاتس" },
      ],
      outcome: {
        en: "A cohesive post set that gives RAHABA SPACE a calm social presence through six finished visual communication pieces.",
        ar: "مجموعة منشورات متماسكة تمنح RAHABA SPACE حضورًا هادئًا على وسائل التواصل من خلال ست قطع بصرية مكتملة.",
      },
    },
    colorPalette: ["#F3E8D8", "#D7C7B4", "#AA9584", "#805631", "#4A2F21"],
    typography: {
      display: "Bold social headline sans",
      body: "Clean bilingual supporting sans",
    },
    quote: {
      en: "Six finished social posts with a calm Pilates rhythm.",
      ar: "ستة منشورات مكتملة بإيقاع بيلاتس هادئ.",
    },
  },
  {
    title: "NIRTO COLD BREW",
    displayTitle: {
      en: "NIRTO COLD BREW",
      ar: "نيرتو كولد برو",
    },
    slug: "nirto-cold-brew",
    year: "2026",
    category: "packaging",
    projectType: {
      en: "250 ml Can Wrap",
      ar: "غلاف عبوة 250 مل",
    },
    shortDescription: {
      en: "A cold brew can packaging project focused on the visual presentation of the product through supplied artwork, bilingual label hierarchy, and coffee-toned detail.",
      ar: "مشروع تصميم تغليف لعبوة كولد برو يركز على تقديم المنتج بصريًا من خلال العمل الفني المقدم، هرمية ثنائية اللغة، وتفاصيل بدرجات القهوة.",
    },
    fullDescription: {
      en: "NIRTO COLD BREW is a packaging design project focused on the visual presentation of a cold brew coffee can. The supplied assets include a finished can presentation image and die-cut packaging artwork with bilingual product information, nutrition details, and front-of-can hierarchy.",
      ar: "NIRTO COLD BREW مشروع تصميم تغليف يركز على تقديم عبوة قهوة كولد برو بصريًا. تتضمن الأصول صورة عرض للعبوة وعملًا فنيًا للقص والطباعة مع معلومات ثنائية اللغة، حقائق غذائية، وهرمية واضحة لواجهة العبوة.",
    },
    services: ["packagingDesign"],
    credits: officialPortfolioCredits,
    coverImage: {
      variant: "nirtoColdBrew",
      scene: "packaging",
      format: "webp",
      folder: "projects",
      alt: {
        en: "NIRTO COLD BREW cover image with a cold brew can, coffee glass, and roasted coffee beans.",
        ar: "غلاف NIRTO COLD BREW مع عبوة كولد برو، كأس قهوة، وحبوب قهوة محمصة.",
      },
    },
    heroImage: {
      variant: "nirtoColdBrew",
      scene: "packaging",
      format: "webp",
      folder: "projects",
      alt: {
        en: "NIRTO COLD BREW hero image showing a chilled can beside a glass of cold brew coffee.",
        ar: "صورة رئيسية لـ NIRTO COLD BREW تعرض عبوة مبردة بجانب كأس قهوة كولد برو.",
      },
    },
    gallery: [
      { variant: "nirtoColdBrew", scene: "packaging", format: "webp", folder: "projects", alt: { en: "NIRTO COLD BREW front can artwork crop with the main label hierarchy and icon callouts.", ar: "لقطة من واجهة عمل NIRTO COLD BREW الفني مع الهرمية الرئيسية وأيقونات المعلومات." } },
      { variant: "nirtoColdBrew", scene: "print", format: "webp", folder: "projects", alt: { en: "NIRTO COLD BREW full die-cut packaging artwork for the 250 ml can wrap.", ar: "العمل الفني الكامل للقص والطباعة لتغليف عبوة NIRTO COLD BREW بسعة 250 مل." } },
      { variant: "nirtoColdBrew", scene: "packaging", format: "webp", folder: "projects", alt: { en: "Close-up crop of the cold brew can presentation with condensation and coffee tones.", ar: "لقطة قريبة من عرض عبوة الكولد برو مع قطرات التكثف ودرجات القهوة." } },
      { variant: "nirtoColdBrew", scene: "materials", format: "webp", folder: "projects", alt: { en: "NIRTO COLD BREW nutrition and ingredients panel crop from the packaging artwork.", ar: "لقطة من لوحة الحقائق الغذائية والمكونات ضمن عمل NIRTO COLD BREW الفني." } },
      { variant: "nirtoColdBrew", scene: "materials", format: "webp", folder: "projects", alt: { en: "NIRTO COLD BREW side information panel with bilingual usage and storage details.", ar: "لوحة معلومات جانبية لـ NIRTO COLD BREW تتضمن إرشادات ثنائية اللغة للاستخدام والحفظ." } },
      { variant: "nirtoColdBrew", scene: "packaging", format: "webp", folder: "projects", alt: { en: "Close-up packaging artwork showing the upper label and cold brew title area.", ar: "لقطة قريبة من العمل الفني تعرض الملصق العلوي ومنطقة عنوان الكولد برو." } },
    ],
    caseStudy: {
      context: {
        en: "The supplied artwork documents a 250 ml cold brew can wrap. The project stays focused on packaging hierarchy, bilingual product information, nutrition content, usage details, and a clear front panel for the can format.",
        ar: "يوثق العمل الفني المقدم غلاف عبوة كولد برو بسعة 250 مل. يركز المشروع على هرمية التغليف، معلومات المنتج ثنائية اللغة، المحتوى الغذائي، إرشادات الاستخدام، وواجهة واضحة تناسب شكل العبوة.",
      },
      direction: {
        en: "The packaging uses a warm coffee gradient, deep brown base, black label block, white condensed title, bilingual supporting text, and small icon callouts. The visual system keeps the can rich, direct, and readable at close range.",
        ar: "يعتمد التغليف على تدرج دافئ بدرجات القهوة، قاعدة بنية داكنة، كتلة سوداء للملصق، عنوان أبيض مكثف، نصوص مساندة ثنائية اللغة، وأيقونات معلومات صغيرة. يحافظ النظام البصري على حضور غني وواضح وقابل للقراءة عن قرب.",
      },
      applications: [
        { en: "250 ml can wrap artwork", ar: "عمل فني لغلاف عبوة 250 مل" },
        { en: "Front label and side information hierarchy", ar: "هرمية الواجهة ولوحات المعلومات الجانبية" },
        { en: "Nutrition facts and ingredients panel", ar: "لوحة الحقائق الغذائية والمكونات" },
        { en: "Close-up packaging presentation image", ar: "صورة عرض قريبة لتفاصيل التغليف" },
      ],
      outcome: {
        en: "A focused packaging presentation that documents the can artwork, display panel, side information, nutrition details, and close-up visual texture.",
        ar: "عرض تغليف مركز يوثق العمل الفني للعبوة، واجهة العرض، المعلومات الجانبية، التفاصيل الغذائية، والملمس البصري القريب.",
      },
    },
    colorPalette: ["#080706", "#2A120C", "#5A2415", "#9C4B1E", "#D99A38", "#F0D7A2", "#FFFFFF"],
    typography: {
      display: "Condensed packaging title",
      body: "Bilingual label sans",
    },
    quote: {
      en: "Packaging built around coffee warmth, bilingual clarity, and a single can format.",
      ar: "تغليف مبني على دفء القهوة، وضوح ثنائي اللغة، وشكل عبوة واحد.",
    },
  },
  {
    title: "NOMA",
    slug: "noma",
    year: "2024",
    category: "packaging",
    projectType: {
      en: "Artisan Packaging",
      ar: "تغليف حرفي",
    },
    shortDescription: {
      en: "An artisan packaging study with jar labels, batch cards, wrap paper, shelf tags, and gift cartons.",
      ar: "مفهوم تغليف حرفي مع ملصقات عبوات، بطاقات دفعات، ورق تغليف، بطاقات رف، وعلب هدايا.",
    },
    fullDescription: {
      en: "NOMA is an artisan packaging study for small-batch pantry goods. It focuses on label hierarchy, batch numbering, gift cartons, shelf presence, and printed wrap.",
      ar: "تقدم NOMA دراسة تغليف حرفي لمنتجات مخزن صغيرة الدفعات. تركز على هرمية الملصقات، ترقيم الدفعات، علب الهدايا، الحضور على الرف، وورق التغليف.",
    },
    services: ["packagingDesign", "brandIdentity", "printDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "noma",
      scene: "packaging",
      alt: {
        en: "NOMA cover with jar label, batch card, carton, and wrap paper.",
        ar: "غلاف NOMA مع ملصق عبوة، بطاقة دفعة، علبة، وورق تغليف.",
      },
    },
    heroImage: {
      variant: "noma",
      scene: "hero",
      alt: {
        en: "NOMA artisan packaging hero with jar labels, cartons, batch cards, and printed wrap.",
        ar: "مشهد NOMA الرئيسي مع ملصقات عبوات، علب، بطاقات دفعات، وورق مطبوع.",
      },
    },
    gallery: [
      { variant: "noma", scene: "packaging", alt: { en: "Jar label, batch card, and gift carton packaging.", ar: "ملصق عبوة، بطاقة دفعة، وتغليف علبة هدية." } },
      { variant: "noma", scene: "print", alt: { en: "Shelf tag, receipt card, and tasting note insert.", ar: "بطاقة رف، بطاقة إيصال، وإدخال ملاحظات تذوق." } },
      { variant: "noma", scene: "materials", alt: { en: "Kraft paper, label stock, and seal color study.", ar: "ورق كرافت، خامة ملصق، ودراسة لون ختم." } },
      { variant: "noma", scene: "social", alt: { en: "Small-batch launch posts and pantry story cards.", ar: "منشورات إطلاق دفعات صغيرة وبطاقات قصة مخزن." } },
    ],
    caseStudy: {
      context: {
        en: "The case study explores packaging for small-batch goods, where label hierarchy and tactile trust matter more than loud shelf graphics.",
        ar: "تستكشف الحالة تغليف منتجات صغيرة الدفعات، حيث تهم هرمية الملصق والثقة الملموسة أكثر من الرسومات الصاخبة على الرف.",
      },
      direction: {
        en: "The identity uses batch labels, muted clay, olive ink, wrap-paper rhythm, and small seals that make the packaging feel handled.",
        ar: "تستخدم الهوية ملصقات دفعات، لون طين مكتوم، حبر زيتوني، إيقاع ورق تغليف، وأختاماً صغيرة تجعل التغليف محسوساً.",
      },
      applications: [
        { en: "Jar label and batch numbering", ar: "ملصق عبوة وترقيم دفعات" },
        { en: "Gift carton and printed wrap", ar: "علبة هدية وورق تغليف مطبوع" },
        { en: "Shelf tag and tasting card", ar: "بطاقة رف وبطاقة تذوق" },
        { en: "Small-batch social launch set", ar: "مجموعة إطلاق اجتماعية للدفعات الصغيرة" },
      ],
      outcome: {
        en: "A tactile packaging system with enough clarity for labels, batch details, shelf tags, and gifting moments.",
        ar: "نظام تغليف ملموس بوضوح كافٍ للملصقات وتفاصيل الدفعات وبطاقات الرف ولحظات الإهداء.",
      },
    },
    colorPalette: ["#F2E7DC", "#CFAF96", "#B36F62", "#718066", "#2F342D"],
    typography: {
      display: "Canela",
      body: "Founders Grotesk",
    },
    quote: {
      en: "A packaging system that makes small-batch production feel careful and collected.",
      ar: "نظام تغليف يجعل الإنتاج الصغير يبدو دقيقاً ومنسقاً.",
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
