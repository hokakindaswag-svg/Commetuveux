import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../lib/format';
import CoatImage from './CoatImage';
import { IconClose, IconMinus, IconPlus } from './Icons';

const FREE_SHIPPING = 80;

export default function CartDrawer() {
  const { ui, closePanel, cart, updateQuantity, removeLine, addToCart } = useStore();
  const navigate = useNavigate();
  const close = () => closePanel('cart');

  const inCart = new Set(cart.items.map((i) => i.productId));
  const recos = useMemo(
    () => PRODUCTS.filter((p) => p.bestseller && p.inventory > 0 && !inCart.has(p.id)).slice(0, 3),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart.items.length]
  );

  const remaining = Math.max(0, FREE_SHIPPING - cart.subtotal);
  const progress = Math.min(100, (cart.subtotal / FREE_SHIPPING) * 100);

  return (
    <aside
      className={`drawer drawer--right${ui.cart ? ' is-open' : ''}`}
      aria-hidden={!ui.cart}
      aria-label="Panier"
    >
      <div className="drawer__head">
        <span className="drawer__title">Panier ({cart.count})</span>
        <button type="button" className="icon-btn" onClick={close} aria-label="Fermer le panier">
          <IconClose />
        </button>
      </div>

      {cart.items.length === 0 ? (
        <div className="drawer__body">
          <div className="cart__empty">
            <h3 style={{ fontSize: 15, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Votre panier est vide
            </h3>
            <p>Il reste de la place pour un manteau.</p>
            <Link to="/manteaux" className="btn btn--burgundy" onClick={close}>
              Découvrir les manteaux
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="freeship">
            {remaining > 0 ? (
              <>Plus que <strong>{formatPrice(remaining)}</strong> pour la livraison offerte</>
            ) : (
              <>Livraison offerte ♡</>
            )}
            <div className="freeship__bar"><div className="freeship__fill" style={{ width: `${progress}%` }} /></div>
          </div>

          <div className="drawer__body">
            {cart.items.map((line) => (
              <div className="citem" key={line.key}>
                <Link to={`/produit/${line.productId}`} onClick={close} className="citem__media">
                  <CoatImage product={line.product} className="ph" />
                </Link>
                <div>
                  <div className="citem__top">
                    <div>
                      <Link to={`/produit/${line.productId}`} onClick={close} className="citem__name">
                        {line.product.name}
                      </Link>
                      <p className="citem__opts">
                        {line.product.color} · Taille {line.size}
                      </p>
                    </div>
                    <span className="citem__price price">
                      {formatPrice(line.product.price * line.quantity)}
                    </span>
                  </div>
                  <div className="citem__bottom">
                    <div className="qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.key, line.quantity - 1)}
                        aria-label="Diminuer la quantité"
                      >
                        <IconMinus width="12" height="12" />
                      </button>
                      <span aria-live="polite">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.key, line.quantity + 1)}
                        disabled={line.quantity >= 10}
                        aria-label="Augmenter la quantité"
                      >
                        <IconPlus width="12" height="12" />
                      </button>
                    </div>
                    <button type="button" className="citem__remove" onClick={() => removeLine(line.key)}>
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {recos.length > 0 && (
              <div className="crecs">
                <p className="crecs__title">Tu pourrais aussi aimer…</p>
                <div className="crecs__row">
                  {recos.map((p) => (
                    <div key={p.id}>
                      <Link to={`/produit/${p.id}`} onClick={close} className="crec__media">
                        <CoatImage product={p} className="ph" />
                      </Link>
                      <p className="crec__name">{p.name}</p>
                      <p className="crec__price price">{formatPrice(p.price)}</p>
                      <button
                        type="button"
                        className="citem__remove"
                        style={{ marginTop: 6 }}
                        onClick={() => addToCart(p.id, p.sizes[Math.floor(p.sizes.length / 2)])}
                      >
                        Ajouter
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="drawer__foot">
            <div className="ctotal">
              <span>Sous-total</span>
              <strong className="price">{formatPrice(cart.subtotal)}</strong>
            </div>
            <p className="cnote">Frais de livraison calculés à l’étape suivante.</p>
            <button
              type="button"
              className="btn btn--burgundy btn--block btn--lg"
              onClick={() => {
                close();
                navigate('/commande');
              }}
            >
              Passer commande
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--block"
              style={{ marginTop: 10 }}
              onClick={close}
            >
              Continuer mes achats
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
