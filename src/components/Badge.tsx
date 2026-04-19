interface BadgeProps {
  variant?: 'dark' | 'light';
  label?: string;
  href?: string;
  hero?: boolean;
}

export default function Badge({
  variant = 'dark',
  label = 'Build',
  href = 'https://github.com/steveweed79',
  hero = false,
}: BadgeProps) {
  const className = [
    'swb',
    `swb--${variant}`,
    hero ? 'swb--hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      <span className="swb__mark">
        <span className="swb__sw">SW</span>
        <span className="swb__slash">/</span>
      </span>
      <span className="swb__label">{label}</span>
    </a>
  );
}
