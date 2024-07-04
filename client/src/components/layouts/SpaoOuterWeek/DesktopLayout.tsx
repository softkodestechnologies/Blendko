import Image from 'next/image';
import Link from 'next/link';
import styles from './SpaoOuterWeek.module.css';

const DesktopLayout = () => {
  return (
    <section className={styles.spaoOuterWeek}>
      <div className={styles.section1}>
        <Image 
          src="/woman-patterned-outfit.png" 
          alt="Woman in colorful outfit" 
          width={334} 
          height={448} 
          layout="responsive"
        />
        <span className={styles.overlayText}>SPAO <br /> OUTER <br /> WEEK</span>
      </div>
      
      <div className={styles.section2}>
        <span className={styles.number}>01</span>
        <Image 
          src="/smiling-woman.png" 
          alt="Woman smiling" 
          width={220} 
          height={326} 
          layout="responsive"
        />
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.topRight}>
          <Image 
            src="/woman-sunglasses.png" 
            alt="Woman with sunglasses" 
            layout="fill" 
            objectFit="cover"
          />
          <span className={styles.rotatedText}>Suits for <br/> women</span>
        </div>
        
        <div className={styles.centerLeft}>
          <Image 
            src="/woman-side-profile.png" 
            alt="Woman with yellow sunglasses" 
            width={210} 
            height={326} 
            layout="responsive"
          />
          <span className={styles.rotatedTextLeft}>Spao for Men</span>
          <div className={styles.bottomText}>
            <p className={styles.bottomOuter}>OUTER</p>
            <p>Spao for Women</p>
          </div>
        </div>
        
        <div className={styles.bottomRight}>
          <Image 
            src="/hand-with-rings.png" 
            alt="Hands with rings" 
            layout="fill" 
            objectFit="cover"
          />
          <Link href="/shop">
            <button className={styles.shopNowButton}>SHOP NOW</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DesktopLayout;