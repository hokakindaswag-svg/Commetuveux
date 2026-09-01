/**
 * ------------------------------------------------------------------
 *  Le Closet — génération des visuels de démonstration
 * ------------------------------------------------------------------
 *  Ce script crée des illustrations vectorielles (rendues en .jpg) pour
 *  chaque manteau du catalogue ainsi que les visuels éditoriaux.
 *
 *  Il sert UNIQUEMENT à peupler le site tant que la photographie
 *  produit n'est pas prête. Pour utiliser vos vraies photos :
 *
 *    1. déposez vos fichiers dans public/images/products/ et
 *       public/images/lifestyle/ en conservant les mêmes noms ;
 *    2. ou modifiez les chemins dans data/products.ts et data/site.ts.
 *
 *  Aucun composant React ne référence ces images en dur.
 *
 *  Usage :  node scripts/generate-placeholder-images.mjs
 * ------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_PRODUCTS = path.join(ROOT, 'public/images/products');
const OUT_LIFESTYLE = path.join(ROOT, 'public/images/lifestyle');

fs.mkdirSync(OUT_PRODUCTS, { recursive: true });
fs.mkdirSync(OUT_LIFESTYLE, { recursive: true });

/* ---------------------------- couleurs ---------------------------- */

const hex2rgb = (h) => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgb2hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const shade = (h, amt) => {
  const [r, g, b] = hex2rgb(h);
  return amt >= 0
    ? rgb2hex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt)
    : rgb2hex(r * (1 + amt), g * (1 + amt), b * (1 + amt));
};

const BACKDROPS = [
  ['#F8E5D7', '#EFD8C6'],
  ['#FAF3EC', '#EFE2D5'],
  ['#F3E7E2', '#E7D3CC'],
  ['#F6EDE4', '#E9D9C8'],
  ['#F9ECEC', '#EEDAD9'],
];

/* --------------------- lecture du catalogue ----------------------- */

const source = fs.readFileSync(path.join(ROOT, 'data/products.ts'), 'utf8');
const blocks = source.split(/\n  \{\n/).slice(1);
const field = (block, key) => {
  const m = block.match(new RegExp(`${key}: '([^']*)'`));
  return m ? m[1] : '';
};

const catalog = blocks.map((b) => ({
  slug: field(b, 'slug'),
  name: field(b, 'name'),
  category: field(b, 'category'),
  style: field(b, 'style'),
  colorName: (b.match(/color: \{ name: '([^']*)'/) || [])[1] || 'Noir',
  hex: (b.match(/hex: '(#[0-9A-Fa-f]{6})'/) || [])[1] || '#30150E',
  group: (b.match(/group: '([^']*)' \}/) || [])[1] || 'Noir',
}));

/* --------------------- géométrie du manteau ----------------------- */

const GEOMETRY = {
  'manteaux-longs': { hem: 1030, sw: 190, hw: 250, sleeve: 900 },
  'manteaux-courts': { hem: 820, sw: 180, hw: 225, sleeve: 780 },
  doudounes: { hem: 900, sw: 215, hw: 255, sleeve: 830 },
  'fausse-fourrure': { hem: 900, sw: 215, hw: 260, sleeve: 820 },
  teddy: { hem: 790, sw: 205, hw: 240, sleeve: 760 },
  trench: { hem: 990, sw: 185, hw: 245, sleeve: 880 },
  similicuir: { hem: 860, sw: 178, hw: 220, sleeve: 800 },
  laine: { hem: 990, sw: 188, hw: 240, sleeve: 890 },
};

const rnd = (seedRef) => {
  seedRef.v = (seedRef.v * 1664525 + 1013904223) % 4294967296;
  return seedRef.v / 4294967296;
};

const hashSeed = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 4294967296;
};

/** Motif léopard discret, utilisé pour les coloris « Léopard ». */
function leopardSpots(seed, x0, y0, x1, y1, base) {
  let out = '';
  const dark = shade(base, -0.72);
  const ring = shade(base, -0.35);
  for (let y = y0; y < y1; y += 74) {
    for (let x = x0; x < x1; x += 70) {
      if (rnd(seed) < 0.18) continue;
      const ox = (rnd(seed) - 0.5) * 62;
      const oy = (rnd(seed) - 0.5) * 62;
      const r = 8 + rnd(seed) * 7;
      const rot = Math.round((rnd(seed) - 0.5) * 90);
      const cxs = (x + ox).toFixed(1);
      const cys = (y + oy).toFixed(1);
      out += `<g transform="rotate(${rot} ${cxs} ${cys})">`;
      out += `<ellipse cx="${cxs}" cy="${cys}" rx="${(r * 1.55).toFixed(1)}" ry="${(r * 1.1).toFixed(1)}" fill="none" stroke="${ring}" stroke-width="${(6 + rnd(seed) * 4).toFixed(1)}" opacity=".5" stroke-dasharray="${(r * 2.4).toFixed(1)} ${(r * 0.9).toFixed(1)}"/>`;
      out += `<ellipse cx="${cxs}" cy="${cys}" rx="${r.toFixed(1)}" ry="${(r * 0.72).toFixed(1)}" fill="${dark}" opacity=".72"/>`;
      out += `</g>`;
    }
  }
  return out;
}

/** Bordure « fourrure » : petits cercles le long d'un contour. */
function furEdge(seed, pts, base, size = 16) {
  const light = shade(base, 0.22);
  const dark = shade(base, -0.18);
  return pts
    .map(([x, y]) => {
      const r = size * (0.7 + rnd(seed) * 0.7);
      const c = rnd(seed) > 0.5 ? light : dark;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity=".9"/>`;
    })
    .join('');
}

function coatSvg(product, variant, W = 900, H = 1200, opts = {}) {
  const seed = { v: hashSeed(product.slug + variant) };
  const g = GEOMETRY[product.category] || GEOMETRY.laine;
  const oversize = product.style === 'oversize' || product.style === 'statement';
  const crop = product.style === 'crop';

  const cx = W / 2;
  const shoulderY = 320;
  const neckY = 268;
  const sw = g.sw + (oversize ? 22 : 0);
  const hem = crop ? Math.min(g.hem, 760) : g.hem;
  const hw = g.hw + (oversize ? 26 : 0);
  const sleeveEnd = Math.min(g.sleeve, hem - 60);

  const base = product.hex;
  const light = shade(base, 0.16);
  const dark = shade(base, -0.3);
  const deeper = shade(base, -0.5);
  const isPale = hex2rgb(base).reduce((a, b) => a + b, 0) > 560;
  const stroke = isPale ? shade(base, -0.28) : shade(base, -0.45);

  const bd = BACKDROPS[hashSeed(product.slug) % BACKDROPS.length];
  const bg = variant === 2 ? [bd[1], shade(bd[1], -0.06)] : bd;

  // zoom du second visuel (plan rapproché, comme un 2e angle produit)
  const zoom = variant === 2 ? 1.16 : 1;
  const shiftY = variant === 2 ? -70 : 0;

  const body = `M ${cx - sw} ${shoulderY}
    C ${cx - sw - 26} ${shoulderY + 150} ${cx - hw + 8} ${hem - 260} ${cx - hw} ${hem}
    L ${cx + hw} ${hem}
    C ${cx + hw - 8} ${hem - 260} ${cx + sw + 26} ${shoulderY + 150} ${cx + sw} ${shoulderY}
    C ${cx + 90} ${neckY + 4} ${cx - 90} ${neckY + 4} ${cx - sw} ${shoulderY} Z`;

  const sleeveL = `M ${cx - sw + 6} ${shoulderY + 8}
    C ${cx - sw - 70} ${shoulderY + 190} ${cx - sw - 86} ${sleeveEnd - 150} ${cx - sw - 62} ${sleeveEnd}
    L ${cx - sw + 34} ${sleeveEnd - 16}
    C ${cx - sw + 16} ${sleeveEnd - 210} ${cx - sw + 10} ${shoulderY + 180} ${cx - sw + 6} ${shoulderY + 8} Z`;
  const sleeveR = `M ${cx + sw - 6} ${shoulderY + 8}
    C ${cx + sw + 70} ${shoulderY + 190} ${cx + sw + 86} ${sleeveEnd - 150} ${cx + sw + 62} ${sleeveEnd}
    L ${cx + sw - 34} ${sleeveEnd - 16}
    C ${cx + sw - 16} ${sleeveEnd - 210} ${cx + sw - 10} ${shoulderY + 180} ${cx + sw - 6} ${shoulderY + 8} Z`;

  const lapelBottom = shoulderY + 190;
  const lapelL = `M ${cx - 104} ${neckY + 8} L ${cx - 58} ${neckY + 2} L ${cx - 8} ${lapelBottom} L ${cx - 8} ${neckY + 52} Z`;
  const lapelR = `M ${cx + 104} ${neckY + 8} L ${cx + 58} ${neckY + 2} L ${cx + 8} ${lapelBottom} L ${cx + 8} ${neckY + 52} Z`;
  const collar = `M ${cx - 104} ${neckY + 8} C ${cx - 60} ${neckY - 26} ${cx + 60} ${neckY - 26} ${cx + 104} ${neckY + 8} C ${cx + 66} ${neckY + 26} ${cx - 66} ${neckY + 26} ${cx - 104} ${neckY + 8} Z`;

  let texture = '';
  let extras = '';

  if (product.category === 'doudounes') {
    for (let y = shoulderY + 70; y < hem - 30; y += 78) {
      const w = hw - 14 - Math.max(0, (hem - y) / 26);
      texture += `<path d="M ${cx - w} ${y} Q ${cx} ${y + 16} ${cx + w} ${y}" fill="none" stroke="${deeper}" stroke-width="4" opacity=".38"/>`;
    }
  }

  if (product.category === 'fausse-fourrure') {
    const pts = [];
    for (let i = 0; i <= 46; i++) {
      const t = i / 46;
      pts.push([cx - hw + t * hw * 2 + (rnd(seed) - 0.5) * 12, hem - 8 + (rnd(seed) - 0.5) * 16]);
    }
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      pts.push([cx - 110 + t * 220, neckY + 18 + (rnd(seed) - 0.5) * 20]);
    }
    texture += furEdge(seed, pts, base, 19);
    for (let i = 0; i < 260; i++) {
      const x = cx - hw + rnd(seed) * hw * 2;
      const y = shoulderY + rnd(seed) * (hem - shoulderY);
      texture += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(7 + rnd(seed) * 7).toFixed(1)}" fill="${rnd(seed) > 0.5 ? light : dark}" opacity=".30"/>`;
    }
  }

  if (product.category === 'teddy') {
    for (let i = 0; i < 420; i++) {
      const x = cx - hw + rnd(seed) * hw * 2;
      const y = shoulderY + rnd(seed) * (hem - shoulderY);
      texture += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + rnd(seed) * 4).toFixed(1)}" fill="${rnd(seed) > 0.5 ? light : deeper}" opacity=".26"/>`;
    }
  }

  if (product.category === 'similicuir') {
    extras += `<path d="${body}" fill="url(#sheen)" opacity=".55"/>`;
  }

  if (product.category === 'laine' || product.category === 'manteaux-longs' || product.category === 'manteaux-courts') {
    for (let i = 0; i < 130; i++) {
      const x = cx - hw + rnd(seed) * hw * 2;
      const y = shoulderY + rnd(seed) * (hem - shoulderY);
      texture += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="${light}" opacity=".22"/>`;
    }
  }

  if (product.group === 'Léopard') {
    texture += leopardSpots({ v: hashSeed(product.slug) }, cx - hw, shoulderY + 30, cx + hw, hem, base);
  }

  // ceinture
  if (product.style === 'ceinture' || product.category === 'trench') {
    const by = shoulderY + Math.round((hem - shoulderY) * 0.42);
    const bw = hw - 26;
    extras += `<rect x="${cx - bw}" y="${by}" width="${bw * 2}" height="34" fill="${deeper}" opacity=".9"/>
      <rect x="${cx - 34}" y="${by - 8}" width="68" height="50" fill="none" stroke="${shade(base, 0.3)}" stroke-width="6" opacity=".8"/>`;
  }

  // capuche
  if (product.style === 'capuche') {
    extras += `<path d="M ${cx - 118} ${neckY + 26} C ${cx - 120} ${neckY - 96} ${cx + 120} ${neckY - 96} ${cx + 118} ${neckY + 26} C ${cx + 60} ${neckY + 70} ${cx - 60} ${neckY + 70} ${cx - 118} ${neckY + 26} Z" fill="${dark}"/>`;
  }

  // boutons
  const buttons = [];
  const bTop = shoulderY + 215;
  for (let y = bTop; y < hem - 120; y += 150) buttons.push(y);
  const buttonSvg = buttons
    .map((y) => `<circle cx="${cx + 14}" cy="${y}" r="9" fill="${shade(base, 0.34)}" opacity=".85"/>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/>
    </linearGradient>
    <radialGradient id="floor" cx="0.5" cy="0.96" r="0.6">
      <stop offset="0" stop-color="#30150E" stop-opacity=".13"/>
      <stop offset="1" stop-color="#30150E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".20"/>
      <stop offset="0.32" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.72" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".26"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.42" stop-color="#fff" stop-opacity=".30"/>
      <stop offset="0.58" stop-color="#fff" stop-opacity=".06"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="bodyClip"><path d="${body}"/></clipPath>
  </defs>

  ${opts.transparent ? '' : `<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#floor)"/>`}

  <g transform="translate(${cx} ${H / 2}) scale(${zoom}) translate(${-cx} ${-H / 2 + shiftY})">
    <ellipse cx="${cx}" cy="${hem + 26}" rx="${hw * 0.92}" ry="26" fill="#30150E" opacity=".14"/>

    <path d="${sleeveL}" fill="${dark}"/>
    <path d="${sleeveR}" fill="${shade(base, -0.2)}"/>

    <path d="${body}" fill="${base}"/>
    <g clip-path="url(#bodyClip)">${texture}</g>
    <path d="${body}" fill="url(#shade)"/>
    ${extras}

    <path d="${lapelL}" fill="${light}" opacity=".42"/>
    <path d="${lapelR}" fill="${dark}" opacity=".38"/>
    <path d="${collar}" fill="${dark}" opacity=".75"/>
    <path d="M ${cx} ${neckY + 52} L ${cx} ${hem - 6}" stroke="${stroke}" stroke-width="3" opacity=".5"/>
    ${buttonSvg}

    <path d="${body}" fill="none" stroke="${stroke}" stroke-width="3" opacity=".45"/>
  </g>
</svg>`;
}

/* ------------------------- visuels éditoriaux --------------------- */

function backgroundSvg({ w, h, tone = 'silk', leopardBand = false }) {
  const palettes = {
    silk: ['#F8E5D7', '#E9CDB8'],
    burgundy: ['#5E1414', '#3B0A0A'],
    blush: ['#F9D9DD', '#F3A0AA'],
    wood: ['#3E1D14', '#20100A'],
    cream: ['#FDF9F5', '#F2E3D5'],
  };
  const [c1, c2] = palettes[tone] || palettes.silk;
  const seed = { v: hashSeed(tone + w + h) };

  let grain = '';
  for (let i = 0; i < 220; i++) {
    grain += `<circle cx="${(rnd(seed) * w).toFixed(0)}" cy="${(rnd(seed) * h).toFixed(0)}" r="${(rnd(seed) * 1.8).toFixed(2)}" fill="#30150E" opacity=".045"/>`;
  }

  let band = '';
  if (leopardBand) {
    const by = h * 0.72;
    band = `<rect x="0" y="${by}" width="${w}" height="${h * 0.28}" fill="#E8D2BE" opacity=".55"/>` +
      leopardSpots({ v: hashSeed('band' + w) }, 0, by + 20, w, h, '#C08B4E');
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="ebg" x1="0" y1="0" x2="0.65" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="elight" cx="0.32" cy="0.18" r="0.85">
      <stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="efloor" cx="0.5" cy="1" r="0.7">
      <stop offset="0" stop-color="#30150E" stop-opacity=".16"/><stop offset="1" stop-color="#30150E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#ebg)"/>
  <rect width="${w}" height="${h}" fill="url(#elight)"/>
  ${band}
  <rect width="${w}" height="${h}" fill="url(#efloor)"/>
  ${grain}
</svg>`;
}

/**
 * Compose une scène éditoriale : fond dégradé + silhouette(s) de manteau.
 * `figures` : [{ hex, category, style, group, scale, x }] — x en 0→1.
 */
async function renderScene({ w, h, tone, leopardBand = false, figures, file }) {
  const bg = await sharp(Buffer.from(backgroundSvg({ w, h, tone, leopardBand })))
    .png()
    .toBuffer();

  const layers = [];
  for (const f of figures) {
    const fh = Math.round(h * (f.scale ?? 0.86));
    const fw = Math.round((fh / 1200) * 900);
    const svg = coatSvg(
      {
        slug: f.slug || `${tone}-${f.hex}`,
        category: f.category || 'manteaux-longs',
        style: f.style || 'droit',
        hex: f.hex,
        group: f.group || 'Marron',
      },
      1,
      900,
      1200,
      { transparent: true }
    );
    const buf = await sharp(Buffer.from(svg)).resize(fw, fh).png().toBuffer();
    layers.push({
      input: buf,
      left: Math.round(w * f.x - fw / 2),
      top: Math.round(h - fh - h * (f.bottom ?? 0.02)),
    });
  }

  await sharp(bg).composite(layers).jpeg(jpeg).toFile(file);
}

/* ------------------------------ rendu ----------------------------- */

const jpeg = { quality: 78, mozjpeg: true, chromaSubsampling: '4:4:4' };

async function render(svg, file) {
  await sharp(Buffer.from(svg)).jpeg(jpeg).toFile(file);
}

const run = async () => {
  let n = 0;
  for (const product of catalog) {
    for (const variant of [1, 2]) {
      const file = path.join(OUT_PRODUCTS, `${product.slug}-${variant}.jpg`);
      await render(coatSvg(product, variant), file);
      n++;
    }
  }
  console.log(`✓ ${n} visuels produits`);

  const scenes = [
    {
      file: 'hero-01.jpg', w: 2400, h: 1350, tone: 'silk', leopardBand: false,
      figures: [
        { hex: '#B78A5C', category: 'manteaux-longs', style: 'ceinture', scale: 0.74, x: 0.61, bottom: 0.0 },
        { hex: '#4A2C1D', category: 'fausse-fourrure', style: 'oversize', scale: 0.6, x: 0.8, bottom: 0.0 },
      ],
    },
    {
      file: 'hero-01-mobile.jpg', w: 1080, h: 1440, tone: 'silk',
      figures: [{ hex: '#B78A5C', category: 'manteaux-longs', style: 'ceinture', scale: 0.78, x: 0.52, bottom: 0.02 }],
    },
    {
      file: 'editorial-01.jpg', w: 1800, h: 1200, tone: 'wood', leopardBand: false,
      figures: [
        { hex: '#530E0E', category: 'laine', style: 'oversize', scale: 0.82, x: 0.3, bottom: 0.0 },
        { hex: '#F1E4D6', category: 'fausse-fourrure', style: 'statement', scale: 0.7, x: 0.58, bottom: 0.0 },
      ],
    },
    {
      file: 'editorial-02.jpg', w: 1200, h: 1500, tone: 'blush',
      figures: [{ hex: '#F3A0AA', category: 'teddy', style: 'oversize', scale: 0.72, x: 0.5, bottom: 0.06 }],
    },
    {
      file: 'editorial-03.jpg', w: 1600, h: 1000, tone: 'burgundy',
      figures: [{ hex: '#D9C3A9', category: 'trench', style: 'ceinture', scale: 0.86, x: 0.66, bottom: 0.0 }],
    },
    {
      file: 'collection-manteaux.jpg', w: 1800, h: 620, tone: 'silk',
      figures: [{ hex: '#4A2C1D', category: 'manteaux-longs', style: 'droit', scale: 0.94, x: 0.72, bottom: 0.0 }],
    },
    {
      file: 'collection-nouveautes.jpg', w: 1800, h: 620, tone: 'cream',
      figures: [{ hex: '#D9C3A9', category: 'laine', style: 'oversize', scale: 0.94, x: 0.72, bottom: 0.0 }],
    },
    {
      file: 'collection-best-sellers.jpg', w: 1800, h: 620, tone: 'blush',
      figures: [{ hex: '#530E0E', category: 'manteaux-longs', style: 'ceinture', scale: 0.94, x: 0.72, bottom: 0.0 }],
    },
    {
      file: 'collection-promotions.jpg', w: 1800, h: 620, tone: 'burgundy',
      figures: [{ hex: '#F1E4D6', category: 'similicuir', style: 'droit', scale: 0.94, x: 0.72, bottom: 0.0 }],
    },
    {
      file: 'collection-longs.jpg', w: 1800, h: 620, tone: 'silk',
      figures: [{ hex: '#111111', category: 'manteaux-longs', style: 'droit', scale: 0.94, x: 0.72, bottom: 0.0 }],
    },
    {
      file: 'collection-courts.jpg', w: 1800, h: 620, tone: 'cream',
      figures: [{ hex: '#B78A5C', category: 'teddy', style: 'crop', scale: 0.9, x: 0.74, bottom: 0.0 }],
    },
    {
      file: 'collection-doudounes.jpg', w: 1800, h: 620, tone: 'wood',
      figures: [{ hex: '#111111', category: 'doudounes', style: 'capuche', scale: 0.92, x: 0.73, bottom: 0.0 }],
    },
    {
      file: 'collection-fourrure.jpg', w: 1800, h: 620, tone: 'blush',
      figures: [{ hex: '#F1E4D6', category: 'fausse-fourrure', style: 'statement', scale: 0.92, x: 0.73, bottom: 0.0 }],
    },
    {
      file: 'collection-tendance.jpg', w: 1800, h: 620, tone: 'silk',
      figures: [{ hex: '#C08B4E', group: 'Léopard', category: 'fausse-fourrure', style: 'oversize', scale: 0.92, x: 0.73, bottom: 0.0 }],
    },
  ];

  for (const scene of scenes) {
    await renderScene({ ...scene, file: path.join(OUT_LIFESTYLE, scene.file) });
  }
  console.log(`✓ ${scenes.length} visuels éditoriaux`);

  const ugc = [
    { tone: 'silk', hex: '#4A2C1D', category: 'manteaux-longs', style: 'ceinture' },
    { tone: 'blush', hex: '#F3A0AA', category: 'teddy', style: 'oversize' },
    { tone: 'cream', hex: '#530E0E', category: 'laine', style: 'droit' },
    { tone: 'wood', hex: '#D9C3A9', category: 'trench', style: 'ceinture' },
    { tone: 'burgundy', hex: '#F1E4D6', category: 'fausse-fourrure', style: 'statement' },
    { tone: 'silk', hex: '#111111', category: 'doudounes', style: 'capuche' },
  ];
  for (let i = 0; i < ugc.length; i++) {
    const u = ugc[i];
    await renderScene({
      w: 900, h: 1125, tone: u.tone,
      figures: [{ hex: u.hex, category: u.category, style: u.style, scale: 0.78, x: 0.5, bottom: 0.03, slug: `ugc-${i}` }],
      file: path.join(OUT_LIFESTYLE, `ugc-0${i + 1}.jpg`),
    });
  }
  console.log(`✓ ${ugc.length} visuels UGC`);

  await renderScene({
    w: 1200, h: 630, tone: 'burgundy',
    figures: [{ hex: '#F1E4D6', category: 'manteaux-longs', style: 'ceinture', scale: 0.9, x: 0.78, bottom: 0.0 }],
    file: path.join(OUT_LIFESTYLE, 'og-image.jpg'),
  });
  console.log('✓ image Open Graph');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
