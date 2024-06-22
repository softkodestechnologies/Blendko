"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styles from './viewBagPage.module.css';
import { deleteItem } from '@/services/userSlice';
import useDeleteCartItem from '@/utils/hooks/useDeleteCartItem';
import useReduceCartItems from '@/utils/hooks/useReduceCartItems';
import useAddToCart from '@/utils/hooks/useAddToCart';

const ViewBagPage: React.FC = () => {
  const { deleteCartItem } = useDeleteCartItem();
  const { reduceCartItem } = useReduceCartItems();
  const { addItemToCart } = useAddToCart();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const updateCartItems = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
      }
    };

    updateCartItems();
    window.addEventListener('storage', updateCartItems);

    return () => {
      window.removeEventListener('storage', updateCartItems);
    };
  }, []);

  const isLoading = false; 

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.freeDelivery}>Free Delivery for Members.</h1>
        <p className={styles.tagline}>Become a Blendko member to get fast and free delivery. <Link href="/join">Join us</Link> or <Link href="/signin">Sign in</Link></p>
      </header>
      <div className={styles.main}>
        <section className={styles.cartSection}>
          <h2 className={styles.cartTitle}>Bag</h2>
          <div className={styles.cartItems}>
            {isLoading && Array(3).fill(0).map((_, i) => <p key={i}>loading</p>)}
            {!isLoading && cartItems.length === 0 && (
              <div className={`flex center ${styles.emptyCart}`}>
                <h2>Your cart is empty</h2>
              </div>
            )}
            {!isLoading && cartItems.map((item: any) => (
              <div key={item._id} className={styles.cartItem}>
                <Image src={item.images[0].url} alt="product" width={100} height={100} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>{item.description.slice(0, 40)}...</p>
                  <button
                    onClick={() => {
                      dispatch(deleteItem(item._id) as any);
                      deleteCartItem(item._id);
                      setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
                    }}
                    aria-label="Remove from cart"
                  >
                    Remove
                  </button>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => {
                        reduceCartItem(item._id);
                        setCartItems(cartItems.map(cartItem =>
                          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                        ));
                      }}
                      aria-label="Reduce quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        addItemToCart(item);
                        setCartItems(cartItems.map(cartItem =>
                          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                        ));
                      }}
                      aria-label="Add quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.price}>${(item.price - (item.price * item.discount || 0) / 100).toFixed(2)}</p>
                  <p className={styles.total}>Total: ${(item.quantity * (item.price - (item.price * item.discount || 0) / 100)).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.summary}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          <div className={styles.summaryDetails}>
            <p>Subtotal: ${(cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)).toFixed(2)}</p>
            <p>Estimated delivery & Handling: Free</p>
            <h3>Total: ${(cartItems.reduce((acc: number, item: any) => acc + (item.price - (item.price * item.discount || 0) / 100) * item.quantity, 0)).toFixed(2)}</h3>
          </div>
          <button className={styles.checkoutButton}>Checkout</button>
          <button className={styles.paypalButton}>PayPal</button>
        </section>
      </div>
      <RecommendationSection items={recommendationItems} />
    </div>
  );
};

const recommendationItems = [
  {
    id: 1,
    imageSrc: '/picture.png',
    altText: 'Polo with Contrast Trims',
    title: 'Polo with Contrast Trims',
    price: '$212'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 3,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 4,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
];

const RecommendationSection: React.FC<{ items: typeof recommendationItems }> = ({ items }) => {
  return (
    <section className={styles.recommendations}>
      <h2 className={styles.recommendations_title}>You might also like</h2>
      <div className={styles.recommendationItems}>
        {items.map(item => (
          <div key={item.id} className={styles.recommendationItem}>
            <Image src={item.imageSrc} alt={item.altText} width={200} height={200} />
            <div className={styles.recommendationDetails}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewBagPage;
