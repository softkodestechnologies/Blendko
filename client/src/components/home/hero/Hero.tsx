import Link from 'next/link';
import Image from 'next/image';

import styles from './hero.module.css';

import heroImage from '../../../../public/blendko_hero.png';

function Hero() {
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.hero_wrapper}`}>
        <div className={`full-height full-width ${styles.img}`}>
          <Image
            src={heroImage}
            placeholder="blur"
            alt="Blendko hero image"
            className="full-width full-height"
          />
        </div>

        <div className={`full-height flex flex-col center ${styles.hero_content}`}>
          <h1>Style it the way you like it</h1>

          <p>
            Transform your wardrobe with our intuitive customization tools.
            Select fabrics and add personal touches to craft your dream outfit!
          </p>

          <Link href="/shop" className='flex center'>Start Customising</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
