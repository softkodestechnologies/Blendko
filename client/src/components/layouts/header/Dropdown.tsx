import Link from 'next/link';
import { motion } from 'framer-motion';

import styles from './header.module.css';

type navLink = {
  title: string;
  url: string;
};

function Dropdown({ isOpen, data }: { isOpen: boolean; data: navLink[] }) {
  return (
    <motion.div
      aria-hidden={!isOpen}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className={`full-width flex center ${styles.dropdown}`}
    >
      {data.map((link, index) => (
        <Link key={index} href={link.url}>
          {link.title}
        </Link>
      ))}
    </motion.div>
  );
}

export default Dropdown;
