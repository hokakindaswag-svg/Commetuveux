import { useState } from 'react';
import { COLORS, SIZES, STYLES } from '../data/taxonomy';
import { PRICE_BUCKETS, facetCounts } from '../lib/catalog';

function Group({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="fgroup">
      <button type="button" className="fgroup__head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {title}
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="fgroup__body">{children}</div>}
    </div>
  );
}

function Option({ checked, onChange, label, count, swatch }) {
  return (
    <label className="fopt">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="fopt__box" aria-hidden="true" />
      {swatch && <span className="fopt__swatch" style={{ background: swatch }} aria-hidden="true" />}
      <span>{label}</span>
      {count !== undefined && <span className="fopt__n">({count})</span>}
    </label>
  );
}

export default function Filters({ filters, toggle, clear, pool, activeCount }) {
  const cSize = facetCounts(pool, 'taille');
  const cColor = facetCounts(pool, 'color');
  const cStyle = facetCounts(pool, 'style');

  return (
    <div className="filters">
      <Group title="Disponibilité">
        <Option
          label="En stock"
          checked={filters.dispo.includes('en-stock')}
          onChange={() => toggle('dispo', 'en-stock')}
          count={pool.filter((p) => p.inventory > 0).length}
        />
        <Option
          label="Épuisé"
          checked={filters.dispo.includes('epuise')}
          onChange={() => toggle('dispo', 'epuise')}
          count={pool.filter((p) => p.inventory === 0).length}
        />
      </Group>

      <Group title="Taille">
        {SIZES.map((s) => (
          <Option
            key={s}
            label={s}
            checked={filters.taille.includes(s)}
            onChange={() => toggle('taille', s)}
            count={cSize[s] || 0}
          />
        ))}
      </Group>

      <Group title="Couleur">
        {Object.keys(COLORS)
          .filter((c) => cColor[c])
          .map((c) => (
            <Option
              key={c}
              label={c}
              swatch={COLORS[c]}
              checked={filters.couleur.includes(c)}
              onChange={() => toggle('couleur', c)}
              count={cColor[c]}
            />
          ))}
      </Group>

      <Group title="Prix">
        {PRICE_BUCKETS.filter((b) => pool.some(b.test)).map((b) => (
          <Option
            key={b.id}
            label={b.label}
            checked={filters.prix.includes(b.id)}
            onChange={() => toggle('prix', b.id)}
            count={pool.filter(b.test).length}
          />
        ))}
      </Group>

      <Group title="Style">
        {STYLES.filter((s) => cStyle[s]).map((s) => (
          <Option
            key={s}
            label={s}
            checked={filters.style.includes(s)}
            onChange={() => toggle('style', s)}
            count={cStyle[s]}
          />
        ))}
      </Group>

      {activeCount > 0 && (
        <button type="button" className="filters__clear" onClick={clear}>
          Tout effacer ({activeCount})
        </button>
      )}
    </div>
  );
}
