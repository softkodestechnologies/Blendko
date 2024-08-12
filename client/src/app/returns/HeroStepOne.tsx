import Image from 'next/image';
import { StaticImageData } from 'next/image';

import styles from './returns.module.css';

import heroImage1 from '../../../public/return_step_one.jpeg';
import heroImage2 from '../../../public/return_step_two.jpeg';

function HeroStepOne({ step }: { step: number }) {
  const heroImage: StaticImageData = step === 1 ? heroImage1 : heroImage2;

  return (
    <section className={`${styles.hero}`}>
      <div className={`${styles.hero_image}`}>
        <Image
          src={heroImage}
          alt="Return Step 1"
          className="full-height full-width"
        />
      </div>

      <div className={`full-height flex center ${styles.hero_content}`}>
        <h1 className="flex center">RETURNS</h1>
      </div>
    </section>
  );
}

export default HeroStepOne;
