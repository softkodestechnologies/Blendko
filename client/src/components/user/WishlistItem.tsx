import React from 'react';
import Image from 'next/image';
import { useWishlist } from '@/utils/hooks/useWishlist';
import styles from './User.module.css'; 

interface WishlistItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      images: { url: string }[];
      price: number;
      ratings: number;
    };
  };
  isEditing: boolean;
  onRemove: (productId: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, isEditing, onRemove }) => {
  const { product } = item;
  const { isWishlisted, toggleWishlist } = useWishlist(product._id, true);

  const handleRemove = () => {
    onRemove(product._id);
    toggleWishlist();
  };

  return (
    <div className={styles.wishlistItem}>
      <div className={styles.imageContainer}>
        <Image 
          src={product.images[0].url} 
          alt={product.name} 
          width={200} 
          height={200}
          className={styles.productImage}
        />
      </div>
      <div>
        <h3>{product.name}</h3>
        <div className={styles.rating}>
          {'★'.repeat(Math.round(product.ratings))}{'☆'.repeat(5 - Math.round(product.ratings))}
          <span className={styles.ratingValue}> {product.ratings.toFixed(1)}/5</span>
        </div>
        <p className={styles.price}>
          <span className={styles.salePrice}>${product.price.toFixed(2)}</span>
        </p>
      </div>
      {isEditing && (
        <button
          onClick={handleRemove}
          className={styles.removeButton}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default WishlistItem;