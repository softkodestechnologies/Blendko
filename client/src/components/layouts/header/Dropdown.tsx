import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import styles from './header.module.css';

type navLink = {
  title: string;
  url: string;
};

function Dropdown({
  isOpen,
  data,
  setIsOpen,
}: {
  isOpen: boolean;
  data: navLink[];
  setIsOpen: (isOpen: boolean) => void;
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={dropDownRef}
      aria-hidden={!isOpen}
      exit={{ opacity: 0, height: 0 }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
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
