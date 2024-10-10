import React from 'react';
import Link from 'next/link';
import styles from './Admin.module.css';
import { usePathname } from 'next/navigation';
import { FaHome, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaComments, FaPlus, FaList, FaTags, FaPercent, FaUserCog, FaUserShield } from 'react-icons/fa';
import {adminDashboardIcon, adminOrdersIcon, adminCustomersIcon, adminAnalyticsIcon, adminSettingsIcon, careerIcon, NewsAdminIcon, adminChatSupportIcon, adminAddProductsIcon, adminProductListIcon, adminCategoriesIcon, adminDiscountsIcon, manageAdminsIcon, adminRolesIcon } from '../../../public/svg/icon';
import Sidebar from '@/components/customization/Sidebar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname(); 

  const menuItemsOne = [
    { icon: adminDashboardIcon, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: adminOrdersIcon, text: 'Orders', path: '/admin/orders' },
    { icon: adminCustomersIcon, text: 'Customers', path: '/admin/customers' },
    { icon: adminAnalyticsIcon, text: 'Analytics and Reports', path: '/admin/analytics' },
    { icon: adminSettingsIcon, text: 'Customise templates', path: '/admin/settings' },
    { icon: careerIcon, text: 'Career', path: '/admin/career' },
    { icon: NewsAdminIcon, text: 'News', path: '/admin/news' },
    { icon: adminChatSupportIcon, text: 'Chat Support', path: '/admin/chat' },
  ];

  const menuItemsTwo = [
    { icon: adminAddProductsIcon, text: 'Add Products', path: '/admin/products/add' },
    { icon: adminProductListIcon, text: 'Product List', path: '/admin/products/list' },
    { icon: adminCategoriesIcon, text: 'Categories', path: '/admin/products/categories' },
    { icon: adminDiscountsIcon, text: 'Discounts', path: '/admin/products/discounts' },
  ];

  const menuItemsThree = [
    { icon: manageAdminsIcon, text: 'Manage Admins', path: '/admin/manage' },
    { icon: adminRolesIcon, text: 'Admin Roles', path: '/admin/roles' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/*<div className={styles.logo}>Blendko</div>*/}
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <nav>
        <ul>
          {menuItemsOne.map((item) => (
            <li 
              key={item.path} 
              className={pathname.startsWith(item.path) ? styles.sidebarActive : ''}
            >
              <Link href={item.path}>
                {item.icon()} {item.text}
              </Link>
            </li>
          ))}
          <li className={styles.sectionTitle}>PRODUCTS</li>
            {menuItemsTwo.map((item) => (
              <li
                key={item.path}
                className={pathname.startsWith(item.path) ? styles.sidebarActive : ''}
              >
                <Link href={item.path}>
                  {item.icon()} {item.text}
                </Link>
              </li>
            ))}
          <li className={styles.sectionTitle}>ADMIN</li>
          {menuItemsThree.map((item) => (
              <li
                key={item.path}
                className={pathname.startsWith(item.path) ? styles.SidebarActive : ''}
              >
                <Link href={item.path}>
                  {item.icon()} {item.text}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};
export default AdminSidebar;