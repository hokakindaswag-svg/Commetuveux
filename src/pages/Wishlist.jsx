import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PRODUCT_BY_ID } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';
import useSeo from '../lib/useSeo';

export default function Wishlist() {
  const { wishlist } = useStore();
  useSeo({ title: 'Ma wishlist — Le Closet', description: 'Retrouvez les manteaux que vous avez mis de côté.' });

  const products = wishlist.map((id) => PRODUCT_BY_ID[id]).filter(Boolean);

  return (
    <>
      <header className="collhead">
        <div className="wrap">
          <h1 className="collhead__title">Wishlist</h1>
          <p className="collhead__sub">Les manteaux que vous avez mis de côté.</p>
        </div>
      </header>

      <div className="wrap" style={{ paddingBottom: 60 }}>
        {products.length === 0 ? (
          <div className="empty">
            <h3>Votre wishlist est vide</h3>
            <p>Touchez le ♡ sur un manteau pour le retrouver ici.</p>
            <Link to="/manteaux" className="btn btn--burgundy btn--lg">Découvrir les manteaux</Link>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <Newsletter />
    </>
  );
}
