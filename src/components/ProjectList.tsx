import Link from 'next/link';
import { projectNum, type Project } from '@/data/projects';

interface Props {
  items: Project[];
}

/**
 * The editorial project row, shared by the home page short list and /work.
 * A project with a case study links internally; one with only an external
 * home links out; one with neither renders as a plain, non-interactive row.
 */
export default function ProjectList({ items }: Props) {
  return (
    <div className="projects__list">
      {items.map((p, i) => {
        const body = (
          <>
            <span className="project-item__num">{projectNum(i)}</span>
            <div className="project-item__body">
              <span className="project-item__name">{p.name}</span>
              <span className="project-item__desc">{p.desc}</span>
              <div className="project-item__tags">
                {p.tags.map((t) => (
                  <span key={t} className="project-item__tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-item__meta">
              <span className={`project-item__status project-item__status--${p.status.toLowerCase()}`}>
                {p.status}
              </span>
              <span className="project-item__domain">{p.domain}</span>
            </div>
          </>
        );

        if (p.href) {
          return (
            <Link key={p.slug} href={p.href} className="project-item project-item--link" data-reveal>
              {body}
              <span className="project-item__arrow" aria-hidden="true">↗</span>
            </Link>
          );
        }

        if (p.external) {
          return (
            <a
              key={p.slug}
              href={p.external.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item project-item--link"
              data-reveal
            >
              {body}
              <span className="project-item__arrow" aria-hidden="true">↗</span>
            </a>
          );
        }

        return (
          <div key={p.slug} className="project-item" data-reveal>
            {body}
            <span className="project-item__arrow" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}
