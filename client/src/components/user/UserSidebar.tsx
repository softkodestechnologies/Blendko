import React from 'react';
import { FaUser, FaInbox, FaClipboardList, FaHeart, FaPalette, FaCog } from 'react-icons/fa';
import styles from './User.module.css';

const UserSidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li><FaUser /> My Blendko Account</li>
          <li className={styles.active}><FaInbox /> Inbox</li>
          <li><FaClipboardList /> Orders</li>
          <li><FaHeart /> Favourites</li>
          <li><FaPalette /> Customise templates</li>
          <li><FaCog /> Settings</li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;