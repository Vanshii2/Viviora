import { cx } from '../../utils/cx';
import styles from './Container.module.css';

export default function Container({ as: Tag = 'div', narrow = false, className, children }) {
  return <Tag className={cx(styles.container, narrow && styles.narrow, className)}>{children}</Tag>;
}
