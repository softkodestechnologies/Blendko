'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './accordion.module.css';

function Accordion({
  head,
  body,
  className,
  toggleOpen,
  setToggleOpen,
  ...props
}: {
  className?: string;
  toggleOpen?: boolean;
  head: React.ReactNode;
  body: React.ReactNode;
  setToggleOpen?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    if (setToggleOpen) {
      setToggleOpen();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div
      role="region"
      aria-labelledby="accordion"
      className={`${styles.accordion} ${className}`}
    >
      <button
        {...props}
        type="button"
        aria-label="accordion"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls="accordion"
        className={`full-width flex align-y space-between ${
          (toggleOpen && toggleOpen) || expanded ? styles.active : ''
        }`}
      >
        {head}
      </button>

      <AnimatePresence mode="wait">
        {((toggleOpen && toggleOpen) || expanded) && (
          <motion.div
            className={styles.accordionBody}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 450,
              damping: 60,
            }}
          >
            {body}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
