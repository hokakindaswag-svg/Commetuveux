/* ------------------------------------------------------------------ */
/*  Section « Le studio, porté » — photos des pièces portées           */
/*                                                                     */
/*  Déposez vos visuels dans /public/images/ugc/ et ajoutez une entrée  */
/*  ici. Format attendu : 4/5 (900 × 1125 par exemple).                 */
/* ------------------------------------------------------------------ */

export interface UgcPhoto {
  /** Chemin relatif à /public. */
  image: string;
  /** Description pour les lecteurs d'écran. */
  alt: string;
  /**
   * Slug du produit porté, quand il est identifiable avec certitude : la
   * vignette devient alors un lien vers sa fiche. Laisser vide plutôt que
   * de deviner — un lien qui mène au mauvais manteau dessert la vente.
   */
  product?: string;
}

export const ugcPhotos: UgcPhoto[] = [
  {
    image: '/images/ugc/ugc-01.jpg',
    alt: 'Veste à capuche ivoire portée capuche relevée, bordure de fausse fourrure blanche',
    product: 'veste-capuche-cleo',
  },
  {
    image: '/images/ugc/ugc-02.jpg',
    alt: 'Large col en fausse fourrure brune d’un manteau noir, porté en extérieur',
    product: 'manteau-col-fourrure-vera',
  },
  {
    image: '/images/ugc/ugc-03.jpg',
    alt: 'Veste à capuche beige portée sous la neige, capuche bordée de fausse fourrure',
  },
  {
    image: '/images/ugc/ugc-04.jpg',
    alt: 'Veste à capuche ivoire vue de profil, capuche relevée',
    product: 'veste-capuche-cleo',
  },
  {
    image: '/images/ugc/ugc-05.jpg',
    alt: 'Veste à capuche camel portée de profil, capuche bordée de fausse fourrure',
  },
];

/**
 * Nombre de vignettes de la rangée. Les emplacements non occupés par une
 * photo restent affichés en cadre vide : l'invitation à envoyer sa photo
 * reste donc littérale, et disparaît d'elle-même quand la rangée se remplit.
 */
export const ugcRow = 6;
