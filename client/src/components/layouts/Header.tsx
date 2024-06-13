"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NotificationBadge from '../ui/NotificationBadge';
import HamburgerMenu from '../ui/HamburgerMenu';

import { 
  IoPersonOutline, 
  IoHeartOutline, 
  IoCartOutline,
  IoSearch,
  IoMenu, 
  IoClose 
} from 'react-icons/io5';
import './Header.css';
import Cart from '../ui/Cart';
import LogoSVG from './LogoSVG';

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
              <Link href="/">What&apos;s New</Link>
              <Link href="/">Gifts & Personalisation</Link>
              <Link href="/">Women&apos;s Fashion</Link>
              <Link href="/">Men&apos;s Fashion</Link>
              <Link href="/">Bags Fashion</Link>
              <Link href="/">Jewelry & Timepieces</Link>
              <Link href="/">Kid&apos;s & Baby</Link>
              <Link href="/">Maison</Link>
              <Link href="/">Customisation</Link>
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

