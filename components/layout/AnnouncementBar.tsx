'use client';

import { useEffect, useState } from 'react';
import { announcements } from '@/data/site';

/** Bandeau d'annonce bordeaux, avec flocons en séparation — clin d'œil au nom. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      5200
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-burgundy text-ivory">
      <div className="container-site flex h-10 items-center justify-center gap-3 overflow-hidden sm:gap-4">
        <span aria-hidden="true" className="hidden text-pink/70 sm:block">
          ❄
        </span>
        <p
          key={index}
          className="animate-fade-in whitespace-nowrap text-center text-[9px] uppercase tracking-[0.18em] sm:text-2xs sm:tracking-signature"
          aria-live="polite"
        >
          {announcements[index]}
        </p>
        <span aria-hidden="true" className="hidden text-pink/70 sm:block">
          ❄
        </span>
      </div>
    </div>
  );
}
