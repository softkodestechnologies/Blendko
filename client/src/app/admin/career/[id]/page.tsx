"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AllApplicationsComponent from '@/components/admin/career/AllApplicationsComponent';
import styles from '@/components/admin/career/Career.module.css';
import { FaBars } from 'react-icons/fa';

const JobApplicationsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const jobId = params.id as string;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button onClick={toggleSidebar} className={styles.menuButton} aria-label="Toggle Sidebar">
            <FaBars />
          </button>
        </header>
        <main className={styles.content}>
          <AllApplicationsComponent jobId={jobId} />
        </main>
      </div>
    </div>
  );
};export default JobApplicationsPage;