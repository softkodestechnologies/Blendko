'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styles from './viewBagPage.module.css';
import { deleteItem } from '@/services/userSlice';
import useDeleteCartItem from '@/utils/hooks/useDeleteCartItem';
import useReduceCartItems from '@/utils/hooks/useReduceCartItems';
import useAddToCart from '@/utils/hooks/useAddToCart';

import Header from '@/components/viewBag/product_side/Header';
import Product from '@/components/viewBag/product_side/Product';
import Summary from '@/components/viewBag/product_side/Summary';

const ViewBagPage: React.FC = () => {
  const { deleteCartItem } = useDeleteCartItem();
  const { reduceCartItem } = useReduceCartItems();
  const { addItemToCart } = useAddToCart();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const updateCartItems = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = JSON.parse(
          localStorage.getItem('cartItems') || '[]'
        );

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
    <section>
      <div className={`section_container grid ${styles.cart_grid}`}>
        <>
          {isLoading &&
            Array(3)
              .fill(0)
              .map((_, i) => <p key={i}>loading</p>)}

          {!isLoading && cartItems.length === 0 && (
            <div className={`flex center ${styles.emptyCart}`}>
              <h2>Your cart is empty</h2>
            </div>
          )}
        </>

        {!isLoading && (
          <>
            <div className={`${styles.left}`}>
              <Header />

              <div className={`${styles.cart_items}`}>
                <h2>Cart</h2>

                {cartItems.map((item: any) => (
                  <Product key={item} product={item} />
                ))}
              </div>
            </div>

            <Summary cartItems={cartItems} />
          </>
        )}
      </div>
    </section>
  );
};

export default ViewBagPage;
