import { SIZE_GUIDE } from '../data/site';

export default function SizeTable() {
  return (
    <>
      <table className="sizetable">
        <caption className="sr-only">Guide des tailles Le Closet, mesures en centimètres</caption>
        <thead>
          <tr><th scope="col">Taille</th><th scope="col">FR</th><th scope="col">Poitrine</th><th scope="col">Taille (cm)</th></tr>
        </thead>
        <tbody>
          {SIZE_GUIDE.map((r) => (
            <tr key={r.size}>
              <th scope="row">{r.size}</th><td>{r.fr}</td><td>{r.bust} cm</td><td>{r.waist} cm</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 12, fontSize: 12.5 }}>
        Entre deux tailles ? Nos manteaux se portent volontiers ample : prenez votre taille habituelle,
        ou la taille au-dessus pour un tombé plus oversize.
      </p>
    </>
  );
}
