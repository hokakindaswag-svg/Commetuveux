/* ------------------------------------------------------------------ */
/*  Filtres & tris de la page collection                               */
/* ------------------------------------------------------------------ */

import type { SortKey } from '@/types';

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'nouveautes', label: 'Nouveautés' },
  { key: 'meilleures-ventes', label: 'Meilleures ventes' },
  { key: 'prix-croissant', label: 'Prix croissant' },
  { key: 'prix-decroissant', label: 'Prix décroissant' },
  { key: 'date-ajout', label: 'Date d’ajout' },
];

export const availabilityOptions = ['En stock', 'Dernières pièces'];

export const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

export const colorOptions: { name: string; hex: string }[] = [
  { name: 'Noir', hex: '#111111' },
  { name: 'Marron', hex: '#6B4E3A' },
  { name: 'Beige', hex: '#D9C3A9' },
  { name: 'Crème', hex: '#F1E4D6' },
  { name: 'Bordeaux', hex: '#530E0E' },
  { name: 'Rose', hex: '#F3A0AA' },
  { name: 'Gris', hex: '#B9B4AE' },
  { name: 'Léopard', hex: '#C08B4E' },
];

/**
 * Le filtre « Prix » porte sur la valeur d'origine (le prix barré) plutôt
 * que sur le prix de vente : c'est elle qui situe la pièce en gamme.
 */
export const priceOptions = [
  { label: 'Valeur jusqu’à 99 €', min: 0, max: 99 },
  { label: 'Valeur 100 € – 149 €', min: 100, max: 149 },
  { label: 'Valeur 150 € et +', min: 150, max: Infinity },
];

export const styleOptions: { value: string; label: string }[] = [
  { value: 'oversize', label: 'Oversize' },
  { value: 'ceinture', label: 'Ceinturé' },
  { value: 'cintre', label: 'Cintré' },
  { value: 'capuche', label: 'À capuche' },
  { value: 'crop', label: 'Court' },
  { value: 'droit', label: 'Droit' },
  { value: 'statement', label: 'Statement' },
];

export const materialOptions = [
  'Laine mélangée',
  'Fausse fourrure',
  'Polyester recyclé',
  'Similicuir',
  'Bouclette',
  'Coton gabardine',
];

export const filterGroups = [
  { id: 'availability', label: 'Disponibilité' },
  { id: 'sizes', label: 'Taille' },
  { id: 'colors', label: 'Couleur' },
  { id: 'price', label: 'Prix' },
  { id: 'styles', label: 'Style' },
  { id: 'materials', label: 'Matière' },
] as const;
