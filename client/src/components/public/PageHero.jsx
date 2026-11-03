import Container from '../common/Container';
import SmartImage from '../common/SmartImage';
import { cx } from '../../utils/cx';
import styles from './PageHero.module.css';

/**
 * Shared hero for inner pages and the home page: text left, softly framed image right.
 * imageShape: 'soft' (rounded rectangle) | 'organic' (blob)
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  image,
  imageAlt = '',
  imageShape = 'soft',
  size = 'md',
}) {
  return (
    <section className={cx(styles.hero, styles[size], !image && styles.textOnly)}>
      <Container className={styles.inner}>
        <div className={cx(styles.text, 'fade-up')}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        {image !== undefined && (
          <div className={styles.visual}>
            <div className={styles.blob} aria-hidden="true" />
            <div className={cx(styles.frame, styles[imageShape])}>
              <SmartImage src={image} alt={imageAlt} eager />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
