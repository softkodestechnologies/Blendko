"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToCart, incrementQuantity, logOut } from '@/services/userSlice';
import { useAddToCartMutation } from '@/services/userService';
import useAsyncSubmission from './asyncSubmission';

function useAddToCart() {
  const { user } = useSelector((state: any) => state.user);
  const [addToCartMutation, { isLoading, isError: error }] = useAddToCartMutation();
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
    console.log("Adding item to cart:", product);

    const offLineCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log("Offline cart items before:", offLineCartItems);

    if (user) {
      const items = offLineCartItems.map((item: any) => item._id);

      handleSubmission(
        [...items, product._id],
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
            foundItem.quantity += 1;
            dispatch(incrementQuantity(foundItem));
          } else {
            const newCartItem = { ...product, quantity: 1 };
            offLineCartItems.push(newCartItem);
          }

          localStorage.setItem('cartItems', JSON.stringify(offLineCartItems));
          console.log("Offline cart items after error handling:", offLineCartItems);

          dispatch(logOut());
          router.push('/signin');
          return;
        }

        //  do something with the error
        return;
      }
    } else {
      console.log("User not logged in, adding to local storage.");
      const item = offLineCartItems?.find((item: any) => item._id === product._id);

      if (item) {
        item.quantity += 1;
        dispatch(incrementQuantity(item));
        console.log("Incremented quantity of existing item:", item);
      } else {
        const newCartItem = { ...product, quantity: 1 };
        offLineCartItems.push(newCartItem);
        dispatch(addToCart(newCartItem) as any);
        console.log("Added new item to cart:", newCartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(offLineCartItems));
      console.log("Offline cart items after addition:", offLineCartItems);
    }
  };

  return { addItemToCart };
}

export default useAddToCart;
