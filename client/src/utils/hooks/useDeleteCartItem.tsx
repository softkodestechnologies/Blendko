// src/utils/hooks/useDeleteCartItem.ts

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useRemoveFromCartMutation } from '@/services/userService';
import asyncSubmission from './asyncSubmission';
import { deleteItem } from '@/services/userSlice';

const useDeleteCartItem = () => {
  const { user } = useSelector((state: any) => state.user);
  const [removeFromCartMutation, { isLoading, isError: error }] = useRemoveFromCartMutation();
  const { isError, handleSubmission } = asyncSubmission({ callback: removeFromCartMutation });
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteCartItem = (productId: string) => {
    const offLineCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const foundItem = offLineCartItems.find((item: any) => item._id === productId);

    const newCartItems = offLineCartItems.filter((item: any) => item._id !== productId);

    if (user) {
      handleSubmission(
        productId,
        () => {},
        '',
        () => {
          dispatch(deleteItem(productId) as any);
        }
      );

      if (isError) {
        if (isError.message == 'jsonWebTokenError' || isError.message == 'TokenExpiredError') {
          if (!foundItem) return;

          localStorage.setItem('cartItems', JSON.stringify(newCartItems));

          dispatch(deleteItem(productId) as any);
          router.push('/signin');
          return;
        }
      }

      localStorage.removeItem('cartItems');
    } else {
      if (!foundItem) return;

      localStorage.setItem('cartItems', JSON.stringify(newCartItems));

      dispatch(deleteItem(productId) as any);
    }
  };

  useEffect(() => {
    if (isLoading) document.body.classList.add('action');
    if (!isLoading || error) document.body.classList.remove('action');
  }, [isLoading]);

  return { deleteCartItem };
};

export default useDeleteCartItem;
