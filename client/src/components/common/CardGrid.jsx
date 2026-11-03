import styles from './CardGrid.module.css';

/** Responsive 1 → 2 → 3 column grid; a lone last card is centred on desktop. */
export default function CardGrid({ children, as: Tag = 'ul' }) {
  return <Tag className={styles.grid}>{children}</Tag>;
}
