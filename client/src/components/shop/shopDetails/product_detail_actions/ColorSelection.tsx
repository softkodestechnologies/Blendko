'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './productDetailsActions.module.css';

import { CheckMark } from '../../../../../public/svg/icon';

function ColorSelection({
  colors,
  handleColorSelection,
}: {
  colors: string[];
  handleColorSelection: (color: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    handleColorSelection(color);
  };

  return (
    <ul className={`flex align-y ${styles.color_pallete}`}>
      {colors.map((color, index) => (
        <li key={index}>
          <button
            className={`flex center`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          >
            {selectedColor === color && (
              <CheckMark
                className={`${
                  color.toLowerCase() === 'white' ||
                  color === '#ffffff' ||
                  color === '#fff'
                    ? styles.pallete_white
                    : ''
                }`}
              />
            )}

            <AnimatePresence mode="wait">
              {selectedColor === color && (
                <motion.span
                  initial={{ x: '0' }}
                  exit={{ x: '0' }}
                  animate={{ x: '100%' }}
                  className={`${styles.animation}`}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: color }}
                />
              )}
            </AnimatePresence>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ColorSelection;
