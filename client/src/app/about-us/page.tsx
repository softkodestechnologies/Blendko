import styles from './about-us.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';
export default function About() {
    return (
      <section className="container">
      <header className={styles.header}>
        <h1 className={styles.header_title}>About Us</h1>
        <hr className={styles.header_hr} />
      </header>
      <div className={styles.content_container}>

        <ExploreSideBar />

        <div className={styles.main_content}>
          <h2 className={styles.main_content_title}>About Text</h2>
          <p className={styles.main_content_text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
        </div>
      </div>
    </section>
    )
}