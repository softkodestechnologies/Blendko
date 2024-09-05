'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';

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
  onSubcategoryChange: (subcategory: string, attribute: string) => void;
}

function Filter({
  onSearch,
  className,
  onPriceRangeChange,
  onSortChange,
  onCheckboxChange,
  onSubcategoryChange,
}: FilterProps) {

  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    fashion_collection: []
  });
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});

  const handleCheckboxChange = useCallback(
    (key: string, value: string[]) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: value }));
      onCheckboxChange(key, value);
    },
    [onCheckboxChange]
  );

  const handleSubcategoryChange = useCallback(
    (subcategory: string, attribute: string) => {
      setSelectedSubcategories((prev) => {
        const updatedSubcategory = prev[subcategory] ? 
          prev[subcategory].includes(attribute) ?
            prev[subcategory].filter(attr => attr !== attribute) :
            [...prev[subcategory], attribute] :
          [attribute];
        
        return { ...prev, [subcategory]: updatedSubcategory };
      });
      onSubcategoryChange(subcategory, attribute);
    },
    [onSubcategoryChange]
  );

  const handlePriceRange = useCallback(
    (value: [number, number]) => {
      setPriceRange(value);
      onPriceRangeChange(value);
    },
    [onPriceRangeChange]
  );

  const handleAttributeChange = useCallback(
    (key: string, value: string) => {
      setSelectedOptions((prev) => {
        if (prev[key]) {
          if (prev[key].includes(value)) {
            return {
              ...prev,
              [key]: prev[key].filter((item) => item !== value),
            };
          } else {
            return { ...prev, [key]: [...prev[key], value] };
          }
        } else {
          return { ...prev, [key]: [value] };
        }
      });
      onSearch(key, value);
    },
    [onSearch]
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

      <SelectedList 
        handleCheckboxChange={handleCheckboxChange}
        handleSubcategoryChange={handleSubcategoryChange}
        selectedOptions={selectedOptions}
        selectedSubcategories={selectedSubcategories}
      />
      <PriceSlider handlePriceRange={handlePriceRange} priceRange={priceRange}/>
      <ColorSelection  handleCheckboxChange={handleCheckboxChange}
        selectedColors={selectedOptions.colors || []} />
      <SizeFilter handleCheckboxChange={handleCheckboxChange} selectedSizes={selectedOptions.sizes || []}  />
      <CollectionFilter handleCheckboxChange={handleCheckboxChange} selectedCollections={selectedOptions.fashion_collection || []}/>
    </motion.aside>
  );
}

export default Filter;
