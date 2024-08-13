'use client';

import Image from 'next/image';
import { useState } from 'react';

import styles from './about-us.module.css';

import { Logo } from '../../../public/svg/icon';
import ladyImg from '../../../public/Lady-in-trad.png';
import BigLogoSVG from '@/components/layouts/BigLogoSVG';
import Resource from '@/components/layouts/resource_links/Resource';

export default function About() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <Resource
      hero={
        <section className={`flex center ${styles.hero}`}>
          <h1 className={styles.header_title}>ABOUT BLENDKO</h1>
        </section>
      }
    >
      <div
        className={`flex flex-col align-y full-width ${styles.main_content}`}
      >
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
          <p>The name suggests a connection between the world-renowned.</p>

          <p>
            fashion brand and the vibrant and diverse fashion styles of Africa.
          </p>

          <p>(African culture and western world fashion).</p>
        </div>

        <p>
          Founded in Florence, Italy, in 1921, Gucci is one of the world's
          leading luxury brands. Following the House's centenary, Gucci forges
          ahead continuing to redefine luxury while celebrating creativity,
          Italian craftsmanship, and innovation.
        </p>

        <p>
          Gucci is part of the global luxury group Kering, which manages
          renowned Houses in fashion, leather goods, jewelry, and eye-wear.
        </p>

        <p>
          Discover the stories behind the House&apos;s collections, exclusively
          on Stories
        </p>
      </div>
    </Resource>
  );
}
