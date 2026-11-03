import styles from './CardGrid.module.css';

/** Responsive 1 → 2 → 3 column grid, filled left to right. */
export default function CardGrid({ children, as: Tag = 'ul' }) {
  return <Tag className={styles.grid}>{children}</Tag>;
}
