'use client';

import { useState } from 'react';

import styles from './productDetailsActions.module.css';

function SizeSelection({
  sizes,
  hanleSizeSelection,
}: {
  sizes: string[];
  hanleSizeSelection: (size: string) => void;
}) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleSizeSelection = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize('');
    }

    setSelectedSize(size);
    hanleSizeSelection(size);
  };

  return (
    <ul className={`flex align-y ${styles.size_list}`}>
      {sizes.map((size: string, index: number) => (
        <li key={index}>
          <button
            className={`${styles.sizeButton} ${
              selectedSize === size ? styles.active : ''
            }`}
            onClick={() => handleSizeSelection(size)}
          >
            {size}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SizeSelection;
