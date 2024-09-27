'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
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
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const updateCartItems = () => {
      if (user) {
        setCartItems(user.cart);
      } else {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
      }
    };

    updateCartItems();
    window.addEventListener('storage', updateCartItems);

    return () => {
      window.removeEventListener('storage', updateCartItems);
    };
  }, [user]);

  const handleAddToCart = (product: any) => {
    addItemToCart(product);
    updateCartItems();
  };

  const handleDeleteFromCart = (productId: string) => {
    deleteCartItem(productId);
    updateCartItems();
  };

  const handleReduceCartItem = (productId: string) => {
    reduceCartItem(productId);
    updateCartItems();
  };

  const updateCartItems = () => {
    if (user) {
      setCartItems(user.cart);
    } else {
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(updatedCartItems);
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const product = cartItems.find(item => item._id === productId);
    if (product) {
      const quantityDiff = newQuantity - product.quantity;
      if (quantityDiff > 0) {
        for (let i = 0; i < quantityDiff; i++) {
          addItemToCart({ ...product, quantity: 1 });
        }
      } else if (quantityDiff < 0) {
        for (let i = 0; i < Math.abs(quantityDiff); i++) {
          reduceCartItem(productId);
        }
      }
      updateCartItems();
    }
  };


  const handleRemoveItem = (productId: string) => {
    dispatch(deleteItem(productId));
    updateCartItems();  
    console.log('Should remove Cart Item', productId)
  };


  const isLoading = false;

  return (
    <section style={{ marginBottom: '64px' }}>
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
                  <Product 
                  key={item} 
                  product={item} 
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  />
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
