import React from 'react';
import UserSidebar from '@/components/user/UserSidebar';
import styles from '@/components/user/User.module.css';
import MobileNav from '@/components/user/MobileNav';
import OrdersView from '@/components/user/orders/OrdersView';

const OrderPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <OrdersView />
            </main>
        </div>
    </div>
    
  );
};

export default OrderPage;