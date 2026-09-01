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
import { mainNav } from '@/data/site';

export function Header() {
  const { cartCount, wishlist, openCart, openSearch, openMenu, hydrated } = useStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpenDropdown(null), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 bg-cream transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_0_rgba(48,21,14,0.10)]' : ''
      }`}
    >
      <div className="container-site">
        <div className="grid h-[52px] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[72px]">
          {/* Gauche : navigation desktop / burger mobile */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={openMenu}
              aria-label="Ouvrir le menu"
              className="-ml-2 p-2 text-wood lg:hidden"
            >
              <MenuIcon width={22} height={22} />
            </button>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {mainNav.map((item) => (
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
                      className={`flex items-center gap-1 py-2 text-2xs uppercase tracking-widest transition-colors ${
                        item.accent ? 'text-burgundy' : 'text-wood hover:text-burgundy'
                      } ${isActive(item.href) ? 'underline decoration-1 underline-offset-4' : ''}`}
                    >
                      {item.label}
                      {item.children ? <ChevronDown width={12} height={12} /> : null}
                    </Link>

                    {item.children && openDropdown === item.label ? (
                      <div className="absolute left-0 top-full z-50 w-56 animate-slide-down border border-wood/10 bg-cream p-2 shadow-[0_18px_40px_-24px_rgba(48,21,14,.5)]">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-3 py-2.5 text-xs text-wood transition-colors hover:bg-silk hover:text-burgundy"
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

          {/* Centre : logo */}
          <div className="flex justify-center">
            <Logo width={150} priority className="w-[124px] lg:w-[168px]" />
          </div>

          {/* Droite : recherche, compte, wishlist, panier */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Rechercher"
              className="p-2 text-wood transition-opacity hover:opacity-60"
            >
              <SearchIcon width={19} height={19} />
            </button>

            <Link
              href="/compte"
              aria-label="Mon compte"
              className="hidden p-2 text-wood transition-opacity hover:opacity-60 sm:block"
            >
              <UserIcon width={19} height={19} />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Ma wishlist${hydrated && wishlist.length ? ` (${wishlist.length})` : ''}`}
              className="relative hidden p-2 text-wood transition-opacity hover:opacity-60 sm:block"
            >
              <HeartIcon width={19} height={19} />
              {hydrated && wishlist.length > 0 ? (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] leading-none text-cream">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Panier${hydrated && cartCount ? ` (${cartCount} article${cartCount > 1 ? 's' : ''})` : ''}`}
              className="relative p-2 text-wood transition-opacity hover:opacity-60"
            >
              <BagIcon width={19} height={19} />
              {hydrated && cartCount > 0 ? (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] leading-none text-cream">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
