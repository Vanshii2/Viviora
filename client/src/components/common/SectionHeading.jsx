import { cx } from '../../utils/cx';
import styles from './SectionHeading.module.css';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'start',
  as: Heading = 'h2',
  id,
  className,
}) {
  return (
    <div className={cx(styles.wrapper, styles[align], action && styles.withAction, className)}>
      <div className={styles.text}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <Heading id={id} className={styles.title}>
          {title}
        </Heading>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
