"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
// import NewsList from '@/components/admin/news/NewsList';
import styles from '@/components/admin/Admin.module.css';
import dynamic from 'next/dynamic';
const NewsList = dynamic(() => import('@/components/admin/news/NewsList'), { ssr: false });

const NewsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.analyticsContent} container`}>
        <NewsList />
      </div>
    </div>
  );
};

export default NewsPage;