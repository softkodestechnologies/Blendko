"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoPersonOutline, IoHeartOutline, IoCartOutline, IoSearch, IoMenu, IoClose } from 'react-icons/io5';
import NotificationBadge from '../ui/NotificationBadge';
import HamburgerMenu from '../ui/HamburgerMenu';
import Cart from '../ui/Cart';
import LogoSVG from './LogoSVG';
import './Header.css';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleNav = () => setNavOpen(!navOpen);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      console.log('HANDLESTORAGECHANGE CALLED', storedCartItems)
      setCartItems(storedCartItems);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header>
      <nav className="header-nav">
        <div className="header-container">
          <div className="flex-between">
            <div className="flex-shrink-0">
              <h1 className="nav-title"><Link href="/"><LogoSVG /></Link></h1>
            </div>
            <div className="flex center">
              {!navOpen && <IoPersonOutline className="nav-icon" size={30} />}
              {!navOpen && <IoHeartOutline className="nav-icon" size={30} />}
              {!navOpen && <IoCartOutline className="nav-icon" size={30} onClick={toggleCart} />}
              {navOpen && <IoSearch className="nav-icon" size={30} />}
              <div className="nav-icon nav-control-icon" onClick={toggleNav}>
                {navOpen ? <IoClose size={34} /> : <HamburgerMenu />}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`navbar-menu ${!navOpen ? 'navbar-hidden' : 'navbar-visible'}`}>
            <div className="navbar-list header-container">
              <h2>Fashion & <br className='nav-break' />Accessories</h2>
              <Link href="/shop">What&apos;s New</Link>
              <Link href="/shop">Gifts & Personalisation</Link>
              <Link href="/shop">Women&apos;s Fashion</Link>
              <Link href="/shop">Men&apos;s Fashion</Link>
              <Link href="/shop">Bags Fashion</Link>
              <Link href="/shop">Jewelry & Timepieces</Link>
              <Link href="/shop">Kid&apos;s & Baby</Link>
              <Link href="/shop">Maison</Link>
              <Link href="/shop">Customisation</Link>
              <hr className='navbar-dash'/>
            </div>
          </div>
        </div>
      </nav>
      <NotificationBadge />
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} cartItems={cartItems} />
    </header>
  );
};

export default Header;

