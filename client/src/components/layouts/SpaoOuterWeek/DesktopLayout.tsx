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
            {/* <button className={styles.shopNowButton}>SHOP NOW</button> */}
              <div className={styles.button}>
                <div className={styles.buttonWrapper}>
                  <div className={styles.text}>Shop Now</div>
                    <span className={styles.icon}>
                    <svg viewBox="0 0 16 16" className={`${styles.bi} ${styles.biCart2}`} fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                    </svg>
                  </span>
                </div>
              </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DesktopLayout;