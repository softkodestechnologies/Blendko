import styles from './contact-us.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';
import { IoCreateOutline, IoCallOutline, IoStorefrontOutline, IoLocationOutline } from 'react-icons/io5';

export default function ContactUs() {
    return (
    <main>
        <header className={styles.header}>
          <h1 className={styles.header_title}>contact us</h1>
          <hr className={styles.header_hr} />
        </header>

        <div className="container">
          <div className={styles.content_container}>
          
            <ExploreSideBar />

            <div className={styles.main_content}>
                <div className={styles.contactList}>
                  <div className={styles.contactItems}>
                    <IoCreateOutline size={30}/>
                    <h3>Products & Orders</h3>
                    <p>4 am - 11 pm PT<br />7 days a week</p>
                  </div>

                  <div className={styles.contactItems}>
                    <IoCallOutline size={30}/>
                    <h3>Products & Orders</h3>
                    <p>1-903-938-2343<br />7 days a week<br />4 am - 11 pm PT</p>
                  </div>

                  <div className={styles.contactItems}>
                    <IoStorefrontOutline size={30}/>
                    <h3>NRC, NTC & SWOOSH</h3>
                    <p>1-903-938-2343<br />4 am - 11 pm PT<br />Mon - Fri</p>
                  </div>

                  <div className={styles.contactItems}>
                    <IoStorefrontOutline size={30}/>
                    <h3>NRC, NTC & SWOOSH</h3>
                    <p>1-903-938-2343<br />4 am - 11 pm PT<br />Mon - Fri</p>
                  </div>

                  <div className={styles.contactItems}>
                    <IoLocationOutline size={30}/>
                    <h3>Find a Store</h3>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </main>
    )
}