/** Prix au format français : 50,00 € */
export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

export const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;
