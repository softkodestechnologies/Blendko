import Link from 'next/link';
import Image from 'next/image';

import styles from './newsroom.module.css';

import Resource from '@/components/layouts/resource_links/Resource';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';

const newsItems = [
  {
    id: 1,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
  {
    id: 2,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
  {
    id: 3,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
  {
    id: 4,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
  {
    id: 5,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
  {
    id: 6,
    title:
      "BLENDKO'S NEW WEARABLE PUMP-COMPATIBLE SPORTS BRA AND EASYON SHOE GIVE MOTHERS MORE SUPPORT",
    date: 'April 23, 2024',
    image: '/lady-in-sports-bra.png',
  },
];

export default function Newsroom() {
  return (
    <Resource hero={<ResourceHero caption="BLENDKO, NEWSROOM" />}>
      <ResourceContent>
        <div className={`grid ${styles.news_grid}`}>
          {newsItems.map((item) => (
            <article
              key={item.id}
              className={styles.news_item}
              aria-labelledby={item.title}
            >
              <Image
                width={300}
                height={400}
                src={item.image}
                alt={item.title}
                layout="responsive"
              />

              <span className={styles.news_link}>Release</span>
              <h3 className={styles.news_title} id={item.title}>
                {item.title}
              </h3>
              <time className={styles.news_date}>{item.date}</time>
            </article>
          ))}
        </div>
      </ResourceContent>
    </Resource>
  );
}
