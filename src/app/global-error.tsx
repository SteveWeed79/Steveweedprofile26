'use client';

import { useEffect } from 'react';

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, so it
 * must render its own <html>/<body> and cannot rely on the app's fonts, tokens,
 * or global stylesheet. Kept deliberately self-contained and minimal.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: 24,
          background: '#0a0a0b',
          color: '#f0f0f0',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif',
          }}
        >
          Something went wrong<span style={{ color: '#47c8ff' }}>.</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 420, lineHeight: 1.7, color: '#9a9aa6', fontSize: 14 }}>
          The site hit an unexpected error. Reloading usually clears it.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            cursor: 'pointer',
            padding: '11px 20px',
            border: '1px solid #2a2a30',
            borderRadius: 3,
            background: 'transparent',
            color: '#f0f0f0',
            font: 'inherit',
            fontSize: 12,
            letterSpacing: '0.04em',
          }}
        >
          Try again ↻
        </button>
      </body>
    </html>
  );
}
