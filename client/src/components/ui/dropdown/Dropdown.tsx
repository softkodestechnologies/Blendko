'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './dropdown.module.css';

import { ChevronDown } from '../../../../public/svg/icon';

function Dropdown({
  onSelect,
  value,
  optionsList,
  caption,
  className,
}: {
  onSelect: (value: string) => void;
  value: string;
  optionsList: string[];
  caption?: string;
  className?: string;
}) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest(`.${styles.dropdownBox}`)) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleKeyDown = (option: string) => (e: any) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        onSelect(option);
        setIsOptionsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`full-width ${styles.dropdownBox} ${className}`}>
      <button
        type="button"
        role="combobox"
        id="toggle-dropdown"
        aria-controls="options"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        aria-label={`${caption} dropdown`}
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        className={`full-width full-height flex center`}
      >
        {value || caption}
        <ChevronDown />
      </button>

      <AnimatePresence mode="wait">
        {isOptionsOpen && (
          <motion.ul
            role="listbox"
            className={`full-width ${styles.options}`}
            aria-activedescendant={`${optionsList.indexOf(value)}`}
            tabIndex={-1}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.4 } }}
            transition={{
              duration: 0.3,
            }}
          >
            {optionsList.map((option) => (
              <li
                id={option}
                key={option}
                role="option"
                aria-selected={value == option}
                tabIndex={0}
                onKeyDown={handleKeyDown(option)}
                onClick={() => {
                  onSelect(option);
                  setIsOptionsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
