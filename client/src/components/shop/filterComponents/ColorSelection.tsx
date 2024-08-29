'use client';

import { useState } from 'react';
import { motion, AnimatePresence, color } from 'framer-motion';

import styles from './styles.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon, CheckMark } from '../../../../public/svg/icon';

const colors = [
  { color: 'green', hex: '#00C12B' },
  { color: 'red', hex: '#F50606' },
  { color: 'yellow', hex: '#F5DD06' },
  { color: 'orange', hex: '#F57906' },
  { color: 'lilac', hex: '#06CAF5' },
  { color: 'blue', hex: '#063AF5' },
  { color: 'purple', hex: '#7D06F5' },
  { color: 'pink', hex: '#F506A4' },
  { color: 'white', hex: '#ffffff' },
  { color: 'black', hex: '#000000' },
];

function ColorSelection({
  handleCheckboxChange,
}: {
  handleCheckboxChange: (key: string, value: string[]) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const handleSelect = (color: string) => {
    if (selectedColor.includes(color))
      return setSelectedColor(
        selectedColor.filter((option) => option !== color)
      );

    setSelectedColor([...selectedColor, color]);

    handleCheckboxChange('color', [...selectedColor, color]);
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
                style={{ backgroundColor: color.hex }}
                onClick={() => handleSelect(color.color)}
              >
                {selectedColor.includes(color.color) && (
                  <CheckMark
                    className={`${
                      color.color === '#fff' ||
                      color.color === '#ffffff' ||
                      color.color === 'white'
                        ? styles.pallete_white
                        : ''
                    }`}
                  />
                )}

                <AnimatePresence mode="wait">
                  {selectedColor.includes(color.hex) && (
                    <motion.span
                      initial={{ x: '0' }}
                      exit={{ x: '0' }}
                      animate={{ x: '100%' }}
                      className={`${styles.animation}`}
                      transition={{ duration: 0.5 }}
                      style={{ backgroundColor: color.hex }}
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
