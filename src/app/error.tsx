'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console; wire to a reporter here if one is added.
    console.error(error);
  }, [error]);

  return (
    <main id="content" className="statuspage">
      <p className="statuspage__eyebrow">Error · Something broke</p>
      <h1 className="statuspage__title">That&apos;s<br />on me.</h1>
      <p className="statuspage__text">
        An unexpected error hit this page. It&apos;s not you. Try again, or head
        back home and pick up from there.
      </p>
      <div className="statuspage__actions">
        <button type="button" onClick={reset} className="contact-btn">
          Try again <span className="contact-btn__arrow" aria-hidden="true">↻</span>
        </button>
        <Link href="/" className="contact-btn">
          Back home <span className="contact-btn__arrow" aria-hidden="true">→</span>
        </Link>
      </div>
      {error.digest && (
        <p className="statuspage__digest">Reference: {error.digest}</p>
      )}
    </main>
  );
}
