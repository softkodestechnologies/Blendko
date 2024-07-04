import Image from 'next/image';
import styles from './SpaoOuterWeek.module.css';

const MobileLayout = () => {
  return (
    <section className={styles.mobileSpaoOuterWeek}>
      <h2 className={styles.mobileHeader}>SPAO OUTER WEEK</h2>
      <div className={styles.mobileImageContainer}>
        <div className={styles.mobileImage}>
          <Image 
            src="/woman-patterned-outfit.png" 
            alt="Woman in colorful outfit" 
            layout="fill" /* Use layout fill to make the image fill the container */
          />
        </div>
        <div className={styles.mobileImage}>
          <Image 
            src="/woman-side-profile.png" 
            alt="Woman with sunglasses" 
            layout="fill" /* Use layout fill to make the image fill the container */
          />
        </div>
      </div>
    </section>
  );
};

export default MobileLayout;