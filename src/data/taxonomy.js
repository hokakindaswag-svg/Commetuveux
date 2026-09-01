/* Taxonomie Le Closet — manteaux uniquement. */

export const COLLECTIONS = {
  all: {
    slug: 'tous-les-manteaux',
    title: 'Manteaux',
    subtitle: 'Des manteaux pour chaque mood, chaque silhouette et chaque saison.',
  },
  longs: {
    slug: 'manteaux-longs',
    title: 'Manteaux longs',
    subtitle: 'La silhouette qui allonge tout, du bureau au dimanche soir.',
  },
  courts: {
    slug: 'manteaux-courts',
    title: 'Manteaux courts',
    subtitle: 'Des coupes nettes qui se portent avec tout.',
  },
  doudounes: {
    slug: 'doudounes',
    title: 'Doudounes',
    subtitle: 'Chaud dehors, stylé partout.',
  },
  fourrure: {
    slug: 'fausse-fourrure',
    title: 'Fausse fourrure',
    subtitle: 'La texture qui transforme une tenue en look.',
  },
  tendance: {
    slug: 'manteaux-tendance',
    title: 'Manteaux tendance',
    subtitle: 'Les pièces qu’on repère à dix mètres.',
  },
};

/** Ordre d'affichage du menu Manteaux. */
export const COLLECTION_ORDER = ['all', 'longs', 'courts', 'doudounes', 'fourrure', 'tendance'];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

/** Couleurs commerciales -> pastille affichée dans les filtres et sur la fiche produit. */
export const COLORS = {
  Noir: '#151515',
  Crème: '#F2E9DE',
  Écru: '#E4D9C8',
  Beige: '#D9C3A9',
  Camel: '#B98B55',
  Chocolat: '#4A3226',
  Bordeaux: '#6E1B22',
  Rose: '#F3A0AA',
  Gris: '#A9A6A2',
  Léopard: '#C08A4A',
};

export const STYLES = [
  'Oversize',
  'Ceinturé',
  'À capuche',
  'Teddy',
  'Fausse fourrure',
  'Doudoune',
  'Effet laine',
  'Effet cuir',
  'Cintré',
];

export const SORTS = [
  { id: 'nouveautes', label: 'Nouveautés' },
  { id: 'ventes', label: 'Meilleures ventes' },
  { id: 'prix-asc', label: 'Prix croissant' },
  { id: 'prix-desc', label: 'Prix décroissant' },
];
