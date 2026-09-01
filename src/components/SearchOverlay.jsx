import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS, COLLECTION_ORDER } from '../data/taxonomy';
import { formatPrice } from '../lib/format';
import CoatImage from './CoatImage';
import { IconClose, IconSearch } from './Icons';

const normalize = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function SearchOverlay() {
  const { ui, closePanel } = useStore();
  const [q, setQ] = useState('');
  const input = useRef(null);

  useEffect(() => {
    if (ui.search) setTimeout(() => input.current?.focus(), 120);
    else setQ('');
  }, [ui.search]);

  const results = useMemo(() => {
    const term = normalize(q.trim());
    if (term.length < 2) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.color, p.style, COLLECTIONS[p.collection].title].some((f) => normalize(f).includes(term))
    ).slice(0, 8);
  }, [q]);

  const close = () => closePanel('search');

  return (
    <div className={`search${ui.search ? ' is-open' : ''}`} aria-hidden={!ui.search}>
      <div className="search__bar">
        <IconSearch />
        <input
          ref={input}
          className="search__input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un manteau…"
          aria-label="Rechercher un manteau"
        />
        <button type="button" className="icon-btn" onClick={close} aria-label="Fermer la recherche">
          <IconClose />
        </button>
      </div>

      <div className="search__results">
        {q.trim().length < 2 ? (
          <>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Suggestions</p>
            <div className="pills" style={{ justifyContent: 'flex-start' }}>
              {COLLECTION_ORDER.filter((k) => k !== 'all').map((key) => (
                <Link
                  key={key}
                  className="pill"
                  to={`/manteaux/${COLLECTIONS[key].slug}`}
                  onClick={close}
                >
                  {COLLECTIONS[key].title}
                </Link>
              ))}
            </div>
          </>
        ) : results.length === 0 ? (
          <p className="search__empty">Aucun manteau ne correspond à « {q} ».</p>
        ) : (
          <div className="grid">
            {results.map((p) => (
              <Link key={p.id} to={`/produit/${p.id}`} onClick={close} className="card">
                <div className="card__media">
                  <CoatImage product={p} className="card__img ph" />
                </div>
                <div className="card__info">
                  <h3 className="card__name">{p.name}</h3>
                  <span className="card__price price">{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
