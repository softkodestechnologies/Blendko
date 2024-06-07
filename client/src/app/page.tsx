"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import React from 'react';
import Link from "next/link";


interface Highlight {
  image: string;
  title: string;
  price: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    image: '/make-up.jpg',
    title: 'Bond Foot Tote',
    price: '$2,304',
    description: 'CUSTOMISE',
  },
  {
    image: '/picture.png',
    title: 'Mode Small',
    price: '$1921',
    description: 'Cool Bag',
  },
  {
    image: '/people.png',
    title: 'Shoe ride',
    price: '$3921',
    description: 'Win tote Bag',
  },
  {
    image: '/make-up.jpg',
    title: 'T-shirts',
    price: '$4921',
    description: 'shirt',
  },{
    image: '/picture.png',
    title: 'Short Jeans',
    price: '$2921',
    description: 'Win tote Bag',
  },{
    image: '/people.png',
    title: 'Drag show',
    price: '$2921',
    description: 'Win tote Bag',
  },
];


export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const prevScrollPos = useRef<number>(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);

  const nextHighlights = [
    highlights[(currentHighlight + 1) % highlights.length],
    highlights[(currentHighlight + 2) % highlights.length],
    highlights[(currentHighlight + 3) % highlights.length],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos.current > currentScrollPos || currentScrollPos === 0) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Main Banner */}
      <section className="main-banner">
        <div className="main-banner-container">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-100 to-transparent"></div>
          <div className="relative flex flex-col md:flex-row items-center md:items-start">
            <div className="container main-banner-text">
              <h1 className="main-banner-text-main">CAMERO BOOST WINTER <br/> JACKET GREY</h1>
              <button className="main-button">Explore More</button>
            </div>
            <div className="md:w-1/2">
              <div className="image-should-be-here-instead-of-div w-full h-auto"></div>
            </div>
          </div>
        </div>

        <div className="main-banner-img">
          <div className="main-banner-img1"></div>
          <div className="flex flex-col center main-banner-hidden">
            <h2>Exlore Our Latest Collections</h2>
            <p>Start exploring now and find your signature style!</p>
            <button className="main-button btn-shop"><Link href="/shop">Shop</Link></button>
          </div>
          <div className="main-banner-img2"></div>
        </div>
      </section>


      {/*HIGHLIGHTS */}
      <div className="container">
      <h1 className="highlight-header">HIGHLIGHTS</h1>
      <button className="highlight-btn">SHOP NOW</button>
      <div className="flex space-between align-y flex ">
      <div className="">
        <div className="flex space-between align-y">
          <Image
            src={highlights[currentHighlight].image}
            alt={highlights[currentHighlight].title}
            width={250}
            height={250}
            className=""
          />
          <div className="highlight-context">
            <p>{highlights[currentHighlight].price}</p>
            <p>{highlights[currentHighlight].title}</p>
            <button><Link href="/customize">CUSTOMIZE</Link></button>
          </div>
        </div>
      </div>
      <div className="flex">
        {nextHighlights.map((highlight, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              currentHighlight === index ? '' : ''
            }`}>
            <Image
                src={highlight.image}
                alt={highlight.title}
                width={150}
                height={210}
                className={`w-full h-auto md:w-1/3 ${
                  currentHighlight === index ? 'hidden' : ''
                }`}
              />

            {currentHighlight === index && (
              <div className="">
              </div>
            )}
            <div className={` ${currentHighlight === index ? 'block md:hidden' : ''}`}>
              <p className="">{highlight.title}</p>
              <p className="">{highlight.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
</div>
  );
};
