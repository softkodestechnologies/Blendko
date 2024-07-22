"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DiscountTable from '@/components/admin/discounts/DiscountTable';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch, FaPlus } from 'react-icons/fa';

const DiscountsPage: React.FC = () => {
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
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Discounts</h1>
            <button className={styles.createButton}>
              <FaPlus /> Create Coupon
            </button>
          </div>
          <div className={styles.tabContainer}>
            <button className={`${styles.tabButton} ${styles.activeTab}`}>All Coupons</button>
            <button className={styles.tabButton}>Active Coupons</button>
            <button className={styles.tabButton}>Expired Coupons</button>
          </div>
          <div className={styles.searchContainer}>
            <select title="filterSelect" className={styles.filterSelect}>
              <option>Filter</option>
              {/* Add filter options */}
            </select>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
            <button title="search" className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
          <DiscountTable />
        </main>
      </div>
    </div>
  );
};

export default DiscountsPage;