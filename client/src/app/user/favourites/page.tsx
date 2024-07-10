import React from 'react';
import UserSidebar from '@/components/user/UserSidebar';
import SavedItems from '@/components/user/SavedItems';
import MobileNav from '@/components/user/MobileNav';
import styles from './Favourites.module.css';

const FavouritesPage: React.FC = () => {
  return (
    <div className="container">
        <div className={styles.favPage}>
            <UserSidebar />
            <MobileNav />
            <main className={styles.mainContent}>
                <SavedItems />
            </main>
        </div>
    </div>
    
  );
};

export default FavouritesPage;