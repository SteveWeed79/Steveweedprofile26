import Link from 'next/link';
import ProjectList from './ProjectList';
import { allProjects, featuredProjects } from '@/data/projects';

export default function Projects() {
  const rest = allProjects.length - featuredProjects.length;

  return (
    <section className="section" id="work">
      <p className="section__label">Work</p>
      <ProjectList items={featuredProjects} />
      {rest > 0 && (
        <Link href="/work" className="projects__more" data-reveal>
          View all {allProjects.length} projects
          <span className="projects__more-arrow" aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
