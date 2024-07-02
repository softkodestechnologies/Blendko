"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import styles from './customer.module.css';
import { RootState } from '@/services/store'; 
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

const CustomerPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <h1>Welcome, {user?.name}</h1>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <h3>Points</h3>
            <p>{user?.points || 0}</p>
          </div>
          <div className={styles.stat}>
            <h3>Wishlist</h3>
            <p>{user?.wishlistCount || 0} items</p>
          </div>
          <div className={styles.stat}>
            <h3>Saved Addresses</h3>
            <p>{user?.addressCount || 0}</p>
          </div>
        </div>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default CustomerPage;
