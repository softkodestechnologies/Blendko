'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from '@/components/customization/Sidebar';
import Toolbar from '@/components/customization/Toolbar';
import styles from '@/components/customization/customize.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import ThreeCanvas from '@/components/customization/ThreeCanvas';

const CustomizePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [productData, setProductData] = useState<{ name: string; color: string } | null>(null);
  const canvasRef = useRef<{ 
    undo: () => void; 
    redo: () => void; 
    reset: () => void;
    changeColor: (color: string) => void;
    addImageToMesh: (file: File) => void;
  } | null>(null);
  useEffect(() => {
    setLoading(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }

    setLoading(false);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCanvasWidth = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleReset = useCallback(() => {
    canvasRef.current?.reset();
  }, [])

  const handleColorChange = useCallback((hexColor: string) => {
    canvasRef.current?.changeColor(hexColor);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    if (canvasRef.current) {
      canvasRef.current.addImageToMesh(file);
    }
  }, []);

  const handleSaveAsTemplate = useCallback(() => {
    // Implement save as template logic
  }, []);

  const handleAddToCart = useCallback(() => {
    // Implement add to cart logic
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <Toolbar 
        undo={handleUndo} 
        redo={handleRedo} 
        reset={handleReset}
        saveAsTemplate={handleSaveAsTemplate} 
        addToCart={handleAddToCart}
      />
      <div className={styles.customizePage}>
        <Sidebar 
        onToggleCanvasWidth={toggleCanvasWidth} 
        onColorChange={handleColorChange} 
        onFileUpload={handleFileUpload}
        />
        <div className={styles.canvasWrapper} style={{ width: isMobile ? '100%' : (isExpanded ? '80%' : '60%') }}>
          <ThreeCanvas 
            ref={canvasRef}
            productName={productData?.name || ''}
            initialColor={productData?.color || '#ffffff'}
          />
          {!isMobile && (
            <button className={styles.toggleCanvasButton} onClick={toggleCanvasWidth}>
              {isExpanded ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;