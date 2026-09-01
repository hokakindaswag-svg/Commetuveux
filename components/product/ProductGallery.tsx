'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons';
import { assetPath } from '@/lib/paths';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  return (
    <div className="lg:flex lg:gap-4">
      {/* Vignettes — desktop */}
      {total > 1 ? (
        <ul className="hidden shrink-0 flex-col gap-3 lg:flex">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir le visuel ${i + 1} de ${name}`}
                aria-current={active === i}
                className={`relative aspect-product w-[76px] overflow-hidden bg-silk transition-opacity ${
                  active === i ? 'ring-1 ring-wood' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={assetPath(src)} alt="" fill sizes="76px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Visuel principal */}
      <div className="relative flex-1">
        <div className="relative aspect-product w-full overflow-hidden bg-silk">
          <Image
            src={assetPath(images[active])}
            alt={`${name} — visuel ${active + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Visuel précédent"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/85 text-wood transition hover:bg-cream lg:hidden"
            >
              <ChevronLeft width={18} height={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Visuel suivant"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/85 text-wood transition hover:bg-cream lg:hidden"
            >
              <ChevronRight width={18} height={18} />
            </button>
            <ul className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 lg:hidden">
              {images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Visuel ${i + 1}`}
                    aria-current={active === i}
                    className={`h-1.5 w-6 transition-colors ${
                      active === i ? 'bg-wood' : 'bg-wood/25'
                    }`}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
