"use client";
import { useState, useEffect } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import styles from './SpaoOuterWeek.module.css';

const SpaoOuterWeek = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container">
      <hr className={styles.spaoRule}/>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};

export default SpaoOuterWeek;