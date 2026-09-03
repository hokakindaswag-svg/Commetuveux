'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/* ------------------------------------------------------------------ */
/*  Sélection (wishlist), persistée dans le localStorage du navigateur. */
/*  Pas de panier : chaque fiche produit renvoie directement vers son   */
/*  lien d'achat, pour ne pas permettre d'accumuler plusieurs pièces    */
/*  dans une même commande.                                            */
/* ------------------------------------------------------------------ */

const WISHLIST_KEY = 'studio-neige:wishlist';

interface StoreContextValue {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  hydrated: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // hydratation depuis le localStorage
  useEffect(() => {
    try {
      const rawWish = window.localStorage.getItem(WISHLIST_KEY);
      if (rawWish) setWishlist(JSON.parse(rawWish) as string[]);
    } catch {
      /* stockage indisponible (navigation privée) : on continue sans persistance */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist, hydrated]);

  // bloque le scroll de la page quand un tiroir est ouvert
  useEffect(() => {
    const locked = searchOpen || menuOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen, menuOpen]);

  const value = useMemo<StoreContextValue>(
    () => ({
      wishlist,
      toggleWishlist: (productId) =>
        setWishlist((w) =>
          w.includes(productId) ? w.filter((id) => id !== productId) : [productId, ...w]
        ),
      isWishlisted: (productId) => wishlist.includes(productId),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
      hydrated,
    }),
    [wishlist, searchOpen, menuOpen, hydrated]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore doit être utilisé à l’intérieur de <StoreProvider>');
  return ctx;
}
