"use client";
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileNav}>
      <FaBars onClick={() => setOpen(!open)} />
      {open && (
        <div className={styles.navMenu}>
          <h2>Filters</h2>
          {/* Add mobile navigation controls here */}
          <h2>This should show now</h2>
        </div>
      )}
    </div>
  );
}
