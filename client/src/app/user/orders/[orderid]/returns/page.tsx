import React from 'react';
import UserSidebar from '@/components/user/UserSidebar';
import styles from '@/components/user/User.module.css';
import MobileNav from '@/components/user/MobileNav';
import OrderReturn from '@/components/user/orders/OrderReturn';

const OrderReturnPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <OrderReturn />
            </main>
        </div>
    </div>
  );
};

export default OrderReturnPage;