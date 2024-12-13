import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import styles from './Preview.module.css';
import { PreviewIcon } from './../../../public/svg/icon';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<any>;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, canvasRef }) => {
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState(0);
  
  const viewAngles = useMemo(() => [
    { position: [0, 0, 5], rotation: [0, 0, 0], name: 'Front View' },
    { position: [0, 0, -5], rotation: [0, Math.PI, 0], name: 'Back View' },
    { position: [-5, 0, 0], rotation: [0, Math.PI / 2, 0], name: 'Left View' },
    { position: [5, 0, 0], rotation: [0, -Math.PI / 2, 0], name: 'Right View' }
  ], []);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const captureSnapshots = async () => {
        // Get the Three.js elements using our new method
        const { scene, renderer, camera } = canvasRef.current.getSceneElements();

        if (!renderer || !scene || !camera) {
          console.error('Required Three.js components not found');
          return;
        }

        // Store original camera position and rotation
        const originalPosition = camera.position.clone();
        const originalRotation = camera.rotation.clone();

        // Create a new renderer for capturing if needed
        const captureRenderer = renderer;
        
        try {
          // Capture snapshots from different angles
          const shots = await Promise.all(viewAngles.map(async (view) => {
            // Position camera for this view
            camera.position.set(view.position[0], view.position[1], view.position[2]);
            camera.lookAt(0, 0, 0);

            // Render the scene
            captureRenderer.render(scene, camera);

            // Get the canvas snapshot
            return captureRenderer.domElement.toDataURL('image/png');
          }));

          setSnapshots(shots);
        } catch (error) {
          console.error('Error capturing snapshots:', error);
        } finally {
          // Restore original camera position and rotation
          camera.position.copy(originalPosition);
          camera.rotation.copy(originalRotation);
          camera.updateProjectionMatrix();
          
          // Re-render with original camera position
          renderer.render(scene, camera);
        }
      };

      captureSnapshots();
    }
  }, [isOpen, canvasRef, viewAngles]);


  if (!isOpen) return null;

  return (
    <div className={styles.previewModalOverlay}>
      <div className={styles.previewModal}>
        <div className={styles.previewHeader}>
          <div className={styles.previewTitle}>
            <div className={styles.previewIcon}>
              <PreviewIcon />
              <span>Preview</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.previewContent}>
          <div className={styles.mainImageContainer}>
            {snapshots[selectedView] && (
              <img 
                src={snapshots[selectedView]} 
                alt={viewAngles[selectedView].name}
                className={styles.mainImage}
              />
            )}
          </div>
          
          <div className={styles.thumbnailGallery}>
            {snapshots.map((snapshot, index) => (
              <div 
                key={index}
                className={`${styles.thumbnailContainer} ${selectedView === index ? styles.activeThumbnail : ''}`}
                onClick={() => setSelectedView(index)}
              >
                <img
                  src={snapshot}
                  alt={viewAngles[index].name}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;