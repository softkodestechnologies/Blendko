import React from 'react';
import UserSidebar from '@/components/user/UserSidebar';
import styles from '@/components/user/User.module.css';
import MobileNav from '@/components/user/MobileNav';
import OrderDetails from '@/components/user/orders/OrderDetails';

const OrderDetailsPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.inboxPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <OrderDetails />
            </main>
        </div>
    </div>
    
  );
};

export default OrderDetailsPage;