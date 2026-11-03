import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cx } from '../../../utils/cx';
import styles from './fields.module.css';

const getPath = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

function Label({ htmlFor, as: Tag = 'label', required, optional, children, id }) {
  return (
    <Tag htmlFor={Tag === 'label' ? htmlFor : undefined} id={id} className={styles.label}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          {' '}
          *
        </span>
      )}
      {required && <span className="visually-hidden"> (required)</span>}
      {optional && <span className={styles.optional}>Optional</span>}
    </Tag>
  );
}

function useFieldError(name) {
  const {
    formState: { errors },
  } = useFormContext();
  return getPath(errors, name)?.message;
}

function Hint({ id, children }) {
  return children ? (
    <p id={id} className={styles.hint}>
      {children}
    </p>
  ) : null;
}

function ErrorText({ id, message }) {
  return message ? (
    <p id={id} className={styles.error}>
      {message}
    </p>
  ) : null;
}

/** Text / email / tel / number input. */
export function TextField({ name, label, required, hint, suffix, className, ...inputProps }) {
  const { register } = useFormContext();
  const id = useId();
  const error = useFieldError(name);
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={id} required={required} optional={!required}>
        {label}
      </Label>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <div className={cx(styles.inputWrap, suffix && styles.hasSuffix)}>
        <input
          id={id}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          {...inputProps}
          {...register(name)}
        />
        {suffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextAreaField({ name, label, required, hint, rows = 3, className, placeholder }) {
  const { register } = useFormContext();
  const id = useId();
  const error = useFieldError(name);
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={id} required={required} optional={!required}>
        {label}
      </Label>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <textarea
        id={id}
        rows={rows}
        maxLength={1000}
        placeholder={placeholder}
        className={styles.input}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...register(name)}
      />
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({ name, label, options, required, hint, className }) {
  const { register } = useFormContext();
  const id = useId();
  const error = useFieldError(name);
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={id} required={required} optional={!required}>
        {label}
      </Label>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <select
        id={id}
        className={cx(styles.input, styles.select)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...register(name)}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

/**
 * Choice pills. multiple=false → radio buttons (single); multiple=true → checkboxes.
 * `exclusive` values (e.g. "None") clear other selections and vice versa.
 */
export function ChoiceField({
  name,
  label,
  options,
  required,
  hint,
  multiple = false,
  exclusive = [],
  className,
}) {
  const { control } = useFormContext();
  const id = useId();
  const error = useFieldError(name);
  const type = multiple ? 'checkbox' : 'radio';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = multiple ? (field.value ?? []) : field.value;
        const toggle = (value) => {
          if (!multiple) return field.onChange(value);
          if (selected.includes(value)) return field.onChange(selected.filter((v) => v !== value));
          if (exclusive.includes(value)) return field.onChange([value]);
          return field.onChange([...selected.filter((v) => !exclusive.includes(v)), value]);
        };
        return (
          <fieldset
            className={cx(styles.field, styles.fieldset, className)}
            aria-describedby={
              [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
            }
            aria-invalid={error ? true : undefined}
          >
            <Label as="legend" required={required} optional={!required}>
              {label}
            </Label>
            <Hint id={`${id}-hint`}>{hint}</Hint>
            <div className={styles.pills}>
              {options.map((opt) => {
                const checked = multiple ? selected.includes(opt.value) : selected === opt.value;
                return (
                  <label key={opt.value} className={cx(styles.pill, checked && styles.pillChecked)}>
                    <input
                      type={type}
                      name={`${name}-${id}`}
                      value={opt.value}
                      checked={checked}
                      onChange={() => toggle(opt.value)}
                      onBlur={field.onBlur}
                      className={styles.pillInput}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
            <ErrorText id={`${id}-error`} message={error} />
          </fieldset>
        );
      }}
    />
  );
}

/** A titled group of related questions (e.g. conditional or program-specific). */
export function QuestionGroup({ title, description, children, tone = 'plain' }) {
  return (
    <section className={cx(styles.group, styles[tone])}>
      {title && <h3 className={styles.groupTitle}>{title}</h3>}
      {description && <p className={styles.groupDescription}>{description}</p>}
      <div className={styles.groupBody}>{children}</div>
    </section>
  );
}

export function FieldRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}
