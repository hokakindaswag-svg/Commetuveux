import Link from 'next/link';
import { site } from '@/data/site';
import { HeroVideo } from './HeroVideo';

/** Hero de campagne : vidéo verticale, typographie éditoriale, deux CTA. */
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

  const actions = (fullWidth = false) => (
    <>
      <Link href="/collections/manteaux" className={`btn-primary ${fullWidth ? 'w-full' : ''}`}>
        Découvrir la collection
      </Link>
      <Link
        href="/collections/best-sellers"
        className={`btn-secondary ${fullWidth ? 'w-full' : ''}`}
      >
        Voir les best-sellers
      </Link>
    </>
  );

  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      {/*
        Desktop / tablette — deux colonnes plutôt qu'une vidéo plein cadre :
        notre film de campagne est vertical (9:16). L'afficher dans un cadre
        à ses proportions évite tout recadrage qui couperait la silhouette,
        et laisse la place au texte à côté.
      */}
      <div className="hidden sm:block">
        <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
          <div className="max-w-xl">
            {eyebrow}
            <h1 id="hero-title" className="display-title mt-7">
              Le vestiaire
              <br />
              d’hiver.
            </h1>
            <div className="mt-7">{copy}</div>

            <div className="mt-11 flex flex-wrap items-center gap-4">{actions()}</div>
          </div>

          <HeroVideo className="mx-auto aspect-[9/16] w-full max-w-[300px] lg:max-w-[380px]" />
        </div>
      </div>

      {/* Mobile — la vidéo d'abord, puis le texte : format natif du vertical */}
      <div className="sm:hidden">
        <HeroVideo className="aspect-[9/16] w-full border-x-0 border-t-0" />

        <div className="container-site pb-12 pt-10 text-center">
          {eyebrow}
          <h1 className="display-title mt-5 text-[38px]">Le vestiaire d’hiver.</h1>
          <div className="mx-auto mt-5 flex justify-center">{copy}</div>

          <div className="mt-9 flex flex-col gap-3">{actions(true)}</div>
        </div>
      </div>
    </section>
  );
}
