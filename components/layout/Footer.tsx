import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { InstagramIcon, PinterestIcon, TiktokIcon } from '@/components/ui/Icons';
import { footerNav, site, socialLinks } from '@/data/site';
import { keepReachable } from '@/lib/catalog';
import { LeopardRule } from '@/components/ui/Leopard';

const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  pinterest: PinterestIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-chocolate text-ivory">
      {/* Filet léopard en tête de footer : rappel de la signature maison */}
      <LeopardRule id="rule-footer" />

      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2.2fr]">
          <div>
            {/*
              Le logo est posé sur un encart ivoire : sur le chocolat, le mot
              « PARIS » du logo perdrait son contraste. L'encart en fait un
              cartouche de marque assumé plutôt qu'un logo délavé.
            */}
            <div className="inline-block bg-ivory px-7 py-5">
              <Logo width={220} className="w-[176px] sm:w-[200px]" />
            </div>

            <p className="mt-7 max-w-xs text-sm leading-relaxed text-ivory/70">
              Le vestiaire d’hiver. Des manteaux et des vestes désirables, pensés pour les
              journées froides — à partir de {site.corePrice} €.
            </p>

            <ul className="mt-7 flex items-center gap-5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.label} — ${site.fullName}`}
                      className="block text-ivory/80 transition-colors hover:text-pink"
                    >
                      <Icon width={20} height={20} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-2xs uppercase tracking-brand text-pink">{group.title}</h2>
                <ul className="mt-6 space-y-3.5">
                  {keepReachable(group.links).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-2xs uppercase tracking-widest text-ivory/75 transition-colors hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-2xs uppercase tracking-widest text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. Tous droits réservés.
          </p>
          <p>Paiement sécurisé · Livraison en France · Retours sous 14 jours</p>
        </div>
      </div>
    </footer>
  );
}
