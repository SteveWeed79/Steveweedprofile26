const stack = [
  'Next.js',
  'TypeScript',
  'React',
  'Node.js',
  'CSS',
  'Git',
  'Vercel',
];

export default function Skills() {
  return (
    <section className="section">
      <p className="section__label">Stack</p>
      <div className="skills__chips">
        {stack.map((s) => (
          <span key={s} className="skill-chip">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
