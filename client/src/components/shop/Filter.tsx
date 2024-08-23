'use client';

import styles from './Filter.module.css';
import { FaSlidersH } from 'react-icons/fa';
import { useState, useCallback } from 'react';

import PriceSlider from './filterComponents/PriceSlider';
import SelectedList from './filterComponents/SelectedList';
import ColorSelection from './filterComponents/ColorSelection';
import SizeFilter from './filterComponents/SizeFilter';
import CollectionFilter from './filterComponents/CollectionFilter';

interface FilterProps {
  onSearch: (key: string, value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onSortChange: (value: string) => void;
  onCheckboxChange: (key: string, value: string[]) => void;
}

type ExpandedSections = {
  categories: boolean;
  price: boolean;
  colors: boolean;
  sizes: boolean;
  dressStyles: boolean;
  brand: boolean;
  fashionCollection: boolean;
};

const Filter: React.FC<FilterProps> = ({
  onSearch,
  onPriceRangeChange,
  onSortChange,
  onCheckboxChange,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const handleCheckboxChange = useCallback(
    (key: string, value: string[]) => {
      onCheckboxChange(key, value);
    },
    [onCheckboxChange]
  );

  return (
    <aside className={styles.sidebar}>
      <div className="flex space-between">
        <h2>Filters</h2>
        <FaSlidersH
          size={25}
          style={{ transform: 'rotate(90deg)', color: 'gray' }}
        />
      </div>

      <SelectedList />
      <PriceSlider />
      <ColorSelection />
      <SizeFilter />
      <CollectionFilter />
    </aside>
  );
};

export default Filter;
