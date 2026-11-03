import { cx } from '../../utils/cx';
import Container from './Container';
import styles from './Section.module.css';

/** Vertical page section with consistent rhythm. tone: 'default' | 'soft' */
export default function Section({
  id,
  tone = 'default',
  narrow,
  compact,
  className,
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={cx(styles.section, styles[tone], compact && styles.compact, className)}
      {...rest}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}
