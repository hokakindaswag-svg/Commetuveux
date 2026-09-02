import Image from 'next/image';
import Link from 'next/link';
import { media, site } from '@/data/site';
import { assetPath } from '@/lib/paths';

/** Hero de campagne : image plein cadre, typographie éditoriale, deux CTA. */
export function Hero() {
  const eyebrow = (
    <p className="text-2xs uppercase tracking-signature text-burgundy">Studio Neige Paris</p>
  );

  const copy = (
    <p className="max-w-md text-sm leading-relaxed text-brown">
      Des manteaux désirables, pensés pour les journées froides et les looks qui ne passent
      pas inaperçus. À partir de {site.corePrice} €.
    </p>
  );

  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      {/*
        Desktop / tablette — mise en page en deux colonnes plutôt qu'une
        image plein cadre : nos photos produit sont des portraits pris au
        téléphone (3:4), pas des bannières larges. Les afficher entières
        dans un cadre vertical évite tout recadrage hasardeux — un visage
        ou le bas d'un manteau coupé au mauvais endroit — et reste vrai
        quelle que soit la prochaine photo envoyée.
      */}
      <div className="hidden sm:block">
        <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="max-w-xl">
            {eyebrow}
            <h1 id="hero-title" className="display-title mt-7">
              Le vestiaire
              <br />
              d’hiver.
            </h1>
            <div className="mt-7">{copy}</div>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link href="/collections/manteaux" className="btn-primary">
                Découvrir la collection
              </Link>
              <Link href="/collections/best-sellers" className="btn-secondary">
                Voir les best-sellers
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-chocolate/10 bg-ivory lg:max-w-none">
            <Image
              src={assetPath(media.hero)}
              alt="Manteau Studio Neige Paris porté en intérieur"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile — image plein cadre puis bloc texte, pensé pour le pouce */}
      <div className="sm:hidden">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={assetPath(media.heroMobile)}
            alt="Silhouettes d’hiver Studio Neige Paris photographiées en studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream to-transparent" />
        </div>

        <div className="container-site -mt-6 pb-12 text-center">
          {eyebrow}
          <h1 className="display-title mt-5 text-[38px]">Le vestiaire d’hiver.</h1>
          <div className="mx-auto mt-5 flex justify-center">{copy}</div>

          <div className="mt-9 flex flex-col gap-3">
            <Link href="/collections/manteaux" className="btn-primary w-full">
              Découvrir la collection
            </Link>
            <Link href="/collections/best-sellers" className="btn-secondary w-full">
              Voir les best-sellers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
