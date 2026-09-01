'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Price } from '@/components/ui/Price';
import { HeartIcon } from '@/components/ui/Icons';
import { availableSizes, isInStock } from '@/lib/catalog';
import type { Product, Size } from '@/types';

const badgeStyles: Record<string, string> = {
  'NOUVEAUTÉ': 'bg-cream text-wood',
  'BEST-SELLER': 'bg-burgundy text-cream',
  'DERNIÈRES PIÈCES': 'bg-wood text-cream',
  'ÉDITION LIMITÉE': 'bg-blush text-wood',
  'COUP DE CŒUR': 'bg-blush-soft text-wood',
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
      <div className="relative overflow-hidden bg-silk">
        <Link
          href={`/products/${product.slug}`}
          className="block"
          aria-label={`${product.name} — voir le produit`}
        >
          <div className="relative aspect-product w-full">
            <Image
              src={product.images[0]}
              alt={`${product.name} — coloris ${product.color.name}`}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-opacity duration-500 ease-closet group-hover:opacity-0"
            />
            {product.images[1] ? (
              <Image
                src={product.images[1]}
                alt=""
                aria-hidden="true"
                fill
                sizes={sizes}
                loading="lazy"
                className="scale-[1.02] object-cover opacity-0 transition-all duration-700 ease-closet group-hover:scale-100 group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        {product.badge ? (
          <span
            className={`pointer-events-none absolute left-3 top-3 px-2.5 py-1 text-2xs font-medium tracking-wider ${
              badgeStyles[product.badge] ?? 'bg-cream text-wood'
            }`}
          >
            {product.badge}
          </span>
        ) : null}

        {!inStock ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-wood/85 py-2 text-center text-2xs uppercase tracking-widest text-cream">
            Épuisé
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={
            wished
              ? `Retirer ${product.name} de la wishlist`
              : `Ajouter ${product.name} à la wishlist`
          }
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-cream/80 text-wood backdrop-blur-sm transition hover:bg-cream"
        >
          <HeartIcon filled={wished} width={17} height={17} className={wished ? 'text-burgundy' : ''} />
        </button>

        {/* Ajout rapide — desktop uniquement, pour ne pas encombrer la carte */}
        {inStock ? (
          <div className="pointer-events-none absolute inset-x-2 bottom-2 hidden lg:block">
            {quickAdd ? (
              <div className="pointer-events-auto flex items-stretch gap-px bg-cream p-1 animate-fade-in">
                {sizesAvailable.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      addToCart(product, size as Size);
                      setQuickAdd(false);
                    }}
                    className="flex-1 py-2 text-2xs font-medium tracking-wider text-wood transition-colors hover:bg-burgundy hover:text-cream"
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setQuickAdd(true)}
                className="pointer-events-auto w-full translate-y-2 bg-cream/95 py-3 text-2xs font-medium uppercase tracking-widest text-wood opacity-0 transition-all duration-300 ease-closet hover:bg-burgundy hover:text-cream group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
              >
                Ajout rapide
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div className="pt-3">
        <h3 className="text-[13px] uppercase tracking-wider text-wood">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-brown">{product.color.name}</p>
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="mt-1.5"
          showDiscount
        />
      </div>
    </article>
  );
}
