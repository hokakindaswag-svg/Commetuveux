'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { media } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Vidéo de campagne en tête de page.
 *
 * L'image d'attente est rendue côté serveur et reste sous la vidéo : elle
 * assure l'affichage immédiat (et le rendu statique de la page), la vidéo
 * ne se charge qu'après hydratation et vient se poser par-dessus. Rien ne
 * bloque donc le premier affichage.
 *
 * La lecture automatique est désactivée pour les visiteurs qui ont demandé
 * des animations réduites : ils gardent l'image fixe, avec un bouton pour
 * lancer la vidéo s'ils le souhaitent.
 */
export function HeroVideo({ className = '' }: { className?: string }) {
  const [autoplay, setAutoplay] = useState(false);
  const [forced, setForced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setAutoplay(!query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  const showVideo = autoplay || forced;

  // La balise <source> étant ajoutée après le montage, il faut demander
  // explicitement le chargement puis la lecture : l'attribut autoPlay seul
  // ne suffit pas quand la source apparaît après coup. Un navigateur qui
  // refuse la lecture automatique laisse simplement l'image d'attente.
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {
      /* lecture refusée : l'image d'attente reste affichée */
    });
  }, [showVideo]);

  return (
    <div className={`relative overflow-hidden border border-chocolate/10 bg-ivory ${className}`}>
      <Image
        src={assetPath(media.heroPoster)}
        alt="Cape en fausse fourrure Studio Neige Paris portée en extérieur"
        fill
        priority
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="object-cover"
      />

      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Les capes Studio Neige Paris, portées en ivoire, chocolat, taupe et noir"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* WebM d'abord (plus léger), MP4 en repli universel */}
          <source src={assetPath(media.heroVideoWebm)} type="video/webm" />
          <source src={assetPath(media.heroVideo)} type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setForced(true)}
          className="absolute inset-x-0 bottom-0 z-10 bg-cream/90 py-3.5 text-2xs uppercase tracking-brand text-chocolate transition-colors hover:bg-burgundy hover:text-ivory"
        >
          Lancer la vidéo
        </button>
      )}
    </div>
  );
}
