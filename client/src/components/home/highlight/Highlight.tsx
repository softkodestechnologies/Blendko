import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './highlight.module.css';

function Highlight({
  slide,
  index,
  currentSlide,
}: {
  index: number;
  currentSlide: number;
  slide: { image: StaticImageData; title: string; price: string };
}) {
  return (
    <>
      <AnimatePresence mode="popLayout">
        {index === currentSlide && (
          <motion.li
            className={`${styles.slide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0.5,
              scale: index === currentSlide ? 1 : 0.9,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`${styles.card} ${
                index === currentSlide ? `grid ${styles.active}` : ''
              }`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.img}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="full-width full-height"
                />
              </div>

              <div>
                <h3>{slide.title}</h3>
                <p>${slide.price}</p>
              </div>
            </motion.div>
          </motion.li>
        )}
      </AnimatePresence>

      {index !== currentSlide && (
        <motion.li
          layout
          className={`${styles.slide}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0.5,
            scale: index === currentSlide ? 1 : 0.9,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`${styles.card} ${
              index === currentSlide ? `grid ${styles.active}` : ''
            }`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className={styles.img}>
              <Image
                src={slide.image}
                alt={slide.title}
                className="full-width full-height"
              />
            </div>

            <div>
              <h3>{slide.title}</h3>
              <p>${slide.price}</p>
            </div>
          </motion.div>
        </motion.li>
      )}
    </>
  );
}

export default Highlight;

// import Image from 'next/image';
// import { StaticImageData } from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// import styles from './highlight.module.css';

// function Highlight({
//   slide,
//   index,
//   currentSlide,
// }: {
//   index: number;
//   currentSlide: number;
//   slide: { image: StaticImageData; title: string; price: string };
// }) {
//   return (
//     <AnimatePresence>
//       <motion.li
//         className={`${styles.slide}`}
//         layout
//         initial={{ opacity: 0.5, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0.5, scale: 0.8 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           className={`${styles.card} grid ${
//             index === currentSlide ? styles.active : ''
//           }`}
//           layout
//           initial={{ x: 100, opacity: 0.5 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: -100, opacity: 0.5 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className={styles.img}>
//             <Image
//               src={slide.image}
//               alt={slide.title}
//               className="full-width full-height"
//             />
//           </div>

//           <div>
//             <h3>{slide.title}</h3>
//             <p>${slide.price}</p>
//           </div>
//         </motion.div>
//       </motion.li>
//     </AnimatePresence>
//   );
// }

// export default Highlight;
