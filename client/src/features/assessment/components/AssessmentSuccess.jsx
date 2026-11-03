import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import styles from './AssessmentSuccess.module.css';

/** Shown only after the server has confirmed the assessment was saved. */
export default function AssessmentSuccess({ result }) {
  const headingRef = useRef(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className={styles.success} role="status">
      <CheckCircle2 size={40} aria-hidden="true" className={styles.icon} />
      <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
        Your nutrition assessment has been submitted successfully.
      </h1>
      <p className={styles.text}>
        Your information will help our dietitian understand your nutrition needs and prepare for
        your consultation.
      </p>
      <dl className={styles.facts}>
        <div>
          <dt>Selected program</dt>
          <dd>{result.program.title}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Submitted</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>{result.id.slice(-8).toUpperCase()}</dd>
        </div>
      </dl>
      <div className={styles.actions}>
        <Button to={`/programs/${result.program.slug}`} withArrow>
          Back to {result.program.title}
        </Button>
        <Button to="/" variant="outline">
          Go to home
        </Button>
      </div>
    </div>
  );
}
