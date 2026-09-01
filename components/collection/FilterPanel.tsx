'use client';

import { useState } from 'react';
import { ChevronDown } from '@/components/ui/Icons';
import {
  availabilityOptions,
  colorOptions,
  materialOptions,
  priceOptions,
  sizeOptions,
  styleOptions,
} from '@/data/filters';
import type { ProductFilters } from '@/types';

type GroupKey = keyof ProductFilters;

function Group({
  label,
  defaultOpen = false,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-wood/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-4 text-left text-2xs uppercase tracking-widest text-wood"
        >
          {label}
          <ChevronDown
            width={16}
            height={16}
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      {open ? <div className="animate-slide-down pb-5">{children}</div> : null}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-wood">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-burgundy"
      />
      <span>{label}</span>
    </label>
  );
}

export function FilterPanel({
  filters,
  onToggle,
  onClear,
  resultCount,
  showTitle = true,
}: {
  filters: ProductFilters;
  onToggle: (group: GroupKey, value: string) => void;
  onClear: () => void;
  resultCount: number;
  /** Masqué dans le tiroir mobile, dont l'en-tête porte déjà le titre. */
  showTitle?: boolean;
}) {
  const has = (group: GroupKey, value: string) => filters[group].includes(value);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-wood/10 pb-4">
        {showTitle ? (
          <p className="text-2xs uppercase tracking-widest text-wood">Filtres</p>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="button"
          onClick={onClear}
          className="text-2xs uppercase tracking-wider text-brown underline underline-offset-4 transition-colors hover:text-burgundy"
        >
          Tout effacer
        </button>
      </div>

      <Group label="Disponibilité" defaultOpen>
        {availabilityOptions.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={has('availability', option)}
            onChange={() => onToggle('availability', option)}
          />
        ))}
      </Group>

      <Group label="Taille" defaultOpen>
        <div className="flex flex-wrap gap-2 pt-1">
          {sizeOptions.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={has('sizes', size)}
              onClick={() => onToggle('sizes', size)}
              className={`min-w-[46px] border px-3 py-2 text-xs transition-colors ${
                has('sizes', size)
                  ? 'border-burgundy bg-burgundy text-cream'
                  : 'border-wood/20 text-wood hover:border-wood'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Group>

      <Group label="Couleur">
        <div className="grid grid-cols-2 gap-x-3 pt-1">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-pressed={has('colors', color.name)}
              onClick={() => onToggle('colors', color.name)}
              className="flex items-center gap-2.5 py-2 text-left text-sm text-wood"
            >
              <span
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 rounded-full border ${
                  has('colors', color.name)
                    ? 'border-burgundy ring-1 ring-burgundy ring-offset-2 ring-offset-cream'
                    : 'border-wood/25'
                }`}
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </button>
          ))}
        </div>
      </Group>

      <Group label="Prix">
        <p className="pb-2 text-2xs leading-relaxed text-brown">
          Tous nos manteaux sont à 50 €. Filtrez par valeur d’origine.
        </p>
        {priceOptions.map((option) => (
          <Checkbox
            key={option.label}
            label={option.label}
            checked={has('price', option.label)}
            onChange={() => onToggle('price', option.label)}
          />
        ))}
      </Group>

      <Group label="Style">
        {styleOptions.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={has('styles', option.value)}
            onChange={() => onToggle('styles', option.value)}
          />
        ))}
      </Group>

      <Group label="Matière">
        {materialOptions.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={has('materials', option)}
            onChange={() => onToggle('materials', option)}
          />
        ))}
      </Group>

      <p className="pt-5 text-2xs uppercase tracking-wider text-brown" aria-live="polite">
        {resultCount} {resultCount > 1 ? 'pièces' : 'pièce'}
      </p>
    </div>
  );
}
