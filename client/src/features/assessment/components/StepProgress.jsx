import { cx } from '../../../utils/cx';
import styles from './StepProgress.module.css';

export default function StepProgress({ steps, current }) {
  const percent = Math.round(((current + 1) / steps.length) * 100);
  return (
    <div className={styles.progress}>
      <div className={styles.meta}>
        <span>
          Step {current + 1} of {steps.length} · <strong>{steps[current].label}</strong>
        </span>
        <span>{percent}%</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.bar} style={{ width: `${percent}%` }} />
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cx(index < current && styles.done, index === current && styles.current)}
            aria-current={index === current ? 'step' : undefined}
          >
            {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
