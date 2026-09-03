/* ------------------------------------------------------------------ */
/*  Opération commerciale en cours                                     */
/*                                                                     */
/*  Pour arrêter l'opération : passer `active` à false. Elle s'arrête   */
/*  de toute façon d'elle-même à la date de fin, sans redéploiement —   */
/*  la bannière vérifie la date dans le navigateur du visiteur.        */
/* ------------------------------------------------------------------ */

export const promo = {
  active: true,
  label: 'Offre de rentrée',
  message: 'Capes et vestes à capuche à 19,99 € au lieu de 50 €',
  /**
   * Fin de l'opération, incluse. Fuseau explicite : sans lui, la date
   * serait interprétée en UTC et l'offre se couperait deux heures trop tôt
   * pour un visiteur en France.
   */
  // Opération de 15 jours : du 3 au 17 septembre inclus.
  endsAt: '2026-09-17T23:59:59+02:00',
  href: '/collections/manteaux',
  cta: 'En profiter',
} as const;

export const promoEndsAt = Date.parse(promo.endsAt);

/** Date de fin en toutes lettres, pour l'affichage. */
export const promoEndLabel = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Paris',
}).format(new Date(promoEndsAt));
