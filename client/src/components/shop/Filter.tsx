'use client';

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

import styles from './Filter.module.css';

import { FilterIcon } from '../../../public/svg/icon';
import PriceSlider from './filterComponents/PriceSlider';
import SelectedList from './filterComponents/SelectedList';
import ColorSelection from './filterComponents/ColorSelection';
import SizeFilter from './filterComponents/SizeFilter';
import CollectionFilter from './filterComponents/CollectionFilter';

interface FilterProps {
  className?: string;
  onSearch: (key: string, value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onSortChange: (value: string) => void;
  onCheckboxChange: (key: string, value: string[]) => void;
}

function Filter({
  onSearch,
  className,
  onPriceRangeChange,
  onSortChange,
  onCheckboxChange,
}: FilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const handleCheckboxChange = useCallback(
    (key: string, value: string[]) => {
      onCheckboxChange(key, value);
    },
    [onCheckboxChange]
  );

  return (
    <motion.aside
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: '-100%', opacity: 0 }}
      className={`${styles.sidebar} ${className}`}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      exit={{
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.3, delay: 0.2 },
      }}
    >
      <div className={`flex space-between align-y ${styles.header}`}>
        <h2>Filters</h2>

        <FilterIcon />
      </div>

      <SelectedList />
      <PriceSlider />
      <ColorSelection handleCheckboxChange={handleCheckboxChange} />
      <SizeFilter handleCheckboxChange={handleCheckboxChange} />
      <CollectionFilter />
    </motion.aside>
  );
}

export default Filter;
