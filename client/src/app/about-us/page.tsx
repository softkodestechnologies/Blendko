import styles from './about-us.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';
import BigLogoSVG from '@/components/layouts/BigLogoSVG';
import Image from 'next/image';
export default function About() {
    return (
      <main>
        <header className={styles.header}>
          <h1 className={styles.header_title}>ABOUT BLENDKO</h1>
          <hr className={styles.header_hr} />
        </header>

        <div className="container">
          <div className={styles.content_container}>
          
            <ExploreSideBar />

            <div className={styles.main_content}>
              <Image 
              src="/Lady-in-trad.png" 
              alt="Blendko lady sitting on a chair" 
              width={561} 
              height={698}
              className={styles.main_content_img}
              />

              <BigLogoSVG />

              <div className={styles.main_content_text_container}>
                <p className={styles.main_content_text}>The name suggests a connection between the world-renowned 
                  fashion brand and the vibrant and diverse fashion styles of Africa. 
                  (African culture and western world fashion).
                </p>
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