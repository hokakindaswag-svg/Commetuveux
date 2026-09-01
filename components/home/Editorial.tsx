import Image from 'next/image';
import Link from 'next/link';

export function Editorial({
  image,
  eyebrow,
  title,
  text,
  href,
  cta = 'Découvrir',
  align = 'left',
  tone = 'light',
}: {
  image: string;
  eyebrow?: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
  align?: 'left' | 'right' | 'center';
  tone?: 'light' | 'dark';
}) {
  const ink = tone === 'dark' ? 'text-cream' : 'text-wood';
  const sub = tone === 'dark' ? 'text-cream/80' : 'text-brown';
  const overlay =
    align === 'center'
      ? 'bg-wood/35'
      : align === 'right'
        ? tone === 'dark'
          ? 'bg-gradient-to-l from-wood/80 via-wood/40 to-transparent'
          : 'bg-gradient-to-l from-cream/85 via-cream/40 to-transparent'
        : tone === 'dark'
          ? 'bg-gradient-to-r from-wood/80 via-wood/40 to-transparent'
          : 'bg-gradient-to-r from-cream/85 via-cream/40 to-transparent';

  return (
    <section className="relative isolate" aria-labelledby={`editorial-${title.slice(0, 8)}`}>
      <div className="relative min-h-[460px] w-full sm:min-h-[560px] lg:min-h-[660px]">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div className={`absolute inset-0 ${overlay}`} />

        <div className="container-site relative flex min-h-[460px] items-center sm:min-h-[560px] lg:min-h-[660px]">
          <div
            className={`max-w-lg ${
              align === 'right' ? 'ml-auto text-right' : align === 'center' ? 'mx-auto text-center' : ''
            }`}
          >
            {eyebrow ? (
              <p className={`text-2xs uppercase tracking-brand ${tone === 'dark' ? 'text-blush' : 'text-brown'}`}>
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={`editorial-${title.slice(0, 8)}`}
              className={`mt-5 font-serif text-4xl leading-[1.06] sm:text-5xl lg:text-6xl ${ink}`}
            >
              {title}
            </h2>
            <p className={`mt-5 text-sm leading-relaxed ${sub}`}>{text}</p>
            <Link
              href={href}
              className={`btn mt-9 px-8 py-4 ${
                tone === 'dark'
                  ? 'bg-cream text-burgundy hover:bg-blush hover:text-wood'
                  : 'bg-burgundy text-cream hover:bg-wood'
              }`}
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
