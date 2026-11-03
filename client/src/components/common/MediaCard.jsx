import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import Button from './Button';
import styles from './MediaCard.module.css';

/**
 * The one card used for programs and categories so every card shares identical structure:
 * image → title → short description → (optional extra, e.g. price) → call to action.
 */
export default function MediaCard({
  image,
  fallbackImage,
  title,
  description,
  to,
  ctaLabel = 'Learn More',
  meta,
  children,
}) {
  return (
    <article className={styles.card}>
      <Link to={to} className={styles.media} tabIndex={-1} aria-hidden="true">
        <SmartImage src={image} fallbackSrc={fallbackImage} alt="" />
      </Link>
      <div className={styles.body}>
        {meta && <p className={styles.meta}>{meta}</p>}
        <h3 className={styles.title}>
          <Link to={to}>{title}</Link>
        </h3>
        <p className={styles.description}>{description}</p>
        {children && <div className={styles.extra}>{children}</div>}
        <Button
          to={to}
          variant="soft"
          size="sm"
          withArrow
          className={styles.cta}
          aria-label={`${ctaLabel}: ${title}`}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
