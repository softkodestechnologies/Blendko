import { useState } from 'react';
import { motion } from 'framer-motion';

export const hoverered = {
  initial: {
    y: 0,
  },
  hover: {
    y: -26,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={hoverered}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      className={`${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ display: 'block' }}>{text}</span>
      <span style={{ display: 'block' }}>{text}</span>
    </motion.div>
  );
}

export default AnimatedText;
