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
import type { Facets } from '@/lib/catalog';
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
    <div className="border-b border-chocolate/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-4 text-left text-2xs uppercase tracking-widest text-chocolate"
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
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-chocolate">
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
  facets,
  onToggle,
  onClear,
  resultCount,
  showTitle = true,
}: {
  filters: ProductFilters;
  /** Options réellement représentées dans la collection affichée. */
  facets: Facets;
  onToggle: (group: GroupKey, value: string) => void;
  onClear: () => void;
  resultCount: number;
  /** Masqué dans le tiroir mobile, dont l'en-tête porte déjà le titre. */
  showTitle?: boolean;
}) {
  const has = (group: GroupKey, value: string) => filters[group].includes(value);

  // On ne garde que les options qui ramènent au moins une pièce, et on
  // masque une facette qui n'offrirait plus de choix (une seule valeur
  // possible : cocher revient à ne rien filtrer).
  const colors = colorOptions.filter((c) => facets.colors.has(c.name));
  const styles = styleOptions.filter((o) => facets.styles.has(o.value));
  const materials = materialOptions.filter((m) => facets.materials.has(m));
  const prices = priceOptions.filter((o) => facets.prices.has(o.label));

  return (
    <div>
      <div className="flex items-center justify-between border-b border-chocolate/10 pb-4">
        {showTitle ? (
          <p className="text-2xs uppercase tracking-widest text-chocolate">Filtres</p>
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
                  : 'border-chocolate/20 text-chocolate hover:border-chocolate'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Group>

      {colors.length > 1 ? (
      <Group label="Couleur">
        <div className="grid grid-cols-2 gap-x-3 pt-1">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-pressed={has('colors', color.name)}
              onClick={() => onToggle('colors', color.name)}
              className="flex items-center gap-2.5 py-2 text-left text-sm text-chocolate"
            >
              <span
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 rounded-full border ${
                  has('colors', color.name)
                    ? 'border-burgundy ring-1 ring-burgundy ring-offset-2 ring-offset-cream'
                    : 'border-chocolate/25'
                }`}
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </button>
          ))}
        </div>
      </Group>
      ) : null}

      {prices.length > 1 ? (
        <Group label="Prix">
          <p className="pb-2 text-2xs leading-relaxed text-brown">
            Toutes nos pièces sont à 50 €. Filtrez par valeur d’origine.
          </p>
          {prices.map((option) => (
            <Checkbox
              key={option.label}
              label={option.label}
              checked={has('price', option.label)}
              onChange={() => onToggle('price', option.label)}
            />
          ))}
        </Group>
      ) : null}

      {styles.length > 1 ? (
        <Group label="Style">
          {styles.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={has('styles', option.value)}
              onChange={() => onToggle('styles', option.value)}
            />
          ))}
        </Group>
      ) : null}

      {materials.length > 1 ? (
        <Group label="Matière">
          {materials.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={has('materials', option)}
              onChange={() => onToggle('materials', option)}
            />
          ))}
        </Group>
      ) : null}

      <p className="pt-5 text-2xs uppercase tracking-wider text-brown" aria-live="polite">
        {resultCount} {resultCount > 1 ? 'pièces' : 'pièce'}
      </p>
    </div>
  );
}
