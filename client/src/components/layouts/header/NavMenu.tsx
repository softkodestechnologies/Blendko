import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './header.module.css';

import { navLinks } from '@/utils/data/dummy';
import { ChevronIcon, CloseIcon } from '../../../../public/svg/icon';

function NavMenu({
  onClose,
  navOpen,
}: {
  onClose: () => void;
  navOpen: boolean;
}) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <motion.div
      aria-hidden={!navOpen}
      aria-label="Main menu"
      className={`${styles.menu}`}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className={`${styles.menu_close}`}
      >
        <CloseIcon style={{ width: '18px', height: '18px' }} />
      </button>

      <ul className={`flex flex-col ${styles.menu_items}`}>
        {navLinks.map((link, index) => (
          <motion.li
            key={index}
            initial={{ height: 19.33 }}
            animate={
              showSubMenu && link.title === 'Categories'
                ? {
                    height: 'auto',
                    opacity: 1,
                  }
                : {
                    height: 19.33,
                  }
            }
            exit={{ height: 19.33 }}
            transition={{ duration: 0.3 }}
          >
            {link.title === 'Categories' && (
              <>
                <button
                  className={`flex align-y space-between`}
                  onClick={() => setShowSubMenu(!showSubMenu)}
                >
                  {link.title}

                  <ChevronIcon
                    style={{
                      marginLeft: '7px',
                      transform: showSubMenu
                        ? 'rotate(-90deg)'
                        : 'rotate(0deg)',
                    }}
                  />
                </button>

                {showSubMenu && link.subMenu.length > 0 && (
                  <ul className={`flex flex-col ${styles.sub_menu}`}>
                    {link.subMenu.map((subLink, index) => (
                      <li key={index}>
                        <Link href={`${subLink.url}`}>{subLink.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {link.title !== 'Categories' && (
              <Link href={`${link.url}`} className={`flex align-y`}>
                {link.title}
              </Link>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default NavMenu;
