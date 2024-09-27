'use client';

import { useState, useEffect } from 'react';
import { updateCartItemQuantity } from '@/services/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './productDetailsActions.module.css';
import { RootState } from '@/services/store';
import { AddIcon, MinusIcon } from '../../../../../public/svg/icon';

interface QuantitySelectorProps {
  productId: string;
  className?: string;
}

function QuantitySelector({ productId, className }: QuantitySelectorProps) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => 
    state.user.cart.find(item => item._id === productId)
  );
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 1);
  }, [cartItem]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === '') {
      setQuantity(0);
      return;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      setQuantity(1);
      dispatch(updateCartItemQuantity({ productId, quantity: 1 }));
      return;
    }

    const newQuantity = parsedValue < 1 ? 1 : parsedValue;

    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleInputBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
      dispatch(updateCartItemQuantity({ productId, quantity: 1 }));
    }
  };

  return (
    <div className={`grid align-y ${styles.quantity_selector} ${className || ''}`}>
      <button
        type="button"
        onClick={decreaseQuantity}
        aria-label="Reduce quantity"
        className="flex center full-height"
      >
        <MinusIcon />
      </button>
      <input
        type="text"
        value={quantity}
        aria-label="Quantity"
        onChange={handleChange}
        onBlur={handleInputBlur}
        className="full-width full-height"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={increaseQuantity}
        className="flex center full-height"
      >
        <AddIcon />
      </button>
    </div>
  );
}

export default QuantitySelector;