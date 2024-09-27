"use client";
import React, { useState } from 'react';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '@/services/userService';
import WishlistItem from './WishlistItem';
import styles from './User.module.css';

const SavedItems: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: wishlistData, isLoading, error, refetch } = useGetWishlistQuery({});
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  return (
    <section className={styles.savedItems}>
      <div className={styles.header}>
        <h2>Saved Items</h2>
        {wishlistData?.wishlist.length !== 0? <div onClick={toggleEdit} className={styles.editLink}>
          {isEditing ? 'Done' : 'Edit'}
        </div>: ''}
      </div>
      <div className={styles.itemsGrid}>
        {wishlistData?.wishlist.map((item) => (
          <WishlistItem
            key={item._id}
            item={item}
            isEditing={isEditing}
            onRemove={handleRemoveFromWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default SavedItems;