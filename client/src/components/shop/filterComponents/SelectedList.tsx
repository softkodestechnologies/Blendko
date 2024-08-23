'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.css';

import Accordion from '../../ui/accordion/Accordion';
import useSelectOption from '@/utils/hooks/useSelectOption';
import { ChevronIcon, Xicon } from '../../../../public/svg/icon';
const list = {
  'T-shirt': ['Male', 'Female', 'Kids', 'Unisex'],
  Pants: ['Long', 'Short', 'Jeans', 'Chinos'],
  Shoes: ['Sneakers', 'Boots', 'Sandals', 'Slippers'],
  Accessories: ['Hats', 'Bags', 'Socks', 'Watches'],
  '40% or More Off': ['T-shirt', 'Pants', 'Shoes', 'Accessories'],
};

function SelectedList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { handleSelect, selectedOptions } = useSelectOption();

  return (
    <div className={`flex flex-col ${styles.filter_section}`}>
      {
        <div className={`${styles.applied_filters}`}>
          <h3>Applied Filters</h3>

          {selectedOptions.length > 0 && (
            <ul className={`flex ${styles.selected_items}`}>
              <AnimatePresence mode="popLayout">
                {selectedOptions.map((item) => (
                  <motion.li
                    key={item}
                    className="flex center"
                    exit={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <button type="button" onClick={() => handleSelect(item)}>
                      <Xicon />
                    </button>

                    {item}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      }

      <div>
        {Object.entries(list).map(([key, value], index) => {
          return (
            <Accordion
              key={key}
              className={styles.accordion}
              toggleOpen={activeIndex === index}
              setToggleOpen={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
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
                        onClick={() => handleSelect(item)}
                        className={`${
                          selectedOptions.includes(item) ? styles.selected : ''
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectedList;
