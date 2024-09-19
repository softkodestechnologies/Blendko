import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './FilterNav.module.css';

import Dropdown from '../ui/dropdown/Dropdown';
import { NavFilterIcon } from '../../../public/svg/icon';

interface FilterNavProps {
  menuItems: string[];
  onOpenSidebar: () => void;
  onSearch: (key: string, value: string) => void;
  onSort: (value: string) => void;
  activeIndex: React.SetStateAction<number>;
  setIndex: (index: React.SetStateAction<number>) => void;
  sortBy: string;
}

function FilterNav({
  onSearch,
  onSort,
  setIndex,
  menuItems,
  activeIndex,
  onOpenSidebar,
  sortBy,
}: FilterNavProps) {
  const [activeTab, setActiveTab] = useState(0);
  const clickedSearch = (index: React.SetStateAction<number>, item: string) => {
    setIndex(index);

    if (item === 'Shoes') {
      item = 'Shoe';
    }

    setActiveTab(index);
    onSearch('keyword', item);
  };

  const handleSort = (value: string) => {
    onSort(value.toLowerCase());
  };

  return (
    <header
      className={`full-width flex space-between align-y ${styles.navContainer}`}
    >
      <ul className={`flex align-y ${styles.nav_list}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => clickedSearch(index, item)}
              className={`${activeTab === index ? styles.active : ''}`}
            >
              {item}
            </button>

            {activeTab === index && (
              <motion.span
                layoutId="underline"
                className={`full-width ${styles.underline}`}
              />
            )}
          </li>
        ))}
      </ul>

      <div className={`flex align-y ${styles.action}`}>
        <button
          onClick={onOpenSidebar}
          className={`flex align-y ${styles.toggle_sidebar}`}
        >
          Hide Filter <NavFilterIcon />
        </button>

        <Dropdown
          className={styles.dropdown}
          value={sortBy}
          caption="Sort By"
          onSelect={handleSort}
          optionsList={['Newest', 'Cheapest', 'Popular', 'Expensive']}
        />
      </div>
    </header>
  );
}

export default FilterNav;
