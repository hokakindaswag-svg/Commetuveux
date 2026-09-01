import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { useStore } from '../context/StoreContext';

export default function Layout() {
  const { ui, closeAll, toast } = useStore();
  const location = useLocation();
  const anyOpen = Object.values(ui).some(Boolean);

  useEffect(() => { closeAll(); }, [location.pathname, closeAll]);

  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <AnnouncementBar />
      <Header />

      <main id="main">
        <Outlet />
      </main>

      <Footer />

      <button
        type="button"
        className={`scrim${anyOpen ? ' is-open' : ''}`}
        onClick={closeAll}
        aria-label="Fermer"
        tabIndex={anyOpen ? 0 : -1}
        style={{ border: 0, display: anyOpen ? 'block' : 'none' }}
      />

      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />

      <div className={`toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toast?.message}
      </div>

      <ScrollRestoration />
    </>
  );
}
