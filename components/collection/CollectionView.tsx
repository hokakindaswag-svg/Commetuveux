'use client';

import { useMemo, useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { FilterIcon, SortIcon, CloseIcon } from '@/components/ui/Icons';
import { FilterPanel } from './FilterPanel';
import { ProductGrid } from '@/components/product/ProductGrid';
import {
  availableFacets,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  sortProducts,
} from '@/lib/catalog';
import { sortOptions } from '@/data/filters';
import type { Product, ProductFilters, SortKey } from '@/types';

type GroupKey = keyof ProductFilters;

const groupLabels: Record<GroupKey, string> = {
  availability: 'Disponibilité',
  sizes: 'Taille',
  colors: 'Couleur',
  price: 'Prix',
  styles: 'Style',
  materials: 'Matière',
};

export function CollectionView({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<ProductFilters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>('nouveautes');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggle = (group: GroupKey, value: string) =>
    setFilters((f) => ({
      ...f,
      [group]: f[group].includes(value)
        ? f[group].filter((v) => v !== value)
        : [...f[group], value],
    }));

  const clear = () => setFilters(emptyFilters);

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort]
  );

  // Facettes calculées sur la collection entière, pas sur le résultat
  // filtré : sinon cocher une option ferait disparaître les autres.
  const facets = useMemo(() => availableFacets(products), [products]);

  const activeCount = countActiveFilters(filters);
  const activeChips = (Object.keys(filters) as GroupKey[]).flatMap((group) =>
    filters[group].map((value) => ({ group, value }))
  );

  return (
    <div className="container-site pb-20">
      {/* Barre outils mobile — collante sous le header */}
      <div className="sticky top-[52px] z-30 -mx-4 mb-6 grid grid-cols-2 border-y border-chocolate/10 bg-cream sm:-mx-6 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex items-center justify-center gap-2 border-r border-chocolate/10 py-4 text-2xs uppercase tracking-widest text-chocolate"
        >
          <FilterIcon width={16} height={16} />
          Filtres{activeCount ? ` (${activeCount})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setSortOpen(true)}
          className="flex items-center justify-center gap-2 py-4 text-2xs uppercase tracking-widest text-chocolate"
        >
          <SortIcon width={16} height={16} />
          Trier
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-12">
        {/* Filtres desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-[96px]">
            <FilterPanel
              filters={filters}
              facets={facets}
              onToggle={toggle}
              onClear={clear}
              resultCount={visible.length}
            />
          </div>
        </aside>

        <div>
          {/* Tri desktop */}
          <div className="mb-6 hidden items-center justify-between border-b border-chocolate/10 pb-4 lg:flex">
            <p className="text-2xs uppercase tracking-wider text-brown">
              {visible.length} {visible.length > 1 ? 'pièces' : 'pièce'}
            </p>
            <label className="flex items-center gap-3 text-2xs uppercase tracking-widest text-chocolate">
              Trier par
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-chocolate/20 bg-cream px-3 py-2 text-xs normal-case tracking-normal text-chocolate focus:border-burgundy focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Filtres actifs */}
          {activeChips.length ? (
            <ul className="mb-6 flex flex-wrap gap-2">
              {activeChips.map(({ group, value }) => (
                <li key={`${group}-${value}`}>
                  <button
                    type="button"
                    onClick={() => toggle(group, value)}
                    className="flex items-center gap-2 border border-chocolate/20 px-3 py-1.5 text-2xs uppercase tracking-wider text-chocolate transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    <span className="sr-only">Retirer le filtre </span>
                    {groupLabels[group]} : {value}
                    <CloseIcon width={12} height={12} />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={clear}
                  className="px-2 py-1.5 text-2xs uppercase tracking-wider text-brown underline underline-offset-4 hover:text-burgundy"
                >
                  Tout effacer
                </button>
              </li>
            </ul>
          ) : null}

          {visible.length ? (
            <ProductGrid products={visible} priorityCount={4} />
          ) : (
            <div className="py-24 text-center">
              <p className="text-sm text-chocolate">Aucun manteau ne correspond à ces filtres.</p>
              <button type="button" onClick={clear} className="btn-secondary mt-6">
                Effacer les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tiroir filtres — mobile */}
      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        side="left"
        title="Filtres"
        labelledBy="filters-title"
        widthClass="w-[90%] max-w-[400px]"
        footer={
          <div className="px-5 py-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="btn-primary w-full"
            >
              Voir {visible.length} {visible.length > 1 ? 'pièces' : 'pièce'}
            </button>
          </div>
        }
      >
        <div className="px-5 py-4">
          <FilterPanel
            filters={filters}
            facets={facets}
            onToggle={toggle}
            onClear={clear}
            resultCount={visible.length}
            showTitle={false}
          />
        </div>
      </Drawer>

      {/* Tiroir tri — mobile */}
      <Drawer
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        title="Trier par"
        labelledBy="sort-title"
        widthClass="w-[90%] max-w-[400px]"
      >
        <ul className="px-5 py-2">
          {sortOptions.map((option) => (
            <li key={option.key} className="border-b border-chocolate/10 last:border-0">
              <button
                type="button"
                onClick={() => {
                  setSort(option.key);
                  setSortOpen(false);
                }}
                aria-pressed={sort === option.key}
                className={`w-full py-4 text-left text-sm ${
                  sort === option.key ? 'text-burgundy' : 'text-chocolate'
                }`}
              >
                {option.label}
                {sort === option.key ? <span aria-hidden="true"> ✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
