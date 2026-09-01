/** Formatage monétaire français : 50,00 € */
export const formatPrice = (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

/** Pourcentage de remise arrondi, ex. 58 pour 119 € → 50 €. */
export const discountPercent = (price: number, compareAt: number | null) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso)
  );

export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count > 1 ? plural : singular}`;
