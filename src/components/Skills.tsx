const stack = [
  { category: 'Frontend',   items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'CSS'] },
  { category: 'Backend',    items: ['Node.js', 'MongoDB', 'Mongoose', 'Zod', 'REST'] },
  { category: 'Systems',    items: ['Python', 'asyncio', 'PySide6', 'SQLite', 'systemd / Win services'] },
  { category: 'Payments',   items: ['Stripe', 'Webhooks', 'Idempotency'] },
  { category: 'Infra',      items: ['Vercel', 'AWS S3 / CloudFront', 'Upstash Redis', 'Cron'] },
  { category: 'Quality',    items: ['Vitest', 'Stryker', 'GitHub Actions', 'Sentry', 'OpenTelemetry'] },
  { category: 'AI / Tools', items: ['Claude API', 'Playwright', 'Git'] },
];

export default function Skills() {
  return (
    <section className="section" id="stack">
      <p className="section__label">Stack</p>
      <div className="skills__table">
        {stack.map((row) => (
          <div key={row.category} className="skills__row" data-reveal>
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
