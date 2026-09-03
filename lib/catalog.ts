import { products } from '@/data/products';
import { collections } from '@/data/collections';
import { mainNav } from '@/data/site';
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

/** Recommandations en fiche produit : même famille en priorité. */
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

/**
 * Options de facette réellement représentées dans une liste de produits.
 *
 * Le panneau de filtres s'appuie dessus pour ne proposer que des cases qui
 * ramènent au moins une pièce : avec un catalogue court, une facette
 * exhaustive n'offrirait que des impasses. Les options réapparaissent
 * d'elles-mêmes à mesure que le vestiaire s'étoffe.
 */
export function availableFacets(list: Product[]) {
  const priceLabel = (p: Product) => {
    const value = p.compareAtPrice ?? p.price;
    return priceOptions.find((o) => value >= o.min && value <= o.max)?.label;
  };

  return {
    colors: new Set<string>(list.map((p) => p.color.group)),
    styles: new Set<string>(list.map((p) => p.style)),
    materials: new Set<string>(list.map((p) => p.material)),
    prices: new Set(list.map(priceLabel).filter((l): l is string => Boolean(l))),
  };
}

export type Facets = ReturnType<typeof availableFacets>;

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
      // À prix de vente égal, on départage sur la valeur d'origine.
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

/* ------------------------------------------------------------------ */
/*  Collections non vides                                              */
/*                                                                     */
/*  Le catalogue évolue au rythme des shootings : plutôt que de garder  */
/*  une navigation figée qui mènerait à des pages « 0 pièce », on       */
/*  n'affiche que les collections effectivement peuplées. Une famille   */
/*  réapparaît d'elle-même dès qu'un produit lui est rattaché.          */
/* ------------------------------------------------------------------ */

export const hasProducts = (handle: string) => collectionCount(handle) > 0;

export const visibleCollections = () =>
  collections.filter((c) => productsForCollection(c).length > 0);

/** Extrait le handle d'un lien /collections/xxx ; null pour les autres liens. */
const handleFromHref = (href: string) => {
  const match = href.match(/^\/collections\/([\w-]+)$/);
  return match ? match[1] : null;
};

/**
 * Filtre une liste de liens : retire ceux qui pointent vers une collection
 * vide, et conserve tous les autres (pages d'aide, contact…).
 */
export function keepReachable<T extends { href: string }>(links: T[]): T[] {
  return links.filter((link) => {
    const handle = handleFromHref(link.href);
    return handle === null || hasProducts(handle);
  });
}

/**
 * Navigation principale débarrassée des entrées qui ne mèneraient nulle
 * part : un menu déroulant perd ses sous-familles vides, et une entrée
 * sans destination ni sous-entrée disparaît entièrement.
 */
export const visibleNav = () =>
  mainNav
    .map((item) => ({
      ...item,
      children: item.children ? keepReachable(item.children) : undefined,
    }))
    .filter((item) => hasProducts(item.href.replace('/collections/', '')) || (item.children?.length ?? 0) > 0);
