const facts = [
  { label: 'Focus', value: 'Full-stack product & developer tooling' },
  { label: 'Core stack', value: 'Next.js · TypeScript · Node · MongoDB' },
  { label: 'Currently', value: 'Building Foresight; running KTXZ Shop' },
  { label: 'Based', value: 'United States' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <p className="section__label">About</p>
      <div className="about__grid" data-reveal>
        <div>
          <p className="about__lead">
            I build the whole thing — <em>storefront to server to the tooling
            that keeps it honest.</em>
          </p>
          <div className="about__body">
            <p>
              I&apos;m a builder and full-stack developer. Most of my work lives
              where design, product, and infrastructure meet: shipping real
              software that has to take payments, survive load, and stay
              maintainable long after launch day.
            </p>
            <p>
              I run <strong>KTXZ Shop</strong>, a multi-game trading-card
              marketplace with a full customer storefront and an admin
              operations platform behind it — Stripe checkout, inventory
              reservation, multi-provider pricing, and a test suite in the
              thousands. And I&apos;m building <strong>Foresight</strong>, an
              engine that forces domain foresight before you build a feature,
              then verifies what actually got built against it.
            </p>
            <p>
              The throughline: sweat the non-obvious requirements early, prove
              the work with something measurable, and never ship a claim I
              can&apos;t back up.
            </p>
          </div>
        </div>
        <aside className="about__aside">
          {facts.map((f) => (
            <div key={f.label} className="about__fact">
              <span className="about__fact-label">{f.label}</span>
              <span className="about__fact-value">{f.value}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
