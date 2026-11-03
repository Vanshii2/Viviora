import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import { contactSchema } from './contact.schema';
import { contactService } from './contact.service';
import styles from './ContactForm.module.css';

const FIELDS = ['name', 'email', 'subject', 'message'];

function Field({ id, label, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error.message}
        </p>
      )}
    </div>
  );
}

/** Contact form: validated in the browser, then sent to POST /api/v1/contact. */
export default function ContactForm({ defaultSubject = '' }) {
  const [submitError, setSubmitError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: defaultSubject, message: '', website: '' },
  });

  const onSubmit = async (values) => {
    setSubmitError('');
    try {
      const result = await contactService.submit(values);
      if (result?.demo) {
        setIsDemo(true); // preview site: nothing was sent — keep the user's text
        return;
      }
      setIsSent(true);
      reset({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      // Map server-side field errors back onto the inputs.
      const details = error.details ?? {};
      FIELDS.forEach((name) => {
        if (details[name]?.[0]) setError(name, { message: details[name][0] });
      });
      setSubmitError(
        error.code === 'VALIDATION_ERROR' ? 'Please check the highlighted fields.' : error.message,
      );
    }
  };

  if (isSent) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={28} aria-hidden="true" className={styles.successIcon} />
        <h2 className={styles.successTitle}>Thank you — your message has been received.</h2>
        <p>We’ll get back to you as soon as possible.</p>
        <Button variant="soft" size="sm" onClick={() => setIsSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    className: styles.input,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    ...register(name),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      <div className={styles.row}>
        <Field id="contact-name" label="Name" error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps('name')} />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={errors.subject}>
        <input type="text" {...fieldProps('subject')} />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea rows={6} {...fieldProps('message')} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div aria-live="assertive">
        {isDemo && (
          <p className={styles.notice}>
            <AlertCircle size={18} aria-hidden="true" />
            <span>
              This is a preview of the website — the contact form isn’t connected here, so your
              message has <strong>not</strong> been sent.
            </span>
          </p>
        )}
        {submitError && (
          <p className={styles.alert}>
            <AlertCircle size={18} aria-hidden="true" />
            <span>{submitError}</span>
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="dark"
        size="lg"
        withArrow
        disabled={isSubmitting}
        className={styles.submit}
      >
        {isSubmitting ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  );
}
