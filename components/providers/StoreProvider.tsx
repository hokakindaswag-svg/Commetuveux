'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product, Size } from '@/types';

/* ------------------------------------------------------------------ */
/*  Panier + wishlist, persistés dans le localStorage du navigateur.   */
/*  Aucun appel réseau : brancher ici votre backend / Shopify / Stripe.*/
/* ------------------------------------------------------------------ */

const CART_KEY = 'le-closet:cart';
const WISHLIST_KEY = 'le-closet:wishlist';

type CartAction =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; productId: string; size: Size }
  | { type: 'quantity'; productId: string; size: Size; quantity: number }
  | { type: 'clear' };

const cartReducer = (state: CartLine[], action: CartAction): CartLine[] => {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const existing = state.find(
        (l) => l.productId === action.line.productId && l.size === action.line.size
      );
      if (existing) {
        return state.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + action.line.quantity } : l
        );
      }
      return [action.line, ...state];
    }
    case 'remove':
      return state.filter((l) => !(l.productId === action.productId && l.size === action.size));
    case 'quantity':
      return state
        .map((l) =>
          l.productId === action.productId && l.size === action.size
            ? { ...l, quantity: Math.max(0, action.quantity) }
            : l
        )
        .filter((l) => l.quantity > 0);
    case 'clear':
      return [];
    default:
      return state;
  }
};

interface StoreContextValue {
  lines: CartLine[];
  cartCount: number;
  subtotal: number;
  savings: number;
  addToCart: (product: Product, size: Size, quantity?: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  setQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  /** Dernier produit ajouté — sert au message de confirmation du panier. */
  lastAdded: string | null;
  hydrated: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // hydratation depuis le localStorage
  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_KEY);
      if (rawCart) dispatch({ type: 'hydrate', lines: JSON.parse(rawCart) as CartLine[] });
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
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

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
    const locked = cartOpen || searchOpen || menuOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen, searchOpen, menuOpen]);

  const addToCart = useCallback((product: Product, size: Size, quantity = 1) => {
    dispatch({
      type: 'add',
      line: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.images[0],
        color: product.color.name,
        size,
        quantity,
      },
    });
    setLastAdded(product.id);
    setCartOpen(true);
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.quantity, 0);
    const savings = lines.reduce(
      (n, l) => n + Math.max(0, (l.compareAtPrice ?? l.price) - l.price) * l.quantity,
      0
    );
    return {
      lines,
      cartCount,
      subtotal,
      savings,
      addToCart,
      removeFromCart: (productId, size) => dispatch({ type: 'remove', productId, size }),
      setQuantity: (productId, size, quantity) =>
        dispatch({ type: 'quantity', productId, size, quantity }),
      clearCart: () => dispatch({ type: 'clear' }),
      wishlist,
      toggleWishlist: (productId) =>
        setWishlist((w) =>
          w.includes(productId) ? w.filter((id) => id !== productId) : [productId, ...w]
        ),
      isWishlisted: (productId) => wishlist.includes(productId),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
      lastAdded,
      hydrated,
    };
  }, [lines, wishlist, cartOpen, searchOpen, menuOpen, lastAdded, hydrated, addToCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore doit être utilisé à l’intérieur de <StoreProvider>');
  return ctx;
}
