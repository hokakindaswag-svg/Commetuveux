import Image from 'next/image';
import Link from 'next/link';
import { media, site } from '@/data/site';
import { assetPath } from '@/lib/paths';

/**
 * Logo officiel STUDIO NEIGE PARIS.
 *
 * Le fichier est un PNG à fond transparent : il se pose donc naturellement
 * sur l'ivoire, le crème ou une image. Sur les fonds très sombres, le mot
 * « PARIS » perd du contraste : utilisez alors un encart clair (voir le
 * footer) plutôt que de recolorer le logo.
 *
 * Pour changer le logo, remplacez simplement le fichier pointé par
 * `media.logo` dans data/site.ts (et ajustez logoWidth / logoHeight aux
 * proportions du nouveau visuel).
 */
export function Logo({
  width = 240,
  priority = false,
  className = '',
  asLink = true,
}: {
  /**
   * Largeur d'affichage maximale attendue, en pixels : sert d'indice à
   * next/image pour choisir la bonne résolution. La largeur réelle est
   * pilotée par `className` (ex. `w-[200px] lg:w-[260px]`), et la hauteur
   * suit toujours les proportions natives du fichier.
   */
  width?: number;
  priority?: boolean;
  className?: string;
  /** `false` pour un logo décoratif, hors navigation. */
  asLink?: boolean;
}) {
  const image = (
    <Image
      src={assetPath(media.logo)}
      alt={site.fullName}
      width={media.logoWidth}
      height={media.logoHeight}
      priority={priority}
      sizes={`${width * 2}px`}
      className="h-auto w-full"
    />
  );

  if (!asLink) {
    return <span className={`inline-block ${className}`}>{image}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${site.fullName} — accueil`}
      className={`inline-block ${className}`}
    >
      {image}
    </Link>
  );
}
