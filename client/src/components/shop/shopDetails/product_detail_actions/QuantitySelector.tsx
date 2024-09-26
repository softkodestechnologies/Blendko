'use client';

import { useState, useEffect } from 'react';

import styles from './productDetailsActions.module.css';

import { AddIcon, MinusIcon } from '../../../../../public/svg/icon';

interface QuantitySelectorProps {
  className?: string;
  handleQuantitySelection: (
    quantity: number,
    type: 'increment' | 'decrement' | 'input'
  ) => void;
  initialQuantity?: number;
}

function QuantitySelector({
  className,
  handleQuantitySelection,
  initialQuantity = 1,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleQuantitySelection(newQuantity, 'decrement');
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantitySelection(newQuantity, 'increment');
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
      handleQuantitySelection(1, 'input');
      return;
    }

    const newQuantity = parsedValue < 1 ? 1 : parsedValue;

    setQuantity(newQuantity);
    handleQuantitySelection(newQuantity, 'input');
  };

  const handleInputBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
      handleQuantitySelection(1, 'input');
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