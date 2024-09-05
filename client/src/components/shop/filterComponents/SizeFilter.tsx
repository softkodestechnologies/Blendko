'use client';

import { useState } from 'react';

import styles from './styles.module.css';

import useSelectOption from '@/utils/hooks/useSelectOption';
import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon } from '../../../../public/svg/icon';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface SizeFilterProps {
  handleCheckboxChange: (key: string, value: string[]) => void;
  selectedSizes: string[];
}

function SizeFilter({ handleCheckboxChange, selectedSizes }: SizeFilterProps) {
  const [expanded, setExpanded] = useState(true);

  const handleSelect = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    handleCheckboxChange('sizes', updatedSizes);
  };

  return (
    <Accordion
      toggleOpen={expanded}
      setToggleOpen={() => setExpanded(!expanded)}
      className={styles.sidebar_filter}
      head={
        <>
          <span>Sizes</span>

          <ChevronIcon />
        </>
      }
      body={
        <ul className={`flex ${styles.options} ${styles.list_option}`}>
          {sizes.map((size) => (
            <li key={size}>
              <button
                type="button"
                onClick={() => handleSelect(size)}
                className={`${selectedSizes.includes(size) ? styles.selected : ''}`}
                >
                {size}
              </button>
            </li>
          ))}
        </ul>
      }
    />
  );
}

export default SizeFilter;
