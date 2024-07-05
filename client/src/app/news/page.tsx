"use client";
import { useState } from 'react';
import styles from './newsroom.module.css';
import ExploreSideBar from '@/components/aside/ExploreSideBar';
import ExploreMobileSideBar from '@/components/aside/ExploreMobileSideBar';
import Image from 'next/image';
import Link from 'next/link';

export default function Newsroom() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const newsItems = [
      {
        id: 1,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
      {
        id: 2,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
      {
        id: 3,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
      {
        id: 4,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
      {
        id: 5,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
      {
        id: 6,
        title: "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
        date: "April 23, 2024",
        image: "/lady-in-sports-bra.png"
      },
    ];

    return (
      <main>
        <header className={styles.header}>
          <h1 className={styles.header_title}>BLENDKO, NEWSROOM</h1>
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
              <div className={styles.news_grid}>
                {newsItems.map((item) => (
                  <div key={item.id} className={styles.news_item}>
                    <Image 
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={400}
                      layout="responsive"
                    />
                    <h3 className={styles.news_title}>{item.title}</h3>
                    <p className={styles.news_date}>{item.date}</p>
                    <Link href="#" className={styles.news_link}>Release</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}