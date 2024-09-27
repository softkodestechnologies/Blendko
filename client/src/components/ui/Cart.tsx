import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import './Cart.css';
import styles from './cart.module.css';

import BackDrop from './BackDrop';
import { CloseIcon, SuccessIcon } from '../../../public/svg/icon';

interface CartProps {
  cartOpen: boolean;
  toggleCart: () => void;
  cartItems: Array<{
    _id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    selectedColor: string;
    selectedSize: string;
    images: Array<{ url: string }>;
  }>;
  onAddToCart: (product: any) => void;
  onDeleteFromCart: (productId: string) => void;
  onReduceCartItem: (productId: string) => void;
}

    function Cart({ cartOpen, toggleCart, cartItems, onAddToCart, 
      onDeleteFromCart, 
      onReduceCartItem  }: CartProps) {

  return (
    <>
      {cartOpen && <BackDrop onClick={toggleCart} style={{ zIndex: 59 }} />}

      {cartOpen && (
        <div
          aria-label="Cart"
          role="dialog"
          aria-hidden="false"
          className={`${styles.cart}`}
        >
          <div className={`flex align-y space-between ${styles.cart_header}`}>
            <h2 className={`flex align-y`}>
              <SuccessIcon /> Added to Bag
            </h2>

            <button
              onClick={toggleCart}
              aria-label="Close cart"
              className={`${styles.cart_close}`}
            >
              <CloseIcon style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          <ul className={`flex flex-col ${styles.cart_items}`}>
            {cartItems.map((item) => (
              <li key={item._id} className={`grid ${styles.cart_item}`}>
                <div className={`flex center ${styles.img}`}>
                  <Image
                    width={70}
                    height={70}
                    alt={item.name}
                    objectFit="cover"
                    src={item.images[0].url}
                  />
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.selectedColor}, {item.selectedSize}
                  </p>
                  <p>Quantity {item.quantity}</p>
                  <b>${item.price}</b>
                </div>
              </li>
            ))}
          </ul>

          <div className={`flex ${styles.cart_actions}`}>
            <Link
              href="/view-bag"
              onClick={toggleCart}
              className={`full-width flex center`}
            >
              View Bag ({cartItems.length})
            </Link>

            <Link href="/checkout/auth" className={`full-width flex center`}>
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
