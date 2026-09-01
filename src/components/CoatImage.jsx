import { COLORS } from '../data/taxonomy';

/**
 * Visuel produit.
 * — Si le produit possède une photo (`images[index]`), elle est affichée.
 * — Sinon, un visuel de substitution vectoriel est dessiné aux bonnes proportions,
 *   dans la couleur du manteau. Aucune image n'est donc jamais cassée ni déformée.
 *
 * `index` : 0 = face, 1 = détail col, 2 = face (fond alternatif), 3 = détail bas.
 */

const SPEC = {
  long:     { hem: 352, sleeve: 300, flare: 32 },
  court:    { hem: 268, sleeve: 252, flare: 16 },
  doudoune: { hem: 272, sleeve: 254, flare: 22 },
  fourrure: { hem: 302, sleeve: 268, flare: 34 },
  teddy:    { hem: 268, sleeve: 252, flare: 18 },
  cuir:     { hem: 298, sleeve: 264, flare: 20 },
};

const BACKGROUNDS = ['#F3ECE3', '#EFE7DC', '#F6F1EA', '#EDE4D9'];

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.max(0, Math.min(255, Math.round(c + amount)))
  );
  return `rgb(${ch.join(',')})`;
}

const hashOf = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 100000;
  return h;
};

export default function CoatImage({ product, index = 0, className = '', priority = false }) {
  const src = product.images?.[index] ?? product.images?.[0];
  const alt = `${product.name} — manteau femme ${product.style.toLowerCase()}, coloris ${product.color.toLowerCase()}, Le Closet`;

  if (src) {
    return (
      <img src={src} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    );
  }

  const key = SPEC[product.silhouette] ? product.silhouette : 'long';
  const { hem, sleeve, flare } = SPEC[key];
  const base = COLORS[product.color] || '#B98B55';
  const dark = shade(base, -40);
  const darker = shade(base, -68);
  const light = shade(base, 30);
  const uid = `${product.id}-${index}`;
  const bg = BACKGROUNDS[(hashOf(product.id) + index) % BACKGROUNDS.length];
  const belted = product.style === 'Ceinturé';
  const hooded = product.style === 'À capuche';

  // Corps : épaules 98→202, ourlet évasé selon la silhouette.
  const L = 88 - flare / 2;
  const R = 212 + flare / 2;
  const body = `M98,102 L202,102 L${R},${hem} L${L},${hem} Z`;

  // Manches, greffées sous l'épaule et affinées vers le poignet.
  const sleeveL = `M100,103 C88,109 82,121 80,136 L72,${sleeve} L94,${sleeve} L100,154 Z`;
  const sleeveR = `M200,103 C212,109 218,121 220,136 L228,${sleeve} L206,${sleeve} L200,154 Z`;

  // Revers en V.
  const lapelL = `M128,102 L150,152 L150,102 Z`;
  const lapelR = `M172,102 L150,152 L150,102 Z`;

  // Cadrage : hauteur = ourlet + marge, largeur déduite pour garder le ratio 3/4.
  const vh = hem + 20;
  const vw = vh * 0.75;
  const front = `${150 - vw / 2} 46 ${vw} ${vh}`;
  const zoom =
    index === 1 ? '94 84 120 160' : index === 3 ? `${L + 4} ${hem - 140} 120 160` : front;

  return (
    <svg
      className={className}
      viewBox={zoom}
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`gs-${uid}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={base} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <pattern id={`p-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
          {key === 'teddy' && <circle cx="8" cy="8" r="4" fill={light} opacity=".4" />}
          {key === 'fourrure' && (
            <path d="M0 8q4-6 8 0t8 0" stroke={light} strokeWidth="2" fill="none" opacity=".45" />
          )}
          {(key === 'long' || key === 'court') && (
            <path d="M8 0v16M0 8h16" stroke={darker} strokeWidth=".6" opacity=".18" />
          )}
          {key === 'cuir' && <path d="M0 16 16 0" stroke={light} strokeWidth="1" opacity=".16" />}
        </pattern>
        <clipPath id={`c-${uid}`}><path d={body} /></clipPath>
      </defs>

      <rect x="-40" y="-40" width="400" height="500" fill={bg} />

      {/* ombre au sol */}
      <ellipse cx="150" cy={hem + 10} rx={(R - L) / 2 - 4} ry="9" fill="#30150E" opacity=".08" />

      {hooded && <path d="M116,110 C118,64 182,64 184,110 C168,96 132,96 116,110 Z" fill={dark} />}

      {/* corps */}
      <path d={body} fill={`url(#g-${uid})`} />
      <path d={body} fill={`url(#p-${uid})`} />

      <g clipPath={`url(#c-${uid})`}>
        {key === 'doudoune' &&
          [0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M40,${132 + i * 28} H260`} stroke={darker} strokeWidth="2" opacity=".4" />
          ))}
        {belted && <rect x="40" y={hem - 108} width="220" height="15" fill={darker} opacity=".8" />}
        <path d={lapelL} fill={light} opacity=".5" />
        <path d={lapelR} fill={darker} opacity=".28" />
        {/* épaulure */}
        <path d="M98,102 L202,102 L196,124 L104,124 Z" fill={light} opacity=".16" />
      </g>

      {/* manches, posées au-dessus du corps pour rester lisibles */}
      <path d={sleeveL} fill={`url(#gs-${uid})`} />
      <path d={sleeveR} fill={`url(#gs-${uid})`} />
      <path d={sleeveL} fill={`url(#p-${uid})`} />
      <path d={sleeveR} fill={`url(#p-${uid})`} />
      <path d={sleeveL} fill="none" stroke={darker} strokeWidth="1.1" opacity=".45" />
      <path d={sleeveR} fill="none" stroke={darker} strokeWidth="1.1" opacity=".45" />

      {/* col */}
      <path d="M126,101 L150,152 L174,101 L166,99 L150,138 L134,99 Z" fill={darker} opacity=".45" />

      {/* boutonnage */}
      <path d={`M150,156 V${hem - 14}`} stroke={darker} strokeWidth="1" opacity=".4" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="150" cy={178 + i * ((hem - 200) / 2.4)} r="3.4" fill={darker} opacity=".7" />
      ))}

      <path d={body} fill="none" stroke={darker} strokeWidth="1.2" opacity=".5" />
      <path d={lapelL} fill="none" stroke={darker} strokeWidth="1" opacity=".4" />
      <path d={lapelR} fill="none" stroke={darker} strokeWidth="1" opacity=".4" />
    </svg>
  );
}
