'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToCart, incrementQuantity, logOut } from '@/services/userSlice';
import { useAddToCartMutation } from '@/services/userService';
import useAsyncSubmission from './asyncSubmission';

function useAddToCart() {
  const { user } = useSelector((state: any) => state.user);
  const [addToCartMutation, { isLoading, isError: error }] =
    useAddToCartMutation();
  const { isError, handleSubmission } = useAsyncSubmission({
    callback: addToCartMutation,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) document.body.classList.add('action');
    if (!isLoading || error) document.body.classList.remove('action');
  }, [isLoading, error]);

  const addItemToCart = (product: any) => {
    const offLineCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    if (user) {
      const items = offLineCartItems.map((item: any) => item._id);

      handleSubmission(
        [
          ...items,
          {
            _id: product._id,
            quantity: product.quantity,
            size: product.selectedSize,
            color: product.selectedColor,
          },
        ],
        () => {},
        '',
        () => {
          dispatch(addToCart(product) as any);
          localStorage.removeItem('cartItems');
        }
      );

      if (isError) {
        if (
          isError.message === 'jsonWebTokenError' ||
          isError.message === 'TokenExpiredError'
        ) {
          const foundItem = offLineCartItems.find(
            (item: any) => item._id === product._id
          );

          if (foundItem) {
            foundItem.quantity += product.quantity;
            dispatch(incrementQuantity(foundItem));
          } else {
            const newCartItem = { ...product };

            offLineCartItems.push(newCartItem);
          }

          localStorage.setItem('cartItems', JSON.stringify(offLineCartItems));

          dispatch(logOut());
          router.push('/signin');
          return;
        }

        return;
      }
    } else {
      const item = offLineCartItems?.find(
        (item: any) => item._id === product._id
      );

      if (item) {
        item.quantity = product.quantity;

        dispatch(incrementQuantity(item));
      } else {
        const newCartItem = { ...product, quantity: product.quantity };

        offLineCartItems.push(newCartItem);

        dispatch(addToCart(newCartItem) as any);
      }

      localStorage.setItem('cartItems', JSON.stringify(offLineCartItems));
    }
  };

  return { addItemToCart };
}

export default useAddToCart;
