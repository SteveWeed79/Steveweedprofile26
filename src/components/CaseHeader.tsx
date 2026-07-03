import Link from 'next/link';
import Badge from './Badge';
import ThemeToggle from './ThemeToggle';

export default function CaseHeader() {
  return (
    <header className="nav">
      <Badge href="https://github.com/steveweed79" />
      <div className="nav__right">
        <nav className="nav__links" aria-label="Case study navigation">
          <Link href="/" className="nav__link">Home</Link>
          <a href="#content" className="nav__link">Top</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
