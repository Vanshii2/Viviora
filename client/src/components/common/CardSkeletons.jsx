import CardGrid from './CardGrid';
import styles from './CardSkeletons.module.css';

/** Placeholder cards with the same footprint as MediaCard while data loads. */
export default function CardSkeletons({ count = 3 }) {
  return (
    <div role="status" aria-label="Loading">
      <CardGrid>
        {Array.from({ length: count }, (_, i) => (
          <li key={i} aria-hidden="true">
            <div className={styles.card}>
              <div className={styles.media} />
              <div className={styles.body}>
                <div className={styles.line} style={{ width: '55%' }} />
                <div className={styles.line} />
                <div className={styles.line} style={{ width: '80%' }} />
                <div className={styles.pill} />
              </div>
            </div>
          </li>
        ))}
      </CardGrid>
    </div>
  );
}
