import Badge from './Badge';

export default function Hero() {
  return (
    <section className="hero">
      <Badge hero variant="dark" href="https://github.com/steveweed79" />
      <h1 className="hero__name">Steve Weed</h1>
      <p className="hero__title">
        Builder <span>/</span> Developer
      </p>
      <p className="hero__tagline">
        Designing and building digital products that are fast, focused, and built to last.
      </p>
    </section>
  );
}
