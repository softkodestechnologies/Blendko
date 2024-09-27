"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminManagement from '@/components/admin/management/AdminManagement';
import styles from '@/components/admin/Admin.module.css';


const ManagePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.manageContent} container`}>
        <h1>Admin</h1>
        <AdminManagement />
      </div>
    </div>
  );
};

export default ManagePage;