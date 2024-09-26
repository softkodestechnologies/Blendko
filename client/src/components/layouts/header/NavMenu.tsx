import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './header.module.css';

import { navLinks } from '@/utils/data/dummy';
import {
  CloseIcon,
  UserIcon,
  AccordionPlusIcon,
} from '../../../../public/svg/icon';

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
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      initial={{ x: '100%', opacity: 0 }}
      className={`flex flex-col full-height full-width ${styles.menu}`}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className={`${styles.menu_close}`}
      >
        <CloseIcon />
      </button>

      <ul className={`flex flex-col ${styles.menu_items}`}>
        {navLinks.map((link, index) => (
          <motion.li
            key={index}
            initial={{ height: 19.33 }}
            animate={
              showSubMenu && link.title === 'Categories'
                ? { height: 'auto', opacity: 1 }
                : { height: 19.33 }
            }
            exit={{ height: 19.33 }}
            transition={{ duration: 0.3 }}
          >
            {link.title === 'Categories' && (
              <>
                <button
                  className={`flex align-y space-between full-width`}
                  onClick={() => setShowSubMenu(!showSubMenu)}
                >
                  {link.title}

                  <AccordionPlusIcon />
                </button>

                {showSubMenu && link.subMenu.length > 0 && (
                  <ul className={`flex flex-col ${styles.sub_menu}`}>
                    {link.subMenu.map((subLink, index) => (
                      <li key={index}>
                        <Link href={`${subLink.url}`} onClick={onClose}>
                          {subLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {link.title !== 'Categories' && (
              <Link
                href={`${link.url}`}
                className={`flex align-y`}
                onClick={onClose}
              >
                {link.title}
              </Link>
            )}
          </motion.li>
        ))}
      </ul>

      <button className={`flex align-y ${styles.user_auth}`}>
        <UserIcon style={{ height: '36px', width: '36px' }} />

        <span>Login</span>
      </button>
    </motion.div>
  );
}

export default NavMenu;
