const links = [
  { label: 'GitHub',              url: 'https://github.com/steveweed79' },
  { label: 'ktxzenterprises.com', url: 'https://ktxzenterprises.com' },
];

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <p className="section__label">Contact</p>
      <h2 className="contact__headline">
        Let&apos;s build<br />something.
      </h2>
      <div className="contact__accent" />
      <div className="contact__links">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            className="contact-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
            <span className="contact-btn__arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
