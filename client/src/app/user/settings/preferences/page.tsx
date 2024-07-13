import React from 'react';
import SettingsSidebar from '@/components/user/settings/SettingsSidebar';
import ShopPreferences from '@/components/user/settings/ShopPreferences';
import MobileNav from '@/components/user/MobileNav';
import styles from '@/components/user/User.module.css';

const PreferencePage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <SettingsSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <ShopPreferences />
            </main>
        </div>
    </div>
    
  );
};

export default PreferencePage;