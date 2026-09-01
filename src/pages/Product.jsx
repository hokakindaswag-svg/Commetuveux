import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, PRODUCTS } from '../data/products';
import { COLLECTIONS, COLORS } from '../data/taxonomy';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/format';
import CoatImage from '../components/CoatImage';
import ProductGrid from '../components/ProductGrid';
import Accordion from '../components/Accordion';
import SizeTable from '../components/SizeTable';
import TrustSection from '../components/TrustSection';
import Newsletter from '../components/Newsletter';
import NotFound from './NotFound';
import useSeo from '../lib/useSeo';
import { IconClose, IconHeart, IconLock, IconReturn, IconTruck } from '../components/Icons';

const GALLERY_SLOTS = 4;

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, toggleWishlist, isWished, notify } = useStore();
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);
  const [guide, setGuide] = useState(false);
  const [slide, setSlide] = useState(0);
  const ctaRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const mobileGallery = useRef(null);

  useEffect(() => {
    setSize(null);
    setError(false);
    setSlide(0);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return undefined;
    // Le rappel collant n'apparaît qu'une fois le bouton principal dépassé.
    const io = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting && window.scrollY > 320),
      { threshold: 0 }
    );
    io.observe(el);
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      setSticky(window.scrollY > 320 && (r.bottom < 0 || r.top > window.innerHeight));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [id]);

  useSeo(
    product
      ? {
          title: `${product.name} — Manteau femme ${product.price}€ | Le Closet`,
          description: `${product.description} Coloris ${product.color}. Tailles ${product.sizes.join(', ')}. Livraison en France.`,
        }
      : { title: 'Produit introuvable — Le Closet' }
  );

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter((p) => p.id !== product.id && p.collection === product.collection).slice(0, 4)
        : [],
    [product]
  );

  if (!product) return <NotFound />;

  const soldOut = product.inventory === 0;
  const low = !soldOut && product.inventory <= 5;
  const wished = isWished(product.id);
  const imageCount = product.images.length || GALLERY_SLOTS;
  const slots = Array.from({ length: imageCount }, (_, i) => i);

  const submit = () => {
    if (soldOut) return;
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addToCart(product.id, size);
    notify(`${product.name} · taille ${size} ajouté au panier`);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    color: product.color,
    category: 'Manteaux femme',
    brand: { '@type': 'Brand', name: 'Le Closet' },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    },
  };

  return (
    <div className="pdp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="wrap">
        <nav className="crumbs" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link><span>/</span>
          <Link to="/manteaux">Manteaux</Link><span>/</span>
          <Link to={`/manteaux/${COLLECTIONS[product.collection].slug}`}>
            {COLLECTIONS[product.collection].title}
          </Link><span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__layout">
          <div>
            {/* Galerie mobile : slider plein écran */}
            <div className="pdp__gallery-mobile">
              <div
                className="gallery gallery--mobile"
                ref={mobileGallery}
                onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
              >
                {slots.map((i) => (
                  <div className="gallery__item" key={i}>
                    <CoatImage product={product} index={i} className="ph" priority={i === 0} />
                  </div>
                ))}
              </div>
              <div className="gallery__dots" role="tablist" aria-label="Photos du produit">
                {slots.map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={`gallery__dot${slide === i ? ' is-on' : ''}`}
                    aria-label={`Photo ${i + 1}`}
                    onClick={() => {
                      const el = mobileGallery.current;
                      if (el) el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Galerie desktop : mosaïque */}
            <div className="gallery pdp__gallery-desktop">
              {slots.map((i) => (
                <div className="gallery__item" key={i}>
                  <CoatImage product={product} index={i} className="ph" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>

          <div className="pdp__info">
            <h1 className="pdp__title">{product.name}</h1>

            <p className="pdp__price price">
              {product.compareAtPrice ? (
                <>
                  <span className="price--was">{formatPrice(product.compareAtPrice)}</span>
                  <span className="price--now">{formatPrice(product.price)}</span>
                </>
              ) : (
                formatPrice(product.price)
              )}
            </p>

            <p className="pdp__rating">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span>{product.rating.toFixed(1).replace('.', ',')} / 5 · {product.reviews} avis</span>
            </p>

            <p className="pdp__blurb">{product.description}</p>

            <div className="opt">
              <div className="opt__head">
                <span className="opt__label">Couleur</span>
                <span className="opt__value">{product.color}</span>
              </div>
              <div className="swatches">
                <button
                  type="button"
                  className="swatch is-on"
                  style={{ background: COLORS[product.color] }}
                  aria-label={`Coloris ${product.color}`}
                  aria-pressed="true"
                />
              </div>
            </div>

            <div className="opt">
              <div className="opt__head">
                <span className="opt__label">Taille</span>
                <button type="button" className="opt__link" onClick={() => setGuide(true)}>
                  Guide des tailles
                </button>
              </div>
              <div className="sizes" role="group" aria-label="Choisir une taille">
                {['XS', 'S', 'M', 'L', 'XL'].map((s) => {
                  const available = product.sizes.includes(s) && !soldOut;
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`size${size === s ? ' is-on' : ''}`}
                      disabled={!available}
                      aria-pressed={size === s}
                      onClick={() => { setSize(s); setError(false); }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {error && <p className="size-error" role="alert">Merci de choisir une taille.</p>}
              {!soldOut && (
                <p className={`stock${low ? ' stock--low' : ''}`}>
                  <span className="stock__dot" />
                  {low ? `Plus que ${product.inventory} exemplaires` : 'En stock — expédié sous 48 h'}
                </p>
              )}
            </div>

            <div className="pdp__cta" ref={ctaRef}>
              <button
                type="button"
                className="btn btn--burgundy btn--block btn--lg"
                onClick={submit}
                disabled={soldOut}
              >
                {soldOut ? 'Épuisé' : 'Ajouter au panier'}
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--block"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
              >
                <IconHeart width="15" height="15" style={{ fill: wished ? 'currentColor' : 'none' }} />
                {wished ? 'Dans la wishlist' : 'Ajouter à la wishlist'}
              </button>
            </div>

            <div className="pdp__usp">
              <ul>
                <li><IconTruck /> Livraison suivie — suivez votre commande jusqu’à sa livraison.</li>
                <li><IconReturn /> Retours simples — 14 jours pour effectuer un retour.</li>
                <li><IconLock /> Paiement sécurisé.</li>
              </ul>
            </div>

            <div style={{ marginTop: 26 }}>
              <Accordion title="Description" defaultOpen>
                <p>{product.description}</p>
                <ul>
                  <li>Style : {product.style}</li>
                  <li>Coloris : {product.color}</li>
                  <li>Collection : {COLLECTIONS[product.collection].title}</li>
                </ul>
              </Accordion>
              <Accordion title="Composition &amp; entretien">
                <p>{product.material}</p>
                <p>Nettoyage à sec recommandé. Ne pas sécher en machine.</p>
              </Accordion>
              <Accordion title="Guide des tailles">
                <SizeTable />
              </Accordion>
              <Accordion title="Livraison &amp; retours">
                <p>Livraison suivie en France. Vous recevez un numéro de suivi dès l’expédition.</p>
                <p>Vous disposez de 14 jours après réception pour effectuer un retour.</p>
                <p>
                  Détails sur les pages <Link to="/infos/livraison" className="link-underline">Livraison</Link> et{' '}
                  <Link to="/infos/retours" className="link-underline">Retours</Link>.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2 className="section-head__title" id="rel-title">Vous aimerez aussi</h2>
                <p className="section-head__sub">Dans la même famille de manteaux.</p>
              </div>
              <Link className="section-head__link" to={`/manteaux/${COLLECTIONS[product.collection].slug}`}>
                Tout voir
              </Link>
            </div>
            <ProductGrid products={related} priorityCount={0} />
          </div>
        </section>
      )}

      <TrustSection />
      <Newsletter />

      {/* CTA collant mobile */}
      <div className={`stickycta${sticky && !soldOut ? ' is-on' : ''}`}>
        <div className="stickycta__info">
          <p className="stickycta__name">{product.name}</p>
          <p className="stickycta__price price">
            {formatPrice(product.price)}{size ? ` · ${size}` : ''}
          </p>
        </div>
        <button type="button" className="btn btn--burgundy" onClick={submit}>Ajouter</button>
      </div>

      {/* Modale guide des tailles */}
      {guide && (
        <>
          <button
            type="button"
            className="scrim is-open"
            aria-label="Fermer le guide des tailles"
            onClick={() => setGuide(false)}
            style={{ border: 0 }}
          />
          <div className="modal" role="dialog" aria-modal="true" aria-label="Guide des tailles">
            <div className="modal__head">
              <span className="drawer__title">Guide des tailles</span>
              <button type="button" className="icon-btn" onClick={() => setGuide(false)} aria-label="Fermer">
                <IconClose />
              </button>
            </div>
            <div className="modal__body"><SizeTable /></div>
          </div>
        </>
      )}
    </div>
  );
}
