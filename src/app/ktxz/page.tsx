import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';

export const metadata: Metadata = {
  title: 'KTXZ Shop — a multi-game trading-card marketplace',
  description:
    'KTXZ Shop is a production e-commerce platform: a customer storefront (search, cart, Stripe checkout, returns, collection tracking) plus a full admin operations platform — built with Next.js 16, MongoDB Atlas Search, NextAuth v5, and Stripe, backed by 2,350+ tests.',
  alternates: { canonical: '/ktxz' },
  openGraph: {
    title: 'KTXZ Shop — a multi-game trading-card marketplace',
    description:
      'Storefront + admin operations platform for eight card games. Next.js 16, MongoDB, Stripe, 2,350+ tests.',
    url: '/ktxz',
    type: 'article',
  },
};

const meta = [
  { label: 'Status', value: 'Live', accent: true },
  { label: 'Role', value: 'Solo — full-stack' },
  { label: 'Framework', value: 'Next.js 16 · React 19' },
  { label: 'Scale', value: '8 games · 33 data models' },
];

const stats = [
  { num: '8', label: 'Trading-card games, unified in one catalog' },
  { num: '2,350+', label: 'Automated tests across 190 files (+ integration, E2E & mutation suites)' },
  { num: '33', label: 'Mongoose data models behind the store' },
  { num: '5+', label: 'Market-pricing providers, budget-guarded' },
];

const storefront = [
  { k: 'Catalog', title: 'Search that forgives', body: 'Multi-game catalog with brand/set, rarity, per-game element, and condition filters — powered by MongoDB Atlas Search with autocomplete, prefix matching, and typo tolerance.' },
  { k: 'Cart', title: 'Guest → account merge', body: 'Guest and authenticated carts, with the guest cart auto-merging into the account on login so nothing is lost between sessions.' },
  { k: 'Checkout', title: 'Stripe Embedded Checkout', body: 'Automatic tax, address collection, and live or flat-rate shipping — with orders created only by a verified, idempotent webhook.' },
  { k: 'Inventory', title: 'TOCTOU-safe reservation', body: 'Stock is held for the duration of checkout and swept by cron, so two buyers can’t race for the last copy of a single.' },
  { k: 'Vault', title: 'Timed product drops', body: 'Scheduled drops with countdown timers and a global drop widget — plus preorder windows carried through checkout with expected-ship dates.' },
  { k: 'Trust', title: 'Reviews & returns', body: 'Product reviews with spam filtering and moderation, self-service return requests, and guest return lookup by order number + email.' },
  { k: 'Collection', title: 'Binders & portfolio', body: 'A customer collection tracker: catalog owned cards into custom binders, keep a wishlist, watch portfolio value over time and set completion, import/export by CSV, and mint public read-only share links. Entries key to a canonical printing, so they re-value from the current market and survive a listing selling out.' },
];

const admin = [
  { k: 'Catalog', title: 'Import at scale', body: 'CSV bulk import, JSON set-manifests, and set-based import from Scryfall & Scrydex — every row reconciled (created / skipped / failed) so nothing is silently dropped.' },
  { k: 'Pricing', title: 'Multi-provider + budget guard', body: 'Look up market prices across providers, override per card, and run an hourly sync that stays inside the Scrydex monthly API budget via a built-in guard.' },
  { k: 'Fulfillment', title: 'Orders end-to-end', body: 'Status updates, tracking, Shippo label purchase, printable packing slips, and full or partial refunds — with an audit log over sensitive actions.' },
  { k: 'Media', title: 'One-click clean images', body: 'Bulk uploads with browser-side background removal and OpenCV auto-crop, stored on S3 + CloudFront.' },
  { k: 'People', title: 'Roles + step-up auth', body: 'Customer / vendor / admin roles with re-authentication required before the most sensitive actions.' },
  { k: 'Insight', title: 'Reports that matter', body: 'Sales and operational analytics (Recharts), operational-cost tracking, and vendor records.' },
];

const hardParts = [
  { t: 'Idempotent payments', d: 'The Stripe webhook is the source of truth for orders, deduplicated with TTL-expired MongoDB event records — a retried webhook never creates a second order.' },
  { t: 'Email you can trust', d: 'Resend behind an Upstash QStash send queue with a dead-letter queue, delivery webhooks that suppress bounces/complaints, and a cron-driven retry worker.' },
  { t: 'Security at the edge', d: 'Per-request CSP via edge middleware, HSTS and the hardening header set, NoSQL-injection protection, ObjectId validation, and server-action CSRF mitigation.' },
  { t: 'Graceful under failure', d: 'Rate limiting on auth and sensitive endpoints, circuit breakers around external dependencies, and in-memory fallbacks when Redis or Atlas Search aren’t available.' },
];

const layers = [
  { name: 'Framework', desc: 'Next.js 16 App Router, React 19, TypeScript 5.9, pnpm 10', badge: 'App Router' },
  { name: 'Data', desc: 'MongoDB via Mongoose 9, with Atlas Search (regex fallback in dev)', badge: '33 models' },
  { name: 'Auth', desc: 'NextAuth v5 — JWT sessions, RBAC, step-up re-auth', badge: 'RBAC' },
  { name: 'Payments', desc: 'Stripe Embedded Checkout — sessions, webhooks, refunds', badge: 'idempotent' },
  { name: 'Comms', desc: 'Resend + Upstash QStash queue, DLQ, delivery webhooks', badge: 'at-least-once' },
  { name: 'Media', desc: 'AWS S3 + CloudFront, imgly background removal, OpenCV crop', badge: 'auto-crop' },
  { name: 'Ops', desc: 'Vercel Crons, GitHub Actions, Sentry + OpenTelemetry', badge: 'observed' },
  { name: 'Quality', desc: 'Vitest (190 files, 2,350+ tests) + Stripe integration, Playwright E2E, and Stryker mutation testing', badge: 'CI-gated' },
];

export default function KtxzPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/#work" className="fs-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Case Study · E-commerce Platform</p>
          <h1 className="fs-title">KTXZ Shop</h1>
          <p className="fs-lede">
            A multi-game trading-card marketplace that pairs a{' '}
            <strong>customer storefront</strong> — browse, search, cart, Stripe
            checkout, returns, reviews — with a full{' '}
            <strong>admin operations platform</strong> for catalog, pricing,
            inventory, and fulfillment. Eight card games, one system, built
            solo end-to-end.
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
            <a className="contact-btn" href="https://ktxzenterprises.com" target="_blank" rel="noopener noreferrer">
              Visit the store <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-btn" href="#hard-parts">
              The hard parts <span className="contact-btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Overview</p>
          <h2 className="fs-h2">Two products in one repo: a storefront customers love, and the operations platform that runs it.</h2>
          <p className="fs-p">
            Card data and market pricing span{' '}
            <strong>Pokémon, Magic: The Gathering, Disney Lorcana, One Piece,
            Gundam, and Riftbound</strong> — priced through the Scrydex, Scryfall,
            Pokémon-TCG, PriceCharting, and TCGplayer providers — plus UniVersus
            and Weiss Schwarz via dedicated import tooling.
          </p>
          <p className="fs-p">
            The interesting engineering isn&apos;t the CRUD. It&apos;s the
            money-safe, race-safe, failure-tolerant machinery underneath: atomic
            inventory holds, idempotent webhooks, a queued email pipeline with a
            dead-letter path, and a pricing sync that respects a hard API budget.
          </p>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Storefront</p>
          <h2 className="fs-h2">Everything a buyer touches.</h2>
          <div className="fs-grid">
            {storefront.map((c) => (
              <div key={c.title} className="fs-card">
                <span className="fs-card__k">{c.k}</span>
                <span className="fs-card__title">{c.title}</span>
                <p className="fs-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Admin operations</p>
          <h2 className="fs-h2">Everything the store runs on.</h2>
          <div className="fs-grid">
            {admin.map((c) => (
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
          <h2 className="fs-h2">Where an e-commerce build actually gets dangerous.</h2>
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

        <section className="fs-cta">
          <h2 className="fs-cta__title">See it live.</h2>
          <div className="fs-cta__links">
            <a className="contact-btn" href="https://ktxzenterprises.com" target="_blank" rel="noopener noreferrer">
              Visit KTXZ Shop <span className="contact-btn__arrow" aria-hidden="true">↗</span>
            </a>
            <Link className="contact-btn" href="/forespec">
              Next: Forespec <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
