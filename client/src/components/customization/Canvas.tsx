"use client";
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import styles from './customize.module.css';

const Canvas = ({ canvasWidth }: { canvasWidth: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvasInstance = new fabric.Canvas(canvasRef.current);
      setCanvas(canvasInstance);

      canvasInstance.setBackgroundColor('#ccc', canvasInstance.renderAll.bind(canvasInstance));

      const handleResize = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;
          canvasInstance.setWidth(containerWidth);
          canvasInstance.setHeight(containerHeight);
          canvasInstance.renderAll();
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
        canvasInstance.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      fabric.Image.fromURL('/people.png', (img) => {
        img.scaleToWidth(300);
        img.scaleToHeight(300);
        img.set({
          left: canvas.getWidth() / 2 - img.getScaledWidth() / 2,
          top: canvas.getHeight() / 2 - img.getScaledHeight() / 2,
        });
        canvas.add(img);
        canvas.renderAll();
      });
    }
  }, [canvas]);

  const handleZoom = (zoomIn: boolean) => {
    if (!canvas) return;
    const zoomFactor = zoomIn ? 1.1 : 0.9;
    const newZoom = Math.round(zoom * zoomFactor);
    setZoom(newZoom);
    canvas.setZoom(newZoom / 100);
    canvas.renderAll();
  };

  return (
    <div ref={containerRef} className={styles.canvasContainer} style={{ width: canvasWidth }}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.zoomButtons}>
        <button className={styles.zoomButton} onClick={() => handleZoom(true)}>Zoom In</button>
        <span className={styles.zoomLevel}>{zoom}%</span>
        <button className={styles.zoomButton} onClick={() => handleZoom(false)}>Zoom Out</button>
      </div>
    </div>
  );
};

export default Canvas;