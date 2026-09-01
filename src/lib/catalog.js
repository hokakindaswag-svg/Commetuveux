import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/taxonomy';

export const PRICE_BUCKETS = [
  { id: 'moins-50', label: 'Moins de 50 €', test: (p) => p.price < 50 },
  { id: '50-60', label: '50 € – 60 €', test: (p) => p.price >= 50 && p.price <= 60 },
  { id: 'plus-60', label: 'Plus de 60 €', test: (p) => p.price > 60 },
];

/** Jeu de produits de base selon la page. */
export function baseProducts(scope, slug) {
  if (scope === 'nouveautes') return PRODUCTS.filter((p) => p.newArrival);
  if (scope === 'best-sellers') return PRODUCTS.filter((p) => p.bestseller);
  if (scope === 'promotions') return PRODUCTS.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
  if (slug) {
    const key = Object.keys(COLLECTIONS).find((k) => COLLECTIONS[k].slug === slug);
    if (key && key !== 'all') return PRODUCTS.filter((p) => p.collection === key);
  }
  return PRODUCTS;
}

export function applyFilters(products, f) {
  return products.filter((p) => {
    if (f.dispo.includes('en-stock') && p.inventory === 0) return false;
    if (f.dispo.includes('epuise') && p.inventory > 0) return false;
    if (f.taille.length && !f.taille.some((s) => p.sizes.includes(s))) return false;
    if (f.couleur.length && !f.couleur.includes(p.color)) return false;
    if (f.style.length && !f.style.includes(p.style)) return false;
    if (f.prix.length) {
      const buckets = PRICE_BUCKETS.filter((b) => f.prix.includes(b.id));
      if (!buckets.some((b) => b.test(p))) return false;
    }
    return true;
  });
}

export function applySort(products, sort) {
  const list = [...products];
  switch (sort) {
    case 'prix-asc':
      return list.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, 'fr'));
    case 'prix-desc':
      return list.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, 'fr'));
    case 'ventes':
      return list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviews - a.reviews);
    case 'nouveautes':
    default:
      return list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
  }
}

/** Compte d'occurrences pour afficher (12) à côté de chaque filtre. */
export function facetCounts(products, key) {
  const map = {};
  products.forEach((p) => {
    const values = key === 'taille' ? p.sizes : [p[key]];
    values.forEach((v) => {
      map[v] = (map[v] || 0) + 1;
    });
  });
  return map;
}
