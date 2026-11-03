import { cx } from '../../utils/cx';
import styles from './Logo.module.css';

/** Viviora wordmark with sprout mark. size: 'md' (navbar) | 'lg' (footer) */
export default function Logo({ size = 'md', showTagline = false, tagline, className }) {
  return (
    <span className={cx(styles.logo, styles[size], className)}>
      <svg className={styles.mark} viewBox="0 0 32 22" aria-hidden="true">
        <path
          d="M16 21C10.5 19.5 6.5 13.5 8 3c6 2.2 8.8 8.4 8 18Z"
          fill="var(--color-brand-yellow)"
        />
        <path
          d="M16 21c5.5-1.5 9.5-7.5 8-18-6 2.2-8.8 8.4-8 18Z"
          fill="var(--color-brand-yellow-hover)"
        />
      </svg>
      <span className={styles.word}>Viviora</span>
      {showTagline && tagline && <span className={styles.tagline}>{tagline}</span>}
    </span>
  );
}
