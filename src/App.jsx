import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import InfoPage from './pages/InfoPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/manteaux', element: <Collection /> },
      { path: '/manteaux/:slug', element: <Collection /> },
      { path: '/nouveautes', element: <Collection scope="nouveautes" /> },
      { path: '/best-sellers', element: <Collection scope="best-sellers" /> },
      { path: '/promotions', element: <Collection scope="promotions" /> },
      { path: '/produit/:id', element: <Product /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/compte', element: <Account /> },
      { path: '/commande', element: <Checkout /> },
      { path: '/infos/:slug', element: <InfoPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
