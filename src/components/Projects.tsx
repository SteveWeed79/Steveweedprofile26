import Link from 'next/link';

interface Project {
  num: string;
  name: string;
  desc: string;
  href: string;      // internal case-study route
  domain: string;
  status: 'Live' | 'Building';
  tags: string[];
}

const projects: Project[] = [
  {
    num: '01',
    name: 'KTXZ Shop',
    desc: 'A multi-game trading-card marketplace — customer storefront (search, cart, Stripe checkout, returns) plus a full admin operations platform for catalog, pricing, inventory, and fulfillment.',
    href: '/ktxz',
    domain: 'ktxzenterprises.com',
    status: 'Live',
    tags: ['Next.js 16', 'TypeScript', 'MongoDB', 'Stripe', '2,350+ tests'],
  },
  {
    num: '02',
    name: 'Forespec',
    desc: 'A standalone, tool-agnostic engine that forces domain foresight before you build a feature, then verifies what actually got built against it — so the expensive discoveries surface in week one, not month three.',
    href: '/forespec',
    domain: 'engine · CLI · PR gate',
    status: 'Building',
    tags: ['Node', 'Reasoning verifier', 'Claude API', 'Dev tooling'],
  },
  {
    num: '03',
    name: 'palctl',
    desc: 'REST-native control for a Palworld dedicated server: a memory-leak watchdog that restarts on real memory pressure instead of a timer, leak forecasting, and a daemon / GUI / CLI / web / Discord surface set over one shared core — on Windows and headless Linux.',
    href: '/palctl',
    domain: 'Windows · Linux · v1.0.0',
    status: 'Live',
    tags: ['Python', 'PySide6', 'asyncio', 'Systems', 'v1.0.0'],
  },
  {
    num: '04',
    name: 'Evenglow',
    desc: 'Offline-first farm operations — stock, growing, and machinery in one Android app that works with the radio off. A mutation log on device, a three-write commit protocol on a server with no transactions, and a sync engine that would rather stop than skip.',
    href: '/evenglow',
    domain: 'Android · offline-first · v0.3.2',
    status: 'Building',
    tags: ['React Native', 'Expo SDK 57', 'SQLite', 'Fastify', '2,858 tests'],
  },
];

export default function Projects() {
  return (
    <section className="section" id="work">
      <p className="section__label">Work</p>
      <div className="projects__list">
        {projects.map((p) => (
          <Link key={p.num} href={p.href} className="project-item project-item--link" data-reveal>
            <span className="project-item__num">{p.num}</span>
            <div className="project-item__body">
              <span className="project-item__name">{p.name}</span>
              <span className="project-item__desc">{p.desc}</span>
              <div className="project-item__tags">
                {p.tags.map((t) => (
                  <span key={t} className="project-item__tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-item__meta">
              <span className={`project-item__status project-item__status--${p.status.toLowerCase()}`}>
                {p.status}
              </span>
              <span className="project-item__domain">{p.domain}</span>
            </div>
            <span className="project-item__arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
