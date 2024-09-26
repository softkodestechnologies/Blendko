import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/utils/hooks/useWishlist';
import { useSelector } from 'react-redux';
import styles from './product.module.css';
import { WishlistIconTag } from '../../../public/svg/icon';
import { Product as P } from '@/utils/types';
import { RootState } from '@/services/store'; 
import useAddToCart from '@/utils/hooks/useAddToCart';

function Product({ product, slug }: { product: P; slug: string; }) {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!user;
  const { isWishlisted, toggleWishlist } = useWishlist(product._id, isAuthenticated);
  const { addItemToCart } = useAddToCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addItemToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0], 
      selectedColor: product.colors[0], 
    });
    setTimeout(() => setIsAddingToCart(false), 1000); 
  };

  return (
    <article className={`full-width grid ${styles.product_item}`}>
        <div
          className={`full-width ful-height flex center ${styles.image_container}`}
        >
           <Link href={slug}>
              <Image
                width={130}
                height={130}
                alt={product.description}
                src={product.images[0].url}
              />
            </Link>
          <button
            title="wishlistBtn"
            onClick={toggleWishlist}
            className={`${styles.wishlist_button} ${isWishlisted ? styles.wishlisted : ''}`}
          >
            <WishlistIconTag />
          </button>
        </div>

        <div className={`${styles.product_details}`}>
          <h3>{product.name}</h3>

          <p>
            {`${product.colors.length} colour${
              product.colors.length > 1 ? 's' : ''
            }`}
          </p>

          <span aria-label="product price">${product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart} 
          disabled={isAddingToCart}
          className={styles.add_to_cart_button}>
          {isAddingToCart ? 'Adding...' : 'Add to cart'}
        </button>
    </article>
  );
}

export default Product;