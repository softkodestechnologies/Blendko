"use client";
import React from 'react';
import Link from 'next/link';
import styles from './Settings.module.css';
import { usePathname } from 'next/navigation';
import { IoPersonOutline, IoCardOutline, IoLocationOutline, IoStorefrontOutline } from 'react-icons/io5';

const SettingsSidebar: React.FC = () => {
  const pathname = usePathname();
  const menuItems = [
    { icon: <IoPersonOutline />, text: 'Account Details', path: '/user/settings/account' },
    { icon: <IoCardOutline />, text: 'Payment Methods', path: '/user/settings/payment' },
    { icon: <IoLocationOutline />, text: 'Delivery Addresses', path: '/user/settings/delivery' },
    { icon: <IoStorefrontOutline />, text: 'Shop Preferences', path: '/user/settings/preferences' },
  ];

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsSidebar}>
        <h2>Settings</h2>
        <ul>
          {menuItems.map((item) => (
              <li 
                key={item.path} 
                className={pathname.startsWith(item.path) ? styles.active : ''}
              >
                <Link href={item.path}>
                  {item.icon} {item.text}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.settingsContent}>
      </div>
    </div>
  );
};

export default SettingsSidebar;