import { products } from '@/data/products';
import { collections } from '@/data/collections';
import { priceOptions } from '@/data/filters';
import type { Collection, Product, ProductFilters, Size, SortKey } from '@/types';

/* ------------------------------------------------------------------ */
/*  Sélecteurs catalogue                                               */
/* ------------------------------------------------------------------ */

export const allProducts = products;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const totalStock = (p: Product) =>
  (Object.values(p.inventory) as number[]).reduce((a, b) => a + b, 0);

export const isInStock = (p: Product) => totalStock(p) > 0;

export const isLowStock = (p: Product) => {
  const total = totalStock(p);
  return total > 0 && total < 12;
};

export const availableSizes = (p: Product) =>
  p.sizes.filter((s) => p.inventory[s as Size] > 0);

export const featuredProducts = (limit = 8) =>
  products.filter((p) => p.featured).slice(0, limit);

export const bestsellerProducts = (limit = 8) =>
  products.filter((p) => p.bestseller).slice(0, limit);

export const newProducts = (limit = 8) =>
  [...products]
    .filter((p) => p.newArrival)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, limit);

/** Produits d'une collection, avant filtres utilisateur. */
export const productsForCollection = (collection: Collection) => {
  if (collection.filter === 'new') return products.filter((p) => p.newArrival);
  if (collection.filter === 'bestsellers') return products.filter((p) => p.bestseller);
  if (collection.filter === 'sale')
    return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
  if (collection.categories)
    return products.filter((p) => collection.categories!.includes(p.category));
  return products;
};

export const collectionCount = (handle: string) => {
  const collection = collections.find((c) => c.handle === handle);
  return collection ? productsForCollection(collection).length : 0;
};

/** Recommandations panier / fiche produit : même famille en priorité. */
export const relatedProducts = (product: Product, limit = 4) => {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category && p.bestseller
  );
  return [...sameCategory, ...others].slice(0, limit);
};

export const recommendationsFor = (excludeIds: string[], limit = 4) =>
  products.filter((p) => !excludeIds.includes(p.id) && p.bestseller).slice(0, limit);

/* ------------------------------------------------------------------ */
/*  Filtrage & tri                                                     */
/* ------------------------------------------------------------------ */

export const emptyFilters: ProductFilters = {
  availability: [],
  sizes: [],
  colors: [],
  price: [],
  styles: [],
  materials: [],
};

export const filterProducts = (list: Product[], filters: ProductFilters) =>
  list.filter((p) => {
    if (filters.availability.length) {
      const ok = filters.availability.some((a) =>
        a === 'En stock' ? isInStock(p) : isLowStock(p)
      );
      if (!ok) return false;
    }
    if (filters.sizes.length) {
      const ok = filters.sizes.some((s) => p.inventory[s as Size] > 0);
      if (!ok) return false;
    }
    if (filters.colors.length && !filters.colors.includes(p.color.group)) return false;
    if (filters.price.length) {
      const value = p.compareAtPrice ?? p.price;
      const ok = filters.price.some((label) => {
        const range = priceOptions.find((o) => o.label === label);
        return range ? value >= range.min && value <= range.max : true;
      });
      if (!ok) return false;
    }
    if (filters.styles.length && !filters.styles.includes(p.style)) return false;
    if (filters.materials.length && !filters.materials.includes(p.material)) return false;
    return true;
  });

export const sortProducts = (list: Product[], sort: SortKey) => {
  const copy = [...list];
  switch (sort) {
    case 'meilleures-ventes':
      return copy.sort(
        (a, b) =>
          Number(b.bestseller) - Number(a.bestseller) ||
          b.reviewCount - a.reviewCount ||
          b.rating - a.rating
      );
    case 'prix-croissant':
      // Tous les manteaux sont à 50 € : on départage sur la valeur d'origine.
      return copy.sort(
        (a, b) => a.price - b.price || (a.compareAtPrice ?? 0) - (b.compareAtPrice ?? 0)
      );
    case 'prix-decroissant':
      return copy.sort(
        (a, b) => b.price - a.price || (b.compareAtPrice ?? 0) - (a.compareAtPrice ?? 0)
      );
    case 'date-ajout':
      return copy.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
    case 'nouveautes':
    default:
      return copy.sort(
        (a, b) => Number(b.newArrival) - Number(a.newArrival) || b.addedAt.localeCompare(a.addedAt)
      );
  }
};

export const countActiveFilters = (filters: ProductFilters) =>
  (Object.values(filters) as string[][]).reduce((n, arr) => n + arr.length, 0);

/* ------------------------------------------------------------------ */
/*  Recherche                                                          */
/* ------------------------------------------------------------------ */

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const searchProducts = (query: string, limit = 12) => {
  const q = normalize(query.trim());
  if (!q) return [];
  return products
    .filter((p) =>
      [p.name, p.category, p.color.name, p.material, p.style, p.description]
        .map(normalize)
        .some((field) => field.includes(q))
    )
    .slice(0, limit);
};
