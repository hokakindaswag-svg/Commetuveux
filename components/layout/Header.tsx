'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Logo } from '@/components/ui/Logo';
import {
  BagIcon,
  ChevronDown,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '@/components/ui/Icons';
import { visibleNav } from '@/lib/catalog';
import { LeopardRule } from '@/components/ui/Leopard';

/**
 * Header éditorial : déroulé en haut de page (logo généreux), il se
 * compacte au défilement pour libérer de la place sans perdre la marque.
 */
export function Header() {
  const { cartCount, wishlist, openCart, openSearch, openMenu, hydrated } = useStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpenDropdown(null), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="container-site">
        <div
          className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-all duration-500 ease-studio ${
            compact ? 'py-2.5 lg:py-3' : 'py-3.5 lg:py-6'
          }`}
        >
          {/* Gauche : navigation desktop / burger mobile */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={openMenu}
              aria-label="Ouvrir le menu"
              className="-ml-2 p-2 text-chocolate lg:hidden"
            >
              <MenuIcon width={22} height={22} />
            </button>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-8">
                {visibleNav().map((item) => (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                    onMouseLeave={() => item.children && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={item.children ? openDropdown === item.label : undefined}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      onFocus={() => item.children && setOpenDropdown(item.label)}
                      className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-2xs uppercase tracking-brand
                        transition-colors hover:text-burgundy ${
                          isActive(item.href) ? 'text-burgundy' : 'text-chocolate'
                        }`}
                    >
                      {item.label}
                      {item.children ? <ChevronDown width={11} height={11} /> : null}
                    </Link>

                    {/* Filet actif sous l'onglet courant */}
                    {isActive(item.href) ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-burgundy"
                      />
                    ) : null}

                    {item.children && openDropdown === item.label ? (
                      <div className="absolute left-0 top-full z-50 w-60 animate-slide-down border border-chocolate/10 bg-cream p-2 shadow-[0_24px_50px_-30px_rgb(var(--color-chocolate)/0.6)]">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-3 py-2.5 text-2xs uppercase tracking-widest text-chocolate transition-colors hover:bg-ivory hover:text-burgundy"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre : logo de la maison */}
          <div className="flex justify-center">
            <Logo
              width={280}
              priority
              className={`transition-[width] duration-500 ease-studio ${
                compact
                  ? 'w-[132px] sm:w-[150px] lg:w-[190px]'
                  : 'w-[158px] sm:w-[190px] lg:w-[268px]'
              }`}
            />
          </div>

          {/* Droite : recherche, compte, wishlist, panier */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Rechercher"
              className="p-2 text-chocolate transition-colors hover:text-burgundy"
            >
              <SearchIcon width={19} height={19} />
            </button>

            <Link
              href="/compte"
              aria-label="Mon compte"
              className="hidden p-2 text-chocolate transition-colors hover:text-burgundy sm:block"
            >
              <UserIcon width={19} height={19} />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Ma sélection${hydrated && wishlist.length ? ` (${wishlist.length})` : ''}`}
              className="relative hidden p-2 text-chocolate transition-colors hover:text-burgundy sm:block"
            >
              <HeartIcon width={19} height={19} />
              {hydrated && wishlist.length > 0 ? (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] leading-none text-ivory">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Panier${hydrated && cartCount ? ` (${cartCount} article${cartCount > 1 ? 's' : ''})` : ''}`}
              className="relative p-2 text-chocolate transition-colors hover:text-burgundy"
            >
              <BagIcon width={19} height={19} />
              {hydrated && cartCount > 0 ? (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] leading-none text-ivory">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {/* Filet léopard : signature de la maison, discrète mais reconnaissable */}
      <LeopardRule id="rule-header" />
    </header>
  );
}
