import styles from './reviews.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';

export default function Reviews() {
    return (
    <main>
        <header className={styles.header}>
          <h1 className={styles.header_title}>Ratings and Reviews</h1>
          <hr className={styles.header_hr} />
        </header>

        <div className="container">
          <div className={styles.content_container}>
          
            <ExploreSideBar />

            <div className={styles.main_content}>
              <p>
                
              </p>
            </div>
          </div>
        </div>
    </main>
    )
}