"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoPersonOutline, IoHeartOutline, IoCartOutline, IoSearch, IoMenu, IoClose } from 'react-icons/io5';
import NotificationBadge from '../ui/NotificationBadge';
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
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [isClient, setIsClient] = useState(false);

  const toggleCart = () => {
    handleStorageChange()
    setCartOpen(!cartOpen);
  }
  const toggleNav = () => setNavOpen(!navOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  useEffect(() => {
    handleStorageChange()
  }, []);

  useEffect(() => {
    setIsClient(true);
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



  return (
    <header>
      <nav className="header-nav">
        <div className="header-container">
          <div className="flex-between">
            <div className="flex-shrink-0">
              <h1 className="nav-title"><Link href="/"><LogoSVG /></Link></h1>
            </div>
            <div className="flex center">
              {!navOpen && <IoPersonOutline className="nav-icon mobile-icon" size={iconSize} onClick={toggleUserMenu} />}
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
              <h2>Fashion & <br className='nav-break' />Accessories</h2>
              <Link href="/shop" onClick={toggleNav}>What&apos;s New</Link>
              <Link href="/shop" onClick={toggleNav}>Gifts & Personalisation</Link>
              <Link href="/shop" onClick={toggleNav}>Women&apos;s Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Men&apos;s Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Bags Fashion</Link>
              <Link href="/shop" onClick={toggleNav}>Jewelry & Timepieces</Link>
              <Link href="/shop" onClick={toggleNav}>Kid&apos;s & Baby</Link>
              <Link href="/shop" onClick={toggleNav}>Maison</Link>
              <Link href="/shop" onClick={toggleNav}>Customisation</Link>
              <hr className='navbar-dash'/>
            </div>
          </div>
        </div>
      </nav>
      {/**<NotificationBadge />**/}
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} cartItems={cartItems} />
      {/**<div className="menuContainer">
          {user ? (
            <>
              <div className="userIconContainer">
                {userMenuOpen && <UserMenu />}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="authLink">Login</Link>
              <Link href="/signup" className="authLink">Sign Up</Link>
            </>
          )}
      </div>**/}
    </header>
  );
};

export default Header;

