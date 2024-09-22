"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductList from '@/components/admin/products/ProductList';
import styles from '@/components/admin/Admin.module.css';


const OrdersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.content} container`}>
        <h1>Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default OrdersPage;