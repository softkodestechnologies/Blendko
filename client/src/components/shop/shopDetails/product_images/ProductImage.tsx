'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './productImage.module.css';

type ProductImageProps = {
  url: string;
  name: string;
  index: number;
};

function ProductImage({ images }: { images: ProductImageProps[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="">
      <div className={`flex center ${styles.image_preview}`}>
        <AnimatePresence mode="popLayout">
          {images.map(
            (image, index) =>
              selectedImage === index && (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: '-100%' }}
                  exit={{
                    opacity: 0,
                    x: 100,
                    transition: { duration: 0.4 },
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
                >
                  <Image
                    width={300}
                    height={300}
                    src={image.url}
                    alt={image.name || 'product'}
                  />
                </motion.span>
              )
          )}
        </AnimatePresence>
      </div>

      <ul className={`grid ${styles.image_tiles}`}>
        {images.map((image, index) => (
          <li key={index}>
            <button
              onClick={() => setSelectedImage(index)}
              className={`flex center full-width ${styles.image_tile} ${
                selectedImage === index ? styles.selected : ''
              }`}
            >
              <Image
                src={image.url}
                width={100}
                height={100}
                alt={image.name || 'product'}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductImage;
