'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Drawer } from '@/components/ui/Drawer';
import { ChevronDown, InstagramIcon, TiktokIcon } from '@/components/ui/Icons';
import { mainNav, site } from '@/data/site';

export function MobileMenu() {
  const { menuOpen, closeMenu } = useStore();
  const [expanded, setExpanded] = useState<string | null>('Manteaux');

  return (
    <Drawer
      open={menuOpen}
      onClose={closeMenu}
      side="left"
      title="Menu"
      labelledBy="menu-title"
      widthClass="w-[86%] max-w-[400px]"
    >
      <nav aria-label="Navigation principale" className="px-5 py-4 sm:px-6">
        <ul className="divide-y divide-wood/10">
          {mainNav.map((item) => (
            <li key={item.label} className="py-1">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    aria-expanded={expanded === item.label}
                    className="flex w-full items-center justify-between py-4 text-left text-sm uppercase tracking-widest text-wood"
                  >
                    {item.label}
                    <ChevronDown
                      width={18}
                      height={18}
                      className={`transition-transform duration-300 ${
                        expanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded === item.label ? (
                    <ul className="animate-slide-down pb-3 pl-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className="block py-2.5 text-sm text-brown transition-colors hover:text-burgundy"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`block py-4 text-sm uppercase tracking-widest ${
                    item.accent ? 'text-burgundy' : 'text-wood'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-3 border-t border-wood/10 pt-8">
          <Link
            href="/compte"
            onClick={closeMenu}
            className="block text-xs uppercase tracking-widest text-wood"
          >
            Mon compte
          </Link>
          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="block text-xs uppercase tracking-widest text-wood"
          >
            Ma wishlist
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="block text-xs uppercase tracking-widest text-wood"
          >
            Aide & contact
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-wood/10 pt-8 pb-4">
          <a
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram Le Closet"
            className="text-wood transition-opacity hover:opacity-60"
          >
            <InstagramIcon width={20} height={20} />
          </a>
          <a
            href={`https://tiktok.com/@${site.tiktok}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="TikTok Le Closet"
            className="text-wood transition-opacity hover:opacity-60"
          >
            <TiktokIcon width={20} height={20} />
          </a>
        </div>
      </nav>
    </Drawer>
  );
}
