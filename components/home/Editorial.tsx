import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/paths';
import { LeopardRule } from '@/components/ui/Leopard';

/**
 * Bloc éditorial de campagne : image plein cadre, cadre fin façon page de
 * magazine, et une touche de léopard en signature.
 */
export function Editorial({
  image,
  eyebrow,
  title,
  text,
  href,
  cta = 'Découvrir',
  align = 'left',
  tone = 'dark',
  id,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
  align?: 'left' | 'right' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
}) {
  const dark = tone === 'dark';
  const headingId = id ?? 'editorial-title';

  const overlay =
    align === 'center'
      ? dark
        ? 'bg-chocolate/55'
        : 'bg-cream/60'
      : align === 'right'
        ? dark
          ? 'bg-gradient-to-l from-chocolate/85 via-chocolate/55 to-transparent'
          : 'bg-gradient-to-l from-cream/90 via-cream/50 to-transparent'
        : dark
          ? 'bg-gradient-to-r from-chocolate/85 via-chocolate/55 to-transparent'
          : 'bg-gradient-to-r from-cream/90 via-cream/50 to-transparent';

  return (
    <section className="relative isolate" aria-labelledby={headingId}>
      <LeopardRule id={`rule-${headingId}-top`} />

      <div className="relative min-h-[500px] w-full sm:min-h-[580px] lg:min-h-[680px]">
        <Image
          src={assetPath(image)}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div className={`absolute inset-0 ${overlay}`} />

        {/* Cadre fin, façon mise en page de magazine */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-5 border sm:inset-8 lg:inset-10 ${
            dark ? 'border-ivory/25' : 'border-chocolate/20'
          }`}
        />

        <div className="container-site relative flex min-h-[500px] items-center sm:min-h-[580px] lg:min-h-[680px]">
          <div
            className={`max-w-xl py-16 ${
              align === 'right' ? 'ml-auto text-right' : align === 'center' ? 'mx-auto text-center' : ''
            }`}
          >
            {eyebrow ? (
              <p
                className={`text-2xs uppercase tracking-signature ${
                  dark ? 'text-pink' : 'text-burgundy'
                }`}
              >
                {eyebrow}
              </p>
            ) : null}

            <h2
              id={headingId}
              className={`mt-6 font-display text-[34px] font-light leading-[1.08] sm:text-5xl lg:text-[56px] ${
                dark ? 'text-ivory' : 'text-chocolate'
              }`}
            >
              {title}
            </h2>

            <p
              className={`mt-6 text-sm leading-relaxed ${
                dark ? 'text-ivory/80' : 'text-brown'
              }`}
            >
              {text}
            </p>

            <Link href={href} className={`mt-10 ${dark ? 'btn-light' : 'btn-primary'}`}>
              {cta}
            </Link>
          </div>
        </div>
      </div>

      <LeopardRule id={`rule-${headingId}-bottom`} />
    </section>
  );
}
