import Link from 'next/link';
import Image from 'next/image';

import styles from './product.module.css';

import { Product as P } from '@/utils/types';

function Product({ product, slug }: { product: P; slug: string }) {
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
    </article>
  );
}

export default Product;
