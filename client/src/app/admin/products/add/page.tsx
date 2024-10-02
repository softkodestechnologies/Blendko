"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AddNewProduct from '@/components/admin/products/AddNewProduct';
import styles from '@/components/admin/Admin.module.css';


const OrdersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Pending');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.content} container`}>
        <AddNewProduct />
      </div>
    </div>
  );
};

export default OrdersPage;