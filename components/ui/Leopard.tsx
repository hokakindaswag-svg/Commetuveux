/* ------------------------------------------------------------------ */
/*  Signature léopard STUDIO NEIGE PARIS                               */
/*                                                                     */
/*  Motif vectoriel, dessiné en SVG plutôt qu'en dégradés CSS : de     */
/*  vraies rosettes — anneaux brisés, irréguliers, tournés — et non un */
/*  quadrillage de pois. Les couleurs viennent des tokens de charte.   */
/*                                                                     */
/*  À utiliser par touches (filets, encarts), jamais en aplat général. */
/* ------------------------------------------------------------------ */

const TILE = 260;

/** Générateur déterministe : le motif est identique à chaque rendu
 *  (serveur comme client), donc aucune désynchronisation d'hydratation. */
function makeRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

interface Rosette {
  cx: number;
  cy: number;
  r: number;
  rotation: number;
  /** Anneau brisé : chaque tache est un fragment autour du centre. */
  petals: { angle: number; distance: number; rx: number; ry: number; tilt: number }[];
  solid: boolean;
}

function buildRosettes(): Rosette[] {
  const rand = makeRandom(20260902);
  const out: Rosette[] = [];

  // Placement en grille volontairement déréglée : les rosettes sont
  // décalées de façon aléatoire pour casser toute lecture de quadrillage.
  const columns = 3;
  const rows = 3;
  const step = TILE / columns;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      // Une case sur huit reste vide : le léopard n'est jamais régulier.
      if (rand() < 0.12) continue;

      const cx = col * step + step * (0.1 + rand() * 0.8);
      const cy = row * step + step * (0.1 + rand() * 0.8);
      const r = 17 + rand() * 13;
      const solid = rand() < 0.28;

      // Peu de fragments, mais épais : une rosette de léopard est un anneau
      // brisé en 3 ou 4 taches massives, pas une corolle de pétales fins.
      const petalCount = solid ? 0 : 3 + Math.floor(rand() * 2);
      const startAngle = rand() * 360;
      const petals = Array.from({ length: petalCount }, (_, i) => {
        const spread = 360 / petalCount;
        const angle = startAngle + i * spread + (rand() - 0.5) * spread * 0.4;
        return {
          angle,
          distance: r * (0.5 + rand() * 0.14),
          // rx suit la tangente de l'anneau (cf. rotation +90 au tracé)
          rx: r * (0.42 + rand() * 0.2),
          ry: r * (0.26 + rand() * 0.12),
          tilt: (rand() - 0.5) * 26,
        };
      });

      out.push({ cx, cy, r, rotation: rand() * 360, petals, solid });
    }
  }

  // Semis de petites taches pleines entre les rosettes, comme sur une vraie
  // fourrure : c'est ce qui casse définitivement l'effet « pois réguliers ».
  for (let i = 0; i < 14; i++) {
    const r = 3.5 + rand() * 4;
    out.push({
      cx: rand() * TILE,
      cy: rand() * TILE,
      r,
      rotation: rand() * 360,
      petals: [],
      solid: true,
    });
  }

  return out;
}

const ROSETTES = buildRosettes();

function RosetteShape({ rosette, dx, dy }: { rosette: Rosette; dx: number; dy: number }) {
  const { cx, cy, r, rotation, petals, solid } = rosette;
  const x = cx + dx;
  const y = cy + dy;

  if (solid) {
    return (
      <ellipse
        cx={x}
        cy={y}
        rx={r * 0.5}
        ry={r * 0.4}
        transform={`rotate(${rotation} ${x} ${y})`}
        style={{ fill: 'rgb(var(--color-chocolate))' }}
        opacity="0.82"
      />
    );
  }

  return (
    <g transform={`rotate(${rotation} ${x} ${y})`}>
      {/* Cœur fauve de la rosette */}
      <ellipse cx={x} cy={y} rx={r * 0.5} ry={r * 0.4} style={{ fill: 'rgb(var(--color-brown))' }} opacity="0.42" />
      {/* Anneau brisé */}
      {petals.map((petal, i) => {
        const radians = (petal.angle * Math.PI) / 180;
        const px = x + Math.cos(radians) * petal.distance;
        const py = y + Math.sin(radians) * petal.distance * 0.78;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={petal.rx}
            ry={petal.ry}
            transform={`rotate(${petal.angle + 90 + petal.tilt} ${px} ${py})`}
            style={{ fill: 'rgb(var(--color-chocolate))' }}
            opacity="0.86"
          />
        );
      })}
    </g>
  );
}

/** Décalages de raccord, pour que la tuile se répète sans coupure. */
function wrapOffsets(rosette: Rosette): [number, number][] {
  const margin = rosette.r * 1.6;
  const xs = [0];
  const ys = [0];
  if (rosette.cx < margin) xs.push(TILE);
  if (rosette.cx > TILE - margin) xs.push(-TILE);
  if (rosette.cy < margin) ys.push(TILE);
  if (rosette.cy > TILE - margin) ys.push(-TILE);
  return xs.flatMap((dx) => ys.map((dy) => [dx, dy] as [number, number]));
}

function LeopardPatternDefs({ id, scale }: { id: string; scale: number }) {
  return (
    <defs>
      <pattern
        id={id}
        patternUnits="userSpaceOnUse"
        width={TILE * scale}
        height={TILE * scale}
        viewBox={`0 0 ${TILE} ${TILE}`}
      >
        {ROSETTES.map((rosette, i) =>
          wrapOffsets(rosette).map(([dx, dy], j) => (
            <RosetteShape key={`${i}-${j}`} rosette={rosette} dx={dx} dy={dy} />
          ))
        )}
      </pattern>
    </defs>
  );
}

/**
 * Texture léopard en fond d'un bloc.
 * Le parent doit être `relative` (et de préférence `overflow-hidden`).
 */
export function LeopardTexture({
  id = 'leopard-texture',
  scale = 1,
  className = '',
  opacity = 1,
}: {
  id?: string;
  /** 1 = tuile de 260 px. En dessous, motif plus serré. */
  scale?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <LeopardPatternDefs id={id} scale={scale} />
      <rect width="100%" height="100%" style={{ fill: 'rgb(var(--color-ivory))' }} />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Filet léopard : hairline de séparation entre deux sections, façon ruban.
 */
export function LeopardRule({
  id = 'leopard-rule',
  className = '',
}: {
  id?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`relative h-2 w-full overflow-hidden ${className}`}>
      <LeopardTexture id={id} scale={0.14} />
    </div>
  );
}
