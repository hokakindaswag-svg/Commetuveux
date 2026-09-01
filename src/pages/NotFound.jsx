import { Link } from 'react-router-dom';
import useSeo from '../lib/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page introuvable — Le Closet' });
  return (
    <div className="wrap page" style={{ textAlign: 'center' }}>
      <h1 className="page__title">Oups</h1>
      <p className="page__lead" style={{ margin: '0 auto 30px' }}>
        Cette page n’existe pas ou plus. Les manteaux, eux, sont toujours là.
      </p>
      <Link to="/manteaux" className="btn btn--burgundy btn--lg">Découvrir les manteaux</Link>
    </div>
  );
}
