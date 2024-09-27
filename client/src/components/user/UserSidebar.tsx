"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {UserIcon, InboxIcon, WishlistIcon, OrderIcon, CustomizeTemplatesIcon, SettingsIcon } from '../../../public/svg/icon';
import styles from './User.module.css';

const UserSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: <UserIcon />, text: 'My Blendko Account', path: '/user/account' },
    { icon: <InboxIcon />, text: 'Inbox', path: '/user/inbox' },
    { icon: <OrderIcon />, text: 'Orders', path: '/user/orders' },
    { icon: <WishlistIcon />, text: 'Favourites', path: '/user/favourites' },
    { icon: <CustomizeTemplatesIcon />, text: 'Customise templates', path: '/customize' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/user/settings/account' },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav>
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
      </nav>
    </aside>
  );
};

export default UserSidebar;