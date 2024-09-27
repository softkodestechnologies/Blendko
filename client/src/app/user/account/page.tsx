"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import styles from './Account.module.css';
import { RootState } from '@/services/store'; 
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import UserSidebar from '@/components/user/UserSidebar';
import MobileNav from '@/components/user/MobileNav';
import { formatDate } from '@/utils/helpers/dateUtils';

const CustomerPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
      let date = formatDate(user.createdAt);
      setFormattedDate(date);
    }
  }, [user, router]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="container">
        <div className={styles.accountPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <div className={styles.dashboard}>
                    <div className={styles.displayPic}></div>

                    <div className={styles.dashboardData}>
                        <h1> {user?.name}</h1>
                        <p> Blendko Member Since {formattedDate} </p>
                    </div>
                </div>

                <div className={styles.statsContainer}>
                  <div className={styles.stat}>
                      <h3>Points</h3>

                      <div className={styles.statPad}>
                          <div className={styles.statCircle}>
                              <p>{user?.points || 0}</p>
                              <p>Points</p>
                          </div>
                      </div>
                  </div>
                  <div className={styles.stat}>
                      <h3>Wishlist</h3>
                      <div className={styles.statPad}>
                          <div className={styles.statCircle}>
                              <p>{user?.wishlistCount || 0}</p>
                              <p>Items</p>
                          </div>
                      </div>
                  </div>
                  <div className={styles.stat}>
                      <h3>Saved Addresses</h3>

                      <div className={styles.statPad}>
                          <div className={styles.statCircle}>
                              <p>{user?.addressCount || 0}</p>
                              <p>Addresses</p>
                          </div>
                      </div>
                  </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default CustomerPage;