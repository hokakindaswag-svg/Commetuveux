'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Price } from '@/components/ui/Price';
import { Stars } from '@/components/ui/Stars';
import { HeartIcon, LockIcon, ReturnIcon, TruckIcon } from '@/components/ui/Icons';
import { SizeGuideButton } from './SizeGuide';
import { isInStock } from '@/lib/catalog';
import type { Product, Size } from '@/types';

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated } = useStore();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const wished = hydrated && isWishlisted(product.id);
  const inStock = isInStock(product);

  // La barre d'achat mobile apparaît quand le bloc principal sort de l'écran.
  useEffect(() => {
    const node = blockRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: '-120px 0px 0px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const submit = () => {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addToCart(product, size);
  };

  return (
    <>
      <div ref={blockRef}>
        <h1 className="font-display text-[30px] font-light uppercase leading-[1.15] tracking-[0.1em] text-chocolate sm:text-[36px]">
          {product.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" showDiscount />
          {/* Pas d'étoiles tant qu'il n'y a pas de vrais avis : afficher une
              note inventée serait une fausse preuve sociale. */}
          {product.reviewCount > 0 ? (
            <Stars rating={product.rating} reviewCount={product.reviewCount} />
          ) : null}
        </div>

        <div className="mt-8">
          <p className="text-2xs uppercase tracking-widest text-chocolate">
            Couleur : <span className="text-brown">{product.color.name}</span>
          </p>
          <span
            className="mt-3 inline-block h-9 w-9 rounded-full border border-chocolate ring-1 ring-chocolate ring-offset-2 ring-offset-cream"
            style={{ backgroundColor: product.color.hex }}
            aria-hidden="true"
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-2xs uppercase tracking-widest text-chocolate">Taille</p>
            <SizeGuideButton />
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choisir une taille">
            {product.sizes.map((s) => {
              const stock = product.inventory[s];
              const disabled = stock === 0;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={disabled}
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={`relative min-w-[58px] border px-4 py-3 text-xs transition-colors ${
                    size === s
                      ? 'border-burgundy bg-burgundy text-cream'
                      : disabled
                        ? 'cursor-not-allowed border-chocolate/15 text-chocolate/35 line-through'
                        : 'border-chocolate/25 text-chocolate hover:border-chocolate'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {error ? (
            <p role="alert" className="mt-3 text-xs text-burgundy">
              Merci de choisir une taille.
            </p>
          ) : null}

          {size && product.inventory[size] > 0 && product.inventory[size] <= 4 ? (
            <p className="mt-3 text-xs text-burgundy">
              Plus que {product.inventory[size]} en taille {size}.
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex items-stretch gap-3">
          {inStock ? (
            <a
              href={
                product.price <= 19.99
                  ? 'https://t.trklinkx.com/click?pid=4784&offer_id=13057&sub3=tri'
                  : 'https://t.trklinkx.com/click?pid=4784&offer_id=12355&sub3=tri'
              }
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary flex-1 text-center"
            >
              Acheter maintenant
            </a>
          ) : (
            <button type="button" disabled className="btn-primary flex-1">
              Épuisé
            </button>
          )}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={wished}
            aria-label={wished ? 'Retirer de ma sélection' : 'Ajouter à ma sélection'}
            className="grid w-14 place-items-center border border-chocolate/25 text-chocolate transition-colors hover:border-chocolate"
          >
            <HeartIcon filled={wished} width={20} height={20} className={wished ? 'text-burgundy' : ''} />
          </button>
        </div>

        {inStock && (
          <button
            type="button"
            onClick={submit}
            className="btn-secondary mt-3 block w-full text-center"
          >
            Ajouter au panier
          </button>
        )}

        <ul className="mt-8 space-y-3 border-t border-chocolate/10 pt-6 text-xs text-brown">
          <li className="flex items-center gap-3">
            <TruckIcon width={18} height={18} className="text-burgundy" />
            Livraison suivie en France — expédition sous 48 h ouvrées
          </li>
          <li className="flex items-center gap-3">
            <ReturnIcon width={18} height={18} className="text-burgundy" />
            Retours sous 14 jours
          </li>
          <li className="flex items-center gap-3">
            <LockIcon width={18} height={18} className="text-burgundy" />
            Paiement sécurisé — CB, Apple Pay, PayPal
          </li>
        </ul>
      </div>

      {/* Barre d'achat collante — mobile */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-chocolate/10 bg-cream/95 px-4 py-3 backdrop-blur transition-transform duration-300 ease-studio lg:hidden ${
          stickyVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-2xs uppercase tracking-wider text-chocolate">{product.name}</p>
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
          <label className="sr-only" htmlFor="sticky-size">
            Taille
          </label>
          <select
            id="sticky-size"
            value={size ?? ''}
            onChange={(e) => {
              setSize(e.target.value as Size);
              setError(false);
            }}
            className="border border-chocolate/25 bg-cream px-3 py-3 text-xs text-chocolate focus:border-burgundy focus:outline-none"
          >
            <option value="">Taille</option>
            {product.sizes
              .filter((s) => product.inventory[s] > 0)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={submit}
            disabled={!inStock}
            className="btn-primary px-6 py-3.5"
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}
