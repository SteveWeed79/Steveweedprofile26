import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';

export const metadata: Metadata = {
  title: 'Evenglow — offline-first farm operations',
  description:
    'Evenglow is an offline-first farm record keeper: stock, growing, and machinery in one Android app that works with the radio off. React Native on Expo SDK 57, SQLite on device, Fastify and MongoDB on the server, backed by 2,858 tests across 229 files.',
  alternates: { canonical: '/evenglow' },
  openGraph: {
    title: 'Evenglow — offline-first farm operations',
    description:
      'A mutation log on device, a three-write commit protocol on a server with no transactions, and a sync engine that would rather stop than skip. 2,858 tests across 229 files.',
    url: '/evenglow',
    type: 'article',
  },
};

const meta = [
  { label: 'Status', value: 'Building · v0.3.2', accent: true },
  { label: 'Role', value: 'Solo — design + engineering' },
  { label: 'Client', value: 'React Native · Expo SDK 57' },
  { label: 'Server', value: 'Fastify · MongoDB · Oracle ARM' },
  { label: 'Scale', value: '29 entity types · 67 screens' },
  { label: 'Model', value: '$39/yr per farm · free on one device' },
];

const stats = [
  { num: '2,858', label: 'Tests green across 229 files — typecheck and lint clean on a fresh checkout' },
  { num: '56', label: 'orgId-leading indexes over 30 collections, with no escape hatch to bypass them' },
  { num: '67', label: 'Screens, 61 of them directly exercised by the screen suite' },
  { num: '1', label: 'TODO comment in 67,307 lines of source' },
];

const pipeline = [
  {
    k: '01',
    title: 'Enqueue',
    body: 'One SQLite transaction mints the sequence number, writes the outbox row, records an undo pre-image, projects the optimistic record, and advances the counter. Assigning clientSeq outside that transaction is how two mutations end up sharing a sequence number after a crash mid-write — at which point ordering is broken and nothing says so.',
  },
  {
    k: '02',
    title: 'Flush',
    body: 'Single-flight: concurrent callers share the in-flight promise rather than starting a second batch, which is what makes “never parallel” true when a timer, a reconnect, and a tap all fire at once. A mutation leaves the outbox only on applied or duplicate; anything else parks in the rejected inbox.',
  },
  {
    k: '03',
    title: 'Commit lane',
    body: 'serverTs is assigned inside a per-org async lane, immediately before the insert, clamped above every stamp already issued and seeded from the newest row on process start — so a stalled request or an NTP correction cannot make a row visible below a watermark already published.',
  },
  {
    k: '04',
    title: 'Apply',
    body: 'Batches apply sequentially in clientSeq order against a client-minted ULID used as the Mongo _id, with $setOnInsert making a replay a no-op. A replay projects from the stored envelope, never from the replayed request — the subtle half of idempotency that most implementations reintroduce the bug in.',
  },
  {
    k: '05',
    title: 'Pull',
    body: 'The read half ships the mutation log rather than projected documents, because the client already knows how to turn a mutation into a local record. One projection path serves both enqueue and hydration, so the two cannot drift.',
  },
  {
    k: '06',
    title: 'Sweep',
    body: 'An hourly pass decides rows whose client never came back, running the same apply and stamp code path rather than a second implementation of it. A second implementation is a second set of bugs, and the rarely-run one is where they hide.',
  },
];

const hardParts = [
  {
    t: 'A transaction the database does not have',
    d: 'MongoDB runs standalone here, so the log write and the projection cannot be atomic. The row is stamped pending with its envelope first, projected second, stamped with its outcome third — and a sweeper decides anything left undecided. The ordering is the design: a crash between any two writes leaves a row that is recoverable rather than a farm record nobody can account for.',
  },
  {
    t: 'The feed stops rather than skips',
    d: 'A monotonic cursor never looks back, so skipping an undecided row moves the watermark past a record that is about to start replicating — and every device that pulled in that window misses it permanently. The feed stalls at the first undecided row instead, distinguishing “skip forever” from “skip for now.” This is the class of bug that stays invisible until a reinstall.',
  },
  {
    t: 'The cursor is a pair, not a timestamp',
    d: 'serverTs is millisecond-resolution, so a page boundary landing inside one millisecond silently drops every sibling row. Hydration seeks on (serverTs, ULID) and advances both halves in the same transaction as the records they cover. The port signature took a bare number until the SQLite implementation caught it — and the comment recording that is still there.',
  },
  {
    t: 'The lint rule that tests itself',
    d: 'A restructure moved src/ into apps/ and packages/, every guard glob kept pointing at the old path, and the tenancy rules reported success while enforcing nothing. The fix was not a better glob. It was a test that instantiates ESLint in-process against a synthetic violation at file paths that may not exist yet, so the guard’s coverage is asserted rather than its presence.',
  },
  {
    t: 'The error shape is an oracle',
    d: 'Client-minted ULIDs mean tenants share an id space, so a cross-tenant _id collision fails the insert rather than matching the org-guarded filter. Returning duplicate would have been the natural answer — and would have confirmed to one farm that another holds that exact record. It surfaces as rejected instead.',
  },
  {
    t: 'Nothing is deleted to make a problem go away',
    d: 'A corrupt row keeps its raw value in quarantine, a rejection stays in the inbox until a person decides, a discard bumps a cleared counter so it is never later mistaken for loss, and an acknowledged mutation is marked applied rather than removed. “It was sent” and “it never existed” have to stay distinguishable on a device after the fact.',
  },
];

const layers = [
  { name: 'Client', desc: 'React Native on Expo SDK 57, React Navigation, 67 screens over three tabs; Android is the target and the APK is built and signed in CI.', badge: 'Expo SDK 57' },
  { name: 'Local store', desc: 'expo-sqlite behind a LocalStore port — WAL with synchronous=FULL, an eight-step migration ladder, corruption quarantine, and quota detection.', badge: 'SQLite' },
  { name: 'Contracts', desc: 'Zod schemas shared verbatim by client and server. Append-only entities have no update or delete schema at all, so refusing to edit an egg log is a structural fact rather than a runtime check.', badge: 'Zod · shared' },
  { name: 'Sync', desc: 'Outbox with batches of 100 and pull pages of 200; exponential backoff from 1s to 60s; a poison batch parks after six attempts rather than looping forever.', badge: 'mutation log' },
  { name: 'Tenancy', desc: 'One module exposes a collection handle — a closure over orgId with a seven-method surface, no aggregate, no bulkWrite, no unsafe variant. An ESLint AST selector blocks .collection() everywhere else; a separate script blocks silencing it inline.', badge: 'scopedOn(db, orgId)' },
  { name: 'Auth', desc: 'Argon2id at 19 MiB, t=2, p=1; access tokens at 15 minutes, refresh at 90 days; a farm is joined with a six-character code on a ten-minute window behind a rate limiter.', badge: 'Argon2id' },
  { name: 'Ops', desc: 'Self-hosted on an Oracle Ampere A1 with a standalone mongod. Nightly dumps are encrypted with an asymmetric key whose private half never exists on the box — a compromised server is not a compromised history.', badge: 'age · Oracle ARM' },
  { name: 'CI / Quality', desc: 'GitHub Actions with a mongo:8 service container and HOMEFARM_REQUIRE_DB=1, so the database-backed gate cannot be met by a suite that quietly did not run.', badge: 'GitHub Actions' },
];

const limits = [
  {
    t: '“Exactly once” is an effect, not a mechanism',
    d: 'The honest description is at-least-once delivery plus idempotent application: the client resends without clearing rows, and the server absorbs the duplicate on a client-minted id. The outcome is exactly-once application. The mechanism is not an exactly-once protocol, and calling it one would be describing the result as though it were the design.',
  },
  {
    t: 'The device gate is a manual gate',
    d: 'Airplane mode, fifty mutations, process kill, reconnect, zero loss and zero duplicates — earned on real hardware, and re-earned rather than carried over when the storage layer changed. But it leaves no test artifact: nothing in CI proves it, and 300 of the 3,158 tests need a live mongod to run at all.',
  },
  {
    t: 'Commit ordering assumes one process',
    d: 'The per-org lane and the last-issued timestamp are both in-process maps, so exact ordering holds for one API process per farm and no further. That is written down in two places in the source rather than discovered later, but it is a ceiling on horizontal scale, not a solved problem.',
  },
  {
    t: 'Not distributed, and not backed up twice',
    d: 'The Play Console account is unstarted and carries a waiting period, so the only way onto a phone today is a hand-installed APK. One farm is live, holding 3.8 MB, and until off-site copies land that farm is one disk away from being the only copy.',
  },
];

export default function EvenglowPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/#work" className="fs-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Case Study · Offline-First Mobile</p>
          <h1 className="fs-title">Evenglow</h1>
          <p className="fs-lede">
            Offline-first farm operations — stock, growing, and iron under one
            roofline. A mutation log on the device, a{' '}
            <strong>three-write commit protocol</strong> on a server with no
            transactions to lean on, and a sync engine that would rather{' '}
            <strong>stop than skip</strong>. Built for a barn with no signal, on
            the assumption that the phone in your pocket is the only copy.
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
            <a className="contact-btn" href="https://github.com/SteveWeed79/evenglow" target="_blank" rel="noopener noreferrer">
              View source <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-btn" href="#hard-parts">
              The hard parts <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Why it exists</p>
          <h2 className="fs-h2">The same person checks the hens and the carrots on the same walk.</h2>
          <p className="fs-p">
            A small mixed farm runs animals, growing, and machinery at once —
            poultry and ratites and ruminants, beds and polytunnels and
            succession sowing, hour meters and service intervals. The software
            for it is split across three products that each assume they are the
            only one, and none of them work in the one place the records are
            actually made.
          </p>
          <div className="fs-callout">
            <p>
              A barn has no signal. Neither does the far gate, or the polytunnel,
              or most of the ground between them. An app that needs a network to
              write a line down is an app that gets{' '}
              <strong>written down on a hand instead</strong>, and transcribed
              that evening if it is transcribed at all.
            </p>
            <p>
              So the network is not the source of truth here — the device is. The
              server is where devices <strong>reconcile</strong>, not where work
              is authored. That single inversion is what the whole engine below
              exists to make safe.
            </p>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">The thesis</p>
          <h2 className="fs-h2">The abstraction was built for a pivot that had already been argued against.</h2>
          <p className="fs-p">
            The project pivoted twice: a Next.js PWA to Capacitor, then Capacitor
            to React Native, deleting the old client both times. Before the
            second pivot was decided — and while the written recommendation still
            argued <em>against</em> React Native, precisely because it has no
            IndexedDB — the storage layer had already been extracted behind a
            port called <code>LocalStore</code>.
          </p>
          <p className="fs-p">
            That is the whole reason the second pivot cost days of storage work
            instead of starting the durability story again from nothing. The port
            was written for a move that the reasoning of the day said would not
            happen, and it is the single most load-bearing file in the repository
            for exactly that reason.
          </p>
          <div className="fs-callout">
            <p>
              The Phase&nbsp;2 exit gate — mutations logged with the radio off,
              surviving process death, syncing without loss or duplication — was
              first earned in a browser against IndexedDB. The move to native
              SQLite changed the durability characteristics that gate was
              proving, so it was <strong>re-earned on device</strong> rather than
              carried across.
            </p>
            <p>
              <strong>A gate proved on a storage layer you no longer ship is not
              a gate.</strong>
            </p>
          </div>
        </section>

        <section className="fs-section" id="architecture" data-reveal>
          <p className="fs-section__label">Architecture</p>
          <h2 className="fs-h2">Six stages, and a mutation is durable at the first one.</h2>
          <p className="fs-p">
            A record is written to device SQLite and is safe there before
            anything touches the network. Everything after that is reconciliation
            — and every stage is built on the assumption that it will be
            interrupted halfway through.
          </p>
          <div className="fs-grid" style={{ marginTop: '26px' }}>
            {pipeline.map((c) => (
              <div key={c.k} className="fs-card">
                <span className="fs-card__k">{c.k}</span>
                <span className="fs-card__title">{c.title}</span>
                <p className="fs-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" id="hard-parts" data-reveal>
          <p className="fs-section__label">The hard parts</p>
          <h2 className="fs-h2">Every one of these is a failure that stays invisible until it is expensive.</h2>
          <div className="fs-principles">
            {hardParts.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">By the numbers</p>
          <div className="fs-stats">
            {stats.map((s) => (
              <div key={s.label} className="fs-stat">
                <span className="fs-stat__num">{s.num}</span>
                <span className="fs-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="fs-p" style={{ marginTop: '22px' }}>
            54,549 lines of test against 67,307 lines of strict TypeScript. The
            tenancy guard is the one worth naming: across the whole monorepo
            there is not a single <code>.collection()</code> call outside the one
            module allowed to make them, and not a single inline disable of the
            rule that enforces it. &ldquo;Remember to include{' '}
            <code>orgId</code>&rdquo; is exactly the instruction that layer
            exists to make unnecessary.
          </p>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Under the hood</p>
          <h2 className="fs-h2">The stack, by layer.</h2>
          {layers.map((l) => (
            <div key={l.name} className="fs-arch-row">
              <span className="fs-arch-row__name">{l.name}</span>
              <span className="fs-arch-row__desc">{l.desc}</span>
              <span className="fs-arch-row__badge">{l.badge}</span>
            </div>
          ))}
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">What the claims actually mean</p>
          <h2 className="fs-h2">The interesting version of a sync engine is the one that says where it stops.</h2>
          <div className="fs-principles">
            {limits.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
          <p className="fs-p" style={{ marginTop: '26px' }}>
            The repository carries a 50-finding adversarial audit of its own
            codebase, opening on the line that every finding in it is present in
            a tree where the whole suite passes. Several of those findings are
            still open, including one in the signup path. An audit that only
            indicts the code you already fixed is a press release.
          </p>
        </section>

        <section className="fs-cta">
          <h2 className="fs-cta__title">Written down at the gate.<br />Reconciled when the signal comes back.</h2>
          <div className="fs-cta__links">
            <a className="contact-btn" href="https://github.com/SteveWeed79/evenglow" target="_blank" rel="noopener noreferrer">
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
