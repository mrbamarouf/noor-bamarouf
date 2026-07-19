import type { Project } from "../types";

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
    title: "KINFOLK CONCEPT",
    slug: "kinfolk-concept",
    year: "2025",
    category: "creativeDirection",
    projectType: {
      en: "Lifestyle Campaign",
      ar: "حملة أسلوب حياة",
    },
    shortDescription: {
      en: "A lifestyle campaign concept with poster pacing, invitation print, social story cards, and tactile campaign packaging.",
      ar: "مفهوم حملة أسلوب حياة مع إيقاع ملصقات، دعوات مطبوعة، بطاقات قصص اجتماعية، وتغليف حملة ملموس.",
    },
    fullDescription: {
      en: "KINFOLK CONCEPT is a lifestyle campaign study shaped around domestic rituals, print pacing, campaign sleeves, and calm social sequencing.",
      ar: "تقدم KINFOLK CONCEPT دراسة حملة أسلوب حياة تستند إلى طقوس المكان وإيقاع الطباعة وأغلفة الحملة وتسلسل اجتماعي هادئ.",
    },
    services: ["creativeDirection", "printDesign", "socialMediaDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "kinfolk",
      scene: "campaign",
      alt: {
        en: "KINFOLK CONCEPT campaign cover with poster, invitation, and sleeve mockups.",
        ar: "غلاف KINFOLK CONCEPT مع ملصق، دعوة، ونماذج أغلفة.",
      },
    },
    heroImage: {
      variant: "kinfolk",
      scene: "hero",
      alt: {
        en: "KINFOLK CONCEPT lifestyle campaign hero with layered print pieces and campaign cards.",
        ar: "مشهد KINFOLK CONCEPT لحملة أسلوب حياة مع قطع مطبوعة متراكبة وبطاقات حملة.",
      },
    },
    gallery: [
      { variant: "kinfolk", scene: "print", alt: { en: "Campaign poster and invitation print suite.", ar: "ملصق حملة ومجموعة دعوات مطبوعة." } },
      { variant: "kinfolk", scene: "editorial", alt: { en: "Lookbook opening and feature spread.", ar: "افتتاحية كتيب وصفحة مميزة." } },
      { variant: "kinfolk", scene: "social", alt: { en: "Story cards and calm launch sequence.", ar: "بطاقات قصص وتسلسل إطلاق هادئ." } },
      { variant: "kinfolk", scene: "packaging", alt: { en: "Campaign sleeve, printed wrap, and insert cards.", ar: "غلاف حملة، ورق تغليف، وبطاقات إدخال." } },
    ],
    caseStudy: {
      context: {
        en: "The case study shows how campaign design can connect print pieces, lifestyle imagery, and social rhythm.",
        ar: "توضح الدراسة كيف يربط تصميم الحملة بين القطع المطبوعة والصور الحياتية والإيقاع الاجتماعي.",
      },
      direction: {
        en: "The system uses collected paper, a quiet poster grid, moss-green fields, and soft rose campaign marks for a composed domestic mood.",
        ar: "يستخدم النظام ورقاً متراكماً، شبكة ملصقات هادئة، مساحات خضراء داكنة، وعلامات وردية ناعمة لمزاج منزلي منسق.",
      },
      applications: [
        { en: "Campaign poster and invitation", ar: "ملصق ودعوة الحملة" },
        { en: "Lookbook spread and story opener", ar: "صفحة كتيب وافتتاحية قصة" },
        { en: "Social story sequence", ar: "تسلسل قصص اجتماعية" },
        { en: "Printed campaign sleeve", ar: "غلاف حملة مطبوع" },
      ],
      outcome: {
        en: "A composed campaign world that carries from invitation print to story cards and tactile packaging.",
        ar: "عالم حملة متماسك ينتقل من الدعوات المطبوعة إلى بطاقات القصص والتغليف الملموس.",
      },
    },
    colorPalette: ["#F1EAE1", "#D0BCA4", "#B88A80", "#6E7B62", "#30362E"],
    typography: {
      display: "Editorial New",
      body: "Suisse Int'l",
    },
    quote: {
      en: "A campaign world designed to feel collected, not crowded.",
      ar: "عالم حملة يبدو منسقاً لا مزدحماً.",
    },
  },
  {
    title: "LUNA",
    slug: "luna",
    year: "2025",
    category: "socialMedia",
    projectType: {
      en: "Social Media System",
      ar: "نظام تواصل اجتماعي",
    },
    shortDescription: {
      en: "A social identity system with modular launch posts, story frames, profile graphics, and campaign rhythm.",
      ar: "نظام هوية اجتماعي مع منشورات إطلاق مرنة، إطارات قصص، رسومات ملف، وإيقاع حملة.",
    },
    fullDescription: {
      en: "LUNA is a social media system for a soft lifestyle brand. It shows how a visual language can move through feed modules, stories, reels covers, and campaign cards while staying recognizable without repeating one layout.",
      ar: "تقدم LUNA نظام تواصل اجتماعي لعلامة أسلوب حياة ناعمة. يوضح كيف تنتقل اللغة البصرية عبر وحدات المنشورات والقصص وأغلفة الريلز وبطاقات الحملة مع الحفاظ على التعرّف دون تكرار تخطيط واحد.",
    },
    services: ["socialMediaDesign", "graphicDesign", "creativeDirection"],
    credits: conceptCredits,
    coverImage: {
      variant: "luna",
      scene: "social",
      alt: {
        en: "LUNA cover showing a modular social grid and story templates.",
        ar: "غلاف LUNA يعرض شبكة اجتماعية مرنة وقوالب قصص.",
      },
    },
    heroImage: {
      variant: "luna",
      scene: "hero",
      alt: {
        en: "LUNA hero with social media modules, profile cards, and campaign tiles.",
        ar: "مشهد LUNA الرئيسي مع وحدات تواصل، بطاقات ملف، وبلاطات حملة.",
      },
    },
    gallery: [
      { variant: "luna", scene: "social", alt: { en: "Feed grid, story templates, and reel cover system.", ar: "شبكة منشورات، قوالب قصص، ونظام أغلفة ريلز." } },
      { variant: "luna", scene: "campaign", alt: { en: "Launch campaign cards and seasonal content set.", ar: "بطاقات حملة إطلاق ومجموعة محتوى موسمية." } },
      { variant: "luna", scene: "editorial", alt: { en: "Content guide spread with hierarchy and caption rules.", ar: "صفحة دليل محتوى مع هرمية وقواعد تعليقات." } },
      { variant: "luna", scene: "materials", alt: { en: "Template library and visual asset tokens.", ar: "مكتبة قوالب ورموز أصول بصرية." } },
    ],
    caseStudy: {
      context: {
        en: "The project builds a social system that stays flexible across formats while preserving a recognizable visual rhythm.",
        ar: "تبني الدراسة نظاماً اجتماعياً مرناً عبر الصيغ مع الحفاظ على إيقاع بصري واضح.",
      },
      direction: {
        en: "The system is built from soft modules, profile seals, large quiet fields, and a feed grid that shifts proportion instead of repeating one template.",
        ar: "يبنى النظام من وحدات ناعمة، أختام ملف، مساحات هادئة كبيرة، وشبكة منشورات تغيّر النسب بدلاً من تكرار قالب واحد.",
      },
      applications: [
        { en: "Feed post and carousel templates", ar: "قوالب منشورات وسلاسل" },
        { en: "Story frames and highlight covers", ar: "إطارات قصص وأغلفة هايلايت" },
        { en: "Profile graphics and reel covers", ar: "رسومات ملف وأغلفة ريلز" },
        { en: "Launch campaign grid", ar: "شبكة حملة إطلاق" },
      ],
      outcome: {
        en: "A modular social identity with enough structure for launch campaigns, recurring posts, and profile moments.",
        ar: "هوية اجتماعية مرنة ببنية تكفي لحملات الإطلاق والمنشورات المتكررة ولحظات الملف التعريفي.",
      },
    },
    colorPalette: ["#F8F0EA", "#E0A8A2", "#C6D0BD", "#7D8C75", "#3F443C"],
    typography: {
      display: "GT America",
      body: "ABC Diatype",
    },
    quote: {
      en: "A social system with enough structure to feel branded and enough air to stay alive.",
      ar: "نظام اجتماعي يملك بنية تكفي للتميّز وهواءً يكفي للحياة.",
    },
  },
  {
    title: "ATELIER",
    slug: "atelier",
    year: "2025",
    category: "branding",
    projectType: {
      en: "Fashion Identity",
      ar: "هوية أزياء",
    },
    shortDescription: {
      en: "A fashion identity study with garment tags, lookbook spreads, invitation cards, and boutique packaging.",
      ar: "مفهوم هوية أزياء مع بطاقات ملابس، صفحات لوك بوك، دعوات، وتغليف بوتيك.",
    },
    fullDescription: {
      en: "ATELIER is a fashion identity study for a quiet boutique world. The system uses garment labels, soft charcoal, blush tissue, and disciplined lookbook layouts.",
      ar: "تقدم ATELIER دراسة هوية أزياء لعالم بوتيك هادئ. يستخدم النظام بطاقات الملابس، فحماً ناعماً، ورقاً وردياً، وتخطيطات لوك بوك منضبطة.",
    },
    services: ["brandIdentity", "creativeDirection", "printDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "atelier",
      scene: "stationery",
      alt: {
        en: "ATELIER cover with garment tags, boutique cards, and tissue wrap.",
        ar: "غلاف ATELIER مع بطاقات ملابس، بطاقات بوتيك، وورق تغليف.",
      },
    },
    heroImage: {
      variant: "atelier",
      scene: "hero",
      alt: {
        en: "ATELIER hero with fashion identity cards, lookbook, tags, and packaging.",
        ar: "مشهد ATELIER الرئيسي مع بطاقات هوية أزياء، لوك بوك، علامات، وتغليف.",
      },
    },
    gallery: [
      { variant: "atelier", scene: "stationery", alt: { en: "Garment tags, appointment cards, and boutique stationery.", ar: "بطاقات ملابس، بطاقات مواعيد، وقرطاسية بوتيك." } },
      { variant: "atelier", scene: "editorial", alt: { en: "Lookbook spread and collection notes.", ar: "صفحة لوك بوك وملاحظات مجموعة." } },
      { variant: "atelier", scene: "packaging", alt: { en: "Tissue wrap, garment sleeve, and receipt folder.", ar: "ورق تغليف، غلاف ملابس، وملف إيصال." } },
      { variant: "atelier", scene: "social", alt: { en: "Collection launch social cards.", ar: "بطاقات اجتماعية لإطلاق المجموعة." } },
    ],
    caseStudy: {
      context: {
        en: "The project studies a fashion identity that needs to feel tactile, precise, and editorial across small branded objects.",
        ar: "تدرس الحالة هوية أزياء تحتاج أن تبدو ملموسة ودقيقة وتحريرية عبر أشياء صغيرة تحمل العلامة.",
      },
      direction: {
        en: "The direction contrasts charcoal garment marks with rose tissue, fine label rules, and restrained lookbook spreads.",
        ar: "يقارن الاتجاه بين علامات ملابس فحمية وورق وردي، خطوط ملصقات دقيقة، وصفحات لوك بوك هادئة.",
      },
      applications: [
        { en: "Garment label and hang tag suite", ar: "ملصق ملابس ومجموعة بطاقات تعليق" },
        { en: "Lookbook spread and collection invitation", ar: "صفحة لوك بوك ودعوة مجموعة" },
        { en: "Boutique wrap and sleeve packaging", ar: "تغليف بوتيك وغلاف ملابس" },
        { en: "Collection social launch set", ar: "مجموعة إطلاق اجتماعية للمجموعة" },
      ],
      outcome: {
        en: "A boutique identity that moves gracefully across garment details, invitation print, packaging, and lookbook pages.",
        ar: "هوية بوتيك تنتقل برشاقة بين تفاصيل الملابس والدعوات المطبوعة والتغليف وصفحات اللوك بوك.",
      },
    },
    colorPalette: ["#F4ECE9", "#DAB4B1", "#9F6865", "#596153", "#24251F"],
    typography: {
      display: "Didot",
      body: "Helvetica Neue",
    },
    quote: {
      en: "A fashion identity that behaves like a garment detail, quiet until it is close.",
      ar: "هوية أزياء تتصرف كتفصيل في الثوب، هادئة حتى تقترب.",
    },
  },
  {
    title: "MONOLITH",
    slug: "monolith",
    year: "2025",
    category: "branding",
    projectType: {
      en: "Architectural Branding",
      ar: "هوية معمارية",
    },
    shortDescription: {
      en: "An architectural identity with facade signage, planning documents, wayfinding cards, and presentation boards.",
      ar: "هوية معمارية مع لافتات واجهات، وثائق تخطيط، بطاقات إرشاد، وألواح عرض.",
    },
    fullDescription: {
      en: "MONOLITH is an architecture studio identity study with a grounded visual voice: stone-toned paper, precise signage, project folders, and presentation boards for built-environment work.",
      ar: "تقدم MONOLITH دراسة هوية لاستوديو معماري بصوت بصري ثابت يجمع ورقاً بدرجات حجرية، لافتات دقيقة، ملفات مشاريع، وألواح عرض لأعمال البيئة المبنية.",
    },
    services: ["brandIdentity", "graphicDesign", "printDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "monolith",
      scene: "signage",
      alt: {
        en: "MONOLITH cover with architectural signage, folder, and grid boards.",
        ar: "غلاف MONOLITH مع لافتة معمارية، ملف، وألواح شبكية.",
      },
    },
    heroImage: {
      variant: "monolith",
      scene: "hero",
      alt: {
        en: "MONOLITH architectural branding hero with signage panels and presentation documents.",
        ar: "مشهد MONOLITH الرئيسي مع لوحات لافتات ووثائق عرض.",
      },
    },
    gallery: [
      { variant: "monolith", scene: "signage", alt: { en: "Facade signage, wayfinding plate, and grid system.", ar: "لافتة واجهة، لوحة إرشاد، ونظام شبكة." } },
      { variant: "monolith", scene: "print", alt: { en: "Project folder, specification sheet, and presentation board.", ar: "ملف مشروع، ورقة مواصفات، ولوحة عرض." } },
      { variant: "monolith", scene: "editorial", alt: { en: "Architecture profile spread and project index.", ar: "صفحة ملف معماري وفهرس مشروع." } },
      { variant: "monolith", scene: "materials", alt: { en: "Stone paper, graphite ink, and signage material study.", ar: "ورق حجري، حبر جرافيتي، ودراسة خامات لافتات." } },
    ],
    caseStudy: {
      context: {
        en: "The case study considers how a graphic identity can support architectural precision without becoming cold or corporate.",
        ar: "تدرس الحالة كيف تدعم الهوية الجرافيكية الدقة المعمارية دون أن تصبح باردة أو مؤسسية.",
      },
      direction: {
        en: "The system uses slab-like fields, measured rules, architectural grids, and a muted stone palette balanced by soft paper warmth.",
        ar: "يستخدم النظام مساحات تشبه الكتل، خطوطاً مقاسة، شبكات معمارية، ولوحة حجرية مكتومة متوازنة مع دفء الورق.",
      },
      applications: [
        { en: "Facade sign and wayfinding plate", ar: "لافتة واجهة ولوحة إرشاد" },
        { en: "Project folder and specification sheet", ar: "ملف مشروع وورقة مواصفات" },
        { en: "Presentation board system", ar: "نظام ألواح عرض" },
        { en: "Studio profile spread", ar: "صفحة ملف الاستوديو" },
      ],
      outcome: {
        en: "A grounded system for signage, folders, specification sheets, and presentation boards.",
        ar: "نظام ثابت للافتات والملفات وأوراق المواصفات وألواح العرض.",
      },
    },
    colorPalette: ["#EFEAE2", "#C7BBAA", "#A0746D", "#6B7466", "#2C302A"],
    typography: {
      display: "Neue Montreal",
      body: "Untitled Sans",
    },
    quote: {
      en: "A grounded identity where rules, paper, and signage carry the architecture.",
      ar: "هوية ثابتة تحمل فيها الخطوط، الورق، واللافتات روح العمارة.",
    },
  },
  {
    title: "SORA",
    slug: "sora",
    year: "2024",
    category: "branding",
    projectType: {
      en: "Cafe Branding",
      ar: "هوية مقهى",
    },
    shortDescription: {
      en: "A cafe identity with menu design, coffee bag labels, takeaway packaging, loyalty cards, and social launch pieces.",
      ar: "هوية مقهى مع تصميم قائمة، ملصقات أكياس قهوة، تغليف طلبات خارجية، بطاقات ولاء، وقطع إطلاق اجتماعية.",
    },
    fullDescription: {
      en: "SORA is a cafe identity study built around hospitality touchpoints. It combines soft morning colors, menu hierarchy, coffee packaging, loyalty print, and a warm social launch system.",
      ar: "تقدم SORA دراسة هوية مقهى مبنية حول نقاط الضيافة. تجمع بين ألوان صباحية ناعمة، هرمية قائمة، تغليف قهوة، مطبوعات ولاء، ونظام إطلاق اجتماعي دافئ.",
    },
    services: ["brandIdentity", "packagingDesign", "socialMediaDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "sora",
      scene: "packaging",
      alt: {
        en: "SORA cafe cover with coffee bag, menu card, and takeaway label.",
        ar: "غلاف SORA مع كيس قهوة، بطاقة قائمة، وملصق طلبات خارجية.",
      },
    },
    heroImage: {
      variant: "sora",
      scene: "hero",
      alt: {
        en: "SORA cafe branding hero with menu, packaging, loyalty card, and social tile.",
        ar: "مشهد SORA الرئيسي مع قائمة، تغليف، بطاقة ولاء، وبلاطة اجتماعية.",
      },
    },
    gallery: [
      { variant: "sora", scene: "packaging", alt: { en: "Coffee bag label, cup sleeve, and takeaway seal.", ar: "ملصق كيس قهوة، غلاف كوب، وختم طلب خارجي." } },
      { variant: "sora", scene: "print", alt: { en: "Menu card, loyalty stamp card, and receipt folder.", ar: "بطاقة قائمة، بطاقة ولاء، وملف إيصال." } },
      { variant: "sora", scene: "social", alt: { en: "Cafe opening announcement and seasonal social grid.", ar: "إعلان افتتاح مقهى وشبكة اجتماعية موسمية." } },
      { variant: "sora", scene: "materials", alt: { en: "Label stock, cup paper, and warm color swatches.", ar: "خامة ملصق، ورق كوب، وعينات ألوان دافئة." } },
    ],
    caseStudy: {
      context: {
        en: "The project shapes a hospitality brand system that works quickly across menu, packaging, and social details.",
        ar: "تصوغ الدراسة نظام علامة ضيافة يعمل بوضوح عبر القائمة والتغليف والتفاصيل الاجتماعية.",
      },
      direction: {
        en: "The identity uses a soft cafe seal, warm printed labels, clear menu rhythm, and small repeatable marks for daily use.",
        ar: "تستخدم الهوية ختم مقهى ناعماً، ملصقات مطبوعة دافئة، إيقاع قائمة واضح، وعلامات صغيرة قابلة للتكرار للاستخدام اليومي.",
      },
      applications: [
        { en: "Menu and loyalty print suite", ar: "قائمة ومجموعة مطبوعات ولاء" },
        { en: "Coffee bag and cup sleeve packaging", ar: "تغليف أكياس قهوة وأغلفة أكواب" },
        { en: "Takeaway sticker and receipt card", ar: "ملصق طلب خارجي وبطاقة إيصال" },
        { en: "Opening social system", ar: "نظام اجتماعي للافتتاح" },
      ],
      outcome: {
        en: "A warm cafe identity with a clear menu voice, tactile packaging, and a flexible launch system.",
        ar: "هوية مقهى دافئة بصوت واضح للقائمة وتغليف ملموس ونظام إطلاق مرن.",
      },
    },
    colorPalette: ["#F5ECE4", "#DDB59F", "#B77768", "#9DA98B", "#4C5948"],
    typography: {
      display: "Cooper BT",
      body: "Akzidenz-Grotesk",
    },
    quote: {
      en: "A cafe identity that feels calm before the first cup is poured.",
      ar: "هوية مقهى تبدو هادئة قبل صب أول كوب.",
    },
  },
  {
    title: "FORMA",
    slug: "forma",
    year: "2024",
    category: "branding",
    projectType: {
      en: "Furniture Identity",
      ar: "هوية أثاث",
    },
    shortDescription: {
      en: "A furniture identity with product cards, material swatches, assembly notes, and catalog spreads.",
      ar: "هوية أثاث مع بطاقات منتج، عينات مواد، ملاحظات تركيب، وصفحات كتالوج.",
    },
    fullDescription: {
      en: "FORMA is a furniture identity study for quiet modular objects. It brings a product-led perspective through material cards, catalog systems, assembly inserts, and restrained social layouts.",
      ar: "تقدم FORMA دراسة هوية أثاث لقطع معيارية هادئة. تعرض منظوراً موجهاً بالمنتج عبر بطاقات مواد وأنظمة كتالوج وإدخالات تركيب وتخطيطات اجتماعية هادئة.",
    },
    services: ["brandIdentity", "editorialDesign", "printDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "forma",
      scene: "materials",
      alt: {
        en: "FORMA cover with furniture material cards, catalog page, and object label.",
        ar: "غلاف FORMA مع بطاقات مواد أثاث، صفحة كتالوج، وملصق قطعة.",
      },
    },
    heroImage: {
      variant: "forma",
      scene: "hero",
      alt: {
        en: "FORMA furniture identity hero with material swatches, catalog layouts, and product cards.",
        ar: "مشهد FORMA الرئيسي مع عينات مواد، تخطيطات كتالوج، وبطاقات منتج.",
      },
    },
    gallery: [
      { variant: "forma", scene: "materials", alt: { en: "Wood, textile, and finish swatch cards.", ar: "بطاقات عينات خشب، قماش، وتشطيبات." } },
      { variant: "forma", scene: "editorial", alt: { en: "Furniture catalog spread and product index.", ar: "صفحة كتالوج أثاث وفهرس منتجات." } },
      { variant: "forma", scene: "print", alt: { en: "Assembly note, care card, and product certificate.", ar: "ملاحظة تركيب، بطاقة عناية، وشهادة منتج." } },
      { variant: "forma", scene: "social", alt: { en: "Product launch social cards and room-detail crop system.", ar: "بطاقات إطلاق منتج ونظام لقطات تفاصيل غرفة." } },
    ],
    caseStudy: {
      context: {
        en: "The project explores a furniture identity that needs to translate material, proportion, and product information clearly.",
        ar: "تستكشف الدراسة هوية أثاث تحتاج إلى ترجمة المادة والنسبة ومعلومات المنتج بوضوح.",
      },
      direction: {
        en: "The direction uses warm neutral stock, modular product cards, material swatch geometry, and a calm catalog grid.",
        ar: "يستخدم الاتجاه ورقاً دافئاً، بطاقات منتج معيارية، هندسة عينات مواد، وشبكة كتالوج هادئة.",
      },
      applications: [
        { en: "Product card and material swatches", ar: "بطاقة منتج وعينات مواد" },
        { en: "Catalog spread and index", ar: "صفحة كتالوج وفهرس" },
        { en: "Assembly and care inserts", ar: "إدخالات تركيب وعناية" },
        { en: "Launch social templates", ar: "قوالب إطلاق اجتماعية" },
      ],
      outcome: {
        en: "A measured identity system for material samples, product literature, assembly inserts, and launch layouts.",
        ar: "نظام هوية متزن لعينات المواد والمطبوعات التعريفية وإدخالات التركيب وتخطيطات الإطلاق.",
      },
    },
    colorPalette: ["#F3EDE5", "#D1BCA6", "#B98276", "#87927A", "#343832"],
    typography: {
      display: "Sohne",
      body: "Lyon Text",
    },
    quote: {
      en: "A furniture system where material samples become the identity language.",
      ar: "نظام أثاث تتحول فيه عينات المادة إلى لغة الهوية.",
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
