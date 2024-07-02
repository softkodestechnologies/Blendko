import React from 'react';
import Link from 'next/link';
import styles from './Admin.module.css';
import { FaHome, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaComments, FaPlus, FaList, FaTags, FaPercent, FaUserCog, FaUserShield } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logo}>Blendko</div>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <nav>
        <ul>
          <li><Link href="/admin/dashboard"><FaHome /> Dashboard</Link></li>
          <li><Link href="/admin/orders"><FaShoppingCart /> Orders</Link></li>
          <li><Link href="/admin/customers"><FaUsers /> Customers</Link></li>
          <li><Link href="/admin/analytics"><FaChartBar /> Analytics and Reports</Link></li>
          <li><Link href="/admin/settings"><FaCog /> Settings</Link></li>
          <li><Link href="/admin/chat-support"><FaComments /> Chat Support</Link></li>
          <li className={styles.sectionTitle}>PRODUCTS</li>
          <li><Link href="/admin/products/add"><FaPlus /> Add Products</Link></li>
          <li><Link href="/admin/products"><FaList /> Product List</Link></li>
          <li><Link href="/admin/categories"><FaTags /> Categories</Link></li>
          <li><Link href="/admin/discounts"><FaPercent /> Discounts</Link></li>
          <li className={styles.sectionTitle}>ADMIN</li>
          <li><Link href="/admin/manage"><FaUserCog /> Manage Admins</Link></li>
          <li><Link href="/admin/roles"><FaUserShield /> Admin Roles</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;