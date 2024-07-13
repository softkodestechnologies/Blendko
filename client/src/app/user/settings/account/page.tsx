import React from 'react';
import SettingsSidebar from '@/components/user/settings/SettingsSidebar';
import AccountDetails from '@/components/user/settings/AccountDetails';
import MobileNav from '@/components/user/MobileNav';
import styles from '@/components/user/User.module.css';

const AccountPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <SettingsSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <AccountDetails />
            </main>
        </div>
    </div>
    
  );
};

export default AccountPage;