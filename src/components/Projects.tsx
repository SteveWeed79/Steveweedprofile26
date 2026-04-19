const projects = [
  {
    name: 'KTXZ Enterprises',
    desc: 'Full-service enterprise solutions — strategy, development, and digital infrastructure.',
    url: 'https://ktxzenterprises.com',
    label: 'ktxzenterprises.com',
  },
  {
    name: 'Project Two',
    desc: 'Placeholder — description coming soon.',
    url: '#',
    label: 'Coming soon',
  },
  {
    name: 'Project Three',
    desc: 'Placeholder — description coming soon.',
    url: '#',
    label: 'Coming soon',
  },
];

export default function Projects() {
  return (
    <section className="section">
      <p className="section__label">Work</p>
      <div className="projects__grid">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            className="project-card"
            target={p.url !== '#' ? '_blank' : undefined}
            rel={p.url !== '#' ? 'noopener noreferrer' : undefined}
          >
            <span className="project-card__name">{p.name}</span>
            <span className="project-card__desc">{p.desc}</span>
            <span className="project-card__link">↗ {p.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
