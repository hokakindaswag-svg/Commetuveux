'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { Price } from '@/components/ui/Price';
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatPrice } from '@/lib/format';
import { recommendationsFor } from '@/lib/catalog';
import { site } from '@/data/site';
import { assetPath } from '@/lib/paths';

export default function CartPage() {
  const { lines, subtotal, savings, cartCount, setQuantity, removeFromCart, hydrated } = useStore();
  const recommendations = recommendationsFor(lines.map((l) => l.productId), 4);

  return (
    <div className="container-site py-12 lg:py-20">
      <h1 className="section-title">
        Panier{hydrated && cartCount ? ` (${cartCount})` : ''}
      </h1>

      {!hydrated ? (
        <p className="mt-10 text-sm text-brown">Chargement…</p>
      ) : lines.length === 0 ? (
        <div className="mt-10 max-w-md">
          <p className="text-sm text-chocolate">Votre panier est vide.</p>
          <p className="mt-2 text-sm text-brown">
            Le vestiaire d’hiver vous attend, à partir de {site.corePrice} €.
          </p>
          <Link href="/collections/manteaux" className="btn-primary mt-8">
            Découvrir la collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 lg:grid lg:grid-cols-[1fr_360px] lg:gap-14">
          <ul className="divide-y divide-chocolate/10 border-y border-chocolate/10">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  href={`/products/${line.slug}`}
                  className="relative aspect-product w-24 shrink-0 overflow-hidden bg-ivory sm:w-32"
                >
                  <Image
                    src={assetPath(line.image)}
                    alt={line.name}
                    fill
                    sizes="(min-width: 640px) 128px, 96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-sm uppercase tracking-wider text-chocolate">
                        <Link href={`/products/${line.slug}`} className="link-underline">
                          {line.name}
                        </Link>
                      </h2>
                      <p className="mt-1.5 text-xs text-brown">
                        {line.color} · Taille {line.size}
                      </p>
                    </div>
                    <Price price={line.price} compareAtPrice={line.compareAtPrice} />
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center border border-chocolate/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                        aria-label={`Réduire la quantité de ${line.name}`}
                        className="grid h-9 w-9 place-items-center text-chocolate transition-colors hover:bg-ivory"
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="w-9 text-center text-xs text-chocolate">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                        aria-label={`Augmenter la quantité de ${line.name}`}
                        className="grid h-9 w-9 place-items-center text-chocolate transition-colors hover:bg-ivory"
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

          <aside className="mt-10 lg:mt-0" aria-label="Récapitulatif de commande">
            <div className="border border-chocolate/15 bg-cream-warm p-6">
              <h2 className="text-2xs uppercase tracking-widest text-chocolate">Récapitulatif</h2>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brown">Sous-total</dt>
                  <dd className="text-chocolate">{formatPrice(subtotal)}</dd>
                </div>
                {savings > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-brown">Économies</dt>
                    <dd className="text-burgundy">−{formatPrice(savings)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-brown">Livraison</dt>
                  <dd className="text-chocolate">Offerte</dd>
                </div>
              </dl>

              <button type="button" className="btn-primary mt-6 w-full">
                Passer commande
              </button>
              <p className="mt-4 text-2xs leading-relaxed text-brown">
                Le tunnel de paiement n’est pas encore connecté sur cette version de
                démonstration. Branchez ici votre solution (Stripe, Shopify, PayPal…).
              </p>
            </div>
          </aside>
        </div>
      )}

      {recommendations.length ? (
        <section className="mt-20" aria-labelledby="cart-reco-title">
          <SectionHeading
            eyebrow="La sélection"
            title="Vous pourriez aussi aimer"
            href="/collections/manteaux"
          />
          <div className="mt-10">
            <ProductGrid products={recommendations} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
