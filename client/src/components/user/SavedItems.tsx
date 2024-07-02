import React from 'react';
import styles from './User.module.css';
import Image from 'next/image';

const SavedItems: React.FC = () => {
  return (
    <section className={styles.savedItems}>
      <h2>Saved Items</h2>
      <div className={styles.editLink}>Edit</div>
      <div className={styles.itemsGrid}>
        <div className={styles.item}>
          <Image src="/people.png" alt="Polo with Contrast Trims" width={200} height={200} />
          <h3>Polo with Contrast Trims</h3>
          <div className={styles.rating}>★★★★☆ 4.0/5</div>
          <p className={styles.price}>
            <span className={styles.salePrice}>$212</span>
            <span className={styles.originalPrice}>$242</span>
            <span className={styles.discount}>-12%</span>
          </p>
        </div>
        {/* Repeat the above item div for the other 3 items */}
      </div>
    </section>
  );
};

export default SavedItems;