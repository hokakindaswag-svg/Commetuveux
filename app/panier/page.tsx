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
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <div className="container-site py-12 lg:py-20">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
        Panier{hydrated && cartCount ? ` (${cartCount})` : ''}
      </h1>

      {!hydrated ? (
        <p className="mt-10 text-sm text-brown">Chargement…</p>
      ) : lines.length === 0 ? (
        <div className="mt-10 max-w-md">
          <p className="text-sm text-wood">Votre panier est vide.</p>
          <p className="mt-2 text-sm text-brown">
            Tous nos manteaux sont à {site.corePrice} €. Il y en a forcément un pour vous.
          </p>
          <Link href="/collections/manteaux" className="btn-primary mt-8">
            Découvrir les manteaux
          </Link>
        </div>
      ) : (
        <div className="mt-10 lg:grid lg:grid-cols-[1fr_360px] lg:gap-14">
          <ul className="divide-y divide-wood/10 border-y border-wood/10">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  href={`/products/${line.slug}`}
                  className="relative aspect-product w-24 shrink-0 overflow-hidden bg-silk sm:w-32"
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
                      <h2 className="text-sm uppercase tracking-wider text-wood">
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
                    <div className="inline-flex items-center border border-wood/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                        aria-label={`Réduire la quantité de ${line.name}`}
                        className="grid h-9 w-9 place-items-center text-wood transition-colors hover:bg-silk"
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="w-9 text-center text-xs text-wood">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                        aria-label={`Augmenter la quantité de ${line.name}`}
                        className="grid h-9 w-9 place-items-center text-wood transition-colors hover:bg-silk"
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
            <div className="border border-wood/15 bg-cream-warm p-6">
              <h2 className="text-2xs uppercase tracking-widest text-wood">Récapitulatif</h2>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brown">Sous-total</dt>
                  <dd className="text-wood">{formatPrice(subtotal)}</dd>
                </div>
                {savings > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-brown">Économies</dt>
                    <dd className="text-burgundy">−{formatPrice(savings)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-brown">Livraison</dt>
                  <dd className="text-wood">
                    {remaining > 0 ? 'Calculée à l’étape suivante' : 'Offerte'}
                  </dd>
                </div>
              </dl>

              {remaining > 0 ? (
                <p className="mt-5 bg-silk px-4 py-3 text-center text-2xs uppercase tracking-wider text-wood">
                  Plus que {formatPrice(remaining)} pour la livraison offerte
                </p>
              ) : null}

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
            eyebrow="Sélection"
            title="Tu pourrais aussi aimer…"
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
