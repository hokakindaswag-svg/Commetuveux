import Link from 'next/link';
import { media, site } from '@/data/site';

/**
 * Espace réservé au contenu client (UGC).
 *
 * Tant qu'aucune photo cliente n'a été reçue, la section affiche des
 * emplacements vides plutôt que des images d'illustration : mieux vaut un
 * cadre manifestement en attente qu'un visuel qui ferait passer une photo
 * de marque pour une photo cliente. Aucun avis n'est inventé ici non plus.
 */
export function SocialProof() {
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
          Cet espace est réservé à vos photos.
        </p>
      </div>

      <ul className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-6">
        {Array.from({ length: media.ugcSlots }).map((_, i) => (
          <li
            key={i}
            className="flex aspect-[4/5] w-[62%] shrink-0 snap-start items-center justify-center border border-dashed border-chocolate/20 bg-cream-warm sm:w-auto"
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
