import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';

export const metadata: Metadata = {
  title: 'palctl — REST-native Palworld server control',
  description:
    'palctl is a REST-native control plane for Palworld dedicated servers: a memory-leak watchdog that restarts on the symptom not the clock, leak forecasting, a PySide6 GUI, a headless daemon, a CLI, a self-hosted web dashboard, and a self-hosted Discord bot. Case study: architecture, the hard parts, and the safety-first design.',
  alternates: { canonical: '/palctl' },
  openGraph: {
    title: 'palctl — a control plane for Palworld dedicated servers',
    description:
      'Reads the game server’s real memory off the OS and restarts before a leak bites — daemon, GUI, CLI, web, and Discord over one core. Released v1.0.0, Windows + headless Linux.',
    url: '/palctl',
    type: 'article',
  },
};

const meta = [
  { label: 'Status', value: 'Released · v1.0.0', accent: true },
  { label: 'Role', value: 'Solo — design + engineering' },
  { label: 'Runtime', value: 'Python 3.11+ · PySide6' },
  { label: 'Surfaces', value: 'daemon · GUI · CLI · web · Discord' },
  { label: 'Platforms', value: 'Windows · headless Linux' },
  { label: 'License', value: 'AGPL-3.0-or-later (+ commercial)' },
];

const surfaces = [
  {
    k: 'Daemon',
    title: 'The always-on brain',
    body: 'A headless process running five supervised async loops under one asyncio.gather — poll/diff, memory watchdog, scheduler, leak forecaster, update-check — plus the Discord bot and the control API. One escaped exception is logged and contained; the other loops keep running instead of the whole daemon going down.',
  },
  {
    k: 'GUI',
    title: 'PySide6 desktop',
    body: 'Dashboard (FPS, frame time, a memory sparkline with the watchdog limit drawn in, uptime, in-game day, base camps), Players with kick/ban, a Console, and a typed, grouped Settings editor over the one-line OptionSettings blob. Console actions run on a worker thread, so a slow service call can’t freeze the window.',
  },
  {
    k: 'CLI',
    title: '16 subcommands over the API',
    body: 'status, players, events, start/stop/restart, save, backup/backups/restore, update, announce, kick/ban/unban, and ui — all talking to the daemon’s token-gated localhost API. Because it rides the same API as everything else, it works over ssh, in cron, and on the headless box the desktop GUI can’t serve. palctl kick zoe resolves the name to a user ID for you.',
  },
  {
    k: 'Web',
    title: 'A dashboard from your phone',
    body: 'One self-contained page the daemon serves on 127.0.0.1 only — live status, players, the memory sparkline, events, and the full control set with confirm-gated restore. The per-user token rides the URL fragment, so it never leaves the browser. Remote access goes over an ssh tunnel or Tailscale, never an exposed port.',
  },
  {
    k: 'Discord',
    title: 'A bot that’s yours',
    body: '13 slash commands plus join/leave, level-up, watchdog, up/down, and update-available notifications, an optional auto-refreshing status message, and a welcome line. Your token, your machine — no third-party bridge holding your admin password. First-connect retry, and sends are queued so a Discord rate limit can’t stall polling or the watchdog.',
  },
  {
    k: 'Core',
    title: 'Platform-neutral, tested anywhere',
    body: 'The ini parser, backups, session/metrics tracking (SQLite), scheduler, path detection, SteamCMD orchestration, the operation lock, the watchdog hold-off, and the leak forecaster are all OS-agnostic and unit-tested on any OS. Only service control, the downloads, and the GUI need Windows — which is why the same daemon runs headless on Linux.',
  },
];

const stats = [
  { num: '5', label: 'Control surfaces over one shared core' },
  { num: '29', label: 'Commands — 16 CLI subcommands + 13 Discord slash commands' },
  { num: '180+', label: 'Tests green on a Windows + Linux CI matrix (Python 3.11 & 3.12)' },
  { num: '1.0.0', label: 'Shipped after a full release-readiness audit of every subsystem' },
];

const hardParts = [
  {
    t: 'Restart on the symptom, not the clock',
    d: 'The universal advice is “restart on a timer,” which either kicks people for nothing or leaves the server a slideshow for hours. palctl reads PalServer-Win64-Shipping.exe’s actual resident memory via psutil and restarts when it’s really bloating — guarded by consecutive-sample confirmation, a player hold-off, a hard limit that overrides the hold-off, and a cooldown so it can’t loop.',
  },
  {
    t: 'Forecast the leak, restart while empty',
    d: 'A least-squares fit over recent memory samples answers “how long until the limit at this pace?” — judged from the fitted line, not a lone spike. Opt-in, it restarts early at a moment the server happens to be empty instead of at the threshold two hours later with six people mid-boss. It’s deliberately conservative: no forecast under 12 points, under a 15-minute span, or beyond 24h out.',
  },
  {
    t: 'One operation lock',
    d: 'Scheduled restarts, watchdog restarts, SteamCMD updates, restores, crash recovery, and your own Start/Stop all funnel through a single named lock. Human-requested work queues; opportunistic automation skips-if-busy and re-evaluates next poll — so a background restart can never fire into the middle of an update or a restore.',
  },
  {
    t: 'A backup that survives the disk',
    d: 'Backups copy through a .partial sibling + atomic rename, so an interrupted copy never looks finished; a torn backup is detected by fingerprint, retried, then flagged-but-kept. They can mirror to a second disk or a network share — because a backup on the server’s own disk doesn’t survive that disk. And an update won’t run if its pre-update world backup failed: no rollback path, no update.',
  },
  {
    t: 'Localhost-only, token-gated control',
    d: 'The daemon binds 127.0.0.1 only, and every request carries a per-user token compared with a constant-time check. The token lives in a 0600 file created with O_EXCL. Defence-in-depth on top of the real boundary — never port-forwarded — so “anyone logged in” still can’t drive stop, restore, kick, or ban.',
  },
  {
    t: 'REST, not deprecated RCON',
    d: 'Every other Windows GUI drives RCON; palctl uses Pocketpair’s recommended REST API, which unlocks what RCON can’t: server FPS, frame time, uptime, base-camp count, and per-player level, ping, location, and building count. It also guards PalWorldSettings.ini across SteamCMD validate — the exact step that blanks it.',
  },
];

const layers = [
  { name: 'Runtime', desc: 'Python 3.11+, an asyncio daemon running five supervised concurrent loops plus the bot and API; one crashed loop can’t take the process down.', badge: 'asyncio' },
  { name: 'Desktop', desc: 'PySide6 (Qt) — dashboard, players, console, a typed settings editor over the OptionSettings blob, and a first-run wizard; console work on worker threads.', badge: 'PySide6' },
  { name: 'REST / HTTP', desc: 'httpx client for the Palworld REST API (FPS, frame time, per-player data); aiohttp serves the token-gated 127.0.0.1 control API and the web dashboard.', badge: 'httpx + aiohttp' },
  { name: 'Data', desc: 'SQLite for session/playtime and metrics history, so the graphs survive a daemon restart; a hand-rolled ini parser that preserves unknown keys from future patches.', badge: 'SQLite' },
  { name: 'Discord', desc: 'A self-hosted discord.py bot — 13 slash commands and event notifications, queue-backed sends, and first-connect retry.', badge: 'discord.py' },
  { name: 'Packaging', desc: 'PyInstaller builds the binaries; Inno Setup produces the installer and a portable zip; secrets go to Windows Credential Manager via DPAPI, never a config file.', badge: 'PyInstaller + Inno Setup' },
  { name: 'CI / Quality', desc: 'A GitHub Actions matrix (Windows + Linux × Python 3.11/3.12), ruff, an import-smoke job under offscreen Qt, and the test suite on every push.', badge: 'GitHub Actions · ruff' },
];

const limits = [
  {
    t: 'No chat relay',
    d: 'Palworld exposes no chat-read endpoint and dedicated servers ship no log by default. Mirroring chat into Discord is RE-UE4SS territory, not the supported API — so palctl doesn’t pretend to.',
  },
  {
    t: 'No entity / base manager',
    d: 'The gamedata endpoint is in the docs, but there’s currently no way to enable it on a dedicated server — no INI setting, no launch argument. So there’s nothing honest to build on yet.',
  },
  {
    t: 'No plugin framework',
    d: 'The server is a closed UE5 binary. There is no Torch equivalent and can’t be one without injection. palctl stays inside what the real API supports.',
  },
];

export default function PalctlPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/#work" className="fs-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Case Study · Server Ops Tooling</p>
          <h1 className="fs-title">palctl</h1>
          <p className="fs-lede">
            A REST-native control plane for a Palworld dedicated server that{' '}
            <strong>restarts on the symptom, not the clock</strong> — it reads
            the game server&apos;s actual memory off the OS and{' '}
            <strong>forecasts the leak curve</strong>, so it can restart early
            while the server is empty instead of at the threshold with players
            mid-session. One engineer, five surfaces over one core.
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
            <a className="contact-btn" href="https://github.com/SteveWeed79/palctl" target="_blank" rel="noopener noreferrer">
              View source <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-btn" href="https://github.com/SteveWeed79/palctl/releases/latest" target="_blank" rel="noopener noreferrer">
              Download v1.0.0 <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-btn" href="#hard-parts">
              The hard parts <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Why it exists</p>
          <h2 className="fs-h2">There are good Palworld managers. This one is different in three specific ways.</h2>
          <p className="fs-p">
            Every other Windows GUI drives <strong>RCON</strong>, which
            Pocketpair has deprecated. palctl uses the recommended{' '}
            <strong>REST API</strong> — which also unlocks what RCON simply
            can&apos;t report: server FPS, frame time, uptime, base-camp count,
            and per-player level, ping, location, and building count.
          </p>
          <div className="fs-callout">
            <p>
              Palworld&apos;s dedicated server leaks memory. The universal advice
              is <strong>&ldquo;restart it on a timer,&rdquo;</strong> which
              either kicks people for no reason or leaves the server a slideshow
              for hours before the timer fires.
            </p>
            <p>
              palctl reads the server process&apos;s <strong>actual resident
              memory</strong> from the OS and restarts when it&apos;s really
              bloating — with a countdown, a world save, and a hold-off while
              players are online. You can&apos;t do that from a web panel or a
              cloud bridge. You have to be <strong>on the box</strong> — which is
              also why the Discord bot is self-hosted: your token, your machine,
              no third party holding your admin password.
            </p>
          </div>
        </section>

        <section className="fs-section" id="architecture" data-reveal>
          <p className="fs-section__label">Architecture</p>
          <h2 className="fs-h2">Two processes, five surfaces, one shared core.</h2>
          <p className="fs-p">
            The split is deliberate. The <strong>daemon</strong> is the manager —
            wrapped in a Windows service or a systemd unit, it survives reboots
            and sign-outs. The <strong>GUI</strong> is a viewer you open when you
            want it: <strong>closing the window manages nothing worse</strong>.
            Everything a user touches — desktop, CLI, web, Discord — drives the
            same token-gated daemon API, so the four surfaces can never disagree
            about what the server is doing.
          </p>
          <div className="fs-grid" style={{ marginTop: '26px' }}>
            {surfaces.map((c) => (
              <div key={c.title} className="fs-card">
                <span className="fs-card__k">{c.k}</span>
                <span className="fs-card__title">{c.title}</span>
                <p className="fs-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" id="hard-parts" data-reveal>
          <p className="fs-section__label">The hard parts</p>
          <h2 className="fs-h2">The recurring theme is restraint: an auto-restarter that misfires is worse than none.</h2>
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
          <p className="fs-section__label">What it won&apos;t do — and can&apos;t</p>
          <h2 className="fs-h2">Scoped to what the API actually supports, and honest about the rest.</h2>
          <div className="fs-principles">
            {limits.map((p) => (
              <div key={p.t} className="fs-principle">
                <span className="fs-principle__t">{p.t}</span>
                <span className="fs-principle__d">{p.d}</span>
              </div>
            ))}
          </div>
          <p className="fs-p" style={{ marginTop: '26px' }}>
            The installer isn&apos;t code-signed yet, so Windows SmartScreen shows
            a one-time prompt — every release ships a{' '}
            <code>SHA256SUMS.txt</code> so the download can be verified against
            what CI built. A <strong>winget</strong> listing and free
            code-signing via SignPath&apos;s open-source program are on the
            roadmap.
          </p>
        </section>

        <section className="fs-cta">
          <h2 className="fs-cta__title">On the box.<br />Where server ops actually live.</h2>
          <div className="fs-cta__links">
            <a className="contact-btn" href="https://github.com/SteveWeed79/palctl" target="_blank" rel="noopener noreferrer">
              View source <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <Link className="contact-btn" href="/evenglow">
              Next: Evenglow <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
