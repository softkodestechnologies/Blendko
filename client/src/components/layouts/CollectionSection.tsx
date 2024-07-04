import Image from 'next/image';
import styles from './CollectionSection.module.css';
import Link from 'next/link';

const CollectionSection = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.itemContainer}>
        <div className={styles.imageWrapper}>
        <Image src="/women-collection.png" alt="Women's Spring Summer 2024" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.textContainer}>
          <h2>NEW COLLECTION</h2>
          <p><Link href="/shop">WOMEN&apos;S SPRING SUMMER 2024</Link></p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.imageWrapper}>
          <Image src="/men-collection.png" alt="Men's Spring Summer 2024" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.textContainer}>
          <h2>NEW COLLECTION</h2>
          <p><Link href="/shop">MEN&apos;S SPRING SUMMER 2024</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
