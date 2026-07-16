import type { Project } from "../types";

const conceptCredits = {
  en: "Independent Concept",
  ar: "مفهوم مستقل",
};

export const projects: Project[] = [
  {
    title: "FLORA",
    slug: "flora",
    year: "2026",
    category: "branding",
    projectType: {
      en: "Botanical Brand Identity",
      ar: "هوية بصرية نباتية",
    },
    shortDescription: {
      en: "A botanical identity for a paper goods studio, built from pressed flowers, soft stationery, and quiet packaging.",
      ar: "هوية نباتية لاستوديو قرطاسية، مبنية من الزهور المضغوطة، القرطاسية الناعمة، والتغليف الهادئ.",
    },
    fullDescription: {
      en: "FLORA is a botanical identity study for a stationery studio shaped around cards, wrapping paper, and gift notes. The system uses pressed-paper texture, soft sage, dusty rose, and a generous serif voice to make the brand feel handmade but precise.",
      ar: "تقدم FLORA دراسة هوية نباتية لاستوديو قرطاسية يصمم بطاقات وورق تغليف وملاحظات هدايا. يعتمد النظام على ملمس الورق المضغوط، الأخضر الهادئ، الوردي الترابي، وخط تحريري رحب ليبدو العمل يدوياً ودقيقاً في الوقت نفسه.",
    },
    services: ["brandIdentity", "printDesign", "packagingDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "flora",
      scene: "cover",
      alt: {
        en: "FLORA cover mockup with botanical stationery, embossed cards, and pressed paper.",
        ar: "غلاف FLORA مع قرطاسية نباتية، بطاقات بارزة، وورق مضغوط.",
      },
    },
    heroImage: {
      variant: "flora",
      scene: "hero",
      alt: {
        en: "FLORA hero still life with stationery, floral marks, ribbon, and paper packaging.",
        ar: "مشهد رئيسي لـ FLORA مع قرطاسية، علامات نباتية، شريط، وتغليف ورقي.",
      },
    },
    gallery: [
      { variant: "flora", scene: "stationery", alt: { en: "Letterhead, note cards, and envelope system.", ar: "نظام أوراق، بطاقات، ومغلفات." } },
      { variant: "flora", scene: "packaging", alt: { en: "Botanical wrap, label, and gift sleeve packaging.", ar: "تغليف نباتي، ملصق، وغلاف هدية." } },
      { variant: "flora", scene: "print", alt: { en: "Printed cards and small paper insert set.", ar: "بطاقات مطبوعة ومجموعة إدخالات ورقية صغيرة." } },
      { variant: "flora", scene: "materials", alt: { en: "Paper stock, pressed-petal color swatches, and tactile details.", ar: "خامات ورق، عينات ألوان بتلات، وتفاصيل ملموسة." } },
    ],
    caseStudy: {
      context: {
        en: "The project explores how a gentle botanical identity can feel complete across stationery, product packaging, and print touchpoints without becoming ornamental.",
        ar: "تستكشف الدراسة كيف تبدو الهوية النباتية مكتملة عبر القرطاسية والتغليف ونقاط التلامس المطبوعة دون أن تصبح زخرفية.",
      },
      direction: {
        en: "The visual language centers on pressed-paper edges, a soft monogram, herbarium-inspired layouts, and a calm relationship between blush and sage.",
        ar: "ترتكز اللغة البصرية على حواف الورق المضغوط، مونوغرام ناعم، تخطيطات مستوحاة من الأعشاب، وعلاقة هادئة بين الوردي والأخضر.",
      },
      applications: [
        { en: "Embossed stationery and envelope suite", ar: "قرطاسية ومغلفات بتفاصيل بارزة" },
        { en: "Gift wrap, sleeve labels, and hang tags", ar: "ورق تغليف، ملصقات، وبطاقات تعليق" },
        { en: "Mini print catalog and care cards", ar: "كتالوج مطبوع صغير وبطاقات عناية" },
        { en: "Launch social templates with botanical crop details", ar: "قوالب إطلاق للتواصل مع تفاصيل نباتية مقربة" },
      ],
      outcome: {
        en: "A quiet identity system with enough range for packaging, stationery, print inserts, and a soft launch presence.",
        ar: "نظام هوية هادئ يمتد إلى التغليف والقرطاسية والإدخالات المطبوعة وحضور إطلاق ناعم.",
      },
    },
    colorPalette: ["#F7EFE9", "#E9C7C6", "#C97F7A", "#A9B39B", "#5D715F"],
    typography: {
      display: "Reckless Neue",
      body: "Avenir Next",
    },
    quote: {
      en: "A botanical identity where the paper, not decoration, carries the softness.",
      ar: "هوية نباتية تحمل نعومتها من الورق لا من الزخرفة.",
    },
  },
  {
    title: "AURORA",
    slug: "aurora",
    year: "2026",
    category: "packaging",
    projectType: {
      en: "Luxury Skincare Packaging",
      ar: "تغليف عناية فاخرة",
    },
    shortDescription: {
      en: "A skincare packaging system with glass jars, refill cartons, ritual cards, and a soft launch campaign.",
      ar: "نظام تغليف للعناية بالبشرة مع عبوات زجاجية، علب إعادة تعبئة، بطاقات طقوس، وحملة إطلاق ناعمة.",
    },
    fullDescription: {
      en: "AURORA is a skincare packaging study built around luxury product storytelling. It pairs frosted glass, refill sleeves, quiet gradients of rose and mineral green, and editorial product cards for a calm morning-routine brand world.",
      ar: "تقدم AURORA دراسة تغليف للعناية بالبشرة مبنية حول سرد المنتج الفاخر. تجمع بين الزجاج المعتّم، أغلفة إعادة التعبئة، تدرجات وردية وخضراء معدنية هادئة، وبطاقات منتج تحريرية لعالم صباحي رقيق.",
    },
    services: ["packagingDesign", "creativeDirection", "printDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "aurora",
      scene: "packaging",
      alt: {
        en: "AURORA cover with skincare carton, jar seal, and refill packaging.",
        ar: "غلاف AURORA مع علبة عناية، ختم عبوة، وتغليف إعادة تعبئة.",
      },
    },
    heroImage: {
      variant: "aurora",
      scene: "hero",
      alt: {
        en: "AURORA luxury skincare hero mockup with cartons, label cards, and glass forms.",
        ar: "مشهد AURORA الرئيسي بتغليف عناية فاخر، بطاقات ملصقات، وأشكال زجاجية.",
      },
    },
    gallery: [
      { variant: "aurora", scene: "packaging", alt: { en: "Serum carton, jar label, and refill sleeve system.", ar: "علبة سيروم، ملصق عبوة، ونظام أغلفة إعادة التعبئة." } },
      { variant: "aurora", scene: "editorial", alt: { en: "Ingredient story cards and product education spread.", ar: "بطاقات قصة المكونات وصفحة تعريف بالمنتج." } },
      { variant: "aurora", scene: "social", alt: { en: "Soft ritual social launch grid.", ar: "شبكة إطلاق اجتماعية بطابع طقوس ناعم." } },
      { variant: "aurora", scene: "materials", alt: { en: "Frosted glass, label stock, and carton color study.", ar: "زجاج معتّم، خامة ملصق، ودراسة ألوان العلب." } },
    ],
    caseStudy: {
      context: {
        en: "The case study explores a premium product system that needs to feel quiet, clean, and tactile across small packaging surfaces.",
        ar: "تستكشف الدراسة نظام منتج فاخر يحتاج أن يبدو هادئاً ونظيفاً وملموساً عبر مساحات تغليف صغيرة.",
      },
      direction: {
        en: "The direction uses pale rose light, mineral green, fine product rules, and a jar seal that can scale from packaging to campaign layouts.",
        ar: "يستخدم الاتجاه ضوءاً وردياً شاحباً، أخضر معدنياً، خطوط منتج دقيقة، وختم عبوة يمكن توسيعه من التغليف إلى تخطيطات الحملة.",
      },
      applications: [
        { en: "Primary carton, refill sleeve, and jar label", ar: "علبة رئيسية، غلاف إعادة تعبئة، وملصق عبوة" },
        { en: "Ingredient education cards", ar: "بطاقات تعريف بالمكونات" },
        { en: "Launch campaign story panels", ar: "لوحات سرد لحملة الإطلاق" },
        { en: "Social templates for routine and product pairings", ar: "قوالب اجتماعية للروتين وتركيبات المنتج" },
      ],
      outcome: {
        en: "A refined packaging language that connects primary cartons, ritual cards, social launch assets, and material details.",
        ar: "لغة تغليف مصقولة تربط العلب الرئيسية وبطاقات الطقوس ومواد الإطلاق الاجتماعي وتفاصيل الخامات.",
      },
    },
    colorPalette: ["#FAF1ED", "#E7B8B9", "#D58A81", "#B8C0A9", "#516254"],
    typography: {
      display: "Optima",
      body: "Neue Haas Grotesk",
    },
    quote: {
      en: "A skincare world built from restraint, surface, and a sense of morning light.",
      ar: "عالم عناية مبني من الهدوء، السطح، وإحساس ضوء الصباح.",
    },
  },
  {
    title: "ELYSIAN",
    slug: "elysian",
    year: "2026",
    category: "editorial",
    projectType: {
      en: "Editorial Magazine Design",
      ar: "تصميم مجلة تحريرية",
    },
    shortDescription: {
      en: "A culture magazine study with cover systems, feature spreads, column rhythm, and print inserts.",
      ar: "مفهوم مجلة ثقافية مع أنظمة أغلفة، صفحات مقالات، إيقاع أعمدة، وإدخالات مطبوعة.",
    },
    fullDescription: {
      en: "ELYSIAN is a magazine design study for culture, interiors, and slow travel. It presents long-form editorial hierarchy through covers, feature openings, pull quotes, and small print inserts.",
      ar: "تقدم ELYSIAN دراسة تصميم مجلة للثقافة والمساحات الداخلية والسفر الهادئ. تعرض هرمية تحريرية طويلة عبر الأغلفة وافتتاحيات المقالات والاقتباسات البارزة والإدخالات المطبوعة الصغيرة.",
    },
    services: ["editorialDesign", "printDesign", "graphicDesign"],
    credits: conceptCredits,
    coverImage: {
      variant: "elysian",
      scene: "editorial",
      alt: {
        en: "ELYSIAN magazine cover and feature spread mockup.",
        ar: "غلاف مجلة ELYSIAN ونموذج صفحة مقال.",
      },
    },
    heroImage: {
      variant: "elysian",
      scene: "hero",
      alt: {
        en: "ELYSIAN editorial hero with open spreads, cover boards, and column layouts.",
        ar: "مشهد ELYSIAN الرئيسي مع صفحات مفتوحة، ألواح أغلفة، وتخطيطات أعمدة.",
      },
    },
    gallery: [
      { variant: "elysian", scene: "editorial", alt: { en: "Feature spread and table-of-contents layout.", ar: "صفحة مقال وتخطيط فهرس." } },
      { variant: "elysian", scene: "print", alt: { en: "Printed inserts, subscription cards, and issue belly band.", ar: "إدخالات مطبوعة، بطاقات اشتراك، وشريط عدد." } },
      { variant: "elysian", scene: "social", alt: { en: "Digital issue announcement and quote templates.", ar: "إعلان عدد رقمي وقوالب اقتباسات." } },
      { variant: "elysian", scene: "materials", alt: { en: "Paper finish, ink palette, and editorial grid study.", ar: "تشطيب ورقي، لوحة حبر، ودراسة شبكة تحريرية." } },
    ],
    caseStudy: {
      context: {
        en: "The project studies magazine hierarchy at multiple scales: cover, feature, department pages, print inserts, and digital promotion.",
        ar: "تدرس الحالة هرمية المجلة عبر مستويات متعددة، من الغلاف والمقال إلى صفحات الأقسام والإدخالات المطبوعة والترويج الرقمي.",
      },
      direction: {
        en: "The layout system balances large serif headlines, quiet columns, warm paper, and editorial image windows simulated through locally drawn composition.",
        ar: "يوازن النظام بين عناوين كبيرة، أعمدة هادئة، ورق دافئ، ونوافذ صور تحريرية مرسومة محلياً.",
      },
      applications: [
        { en: "Issue cover architecture", ar: "بنية أغلفة الأعداد" },
        { en: "Feature opener and body spread", ar: "افتتاحية مقال وصفحة محتوى" },
        { en: "Subscription card and printed insert", ar: "بطاقة اشتراك وإدخال مطبوع" },
        { en: "Digital quote and launch templates", ar: "قوالب اقتباس وإطلاق رقمية" },
      ],
      outcome: {
        en: "An editorial system with a clear rhythm for covers, long-form features, subscriber pieces, and digital announcements.",
        ar: "نظام تحريري بإيقاع واضح للأغلفة والمقالات الطويلة وقطع الاشتراك والإعلانات الرقمية.",
      },
    },
    colorPalette: ["#F8F4EC", "#DDD2BD", "#C99D94", "#8F987D", "#31342E"],
    typography: {
      display: "Tiempos Headline",
      body: "Maison Neue",
    },
    quote: {
      en: "A magazine system that treats pacing as carefully as the cover.",
      ar: "نظام مجلة يتعامل مع الإيقاع بعناية الغلاف نفسها.",
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
