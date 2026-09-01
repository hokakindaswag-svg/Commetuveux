import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCT_BY_ID } from '../data/products';

const StoreContext = createContext(null);

const KEY_CART = 'lecloset.cart.v1';
const KEY_WISH = 'lecloset.wishlist.v1';

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible : le panier reste en mémoire */
  }
};

export function StoreProvider({ children }) {
  const [lines, setLines] = useState(() => read(KEY_CART, []));
  const [wishlist, setWishlist] = useState(() => read(KEY_WISH, []));
  const [ui, setUi] = useState({ cart: false, menu: false, search: false, filters: false, sort: false });
  const [toast, setToast] = useState(null);

  useEffect(() => write(KEY_CART, lines), [lines]);
  useEffect(() => write(KEY_WISH, wishlist), [wishlist]);

  const openPanel = useCallback((name) => setUi((s) => ({ ...s, [name]: true })), []);
  const closePanel = useCallback((name) => setUi((s) => ({ ...s, [name]: false })), []);
  const closeAll = useCallback(
    () => setUi({ cart: false, menu: false, search: false, filters: false, sort: false }),
    []
  );

  const anyOpen = Object.values(ui).some(Boolean);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', anyOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [anyOpen]);

  useEffect(() => {
    if (!anyOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeAll();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anyOpen, closeAll]);

  const notify = useCallback((message) => {
    setToast({ message, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback(
    (productId, size, quantity = 1) => {
      const key = `${productId}|${size}`;
      setLines((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 10) } : l));
        }
        return [...prev, { key, productId, size, quantity }];
      });
      openPanel('cart');
    },
    [openPanel]
  );

  const updateQuantity = useCallback((key, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 10) } : l))
    );
  }, []);

  const removeLine = useCallback((key) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        notify(has ? 'Retiré de la wishlist' : 'Ajouté à la wishlist ♡');
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [notify]
  );

  const cart = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = PRODUCT_BY_ID[line.productId];
        return product ? { ...line, product } : null;
      })
      .filter(Boolean);
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    return { items, subtotal, count };
  }, [lines]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      ui,
      toast,
      openPanel,
      closePanel,
      closeAll,
      notify,
      addToCart,
      updateQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      isWished: (id) => wishlist.includes(id),
    }),
    [cart, wishlist, ui, toast, openPanel, closePanel, closeAll, notify, addToCart, updateQuantity, removeLine, clearCart, toggleWishlist]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore doit être utilisé dans <StoreProvider>');
  return ctx;
};
