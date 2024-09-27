'use client';

import { useEffect, useState } from 'react';

import styles from './productDetailsActions.module.css';

import SizeSelection from './SizeSelection';
import ColorSelection from './ColorSelection';
import QuantitySelector from './QuantitySelector';
import useAddToCart from '@/utils/hooks/useAddToCart';
import { CustomizeIcon } from '../../../../../public/svg/icon';
import useReduceCartItems from '@/utils/hooks/useReduceCartItems';

type ProductDetailsProps = {
  sizes: string[];
  colors: string[];
  description: string;
  _id: string;
  name: string;
  quantity: number;
  images: any[];
  price: number;
};

type CartItem = {
  price: number;
  selectedColor: string;
  selectedSize: string;
} & ProductDetailsProps;

function ProductDetailsAction({
  details,
  handleCustomize,
}: {
  details: ProductDetailsProps;
  handleCustomize: () => void;
}) {
  const { addItemToCart } = useAddToCart();
  const { reduceCartItem } = useReduceCartItems();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  useEffect(() => {
    setCartItem({
      quantity: 1,
      _id: details._id,
      name: details.name,
      price: details.price,
      sizes: details.sizes,
      images: details.images,
      colors: details.colors,
      selectedSize: details.sizes[0],
      selectedColor: details.colors[0],
      description: details.description,
    });
  }, [details]);

  const hanleSizeSelection = (size: string) => {
    setCartItem((prev: any) => {
      return { ...prev, selectedSize: size };
    });
  };

  const handleColorSelection = (color: string) => {
    setCartItem((prev: any) => {
      return { ...prev, selectedColor: color };
    });
  };

  const handleAddToCart = () => {
    if (cartItem) {
      addItemToCart(cartItem);
    }
  };

  const handleQuantitySelection = (
    quantity: number,
    type: 'increment' | 'decrement' | 'input'
  ) => {
    setCartItem((prev: any) => {
      if (type === 'increment') {
        return { ...prev, quantity: (prev.quantity || 0) + 1 };
      } else if (type === 'decrement' && prev.quantity > 1) {
        return { ...prev, quantity: prev.quantity - 1 };
      } else if (type === 'input') {
        return { ...prev, quantity };
      }

      return prev;
    });
  };

  return (
    <div className={`${styles.details}`}>
      <p>{details.description}</p>

      <hr className={styles.hr} />

      <div
        role="listbox"
        className={`${styles.color}`}
        aria-labelledby="select_color"
      >
        <h2 id="select_color">Select Color</h2>

        <ColorSelection
          colors={details.colors}
          handleColorSelection={handleColorSelection}
        />
      </div>

      <hr className={styles.hr} />

      <div
        role="listbox"
        className={`${styles.size}`}
        aria-labelledby="choose_size"
      >
        <h2 id="choose_size">Choose Size</h2>

        <SizeSelection
          sizes={details.sizes}
          hanleSizeSelection={hanleSizeSelection}
        />
      </div>

      <hr className={styles.hr} />

      <button
        onClick={handleCustomize}
        className={`full-width flex center ${styles.customizeBtn}`}
      >
        Customize <CustomizeIcon />
      </button>

      <div className={`flex ${styles.add_to_cart}`}>
        <QuantitySelector onChange={handleQuantitySelection} productId={details._id} />

        <button
          className={`full-width ${styles.addToCartButton}`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsAction;