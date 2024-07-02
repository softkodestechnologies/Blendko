"use client";
import React, { useState, useEffect } from 'react';
import { FaTruck, FaMapMarkerAlt, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import styles from './CheckoutPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

const CheckoutPage: React.FC = () => {
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
    <div className={styles.checkoutContainer}>
      <h2>Delivery Options</h2>
      <div className={styles.bagSummary}>
        <h3>In Your Bag<span className={styles.edit}><Link href="/view-bag">Edit</Link></span></h3>
        <p>Subtotal:<span className={styles.price}> ${(cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)).toFixed(2)}</span></p>
        <p>Estimated delivery <span className={styles.price}>$0.00</span></p>
        <p className={styles.total}>Total: <span className={styles.price}>${(cartItems.reduce((acc: number, item: any) => acc + (item.price - (item.price * item.discount || 0) / 100) * item.quantity, 0)).toFixed(2)}</span></p>

        <div className={styles.cartItems}>
            {isLoading && Array(3).fill(0).map((_, i) => <p key={i}>loading</p>)}
            {!isLoading && cartItems.length === 0 && (
              <div className={`flex center ${styles.emptyCart}`}>
                <h2>Your cart is empty</h2>
              </div>
            )}
            {!isLoading && cartItems.map((item: any) => (
              <div key={item._id} className={styles.productInfo}>
                <Image src={item.images[0].url} className={styles.productImage} alt="product" width={100} height={100} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description.slice(0, 40)}...</p>
                </div>
              </div>
            ))}
          </div>


      </div>
      <div className={styles.deliveryOptions}>
        <button className={styles.deliveryButton}><FaTruck /> Delivery</button>
        <button className={styles.pickupButton}><FaMapMarkerAlt /> Pick-Up</button>
        <input 
          type="text" 
          placeholder="Start typing address" 
          className={styles.addressInput}
        />
        <p className={styles.hint}>Using a specific location such as a home address or postcode will get the most accurate results.</p>
        <button className={styles.continueButton}>Save & Continue</button>
      </div>
      <div className={styles.additionalSections}>
        <h3>Payment</h3>
        <h3>Order Review</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;
