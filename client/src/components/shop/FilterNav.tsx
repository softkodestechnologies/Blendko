import React, { useState } from 'react';
import styles from './FilterNav.module.css';

interface FilterNavProps {
  onSearch: (key: string, value: string) => void;
  menuItems: string[];
  activeIndex: React.SetStateAction<number>;
  setIndex: (index: React.SetStateAction<number>) => void;
}

const FilterNav: React.FC<FilterNavProps> = ({
  onSearch,
  menuItems,
  activeIndex,
  setIndex,
}) => {
  const clickedSearch = (index: React.SetStateAction<number>, item: string) => {
    setIndex(index);

    if (item === 'Shoes') {
      item = 'Shoe';
    }
    onSearch('keyword', item);
  };

  return (
    <div className={styles.navContainer}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`${styles.navItem} ${
            activeIndex === index ? styles.active : ''
          }`}
          onClick={() => clickedSearch(index, item)}
        >
          {item}
          {
            <div
              className={styles.underline}
              style={{ transform: `translateX(${activeIndex}%)` }}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default FilterNav;
