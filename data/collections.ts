import type { Collection } from '@/types';

/* ------------------------------------------------------------------ */
/*  Collections — chaque entrée génère /collections/[handle]           */
/* ------------------------------------------------------------------ */

export const collections: Collection[] = [
  {
    handle: 'manteaux',
    title: 'Manteaux & vestes',
    description:
      'Des silhouettes pensées pour l’hiver : coupes oversize, lignes féminines, textures douces et pièces statement à porter saison après saison.',
    categories: null,
    image: '/images/lifestyle/collection-manteaux.jpg',
  },
  {
    handle: 'nouveautes',
    title: 'Nouveautés',
    description:
      'Les dernières pièces entrées au studio. De nouvelles silhouettes chaque semaine.',
    categories: null,
    filter: 'new',
    image: '/images/lifestyle/collection-nouveautes.jpg',
  },
  {
    handle: 'best-sellers',
    title: 'Best-sellers',
    description:
      'Les manteaux les plus convoités de la saison, ceux qui partent le plus vite.',
    categories: null,
    filter: 'bestsellers',
    image: '/images/lifestyle/collection-best-sellers.jpg',
  },
  {
    handle: 'vestes',
    title: 'Vestes',
    description:
      'Les pièces courtes du vestiaire : teddy en bouclette, similicuir au tombé net et vestes taille haute qui se portent sur tout.',
    categories: ['teddy', 'similicuir', 'manteaux-courts'],
    image: '/images/lifestyle/collection-vestes.jpg',
  },
  {
    handle: 'fausse-fourrure',
    title: 'Fausse fourrure',
    description:
      'Les pièces statement de la saison : ultra douces, ultra chaudes et 100 % sans fourrure animale.',
    categories: ['fausse-fourrure'],
    image: '/images/lifestyle/collection-fourrure.jpg',
  },
  {
    handle: 'manteaux-longs',
    title: 'Manteaux longs',
    description:
      'Des coupes longues qui enveloppent la silhouette, du col tailleur à la ceinture nouée.',
    categories: ['manteaux-longs'],
    image: '/images/lifestyle/collection-longs.jpg',
  },
  {
    handle: 'manteaux-courts',
    title: 'Manteaux courts',
    description:
      'Taille haute, épaules nettes : les manteaux courts qui allongent la silhouette.',
    categories: ['manteaux-courts', 'teddy'],
    image: '/images/lifestyle/collection-courts.jpg',
  },
  {
    handle: 'doudounes',
    title: 'Doudounes',
    description:
      'Chaudes, légères et jamais banales. La doudoune qu’on garde tout l’hiver.',
    categories: ['doudounes'],
    image: '/images/lifestyle/collection-doudounes.jpg',
  },
  {
    handle: 'editions-hiver',
    title: 'Éditions hiver',
    description:
      'La sélection la plus chaude du studio : fausse fourrure, bouclette et laine mélangée, pour les journées les plus froides.',
    categories: ['fausse-fourrure', 'teddy', 'laine'],
    image: '/images/lifestyle/collection-editions-hiver.jpg',
  },
];

export const getCollection = (handle: string) =>
  collections.find((c) => c.handle === handle);

export default collections;
