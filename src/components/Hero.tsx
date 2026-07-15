const stats = [
  { num: '2026', label: 'Active' },
  { num: '3', label: 'Shipping' },
  { num: 'Full-Stack', label: 'Scope' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__body">
        <h1 className="hero__name">
          Steve<br />Weed
        </h1>
        <div className="hero__accent" />
        <p className="hero__title">
          Builder <span className="hero__slash">/</span> Developer
        </p>
        <p className="hero__tagline">
          I design and build digital products that are fast, focused, and
          built to last — and tooling that keeps them honest while they grow.
        </p>

        <div className="hero__stats">
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'contents' }}>
              {i > 0 && <span className="hero__stat-sep" />}
              <div className="hero__stat">
                <span className="hero__stat-num">{s.num}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
