"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './customize.module.css';

interface PreviewModalProps {
  onClose: () => void;
  getCanvasSnapshot: () => Promise<string[]>;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ onClose, getCanvasSnapshot }) => {
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState(0);

  useEffect(() => {
    const loadSnapshots = async () => {
      const images = await getCanvasSnapshot();
      setSnapshots(images);
    };
    loadSnapshots();
  }, [getCanvasSnapshot]);

  return (
    <div className={styles.previewModalOverlay}>
      <div className={styles.previewModal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.previewImage}>
          <Image src={snapshots[selectedView]} alt={`View ${selectedView + 1}`} layout="fill"/>
        </div>
        <div className={styles.previewGallery}>
          {snapshots.map((snapshot, index) => (
            <Image
              key={index}
              src={snapshot}
              alt={`View ${index + 1}`}
              className={selectedView === index ? styles.selectedView : ''}
              onClick={() => setSelectedView(index)}
              layout="fill"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;