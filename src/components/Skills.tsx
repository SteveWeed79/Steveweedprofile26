const stack = [
  { category: 'Frontend',  items: ['React', 'Next.js', 'TypeScript', 'CSS'] },
  { category: 'Runtime',   items: ['Node.js'] },
  { category: 'Tooling',   items: ['Git', 'Vercel'] },
];

export default function Skills() {
  return (
    <section className="section" id="stack">
      <p className="section__label">Stack</p>
      <div className="skills__table">
        {stack.map((row) => (
          <div key={row.category} className="skills__row">
            <span className="skills__category">{row.category}</span>
            <div className="skills__items">
              {row.items.map((item) => (
                <span key={item} className="skill-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
