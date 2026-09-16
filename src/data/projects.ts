/**
 * Single source of truth for every project on the site.
 *
 * The home page renders `featuredProjects`, /work renders `allProjects`,
 * the sitemap is generated from `caseStudyRoutes`, and each case study's
 * "Next:" link comes from `nextProject()` — so adding, reordering, or
 * retiring a project is a change in this file only.
 */

export type ProjectStatus = 'Live' | 'Building' | 'Shipped' | 'Archived';

export interface Project {
  /** Stable key. Matches the case-study route when `href` is set. */
  slug: string;
  name: string;
  /** Long form — the home page list and the top of /work. */
  desc: string;
  /** One line — the compact rows further down /work. */
  summary: string;
  /** Internal case-study route, or null when there's no case study (yet). */
  href: string | null;
  /** Shown when there's no case study to link to. */
  external?: { label: string; url: string };
  /** Right-hand meta line: domain, platform, or version. */
  domain: string;
  status: ProjectStatus;
  tags: string[];
  /** Featured projects appear on the home page. The rest live on /work. */
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'ktxz',
    name: 'KTXZ Shop',
    desc: 'A multi-game trading-card marketplace — customer storefront (search, cart, Stripe checkout, returns) plus a full admin operations platform for catalog, pricing, inventory, and fulfillment.',
    summary: 'Multi-game trading-card marketplace: storefront, Stripe checkout, and an admin operations platform.',
    href: '/ktxz',
    domain: 'ktxzenterprises.com',
    status: 'Live',
    tags: ['Next.js 16', 'TypeScript', 'MongoDB', 'Stripe', '2,800+ tests'],
    featured: true,
  },
  {
    slug: 'evenglow',
    name: 'Evenglow',
    desc: 'Offline-first farm operations — stock, growing, and machinery in one Android app that works with the radio off. A mutation log on device, a three-write commit protocol on a server with no transactions, and a sync engine that would rather stop than skip.',
    summary: 'Offline-first Android farm operations, with a sync engine that would rather stop than skip.',
    href: '/evenglow',
    domain: 'Android · offline-first · v0.6.0',
    status: 'Building',
    tags: ['React Native', 'Expo SDK 57', 'SQLite', 'Fastify', '3,200+ tests'],
    featured: true,
  },
  {
    slug: 'forespec',
    name: 'Forespec',
    desc: 'A standalone, tool-agnostic engine that forces domain foresight before you build a feature, then verifies what actually got built against it — so the expensive discoveries surface in week one, not month three. Inside Claude Code it runs as a plugin, grading on the subscription you already pay for.',
    summary: 'An engine that forces domain foresight before you build, then verifies what got built against it.',
    href: '/forespec',
    domain: 'npm · Claude Code plugin',
    status: 'Live',
    tags: ['Node', 'Claude Code plugin', 'Reasoning verifier', 'No API key', 'v0.2.0'],
    featured: true,
  },
  {
    slug: 'palctl',
    name: 'palctl',
    desc: 'REST-native control for a Palworld dedicated server: a memory-leak watchdog that restarts on real memory pressure instead of a timer, leak forecasting, and a daemon / GUI / CLI / web / Discord surface set over one shared core — on Windows and headless Linux.',
    summary: 'REST-native Palworld server control: a leak-forecasting watchdog behind five surfaces over one core.',
    href: '/palctl',
    domain: 'Windows · Linux · v1.2.8.3',
    status: 'Live',
    tags: ['Python', 'PySide6', 'asyncio', 'Systems', 'v1.2.8.3'],
    featured: false,
  },
  {
    slug: 'anima',
    name: 'Anima',
    desc: 'Elemental gear infusion for a game whose player weapons have no elemental system — 0 of 2,466 items carried one. Built against a closed UE5 binary with no source and no documentation, behind a CI gate that fails the build on any internal name not traceable to a datamine of my own.',
    summary: 'Elemental weapons in a game that has none — reverse-engineered, with a build gate against guessed names.',
    href: '/anima',
    domain: 'Palworld 1.0.1 · UE4SS',
    status: 'Building',
    tags: ['Lua', 'Reverse engineering', 'UE4SS', 'Python', '158 off-game checks'],
    featured: false,
  },
];

/** Home page — the editorial short list. */
export const featuredProjects = projects.filter((p) => p.featured);

/** /work — everything, featured first. */
export const allProjects = projects;

/** A project that has a written-up case study page. */
export type CaseStudy = Project & { href: string };

/** Projects with a case study, in site order. */
export const caseStudies = projects.filter((p): p is CaseStudy => p.href !== null);

/** Projects without a case study — listed on /work under "Also built". */
export const unwrittenProjects = projects.filter((p) => p.href === null);

/** Case-study routes, for the sitemap. */
export const caseStudyRoutes = caseStudies.map((p) => p.href);

/**
 * The next case study in the ring, for the bottom-of-page CTA.
 * Walks only projects that have a case study, so a project without one
 * never becomes a dead end.
 */
export function nextProject(slug: string): CaseStudy {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

/** Zero-padded list index: 0 → "01". */
export function projectNum(index: number): string {
  return String(index + 1).padStart(2, '0');
}
