import React from 'react';
import styles from './customize.module.css';
import ColorPalette from './ColorPalette';
import { ColorChangeHandler } from 'react-color';

interface SlidingPanelProps {
  activePanel: string;
  onClose: () => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ activePanel, onClose }) => {
  const handleColorChange: ColorChangeHandler = (color) => {
    // Handle color change here
    console.log(color);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'product':
        return <div>Product Content</div>;
      case 'files':
        return <div>File Upload Component</div>;
      case 'styles':
        return <div>Styles Content</div>;
      case 'sizes':
        return <div>Sizes Content</div>;
      case 'colour':
        return <ColorPalette onChange={handleColorChange} />;
      case 'savedTemplate':
        return <div>Saved Templates Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.slidingPanel}`} style={{ left: activePanel ? '100%' : '-300px' }}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      {renderPanelContent()}
    </div>
  );
};

export default SlidingPanel;


