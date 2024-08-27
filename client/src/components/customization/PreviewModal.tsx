"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './customize.module.css';

import {
    PreviewIcon
   } from './../../../public/svg/icon';

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
        <div className={styles.previewTitle}>
            <div className={`${styles.toolbarIcons} ${styles.previewIcons}`} ><PreviewIcon />Preview</div>
            <button className={styles.previewClose} onClick={onClose}>×</button>
        </div>
        <hr />
        <div className={styles.previewImage}>
          <Image src={snapshots[selectedView]} alt={`View ${selectedView + 1}`} width="500" height="500"/>
        </div>
        <div className={styles.previewGallery}>
          {snapshots.map((snapshot, index) => (
            <Image
              key={index}
              src={snapshot}
              alt={`View ${index + 1}`}
              className={selectedView === index ? styles.selectedView : ''}
              onClick={() => setSelectedView(index)}
              width="60"
              height="60"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;