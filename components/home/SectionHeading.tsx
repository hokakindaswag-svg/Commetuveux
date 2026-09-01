import Link from 'next/link';

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
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'sm:flex-col sm:items-center sm:text-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'text-center' : ''}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Tag className="mt-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-[42px]">
          {title}
        </Tag>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brown">{subtitle}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-2xs uppercase tracking-widest text-wood underline decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
        >
          {hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}
