import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputRoot = join(process.cwd(), "public", "demo-projects");
const assetNames = ["cover", "hero", "gallery-1", "gallery-2", "gallery-3", "gallery-4"];

const projects = [
  {
    slug: "flora",
    title: "FLORA",
    subtitle: "Botanical paper studio",
    display: "Georgia",
    body: "Arial",
    palette: {
      bg: "#f4eee6",
      paper: "#fffaf4",
      ink: "#314039",
      muted: "#728070",
      accent: "#c87876",
      soft: "#e9cbc8",
      alt: "#aab59d",
      dark: "#536759",
      gold: "#b89a72",
    },
  },
  {
    slug: "aurora",
    title: "AURORA",
    subtitle: "Luxury skincare packaging",
    display: "Times New Roman",
    body: "Helvetica",
    palette: {
      bg: "#fbf0ec",
      paper: "#fff8f4",
      ink: "#4d5d52",
      muted: "#8b9181",
      accent: "#d68a84",
      soft: "#efc8c6",
      alt: "#bac6b5",
      dark: "#607264",
      gold: "#c6a879",
    },
  },
  {
    slug: "elysian",
    title: "ELYSIAN",
    subtitle: "Culture magazine system",
    display: "Georgia",
    body: "Arial",
    palette: {
      bg: "#f8f3eb",
      paper: "#fffaf2",
      ink: "#2f332e",
      muted: "#747b68",
      accent: "#c99b93",
      soft: "#ddd0bb",
      alt: "#8e997f",
      dark: "#343830",
      gold: "#b49565",
    },
  },
  {
    slug: "kinfolk-concept",
    title: "KINFOLK",
    subtitle: "Lifestyle campaign concept",
    display: "Georgia",
    body: "Helvetica",
    palette: {
      bg: "#f2ebe2",
      paper: "#fff7ee",
      ink: "#30362e",
      muted: "#727b65",
      accent: "#b88a80",
      soft: "#d3bea8",
      alt: "#6d7b62",
      dark: "#414a3a",
      gold: "#a8865e",
    },
  },
  {
    slug: "luna",
    title: "LUNA",
    subtitle: "Social media design system",
    display: "Arial",
    body: "Arial",
    palette: {
      bg: "#f8f0ea",
      paper: "#fff9f5",
      ink: "#3f443c",
      muted: "#747f70",
      accent: "#dfaaa3",
      soft: "#d8dfcf",
      alt: "#7d8c75",
      dark: "#4e5949",
      gold: "#b99b73",
    },
  },
  {
    slug: "atelier",
    title: "ATELIER",
    subtitle: "Fashion identity",
    display: "Didot",
    body: "Helvetica",
    palette: {
      bg: "#f4ece9",
      paper: "#fff9f7",
      ink: "#24251f",
      muted: "#686b60",
      accent: "#9f6865",
      soft: "#dab4b1",
      alt: "#596153",
      dark: "#303229",
      gold: "#b99c72",
    },
  },
  {
    slug: "monolith",
    title: "MONOLITH",
    subtitle: "Architectural branding",
    display: "Helvetica",
    body: "Arial",
    palette: {
      bg: "#efeae2",
      paper: "#fbf7ef",
      ink: "#2c302a",
      muted: "#676f63",
      accent: "#a0746d",
      soft: "#c7bbaa",
      alt: "#6b7466",
      dark: "#383d36",
      gold: "#a99168",
    },
  },
  {
    slug: "sora",
    title: "SORA",
    subtitle: "Cafe branding",
    display: "Georgia",
    body: "Arial",
    palette: {
      bg: "#f5ece4",
      paper: "#fff8ef",
      ink: "#4c5948",
      muted: "#7d866f",
      accent: "#b77768",
      soft: "#ddb59f",
      alt: "#9da98b",
      dark: "#586853",
      gold: "#bd9364",
    },
  },
  {
    slug: "forma",
    title: "FORMA",
    subtitle: "Furniture identity",
    display: "Helvetica",
    body: "Georgia",
    palette: {
      bg: "#f3ede5",
      paper: "#fff8ef",
      ink: "#343832",
      muted: "#777d70",
      accent: "#b98276",
      soft: "#d1bca6",
      alt: "#87927a",
      dark: "#454a42",
      gold: "#aa8c62",
    },
  },
  {
    slug: "noma",
    title: "NOMA",
    subtitle: "Artisan packaging",
    display: "Georgia",
    body: "Arial",
    palette: {
      bg: "#f2e7dc",
      paper: "#fff7ec",
      ink: "#2f342d",
      muted: "#737b67",
      accent: "#b36f62",
      soft: "#cfaf96",
      alt: "#718066",
      dark: "#46513f",
      gold: "#ad875c",
    },
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function n(value) {
  return Number(value.toFixed(2));
}

function seeded(seedText) {
  let seed = 2166136261;
  for (const char of seedText) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rotateGroup(x, y, width, height, rotate, content) {
  if (!rotate) {
    return content;
  }
  return `<g transform="rotate(${rotate} ${n(x + width / 2)} ${n(y + height / 2)})">${content}</g>`;
}

function paperNoise(width, height, random, palette) {
  const marks = [];
  for (let index = 0; index < 140; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const opacity = 0.025 + random() * 0.055;
    const length = 6 + random() * 22;
    const color = random() > 0.54 ? palette.ink : palette.accent;
    if (random() > 0.62) {
      marks.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(0.7 + random() * 1.6)}" fill="${color}" opacity="${n(opacity)}"/>`);
    } else {
      marks.push(`<rect x="${n(x)}" y="${n(y)}" width="${n(length)}" height="${n(0.8 + random() * 1.8)}" rx="1" fill="${color}" opacity="${n(opacity)}" transform="rotate(${n(random() * 180)} ${n(x)} ${n(y)})"/>`);
    }
  }
  return marks.join("");
}

function shadow(x, y, width, height, rotate = 0, opacity = 0.12) {
  return rotateGroup(
    x,
    y,
    width,
    height,
    rotate,
    `<ellipse cx="${n(x + width / 2)}" cy="${n(y + height * 0.96)}" rx="${n(width * 0.53)}" ry="${n(height * 0.1)}" fill="#1f211d" opacity="${opacity}"/>`,
  );
}

function labelLines(x, y, width, count, palette, color = palette.ink) {
  return Array.from({ length: count }, (_, index) => {
    const lineWidth = width * (0.38 + ((index * 0.19) % 0.52));
    return `<rect x="${n(x)}" y="${n(y + index * 22)}" width="${n(lineWidth)}" height="${index === 0 ? 3 : 2}" rx="2" fill="${color}" opacity="${index === 0 ? 0.42 : 0.22}"/>`;
  }).join("");
}

function card(x, y, width, height, options) {
  const {
    palette,
    rotate = 0,
    fill = palette.paper,
    title = "",
    subtitle = "",
    accent = palette.accent,
    dark = false,
    lines = 4,
    seal = false,
    rx = 10,
  } = options;
  const textColor = dark ? palette.paper : palette.ink;
  const content = `
    ${shadow(x + 16, y + 26, width, height, 0, 0.11)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}"/>
    <rect x="${n(x + 18)}" y="${n(y + 18)}" width="${n(width - 36)}" height="${n(height - 36)}" rx="${Math.max(4, rx - 5)}" fill="none" stroke="${textColor}" stroke-opacity="0.11"/>
    <rect x="${n(x + 34)}" y="${n(y + 42)}" width="${n(width * 0.22)}" height="4" rx="2" fill="${accent}" opacity="0.84"/>
    <text x="${n(x + 34)}" y="${n(y + height * 0.34)}" class="brand" fill="${textColor}" font-size="${n(Math.min(72, width * 0.12))}">${escapeXml(title)}</text>
    <text x="${n(x + 36)}" y="${n(y + height * 0.34 + 34)}" class="micro" fill="${textColor}" opacity="0.65">${escapeXml(subtitle)}</text>
    ${labelLines(x + 36, y + height * 0.58, width * 0.72, lines, palette, textColor)}
    ${seal ? `<circle cx="${n(x + width - 66)}" cy="${n(y + height - 70)}" r="35" fill="${accent}" opacity="0.86"/><text x="${n(x + width - 66)}" y="${n(y + height - 59)}" text-anchor="middle" class="micro" fill="${palette.paper}" font-size="20">${escapeXml(title.slice(0, 2))}</text>` : ""}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function envelope(x, y, width, height, options) {
  const { palette, rotate = 0, fill = palette.paper, title = "" } = options;
  const content = `
    ${shadow(x + 14, y + 20, width, height, 0, 0.1)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${fill}"/>
    <path d="M ${x} ${y + 8} L ${x + width / 2} ${y + height * 0.56} L ${x + width} ${y + 8}" fill="none" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="2"/>
    <path d="M ${x + 2} ${y + height - 8} L ${x + width * 0.42} ${y + height * 0.46}" fill="none" stroke="${palette.ink}" stroke-opacity="0.11" stroke-width="2"/>
    <path d="M ${x + width - 2} ${y + height - 8} L ${x + width * 0.58} ${y + height * 0.46}" fill="none" stroke="${palette.ink}" stroke-opacity="0.11" stroke-width="2"/>
    <text x="${n(x + width - 38)}" y="${n(y + height - 36)}" text-anchor="end" class="micro" fill="${palette.ink}" opacity="0.55">${escapeXml(title)}</text>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function botanicalStem(x, y, height, options) {
  const { palette, rotate = 0, scale = 1 } = options;
  const width = 160 * scale;
  const content = `
    <path d="M ${x} ${y + height} C ${x + 42 * scale} ${y + height * 0.7}, ${x - 20 * scale} ${y + height * 0.35}, ${x + 34 * scale} ${y}" fill="none" stroke="${palette.dark}" stroke-width="${2.2 * scale}" opacity="0.72"/>
    <ellipse cx="${n(x + 28 * scale)}" cy="${n(y + height * 0.35)}" rx="${n(34 * scale)}" ry="${n(13 * scale)}" fill="${palette.alt}" opacity="0.76" transform="rotate(-24 ${n(x + 28 * scale)} ${n(y + height * 0.35)})"/>
    <ellipse cx="${n(x - 16 * scale)}" cy="${n(y + height * 0.55)}" rx="${n(30 * scale)}" ry="${n(12 * scale)}" fill="${palette.soft}" opacity="0.74" transform="rotate(28 ${n(x - 16 * scale)} ${n(y + height * 0.55)})"/>
    <ellipse cx="${n(x + 40 * scale)}" cy="${n(y + height * 0.16)}" rx="${n(28 * scale)}" ry="${n(11 * scale)}" fill="${palette.accent}" opacity="0.52" transform="rotate(-20 ${n(x + 40 * scale)} ${n(y + height * 0.16)})"/>
  `;
  return rotateGroup(x - width / 2, y, width, height, rotate, content);
}

function box3d(x, y, width, height, depth, options) {
  const { palette, rotate = 0, fill = palette.paper, side = palette.soft, title = "", subtitle = "", accent = palette.accent } = options;
  const content = `
    ${shadow(x + 34, y + height + 8, width + depth, height * 0.28, 0, 0.14)}
    <polygon points="${x},${y} ${x + depth},${y - depth * 0.42} ${x + width + depth},${y - depth * 0.42} ${x + width},${y}" fill="${side}" opacity="0.96"/>
    <polygon points="${x + width},${y} ${x + width + depth},${y - depth * 0.42} ${x + width + depth},${y + height - depth * 0.42} ${x + width},${y + height}" fill="${palette.alt}" opacity="0.62"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${fill}"/>
    <rect x="${n(x + width * 0.14)}" y="${n(y + height * 0.16)}" width="${n(width * 0.16)}" height="5" rx="3" fill="${accent}"/>
    <text x="${n(x + width * 0.14)}" y="${n(y + height * 0.42)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.13)}">${escapeXml(title)}</text>
    <text x="${n(x + width * 0.15)}" y="${n(y + height * 0.42 + 32)}" class="micro" fill="${palette.ink}" opacity="0.56">${escapeXml(subtitle)}</text>
    ${labelLines(x + width * 0.15, y + height * 0.64, width * 0.62, 4, palette)}
  `;
  return rotateGroup(x, y - depth * 0.42, width + depth, height + depth * 0.42, rotate, content);
}

function jar(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", label = "", fill = "#f6f1ec" } = options;
  const content = `
    ${shadow(x + 18, y + height + 4, width, height * 0.2, 0, 0.14)}
    <ellipse cx="${n(x + width / 2)}" cy="${y + 24}" rx="${n(width / 2)}" ry="24" fill="${palette.paper}" opacity="0.82"/>
    <rect x="${x}" y="${y + 24}" width="${width}" height="${n(height - 48)}" rx="${n(width * 0.18)}" fill="${fill}" opacity="0.86"/>
    <ellipse cx="${n(x + width / 2)}" cy="${n(y + height - 24)}" rx="${n(width / 2)}" ry="24" fill="${palette.soft}" opacity="0.52"/>
    <rect x="${n(x + width * 0.18)}" y="${n(y + height * 0.42)}" width="${n(width * 0.64)}" height="${n(height * 0.26)}" rx="8" fill="${palette.paper}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.54)}" text-anchor="middle" class="brand" fill="${palette.ink}" font-size="${n(width * 0.16)}">${escapeXml(title)}</text>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.61)}" text-anchor="middle" class="micro" fill="${palette.ink}" opacity="0.58">${escapeXml(label)}</text>
    <rect x="${n(x + width * 0.22)}" y="${n(y + 6)}" width="${n(width * 0.56)}" height="38" rx="7" fill="${palette.dark}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function bottle(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", accent = palette.accent, fill = palette.paper } = options;
  const content = `
    ${shadow(x + 12, y + height + 4, width, height * 0.18, 0, 0.13)}
    <rect x="${n(x + width * 0.38)}" y="${y}" width="${n(width * 0.24)}" height="${n(height * 0.11)}" rx="8" fill="${palette.dark}"/>
    <rect x="${n(x + width * 0.3)}" y="${n(y + height * 0.1)}" width="${n(width * 0.4)}" height="${n(height * 0.09)}" rx="8" fill="${accent}"/>
    <rect x="${x}" y="${n(y + height * 0.18)}" width="${width}" height="${n(height * 0.82)}" rx="${n(width * 0.23)}" fill="${fill}" opacity="0.88"/>
    <rect x="${n(x + width * 0.18)}" y="${n(y + height * 0.44)}" width="${n(width * 0.64)}" height="${n(height * 0.28)}" rx="8" fill="${palette.paper}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.55)}" text-anchor="middle" class="brand" fill="${palette.ink}" font-size="${n(width * 0.13)}">${escapeXml(title)}</text>
    ${labelLines(x + width * 0.28, y + height * 0.61, width * 0.44, 3, palette)}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function tube(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 20, y + height + 2, width, height * 0.18, 0, 0.11)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${n(width * 0.45)}" fill="${palette.paper}"/>
    <rect x="${n(x + width * 0.18)}" y="${n(y + height * 0.08)}" width="${n(width * 0.64)}" height="${n(height * 0.11)}" rx="10" fill="${palette.soft}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.48)}" text-anchor="middle" class="brand" fill="${palette.ink}" font-size="${n(width * 0.16)}" transform="rotate(-90 ${n(x + width / 2)} ${n(y + height * 0.48)})">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.2)}" y="${n(y + height - 48)}" width="${n(width * 0.6)}" height="34" rx="7" fill="${palette.dark}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function magazineCover(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", issue = "", imageColor = palette.soft } = options;
  const content = `
    ${shadow(x + 20, y + 26, width, height, 0, 0.14)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" fill="${palette.paper}"/>
    <text x="${n(x + width * 0.08)}" y="${n(y + height * 0.15)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.15)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.08)}" y="${n(y + height * 0.22)}" width="${n(width * 0.84)}" height="${n(height * 0.42)}" rx="4" fill="${imageColor}"/>
    <path d="M ${n(x + width * 0.12)} ${n(y + height * 0.57)} C ${n(x + width * 0.32)} ${n(y + height * 0.42)}, ${n(x + width * 0.5)} ${n(y + height * 0.71)}, ${n(x + width * 0.86)} ${n(y + height * 0.39)}" fill="none" stroke="${palette.paper}" stroke-width="6" opacity="0.72"/>
    <text x="${n(x + width * 0.08)}" y="${n(y + height * 0.73)}" class="micro" fill="${palette.ink}" opacity="0.7">${escapeXml(issue)}</text>
    ${labelLines(x + width * 0.08, y + height * 0.8, width * 0.62, 4, palette)}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function spread(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", imageSide = "left" } = options;
  const gutter = width * 0.5;
  const imageX = imageSide === "left" ? x + 32 : x + gutter + 32;
  const copyX = imageSide === "left" ? x + gutter + 44 : x + 44;
  const content = `
    ${shadow(x + 18, y + 24, width, height, 0, 0.12)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" fill="${palette.paper}"/>
    <rect x="${n(x + gutter - 1)}" y="${n(y + 24)}" width="2" height="${n(height - 48)}" fill="${palette.ink}" opacity="0.12"/>
    <rect x="${n(imageX)}" y="${n(y + 40)}" width="${n(gutter - 70)}" height="${n(height - 80)}" rx="4" fill="${palette.soft}"/>
    <path d="M ${n(imageX + 18)} ${n(y + height * 0.62)} C ${n(imageX + gutter * 0.18)} ${n(y + height * 0.44)}, ${n(imageX + gutter * 0.38)} ${n(y + height * 0.73)}, ${n(imageX + gutter * 0.76)} ${n(y + height * 0.34)}" fill="none" stroke="${palette.paper}" stroke-width="5" opacity="0.72"/>
    <text x="${n(copyX)}" y="${n(y + 88)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.055)}">${escapeXml(title)}</text>
    ${labelLines(copyX, y + 138, gutter - 90, 9, palette)}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function poster(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", fill = palette.dark, light = false } = options;
  const text = light ? palette.ink : palette.paper;
  const content = `
    ${shadow(x + 18, y + 24, width, height, 0, 0.13)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="5" fill="${fill}"/>
    <text x="${n(x + width * 0.08)}" y="${n(y + height * 0.2)}" class="brand" fill="${text}" font-size="${n(width * 0.13)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.08)}" y="${n(y + height * 0.31)}" width="${n(width * 0.84)}" height="${n(height * 0.32)}" fill="${light ? palette.soft : palette.accent}" opacity="0.85"/>
    ${labelLines(x + width * 0.08, y + height * 0.72, width * 0.68, 4, palette, text)}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function phone(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const tile = width * 0.22;
  const tiles = Array.from({ length: 9 }, (_, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const fill = [palette.soft, palette.alt, palette.accent, palette.paper][index % 4];
    return `<rect x="${n(x + width * 0.13 + col * (tile + 10))}" y="${n(y + height * 0.25 + row * (tile + 10))}" width="${n(tile)}" height="${n(tile)}" rx="10" fill="${fill}" opacity="0.92"/>`;
  }).join("");
  const content = `
    ${shadow(x + 18, y + 26, width, height, 0, 0.14)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${n(width * 0.14)}" fill="${palette.dark}"/>
    <rect x="${n(x + 18)}" y="${n(y + 18)}" width="${n(width - 36)}" height="${n(height - 36)}" rx="${n(width * 0.11)}" fill="${palette.paper}"/>
    <text x="${n(x + width * 0.13)}" y="${n(y + height * 0.16)}" class="micro" fill="${palette.ink}" opacity="0.62">${escapeXml(title)}</text>
    ${tiles}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function socialTile(x, y, width, height, options) {
  const { palette, rotate = 0, title = "", fill = palette.paper, image = palette.soft } = options;
  const content = `
    ${shadow(x + 12, y + 18, width, height, 0, 0.09)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="14" fill="${fill}"/>
    <rect x="${n(x + 22)}" y="${n(y + 22)}" width="${n(width - 44)}" height="${n(height * 0.48)}" rx="10" fill="${image}"/>
    <text x="${n(x + 24)}" y="${n(y + height * 0.66)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.09)}">${escapeXml(title)}</text>
    ${labelLines(x + 24, y + height * 0.74, width * 0.68, 3, palette)}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function shoppingBag(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 18, y + height + 4, width, height * 0.22, 0, 0.12)}
    <path d="M ${x + 60} ${y + 44} C ${x + 70} ${y - 16}, ${x + width - 70} ${y - 16}, ${x + width - 60} ${y + 44}" fill="none" stroke="${palette.dark}" stroke-width="7" opacity="0.7"/>
    <rect x="${x}" y="${y + 40}" width="${width}" height="${height - 40}" rx="8" fill="${palette.paper}"/>
    <polygon points="${x + width},${y + 40} ${x + width + 42},${y + 70} ${x + width + 42},${y + height - 20} ${x + width},${y + height}" fill="${palette.soft}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.48)}" text-anchor="middle" class="brand" fill="${palette.ink}" font-size="${n(width * 0.15)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.3)}" y="${n(y + height * 0.55)}" width="${n(width * 0.4)}" height="4" rx="2" fill="${palette.accent}"/>
  `;
  return rotateGroup(x, y, width + 42, height, rotate, content);
}

function hangTag(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 12, y + 18, width, height, 0, 0.09)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" fill="${palette.paper}"/>
    <circle cx="${n(x + width / 2)}" cy="${n(y + 28)}" r="8" fill="${palette.bg}" stroke="${palette.ink}" stroke-opacity="0.18"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.54)}" text-anchor="middle" class="brand" fill="${palette.ink}" font-size="${n(width * 0.14)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.22)}" y="${n(y + height * 0.66)}" width="${n(width * 0.56)}" height="3" rx="2" fill="${palette.accent}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function coffeeBag(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 16, y + height + 10, width, height * 0.18, 0, 0.12)}
    <polygon points="${x},${y + 70} ${x + width * 0.5},${y} ${x + width},${y + 70} ${x + width},${y + height} ${x},${y + height}" fill="${palette.soft}"/>
    <rect x="${x}" y="${y + 66}" width="${width}" height="${n(height - 66)}" rx="8" fill="${palette.paper}"/>
    <rect x="${n(x + width * 0.18)}" y="${n(y + height * 0.36)}" width="${n(width * 0.64)}" height="${n(height * 0.27)}" rx="8" fill="${palette.dark}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.49)}" text-anchor="middle" class="brand" fill="${palette.paper}" font-size="${n(width * 0.13)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.36)}" y="${n(y + 36)}" width="${n(width * 0.28)}" height="18" rx="9" fill="${palette.accent}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function cup(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 12, y + height + 6, width, height * 0.16, 0, 0.11)}
    <path d="M ${x} ${y} H ${x + width} L ${x + width * 0.82} ${y + height} H ${x + width * 0.18} Z" fill="${palette.paper}"/>
    <rect x="${n(x + width * 0.13)}" y="${n(y + height * 0.34)}" width="${n(width * 0.74)}" height="${n(height * 0.28)}" rx="8" fill="${palette.dark}"/>
    <text x="${n(x + width / 2)}" y="${n(y + height * 0.51)}" text-anchor="middle" class="brand" fill="${palette.paper}" font-size="${n(width * 0.12)}">${escapeXml(title)}</text>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function menuCard(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 16, y + 20, width, height, 0, 0.11)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${palette.paper}"/>
    <text x="${n(x + width * 0.12)}" y="${n(y + height * 0.18)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.11)}">${escapeXml(title)}</text>
    ${Array.from({ length: 8 }, (_, index) => {
      const yy = y + height * 0.3 + index * 42;
      return `<rect x="${n(x + width * 0.12)}" y="${n(yy)}" width="${n(width * 0.38)}" height="3" rx="2" fill="${palette.ink}" opacity="0.32"/><rect x="${n(x + width * 0.72)}" y="${n(yy)}" width="${n(width * 0.14)}" height="3" rx="2" fill="${palette.accent}" opacity="0.62"/>`;
    }).join("")}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function swatches(x, y, options) {
  const { palette, rotate = 0, labels = false } = options;
  const colors = [palette.paper, palette.soft, palette.accent, palette.alt, palette.dark];
  const content = colors.map((color, index) => {
    const xx = x + index * 104;
    return `
      ${shadow(xx + 8, y + 84, 84, 42, 0, 0.08)}
      <rect x="${xx}" y="${y}" width="86" height="116" rx="8" fill="${color}"/>
      ${labels ? `<text x="${xx + 12}" y="${y + 96}" class="micro" fill="${index === 4 ? palette.paper : palette.ink}" opacity="0.62">${String(index + 1).padStart(2, "0")}</text>` : ""}
    `;
  }).join("");
  return rotateGroup(x, y, 500, 130, rotate, content);
}

function blueprint(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const lines = [];
  for (let index = 0; index < 8; index += 1) {
    const xx = x + 52 + index * ((width - 104) / 8);
    lines.push(`<line x1="${n(xx)}" y1="${n(y + 52)}" x2="${n(xx)}" y2="${n(y + height - 54)}" stroke="${palette.paper}" stroke-opacity="0.12"/>`);
  }
  for (let index = 0; index < 6; index += 1) {
    const yy = y + 52 + index * ((height - 104) / 6);
    lines.push(`<line x1="${n(x + 52)}" y1="${n(yy)}" x2="${n(x + width - 54)}" y2="${n(yy)}" stroke="${palette.paper}" stroke-opacity="0.12"/>`);
  }
  const content = `
    ${shadow(x + 20, y + 26, width, height, 0, 0.13)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${palette.dark}"/>
    ${lines.join("")}
    <path d="M ${n(x + width * 0.2)} ${n(y + height * 0.72)} V ${n(y + height * 0.36)} H ${n(x + width * 0.54)} V ${n(y + height * 0.5)} H ${n(x + width * 0.78)} V ${n(y + height * 0.72)} Z" fill="none" stroke="${palette.paper}" stroke-width="5" opacity="0.78"/>
    <text x="${n(x + 54)}" y="${n(y + height - 46)}" class="micro" fill="${palette.paper}" opacity="0.72">${escapeXml(title)}</text>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function signage(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 18, y + 24, width, height, 0, 0.13)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${palette.dark}"/>
    <rect x="${n(x + 24)}" y="${n(y + 24)}" width="${n(width - 48)}" height="${n(height - 48)}" rx="6" fill="none" stroke="${palette.paper}" stroke-opacity="0.16"/>
    <text x="${n(x + width * 0.1)}" y="${n(y + height * 0.52)}" class="brand" fill="${palette.paper}" font-size="${n(width * 0.1)}">${escapeXml(title)}</text>
    <rect x="${n(x + width * 0.1)}" y="${n(y + height * 0.62)}" width="${n(width * 0.74)}" height="4" rx="2" fill="${palette.accent}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function chairCard(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 16, y + 20, width, height, 0, 0.11)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${palette.paper}"/>
    <path d="M ${n(x + width * 0.28)} ${n(y + height * 0.64)} L ${n(x + width * 0.38)} ${n(y + height * 0.28)} H ${n(x + width * 0.68)} L ${n(x + width * 0.76)} ${n(y + height * 0.64)}" fill="none" stroke="${palette.dark}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${n(x + width * 0.31)} ${n(y + height * 0.64)} L ${n(x + width * 0.24)} ${n(y + height * 0.88)} M ${n(x + width * 0.72)} ${n(y + height * 0.64)} L ${n(x + width * 0.8)} ${n(y + height * 0.88)}" stroke="${palette.dark}" stroke-width="8" stroke-linecap="round"/>
    <text x="${n(x + width * 0.12)}" y="${n(y + height * 0.16)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.11)}">${escapeXml(title)}</text>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function shelfTag(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const content = `
    ${shadow(x + 10, y + 16, width, height, 0, 0.09)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="${palette.paper}"/>
    <text x="${n(x + 22)}" y="${n(y + height * 0.45)}" class="brand" fill="${palette.ink}" font-size="${n(width * 0.095)}">${escapeXml(title)}</text>
    <text x="${n(x + 24)}" y="${n(y + height * 0.66)}" class="micro" fill="${palette.ink}" opacity="0.62">BATCH 04 / DEMO</text>
    <circle cx="${n(x + width - 42)}" cy="${n(y + height / 2)}" r="22" fill="${palette.accent}"/>
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function wrapPaper(x, y, width, height, options) {
  const { palette, rotate = 0, title = "" } = options;
  const marks = Array.from({ length: 20 }, (_, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    return `<text x="${n(x + 50 + col * width * 0.18)}" y="${n(y + 64 + row * height * 0.22)}" class="micro" fill="${palette.ink}" opacity="0.25">${escapeXml(title.slice(0, 2))}</text>`;
  }).join("");
  const content = `
    ${shadow(x + 16, y + 20, width, height, 0, 0.1)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" fill="${palette.soft}"/>
    ${marks}
  `;
  return rotateGroup(x, y, width, height, rotate, content);
}

function demoStamp(spec, asset) {
  return `<g opacity="0.72"><text x="78" y="1004" class="micro" fill="${spec.palette.ink}">${escapeXml(spec.subtitle.toUpperCase())}</text><text x="78" y="1036" class="micro" fill="${spec.palette.ink}" opacity="0.55">TEMPORARY DEMONSTRATION PORTFOLIO VISUAL / ${escapeXml(asset.toUpperCase())}</text></g>`;
}

function baseSvg(spec, asset, body) {
  const width = 1600;
  const height = 1100;
  const random = seeded(`${spec.slug}-${asset}`);
  const gradientId = `${spec.slug.replaceAll("-", "_")}_${asset.replaceAll("-", "_")}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.title)} ${escapeXml(asset)} demo portfolio mockup</title>
  <desc id="desc">Temporary fictional demonstration project imagery for portfolio presentation only, not client work.</desc>
  <defs>
    <linearGradient id="bg_${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${spec.palette.paper}"/>
      <stop offset="58%" stop-color="${spec.palette.bg}"/>
      <stop offset="100%" stop-color="${spec.palette.soft}"/>
    </linearGradient>
    <radialGradient id="light_${gradientId}" cx="74%" cy="18%" r="64%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <style><![CDATA[
    .brand { font-family: ${spec.display}, Georgia, serif; font-weight: 500; letter-spacing: .02em; }
    .body { font-family: ${spec.body}, Arial, sans-serif; font-weight: 500; }
    .micro { font-family: ${spec.body}, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: .12em; }
  ]]></style>
  <rect width="${width}" height="${height}" fill="url(#bg_${gradientId})"/>
  <rect width="${width}" height="${height}" fill="url(#light_${gradientId})"/>
  ${paperNoise(width, height, random, spec.palette)}
  <circle cx="1350" cy="178" r="184" fill="${spec.palette.accent}" opacity="0.06"/>
  <circle cx="220" cy="894" r="220" fill="${spec.palette.alt}" opacity="0.08"/>
  ${body}
  ${demoStamp(spec, asset)}
</svg>
`;
}

function renderFlora(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `
      ${botanicalStem(1190, 110, 680, { palette: p, rotate: -20, scale: 1.2 })}
      ${card(212, 220, 440, 630, { palette: p, rotate: -7, title: "FLORA", subtitle: "NOTECARDS", accent: p.accent, seal: true })}
      ${envelope(558, 608, 470, 255, { palette: p, rotate: 5, title: "GIFT NOTE" })}
      ${card(840, 170, 420, 610, { palette: p, rotate: 8, fill: p.dark, title: "HERBARIUM", subtitle: "PAPER GOODS", accent: p.soft, dark: true, lines: 6 })}
      ${wrapPaper(1020, 636, 330, 230, { palette: p, rotate: -5, title: "FLORA" })}
      ${botanicalStem(690, 176, 430, { palette: p, rotate: 48, scale: 0.82 })}
      ${swatches(260, 842, { palette: p, rotate: -2, labels: true })}
    `;
  }
  if (asset === "gallery-1") {
    return `${envelope(240, 230, 560, 320, { palette: p, rotate: -6, title: "BOTANICAL STUDIO" })}${card(650, 360, 420, 520, { palette: p, rotate: 4, title: "FLORA", subtitle: "LETTERHEAD", seal: true })}${card(990, 230, 300, 190, { palette: p, rotate: -3, title: "NB", subtitle: "CALLING CARD", lines: 2 })}${botanicalStem(1180, 470, 390, { palette: p, rotate: -18, scale: 0.9 })}`;
  }
  if (asset === "gallery-2") {
    return `${wrapPaper(210, 232, 610, 490, { palette: p, rotate: -7, title: "FL" })}${box3d(760, 276, 330, 410, 72, { palette: p, rotate: 4, fill: p.paper, side: p.soft, title: "FLORA", subtitle: "GIFT SLEEVE" })}${hangTag(1124, 476, 160, 250, { palette: p, rotate: -12, title: "FL" })}${botanicalStem(448, 142, 360, { palette: p, rotate: 35, scale: 0.75 })}`;
  }
  if (asset === "gallery-3") {
    return `${spread(210, 245, 820, 500, { palette: p, rotate: -3, title: "FIELD NOTES", imageSide: "right" })}${card(980, 196, 310, 420, { palette: p, rotate: 8, title: "CARDS", subtitle: "SET OF 6", lines: 5, seal: true })}${card(1055, 610, 260, 170, { palette: p, rotate: -6, title: "THANK YOU", subtitle: "INSERT", lines: 2 })}`;
  }
  if (asset === "gallery-4") {
    return `${swatches(268, 320, { palette: p, rotate: -6, labels: true })}${card(775, 210, 420, 520, { palette: p, rotate: 5, title: "PAPER", subtitle: "STOCK STUDY", lines: 7 })}${botanicalStem(1220, 240, 520, { palette: p, rotate: -22, scale: 1 })}${botanicalStem(1090, 590, 300, { palette: p, rotate: 60, scale: 0.68 })}`;
  }
  return `${card(300, 232, 430, 610, { palette: p, rotate: -7, title: "FLORA", subtitle: "BOTANICAL BRAND", seal: true })}${envelope(678, 584, 450, 255, { palette: p, rotate: 6, title: "STATIONERY" })}${botanicalStem(1050, 160, 590, { palette: p, rotate: -18, scale: 1.05 })}${card(945, 302, 260, 180, { palette: p, rotate: 10, title: "NB", subtitle: "EMBOSSED", lines: 2 })}`;
}

function renderAurora(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${box3d(270, 320, 310, 455, 78, { palette: p, rotate: -4, fill: p.paper, side: p.soft, title: "AURORA", subtitle: "DAY SERUM" })}${box3d(555, 236, 260, 390, 64, { palette: p, rotate: 5, fill: p.soft, side: p.paper, title: "REFILL", subtitle: "MINERAL CREAM" })}${jar(850, 452, 210, 245, { palette: p, rotate: -2, title: "AU", label: "CREAM", fill: "#f6e7e4" })}${bottle(1060, 258, 145, 430, { palette: p, rotate: 6, title: "AURORA", fill: "#e9f0e8" })}${tube(1240, 280, 150, 500, { palette: p, rotate: -8, title: "RITUAL" })}${card(650, 720, 420, 190, { palette: p, rotate: -3, title: "AM ROUTINE", subtitle: "PRODUCT CARD", lines: 3, seal: true })}${swatches(230, 820, { palette: p, rotate: 2, labels: true })}`;
  }
  if (asset === "gallery-1") {
    return `${box3d(340, 235, 330, 460, 74, { palette: p, rotate: -6, fill: p.paper, side: p.soft, title: "SERUM", subtitle: "FROSTED GLASS" })}${jar(735, 444, 230, 260, { palette: p, rotate: 3, title: "AU", label: "HYDRATE", fill: "#f5ddd9" })}${box3d(980, 295, 260, 390, 62, { palette: p, rotate: 7, fill: p.soft, side: p.alt, title: "REFILL", subtitle: "SLEEVE" })}`;
  }
  if (asset === "gallery-2") {
    return `${spread(230, 260, 810, 500, { palette: p, rotate: -3, title: "INGREDIENT INDEX", imageSide: "left" })}${card(1020, 235, 310, 420, { palette: p, rotate: 6, title: "RITUAL", subtitle: "CARD 03", lines: 6, seal: true })}${bottle(1190, 596, 110, 270, { palette: p, rotate: -7, title: "AU", fill: "#edf4ed" })}`;
  }
  if (asset === "gallery-3") {
    return `${phone(314, 205, 310, 640, { palette: p, rotate: -6, title: "AURORA" })}${socialTile(670, 245, 280, 330, { palette: p, rotate: 4, title: "RITUAL", image: p.soft })}${socialTile(934, 520, 280, 330, { palette: p, rotate: -5, title: "SERUM", image: p.alt })}${jar(1160, 230, 165, 205, { palette: p, rotate: 8, title: "AU", label: "01", fill: "#f5ddd9" })}`;
  }
  if (asset === "gallery-4") {
    return `${swatches(265, 360, { palette: p, rotate: -4, labels: true })}${jar(850, 266, 240, 285, { palette: p, rotate: 4, title: "AU", label: "GLASS", fill: "#f4e1dd" })}${card(1000, 585, 330, 210, { palette: p, rotate: -6, title: "LABEL STOCK", subtitle: "MATTE SEAL", lines: 4 })}`;
  }
  return `${box3d(348, 272, 330, 452, 76, { palette: p, rotate: -5, fill: p.paper, side: p.soft, title: "AURORA", subtitle: "SKINCARE" })}${jar(720, 468, 220, 260, { palette: p, rotate: 4, title: "AU", label: "CREAM", fill: "#f6e7e4" })}${bottle(1016, 275, 150, 430, { palette: p, rotate: 8, title: "SERUM", fill: "#edf4ed" })}${card(980, 720, 310, 175, { palette: p, rotate: -4, title: "RITUAL", subtitle: "LAUNCH CARD", lines: 2 })}`;
}

function renderElysian(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${magazineCover(230, 195, 360, 540, { palette: p, rotate: -8, title: "ELYSIAN", issue: "ISSUE 01 / CULTURE", imageColor: p.soft })}${spread(595, 300, 790, 480, { palette: p, rotate: 4, title: "SLOW ROOMS", imageSide: "right" })}${card(980, 770, 330, 170, { palette: p, rotate: -6, title: "INSERT", subtitle: "SUBSCRIPTION", lines: 3 })}${magazineCover(1160, 170, 260, 390, { palette: p, rotate: 9, title: "E", issue: "TRAVEL NOTES", imageColor: p.alt })}`;
  }
  if (asset === "gallery-1") {
    return `${spread(250, 230, 930, 560, { palette: p, rotate: -2, title: "FEATURE OPENER", imageSide: "left" })}${magazineCover(1050, 545, 230, 320, { palette: p, rotate: 8, title: "01", issue: "CONTENTS", imageColor: p.accent })}`;
  }
  if (asset === "gallery-2") {
    return `${card(315, 300, 450, 250, { palette: p, rotate: -5, title: "SUBSCRIBE", subtitle: "PRINT INSERT", lines: 5, seal: true })}${wrapPaper(690, 220, 540, 390, { palette: p, rotate: 5, title: "EL" })}${magazineCover(900, 532, 260, 340, { palette: p, rotate: -8, title: "E", issue: "BELLY BAND", imageColor: p.soft })}`;
  }
  if (asset === "gallery-3") {
    return `${socialTile(275, 250, 330, 390, { palette: p, rotate: -5, title: "QUOTE", image: p.alt })}${socialTile(610, 390, 330, 390, { palette: p, rotate: 4, title: "ISSUE 01", image: p.soft })}${socialTile(950, 235, 330, 390, { palette: p, rotate: -2, title: "FEATURE", image: p.accent })}`;
  }
  if (asset === "gallery-4") {
    return `${card(260, 260, 430, 530, { palette: p, rotate: -4, title: "GRID", subtitle: "12 COLUMN", lines: 9 })}${swatches(710, 350, { palette: p, rotate: 3, labels: true })}${card(1060, 610, 280, 190, { palette: p, rotate: 6, title: "INK TEST", subtitle: "PROOF", lines: 3 })}`;
  }
  return `${magazineCover(360, 205, 390, 590, { palette: p, rotate: -7, title: "ELYSIAN", issue: "ISSUE 01", imageColor: p.soft })}${spread(748, 360, 560, 350, { palette: p, rotate: 6, title: "CULTURE", imageSide: "right" })}${card(1040, 695, 250, 160, { palette: p, rotate: -5, title: "PRINT", subtitle: "INSERT", lines: 2 })}`;
}

function renderKinfolk(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${poster(255, 180, 390, 600, { palette: p, rotate: -6, title: "RITUALS", fill: p.dark })}${spread(630, 315, 690, 440, { palette: p, rotate: 5, title: "HOME STORY", imageSide: "left" })}${card(1030, 192, 300, 210, { palette: p, rotate: 8, title: "INVITE", subtitle: "LAUNCH SUPPER", lines: 3, seal: true })}${wrapPaper(910, 700, 420, 190, { palette: p, rotate: -4, title: "KC" })}${socialTile(330, 746, 250, 170, { palette: p, rotate: 4, title: "STORY", image: p.soft })}`;
  }
  if (asset === "gallery-1") {
    return `${poster(300, 195, 430, 640, { palette: p, rotate: -4, title: "GATHER", fill: p.dark })}${card(745, 300, 470, 280, { palette: p, rotate: 5, title: "DINNER", subtitle: "INVITATION", lines: 5, seal: true })}${card(1018, 620, 270, 190, { palette: p, rotate: -7, title: "RSVP", subtitle: "CARD", lines: 2 })}`;
  }
  if (asset === "gallery-2") {
    return `${spread(260, 270, 920, 540, { palette: p, rotate: -3, title: "LOOKBOOK", imageSide: "right" })}${poster(1065, 195, 250, 360, { palette: p, rotate: 7, title: "01", fill: p.alt })}`;
  }
  if (asset === "gallery-3") {
    return `${phone(305, 210, 305, 640, { palette: p, rotate: -6, title: "KINFOLK" })}${socialTile(655, 250, 300, 340, { palette: p, rotate: 4, title: "HOME", image: p.soft })}${socialTile(960, 485, 300, 340, { palette: p, rotate: -5, title: "DINNER", image: p.alt })}`;
  }
  if (asset === "gallery-4") {
    return `${wrapPaper(280, 290, 600, 420, { palette: p, rotate: -7, title: "KC" })}${box3d(850, 322, 330, 300, 70, { palette: p, rotate: 5, fill: p.paper, side: p.soft, title: "SLEEVE", subtitle: "CAMPAIGN KIT" })}${card(1030, 650, 260, 180, { palette: p, rotate: -8, title: "INSERT", subtitle: "NOTES", lines: 3 })}`;
  }
  return `${poster(330, 210, 400, 600, { palette: p, rotate: -7, title: "RITUALS", fill: p.dark })}${card(720, 350, 420, 270, { palette: p, rotate: 5, title: "INVITE", subtitle: "CAMPAIGN", lines: 4, seal: true })}${wrapPaper(940, 620, 340, 230, { palette: p, rotate: -4, title: "KC" })}`;
}

function renderLuna(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${phone(250, 190, 310, 650, { palette: p, rotate: -6, title: "LUNA FEED" })}${socialTile(610, 205, 290, 330, { palette: p, rotate: 4, title: "DROP 01", image: p.accent })}${socialTile(910, 320, 300, 360, { palette: p, rotate: -3, title: "STORY", image: p.soft })}${socialTile(585, 604, 310, 300, { palette: p, rotate: -5, title: "REELS", image: p.alt })}${card(1070, 710, 260, 170, { palette: p, rotate: 5, title: "GUIDE", subtitle: "CAPTIONS", lines: 3 })}`;
  }
  if (asset === "gallery-1") {
    return `${phone(345, 190, 325, 670, { palette: p, rotate: -4, title: "GRID" })}${socialTile(745, 250, 270, 310, { palette: p, rotate: 5, title: "POST", image: p.soft })}${socialTile(1010, 520, 270, 310, { palette: p, rotate: -5, title: "STORY", image: p.accent })}`;
  }
  if (asset === "gallery-2") {
    return `${socialTile(270, 250, 330, 390, { palette: p, rotate: -5, title: "LAUNCH", image: p.accent })}${socialTile(620, 320, 330, 390, { palette: p, rotate: 3, title: "SEASON", image: p.alt })}${socialTile(970, 235, 330, 390, { palette: p, rotate: -2, title: "SAVE", image: p.soft })}`;
  }
  if (asset === "gallery-3") {
    return `${spread(250, 270, 860, 500, { palette: p, rotate: -3, title: "CONTENT GUIDE", imageSide: "right" })}${card(1058, 230, 250, 380, { palette: p, rotate: 7, title: "RULES", subtitle: "TEMPLATE", lines: 7 })}`;
  }
  if (asset === "gallery-4") {
    return `${card(270, 280, 380, 470, { palette: p, rotate: -5, title: "ASSETS", subtitle: "TOKEN LIBRARY", lines: 8, seal: true })}${swatches(685, 370, { palette: p, rotate: 4, labels: true })}${socialTile(1050, 610, 260, 220, { palette: p, rotate: -6, title: "KIT", image: p.alt })}`;
  }
  return `${phone(350, 205, 330, 660, { palette: p, rotate: -5, title: "LUNA" })}${socialTile(742, 250, 310, 360, { palette: p, rotate: 5, title: "GRID", image: p.accent })}${socialTile(1005, 560, 270, 280, { palette: p, rotate: -6, title: "STORY", image: p.soft })}`;
}

function renderAtelier(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${shoppingBag(250, 245, 330, 520, { palette: p, rotate: -5, title: "ATELIER" })}${spread(590, 300, 700, 440, { palette: p, rotate: 5, title: "LOOKBOOK", imageSide: "left" })}${hangTag(1110, 185, 155, 260, { palette: p, rotate: 10, title: "AT" })}${hangTag(1240, 450, 150, 250, { palette: p, rotate: -7, title: "FW" })}${wrapPaper(790, 732, 430, 180, { palette: p, rotate: -3, title: "AT" })}`;
  }
  if (asset === "gallery-1") {
    return `${hangTag(380, 260, 170, 285, { palette: p, rotate: -10, title: "AT" })}${hangTag(540, 360, 170, 285, { palette: p, rotate: 5, title: "FW" })}${card(740, 290, 430, 280, { palette: p, rotate: -3, title: "APPOINTMENT", subtitle: "BOUTIQUE CARD", lines: 4 })}${envelope(910, 625, 360, 210, { palette: p, rotate: 6, title: "ATELIER" })}`;
  }
  if (asset === "gallery-2") {
    return `${spread(260, 255, 900, 540, { palette: p, rotate: -2, title: "COLLECTION", imageSide: "right" })}${poster(1060, 180, 250, 360, { palette: p, rotate: 8, title: "FW", fill: p.dark })}`;
  }
  if (asset === "gallery-3") {
    return `${shoppingBag(320, 245, 320, 510, { palette: p, rotate: -5, title: "ATELIER" })}${wrapPaper(640, 335, 520, 330, { palette: p, rotate: 6, title: "AT" })}${card(1020, 650, 280, 190, { palette: p, rotate: -7, title: "RECEIPT", subtitle: "FOLDER", lines: 3 })}`;
  }
  if (asset === "gallery-4") {
    return `${socialTile(290, 250, 310, 360, { palette: p, rotate: -6, title: "LOOK", image: p.dark })}${socialTile(620, 365, 310, 360, { palette: p, rotate: 5, title: "DETAIL", image: p.soft })}${phone(995, 220, 300, 620, { palette: p, rotate: -4, title: "ATELIER" })}`;
  }
  return `${shoppingBag(350, 260, 320, 500, { palette: p, rotate: -6, title: "ATELIER" })}${hangTag(720, 245, 170, 280, { palette: p, rotate: 8, title: "AT" })}${spread(850, 420, 460, 290, { palette: p, rotate: 4, title: "LOOKBOOK", imageSide: "left" })}`;
}

function renderMonolith(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${signage(215, 300, 470, 250, { palette: p, rotate: -4, title: "MONOLITH" })}${blueprint(690, 210, 560, 430, { palette: p, rotate: 5, title: "FACADE PLAN / DEMO" })}${card(1020, 655, 320, 220, { palette: p, rotate: -6, title: "SITE INDEX", subtitle: "WAYFINDING", lines: 4 })}${card(340, 640, 360, 250, { palette: p, rotate: 6, title: "PROJECT", subtitle: "FOLDER", lines: 4, seal: true })}`;
  }
  if (asset === "gallery-1") {
    return `${signage(300, 310, 520, 270, { palette: p, rotate: -3, title: "MONOLITH" })}${card(845, 295, 360, 250, { palette: p, rotate: 4, title: "LEVEL 02", subtitle: "WAYFINDING", lines: 4 })}${blueprint(935, 605, 360, 230, { palette: p, rotate: -6, title: "GRID" })}`;
  }
  if (asset === "gallery-2") {
    return `${card(290, 250, 430, 560, { palette: p, rotate: -4, title: "SPEC", subtitle: "DOCUMENT", lines: 9 })}${blueprint(740, 310, 560, 390, { palette: p, rotate: 5, title: "BOARD A1" })}`;
  }
  if (asset === "gallery-3") {
    return `${spread(250, 270, 870, 500, { palette: p, rotate: -3, title: "STUDIO PROFILE", imageSide: "left" })}${signage(1080, 250, 260, 210, { palette: p, rotate: 7, title: "M" })}`;
  }
  if (asset === "gallery-4") {
    return `${swatches(275, 370, { palette: p, rotate: -4, labels: true })}${signage(825, 300, 400, 220, { palette: p, rotate: 4, title: "STONE" })}${card(980, 600, 300, 210, { palette: p, rotate: -7, title: "GRAPHITE", subtitle: "INK TEST", lines: 3 })}`;
  }
  return `${signage(305, 330, 520, 270, { palette: p, rotate: -5, title: "MONOLITH" })}${blueprint(795, 235, 420, 330, { palette: p, rotate: 6, title: "PLAN" })}${card(900, 635, 300, 210, { palette: p, rotate: -5, title: "FOLDER", subtitle: "PROJECT 02", lines: 4 })}`;
}

function renderSora(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${coffeeBag(250, 245, 315, 520, { palette: p, rotate: -5, title: "SORA" })}${menuCard(590, 230, 390, 560, { palette: p, rotate: 4, title: "MENU" })}${cup(1020, 380, 210, 355, { palette: p, rotate: -7, title: "SORA" })}${card(1010, 735, 320, 170, { palette: p, rotate: 4, title: "LOYALTY", subtitle: "STAMP CARD", lines: 3, seal: true })}${socialTile(1170, 220, 230, 250, { palette: p, rotate: 8, title: "OPEN", image: p.soft })}`;
  }
  if (asset === "gallery-1") {
    return `${coffeeBag(350, 250, 330, 540, { palette: p, rotate: -4, title: "SORA" })}${cup(745, 390, 220, 360, { palette: p, rotate: 6, title: "SO" })}${shelfTag(970, 320, 290, 160, { palette: p, rotate: -5, title: "TAKEAWAY" })}`;
  }
  if (asset === "gallery-2") {
    return `${menuCard(300, 230, 430, 590, { palette: p, rotate: -4, title: "MENU" })}${card(755, 320, 430, 250, { palette: p, rotate: 5, title: "LOYALTY", subtitle: "COFFEE CARD", lines: 4, seal: true })}${card(1015, 635, 280, 180, { palette: p, rotate: -6, title: "RECEIPT", subtitle: "FOLDER", lines: 3 })}`;
  }
  if (asset === "gallery-3") {
    return `${phone(330, 210, 300, 630, { palette: p, rotate: -5, title: "SORA" })}${socialTile(680, 250, 310, 360, { palette: p, rotate: 5, title: "OPENING", image: p.soft })}${socialTile(980, 535, 310, 300, { palette: p, rotate: -4, title: "MENU", image: p.alt })}`;
  }
  if (asset === "gallery-4") {
    return `${swatches(275, 370, { palette: p, rotate: -4, labels: true })}${coffeeBag(820, 285, 270, 440, { palette: p, rotate: 5, title: "BEANS" })}${card(1030, 650, 270, 180, { palette: p, rotate: -6, title: "CUP PAPER", subtitle: "STOCK", lines: 3 })}`;
  }
  return `${coffeeBag(350, 260, 325, 520, { palette: p, rotate: -5, title: "SORA" })}${menuCard(720, 260, 350, 470, { palette: p, rotate: 5, title: "MENU" })}${cup(1060, 470, 200, 320, { palette: p, rotate: -8, title: "SO" })}`;
}

function renderForma(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${chairCard(265, 250, 380, 520, { palette: p, rotate: -5, title: "FORMA" })}${spread(650, 310, 720, 440, { palette: p, rotate: 4, title: "CATALOG", imageSide: "right" })}${swatches(430, 790, { palette: p, rotate: 3, labels: true })}${card(1060, 175, 280, 210, { palette: p, rotate: 8, title: "CARE", subtitle: "INSERT", lines: 3 })}`;
  }
  if (asset === "gallery-1") {
    return `${swatches(285, 310, { palette: p, rotate: -5, labels: true })}${chairCard(830, 250, 380, 520, { palette: p, rotate: 5, title: "OAK 03" })}${card(1050, 720, 260, 160, { palette: p, rotate: -6, title: "TEXTILE", subtitle: "SAMPLE", lines: 2 })}`;
  }
  if (asset === "gallery-2") {
    return `${spread(245, 260, 930, 540, { palette: p, rotate: -3, title: "FURNITURE INDEX", imageSide: "left" })}${chairCard(1065, 190, 250, 330, { palette: p, rotate: 8, title: "01" })}`;
  }
  if (asset === "gallery-3") {
    return `${card(300, 250, 440, 560, { palette: p, rotate: -4, title: "ASSEMBLY", subtitle: "OBJECT 04", lines: 10 })}${chairCard(760, 320, 360, 440, { palette: p, rotate: 5, title: "CARE" })}${card(1050, 610, 260, 190, { palette: p, rotate: -7, title: "CERT", subtitle: "PRODUCT", lines: 3 })}`;
  }
  if (asset === "gallery-4") {
    return `${socialTile(285, 250, 310, 360, { palette: p, rotate: -6, title: "OBJECT", image: p.soft })}${socialTile(625, 360, 310, 360, { palette: p, rotate: 4, title: "ROOM", image: p.alt })}${phone(1000, 215, 300, 625, { palette: p, rotate: -5, title: "FORMA" })}`;
  }
  return `${chairCard(330, 245, 390, 540, { palette: p, rotate: -5, title: "FORMA" })}${swatches(720, 360, { palette: p, rotate: 5, labels: true })}${card(945, 600, 310, 210, { palette: p, rotate: -6, title: "CATALOG", subtitle: "OBJECT CARD", lines: 4 })}`;
}

function renderNoma(spec, asset) {
  const p = spec.palette;
  if (asset === "hero") {
    return `${jar(260, 360, 220, 275, { palette: p, rotate: -5, title: "NO", label: "HONEY", fill: "#e9c79d" })}${jar(510, 280, 230, 300, { palette: p, rotate: 4, title: "NOMA", label: "BATCH 04", fill: "#e3b98e" })}${box3d(760, 300, 330, 360, 76, { palette: p, rotate: -3, fill: p.paper, side: p.soft, title: "GIFT", subtitle: "CARTON" })}${wrapPaper(1010, 640, 360, 220, { palette: p, rotate: 6, title: "NO" })}${shelfTag(1020, 230, 320, 170, { palette: p, rotate: 7, title: "SHELF TAG" })}${card(395, 710, 330, 190, { palette: p, rotate: -6, title: "BATCH", subtitle: "TASTING CARD", lines: 3, seal: true })}`;
  }
  if (asset === "gallery-1") {
    return `${jar(360, 330, 230, 300, { palette: p, rotate: -5, title: "NO", label: "JAR LABEL", fill: "#e6bd91" })}${box3d(650, 300, 340, 360, 76, { palette: p, rotate: 5, fill: p.paper, side: p.soft, title: "NOMA", subtitle: "GIFT CARTON" })}${card(995, 620, 320, 190, { palette: p, rotate: -6, title: "BATCH 04", subtitle: "CARD", lines: 3 })}`;
  }
  if (asset === "gallery-2") {
    return `${shelfTag(300, 290, 410, 210, { palette: p, rotate: -4, title: "PANTRY" })}${card(730, 285, 420, 260, { palette: p, rotate: 5, title: "TASTING", subtitle: "NOTE INSERT", lines: 5, seal: true })}${card(1000, 620, 280, 180, { palette: p, rotate: -7, title: "RECEIPT", subtitle: "CARD", lines: 3 })}`;
  }
  if (asset === "gallery-3") {
    return `${wrapPaper(260, 290, 580, 430, { palette: p, rotate: -6, title: "NO" })}${swatches(850, 350, { palette: p, rotate: 5, labels: true })}${jar(1120, 600, 170, 210, { palette: p, rotate: -8, title: "NO", label: "SEAL", fill: "#e2b587" })}`;
  }
  if (asset === "gallery-4") {
    return `${phone(315, 210, 300, 630, { palette: p, rotate: -5, title: "NOMA" })}${socialTile(675, 250, 310, 360, { palette: p, rotate: 5, title: "BATCH", image: p.soft })}${socialTile(980, 535, 310, 300, { palette: p, rotate: -4, title: "PANTRY", image: p.alt })}`;
  }
  return `${jar(365, 340, 230, 300, { palette: p, rotate: -5, title: "NO", label: "BATCH", fill: "#e6bd91" })}${box3d(640, 305, 330, 360, 76, { palette: p, rotate: 5, fill: p.paper, side: p.soft, title: "NOMA", subtitle: "ARTISAN GOODS" })}${wrapPaper(960, 610, 340, 230, { palette: p, rotate: -6, title: "NO" })}`;
}

const renderers = {
  flora: renderFlora,
  aurora: renderAurora,
  elysian: renderElysian,
  "kinfolk-concept": renderKinfolk,
  luna: renderLuna,
  atelier: renderAtelier,
  monolith: renderMonolith,
  sora: renderSora,
  forma: renderForma,
  noma: renderNoma,
};

mkdirSync(outputRoot, { recursive: true });

for (const spec of projects) {
  const projectDir = join(outputRoot, spec.slug);
  mkdirSync(projectDir, { recursive: true });

  for (const asset of assetNames) {
    const body = renderers[spec.slug](spec, asset);
    writeFileSync(join(projectDir, `${asset}.svg`), baseSvg(spec, asset, body), "utf8");
  }
}

console.log(`Generated ${projects.length * assetNames.length} demo project visuals in ${outputRoot}`);
