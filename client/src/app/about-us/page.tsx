import Image from 'next/image';

import styles from './about-us.module.css';

import { Logo } from '../../../public/svg/icon';
import ladyImg from '../../../public/Lady-in-trad.jpg';
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';

export default function About() {
  return (
    <div
        className={`flex flex-col align-y full-width ${styles.main_content}`}
      >
        <h1 className={styles.hero}>About Us</h1>
        <hr />
        <div className={`full-width ${styles.main_content_img}`}>
          <Image
            src={ladyImg}
            alt="about image"
            className={`full-width full-height`}
          />
        </div>

        <span>
          <Logo />
        </span>

        <div className={`flex flex-col ${styles.main_content_text_container}`}>
          <p>
          Blendko is a pioneering fashion brand that bridges Western simplicity and African sophistication, offering an innovative AI-driven platform where customers create personalized, sustainable fashion pieces. Founded on principles of cultural diversity and individual expression, we empower fashion lovers to design unique clothing that celebrates authenticity, craftsmanship, and the transformative power of fashion in connecting global perspectives. </p>
        </div>

        <p>
          We actively seek partnerships with ethical suppliers, artisan communities, and like-minded brands to amplify our mission of cultural appreciation. For partnership inquiries, please contact us at <a href="mailto:partner@blendko.co.uk">partner@blendko.co.uk.</a>
        </p>
      </div>
  );
}
