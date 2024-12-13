import React, { useState } from 'react';
import styles from './Sizes.module.css';
import SizeGuideTable from './SizeGuideTable';

interface SizeSelectorProps {
  onSizeSelect: (size: string) => void;
  selectedSize: string | null;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ onSizeSelect, selectedSize }) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const sizes = [
    { label: 'S', price: 'EUR 400' },
    { label: 'M', price: 'EUR 400' },
    { label: 'L', price: 'EUR 400' },
    { label: 'XL', price: 'EUR 400' },
    { label: '2XL', price: 'EUR 400' }
  ];

  return (
    <div className={styles.sizeSelectorContainer}>
      <div className={styles.selectAllContainer}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} />
          <span>Select All</span>
        </label>
      </div>
      
      <div className={styles.sizeOptions}>
        {sizes.map(({ label, price }) => (
          <label key={label} className={styles.sizeOption}>
            <input
              type="radio"
              name="size"
              value={label}
              checked={selectedSize === label}
              onChange={() => onSizeSelect(label)}
              className={styles.radio}
            />
            <span className={styles.sizeLabel}>{label}</span>
            <span className={styles.price}>{price}</span>
          </label>
        ))}
      </div>

      <button 
        className={styles.sizeGuideButton}
        onClick={() => setShowSizeGuide(!showSizeGuide)}
      >
        Size guide
      </button>

      {showSizeGuide && <SizeGuideTable />}
    </div>
  );
};

export default SizeSelector;