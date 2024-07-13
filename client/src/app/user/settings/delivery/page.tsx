import React from 'react';
import SettingsSidebar from '@/components/user/settings/SettingsSidebar';
import DeliveryAddresses from '@/components/user/settings/DeliveryAddresses';
import MobileNav from '@/components/user/MobileNav';
import styles from '@/components/user/User.module.css';

const DeliveryPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <SettingsSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <DeliveryAddresses />
            </main>
        </div>
    </div>
    
  );
};

export default DeliveryPage;