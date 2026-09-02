import Link from 'next/link';

/**
 * Titre de section maison : surtitre espacé, titre serif en capitales,
 * et un flocon en filet — la signature « Neige ».
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  hrefLabel = 'Tout voir',
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const centered = align === 'center';

  return (
    <div
      className={
        centered
          ? 'flex flex-col items-center text-center'
          : 'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'
      }
    >
      <div className={centered ? 'max-w-2xl' : ''}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

        <Tag className="section-title mt-4">{title}</Tag>

        {/* Filet + flocon */}
        <div
          aria-hidden="true"
          className={`mt-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
        >
          <span className="h-px w-10 bg-burgundy/40" />
          <span className="text-xs text-burgundy/70">❄</span>
          <span className="h-px w-10 bg-burgundy/40" />
        </div>

        {subtitle ? (
          <p
            className={`mt-5 text-sm leading-relaxed text-brown ${
              centered ? 'mx-auto max-w-xl' : 'max-w-xl'
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className={`shrink-0 text-2xs uppercase tracking-brand text-chocolate underline decoration-burgundy/40 decoration-1 underline-offset-[6px] transition-colors hover:text-burgundy ${
            centered ? 'mt-7' : ''
          }`}
        >
          {hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}
