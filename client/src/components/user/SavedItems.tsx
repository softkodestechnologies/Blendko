import React from 'react';
import styles from './User.module.css';
import Image from 'next/image';

const SavedItems: React.FC = () => {
  const savedItems = [
    {
      src: '/people.png',
      alt: 'Polo with Contrast Trims',
      name: 'Polo with Contrast Trims',
      rating: '★★★★☆ 4.0/5',
      salePrice: '$212',
      originalPrice: '$242',
      discount: '-12%',
    },
    {
      src: '/people.png',
      alt: 'Polo with Contrast Trims',
      name: 'Polo with Contrast Trims',
      rating: '★★★★☆ 4.0/5',
      salePrice: '$212',
      originalPrice: '$242',
      discount: '-12%',
    },
    {
      src: '/people.png',
      alt: 'Polo with Contrast Trims',
      name: 'Polo with Contrast Trims',
      rating: '★★★★☆ 4.0/5',
      salePrice: '$212',
      originalPrice: '$242',
      discount: '-12%',
    },
    {
      src: '/people.png',
      alt: 'Polo with Contrast Trims',
      name: 'Polo with Contrast Trims',
      rating: '★★★★☆ 4.0/5',
      salePrice: '$212',
      originalPrice: '$242',
      discount: '-12%',
    },
  ];

  return (
    <section className={styles.savedItems}>
      <h2>Saved Items</h2>
      <div className={styles.editLink}>Edit</div>
      <div className={styles.itemsGrid}>
        {savedItems.map((item, index) => (
          <div key={index} className={styles.item}>
            <Image src={item.src} alt={item.alt} width={200} height={200} />
            <h3>{item.name}</h3>
            <div className={styles.rating}>{item.rating}</div>
            <p className={styles.price}>
              <span className={styles.salePrice}>{item.salePrice}</span>
              <span className={styles.originalPrice}>{item.originalPrice}</span>
              <span className={styles.discount}>{item.discount}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedItems;
