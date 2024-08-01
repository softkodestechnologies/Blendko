'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, MouseEvent } from 'react';

import HamburgerMenu from '../../ui/HamburgerMenu';
import { useSelector } from 'react-redux';
import Cart from '../../ui/Cart';

import styles from './header.module.css';

import { RootState } from '@/services/store';

import NavMenu from './NavMenu';
import Dropdown from './Dropdown';
import BackDrop from '@/components/ui/BackDrop';
import {
  Logo,
  UserIcon,
  CartIcon,
  SearchIcon,
  ChevronIcon,
  WishlistIcon,
} from '../../../../public/svg/icon';
import { navLinks } from '@/utils/data/dummy';

const UserMenu = dynamic(() => import('../../user/UserMenu'), { ssr: false });

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [isClient, setIsClient] = useState(false);

  const toggleCart = () => {
    handleStorageChange();
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    handleStorageChange();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleStorageChange = () => {
    if (typeof window !== 'undefined') {
      const storedCartItems = JSON.parse(
        localStorage.getItem('cartItems') || '[]'
      );
      setCartItems(storedCartItems);
    }
  };

  const handleUserIconHover = () => {
    setUserMenuOpen(true);
  };

  return (
    <header className={`${styles.header}`}>
      <nav className={`flex space-between align-y ${styles.navWrapper}`}>
        <Link href="/">
          <Logo />
        </Link>

        <ul className={`flex align-y ${styles.link_items}`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.title === 'Categories' && (
                <button
                  className={`flex align-y`}
                  onClick={() => setShowSubMenu(!showSubMenu)}
                >
                  {link.title}

                  <ChevronIcon
                    style={{
                      marginLeft: '7px',
                      transform: showSubMenu
                        ? 'rotate(-90deg)'
                        : 'rotate(90deg)',
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {showSubMenu && (
                      <Dropdown
                        isOpen={showSubMenu}
                        data={navLinks[2].subMenu}
                      />
                    )}
                  </AnimatePresence>
                </button>
              )}

              {link.title !== 'Categories' && (
                <Link href={`${link.url}`} className={`flex align-y`}>
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <ul className={`flex ${styles.actions}`}>
          <li className={`flex align-y`}>
            <button>
              <SearchIcon />
            </button>
          </li>

          <li className={`flex align-y`}>
            <button>
              <UserIcon />
            </button>
          </li>

          <li className={`flex align-y`}>
            <button>
              <WishlistIcon />
            </button>
          </li>

          <li className={`flex align-y`}>
            <button onClick={toggleCart}>
              <CartIcon />
              {cartItems.length > 0 && (
                <span className={`cart-badge`}>{cartItems.length}</span>
              )}
            </button>
          </li>

          <li className={`flex align-y ${styles.hamburger}`}>
            <HamburgerMenu onClick={() => setNavOpen(!navOpen)} />
          </li>
        </ul>
      </nav>

      <AnimatePresence mode="wait">
        {navOpen && (
          <NavMenu onClose={() => setNavOpen(false)} navOpen={navOpen} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {navOpen && (
          <BackDrop
            onClick={() => setNavOpen(false)}
            style={{ height: 'calc(100% - 84px)' }}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
