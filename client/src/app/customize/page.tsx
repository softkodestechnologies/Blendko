"use client";
import React, { useState, useEffect } from 'react';
import Canvas from '@/components/customization/Canvas';
import Sidebar from '@/components/customization/Sidebar';
import Toolbar from '@/components/customization/Toolbar';
import styles from '@/components/customization/customize.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

const CustomizePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleCanvasWidth = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Toolbar />
      <div className={styles.customizePage}>
        <Sidebar onToggleCanvasWidth={function (): void {
                  throw new Error('Function not implemented.');
              } } />
        <div className={styles.canvasWrapper} style={{ width: isExpanded ? '80%' : '60%' }}>
          <Canvas canvasWidth="100%" />
          <button className={styles.toggleCanvasButton} onClick={toggleCanvasWidth}>
            {isExpanded ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
