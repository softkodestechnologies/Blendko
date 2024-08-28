'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon, CheckMark } from '../../../../public/svg/icon';

const colors = [
  '#00C12B',
  '#F50606',
  '#F5DD06',
  '#F57906',
  '#06CAF5',
  '#063AF5',
  '#7D06F5',
  '#F506A4',
  '#ffffff',
  '#000000',
];

function ColorSelection() {
  const [expanded, setExpanded] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const handleSelect = (color: string) => {
    if (selectedColor.includes(color))
      return setSelectedColor(
        selectedColor.filter((option) => option !== color)
      );

    setSelectedColor([...selectedColor, color]);
  };

  return (
    <Accordion
      toggleOpen={expanded}
      setToggleOpen={() => setExpanded(!expanded)}
      className={styles.sidebar_filter}
      head={
        <>
          <span>Color</span>

          <ChevronIcon />
        </>
      }
      body={
        <ul className={`flex center ${styles.color_pallete}`}>
          {colors.map((color, index) => (
            <li key={index}>
              <button
                className={`flex center`}
                style={{ backgroundColor: color }}
                onClick={() => handleSelect(color)}
              >
                {selectedColor.includes(color) && (
                  <CheckMark
                    className={`${
                      color === '#fff' ||
                      color === '#ffffff' ||
                      color === 'white'
                        ? styles.pallete_white
                        : ''
                    }`}
                  />
                )}

                <AnimatePresence mode="wait">
                  {selectedColor.includes(color) && (
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
      }
    />
  );
}

export default ColorSelection;
