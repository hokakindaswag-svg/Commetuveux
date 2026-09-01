import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS, COLLECTION_ORDER } from '../data/taxonomy';
import { IconChevronDown, IconClose } from './Icons';

export default function MobileMenu() {
  const { ui, closePanel } = useStore();
  const [open, setOpen] = useState(false);
  const close = () => closePanel('menu');

  return (
    <aside
      className={`drawer drawer--left${ui.menu ? ' is-open' : ''}`}
      aria-hidden={!ui.menu}
      aria-label="Menu"
    >
      <div className="drawer__head">
        <span className="drawer__title">Menu</span>
        <button type="button" className="icon-btn" onClick={close} aria-label="Fermer le menu">
          <IconClose />
        </button>
      </div>

      <div className="drawer__body">
        <nav className="mmenu__list" aria-label="Navigation mobile">
          <Link className="mmenu__link" to="/nouveautes" onClick={close}>Nouveautés</Link>

          <button
            type="button"
            className="mmenu__link"
            style={{ width: '100%', background: 'none', border: 0, borderBottom: '1px solid var(--line)', textAlign: 'left', cursor: 'pointer' }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Manteaux
            <IconChevronDown style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
          </button>
          {open && (
            <div className="mmenu__sub">
              {COLLECTION_ORDER.map((key) => (
                <Link
                  key={key}
                  className="mmenu__sublink"
                  to={key === 'all' ? '/manteaux' : `/manteaux/${COLLECTIONS[key].slug}`}
                  onClick={close}
                >
                  {key === 'all' ? 'Tous les manteaux' : COLLECTIONS[key].title}
                </Link>
              ))}
            </div>
          )}

          <Link className="mmenu__link" to="/best-sellers" onClick={close}>Best-sellers</Link>
          <Link className="mmenu__link" to="/promotions" onClick={close} style={{ color: 'var(--burgundy)' }}>
            Promotions
          </Link>
        </nav>

        <div className="mmenu__foot">
          <Link to="/wishlist" onClick={close}>Wishlist</Link>
          <Link to="/compte" onClick={close}>Mon compte</Link>
          <Link to="/infos/livraison" onClick={close}>Livraison</Link>
          <Link to="/infos/retours" onClick={close}>Retours</Link>
          <Link to="/infos/guide-des-tailles" onClick={close}>Guide des tailles</Link>
          <Link to="/infos/contact" onClick={close}>Contact</Link>
        </div>
      </div>
    </aside>
  );
}
