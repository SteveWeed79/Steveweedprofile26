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
          Designing and building digital products that are fast,
          focused, and built to last.
        </p>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">2026</span>
            <span className="hero__stat-label">Active</span>
          </div>
          <span className="hero__stat-sep" />
          <div className="hero__stat">
            <span className="hero__stat-num">3+</span>
            <span className="hero__stat-label">Projects</span>
          </div>
          <span className="hero__stat-sep" />
          <div className="hero__stat">
            <span className="hero__stat-num">Full-Stack</span>
            <span className="hero__stat-label">Scope</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
