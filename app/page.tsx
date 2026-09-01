import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Editorial } from '@/components/home/Editorial';
import { SectionHeading } from '@/components/home/SectionHeading';
import { Trust } from '@/components/home/Trust';
import { SocialProof } from '@/components/home/SocialProof';
import { Newsletter } from '@/components/layout/Newsletter';
import { ProductGrid } from '@/components/product/ProductGrid';
import { allProducts, bestsellerProducts, featuredProducts } from '@/lib/catalog';
import { media, site } from '@/data/site';

export default function HomePage() {
  const featured = featuredProducts(8);
  const bestsellers = bestsellerProducts(8);
  const catalogue = allProducts;

  return (
    <>
      <Hero />

      {/* Les manteaux du moment */}
      <section className="container-site py-16 lg:py-24" aria-labelledby="featured-title">
        <SectionHeading
          eyebrow="Sélection"
          title="Les manteaux du moment"
          subtitle="Les pièces qu’on veut porter toute la saison."
          href="/collections/nouveautes"
          hrefLabel="Voir les nouveautés"
        />
        <div className="mt-10">
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      {/* Éditorial */}
      <Editorial
        image={media.editorial}
        eyebrow="Le Closet"
        title="Bienvenue dans Le Closet"
        text="Des manteaux qu’on remarque. Des prix qu’on aime. Un vestiaire pensé pour une seule chose : trouver LE manteau."
        href="/collections/manteaux"
        cta="Découvrir"
        tone="dark"
        align="left"
      />

      {/* Best-sellers */}
      <section className="container-site py-16 lg:py-24" aria-labelledby="bestsellers-title">
        <SectionHeading
          eyebrow="Best-sellers"
          title="Les plus aimés ♡"
          subtitle="Les manteaux qui partent le plus vite."
          href="/collections/best-sellers"
        />
        <div className="mt-10">
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Catégories */}
      <section className="container-site pb-16 lg:pb-24" aria-labelledby="categories-title">
        <h2 id="categories-title" className="sr-only">
          Nos familles de manteaux
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: 'Manteaux longs', href: '/collections/manteaux-longs' },
            { label: 'Doudounes', href: '/collections/doudounes' },
            { label: 'Fausse fourrure', href: '/collections/fausse-fourrure' },
            { label: 'Manteaux tendance', href: '/collections/manteaux-tendance' },
          ].map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex h-24 items-center justify-center border border-wood/15 bg-cream-warm px-4 text-center text-2xs uppercase tracking-widest text-wood transition-colors hover:border-burgundy hover:bg-burgundy hover:text-cream sm:h-28"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bandeau prix */}
      <section className="leopard py-14" aria-label="Notre promesse prix">
        <div className="container-site">
          <div className="mx-auto max-w-3xl bg-cream/95 px-6 py-12 text-center sm:px-12">
            <p className="eyebrow">La promesse Le Closet</p>
            <p className="mt-4 font-serif text-4xl leading-tight text-burgundy sm:text-5xl">
              Tous nos manteaux à {site.corePrice} €
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown">
              Un seul prix, toute l’année. Comparez avec le prix d’origine barré sur chaque
              étiquette.
            </p>
          </div>
        </div>
      </section>

      {/* Tous les manteaux */}
      <section className="container-site py-16 lg:py-24" aria-labelledby="all-title">
        <SectionHeading
          eyebrow={`${catalogue.length}+ manteaux`}
          title="Tous les manteaux"
          subtitle="Le vestiaire complet Le Closet. Filtrez par taille, couleur, style ou matière."
          href="/collections/manteaux"
          hrefLabel="Filtrer & trier"
        />
        <div className="mt-10">
          <ProductGrid products={catalogue.slice(0, 24)} />
        </div>
        <div className="mt-14 text-center">
          <Link href="/collections/manteaux" className="btn-primary">
            Voir les {catalogue.length} manteaux
          </Link>
        </div>
      </section>

      <Trust />
      <SocialProof />
      <Newsletter />
    </>
  );
}
