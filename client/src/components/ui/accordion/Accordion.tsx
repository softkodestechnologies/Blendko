'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './accordion.module.css';

function Accordion({
  head,
  body,
  className,
  ...props
}: {
  head: React.ReactNode;
  body: React.ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

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
        aria-expanded={expanded}
        aria-controls="accordion"
        className="full-width flex space-between"
        onClick={() => setExpanded(!expanded)}
      >
        {head}
      </button>

      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            className={styles.accordionBody}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 500,
              damping: 30,
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
