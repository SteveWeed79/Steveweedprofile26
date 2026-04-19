import Badge from './Badge';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copy">© 2026 Steve Weed. All rights reserved.</span>
      <Badge variant="dark" href="https://github.com/steveweed79" />
    </footer>
  );
}
