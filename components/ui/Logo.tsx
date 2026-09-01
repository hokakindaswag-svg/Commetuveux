import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Logo Le Closet.
 * Remplacez simplement les fichiers dans /public/images/logo/ :
 *   le-closet.svg       → version foncée (fonds clairs)
 *   le-closet-light.svg → version claire (fonds bordeaux / bruns)
 */
export function Logo({
  variant = 'dark',
  className = '',
  width = 220,
  priority = false,
}: {
  variant?: 'dark' | 'light';
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  const src = variant === 'light' ? '/images/logo/le-closet-light.svg' : media.logo;
  return (
    <Link href="/" aria-label="Le Closet — accueil" className={`inline-block ${className}`}>
      <Image
        src={assetPath(src)}
        alt="Le Closet"
        width={width}
        height={Math.round((width * 120) / 640)}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
