import Image from 'next/image';

import styles from './product_side.module.css';

import QuantitySelector from '@/components/shop/shopDetails/product_detail_actions/QuantitySelector';

interface ProductProps {
  product: any;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

function Product({ product, onQuantityChange, onRemove }: ProductProps) {

  const handleQuantitySelection = (quantity: number, type: 'increment' | 'decrement' | 'input') => {
    onQuantityChange(product._id, quantity);
  };
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

          <p className={product.discount > 0 ? styles.lineThrough: ""}>${(product.price * product.quantity).toFixed(2)}</p>
          {product.discount > 0 ? <p>${((product.price * product.quantity) - (product.price * product.quantity) * (product.discount/100)).toFixed(2)}</p>: ""}
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
              productId={product._id}
              className={`${styles.quantity_selector}`}
            />
          </div>

          <button onClick={()=>onRemove(product._id)}>Remove</button>
        </div>
      </div>
    </article>
  );
}

export default Product;
