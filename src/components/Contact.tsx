const links = [
  { label: 'GitHub', url: 'https://github.com/steveweed79' },
  { label: 'ktxzenterprises.com', url: 'https://ktxzenterprises.com' },
];

export default function Contact() {
  return (
    <section className="section">
      <p className="section__label">Contact</p>
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
          </a>
        ))}
      </div>
    </section>
  );
}
