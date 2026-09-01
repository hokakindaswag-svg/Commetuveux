'use client';

import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { ProductGrid } from '@/components/product/ProductGrid';
import { allProducts } from '@/lib/catalog';

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const products = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-site py-12 lg:py-20">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Ma wishlist</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-brown">
        Vos coups de cœur, gardés au chaud. La wishlist est enregistrée dans ce navigateur.
      </p>

      {!hydrated ? (
        <p className="mt-12 text-sm text-brown">Chargement…</p>
      ) : products.length === 0 ? (
        <div className="mt-12 max-w-md">
          <p className="text-sm text-wood">Votre wishlist est vide pour le moment.</p>
          <Link href="/collections/manteaux" className="btn-primary mt-8">
            Découvrir les manteaux
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={products} priorityCount={4} />
        </div>
      )}
    </div>
  );
}
