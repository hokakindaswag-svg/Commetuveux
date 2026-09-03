/* ------------------------------------------------------------------ */
/*  Studio Neige Paris — modèle de données                            */
/*  Tout le catalogue vit dans data/products.ts.                       */
/* ------------------------------------------------------------------ */

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type Badge =
  | 'NOUVEAU'
  | 'BEST-SELLER'
  | 'DERNIÈRES PIÈCES'
  | 'ÉDITION LIMITÉE'
  | 'COUP DE CŒUR';

/** Familles de manteaux — sert aussi aux sous-collections du menu. */
export type Category =
  | 'manteaux-longs'
  | 'manteaux-courts'
  | 'doudounes'
  | 'fausse-fourrure'
  | 'teddy'
  | 'trench'
  | 'similicuir'
  | 'laine';

/** Coupe / silhouette — filtre « Style ». */
export type Style =
  | 'oversize'
  | 'ceinture'
  | 'cintre'
  | 'capuche'
  | 'crop'
  | 'droit'
  | 'statement';

export type Material =
  | 'Laine mélangée'
  | 'Fausse fourrure'
  | 'Polyester recyclé'
  | 'Similicuir'
  | 'Peau lainée synthétique'
  | 'Bouclette'
  | 'Coton gabardine'
  | 'Velours côtelé';

export interface ProductColor {
  /** Nom affiché, ex. « Chocolat ». */
  name: string;
  /** Valeur CSS pour la pastille couleur. */
  hex: string;
  /** Groupe de filtre couleur. */
  group: ColorGroup;
}

export type ColorGroup =
  | 'Noir'
  | 'Marron'
  | 'Beige'
  | 'Crème'
  | 'Bordeaux'
  | 'Rose'
  | 'Gris'
  | 'Léopard';

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Prix Studio Neige Paris, en euros. */
  price: number;
  /** Prix barré (prix conseillé d'origine), en euros. */
  compareAtPrice: number | null;
  category: Category;
  style: Style;
  color: ProductColor;
  sizes: Size[];
  /**
   * Chemins d'images, relatifs à /public.
   * La 1re image est la vignette, la 2e s'affiche au survol.
   * Remplacez simplement les fichiers pour changer les visuels.
   */
  images: string[];
  badge: Badge | null;
  description: string;
  /** Points clés affichés en liste sur la fiche produit. */
  details: string[];
  material: Material;
  composition: string;
  care: string;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  /** Stock par taille. 0 = taille épuisée. */
  inventory: Record<Size, number>;
  rating: number;
  reviewCount: number;
  /** Timestamp d'ajout au catalogue (tri « Date d'ajout »). */
  addedAt: string;
}

export interface Collection {
  handle: string;
  title: string;
  description: string;
  /** Filtre appliqué au catalogue. `null` = tout le catalogue. */
  categories: Category[] | null;
  /** Filtres spéciaux non liés à une catégorie. */
  filter?: 'new' | 'bestsellers' | 'sale';
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
  accent?: boolean;
}

export type SortKey =
  | 'nouveautes'
  | 'meilleures-ventes'
  | 'prix-croissant'
  | 'prix-decroissant'
  | 'date-ajout';

export interface ProductFilters {
  availability: string[];
  sizes: string[];
  colors: string[];
  price: string[];
  styles: string[];
  materials: string[];
}
