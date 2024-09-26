'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import HamburgerMenu from '../../ui/HamburgerMenu';
import { useSelector } from 'react-redux';
import Cart from '../../ui/Cart';

import styles from './header.module.css';

import NavMenu from './NavMenu';
import TopBanner from './TopBanner';
import {
  Logo,
  UserIcon,
  CartIcon,
  SearchIcon,
  ChevronIcon,
  WishlistIcon,
  NotificationIcon,
} from '../../../../public/svg/icon';
import { navLinks } from '@/utils/data/dummy';

const Dropdown = dynamic(() => import('./Dropdown'), { ssr: false });
const UserMenu = dynamic(() => import('../../user/UserMenu'), { ssr: false });
const BackDrop = dynamic(() => import('@/components/ui/BackDrop'), {
  ssr: false,
});

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLButtonElement>(null);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [navOpen]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (event: any) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (userMenuOpen) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (user) {
      setCartItems(user.cart);
    }
  }, [user]);

  return (
    <>
      <TopBanner />

      <header className={`${styles.header}`} ref={userMenuRef}>
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
                          setIsOpen={setShowSubMenu}
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
              <button aria-label="notifications">
                <NotificationIcon />
              </button>
            </li>

            <li className={`flex align-y`}>
              <button aria-label="search field">
                <SearchIcon />
              </button>
            </li>

            <li className={`flex align-y`}>
              <button aria-label="wishlist">
                <WishlistIcon />
              </button>
            </li>

            <li className={`flex align-y`}>
              <button onClick={() => setCartOpen(!cartOpen)} aria-label="cart">
                <CartIcon />
                {cartItems.length > 0 && (
                  <span className={`cart-badge`}>{cartItems.length}</span>
                )}
              </button>

              <Cart
                cartOpen={cartOpen}
                cartItems={cartItems}
                toggleCart={() => setCartOpen(!cartOpen)}
              />
            </li>

            <li
              className={`flex align-y ${styles.user_action}`}
              style={{ position: 'relative' }}
            >
              <button
                onClick={() => setUserMenuOpen(true)}
                aria-label="user menu"
              >
                <UserIcon style={{ width: '27px', height: '27px' }} />
              </button>

              {userMenuOpen && <UserMenu />}
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
      </header>
    </>
  );
};

export default Header;
