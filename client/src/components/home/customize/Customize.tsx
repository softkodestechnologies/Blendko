'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

import styles from './customize.module.css';

import { PlayIcon } from '../../../../public/svg/icon';

function Customize() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      setPlayVideo(true);
      videoRef.current.play();
    }
  };

  return (
    <div className={`${styles.video_wrapper}`}>
      <video
        ref={videoRef}
        autoPlay={playVideo}
        src={'/customize.mp4'}
        onEnded={() => setPlayVideo(false)}
        className={`full-width full-height`}
      />

      {!playVideo && (
        <motion.div
          className={`flex center full-width full-height ${styles.play_button}`}
        >
          <button onClick={handlePlay} className={`flex flex-col  center`}>
            <PlayIcon />

            <span>Play</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Customize;
