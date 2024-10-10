"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetSingleNewsQuery } from '@/services/newsService';
import styles from './NewsArticle.module.css';

const NewsArticle: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: newsArticle, isLoading, isError } = useGetSingleNewsQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading article</div>;
  if (!newsArticle) return <div>No article found</div>;

  return (
    <div className={styles.articleContainer}>
      <h1 className={styles.articleTitle}>{newsArticle.news.title}</h1>
      <div className={styles.articleMeta}>
        <span className={styles.articleCategory}>{newsArticle.news.category}</span>
        <span className={styles.articleDate}>
          {new Date(newsArticle.news.publishDate).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.articleAuthor}>By {newsArticle.news.author}</div>
      <div className={styles.articleImage}>
        <Image
          src={newsArticle?.news.image.url}
          alt={newsArticle.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: newsArticle.news.content }} />
      
      {newsArticle?.relatedNews && newsArticle.relatedNews.length > 0 ? (
        <div className={styles.relatedNews}>
          <h2>Related News</h2>
          <div className={styles.relatedNewsGrid}>
            {newsArticle.relatedNews.map((relatedItem: any) => (
              <Link href={`/news/${relatedItem._id}`} key={relatedItem._id}>
                <div className={styles.relatedNewsCard}>
                  <div className={styles.relatedNewsImage}>
                    <Image
                      src={relatedItem?.image?.url || '/placeholder-image.jpg'}
                      alt={relatedItem.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3>{relatedItem.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewsArticle;