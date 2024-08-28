import Image from 'next/image';

import styles from './careerdetails.module.css';

import careerImage from '../../../../public/careerdetails.jpeg';

function Hero() {
  return (
    <section className={`${styles.career_details_hero}`}>
      <div className={`${styles.img}`}>
        <Image
          alt="career"
          src={careerImage}
          className="full-width full-height"
        />
      </div>

      <div
        className={`full-height full-width section_container flex flex-col align-x ${styles.career_hero}`}
      >
        <div className={`${styles.career_caption}`}>
          <span>Design</span>

          <h1>
            SENIOR DIRECTOR, PRODUCT DESIGN, APPAREL DESIGN EXCELLENCE - GLOBAL
            JORDAN
          </h1>
        </div>

        <div className={`flex space-between align-y ${styles.action}`}>
          <p>Remote | UK</p>

          <button>APPLY NOW</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
