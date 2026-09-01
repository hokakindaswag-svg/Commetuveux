import { discountPercent, formatPrice } from '@/lib/format';

/**
 * Hiérarchie de prix Le Closet : prix d'origine barré + 50 € en évidence.
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
    sm: { now: 'text-sm', was: 'text-xs' },
    md: { now: 'text-[15px]', was: 'text-[13px]' },
    lg: { now: 'text-2xl', was: 'text-base' },
  }[size];

  return (
    <span className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      {compareAtPrice && compareAtPrice > price ? (
        <span className={`${scale.was} text-brown/60 line-through`}>
          {formatPrice(compareAtPrice)}
        </span>
      ) : null}
      <span className={`${scale.now} font-medium text-burgundy`}>{formatPrice(price)}</span>
      {showDiscount && off > 0 ? (
        <span className="bg-burgundy px-1.5 py-0.5 text-2xs font-medium tracking-wider text-cream">
          −{off}%
        </span>
      ) : null}
    </span>
  );
}
