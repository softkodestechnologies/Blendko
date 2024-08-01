import { motion } from 'framer-motion';

import styles from './backdrop.module.css';

function BackDrop({ ...props }) {
  return (
    <motion.div
      {...props}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`full-width full-height ${styles.backdrop}`}
    />
  );
}

export default BackDrop;
