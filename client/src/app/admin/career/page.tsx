"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CareerComponent from '@/components/admin/career/CareerComponent';
import styles from '@/components/admin/career/Career.module.css';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';

const CareerPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button title="menuButton" onClick={toggleSidebar} className={styles.menuButton}>
            <FaBars />
          </button>
        </header>
        <main className={styles.content}>
          <CareerComponent />
        </main>
      </div>
    </div>
  );
};
export default CareerPage;