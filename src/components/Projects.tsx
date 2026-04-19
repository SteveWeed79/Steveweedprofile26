const projects = [
  {
    num: '01',
    name: 'KTXZ Enterprises',
    desc: 'Full-service enterprise solutions — strategy, development, and digital infrastructure.',
    url: 'https://ktxzenterprises.com',
    domain: 'ktxzenterprises.com',
    status: 'Live' as const,
  },
  {
    num: '02',
    name: 'Project Two',
    desc: 'Coming soon — description and link will be added.',
    url: '#',
    domain: 'TBD',
    status: 'Soon' as const,
  },
  {
    num: '03',
    name: 'Project Three',
    desc: 'Coming soon — description and link will be added.',
    url: '#',
    domain: 'TBD',
    status: 'Soon' as const,
  },
];

export default function Projects() {
  return (
    <section className="section" id="work">
      <p className="section__label">Work</p>
      <div className="projects__list">
        {projects.map((p) => (
          <a
            key={p.num}
            href={p.url}
            className="project-item"
            target={p.url !== '#' ? '_blank' : undefined}
            rel={p.url !== '#' ? 'noopener noreferrer' : undefined}
          >
            <span className="project-item__num">{p.num}</span>
            <div className="project-item__body">
              <span className="project-item__name">{p.name}</span>
              <span className="project-item__desc">{p.desc}</span>
            </div>
            <div className="project-item__meta">
              <span className={`project-item__status project-item__status--${p.status.toLowerCase()}`}>
                {p.status}
              </span>
              <span className="project-item__domain">{p.domain}</span>
            </div>
            <span className="project-item__arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
