import Link from 'next/link';
import { site } from '@/data/site';
import { formatPrice } from '@/lib/format';
import { hasProducts } from '@/lib/catalog';
import { HeroVideo } from './HeroVideo';

/** Hero de campagne : vidéo verticale, typographie éditoriale, deux CTA. */
export function Hero() {
  // Le second bouton mène aux nouveautés, et retombe sur la collection
  // complète si aucune pièce n'est marquée comme nouvelle : un CTA de tête
  // de page ne doit jamais pointer vers une page vide.
  const secondary = hasProducts('nouveautes')
    ? { href: '/collections/nouveautes', label: 'Voir les nouveautés' }
    : { href: '/collections/fausse-fourrure', label: 'Voir les fourrures' };

  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      {/*
        Une seule mise en page, réagencée par CSS — et donc une seule balise
        <video> : deux blocs alternés en feraient télécharger le film deux
        fois sur chaque appareil.

        Mobile : la vidéo d'abord, pleine largeur, à son format natif (9:16).
        À partir de « sm » elle passe sous le texte, puis à côté en « lg ».
        Le film étant vertical, il n'est jamais recadré : aucune silhouette
        n'est coupée.
      */}
      <div className="container-site flex flex-col gap-9 pb-12 sm:grid sm:items-center sm:gap-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <HeroVideo className="order-first -mx-4 aspect-[9/16] border-x-0 border-t-0 sm:order-last sm:mx-auto sm:w-full sm:max-w-[300px] sm:border lg:max-w-[380px]" />

        <div className="text-center sm:max-w-xl sm:text-left">
          <p className="text-2xs uppercase tracking-signature text-burgundy">Studio Neige Paris</p>

          <h1 id="hero-title" className="display-title mt-5 sm:mt-7">
            Le vestiaire <span className="lg:block">d’hiver.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brown sm:mx-0 sm:mt-7">
            Des manteaux désirables, pensés pour les journées froides et les looks qui ne
            passent pas inaperçus. À partir de {formatPrice(site.corePrice)}.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link href="/collections/manteaux" className="btn-primary">
              Découvrir la collection
            </Link>
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
