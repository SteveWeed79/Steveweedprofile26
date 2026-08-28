const links = [
  { label: 'Email',    url: 'mailto:steve@swbuild.dev' },
  { label: 'GitHub',   url: 'https://github.com/steveweed79' },
  { label: 'KTXZ Shop', url: 'https://ktxzenterprises.com' },
];

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <p className="section__label">Contact</p>
      <h2 className="contact__headline">
        Let&apos;s build<br />something.
      </h2>
      <div className="contact__accent" />
      <p className="contact__sub">
        Have a product to ship, a store to run, or tooling to tame? I&apos;m
        open to focused, high-craft work. The fastest way to reach me is email.
      </p>
      <div className="contact__links">
        {links.map((l) => {
          const external = l.url.startsWith('http');
          return (
            <a
              key={l.label}
              href={l.url}
              className="contact-btn"
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {l.label}
              <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
