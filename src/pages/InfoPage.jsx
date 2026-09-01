import { useParams } from 'react-router-dom';
import { INFO_PAGES } from '../data/pages';
import SizeTable from '../components/SizeTable';
import Newsletter from '../components/Newsletter';
import NotFound from './NotFound';
import useSeo from '../lib/useSeo';

export default function InfoPage() {
  const { slug } = useParams();
  const page = INFO_PAGES[slug];

  useSeo(
    page
      ? { title: `${page.title} — Le Closet`, description: page.lead }
      : { title: 'Page introuvable — Le Closet' }
  );

  if (!page) return <NotFound />;

  return (
    <>
      <div className="wrap wrap--narrow page">
        <h1 className="page__title">{page.title}</h1>
        <p className="page__lead">{page.lead}</p>

        {page.placeholder && (
          <p className="notice">
            Contenu à finaliser avant l’ouverture de la boutique : les mentions entre crochets
            doivent être complétées avec vos informations réelles.
          </p>
        )}

        <div className="page__body">
          {page.sizeTable && <SizeTable />}
          {page.blocks.map((b) => (
            <section key={b.h}>
              <h2>{b.h}</h2>
              {b.p.map((text) => <p key={text}>{text}</p>)}
            </section>
          ))}
        </div>
      </div>
      <Newsletter />
    </>
  );
}
