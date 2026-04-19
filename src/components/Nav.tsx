import Badge from './Badge';

const links = [
  { label: 'Work',    href: '#work' },
  { label: 'Stack',   href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  return (
    <header className="nav">
      <Badge variant="dark" href="https://github.com/steveweed79" />
      <nav className="nav__links" aria-label="Site navigation">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="nav__link">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
