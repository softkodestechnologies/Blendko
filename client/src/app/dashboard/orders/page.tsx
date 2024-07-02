"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import OrderTable from '@/components/admin/orders/OrderTable';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';

const OrdersPage: React.FC = () => {
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
          <div className={styles.headerRight}>
            <FaSearch className={styles.headerIcon} />
            <FaBell className={styles.headerIcon} />
            <FaUser className={styles.headerIcon} />
          </div>
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>Order Management</h1>
          <OrderTable />
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;