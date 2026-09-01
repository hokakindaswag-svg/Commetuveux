export default function UgcSection() {
  return (
    <section className="section" aria-labelledby="ugc-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 className="section-head__title" id="ugc-title">Vu sur les girls ♡</h2>
            <p className="section-head__sub">
              Taguez <strong>@lecloset</strong> pour apparaître ici.
            </p>
          </div>
        </div>
        {/* Emplacements UGC : à remplacer par de vraies photos clientes. */}
        <div className="ugc__grid">
          {[0, 1, 2, 3].map((i) => (
            <div className="ugc__cell" key={i}>
              <p>Votre photo pourrait apparaître ici ♡</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
