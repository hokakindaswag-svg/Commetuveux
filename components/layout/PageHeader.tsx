import Link from 'next/link';

export function PageHeader({
  title,
  intro,
  breadcrumb,
}: {
  title: string;
  intro?: string;
  breadcrumb?: string;
}) {
  return (
    <header className="border-b border-wood/10 bg-cream-warm">
      <div className="container-site py-14 text-center lg:py-20">
        <nav aria-label="Fil d’Ariane" className="mb-5">
          <ol className="flex items-center justify-center gap-2 text-2xs uppercase tracking-wider text-brown">
            <li>
              <Link href="/" className="hover:text-wood">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-wood">{breadcrumb ?? title}</li>
          </ol>
        </nav>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brown">{intro}</p>
        ) : null}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-site py-14 lg:py-20">
      <div
        className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-brown
                   [&_a]:text-wood [&_a]:underline [&_a]:underline-offset-4
                   [&_h2]:pt-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-wood
                   [&_h3]:pt-4 [&_h3]:text-2xs [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-wood
                   [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
      >
        {children}
      </div>
    </div>
  );
}
