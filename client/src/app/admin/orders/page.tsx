"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import OrderTable from '@/components/admin/orders/OrderTable';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';

const OrdersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Pending');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const tabs = ['Pending', 'Confirmed', 'Processing', 'Picked', 'Shipped', 'Delivered', 'Cancelled', 'View All'];

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
          <h1 className={styles.title}>Order Management</h1>
          <div className={styles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by order id"
              className={styles.searchInput}
            />
            <button  title="search" className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
          <OrderTable />
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;