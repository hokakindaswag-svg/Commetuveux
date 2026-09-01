import Image from 'next/image';
import Link from 'next/link';
import { media, site } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Espace réservé au contenu client (UGC).
 * Les visuels ci-dessous sont des placeholders : remplacez les fichiers
 * listés dans `media.ugc` (data/site.ts) par vos vraies photos clientes.
 * Aucun avis client n'est inventé ici.
 */
export function SocialProof() {
  return (
    <section className="container-site py-16 lg:py-24" aria-labelledby="ugc-title">
      <div className="text-center">
        <p className="eyebrow">@{site.instagram}</p>
        <h2 id="ugc-title" className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[42px]">
          Vu sur les girls ♡
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brown">
          Taguez <span className="text-wood">@{site.instagram}</span> pour apparaître ici. Cet
          espace est réservé à vos photos.
        </p>
      </div>

      <ul className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-6">
        {media.ugc.map((src, i) => (
          <li
            key={src}
            className="relative aspect-[4/5] w-[62%] shrink-0 snap-start overflow-hidden bg-silk sm:w-auto"
          >
            <Image
              src={assetPath(src)}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 62vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-closet hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 bg-cream/85 px-2 py-1 text-[10px] uppercase tracking-wider text-wood">
              Votre photo #{i + 1}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <a
          href={`https://instagram.com/${site.instagram}`}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost"
        >
          Nous suivre sur Instagram
        </a>
        <p className="mt-6 text-2xs uppercase tracking-wider text-brown">
          <Link href="/contact" className="link-underline">
            Envoyer ma photo
          </Link>
        </p>
      </div>
    </section>
  );
}
