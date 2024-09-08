import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/utils/hooks/useWishlist';
import { useSelector } from 'react-redux';
import styles from './product.module.css';

import { Product as P } from '@/utils/types';
import { RootState } from '@/services/store'; 

function Product({ product, slug }: { product: P; slug: string; }) {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!user;
  const { isWishlisted, toggleWishlist } = useWishlist(product._id, isAuthenticated);

  return (
    <article className={`full-width grid ${styles.product_item}`}>
      <Link href={slug}>
        <div
          className={`full-width ful-height flex center ${styles.image_container}`}
        >
          <Image
            width={130}
            height={130}
            alt={product.description}
            src={product.images[0].url}
          />
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
      </Link>
      <button onClick={toggleWishlist} className={styles.wishlist_button}>
        {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      </button>
    </article>
  );
}

export default Product;