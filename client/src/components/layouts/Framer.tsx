import React from 'react';
import styles from './Framer.module.css';
import YouTubeEmbed from './YouTubeEmbed';

const Framer = () => {
  return (
    <div className={styles.framerImageContainer}>
      <div className={styles.overlayContainer}>
        <div className={styles.videoPlayer}>
          <YouTubeEmbed videoId="LYgcQcH6_TQ" start={18} end={60} />
        </div>
      </div>
    </div>
  );
};

export default Framer;
