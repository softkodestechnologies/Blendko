'use client';

import { useState, useEffect } from 'react';

import styles from './highlight.module.css';
import layoutStyles from '../home.module.css';

import Highlight from './Highlight';
import MobileSlider from './MobileSlider';
import { slides as initialSlides } from '@/utils/data/dummy';
import { SlideController } from '../../../../public/svg/icon';

function Highlights() {
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const transistionNextId = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        const newSlides = [...slides.slice(1), slides[0]];

        setSlides(newSlides);
        setCurrentSlide(0);
      } else {
        const newSlides = [...slides.slice(1), slides[0]];
        setSlides(newSlides);

        setCurrentSlide(currentSlide + 1);
      }
    }, 6000);

    return () => clearInterval(transistionNextId);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) return;

    const newSlides = [...slides.slice(1), slides[0]];
    setSlides(newSlides);

    setCurrentSlide(currentSlide + 1);
  };

  const handlePrevious = () => {
    if (currentSlide === 0) return;

    const newSlides = [
      slides[slides.length - 1],
      ...slides.slice(0, slides.length - 1),
    ];

    setSlides(newSlides);
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <section className={`${layoutStyles.container}`}>
      <div className={`${styles.customize_wrapper}`}>
        <h2>Highlights</h2>

        <div className={`${styles.slide_container}`}>
          <button
            aria-label="Previous"
            onClick={handlePrevious}
            style={{ transform: 'rotate(-180deg)' }}
            className={`${styles.slide_controller}`}
          >
            <SlideController />
          </button>

          <ul className={`grid ${styles.slide_wrapper}`}>
            {slides.map((slide, index) => (
              <Highlight
                slide={slide}
                key={slide.id}
                index={slide.id}
                currentSlide={currentSlide}
              />
            ))}
          </ul>

          <button
            aria-label="Next"
            onClick={handleNext}
            className={`${styles.slide_controller}`}
          >
            <SlideController />
          </button>
        </div>

        <MobileSlider />
      </div>
    </section>
  );
}

export default Highlights;
