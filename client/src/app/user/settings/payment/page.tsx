import React from 'react';
import SettingsSidebar from '@/components/user/settings/SettingsSidebar';
import PaymentMethods from '@/components/user/settings/PaymentMethods';
import MobileNav from '@/components/user/MobileNav';
import styles from '@/components/user/User.module.css';

const PaymentPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <SettingsSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <PaymentMethods />
            </main>
        </div>
    </div>
    
  );
};

export default PaymentPage;