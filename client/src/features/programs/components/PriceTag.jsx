import { formatPrice } from '../../../utils/format';
import { cx } from '../../../utils/cx';
import styles from './PriceTag.module.css';

/** Program price with the regular price struck through and the saving written underneath. */
export default function PriceTag({
  price,
  compareAtPrice,
  discountPercent,
  size = 'md',
  className,
}) {
  if (price == null) return <p className={cx(styles.soon, className)}>Pricing coming soon</p>;

  return (
    <div className={cx(styles.tag, styles[size], className)}>
      <p className={styles.row}>
        <span className={styles.price}>{formatPrice(price)}</span>
        {compareAtPrice != null && (
          <s className={styles.compare}>
            <span className="visually-hidden">Regular price </span>
            {formatPrice(compareAtPrice)}
          </s>
        )}
      </p>
      {discountPercent != null && (
        <p className={styles.saving}>
          You save {formatPrice(compareAtPrice - price)} ({discountPercent}% off)
        </p>
      )}
    </div>
  );
}
