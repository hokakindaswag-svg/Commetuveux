import { Link } from 'react-router-dom';
import CoatImage from './CoatImage';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/format';
import { IconHeart } from './Icons';

export default function ProductCard({ product, priority = false }) {
  const { toggleWishlist, isWished, addToCart, notify } = useStore();
  const wished = isWished(product.id);
  const soldOut = product.inventory === 0;
  const low = !soldOut && product.inventory <= 5;

  // Une seule taille disponible -> ajout direct. Sinon on laisse le lien
  // ouvrir la fiche produit pour que la cliente choisisse sa taille.
  const quickAdd = (e) => {
    if (soldOut || product.sizes.length !== 1) return;
    e.preventDefault();
    addToCart(product.id, product.sizes[0]);
    notify('Ajouté au panier');
  };

  return (
    <article className="card">
      <Link to={`/produit/${product.id}`} aria-label={product.name}>
        <div className="card__media">
          <CoatImage product={product} index={0} className="card__img card__img--main ph" priority={priority} />
          <CoatImage product={product} index={1} className="card__img card__img--alt ph" />

          <div className="card__badges">
            {soldOut && <span className="badge badge--soldout">Épuisé</span>}
            {!soldOut && product.badge === 'NOUVEAU' && <span className="badge badge--pink">Nouveau</span>}
            {!soldOut && product.badge === 'BEST-SELLER' && <span className="badge badge--burgundy">Best-seller</span>}
            {!soldOut && low && <span className="badge">Derniers exemplaires</span>}
          </div>
        </div>
      </Link>

      <button
        type="button"
        className={`card__wish${wished ? ' is-on' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={wished}
        aria-label={wished ? `Retirer ${product.name} de la wishlist` : `Ajouter ${product.name} à la wishlist`}
      >
        <IconHeart />
      </button>

      {!soldOut && (
        <div className="card__quick">
          <Link to={`/produit/${product.id}`} className="btn" onClick={quickAdd}>
            {product.sizes.length === 1 ? 'Ajouter au panier' : 'Choisir la taille'}
          </Link>
        </div>
      )}

      <div className="card__info">
        <h3 className="card__name">
          <Link to={`/produit/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="card__meta">
          {product.compareAtPrice ? (
            <span className="card__price price">
              <span className="price--was">{formatPrice(product.compareAtPrice)}</span>
              <span className="price--now">{formatPrice(product.price)}</span>
            </span>
          ) : (
            <span className="card__price price">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="card__color">{product.color}</p>
      </div>
    </article>
  );
}
