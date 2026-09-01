'use client';

import { useEffect, useState } from 'react';
import { announcements } from '@/data/site';

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      4800
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-burgundy text-cream">
      <div className="container-site flex h-9 items-center justify-center overflow-hidden">
        <p
          key={index}
          className="animate-fade-in text-center text-2xs uppercase tracking-brand"
          aria-live="polite"
        >
          {announcements[index]}
        </p>
      </div>
    </div>
  );
}
