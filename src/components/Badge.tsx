interface BadgeProps {
  label?: string;
  href?: string;
}

/**
 * The SW/ brand mark. Colours are token-driven, so a single component adapts
 * to both the dark and light themes automatically.
 */
export default function Badge({
  label = 'Build',
  href = 'https://github.com/steveweed79',
}: BadgeProps) {
  return (
    <a className="swb" href={href} target="_blank" rel="noopener noreferrer">
      <span className="swb__mark">
        <span className="swb__sw">SW</span>
        <span className="swb__slash">/</span>
      </span>
      <span className="swb__label">{label}</span>
    </a>
  );
}
