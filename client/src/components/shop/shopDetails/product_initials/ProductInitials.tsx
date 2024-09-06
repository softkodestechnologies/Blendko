import styles from './productInitials.module.css';

import Ratings from './Ratings';

type Product = {
  name: string;
  price: number;
  discount: number;
};

function ProductInitials({
  details,
  className,
}: {
  details: Product;
  className?: string;
}) {
  return (
    <div className={`${styles.product_initials} ${className}`}>
      <h1>{details.name}</h1>

      <div className={`flex align-y ${styles.ratings}`}>
        <Ratings rating={4.5} />{' '}
        <p className="flex align-y">
          4.5/<span>5</span>
        </p>
      </div>

      <div className={`flex align-y ${styles.price}`}>
        <span
          className={styles.currentPrice}
          aria-label={`Current Price: $${(
            details.price -
            (details.price * details.discount) / 100
          ).toFixed(2)}`}
        >
          $
          {(details.price - (details.price * details.discount) / 100).toFixed(
            2
          )}
        </span>
        <span
          className={styles.originalPrice}
          aria-label={`Original Price: $${details.price}`}
        >
          ${details.price}
        </span>
      </div>
    </div>
  );
}

export default ProductInitials;
