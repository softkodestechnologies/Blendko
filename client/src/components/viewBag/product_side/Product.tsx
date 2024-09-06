import Image from 'next/image';

import styles from './product_side.module.css';

import QuantitySelector from '@/components/shop/shopDetails/product_detail_actions/QuantitySelector';

function Product({ product }: { product: any }) {
  return (
    <article
      aria-labelledby={product.name}
      className={`grid ${styles.product}`}
    >
      <div className={`full-width full-height flex center ${styles.img}`}>
        <Image
          width={85}
          height={85}
          alt="product"
          src={product.images[0].url}
        />
      </div>

      <div className="flex flex-col">
        <div className={`flex space-between ${styles.product_highlights}`}>
          <h3 id={product.name}>{product.name}</h3>

          <p>${product.price * product.quantity}</p>
        </div>

        <div className={`flex align-y ${styles.product_sub_highlights}`}>
          <p>{product.selectedColor}</p>

          <p>{product.selectedSize}</p>
        </div>

        <div className={`flex space-between ${styles.action}`}>
          <div
            aria-label="select quantity"
            className={`flex align-y ${styles.quantity}`}
          >
            <p>Quantity</p>

            <QuantitySelector
              handleQuantitySelection={() => {}}
              className={`${styles.quantity_selector}`}
            />
          </div>

          <button>Remove</button>
        </div>
      </div>
    </article>
  );
}

export default Product;
