import { useId, useRef, useState } from 'react';
import { FileText, X } from 'lucide-react';
import styles from './ReportUpload.module.css';

const ACCEPTED = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png' };
const ACCEPTED_EXT = /\.(pdf|jpe?g|png)$/i;
const MAX_BYTES = 5 * 1024 * 1024;

const formatSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * Optional medical report picker. Validates type and size in the browser.
 * The file is NOT uploaded yet (secure storage arrives with the reports module).
 */
export default function ReportUpload({ file, onChange }) {
  const id = useId();
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  const handleSelect = (event) => {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    if (!ACCEPTED[selected.type] || !ACCEPTED_EXT.test(selected.name)) {
      setError('Please choose a PDF, JPG or PNG file.');
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError('This file is larger than 5 MB. Please choose a smaller file.');
      return;
    }
    setError('');
    onChange(selected);
  };

  return (
    <div className={styles.upload}>
      <label htmlFor={id} className={styles.label}>
        Medical reports <span className={styles.optional}>Optional</span>
      </label>
      <p className={styles.hint}>
        PDF, JPG or PNG, up to 5 MB. Online upload isn’t available yet — your file stays on your
        device and your dietitian will ask for it at your consultation.
      </p>

      {file ? (
        <div className={styles.file} data-testid="selected-report">
          <FileText size={18} aria-hidden="true" />
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.fileSize}>{formatSize(file.size)}</span>
          <button
            type="button"
            className={styles.remove}
            onClick={() => onChange(null)}
            aria-label={`Remove ${file.name}`}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button type="button" className={styles.choose} onClick={() => inputRef.current?.click()}>
          Choose a file
        </button>
      )}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="visually-hidden"
        onChange={handleSelect}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
