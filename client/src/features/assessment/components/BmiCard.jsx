import { useWatch } from 'react-hook-form';
import { calculateBmi } from '@shared/assessment.js';
import styles from './BmiCard.module.css';

/** Live BMI from weight and height. Screening information only — never a diagnosis. */
export default function BmiCard({ isMinor }) {
  const [weightKg, heightCm] = useWatch({
    name: ['measurements.weightKg', 'measurements.heightCm'],
  });
  const bmi = calculateBmi(weightKg, heightCm);

  return (
    <section className={styles.card} aria-labelledby="bmi-title">
      <div className={styles.top}>
        <h3 id="bmi-title" className={styles.title}>
          Your BMI
        </h3>
        <p className={styles.value} aria-live="polite" data-testid="bmi-value">
          {bmi != null ? bmi.toFixed(1) : '—'}
        </p>
      </div>
      {bmi == null ? (
        <p className={styles.note}>
          Enter a valid weight and height to calculate your BMI automatically.
        </p>
      ) : isMinor ? (
        <p className={styles.note}>
          Your BMI will be reviewed using age-appropriate guidance by your dietitian.
        </p>
      ) : (
        <p className={styles.note}>Standard adult BMI range: 18.5 – 24.9</p>
      )}
      <p className={styles.disclaimer}>
        BMI is a screening measure and does not determine your overall health. Your dietitian will
        interpret it alongside your health history and other measurements.
      </p>
    </section>
  );
}
