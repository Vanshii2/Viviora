import Container from '../common/Container';
import Button from '../common/Button';
import styles from './CtaBanner.module.css';

export default function CtaBanner({
  title = 'Start Your Health Journey Today',
  description = 'Discover a nutrition approach that fits your lifestyle and goals.',
  ctaLabel = 'Explore Programs',
  ctaTo = '/programs',
}) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <Container>
        <div className={styles.banner}>
          <div className={styles.text}>
            <h2 id="cta-title" className={styles.title}>
              {title}
            </h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <Button to={ctaTo} variant="dark" size="lg" withArrow>
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
