"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CustomerTable from '@/components/admin/customers/CustomerTable';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';

const CustomersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.content} container`}>
        <header className={styles.header}>
          <button type="button" title="bars" className={styles.menuButton} onClick={toggleSidebar}>
            <FaBars />
          </button>
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>Customers</h1>
          <CustomerTable />
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;