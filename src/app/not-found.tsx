import type { Metadata } from 'next';
import Link from 'next/link';
import CaseHeader from '@/components/CaseHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <CaseHeader />
      <main id="content" className="statuspage">
        <p className="statuspage__eyebrow">404 · Not found</p>
        <h1 className="statuspage__title">Lost<br />the thread.</h1>
        <p className="statuspage__text">
          This page doesn&apos;t exist — or it moved. No harm done. Let&apos;s
          get you back to something real.
        </p>
        <div className="statuspage__actions">
          <Link href="/" className="contact-btn">
            Back home <span className="contact-btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/#work" className="contact-btn">
            See the work <span className="contact-btn__arrow" aria-hidden="true">↓</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
