import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { InstagramIcon, TiktokIcon } from '@/components/ui/Icons';
import { footerNav, site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-wood text-cream">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.4fr]">
          <div>
            <Logo variant="light" width={200} className="w-[172px]" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/70">
              Le vestiaire dédié aux manteaux. Des pièces qu’on remarque, des prix qu’on aime —
              tout à {site.corePrice} €.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram Le Closet"
                className="text-cream/80 transition-colors hover:text-cream"
              >
                <InstagramIcon width={20} height={20} />
              </a>
              <a
                href={`https://tiktok.com/@${site.tiktok}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TikTok Le Closet"
                className="text-cream/80 transition-colors hover:text-cream"
              >
                <TiktokIcon width={20} height={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-2xs uppercase tracking-brand text-blush">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm text-cream/75 transition-colors hover:text-cream"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-cream/75 transition-colors hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-2xs uppercase tracking-wider text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Tous droits réservés.</p>
          <p>Paiement sécurisé · Livraison en France · Retours sous 14 jours</p>
        </div>
      </div>
    </footer>
  );
}
