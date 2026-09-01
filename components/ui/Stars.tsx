import { StarIcon, StarOutline } from './Icons';

export function Stars({
  rating,
  reviewCount,
  className = '',
  size = 14,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: number;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.35;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className="inline-flex text-burgundy"
        role="img"
        aria-label={`Note : ${rating.toString().replace('.', ',')} sur 5`}
      >
        {Array.from({ length: 5 }).map((_, i) =>
          i < full ? (
            <StarIcon key={i} width={size} height={size} />
          ) : i === full && half ? (
            <StarIcon key={i} half width={size} height={size} />
          ) : (
            <StarOutline key={i} width={size} height={size} className="opacity-40" />
          )
        )}
      </span>
      {typeof reviewCount === 'number' ? (
        <span className="text-xs text-brown">({reviewCount})</span>
      ) : null}
    </span>
  );
}
