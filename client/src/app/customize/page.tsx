'use client';
import React, { useRef, useState, useCallback } from 'react';
import ThreeCanvas from '@/components/customization/ThreeCanvas';
import Sidebar from '@/components/customization/Sidebar';
import Toolbar from '@/components/customization/Toolbar';
import styles from '@/components/customization/customize.module.css';

interface CustomizedProduct {
  size: string | null;
  color: string;
  texture: string | null;
}

const CustomizePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<any>(null);
  const [customizedProduct, setCustomizedProduct] = useState<CustomizedProduct>({
    size: null,
    color: '#ffffff',
    texture: null,
  });


  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleReset = useCallback(() => {
    canvasRef.current?.reset();
  }, []);

  const handleSizeSelect = useCallback((size: string) => {
    setCustomizedProduct(prev => ({
      ...prev,
      size: size
    }));
  }, []);

  const handleColorChange = useCallback((hexColor: string) => {
    canvasRef.current?.changeColor(hexColor);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    canvasRef.current?.addImageToMesh(file);
  }, []);

  const handleAddNew = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        handleFileUpload(target.files[0]);
      }
    };
    input.click();
  }, [handleFileUpload]);

  const handleToggleCanvasWidth = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleSaveAsTemplate = useCallback(() => {
    // Implement save as template functionality
  }, []);

  const handleAddToCart = useCallback(() => {
    // Implement add to cart functionality
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Toolbar
        undo={handleUndo}
        redo={handleRedo}
        reset={handleReset}
        onAddNew={handleAddNew}
        saveAsTemplate={handleSaveAsTemplate}
        addToCart={handleAddToCart}
        canvasRef={canvasRef}
      />
      <div className={styles.customizePage}>
        <Sidebar
          onColorChange={handleColorChange}
          onFileUpload={handleFileUpload}
          onToggleCanvasWidth={handleToggleCanvasWidth}
          onSizeSelect={handleSizeSelect}
          customizedProduct={customizedProduct}
        />
        <div
          className={styles.canvasWrapper}
          style={{
            width: isMobile ? '100%' : isExpanded ? '80%' : '60%',
          }}
        >
          <ThreeCanvas
            ref={canvasRef}
            productName="Custom Product"
            initialColor="#ffffff"
          />
        </div>
      </div>
    </div>
  );
};export default CustomizePage;