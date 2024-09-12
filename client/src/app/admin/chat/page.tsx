"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ChatSupport from '@/components/admin/chat/ChatSupport';
import styles from '@/components/admin/Admin.module.css';

const ChatSupportPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.chatSupportContent} container`}>
        <h1 className={styles.chatHeader}>Chat Support</h1>
        <ChatSupport />
      </div>
    </div>
  );
};

export default ChatSupportPage;