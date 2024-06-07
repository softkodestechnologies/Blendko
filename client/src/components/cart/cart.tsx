import React, { useEffect } from 'react';
import { useGetCartQuery, useAddToCartMutation } from '@/services/blendkoAPI';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/services/store';
import { setCart } from '@/services/cartSlice';

const Cart = () => {
  const { data: cartData, error } = useGetCartQuery();
  const [addToCartMutation] = useAddToCartMutation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        const cartItems = JSON.parse(localCart);
        const addCartItemsPromises = cartItems.map((item: any) => addToCartMutation(item));
        Promise.all(addCartItemsPromises).then(() => {
          localStorage.removeItem('cart');
        });
      }
    }
  }, [user.isLoggedIn, addToCartMutation]);

  useEffect(() => {
    if (cartData) {
      dispatch(setCart(cartData.cart));
    }
  }, [cartData, dispatch]);

  if (error) {
    return <div>Error loading cart</div>;
  }

  return (
    <div>
      {/* Render cart items */}
    </div>
  );
};

export default Cart;

