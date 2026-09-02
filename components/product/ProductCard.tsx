'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Price } from '@/components/ui/Price';
import { HeartIcon } from '@/components/ui/Icons';
import { availableSizes, isInStock } from '@/lib/catalog';
import { assetPath } from '@/lib/paths';
import type { Product, Size } from '@/types';

/** Badges maison : discrets, typographiés, jamais criards. */
const badgeStyles: Record<string, string> = {
  NOUVEAU: 'bg-cream text-burgundy',
  'BEST-SELLER': 'bg-burgundy text-ivory',
  'DERNIÈRES PIÈCES': 'bg-chocolate text-ivory',
  'ÉDITION LIMITÉE': 'bg-pink text-chocolate',
  'COUP DE CŒUR': 'bg-pink-soft text-chocolate',
};

export function ProductCard({
  product,
  priority = false,
  sizes = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw',
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated } = useStore();
  const [quickAdd, setQuickAdd] = useState(false);
  const wished = hydrated && isWishlisted(product.id);
  const inStock = isInStock(product);
  const sizesAvailable = availableSizes(product);

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-ivory">
        <Link
          href={`/products/${product.slug}`}
          className="block"
          aria-label={`${product.name} — voir le produit`}
        >
          <div className="relative aspect-product w-full">
            <Image
              src={assetPath(product.images[0])}
              alt={`${product.name} — coloris ${product.color.name}`}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-opacity duration-500 ease-studio group-hover:opacity-0"
            />
            {product.images[1] ? (
              <Image
                src={assetPath(product.images[1])}
                alt=""
                aria-hidden="true"
                fill
                sizes={sizes}
                loading="lazy"
                className="scale-[1.02] object-cover opacity-0 transition-all duration-700 ease-studio group-hover:scale-100 group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        {/* Cadre fin qui se révèle au survol — rappel du cadrage éditorial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 border border-ivory/0 transition-colors duration-500 ease-studio group-hover:border-ivory/70"
        />

        {product.badge ? (
          <span
            className={`pointer-events-none absolute left-3 top-3 px-2.5 py-1.5 text-[10px] uppercase tracking-brand ${
              badgeStyles[product.badge] ?? 'bg-cream text-burgundy'
            }`}
          >
            {product.badge}
          </span>
        ) : null}

        {!inStock ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-chocolate/85 py-2.5 text-center text-2xs uppercase tracking-brand text-ivory">
            Épuisé
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={
            wished
              ? `Retirer ${product.name} de ma sélection`
              : `Ajouter ${product.name} à ma sélection`
          }
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-cream/85 text-chocolate backdrop-blur-sm transition hover:bg-cream"
        >
          <HeartIcon
            filled={wished}
            width={17}
            height={17}
            className={wished ? 'text-burgundy' : ''}
          />
        </button>

        {/* Ajout rapide — desktop uniquement, pour garder la carte épurée */}
        {inStock ? (
          <div className="pointer-events-none absolute inset-x-2 bottom-2 hidden lg:block">
            {quickAdd ? (
              <div className="pointer-events-auto flex animate-fade-in items-stretch gap-px bg-cream p-1">
                {sizesAvailable.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      addToCart(product, size as Size);
                      setQuickAdd(false);
                    }}
                    className="flex-1 py-2.5 text-[10px] font-medium uppercase tracking-widest text-chocolate transition-colors hover:bg-burgundy hover:text-ivory"
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setQuickAdd(true)}
                className="pointer-events-auto w-full translate-y-2 bg-cream/95 py-3.5 text-[10px] font-medium uppercase tracking-brand text-chocolate opacity-0 transition-all duration-300 ease-studio hover:bg-burgundy hover:text-ivory group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
              >
                Ajout rapide
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div className="pt-4">
        <h3 className="text-[11px] uppercase tracking-brand text-chocolate">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-xs text-brown">{product.color.name}</p>
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="mt-2"
          showDiscount
        />
      </div>
    </article>
  );
}
