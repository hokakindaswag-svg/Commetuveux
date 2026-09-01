import type { Collection } from '@/types';

/* ------------------------------------------------------------------ */
/*  Collections — chaque entrée génère /collections/[handle]           */
/* ------------------------------------------------------------------ */

export const collections: Collection[] = [
  {
    handle: 'manteaux',
    title: 'Manteaux',
    description:
      'Des manteaux pour chaque silhouette, chaque mood et chaque saison. Tous à 50 €.',
    categories: null,
    image: '/images/lifestyle/collection-manteaux.jpg',
  },
  {
    handle: 'nouveautes',
    title: 'Nouveautés',
    description: 'Les derniers manteaux arrivés dans Le Closet. Nouveaux modèles chaque semaine.',
    categories: null,
    filter: 'new',
    image: '/images/lifestyle/collection-nouveautes.jpg',
  },
  {
    handle: 'best-sellers',
    title: 'Best-sellers',
    description: 'Les manteaux qui partent le plus vite. Ceux que vous nous réclamez.',
    categories: null,
    filter: 'bestsellers',
    image: '/images/lifestyle/collection-best-sellers.jpg',
  },
  {
    handle: 'promotions',
    title: 'Promotions',
    description:
      'Tout Le Closet à 50 €. Comparez avec le prix d’origine : la remise est sur chaque étiquette.',
    categories: null,
    filter: 'sale',
    image: '/images/lifestyle/collection-promotions.jpg',
  },
  {
    handle: 'manteaux-longs',
    title: 'Manteaux longs',
    description: 'Des coupes longues qui enveloppent, du col tailleur à la ceinture nouée.',
    categories: ['manteaux-longs'],
    image: '/images/lifestyle/collection-longs.jpg',
  },
  {
    handle: 'manteaux-courts',
    title: 'Manteaux courts',
    description: 'Taille haute, épaules nettes : les manteaux courts qui allongent la silhouette.',
    categories: ['manteaux-courts', 'teddy'],
    image: '/images/lifestyle/collection-courts.jpg',
  },
  {
    handle: 'doudounes',
    title: 'Doudounes',
    description: 'Chaudes, légères et jamais banales. La doudoune qu’on garde tout l’hiver.',
    categories: ['doudounes'],
    image: '/images/lifestyle/collection-doudounes.jpg',
  },
  {
    handle: 'fausse-fourrure',
    title: 'Fausse fourrure',
    description: 'Les pièces statement de la saison, ultra douces et 100 % sans fourrure animale.',
    categories: ['fausse-fourrure'],
    image: '/images/lifestyle/collection-fourrure.jpg',
  },
  {
    handle: 'manteaux-tendance',
    title: 'Manteaux tendance',
    description: 'Similicuir, trench revisité, teddy oversize : les manteaux qu’on repère de loin.',
    categories: ['similicuir', 'trench', 'teddy'],
    image: '/images/lifestyle/collection-tendance.jpg',
  },
];

export const getCollection = (handle: string) =>
  collections.find((c) => c.handle === handle);

export default collections;
