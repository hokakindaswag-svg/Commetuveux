import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/format';
import CoatImage from '../components/CoatImage';
import useSeo from '../lib/useSeo';

export default function Checkout() {
  const { cart } = useStore();
  useSeo({ title: 'Commande — Le Closet' });

  return (
    <div className="wrap wrap--narrow page">
      <h1 className="page__title">Commande</h1>

      {cart.items.length === 0 ? (
        <>
          <p className="page__lead">Votre panier est vide.</p>
          <Link to="/manteaux" className="btn btn--burgundy btn--lg">Découvrir les manteaux</Link>
        </>
      ) : (
        <>
          <p className="page__lead">Récapitulatif de votre panier avant paiement.</p>

          <div className="checkout__list">
            {cart.items.map((line) => (
              <div className="citem" key={line.key} style={{ paddingInline: 0 }}>
                <div className="citem__media">
                  <CoatImage product={line.product} className="ph" />
                </div>
                <div>
                  <div className="citem__top">
                    <div>
                      <p className="citem__name">{line.product.name}</p>
                      <p className="citem__opts">
                        {line.product.color} · Taille {line.size} · Quantité {line.quantity}
                      </p>
                    </div>
                    <span className="citem__price price">{formatPrice(line.product.price * line.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '22px 0', borderTop: '1px solid var(--line)' }}>
            <div className="ctotal">
              <span>Sous-total</span>
              <strong className="price">{formatPrice(cart.subtotal)}</strong>
            </div>
            <p className="cnote">Frais de livraison calculés lors du paiement.</p>
            <button type="button" className="btn btn--burgundy btn--block btn--lg" disabled>
              Paiement — bientôt disponible
            </button>
            <p style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 14 }}>
              Le module de paiement sera branché à l’ouverture de la boutique. Aucune commande n’est
              enregistrée pour l’instant.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
