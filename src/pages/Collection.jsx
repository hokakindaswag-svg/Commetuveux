import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { COLLECTIONS, COLLECTION_ORDER, SORTS } from '../data/taxonomy';
import { applyFilters, applySort, baseProducts, PRICE_BUCKETS } from '../lib/catalog';
import { useStore } from '../context/StoreContext';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import Newsletter from '../components/Newsletter';
import useSeo from '../lib/useSeo';
import { IconClose, IconSliders, IconSort } from '../components/Icons';
import { plural } from '../lib/format';

const FILTER_KEYS = ['dispo', 'taille', 'couleur', 'prix', 'style'];
const PER_PAGE = 24;

const SCOPES = {
  nouveautes: { title: 'Nouveautés', subtitle: 'Les dernières arrivées, avant tout le monde.' },
  'best-sellers': { title: 'Best-sellers', subtitle: 'Les manteaux qui partent le plus vite.' },
  promotions: { title: 'Promotions', subtitle: 'Les remises en cours sur une sélection de manteaux.' },
};

export default function Collection({ scope }) {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const { ui, openPanel, closePanel } = useStore();
  const [visible, setVisible] = useState(PER_PAGE);

  const collectionKey =
    !scope && slug ? Object.keys(COLLECTIONS).find((k) => COLLECTIONS[k].slug === slug) : null;

  const head = scope
    ? SCOPES[scope]
    : collectionKey
      ? COLLECTIONS[collectionKey]
      : COLLECTIONS.all;

  const pool = useMemo(() => baseProducts(scope, slug), [scope, slug]);

  const filters = useMemo(
    () =>
      Object.fromEntries(
        FILTER_KEYS.map((k) => [k, params.get(k) ? params.get(k).split(',').filter(Boolean) : []])
      ),
    [params]
  );

  const sort = params.get('tri') || 'nouveautes';
  const activeCount = FILTER_KEYS.reduce((n, k) => n + filters[k].length, 0);

  const products = useMemo(
    () => applySort(applyFilters(pool, filters), sort),
    [pool, filters, sort]
  );

  useEffect(() => setVisible(PER_PAGE), [slug, scope, params]);

  useSeo({
    title: `${head.title} — Le Closet`,
    description: `${head.subtitle} ${products.length} manteaux femme à partir de 50€, livrés en France.`,
  });

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => {
      if (!v || (Array.isArray(v) && v.length === 0)) p.delete(k);
      else p.set(k, Array.isArray(v) ? v.join(',') : v);
    });
    setParams(p, { replace: true });
  };

  const toggle = (key, value) => {
    const current = filters[key];
    update({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });
  };

  const clear = () => update(Object.fromEntries(FILTER_KEYS.map((k) => [k, []])));

  const chips = FILTER_KEYS.flatMap((key) =>
    filters[key].map((value) => ({
      key,
      value,
      label:
        key === 'prix'
          ? PRICE_BUCKETS.find((b) => b.id === value)?.label || value
          : key === 'dispo'
            ? value === 'en-stock' ? 'En stock' : 'Épuisé'
            : value,
    }))
  );

  const sortLabel = SORTS.find((s) => s.id === sort)?.label ?? 'Nouveautés';

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link><span>/</span>
          {scope || collectionKey ? (
            <>
              <Link to="/manteaux">Manteaux</Link><span>/</span>
              <span aria-current="page">{head.title}</span>
            </>
          ) : (
            <span aria-current="page">Manteaux</span>
          )}
        </nav>
      </div>

      <header className="collhead">
        <div className="wrap">
          <h1 className="collhead__title">{head.title}</h1>
          <p className="collhead__sub">{head.subtitle}</p>
        </div>
      </header>

      <div className="wrap">
        <div className="pills">
          <Link className={`pill${!slug && !scope ? ' is-active' : ''}`} to="/manteaux">Tous les manteaux</Link>
          {COLLECTION_ORDER.filter((k) => k !== 'all').map((k) => (
            <Link
              key={k}
              className={`pill${slug === COLLECTIONS[k].slug ? ' is-active' : ''}`}
              to={`/manteaux/${COLLECTIONS[k].slug}`}
            >
              {COLLECTIONS[k].title}
            </Link>
          ))}
        </div>
      </div>

      <div className="toolbar">
        <button type="button" className="toolbar__btn toolbar__btn--filters" onClick={() => openPanel('filters')}>
          <IconSliders /> Filtres{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
        <span className="toolbar__count">{plural(products.length, 'pièce', 'pièces')}</span>
        <button type="button" className="toolbar__btn" onClick={() => openPanel('sort')}>
          <IconSort /> Trier<span className="toolbar__sortlabel"> : {sortLabel}</span>
        </button>
      </div>

      <div className="wrap" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div className="collection__layout">
          <aside className="collection__aside collection__aside--desktop" aria-label="Filtres">
            <Filters filters={filters} toggle={toggle} clear={clear} pool={pool} activeCount={activeCount} />
          </aside>

          <div>
            {chips.length > 0 && (
              <div className="chips">
                {chips.map((c) => (
                  <button type="button" className="chip" key={`${c.key}-${c.value}`} onClick={() => toggle(c.key, c.value)}>
                    {c.label} <IconClose />
                  </button>
                ))}
                <button type="button" className="chip" onClick={clear} style={{ color: 'var(--burgundy)' }}>
                  Tout effacer
                </button>
              </div>
            )}

            {products.length === 0 ? (
              <div className="empty">
                {activeCount === 0 ? (
                  <>
                    <h3>
                      {scope === 'promotions'
                        ? 'Aucune promotion en ce moment'
                        : 'Aucun manteau dans cette sélection'}
                    </h3>
                    <p>
                      {scope === 'promotions'
                        ? 'Nos manteaux sont déjà à prix doux — à partir de 50 €, toute l’année.'
                        : 'Revenez très vite, la sélection évolue chaque semaine.'}
                    </p>
                    <Link to="/manteaux" className="btn btn--burgundy btn--lg">Voir tous les manteaux</Link>
                  </>
                ) : (
                  <>
                    <h3>Aucun manteau ne correspond à votre sélection</h3>
                    <p>Essayez d’élargir vos filtres.</p>
                    <button type="button" className="btn btn--burgundy" onClick={clear}>
                      Effacer les filtres
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <ProductGrid products={products.slice(0, visible)} priorityCount={4} />
                {visible < products.length && (
                  <div className="loadmore">
                    <p className="loadmore__count">
                      {visible} sur {products.length} manteaux
                    </p>
                    <button
                      type="button"
                      className="btn btn--ghost btn--lg"
                      onClick={() => setVisible((v) => v + PER_PAGE)}
                    >
                      Voir plus
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Newsletter />

      {/* Filtres — tiroir mobile */}
      <aside className={`drawer drawer--left${ui.filters ? ' is-open' : ''}`} aria-hidden={!ui.filters} aria-label="Filtres">
        <div className="drawer__head">
          <span className="drawer__title">Filtres</span>
          <button type="button" className="icon-btn" onClick={() => closePanel('filters')} aria-label="Fermer les filtres">
            <IconClose />
          </button>
        </div>
        <div className="drawer__body" style={{ padding: '0 22px' }}>
          <Filters filters={filters} toggle={toggle} clear={clear} pool={pool} activeCount={activeCount} />
        </div>
        <div className="drawer__foot">
          <button type="button" className="btn btn--burgundy btn--block btn--lg" onClick={() => closePanel('filters')}>
            Voir {plural(products.length, 'pièce', 'pièces')}
          </button>
        </div>
      </aside>

      {/* Tri — tiroir */}
      <aside className={`drawer drawer--right${ui.sort ? ' is-open' : ''}`} aria-hidden={!ui.sort} aria-label="Trier">
        <div className="drawer__head">
          <span className="drawer__title">Trier par</span>
          <button type="button" className="icon-btn" onClick={() => closePanel('sort')} aria-label="Fermer le tri">
            <IconClose />
          </button>
        </div>
        <div className="drawer__body sortlist">
          {SORTS.map((s) => (
            <button
              type="button"
              key={s.id}
              className={sort === s.id ? 'is-active' : ''}
              onClick={() => {
                update({ tri: s.id === 'nouveautes' ? null : s.id });
                closePanel('sort');
              }}
            >
              {s.label}
              {sort === s.id && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
