import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CollectionView } from '@/components/collection/CollectionView';
import { Newsletter } from '@/components/layout/Newsletter';
import { collections, getCollection } from '@/data/collections';
import { productsForCollection } from '@/lib/catalog';
import { site } from '@/data/site';
import { assetPath } from '@/lib/paths';

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return { title: 'Collection introuvable' };

  const count = productsForCollection(collection).length;
  return {
    title: `${collection.title} — ${count} manteaux à ${site.corePrice} €`,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.handle}` },
    openGraph: {
      title: `${collection.title} | Le Closet`,
      description: collection.description,
      // URL absolue : une URL relative écraserait le sous-dossier /Commetuveux
      // du déploiement GitHub Pages (voir app/layout.tsx).
      images: [{ url: `${site.url}${collection.image}` }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const products = productsForCollection(collection);

  return (
    <>
      {/* En-tête de collection */}
      <header className="relative isolate">
        <div className="relative h-[240px] w-full sm:h-[300px] lg:h-[360px]">
          <Image
            src={assetPath(collection.image)}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-wood/35" />
          <div className="container-site relative flex h-full flex-col items-center justify-center text-center">
            <nav aria-label="Fil d’Ariane" className="mb-4">
              <ol className="flex items-center gap-2 text-2xs uppercase tracking-wider text-cream/80">
                <li>
                  <Link href="/" className="hover:text-cream">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-cream">{collection.title}</li>
              </ol>
            </nav>
            <h1 className="font-serif text-4xl uppercase tracking-wider text-cream sm:text-5xl lg:text-6xl">
              {collection.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/85">
              {collection.description}
            </p>
            <p className="mt-4 text-2xs uppercase tracking-brand text-cream/70">
              {products.length} {products.length > 1 ? 'pièces' : 'pièce'}
            </p>
          </div>
        </div>
      </header>

      <div className="pt-8">
        <CollectionView products={products} />
      </div>

      <Newsletter />
    </>
  );
}
