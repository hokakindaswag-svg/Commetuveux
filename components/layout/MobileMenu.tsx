'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { Drawer } from '@/components/ui/Drawer';
import {
  ChevronDown,
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
} from '@/components/ui/Icons';
import { site, socialLinks } from '@/data/site';
import { visibleNav } from '@/lib/catalog';

const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  pinterest: PinterestIcon,
};

export function MobileMenu() {
  const { menuOpen, closeMenu } = useStore();
  const [expanded, setExpanded] = useState<string | null>('Manteaux');

  return (
    <Drawer
      open={menuOpen}
      onClose={closeMenu}
      side="left"
      title={site.fullName}
      labelledBy="menu-title"
      widthClass="w-[88%] max-w-[400px]"
    >
      <nav aria-label="Navigation principale" className="px-5 py-3 sm:px-6">
        <ul className="divide-y divide-chocolate/10">
          {visibleNav().map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    aria-expanded={expanded === item.label}
                    className="flex w-full items-center justify-between py-5 text-left text-xs uppercase tracking-brand text-chocolate"
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
                    <ul className="animate-slide-down pb-4 pl-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className="block py-3 text-2xs uppercase tracking-widest text-brown transition-colors hover:text-burgundy"
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
                  className="block py-5 text-xs uppercase tracking-brand text-chocolate"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-4 border-t border-chocolate/10 pt-8">
          <Link
            href="/compte"
            onClick={closeMenu}
            className="block text-2xs uppercase tracking-brand text-chocolate"
          >
            Mon compte
          </Link>
          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="block text-2xs uppercase tracking-brand text-chocolate"
          >
            Ma sélection
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="block text-2xs uppercase tracking-brand text-chocolate"
          >
            Aide & contact
          </Link>
        </div>

        <ul className="mt-8 flex items-center gap-5 border-t border-chocolate/10 pb-6 pt-8">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.label} — ${site.fullName}`}
                  className="block text-chocolate transition-colors hover:text-burgundy"
                >
                  <Icon width={20} height={20} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Drawer>
  );
}
