import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { cx } from '../../utils/cx';
import styles from './SmartImage.module.css';

/**
 * Image with graceful fallback: tries `src`, then `fallbackSrc`, then a soft branded placeholder.
 * Lets real photography be dropped into /public/images without code changes.
 */
// Site-relative paths ("/images/…") must respect the deploy base path (e.g. GitHub Pages "/Viviora/").
const withBase = (path) =>
  path?.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

export default function SmartImage({ src, fallbackSrc, alt, className, eager = false }) {
  const sources = [src, fallbackSrc].filter(Boolean).map(withBase);
  const [index, setIndex] = useState(0);
  const current = sources[index];

  if (!current) {
    return (
      <div className={cx(styles.placeholder, className)} role="img" aria-label={alt}>
        <Leaf size={28} strokeWidth={1.25} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      key={current}
      src={current}
      alt={alt}
      className={cx(styles.image, className)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
