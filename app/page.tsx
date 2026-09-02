import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Editorial } from '@/components/home/Editorial';
import { SectionHeading } from '@/components/home/SectionHeading';
import { Trust } from '@/components/home/Trust';
import { SocialProof } from '@/components/home/SocialProof';
import { Newsletter } from '@/components/layout/Newsletter';
import { ProductGrid } from '@/components/product/ProductGrid';
import { allProducts, bestsellerProducts, featuredProducts, newProducts } from '@/lib/catalog';
import { media, site } from '@/data/site';
import { LeopardTexture } from '@/components/ui/Leopard';

const familles = [
  { label: 'Manteaux longs', href: '/collections/manteaux-longs' },
  { label: 'Vestes', href: '/collections/vestes' },
  { label: 'Fausse fourrure', href: '/collections/fausse-fourrure' },
  { label: 'Doudounes', href: '/collections/doudounes' },
];

export default function HomePage() {
  const featured = featuredProducts(8);
  const bestsellers = bestsellerProducts(8);
  const nouveautes = newProducts(4);
  const catalogue = allProducts;

  return (
    <>
      <Hero />

      {/* Les manteaux du moment */}
      <section className="container-site py-20 lg:py-28" aria-labelledby="featured-title">
        <SectionHeading
          eyebrow="La sélection"
          title="Les manteaux du moment"
          subtitle="Les pièces qu’on veut porter toute la saison, du bureau au dernier métro."
          href="/collections/manteaux"
          hrefLabel="Voir la collection"
        />
        <div className="mt-12">
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      {/* Éditorial de marque */}
      <Editorial
        id="bienvenue-title"
        image={media.editorial}
        eyebrow="Studio Neige Paris"
        title="Bienvenue chez Studio Neige"
        text="Un vestiaire pensé pour les jours froids, les silhouettes féminines et les manteaux qu’on ne veut plus quitter."
        href="/collections/manteaux"
        cta="Découvrir la collection"
        tone="dark"
        align="left"
      />

      {/* Best-sellers */}
      <section className="container-site py-20 lg:py-28" aria-labelledby="bestsellers-title">
        <SectionHeading
          eyebrow="Les plus convoités"
          title="Les plus aimés ♡"
          subtitle="Les manteaux qui partent le plus vite."
          href="/collections/best-sellers"
        />
        <div className="mt-12">
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Familles de produits */}
      <section className="container-site pb-20 lg:pb-28" aria-labelledby="familles-title">
        <h2 id="familles-title" className="sr-only">
          Nos familles de pièces
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {familles.map((famille) => (
            <li key={famille.href}>
              <Link
                href={famille.href}
                className="flex h-24 items-center justify-center border border-chocolate/15 bg-cream-warm px-4 text-center text-2xs uppercase tracking-brand text-chocolate transition-colors hover:border-burgundy hover:bg-burgundy hover:text-ivory sm:h-28"
              >
                {famille.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Le choix du studio — encart léopard, signature de la maison */}
      <section
        className="relative isolate overflow-hidden py-16 lg:py-20"
        aria-labelledby="choix-title"
      >
        <LeopardTexture id="leopard-choix" scale={0.68} />
        <div className="container-site relative">
          <div className="mx-auto max-w-4xl bg-cream px-6 py-14 text-center sm:px-14">
            <p className="eyebrow">Le choix du studio</p>

            <h2
              id="choix-title"
              className="mx-auto mt-5 max-w-2xl font-display text-3xl font-light leading-[1.12] text-chocolate sm:text-4xl lg:text-[44px]"
            >
              Une seule catégorie, travaillée à fond : le manteau.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brown">
              Nous ne faisons que de l’outerwear. Cette spécialisation nous permet de proposer
              toute la collection à partir de {site.corePrice} €, prix d’origine barré à l’appui.
            </p>

            <div className="mt-10">
              <ProductGrid products={nouveautes} className="text-left" />
            </div>

            <Link href="/collections/nouveautes" className="btn-secondary mt-12">
              Voir les nouveautés
            </Link>
          </div>
        </div>
      </section>

      {/* Éditions hiver — le catalogue complet */}
      <section className="container-site py-20 lg:py-28" aria-labelledby="all-title">
        <SectionHeading
          eyebrow={`${catalogue.length} pièces au vestiaire`}
          title="Éditions hiver"
          subtitle="Le vestiaire complet Studio Neige. Filtrez par taille, couleur, style ou matière."
          href="/collections/manteaux"
          hrefLabel="Filtrer & trier"
        />
        <div className="mt-12">
          <ProductGrid products={catalogue.slice(0, 24)} />
        </div>
        <div className="mt-16 text-center">
          <Link href="/collections/manteaux" className="btn-primary">
            Voir les {catalogue.length} pièces
          </Link>
        </div>
      </section>

      <Trust />
      <SocialProof />
      <Newsletter />
    </>
  );
}
