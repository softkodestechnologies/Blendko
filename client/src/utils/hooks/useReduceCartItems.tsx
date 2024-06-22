"use client"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { useReduceCartItemMutation } from '@/services/userService';
import asyncSubmission from './asyncSubmission';
import { decrementQuantity } from '@/services/userSlice';

function useReduceCartItems() {
  const { user } = useSelector((state: any) => state.user);
  const [reduceCartItemMutation, { isLoading, isError: error }] =
    useReduceCartItemMutation();
  const { isError, handleSubmission } = asyncSubmission({
    callback: reduceCartItemMutation,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) document.body.classList.add('action');
    if (!isLoading || error) document.body.classList.remove('action');
  }, [isLoading]);

  const reduceCartItem = (productId: string) => {
    const offLineCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    const foundItem = offLineCartItems.find(
      (item: any) => item._id === productId
    );

    if (user) {
      handleSubmission(
        productId,
        () => {},
        '',
        () => {
          dispatch(decrementQuantity(productId) as any);
        }
      );

      if (isError) {
        if (
          isError.message == 'jsonWebTokenError' ||
          isError.message == 'TokenExpiredError'
        ) {
          if (!foundItem) return;

          foundItem.quantity -= 1;

          localStorage.setItem(
            'cartItems',
            JSON.stringify([...offLineCartItems.filter((item: any) => item._id !== productId), foundItem])
          );

          dispatch(decrementQuantity(productId) as any);
          router.push('/signin');
          return;
        }
      }

      localStorage.removeItem('cartItems');
    } else {
      if (!foundItem) return;

      foundItem.quantity -= 1;

      localStorage.setItem(
        'cartItems',
        JSON.stringify([...offLineCartItems.filter((item: any) => item._id !== productId), foundItem])
      );

      dispatch(decrementQuantity(productId) as any);
    }
  };

  return { reduceCartItem };
}

export default useReduceCartItems;
