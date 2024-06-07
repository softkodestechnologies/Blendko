import React, { useState } from 'react';
import { useLoginMutation } from '@/services/blendkoAPI';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '@/services/userSlice';
import { setCart } from '@/services/cartSlice';
import { useAddToCartMutation } from '@/services/blendkoAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const [addToCartMutation] = useAddToCartMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const { token, user } = response;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(loginAction(user._id));
      dispatch(setCart(user.cart));

      // Synchronize local cart with server cart
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        const cartItems = JSON.parse(localCart);
        const addCartItemsPromises = cartItems.map((item: any) => addToCartMutation(item));
        await Promise.all(addCartItemsPromises);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isLoading}>Login</button>
    </form>
  );
};

export default Login;
