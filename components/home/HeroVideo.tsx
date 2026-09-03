'use client';

import { useEffect, useRef, useState } from 'react';
import { media } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Vidéo de campagne en tête de page.
 *
 * La balise <video> est rendue côté serveur avec sa source et l'attribut
 * `autoplay` : la lecture démarre nativement, sans attendre l'hydratation.
 * L'image d'attente passe par l'attribut `poster`, qui s'affiche tant que la
 * première image n'est pas décodée — la tête de page n'est donc jamais vide.
 *
 * Le MP4/H.264 est proposé EN PREMIER, le WebM ensuite. L'ordre compte : le
 * navigateur retient la première source dont il annonce savoir décoder le
 * type, et ne revient jamais en arrière. Le WebM en tête exposait donc
 * Safari à une source qu'il dit accepter mais ne décode pas toujours — le
 * visiteur restait devant l'image fixe. Le H.264 est le seul encodage que
 * tous les navigateurs lisent réellement ; il passe donc devant, malgré ses
 * 1,9 Mo contre 1,4.
 *
 * Le JavaScript ne sert plus qu'à trois choses : mettre en pause si le
 * visiteur a demandé des animations réduites, retenter la lecture dès que le
 * film est décodé, et la retenter au premier geste (défilement, touche,
 * appui) si le navigateur a refusé le démarrage — mode économie d'énergie
 * notamment. Le bouton n'apparaît qu'en dernier recours.
 */
export function HeroVideo({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(video.paused);

    const tryPlay = () => {
      if (query.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => setPaused(true));
    };

    // Un geste quelconque suffit à lever le blocage de lecture automatique :
    // on écoute les plus courants pour repartir sans que le visiteur ait à
    // viser un bouton. `once` sur chaque écouteur, nettoyés ensemble.
    const gestures = ['pointerdown', 'touchstart', 'keydown', 'scroll'] as const;
    const onGesture = () => {
      if (video.paused) tryPlay();
    };

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('loadeddata', tryPlay);
    query.addEventListener('change', tryPlay);
    gestures.forEach((g) =>
      window.addEventListener(g, onGesture, { passive: true })
    );

    tryPlay();

    return () => {
      video.removeEventListener('play', sync);
      video.removeEventListener('pause', sync);
      video.removeEventListener('loadeddata', tryPlay);
      query.removeEventListener('change', tryPlay);
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
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
        <source src={assetPath(media.heroVideo)} type="video/mp4" />
        <source src={assetPath(media.heroVideoWebm)} type="video/webm" />
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
