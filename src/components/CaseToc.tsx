export interface TocItem {
  id: string;
  label: string;
}

/**
 * In-page contents for a case study. These pages run long enough that "Home"
 * and "Top" aren't enough to navigate them — this gives a reader the shape of
 * the page before they commit to scrolling it.
 */
export default function CaseToc({ items }: { items: TocItem[] }) {
  return (
    <nav className="fs-toc" aria-label="On this page">
      <span className="fs-toc__label">On this page</span>
      <ol className="fs-toc__list">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="fs-toc__link">
              <span className="fs-toc__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
