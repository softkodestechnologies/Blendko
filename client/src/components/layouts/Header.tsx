"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoPersonOutline, IoHeartOutline, IoCartOutline, IoSearch, IoClose } from 'react-icons/io5';
import HamburgerMenu from '../ui/HamburgerMenu';
import { useSelector } from 'react-redux';
import Cart from '../ui/Cart';
import LogoSVG from './LogoSVG';
import './Header.css';
import { RootState } from '@/services/store'; 
import dynamic from 'next/dynamic';
const UserMenu = dynamic(() => import('../user/UserMenu'), { ssr: false });

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [isClient, setIsClient] = useState(false);

  const toggleCart = () => {
    handleStorageChange();
    setCartOpen(!cartOpen);
  }
  const toggleNav = () => setNavOpen(!navOpen);

  useEffect(() => {
    handleStorageChange();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
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

  const iconSize = isMobile ? 24 : 30;
  const hamburgerSize = isMobile ? 28 : 34;

  const handleStorageChange = () => {
    if (typeof window !== 'undefined') {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(storedCartItems);
    }
  };

  const handleUserIconHover = () => {
    setUserMenuOpen(true);
  };

  return (
    <header>
      <nav className="header-nav">
        <div className="header-container">
          <div className="flex-between">
            <div className="flex-shrink-0">
              <h1 className="nav-title"><Link href="/"><LogoSVG /></Link></h1>
            </div>
            <div className="flex center">
              {!navOpen && (
                <div 
                  ref={userMenuRef}
                  onMouseEnter={handleUserIconHover}
                  className="user-menu-container"
                >
                <IoPersonOutline className="nav-icon mobile-icon" size={iconSize} />
                {userMenuOpen && isClient && <UserMenu />}
              </div>
              )}
              {!navOpen && <IoHeartOutline className="nav-icon mobile-icon" size={iconSize} />}
              {!navOpen && <IoCartOutline className="nav-icon mobile-icon" size={iconSize} onClick={toggleCart} />}
              {navOpen && <IoSearch className="nav-icon mobile-icon" size={iconSize} />}
              <div className="nav-icon nav-control-icon mobile-icon" onClick={toggleNav}>
                {navOpen ? <IoClose size={hamburgerSize} /> : <HamburgerMenu />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={`navbar-menu ${!navOpen ? 'navbar-hidden' : 'navbar-visible'}`}>
            <div className="navbar-list header-container">
              {/* <h2>Fashion & <br className='nav-break' />Accessories</h2> */}
              <Link href="/shop" onClick={toggleNav}>What&apos;s New</Link>
              <Link href="/shop" onClick={toggleNav}>Women&apos;s Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Men&apos;s Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Bags Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Jewelry & Timepieces</Link>
              <Link href="/shop" onClick={toggleNav}>Kid&apos;s & Baby</Link>
              <Link href="/shop" onClick={toggleNav}>Customisation</Link>
              <hr className='navbar-dash'/>
            </div>
          </div>
        </div>
      </nav>
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} cartItems={cartItems} />
    </header>
  );
};

export default Header;

