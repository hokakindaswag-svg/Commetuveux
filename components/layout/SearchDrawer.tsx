'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Drawer } from '@/components/ui/Drawer';
import { Price } from '@/components/ui/Price';
import { SearchIcon } from '@/components/ui/Icons';
import { searchProducts } from '@/lib/catalog';
import { assetPath } from '@/lib/paths';

const suggestions = [
  'Manteau long',
  'Fausse fourrure',
  'Veste teddy',
  'Doudoune',
  'Trench',
  'Léopard',
];

export function SearchDrawer() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 60);
    else setQuery('');
  }, [searchOpen]);

  const results = useMemo(() => searchProducts(query, 8), [query]);

  return (
    <Drawer
      open={searchOpen}
      onClose={closeSearch}
      title="Rechercher"
      labelledBy="search-title"
      widthClass="w-full max-w-[520px]"
    >
      <div className="px-5 py-6 sm:px-6">
        <div className="relative">
          <SearchIcon
            width={18}
            height={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brown"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher une pièce…"
            aria-label="Chercher une pièce"
            className="field pl-11"
          />
        </div>

        {!query ? (
          <div className="mt-8">
            <p className="eyebrow">Recherches populaires</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setQuery(s)}
                    className="border border-chocolate/20 px-3 py-2 text-xs text-chocolate transition-colors hover:border-chocolate hover:bg-chocolate hover:text-cream"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length === 0 ? (
          <p className="mt-8 text-sm text-brown">
            Aucune pièce ne correspond à « {query} ». Essayez « long », « fourrure » ou
            « doudoune ».
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 transition-opacity hover:opacity-70"
                >
                  <div className="relative aspect-product w-16 shrink-0 overflow-hidden bg-ivory">
                    <Image
                      src={assetPath(p.images[0])}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs uppercase tracking-wider text-chocolate">{p.name}</p>
                    <p className="text-xs text-brown">{p.color.name}</p>
                    <Price price={p.price} compareAtPrice={p.compareAtPrice} size="sm" className="mt-1" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && results.length > 0 ? (
          <Link
            href="/collections/manteaux"
            onClick={closeSearch}
            className="btn-secondary mt-8 w-full"
          >
            Voir toute la collection
          </Link>
        ) : null}
      </div>
    </Drawer>
  );
}
