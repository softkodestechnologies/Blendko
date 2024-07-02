import React from 'react';
import { FaUser, FaInbox, FaClipboardList, FaHeart, FaCog } from 'react-icons/fa';
import styles from './User.module.css';

const MobileNav: React.FC = () => {
  return (
    <nav className={styles.mobileNav}>
      <ul>
        <li><FaUser />My Blendko Account</li>
        <li className={styles.active}>Inbox</li>
        <li>Orders</li>
        <li>Favourites</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
};

export default MobileNav;