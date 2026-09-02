import { discountPercent, formatPrice } from '@/lib/format';

/**
 * Hiérarchie de prix Studio Neige : prix d'origine barré, prix de vente en
 * bordeaux, remise en rose — lisible mais jamais criard.
 */
export function Price({
  price,
  compareAtPrice,
  size = 'md',
  showDiscount = false,
  className = '',
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}) {
  const off = discountPercent(price, compareAtPrice ?? null);
  const scale = {
    sm: { now: 'text-sm', was: 'text-xs', off: 'text-[10px]' },
    md: { now: 'text-[15px]', was: 'text-[13px]', off: 'text-[11px]' },
    lg: { now: 'text-2xl', was: 'text-base', off: 'text-xs' },
  }[size];

  return (
    <span className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${className}`}>
      {compareAtPrice && compareAtPrice > price ? (
        <span className={`${scale.was} text-brown/60 line-through`}>
          {formatPrice(compareAtPrice)}
        </span>
      ) : null}

      <span className={`${scale.now} font-medium text-burgundy`}>{formatPrice(price)}</span>

      {showDiscount && off > 0 ? (
        <span className={`${scale.off} uppercase tracking-widest text-pink-deep`}>−{off}%</span>
      ) : null}
    </span>
  );
}
