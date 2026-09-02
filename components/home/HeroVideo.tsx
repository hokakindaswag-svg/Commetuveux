'use client';

import { useEffect, useRef, useState } from 'react';
import { media } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Vidéo de campagne en tête de page.
 *
 * La balise <video> est rendue côté serveur avec ses sources et l'attribut
 * `autoplay` : la lecture démarre nativement, sans attendre l'hydratation.
 * L'image d'attente passe par l'attribut `poster`, qui s'affiche tant que la
 * première image n'est pas décodée — la tête de page n'est donc jamais vide.
 *
 * Le JavaScript ne sert plus qu'à deux choses : mettre en pause si le
 * visiteur a demandé des animations réduites, et proposer un bouton de
 * lecture si le navigateur a refusé le démarrage automatique.
 */
export function HeroVideo({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(video.paused);

    const apply = () => {
      if (query.matches) {
        video.pause();
        return;
      }
      // Une lecture refusée (économie de données, mode faible consommation)
      // fait apparaître le bouton plutôt que de laisser un cadre figé sans
      // explication.
      video.play().catch(() => setPaused(true));
    };

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    query.addEventListener('change', apply);
    apply();

    return () => {
      video.removeEventListener('play', sync);
      video.removeEventListener('pause', sync);
      query.removeEventListener('change', apply);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden border border-chocolate/10 bg-ivory ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={assetPath(media.heroPoster)}
        aria-label="Les capes Studio Neige Paris, portées en ivoire, chocolat, taupe et noir"
        className="h-full w-full object-cover"
      >
        {/* WebM d'abord (plus léger), MP4 en repli universel */}
        <source src={assetPath(media.heroVideoWebm)} type="video/webm" />
        <source src={assetPath(media.heroVideo)} type="video/mp4" />
      </video>

      {paused ? (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-x-0 bottom-0 z-10 bg-cream/90 py-3.5 text-2xs uppercase tracking-brand text-chocolate transition-colors hover:bg-burgundy hover:text-ivory"
        >
          Lancer la vidéo
        </button>
      ) : null}
    </div>
  );
}
