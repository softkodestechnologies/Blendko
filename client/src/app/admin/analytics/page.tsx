"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AnalyticsReports from '@/components/admin/analytics/Analytics';
import styles from '@/components/admin/Admin.module.css';


const AnalyticsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.analyticsContent} container`}>
        <h1>Analytics and Reports</h1>
        <AnalyticsReports />
      </div>
    </div>
  );
};

export default AnalyticsPage;