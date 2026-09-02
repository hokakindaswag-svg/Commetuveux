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
    <header className="border-b border-chocolate/10 bg-cream-warm">
      <div className="container-site py-16 text-center lg:py-20">
        <nav aria-label="Fil d’Ariane" className="mb-6">
          <ol className="flex items-center justify-center gap-2 text-2xs uppercase tracking-widest text-brown">
            <li>
              <Link href="/" className="hover:text-chocolate">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-chocolate">{breadcrumb ?? title}</li>
          </ol>
        </nav>

        <h1 className="section-title">{title}</h1>

        <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-burgundy/40" />
          <span className="text-xs text-burgundy/70">❄</span>
          <span className="h-px w-10 bg-burgundy/40" />
        </div>

        {intro ? (
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brown">{intro}</p>
        ) : null}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-site py-16 lg:py-20">
      <div
        className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-brown
                   [&_a]:text-chocolate [&_a]:underline [&_a]:underline-offset-4
                   [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-light
                   [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:text-chocolate
                   [&_h3]:pt-4 [&_h3]:text-2xs [&_h3]:uppercase [&_h3]:tracking-brand [&_h3]:text-chocolate
                   [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
      >
        {children}
      </div>
    </div>
  );
}
