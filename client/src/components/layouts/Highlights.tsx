"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Highlight {
    image: string;
    title: string;
    price: string;
    description: string;
  }
  
  const highlights: Highlight[] = [
    {
      image: "/small-tote-bag-01.png",
      title: "Medusa ‘98 small Tote Bag",
      price: "$2,304",
      description: "Croc-Effect"
    },
    {
      image: '/small-tote-bag-02.png',
      title: "Medusa ‘98 small Tote Bag",
      price: "$1,504",
      description: "Croc-Effect"
    },
    {
      image: '/small-tote-bag-03.png',
      title: "Medusa ‘98 small Tote Bag",
      price: "$995",
      description: "Croc-Effect"
    },
    {
      image: '/small-tote-bag-04.png',
      title: "Medusa ‘98 small Tote Bag",
      price: "$2,500",
      description: "Croc-Effect"
    }
  ];
  

const Highlights = () => {
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


    return (
    <div className="container highlight-section">
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
              className="highlight-image"
            />
            <div className="highlight-context">
              <h3>{highlights[currentHighlight].description}</h3>
              <h3 className="highlight-context-title">{highlights[currentHighlight].title}</h3>
              <p>{highlights[currentHighlight].price}</p>
              <button><Link href="/customize">CUSTOMIZE</Link></button>
            </div>
          </div>
        </div>
        <div className="flex highlight-triple-image">
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
                  className={`highlight-gallery ${
                    currentHighlight === index ? 'hidden' : ''
                  }`}
                />

              {currentHighlight === index && (
                <div className="">
                </div>
              )}
              <div className="">
                <h4 className="">{highlight.title}</h4>
                <p className="">{highlight.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}

export default Highlights;