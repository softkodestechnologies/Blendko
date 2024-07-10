"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './User.module.css';

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { text: 'My Blendko Account', path: '/user/account' },
    { text: 'Inbox', path: '/user/inbox' },
    { text: 'Orders', path: '/user/orders' },
    { text: 'Favourites', path: '/user/favourites' },
    { text: 'Customise templates', path: '/user/templates' },
    { text: 'Settings', path: '/user/settings' },
  ];

  return (
    <aside className={styles.mobileNav}>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.path} 
              className={pathname.startsWith(item.path) ? styles.active : ''}
            >
              <Link href={item.path}>
               {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MobileNav;