/**
 * Visuel éditorial de substitution (hero, bandeaux lifestyle, univers).
 * Remplacez-le en renseignant une URL d'image dans src/data/site.js
 * (hero.image, editorial.image, duo[].image…). Tant qu'aucune photo n'est
 * fournie, cette composition vectorielle est affichée : jamais d'image cassée.
 */

const TONES = {
  wood: { a: '#2A120C', b: '#6B4E3A', coat: '#160806', accent: '#F8E5D7' },
  burgundy: { a: '#3A0909', b: '#7E2C2C', coat: '#230505', accent: '#F3A0AA' },
  beach: { a: '#D9BFA6', b: '#F8E5D7', coat: '#5C4230', accent: '#530E0E' },
};

export default function Scene({ tone = 'wood', seed = 0, className = '', src, alt = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
  }

  const t = TONES[tone] || TONES.wood;
  const uid = `sc-${tone}-${seed}`;
  const flip = seed % 2 === 1;

  return (
    <svg
      className={className}
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt || 'Visuel éditorial Le Closet'}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={t.b} />
          <stop offset="62%" stopColor={t.a} />
          <stop offset="100%" stopColor={t.a} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.62" cy="0.3" r="0.55">
          <stop offset="0%" stopColor={t.accent} stopOpacity=".3" />
          <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-coat`} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={t.accent} stopOpacity=".2" />
          <stop offset="100%" stopColor={t.coat} stopOpacity=".92" />
        </linearGradient>
      </defs>

      <rect width="800" height="1000" fill={`url(#${uid}-bg)`} />
      <rect width="800" height="1000" fill={`url(#${uid}-glow)`} />

      {/* motif léopard, très discret — texture éditoriale */}
      <g opacity=".07" fill={t.accent}>
        {Array.from({ length: 26 }, (_, i) => {
          const x = ((i * 137) % 760) + 20;
          const y = ((i * 271) % 940) + 30;
          const r = 8 + ((i * 13) % 11);
          return <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.72} transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>

      {/* grand manteau, cadrage campagne */}
      {/* Le manteau reste entièrement visible quel que soit le recadrage (slice). */}
      <g transform={`translate(${flip ? 330 : 470} 470) scale(${flip ? -1.55 : 1.55} 1.55) translate(-150 -227)`}>
        <ellipse cx="150" cy="356" rx="112" ry="12" fill="#000" opacity=".18" />
        <path d="M99,103 C84,108 76,120 73,134 L62,300 L90,300 L97,150 Z" fill={t.coat} opacity=".9" />
        <path d="M201,103 C216,108 224,120 227,134 L238,300 L210,300 L203,150 Z" fill={t.coat} opacity=".9" />
        <path d="M98,102 L202,102 L226,352 L74,352 Z" fill={`url(#${uid}-coat)`} />
        <path d="M128,102 L150,158 L150,102 Z" fill={t.accent} opacity=".22" />
        <path d="M172,102 L150,158 L150,102 Z" fill="#000" opacity=".18" />
        <rect x="72" y="238" width="156" height="16" fill="#000" opacity=".22" />
        <path d="M150,162 V340" stroke="#000" strokeWidth="1.4" opacity=".25" />
        <path d="M98,102 L202,102 L226,352 L74,352 Z" fill="none" stroke={t.accent} strokeWidth="1.6" opacity=".2" />
      </g>

      <rect width="800" height="1000" fill="#000" opacity=".06" />
    </svg>
  );
}
