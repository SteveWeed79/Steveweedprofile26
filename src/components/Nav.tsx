import Badge from './Badge';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#work' },
  { label: 'Stack',   href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  return (
    <header className="nav">
      <Badge href="https://github.com/steveweed79" />
      <div className="nav__right">
        <nav className="nav__links" aria-label="Site navigation">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
