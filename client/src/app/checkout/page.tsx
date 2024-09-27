"use client";
import React, { useState, useEffect } from 'react';
import { FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './CheckoutPage.module.css';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { RootState } from '@/services/store';
import { useRouter } from 'next/navigation';
import PickupForm from '@/components/checkout/PickupForm';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import PayButton from '@/components/checkout/PayButton'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
console.log("Stripe API Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const CheckoutPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/checkout/auth');
    }
  }, [user, router]);

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
        <button 
          className={`${styles.deliveryButton} ${deliveryOption === 'delivery' ? styles.active : ''}`}
          onClick={() => setDeliveryOption('delivery')}
        >
          <FaTruck /> Delivery
        </button>
        <button 
          className={`${styles.pickupButton} ${deliveryOption === 'pickup' ? styles.active : ''}`}
          onClick={() => setDeliveryOption('pickup')}
        >
          <FaMapMarkerAlt /> Pick-Up
        </button>

        {deliveryOption === 'delivery' ? (
          <DeliveryForm user={user} />
        ) : (
          <PickupForm />
        )}
      </div>

      <div className={styles.paymentSection}>
        <h3>Payment</h3>
        <Elements stripe={stripePromise}>
          <PayButton cartItems={cartItems} userId={user?.id} />
        </Elements>
      </div>
    </div>
  );
};
export default CheckoutPage;
