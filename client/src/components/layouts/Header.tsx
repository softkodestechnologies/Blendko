"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { 
  IoPersonOutline, 
  IoHeartOutline, 
  IoCartOutline,
  IoMenu, 
  IoClose 
} from 'react-icons/io5';
import './Header.css';
//import { useRouter } from 'next/router';
import Cart from '../ui/Cart';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  //const router = useRouter();

  const toggleCart = () => setCartOpen(!cartOpen);

  const toggleNav = () => setNavOpen(!navOpen);

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add('cart-open');
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [cartOpen]);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setNavOpen(false);
  //     setCartOpen(false);
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [router.events]);

  const cartItems = [
    { id: 1, title: 'One Life Graphic T-shirt', category: 'Men\'s Shirts', size: 'Medium', price: 260, image: '/picture.png' },
    { id: 2, title: 'Another Cool T-shirt', category: 'Men\'s Shirts', size: 'Large', price: 300, image: '/picture.png' },
    { id: 3, title: 'One Life Graphic T-shirt', category: 'Men\'s Shirts', size: 'Medium', price: 260, image: '/picture.png' },
    { id: 4, title: 'Another Cool T-shirt', category: 'Men\'s Shirts', size: 'Large', price: 300, image: '/picture.png' },
    { id: 5, title: 'One Life Graphic T-shirt', category: 'Men\'s Shirts', size: 'Medium', price: 260, image: '/picture.png' },
    { id: 6, title: 'Another Cool T-shirt', category: 'Men\'s Shirts', size: 'Large', price: 300, image: '/picture.png' },
    { id: 7, title: 'One Life Graphic T-shirt', category: 'Men\'s Shirts', size: 'Medium', price: 260, image: '/picture.png' },
    { id: 8, title: 'Another Cool T-shirt', category: 'Men\'s Shirts', size: 'Large', price: 300, image: '/picture.png' },
    { id: 9, title: 'One Life Graphic T-shirt', category: 'Men\'s Shirts', size: 'Medium', price: 260, image: '/picture.png' },
    { id: 10, title: 'Another Cool T-shirt', category: 'Men\'s Shirts', size: 'Large', price: 300, image: '/picture.png' },
  ];

  return (
    <header>
      <nav className={`header-nav`}>
        <div className="header-container">
          <div className="flex-between">
            <div className="flex-shrink-0">
              <h1 className="nav-title"><Link href="/">Blendko</Link></h1>
            </div>
            <div className="flex-baseline">
              {!navOpen && <IoPersonOutline className="nav-icon" size={20} />}
              {!navOpen && <IoHeartOutline className="nav-icon" size={20} />}
              {!navOpen && <IoCartOutline className="nav-icon" size={20} onClick={toggleCart} />}
              <div className="nav-icon nav-control-icon" onClick={toggleNav}>
                {navOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={`navbar-menu ${!navOpen ? 'navbar-hidden' : 'navbar-visible'}`}>
            <div className="navbar-list header-container">
              <h2>Fashion & Accessories</h2>
              <Link href="/">Whats New</Link>
              <Link href="/">Gifts & Personalisation</Link>
              <Link href="/">Womens Fashion</Link>
              <Link href="/">Mens Fashion</Link>
              <Link href="/">Bags Fashion</Link>
              <Link href="/">Jewelry & Timepieces</Link>
              <Link href="/">Kids & Baby</Link>
              <Link href="/">Maison</Link>
              <Link href="/">Customisation</Link>
            </div>
          </div>
        </div>
      </nav>
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} cartItems={cartItems} />
    </header>
  );
};

export default Header;

