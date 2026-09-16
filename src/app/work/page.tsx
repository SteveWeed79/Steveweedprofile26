import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';
import ProjectList from '@/components/ProjectList';
import { caseStudies, unwrittenProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — every project, not just the front page',
  description:
    'The full index of Steve Weed’s projects: multi-game commerce, developer tooling, systems and server ops, and offline-first mobile — with a deep-dive case study behind each one that has a story worth telling.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — Steve Weed',
    description:
      'The full project index: commerce, developer tooling, systems, and offline-first mobile.',
    url: '/work',
    type: 'website',
  },
};

export default function WorkPage() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="fs">
        <Link href="/#work" className="fs-back">
          <span aria-hidden="true">←</span> Back to home
        </Link>

        <section className="fs-hero">
          <p className="fs-eyebrow">Index · All work</p>
          <h1 className="fs-title">Work</h1>
          <p className="fs-lede">
            The home page carries the headline projects. This is{' '}
            <strong>all of it</strong> — commerce, developer tooling, systems
            and server ops, offline-first mobile. Anything with a story worth
            telling has a full case study behind it; the rest are here so the
            record is complete.
          </p>
        </section>

        <section className="fs-section" data-reveal>
          <p className="fs-section__label">Case studies</p>
          <h2 className="fs-h2">
            {caseStudies.length} project
            {caseStudies.length === 1 ? '' : 's'} written up end to end — the
            architecture, the hard parts, and what they deliberately don&apos;t do.
          </h2>
          <div style={{ marginTop: '30px' }}>
            <ProjectList items={caseStudies} />
          </div>
        </section>

        {unwrittenProjects.length > 0 && (
          <section className="fs-section" data-reveal>
            <p className="fs-section__label">Also built</p>
            <h2 className="fs-h2">
              Shipped, smaller, or still finding their shape — no write-up yet.
            </h2>
            <div style={{ marginTop: '30px' }}>
              <ProjectList items={unwrittenProjects} />
            </div>
          </section>
        )}

        <section className="fs-cta">
          <h2 className="fs-cta__title">
            Want the long version
            <br />
            of any of these?
          </h2>
          <div className="fs-cta__links">
            <Link className="contact-btn" href="/#contact">
              Get in touch <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="contact-btn" href="/">
              Back to home <span className="contact-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
