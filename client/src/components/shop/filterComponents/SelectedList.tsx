'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';
import Accordion from '../../ui/accordion/Accordion';
import { ChevronIcon, Xicon } from '../../../../public/svg/icon';

interface SelectedListProps {
  handleCheckboxChange: (key: string, value: string[]) => void;
  handleSubcategoryChange: (subcategory: string, attribute: string) => void;
  selectedOptions: Record<string, string[]>;
  selectedSubcategories: Record<string, string[]>;
}

const list = {
  'T-shirt': ['Male', 'Female', 'Unisex'],
  Pants: ['Long', 'Short', 'Jeans', 'Chinos'],
  Shoes: ['Sneakers', 'Boots', 'Sandals', 'Slippers'],
  Accessories: ['Hats', 'Bags', 'Socks', 'Watches'],
  '40% or More Off': ['T-shirt', 'Pants', 'Shoes', 'Accessories'],
};

function SelectedList({ handleCheckboxChange, handleSubcategoryChange, selectedOptions, selectedSubcategories }: SelectedListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = (category: string, item: string) => {
    if (Object.keys(list).includes(category)) {
      handleSubcategoryChange(category, item);
    } else {
   
      const updatedOptions = { ...selectedOptions };
      if (updatedOptions[category]?.includes(item)) {
        updatedOptions[category] = updatedOptions[category].filter((i) => i !== item);
      } else {
        updatedOptions[category] = [...(updatedOptions[category] || []), item];
      }
      handleCheckboxChange(category.toLowerCase(), updatedOptions[category]);
    }
  };

  const allSelectedOptions = [
    ...Object.entries(selectedOptions).flatMap(([key, values]) => values.map(value => `${key}: ${value}`)),
    ...Object.entries(selectedSubcategories).flatMap(([key, values]) => values.map(value => `${key}: ${value}`))
  ];

  return (
    <div className={`flex flex-col ${styles.filter_section}`}>
      <div className={`${styles.applied_filters}`}>
        <h3>Applied Filters</h3>
        {allSelectedOptions.length > 0 && (
          <ul className={`flex ${styles.selected_items}`}>
            <AnimatePresence mode="popLayout">
              {allSelectedOptions.map((item) => (
                <motion.li
                  key={item}
                  className="flex center"
                  exit={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <button
                    title="category"
                    type="button"
                    onClick={() => {
                      const [category, value] = item.split(': ');
                      handleSelect(category, value);
                    }}
                  >
                    <Xicon />
                  </button>
                  {item.split(': ')[1]}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <div>
        {Object.entries(list).map(([key, value], index) => (
          <Accordion
            key={key}
            className={styles.accordion}
            toggleOpen={activeIndex === index}
            setToggleOpen={() => setActiveIndex(activeIndex === index ? null : index)}
            head={
              <>
                <span>{key}</span>
                <ChevronIcon />
              </>
            }
            body={
              <ul className={`flex ${styles.options}`}>
                {value.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleSelect(key, item)}
                      className={`${
                        selectedSubcategories[key]?.includes(item) ? styles.selected : ''
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedList;