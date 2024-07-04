// components/Framer.js
import React from 'react';
import styles from './Framer.module.css';

const Framer = () => {
  return (
    <div className={styles.framerImageContainer}>
      <div className={styles.overlayContainer}>
        <div className={styles.videoPlayer}>
          <div className={styles.videoPlaceholder}>Video</div>
        </div>
        <div className={styles.controls}>
          <div className={styles.rating}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Framer;