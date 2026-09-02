import type { Product } from '@/types';

/* ------------------------------------------------------------------ */
/*  CATALOGUE STUDIO NEIGE PARIS                                       */
/*                                                                     */
/*  Uniquement des produits réels, photographiés par la marque.        */
/*  Ajouter une pièce = ajouter un objet à ce tableau, et déposer ses  */
/*  visuels dans /public/images/products/.                             */
/*                                                                     */
/*  Convention : images[0] = visuel principal, images[1] = survol.     */
/*  Les visuels suivants alimentent la galerie de la fiche produit.    */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    // Produit réel — photos de la marque.
    id: 'SN-001',
    slug: 'cape-fourrure-iris',
    name: 'CAPE FOURRURE IRIS',
    price: 50,
    compareAtPrice: 159,
    category: 'fausse-fourrure',
    style: 'statement',
    color: { name: 'Ivoire', hex: '#F6EFE6', group: 'Crème' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/cape-fourrure-iris-1.jpg',
      '/images/products/cape-fourrure-iris-2.jpg',
      '/images/products/cape-fourrure-iris-3.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'La pièce statement de la saison : une cape en maille ivoire à enfiler, bordée d’une fausse fourrure épaisse et ultra douce sur tout le tour — col, manches et ourlet. Coupe ample et drapée, elle se porte aussi bien sur un jean que sur une robe.',
    details: [
      'Cape oversize à enfiler',
      'Col fourrure enveloppant',
      'Manches et ourlet bordés de fausse fourrure épaisse',
      'Coupe ample et drapée',
    ],
    material: 'Fausse fourrure',
    // Composition à confirmer par la marque — valeur reprise des autres
    // pièces en fausse fourrure du catalogue, à ajuster si différente.
    composition: '80% acrylique, 20% polyester · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser délicatement dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 14, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos de la marque.
    id: 'SN-002',
    slug: 'cape-fourrure-maud',
    name: 'CAPE FOURRURE MAUD',
    price: 50,
    compareAtPrice: 139,
    category: 'fausse-fourrure',
    style: 'statement',
    color: { name: 'Taupe', hex: '#9C8378', group: 'Marron' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/cape-fourrure-maud-1.jpg',
      '/images/products/cape-fourrure-maud-2.jpg',
      '/images/products/cape-fourrure-maud-3.jpg',
      '/images/products/cape-fourrure-maud-4.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Une cape en maille taupe à enfiler, bordée d’une large fausse fourrure sur le col, les manches et l’ourlet. Le drapé souple crée du mouvement à chaque pas, et la teinte chaude se marie aussi bien au chocolat qu’au bordeaux ou au crème.',
    details: [
      'Cape oversize à enfiler',
      'Col fourrure enveloppant',
      'Manches et ourlet bordés de fausse fourrure épaisse',
      'Drapé souple, longueur mi-cuisse',
    ],
    material: 'Fausse fourrure',
    // Composition à confirmer par la marque.
    composition: '80% acrylique, 20% polyester · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser délicatement dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 12, S: 14, M: 16, L: 12, XL: 8 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-003',
    slug: 'veste-capuche-alma',
    name: 'VESTE CAPUCHE ALMA',
    price: 50,
    compareAtPrice: 149,
    category: 'manteaux-courts',
    style: 'capuche',
    color: { name: 'Camel', hex: '#D6BE9B', group: 'Beige' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/veste-capuche-alma-1.jpg',
      '/images/products/veste-capuche-alma-2.jpg',
      '/images/products/veste-capuche-alma-3.jpg',
      '/images/products/veste-capuche-alma-4.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Une veste courte en maille camel, fermée par un zip, avec une capuche bordée d’une fourrure généreuse et doublée de satin. Bords-côtes à la taille et aux poignets pour une ligne nette, deux poches devant : la pièce qu’on enfile sur tout, du jean au pantalon de tailleur.',
    details: [
      'Maille douce, coupe courte',
      'Capuche bordée de fourrure, doublée satin',
      'Fermeture zippée sur toute la hauteur',
      'Bords-côtes taille et poignets, deux poches devant',
    ],
    // Matière du corps de la veste. La nature de la fourrure de capuche
    // (véritable ou synthétique) reste à confirmer par la marque : elle
    // conditionne l’étiquetage réglementaire.
    material: 'Laine mélangée',
    composition: 'Composition à confirmer par la marque.',
    care: 'Nettoyage à sec recommandé. Brosser la fourrure de la capuche dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 12, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
];

export default products;
