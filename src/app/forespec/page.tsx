import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';

export const metadata: Metadata = {
  title: 'Forespec — foresight before you build, verified after',
  description:
    'Forespec is a standalone, tool-agnostic engine that forces domain foresight before you build a feature, then verifies what actually got built against it. Case study: architecture, the reasoning verifier, the validation bar, and the build order.',
  alternates: { canonical: '/forespec' },
  openGraph: {
    title: 'Forespec — a verification engine for the build loop',
    description:
      'Forces domain foresight before a feature, then verifies what got built against it — validated to 0 false-greens on 52 critical bad cases.',
    url: '/forespec',
    type: 'article',
  },
};

const meta = [
  { label: 'Status', value: 'Early build · v0.1.0', accent: true },
  { label: 'Role', value: 'Solo — design + engineering' },
  { label: 'Engine', value: 'Node · ESM · adapter-based' },
  { label: 'Surface', value: 'CLI · verifier · PR gate' },
  { label: 'License', value: 'BUSL-1.1 · source-available' },
];

const components = [
  {
    k: '01',
    title: 'Interrogator',
    body: 'Refuses to just plan a feature. First interrogates what it touches, the non-obvious requirements, and the ordering that prevents rework — the forced foresight pass that can never be skipped.',
  },
  {
    k: '02',
    title: 'Plan Engine',
    body: 'Turns the interrogation into a sequenced plan with the dangerous, foundational pieces first — atomic hold before Stripe wiring, data-model shape before features built on it.',
  },
  {
    k: '03',
    title: 'Checkpoints',
    body: 'The unit of work is a feature with checkable completion criteria. Each gotcha becomes a concrete, verifiable checkpoint with a stable, namespaced id that is a permanent contract.',
  },
  {
    k: '04',
    title: 'Verifier',
    body: 'Reads the real repo and reconciles it against the checkpoints. A reasoning layer catches the fuzzy things; a deterministic assertion layer backstops what is mechanically checkable.',
  },
  {
    k: '05',
    title: 'Pattern Library',
    body: 'Every gotcha is saved as a transferable pattern, walled off from the never-leaves-the-project instance data. The pattern compounds across features and projects; the instance never travels.',
  },
];

const stats = [
  { num: '0', label: 'False-greens across 52 critical bad cases' },
  { num: '≤2.9%', label: 'Rule-of-three 95% upper bound on the miss rate' },
  { num: '5', label: 'Archetypes composed from one shared library' },
  { num: '11', label: 'Checkpoint domains in the shared library, authored once' },
];

const archetypes = [
  {
    name: 'ecommerce',
    desc: '20 backbone + 7 design checkpoints — the domain the whole engine was validated against first.',
    badge: 'the standard',
  },
  {
    name: 'saas',
    desc: '26 checkpoints, all but 3 reused from the library — only tenancy isolation, entitlement integrity, and subscription lifecycle are SaaS-specific.',
    badge: '3 new · 23 reused',
  },
  {
    name: 'ai-app',
    desc: '12 checkpoints, 5 AI-specific — prompt injection, output handling, tool-use safety, cost controls, and the data boundary — plus 7 reused from the library.',
    badge: '5 new · 7 reused',
  },
  {
    name: 'baas',
    desc: '10 checkpoints for Supabase / Firebase backends, 3 BaaS-specific — RLS enforced, the client trust boundary, and privileged-key exposure — plus 7 reused.',
    badge: '3 new · 7 reused',
  },
  {
    name: 'portfolio',
    desc: '14 checkpoints, 100% composed from the shared library — design, web, and the universal security/privacy set, with zero new authoring.',
    badge: '100% reuse',
  },
];

const principles = [
  {
    t: 'Pattern / instance wall',
    d: 'Transferable patterns and never-leaves-the-project instance data live in physically separate stores from the first write — the legal and ethical line, not a later refactor.',
  },
  {
    t: 'Honesty mechanic',
    d: 'Every score reports its level, the gap to the next, and its basis. A score that can’t state its basis doesn’t ship. Trust the gap, not the number.',
  },
  {
    t: 'Stable, namespaced ids',
    d: 'Checkpoint ids like payment.webhook_authenticity are permanent contracts. Archetypes are versioned; checkpoints are never silently renamed — that’s how calibration history survives.',
  },
  {
    t: 'Library + manifest composition',
    d: 'Checkpoints are defined once and composed per archetype as a manifest of { ref, severity }. Fix a shared checkpoint and every archetype improves at once.',
  },
];

const phases = [
  { n: '0', t: 'Walking skeleton — the pipeline end-to-end on one real checkpoint', s: 'Shipped' },
  { n: '1', t: 'Full backbone verifier + deterministic assertion layer', s: 'Shipped' },
  { n: '2', t: 'Calibration store + passive learning (the spine)', s: 'Shipped' },
  { n: '3', t: 'Design dimension — computed, defensible signals only', s: 'Shipped' },
  { n: '4', t: 'The foresight ritual — plan-side, not just verify-side', s: 'Shipped' },
  { n: '5', t: 'Proficiency layer — person-aware explanation depth', s: 'Shipped' },
  { n: '6', t: 'Deferred model-scored design experiments — earned against real data or cut', s: 'Planned' },
  { n: '7', t: 'Reach beyond one machine — multi-user, wall intact', s: 'Planned' },
];

export default function ForespecPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/#work" className="fs-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Case Study · Developer Tooling</p>
          <h1 className="fs-title">Forespec</h1>
          <p className="fs-lede">
            A standalone, tool-agnostic engine that forces domain{' '}
            <strong>foresight before</strong> you build a feature, then{' '}
            <strong>verifies</strong> what actually got built against that
            foresight — so the expensive discoveries surface in week one, not
            month three.
          </p>

          <div className="fs-metabar">
            {meta.map((m) => (
              <div key={m.label} className="fs-meta">
                <span className="fs-meta__label">{m.label}</span>
                <span className={`fs-meta__value${m.accent ? ' is-accent' : ''}`}>{m.value}</span>
              </div>
            ))}
          </div>

          <div className="fs-actions">
            <a className="contact-btn" href="https://github.com/SteveWeed79/forespec" target="_blank" rel="noopener noreferrer">
              View source <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-btn" href="#architecture">
              Jump to architecture <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">The problem</p>
          <h2 className="fs-h2">The failure isn&apos;t bad code. It&apos;s foresight arriving too late.</h2>
          <p className="fs-p">
            AI coding tools answer the literal ask. Nothing in the moment forces a
            stop to interrogate the non-obvious requirements of a feature. Depth is
            available but not automatic — and under time pressure it biases even
            harder toward &ldquo;just answer it.&rdquo;
          </p>
          <div className="fs-callout">
            <p>
              You ask for a checkout. You don&apos;t know to ask for an{' '}
              <strong>atomic stock hold</strong>, so it isn&apos;t added. Months
              later, after Stripe is wired and taking real money, the race
              condition bites.
            </p>
            <p>
              Now you&apos;re doing surgery on a live payment flow to retrofit
              something that would have been <strong>trivial to design in on day
              one</strong>. Forespec&apos;s job isn&apos;t more horsepower — it&apos;s
              making that interrogation forced, structured, and live.
            </p>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">The loop it keeps live</p>
          <h2 className="fs-h2">Point → build → verify → remember — and the foresight stays alive the whole way.</h2>
          <div className="fs-loop">
            {[
              { n: '01', name: 'Point', desc: 'Interrogate the domain and emit a gotcha-aware spec — the decide-first questions + acceptance criteria, most-foundational pieces first.' },
              { n: '02', name: 'Build', desc: 'You — or your AI coder — build against that spec, dangerous and foundational pieces first.' },
              { n: '03', name: 'Verify', desc: 'Grade what actually got built, flag what’s unsafe, and name the required backbone you haven’t reached yet.' },
              { n: '04', name: 'Remember', desc: 'Every run writes to a local calibration store behind the pattern/instance wall — so the next run shows what moved and catches a regression before it compounds.' },
            ].map((s) => (
              <div key={s.n} className="fs-loop__step">
                <span className="fs-loop__n">{s.n}</span>
                <span className="fs-loop__name">{s.name}</span>
                <span className="fs-loop__desc">{s.desc}</span>
              </div>
            ))}
          </div>
          <p className="fs-p">
            A prompt <strong>forgets</strong> and walks away after planning. The
            library <strong>compounds</strong> and the verifier keeps foresight{' '}
            <strong>live</strong> — that&apos;s the difference between a wrapper and
            an engine.
          </p>
        </section>

        <section className="fs-section" id="architecture" data-reveal>
          <p className="fs-section__label">Architecture</p>
          <h2 className="fs-h2">Five components, one spine.</h2>
          <div className="fs-grid">
            {components.map((c) => (
              <div key={c.k} className="fs-card">
                <span className="fs-card__k">{c.k}</span>
                <span className="fs-card__title">{c.title}</span>
                <p className="fs-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Does the verifier tell the truth?</p>
          <h2 className="fs-h2">The whole tool rests on one number: how often the grader lets a bad thing through.</h2>
          <div className="fs-stats">
            {stats.map((s) => (
              <div key={s.label} className="fs-stat">
                <span className="fs-stat__num">{s.num}</span>
                <span className="fs-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="fs-p" style={{ marginTop: '22px' }}>
            A labeled good/bad fixture corpus measures the reasoning verifier&apos;s
            precision, recall, and — the one that matters — its{' '}
            <strong>false-green rate</strong>. Real grading runs against a
            validated bar with an <code>ANTHROPIC_API_KEY</code>; without one it
            falls back to a deterministic keyword baseline that is honest about
            <em> not</em> being a grader to trust. &ldquo;Is the verifier
            trustworthy?&rdquo; becomes a number, not a hope.
          </p>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">A composable standard</p>
          <h2 className="fs-h2">One shared checkpoint library. Every archetype composes it.</h2>
          {archetypes.map((a) => (
            <div key={a.name} className="fs-arch-row">
              <span className="fs-arch-row__name">{a.name}</span>
              <span className="fs-arch-row__desc">{a.desc}</span>
              <span className="fs-arch-row__badge">{a.badge}</span>
            </div>
          ))}
          <p className="fs-p" style={{ marginTop: '26px' }}>
            Checkpoints are authored <strong>once</strong> in the library and
            composed per archetype. A fix to a shared checkpoint lifts every
            archetype at once, and each new archetype reuses instead of copies. The
            portfolio archetype is the proof: a whole standard with nothing new to
            author.
          </p>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Principles — true from commit #1</p>
          <div className="fs-principles">
            {principles.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Build order — verifier first, shell last</p>
          <h2 className="fs-h2">Each phase ships real and stands alone. The pearl gets proven before the shell gets built.</h2>
          <div className="fs-phases">
            {phases.map((p) => {
              const mod = p.s === 'Shipped' ? ' fs-phase--now' : '';
              return (
                <div key={p.n} className={`fs-phase${mod}`}>
                  <span className="fs-phase__n">P{p.n}</span>
                  <span className="fs-phase__t">{p.t}</span>
                  <span className="fs-phase__s">{p.s}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="fs-cta">
          <h2 className="fs-cta__title">Build the architecture big.<br />Ship the v1 small.</h2>
          <div className="fs-cta__links">
            <a className="contact-btn" href="https://github.com/SteveWeed79/forespec" target="_blank" rel="noopener noreferrer">
              View source <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <Link className="contact-btn" href="/ktxz">
              Next: KTXZ Shop <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
