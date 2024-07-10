"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdInbox } from "react-icons/md";
import { BsLayoutTextWindow } from "react-icons/bs";
import {
  IoPersonOutline,
  IoMailOutline,
  IoSettingsOutline,
  IoHeartOutline
} from 'react-icons/io5';
import styles from './User.module.css';

const UserSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: <IoPersonOutline />, text: 'My Blendko Account', path: '/user/account' },
    { icon: <IoMailOutline />, text: 'Inbox', path: '/user/inbox' },
    { icon: <MdInbox />, text: 'Orders', path: '/user/orders' },
    { icon: <IoHeartOutline />, text: 'Favourites', path: '/user/favourites' },
    { icon: <BsLayoutTextWindow />, text: 'Customise templates', path: '/user/templates' },
    { icon: <IoSettingsOutline />, text: 'Settings', path: '/user/settings' },
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