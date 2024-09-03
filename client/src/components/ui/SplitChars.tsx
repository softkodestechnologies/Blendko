import { motion } from 'framer-motion';
import { JSX } from 'react';
const translate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  enter: (i: any) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
  }),
  exit: (i: any) => ({
    y: '100%',
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] },
  }),
};

function SplitChars({
  word,
  delay,
  hidden,
}: {
  word: string;
  delay?: number;
  hidden?: boolean;
}) {
  let chars: JSX.Element[] = [];

  const delayTime = delay ? delay : 0;

  word.split('').forEach((char, i) => {
    chars.push(
      <motion.span
        custom={[i * delayTime * 0.02, (word.length - i) * 0.01 * delayTime]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
        aria-hidden={hidden ? true : false}
      >
        {char}
      </motion.span>
    );
  });

  return <>{chars}</>;
}

export default SplitChars;
