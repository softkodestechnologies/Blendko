"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Canvas from '@/components/customization/Canvas';
import Sidebar from '@/components/customization/Sidebar';
import Toolbar from '@/components/customization/Toolbar';
import styles from '@/components/customization/customize.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import { useTransformImageColorMutation } from '@/services/userService';

const CustomizePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [productImage, setProductImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transformImageColor] = useTransformImageColorMutation();
  const canvasRef = useRef<{ undo: () => void; redo: () => void; addImageToCanvas: (file: File) => void } | null>(null);

  useEffect(() => {
    setLoading(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);


    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      const productData = JSON.parse(storedProductData);
      // setProductImage(productData.image);
      const imageUrlMatch = productData.image.match(/src='([^']*)'/) || productData.image.match(/src="([^"]*)"/);
      setProductImage(imageUrlMatch ? imageUrlMatch[1] : productData.image);
    }

    setLoading(false);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleCanvasWidth = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleFileUpload = useCallback((file: File) => {
    if (canvasRef.current) {
      canvasRef.current.addImageToCanvas(file);
    }
  }, []);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleColorChange = useCallback(async (hexColor: string) => {
    if (productImage) {
      setIsLoading(true);
      setError(null);
      try {
        const result = await transformImageColor({ imageUrl: productImage, color: hexColor }).unwrap();
        const newImageUrlMatch = result.data.match(/src='([^']*)'/) || result.data.match(/src="([^"]*)"/);
        setProductImage(newImageUrlMatch ? newImageUrlMatch[1] : result.data);
      } catch (error) {
        console.error('Error transforming image color:', error);
        setError('Failed to transform image color. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [productImage, transformImageColor]);

  const handleSaveAsTemplate = useCallback(() => {
    //Remember: Implement save as template logic
  }, []);

  const handleAddToCart = useCallback(() => {
    //Remember: Implement add to cart logic
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <Toolbar 
        undo={handleUndo} 
        redo={handleRedo} 
        saveAsTemplate={handleSaveAsTemplate} 
        addToCart={handleAddToCart}
      />
      <div className={styles.customizePage}>
        <Sidebar onToggleCanvasWidth={toggleCanvasWidth} onFileUpload={handleFileUpload} onColorChange={handleColorChange} />
        <div className={styles.canvasWrapper} style={{ width: isMobile ? '100%' : (isExpanded ? '80%' : '60%') }}>
          <Canvas 
            ref={canvasRef}
            canvasWidth="100%" 
            productImage={productImage} 
            isLoading={isLoading}
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
