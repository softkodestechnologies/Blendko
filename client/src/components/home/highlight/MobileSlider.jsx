'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './highlight.module.css';

import Highlight from './Highlight';
import { slides } from '@/utils/data/dummy';
import { SlideController } from '../../../../public/svg/icon';

function MobileSlider() {
  return (
    <div className={`${styles.slide_container_mobile}`}>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        modules={[Navigation, Pagination]}
      >
        {slides.slice(1).map((slide, index) => (
          <SwiperSlide key={index}>
            <Highlight slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        id="prev"
        aria-label="Previous"
        style={{ transform: 'rotate(-180deg)' }}
        className={`${styles.slide_controller} prev`}
      >
        <SlideController />
      </button>

      <button
        id="next"
        aria-label="Next"
        className={`${styles.slide_controller} next`}
      >
        <SlideController />
      </button>
    </div>
  );
}

export default MobileSlider;
