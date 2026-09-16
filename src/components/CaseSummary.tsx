import type { ReactNode } from 'react';

export interface SummaryRow {
  k: string;
  v: ReactNode;
}

/**
 * The 30-second version, sat above the deep dive.
 *
 * Deliberately four rows at most. The last row is the outcome where there is a
 * real one to report, and "what it unlocks" where the project has no users yet
 * — the honest asymmetry between the shipped work and the in-progress work is
 * worth showing rather than papering over with uniform outcome language.
 */
export default function CaseSummary({ rows }: { rows: SummaryRow[] }) {
  return (
    <section className="fs-tldr" aria-labelledby="tldr-heading">
      <h2 className="fs-tldr__label" id="tldr-heading">
        The 30-second version
      </h2>
      <dl className="fs-tldr__list">
        {rows.map((r) => (
          <div key={r.k} className="fs-tldr__row">
            <dt className="fs-tldr__k">{r.k}</dt>
            <dd className="fs-tldr__v">{r.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
