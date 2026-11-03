import Button from './Button';
import styles from './StateMessage.module.css';

/** Loading / empty / error message block. */
/** titleAs: element for the title — use 'h1' when the message is the whole page (e.g. 404). */
export default function StateMessage({
  title,
  description,
  action,
  actionLabel,
  role,
  titleAs: Title = 'p',
}) {
  return (
    <div className={styles.state} role={role}>
      <Title className={styles.title}>{title}</Title>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <Button {...action} variant="soft" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
