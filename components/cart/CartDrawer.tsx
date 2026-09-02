'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { Drawer } from '@/components/ui/Drawer';
import { Price } from '@/components/ui/Price';
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/format';
import { recommendationsFor } from '@/lib/catalog';
import { site } from '@/data/site';
import { assetPath } from '@/lib/paths';

export function CartDrawer() {
  const { lines, cartOpen, closeCart, removeFromCart, setQuantity, subtotal, savings, cartCount } =
    useStore();

  const recommendations = recommendationsFor(
    lines.map((l) => l.productId),
    4
  );
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <Drawer
      open={cartOpen}
      onClose={closeCart}
      title={`Votre sélection${cartCount ? ` (${cartCount})` : ''}`}
      labelledBy="cart-title"
      footer={
        lines.length ? (
          <div className="px-5 py-5 sm:px-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-chocolate">Sous-total</span>
              <span className="text-lg font-medium text-burgundy">{formatPrice(subtotal)}</span>
            </div>
            {savings > 0 ? (
              <p className="mt-1 text-right text-xs text-brown">
                Vous économisez {formatPrice(savings)}
              </p>
            ) : null}
            <p className="mt-2 text-2xs uppercase tracking-wider text-brown">
              Frais de livraison calculés à l’étape suivante
            </p>
            <Link href="/panier" onClick={closeCart} className="btn-primary mt-4 w-full">
              Passer commande
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full text-center text-xs text-brown underline underline-offset-4 transition-colors hover:text-chocolate"
            >
              Continuer mes achats
            </button>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="px-5 py-16 text-center sm:px-6">
          <p className="text-sm text-chocolate">Votre sélection est vide.</p>
          <p className="mt-2 text-xs text-brown">
            Le vestiaire d’hiver vous attend, à partir de {site.corePrice} €.
          </p>
          <Link href="/collections/manteaux" onClick={closeCart} className="btn-primary mt-8">
            Découvrir la collection
          </Link>
        </div>
      ) : (
        <div className="px-5 sm:px-6">
          {remaining > 0 ? (
            <p className="mt-5 bg-ivory px-4 py-3 text-center text-2xs uppercase tracking-wider text-chocolate">
              Plus que {formatPrice(remaining)} pour la livraison offerte
            </p>
          ) : (
            <p className="mt-5 bg-ivory px-4 py-3 text-center text-2xs uppercase tracking-wider text-chocolate">
              Livraison offerte 🎉
            </p>
          )}

          <ul className="divide-y divide-chocolate/10">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-5">
                <Link
                  href={`/products/${line.slug}`}
                  onClick={closeCart}
                  className="relative aspect-product w-[88px] shrink-0 overflow-hidden bg-ivory"
                >
                  <Image src={assetPath(line.image)} alt={line.name} fill sizes="88px" className="object-cover" />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-xs uppercase tracking-wider text-chocolate">
                        <Link href={`/products/${line.slug}`} onClick={closeCart}>
                          {line.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-brown">
                        {line.color} · Taille {line.size}
                      </p>
                    </div>
                    <Price price={line.price} compareAtPrice={line.compareAtPrice} size="sm" />
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center border border-chocolate/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                        aria-label={`Réduire la quantité de ${line.name}`}
                        className="grid h-8 w-8 place-items-center text-chocolate transition-colors hover:bg-ivory"
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="w-8 text-center text-xs text-chocolate" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                        aria-label={`Augmenter la quantité de ${line.name}`}
                        className="grid h-8 w-8 place-items-center text-chocolate transition-colors hover:bg-ivory"
                      >
                        <PlusIcon width={14} height={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId, line.size)}
                      className="text-2xs uppercase tracking-wider text-brown underline underline-offset-4 transition-colors hover:text-burgundy"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {recommendations.length ? (
            <section className="border-t border-chocolate/10 py-6">
              <h3 className="eyebrow">Vous pourriez aussi aimer</h3>
              <ul className="hide-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
                {recommendations.map((p) => (
                  <li key={p.id} className="w-[132px] shrink-0">
                    <Link href={`/products/${p.slug}`} onClick={closeCart} className="group block">
                      <div className="relative aspect-product overflow-hidden bg-ivory">
                        <Image
                          src={assetPath(p.images[0])}
                          alt={p.name}
                          fill
                          sizes="132px"
                          className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 truncate text-2xs uppercase tracking-wider text-chocolate">
                        {p.name}
                      </p>
                      <Price price={p.price} compareAtPrice={p.compareAtPrice} size="sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </Drawer>
  );
}
