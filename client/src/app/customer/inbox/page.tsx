import React from 'react';
import UserSidebar from '@/components/user/UserSidebar';
import InboxMessages from '@/components/user/InboxMessages';
import SavedItems from '@/components/user/SavedItems';
import MobileNav from '@/components/user/MobileNav';
import styles from '@/components/user/User.module.css';

const InboxPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <InboxMessages />
                <SavedItems />
            </main>
        </div>
    </div>
    
  );
};

export default InboxPage;