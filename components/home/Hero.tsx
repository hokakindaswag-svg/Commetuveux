import Image from 'next/image';
import Link from 'next/link';
import { media, site } from '@/data/site';
import { assetPath } from '@/lib/paths';

export function Hero() {
  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      {/* Desktop / tablette */}
      <div className="relative hidden h-[calc(100svh-var(--header-height))] min-h-[560px] w-full sm:block">
        <Image
          src={assetPath(media.hero)}
          alt="Manteaux Le Closet portés en studio, ambiance parisienne"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/45 to-transparent" />
        <div className="container-site relative flex h-full items-center">
          <div className="max-w-xl">
            <p className="eyebrow">{site.name}</p>
            <h1
              id="hero-title"
              className="mt-6 font-serif text-5xl leading-[1.03] text-wood lg:text-7xl"
            >
              Les manteaux qu’on veut porter tout l’hiver.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brown">
              Le vestiaire dédié aux manteaux. Coupes longues, teddy, fausse fourrure et
              doudounes — tout à {site.corePrice} €.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/collections/manteaux" className="btn-primary">
                Découvrir les manteaux
              </Link>
              <Link href="/collections/best-sellers" className="btn-secondary">
                Voir les best-sellers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — image plein cadre + bloc texte dessous */}
      <div className="sm:hidden">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={assetPath(media.heroMobile)}
            alt="Manteaux Le Closet portés en studio, ambiance parisienne"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream to-transparent" />
        </div>
        <div className="container-site -mt-4 pb-10 text-center">
          <p className="eyebrow">{site.name}</p>
          <h1 className="mt-4 font-serif text-[34px] leading-[1.08] text-wood">
            Les manteaux qu’on veut porter tout l’hiver.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-brown">
            Coupes longues, teddy, fausse fourrure et doudounes — tout à {site.corePrice} €.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <Link href="/collections/manteaux" className="btn-primary w-full">
              Découvrir les manteaux
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
