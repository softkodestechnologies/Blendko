import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';
import styles from './customize.module.css';

interface CanvasProps {
  canvasWidth: string;
  productImage?: string;
}

interface CanvasState {
  objects: fabric.Object[];
  backgroundImage?: fabric.Image;
}

const Canvas = forwardRef(({ canvasWidth, productImage }: CanvasProps, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    addImageToCanvas,
  }));

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

      // Save initial state
      saveState(canvasInstance);

      return () => {
        window.removeEventListener('resize', handleResize);
        canvasInstance.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas && productImage) {
      fabric.Image.fromURL(productImage, (img) => {
        img.scaleToWidth(300);
        img.scaleToHeight(300);
        img.set({
          left: canvas.getWidth() / 2 - img.getScaledWidth() / 2,
          top: canvas.getHeight() / 2 - img.getScaledHeight() / 2,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        saveState(canvas);
      });
    }
  }, [canvas, productImage]);

  const saveState = useCallback((canvas: fabric.Canvas) => {
    const newState: CanvasState = {
      objects: canvas.getObjects(),
      backgroundImage: canvas.backgroundImage as fabric.Image | undefined,
    };
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prevIndex => prevIndex + 1);
  }, [historyIndex]);

  const handleZoom = useCallback((zoomIn: boolean) => {
    if (!canvas) return;
    const zoomFactor = zoomIn ? 1.1 : 0.9;
    const newZoom = Math.round(zoom * zoomFactor);
    setZoom(newZoom);
    canvas.setZoom(newZoom / 100);
    canvas.renderAll();
  }, [canvas, zoom]);

  const undo = useCallback(() => {
    if (historyIndex > 0 && canvas) {
      const prevState = history[historyIndex - 1];
      canvas.clear();
      if (prevState.backgroundImage) {
        canvas.setBackgroundImage(prevState.backgroundImage, canvas.renderAll.bind(canvas));
      }
      prevState.objects.forEach(obj => canvas.add(obj));
      canvas.renderAll();
      setHistoryIndex(prevIndex => prevIndex - 1);
    }
  }, [canvas, history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1 && canvas) {
      const nextState = history[historyIndex + 1];
      canvas.clear();
      if (nextState.backgroundImage) {
        canvas.setBackgroundImage(nextState.backgroundImage, canvas.renderAll.bind(canvas));
      }
      nextState.objects.forEach(obj => canvas.add(obj));
      canvas.renderAll();
      setHistoryIndex(prevIndex => prevIndex + 1);
    }
  }, [canvas, history, historyIndex]);

  const addImageToCanvas = useCallback((file: File) => {
    if (canvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          fabric.Image.fromURL(event.target.result as string, (img) => {
            img.scaleToWidth(100);
            img.set({
              left: canvas.getWidth() / 2 - img.getScaledWidth() / 2,
              top: canvas.getHeight() / 2 - img.getScaledHeight() / 2,
              selectable: true,
            });
            canvas.add(img);
            canvas.renderAll();
            saveState(canvas);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [canvas, saveState]);

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.canvasElement} />
      <div className={styles.zoomControls}>
        <button onClick={() => handleZoom(true)}>Zoom In</button>
        <button onClick={() => handleZoom(false)}>Zoom Out</button>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;
