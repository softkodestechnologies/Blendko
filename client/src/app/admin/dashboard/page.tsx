"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Dashboard from '@/components/admin/dashboard/Dashboard';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';


const DashboardPage: React.FC = () => {
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
        <h1>Dashboard</h1>
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;