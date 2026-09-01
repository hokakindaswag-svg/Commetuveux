import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS, COLLECTION_ORDER } from '../data/taxonomy';
import { IconBag, IconHeart, IconMenu, IconSearch, IconUser, IconChevronDown } from './Icons';

const MAIN_LINKS = [
  { label: 'Nouveautés', to: '/nouveautes' },
  { label: 'Manteaux', to: '/manteaux', dropdown: true },
  { label: 'Best-sellers', to: '/best-sellers' },
  { label: 'Promotions', to: '/promotions', sale: true },
];

export default function Header() {
  const { cart, wishlist, openPanel } = useStore();

  return (
    <header className="header">
      <div className="wrap header__inner">
        <nav className="header__nav" aria-label="Navigation principale">
          <ul className="nav" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {MAIN_LINKS.map((link) => (
              <li className="nav__item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav__link${isActive ? ' is-active' : ''}${link.sale ? ' nav__link--sale' : ''}`
                  }
                >
                  {link.label}
                  {link.dropdown && <IconChevronDown className="nav__caret" />}
                </NavLink>
                {link.dropdown && (
                  <div className="dropdown">
                    {COLLECTION_ORDER.map((key) => (
                      <Link
                        key={key}
                        className="dropdown__link"
                        to={key === 'all' ? '/manteaux' : `/manteaux/${COLLECTIONS[key].slug}`}
                      >
                        {key === 'all' ? 'Tous les manteaux' : COLLECTIONS[key].title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__mobile">
          <button type="button" className="icon-btn" onClick={() => openPanel('menu')} aria-label="Ouvrir le menu">
            <IconMenu />
          </button>
        </div>

        <Link to="/" className="header__logo" aria-label="Le Closet — accueil">
          <img src="/brand/le-closet-mark.png" alt="Le Closet" width="760" height="276" />
        </Link>

        <div className="header__actions">
          <button type="button" className="icon-btn" onClick={() => openPanel('search')} aria-label="Rechercher">
            <IconSearch />
          </button>
          <Link to="/compte" className="icon-btn icon-btn--desk" aria-label="Mon compte">
            <IconUser />
          </Link>
          <Link to="/wishlist" className="icon-btn icon-btn--desk" aria-label={`Wishlist (${wishlist.length})`}>
            <IconHeart />
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </Link>
          <button
            type="button"
            className="icon-btn"
            onClick={() => openPanel('cart')}
            aria-label={`Panier (${cart.count} article${cart.count > 1 ? 's' : ''})`}
          >
            <IconBag />
            {cart.count > 0 && <span className="badge-count">{cart.count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
