import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';
import CaseSummary from '@/components/CaseSummary';
import CaseToc from '@/components/CaseToc';
import { nextProject } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Anima — elemental gear in a game that has none',
  description:
    'Palworld’s player weapons have no elemental system — 0 of 2,466 items carry one. Anima adds it to a closed UE5 binary, with a CI gate that fails the build on any internal name not traceable to a datamine of my own. A case study in working where no documentation exists and not guessing anyway.',
  alternates: { canonical: '/anima' },
  openGraph: {
    title: 'Anima — reverse engineering without guessing',
    description:
      'Adding a feature to a closed binary that had no source, no docs, and no prior art — and a CI gate that makes a guessed name unmergeable.',
    url: '/anima',
    type: 'article',
  },
};

const meta = [
  { label: 'Status', value: 'Core confirmed in-game', accent: true },
  { label: 'Role', value: 'Solo — reverse engineering + build' },
  { label: 'Target', value: 'Palworld 1.0.1 · build 1.100.619' },
  { label: 'Runtime', value: 'Lua 5.4 · UE4SS · PalSchema' },
  { label: 'Verification', value: '158 off-game checks · 10 CI gates' },
  { label: 'License', value: 'Apache-2.0' },
];

const findings = [
  {
    k: 'Storage',
    title: 'Let the game do the saving',
    body: 'The infusion payload rides a field the weapon already owns and the game already saves. No sidecar file, no custom save format, no migration story — and confirmed to survive save → quit → relaunch → reload, on that weapon instance only. The cheapest storage layer is the one someone else already maintains.',
  },
  {
    k: 'Element',
    title: 'Hand the engine a real element',
    body: 'Rather than reimplementing damage, a pre-hook sets the element on the struct the game feeds its own damage calculation — before it runs. So the game applies its own affinity rules: a fire-weak target takes more, a fire target resists. Nothing to keep in sync when the game rebalances, because none of it was copied.',
  },
  {
    k: 'Detour',
    title: 'The first road didn’t exist',
    body: 'Melee damage is built in native code — none of the reflected functions fire for a swing. That was established by testing eight of them and logging that all eight stayed silent, not by reading a doc that doesn’t exist. With no struct to modify, melee instead calls the game’s own damage entry with the same struct, so the game types the hit rather than the mod faking it with extra HP loss.',
  },
  {
    k: 'Blast radius',
    title: 'Off by default, always',
    body: 'Both hooks fire for every attack in the world, so each one asks first: is this the player’s equipped weapon, and is it infused? No token, and the hook returns instantly with vanilla behaviour untouched. A mod that can’t be switched off is a mod that breaks somebody’s game.',
  },
];

const hardParts = [
  {
    t: 'State, not events — so it can’t miss',
    d: 'The trigger for earning an infusion is butchering a pal you own. That fires no hookable event on this build: five separate death paths and the record-setter were each tested and each stayed silent. Rather than picking the least-wrong event, the mod reads the game’s own lifetime counter every 2.5 seconds and grants on any increase. An event hook can miss. A counter you re-read cannot.',
  },
  {
    t: 'Assume your own scheduler dies',
    d: 'That poll rides a delayed-call chain, and that dispatcher was observed dying mid-session. So the combat and movement hooks double as a heartbeat: if the chain goes quiet, they poll inline and restart it. The failure was watched happening and designed around, which is the difference between a system that degrades and one that stops silently while looking fine.',
  },
  {
    t: 'I deleted two finished features',
    d: 'An extraction building and a forge screen were both built and both removed on 2026-08-09, because a custom station is a worse picker than the inventory the player already has open. Working code is not the same as the right answer, and the cost of keeping the wrong one compounds. The decision is in the repo with its date and its reasoning.',
  },
  {
    t: 'Installers shouldn’t guess either',
    d: 'The installer locates the game by walking Steam’s own library list rather than assuming a path — and refuses to guess: zero matches and several matches are both errors that name what was found and ask you to choose. It also cross-checks the game’s log to catch the case where files land in a folder the game never reads, which would make the next test measure an unchanged game.',
  },
  {
    t: 'Make the patch a one-file fix',
    d: 'The core logic knows nothing about the game it’s modding and is tested in plain Lua with the game absent. Every game-specific name lives behind a single seam file. When the next patch moves something — and it will — the repair is one file, not a hunt through the codebase. That is the difference between a project that survives its dependency and one that dies at the next update.',
  },
];

const stats = [
  { num: '0 / 2,466', label: 'Items in the game carrying an element before this — the feature was proven absent, not assumed missing' },
  { num: '158', label: 'Checks that run with the game not installed, across the core and every subsystem' },
  { num: '10', label: 'CI gates, including the one that fails the build on a name I can’t prove' },
  { num: '13,991', label: 'Lines of throwaway diagnostics written to map the engine — larger than the mod they produced' },
];

const layers = [
  { name: 'Core', desc: 'Game-agnostic logic — payload model, token codec, effects, the damage and mitigation maths. Knows nothing about Palworld and is unit-tested without it installed.', badge: 'Lua 5.4' },
  { name: 'Seam', desc: 'One file holding every game-internal name the mod touches, each traceable to a datamine. The only place a game patch can hurt.', badge: 'bindings.lua' },
  { name: 'Runtime', desc: 'The shipping mod, one subsystem per file: the two combat hooks, the apply surface, the tooltip line, the economy poll, and the removal primitive.', badge: 'UE4SS' },
  { name: 'Data', desc: 'Items, icons and display markers declared as data and regenerated by script from one source of truth, so the catalogue can’t drift from the code.', badge: 'PalSchema · JSONC' },
  { name: 'Tooling', desc: 'Eleven generators and ten static checkers, plus an installer that detects the game, verifies where it landed, and supports a dry run and a clean uninstall.', badge: 'Python · PowerShell' },
  { name: 'CI', desc: 'Every push runs the off-game suites and all ten gates — grounding, binding resolution, hook safety, global leaks, key-chord collisions, function arity.', badge: 'GitHub Actions' },
];

const limits = [
  {
    t: 'Dedicated-server co-op is untested',
    d: 'Confirmed in single-player and as a solo host. The apply flow runs per-client and should behave in co-op, but should is not a claim — nobody has run it on a dedicated server, so that is what the page says.',
  },
  {
    t: 'Uninstall is wired, not confirmed',
    d: 'The removal path is built and passes the off-game harness — snapshot, clear, rebuild, read back — but has not had its in-game confirmation pass. It sits in the lower bucket until someone watches it work, like everything else did before it moved up.',
  },
  {
    t: 'The version pins are exact, and that’s the point',
    d: 'A specific game build, a specific loader commit, a specific schema release. Modding a closed binary is brittle by nature; pretending otherwise just moves the breakage to the player. The pins are published, and the one rolling tag in the chain is flagged as the first suspect after any breakage.',
  },
  {
    t: 'The source is private',
    d: 'This one is a closed repo, so the evidence on this page is the argument rather than a link to browse. The relationship to the game’s publisher is stated plainly in the repository’s notice: an unofficial, independent work that ships no game assets.',
  },
];

const next = nextProject('anima');

const summary = [
  { k: 'Problem', v: <>The target is a closed, shipping game binary with no source, no documentation and no prior art — and the feature being added <strong>did not exist anywhere in it to copy</strong>: 0 of 2,466 items carried an element.</> },
  { k: 'Solution', v: <>Reverse-engineer the damage pipeline one confirmed hook at a time, and enforce <strong>“no source, no code”</strong> with a CI gate that fails the build on any internal name not traceable to a datamine of my own build.</> },
  { k: 'Proof', v: <>158 checks that run with the game not installed, behind 10 CI gates — and every shipped capability confirmed in the live game before it counted.</> },
  { k: 'Unlocks', v: <>A feature the engine was never built to have, added <strong>without one guessed name shipping</strong>.</> },
];

const toc = [
  { id: 'the-actual-job', label: 'The actual job' },
  { id: 'method', label: 'The method' },
  { id: 'what-that-bought', label: 'What that bought' },
  { id: 'the-hard-parts', label: 'The hard parts' },
  { id: 'by-the-numbers', label: 'By the numbers' },
  { id: 'status', label: 'Status you can check' },
  { id: 'under-the-hood', label: 'Under the hood' },
  { id: 'what-it-won-t', label: 'What it won’t do' },
];

export default function AnimaPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/work" className="fs-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Case Study · Reverse Engineering</p>
          <h1 className="fs-title">Anima</h1>
          <p className="fs-lede">
            Palworld&apos;s player weapons have <strong>no elemental
            system</strong> — not undocumented, absent: <strong>0 of 2,466
            items</strong> carry one. Anima adds it to a closed, shipping game
            binary with no source and no documentation — and a build gate that{' '}
            <strong>refuses to compile a name I can&apos;t prove</strong>. The
            game is the venue. The method is the point.
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
            <a className="contact-btn" href="#method">
              The method <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
            <a className="contact-btn" href="#status">
              What I won&apos;t claim <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
            <Link className="contact-btn" href="/#contact">
              Hire me for one of these <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <CaseSummary rows={summary} />

        <CaseToc items={toc} />

        <section className="fs-section" id="the-actual-job" data-reveal>
          <h2 className="fs-section__label">The actual job</h2>
          <h3 className="fs-h2">There was no tutorial for this, because nobody had done it.</h3>
          <p className="fs-p">
            Most work has a path someone already walked. This had none. The
            target is a <strong>closed binary</strong> with no source, no
            documentation, no support channel and no prior art — and the
            feature being added didn&apos;t exist anywhere in the game to copy
            from. The first real finding was that absence itself, established
            by measuring all <strong>2,466</strong> items and finding not one
            carrying an element.
          </p>
          <p className="fs-p">
            That is the shape of the problems worth hiring someone for: the
            undocumented vendor API, the integration whose spec was lost, the
            legacy system whose author left. The question a client should ask
            isn&apos;t whether I&apos;ve seen their exact stack before.
            It&apos;s what I do when the answer <em>isn&apos;t anywhere</em> —
            and whether I&apos;ll tell them the difference between what I
            proved and what I assumed.
          </p>
        </section>

        <section className="fs-section" id="method" data-reveal>
          <h2 className="fs-section__label">The method</h2>
          <h3 className="fs-h2">No source, no code — enforced by the build, not by willpower.</h3>
          <p className="fs-p">
            Work like this fails in one specific way: the codebase fills up
            with names that <em>look</em> right. A plausible guess runs, does
            something, and gets committed — and six weeks later nobody can tell
            which parts were verified and which were hopeful. The result looks
            finished and is built on sand.
          </p>
          <div className="fs-callout">
            <p>
              So the rule is mechanical: <strong>every game-internal name in
              the codebase must trace to a datamine of my own build</strong>,
              with the specific names the code relies on committed as curated
              evidence. A checker runs in CI and <strong>fails the build</strong>{' '}
              on any internal-looking name that isn&apos;t in that evidence.
            </p>
            <p>
              A guess cannot be merged quietly. Not &ldquo;shouldn&apos;t
              be&rdquo; — <strong>cannot be</strong>, because the build rejects
              it. Discipline that depends on remembering to be disciplined is
              not discipline; it&apos;s a good intention with a deadline
              attached.
            </p>
          </div>
          <p className="fs-p">
            That constraint paid for itself twice over. Forcing every game name
            behind a single seam is what keeps the core logic testable with the
            game absent — and what turns the next patch from a hunt into a
            one-file repair.
          </p>
        </section>

        <section className="fs-section" id="what-that-bought" data-reveal>
          <h2 className="fs-section__label">What that bought</h2>
          <h3 className="fs-h2">Four decisions, each one confirmed in the running game before it counted.</h3>
          <div className="fs-grid" style={{ marginTop: '26px' }}>
            {findings.map((c) => (
              <div key={c.title} className="fs-card">
                <span className="fs-card__k">{c.k}</span>
                <span className="fs-card__title">{c.title}</span>
                <p className="fs-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" id="the-hard-parts" data-reveal>
          <h2 className="fs-section__label">The hard parts</h2>
          <h3 className="fs-h2">Most of the work was deciding what not to trust — including my own code.</h3>
          <div className="fs-principles">
            {hardParts.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" id="by-the-numbers" data-reveal>
          <h2 className="fs-section__label">By the numbers</h2>
          <div className="fs-stats">
            {stats.map((s) => (
              <div key={s.label} className="fs-stat">
                <span className="fs-stat__num">{s.num}</span>
                <span className="fs-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" id="status" data-reveal>
          <h2 className="fs-section__label">Status you can check</h2>
          <h3 className="fs-h2">Two buckets, and I don&apos;t move things up early.</h3>
          <p className="fs-p">
            Every capability in this project sits in one of exactly two states,
            and the distinction is enforced in the docs the same way the naming
            rule is enforced in CI.
          </p>
          <div className="fs-principles">
            <div className="fs-principle">
              <span className="fs-principle__t">Confirmed — somebody watched it work</span>
              <span className="fs-principle__d">
                Observed running in the live game and logged. Storage surviving a
                full relaunch, both damage paths carrying a real element, the
                effect staying on only the infused weapon, the earn loop, the
                apply gesture, the tooltip, and the permanence rule.
              </span>
            </div>
            <div className="fs-principle">
              <span className="fs-principle__t">Wired — built, tested, but unwitnessed</span>
              <span className="fs-principle__d">
                Passing every off-game check and not yet seen running in the
                game. Removal sits here today. It clears the same bar every
                confirmed item cleared before it moved up, and it stays in this
                bucket until it does.
              </span>
            </div>
          </div>
          <p className="fs-p" style={{ marginTop: '26px' }}>
            Most status reports have one bucket, labelled <em>done</em>. That
            single bucket is where schedule risk hides — and on a fixed-price
            engagement it hides on the client&apos;s side of the invoice. Two
            buckets cost nothing to maintain and mean a progress report is
            something you can act on rather than something you have to discount.
          </p>
        </section>

        <section className="fs-section" id="under-the-hood" data-reveal>
          <h2 className="fs-section__label">Under the hood</h2>
          <h3 className="fs-h2">The stack, by layer.</h3>
          {layers.map((l) => (
            <div key={l.name} className="fs-arch-row">
              <span className="fs-arch-row__name">{l.name}</span>
              <span className="fs-arch-row__desc">{l.desc}</span>
              <span className="fs-arch-row__badge">{l.badge}</span>
            </div>
          ))}
        </section>

        <section className="fs-section" id="what-it-won-t" data-reveal>
          <h2 className="fs-section__label">What it won&apos;t do — and what I won&apos;t claim</h2>
          <h3 className="fs-h2">The limits are on the page because you&apos;d find them anyway.</h3>
          <div className="fs-principles">
            {limits.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-cta">
          <h2 className="fs-cta__title">
            No documentation.<br />No guessing either.
          </h2>
          <div className="fs-cta__links">
            <Link className="contact-btn" href="/#contact">
              Start a conversation <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="contact-btn" href={next.href}>
              Next: {next.name} <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
