import React from 'react';
import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
  videoId: string;
  start?: number;
  end?: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, start, end }) => {
  const startParam = start ? `&start=${start}` : '';
  const endParam = end ? `&end=${end}` : '';
  const url = `https://www.youtube.com/embed/${videoId}?controls=0${startParam}${endParam}`;
  
  return (
    <div className={styles.videoResponsive}>
      <iframe
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className={styles.iframe}
      />
    </div>
  );
};

export default YouTubeEmbed;
