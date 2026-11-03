import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

/**
 * Renders a router Link (to), anchor (href) or button.
 * variant: 'primary' (yellow) | 'dark' | 'outline' | 'soft' (pale yellow pill) | 'text' (underlined link)
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className={styles.arrow} size={16} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
