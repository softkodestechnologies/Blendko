"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetNewsQuery } from '@/services/newsService';
import styles from './NewsListing.module.css';

import Resource from '@/components/layouts/resource_links/Resource';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';

export default function NewsListing() {
  const [page, setPage] = useState(1);
  const { data: newsData, isLoading, isFetching, isError } = useGetNewsQuery(page);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading news</div>;

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Resource hero={<ResourceHero caption="BLENDKO, NEWSROOM" />}>
      <ResourceContent>
        <div className={styles.newsListingContainer}>
        {newsData?.news.length > 0 && (
          <section className={styles.featuredNews}>
            <Link href={`/news/${newsData.news[0]._id}`}>
              <div className={styles.featuredNewsCard}>
                <Image
                  src={newsData.news[0].image.url}
                  alt={newsData.news[0].title}
                  width={1200}
                  height={600}
                  layout="responsive"
                />
                <div className={styles.featuredNewsInfo}>
                  <span className={styles.category}>{newsData.news[0].category}</span>
                  <h2 className={styles.title}>{newsData.news[0].title}</h2>
                  <span className={styles.author}>By {newsData.news[0].author}</span>
                  <p className={styles.excerpt}>{newsData.news[0].excerpt}</p>
                  <span className={styles.readMore}>Read more</span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {newsData?.news.length > 1 && (
          <section className={styles.fashionWeek}>
            <h2>NEW YORK FASHION WEEK</h2>
            <div className={styles.fashionWeekGrid}>
              {newsData.news.slice(1, 3).map((newsItem: any) => (
                <Link href={`/news/${newsItem._id}`} key={newsItem._id}>
                  <div className={styles.fashionWeekCard}>
                    <Image
                      src={newsItem.image.url}
                      alt={newsItem.title}
                      width={600}
                      height={400}
                      layout="responsive"
                    />
                    <span className={styles.category}>{newsItem.category}</span>
                    <h3 className={styles.title}>{newsItem.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.mustRead}>
          <h2>MUST READ</h2>
          <div className={styles.mustReadGrid}>
            {newsData?.news.slice(3).map((newsItem: any) => (
              <Link href={`/news/${newsItem._id}`} key={newsItem._id}>
                <div className={styles.mustReadCard}>
                  <Image
                    src={newsItem.image.url}
                    alt={newsItem.title}
                    width={200}
                    height={150}
                  />
                  <div className={styles.mustReadInfo}>
                    <span className={styles.category}>{newsItem.category}</span>
                    <h3 className={styles.title}>{newsItem.title}</h3>
                    <span className={styles.author}>By {newsItem.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {newsData?.news.length % 8 === 0 && (
            <button 
              className={styles.loadMoreButton} 
              onClick={loadMore}
              disabled={isFetching}
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </button>
          )}
        </section>
      </div>
      </ResourceContent>
    </Resource>
  );
}