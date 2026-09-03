import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';
import { ugcPhotos, ugcRow } from '@/data/ugc';
import { assetPath } from '@/lib/paths';

const tileClass =
  'relative aspect-[4/5] w-[62%] shrink-0 snap-start overflow-hidden bg-cream-warm sm:w-auto';

/**
 * Les pièces portées.
 *
 * Les vignettes non encore pourvues restent des cadres vides plutôt que des
 * images d'illustration : l'invitation à envoyer sa photo reste ainsi
 * littérale. Aucun avis n'est affiché tant qu'il n'y en a pas de réels.
 */
export function SocialProof() {
  const emptySlots = Math.max(0, ugcRow - ugcPhotos.length);

  return (
    <section className="container-site py-20 lg:py-28" aria-labelledby="ugc-title">
      <div className="text-center">
        <p className="eyebrow">@{site.instagram}</p>

        <h2 id="ugc-title" className="section-title mt-4">
          Le studio, porté
        </h2>

        <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-burgundy/40" />
          <span className="text-xs text-burgundy/70">❄</span>
          <span className="h-px w-10 bg-burgundy/40" />
        </div>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-brown">
          Taguez <span className="text-chocolate">@{site.instagram}</span> pour apparaître ici.
        </p>
      </div>

      <ul className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-6">
        {ugcPhotos.map((photo) => {
          const visual = (
            <Image
              src={assetPath(photo.image)}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 62vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          );

          return (
            <li key={photo.image} className={tileClass}>
              {photo.product ? (
                <Link
                  href={`/products/${photo.product}`}
                  className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                >
                  {visual}
                  <span className="sr-only">Voir la pièce portée</span>
                </Link>
              ) : (
                visual
              )}
            </li>
          );
        })}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <li
            key={`slot-${i}`}
            className={`${tileClass} flex items-center justify-center border border-dashed border-chocolate/20`}
          >
            <span className="text-[10px] uppercase tracking-widest text-brown/60">
              Votre photo
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <a
          href={`https://instagram.com/${site.instagram}`}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost"
        >
          Nous suivre sur Instagram
        </a>
        <p className="mt-6 text-2xs uppercase tracking-widest text-brown">
          <Link href="/contact" className="link-underline">
            Envoyer ma photo
          </Link>
        </p>
      </div>
    </section>
  );
}
