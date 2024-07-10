"use client";
import { useState } from 'react';
import styles from './about-us.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';
import ExploreMobileSideBar from '@/components/aside/ExploreMobileSideBar';
import BigLogoSVG from '@/components/layouts/BigLogoSVG';
import Image from 'next/image';
import Link from 'next/link';


export default function About() {

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
      <main>
        <header className={styles.header}>
          <h1 className={styles.header_title}>ABOUT BLENDKO</h1>
          <hr className={styles.header_hr} />
        </header>


        <div className="container">

          <ExploreMobileSideBar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

          <nav className="flex space-between align-y">
            <button onClick={toggleMobileSidebar} className={styles.explore_nav}>
              Explore
            </button>
            <Link className={styles.explore_nav} href="/about-us">About Us</Link>
          </nav>

          <div className={styles.content_container}>
          
            <ExploreSideBar />

            <div className={styles.main_content}>
              <Image 
                src="/Lady-in-trad.png" 
                alt="Blendko lady sitting on a chair" 
                width={561} 
                height={698}
                layout="intrinsic"
                className={styles.main_content_img}
              />
              
              <BigLogoSVG />

              <div className={styles.main_content_text_container}>
                <p className={styles.main_content_text}>The name suggests a connection between the world-renowned </p>
                 <p className={styles.main_content_text}> fashion brand and the vibrant and diverse fashion styles of Africa. </p>
                 <p className={styles.main_content_text}> (African culture and western world fashion).</p>
              </div>
              <p className={styles.main_content_texts}>
              Founded in Florence, Italy, in 1921, Gucci is one of the world&apos;s leading luxury brands. Following the House&apos;s centenary, Gucci forges ahead continuing to redefine luxury while celebrating creativity, Italian craftsmanship, and innovation.</p>
              
              <p className={styles.main_content_texts}>Gucci is part of the global luxury group Kering, which manages renowned Houses in fashion, leather goods, jewelry, and eye-wear.</p>

              <p className={styles.main_content_texts}>Discover the stories behind the House&apos;s collections, exclusively on Stories
              </p>
              
            </div>
          </div>
      </div>
    </main>
    )
}