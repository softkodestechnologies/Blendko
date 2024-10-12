"use client";
import React, { useState, useEffect } from 'react';
import { useGetNewsQuery, useDeleteNewsMutation } from '@/services/newsService';
import styles from './NewsStyles.module.css';

import NewsForm from './NewsForm';
const NewsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data, error, isLoading } = useGetNewsQuery(page);
  const [deleteNews] = useDeleteNewsMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async (id: string) => {
    if (isMounted && confirm('Are you sure you want to delete this news?')) {
      await deleteNews(id);
    }
  };


  const handleCreate = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleUpdate = (news: any) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  if (!isMounted) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className={styles.newsListContainer}>
      <h1>News Management</h1>
      <button onClick={handleCreate} className={styles.createButton}>Create News</button>
      <table className={styles.newsTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Publish Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.news.map((news: any) => (
            <tr key={news._id}>
              <td>{news.title}</td>
              <td>{news.author}</td>
              <td>{news.category}</td>
              <td>{new Date(news.publishDate).toLocaleDateString()}</td>
              <td>{news.status}</td>
              <td>
                <button onClick={() => handleUpdate(news)} className={styles.updateButton}>Update</button>
                <button onClick={() => handleDelete(news._id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={!data?.hasNextPage}>Next</button>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <NewsForm news={selectedNews} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;