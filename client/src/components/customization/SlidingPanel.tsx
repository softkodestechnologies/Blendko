import React from 'react';
import styles from './customize.module.css';
import ColorPalette from './ColorPalette';
import { ColorChangeHandler } from 'react-color';
import FileInputComponent from './Files';
import SizeSelector from './SizeSelector';

interface CustomizedProduct {
  size: string | null;
  color: string;
  texture: string | null;
}

interface SlidingPanelProps {
  activePanel: string;
  onClose: () => void;
  setActivePanel: (panel: string | null) => void;
  onFileUpload: (file: File) => void;
  onColorChange: (color: string) => void;
  onSizeSelect: (size: string) => void;
  customizedProduct: CustomizedProduct;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ activePanel, onClose, setActivePanel, onFileUpload, onColorChange, onSizeSelect, customizedProduct  }) => {
  

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'product':
        return <div>Product Content</div>;
      case 'files':
        return <FileInputComponent onFileUpload={onFileUpload} />;
      case 'styles':
        return <div>Styles Content</div>;
      case 'sizes':
        return (
          <SizeSelector
            onSizeSelect={onSizeSelect}
            selectedSize={customizedProduct.size}
          />
        );
      case 'colour':
        return <ColorPalette setActivePanel={setActivePanel} onColorSelect={onColorChange} />;
      case 'savedTemplate':
        return <div>Saved Templates Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.slidingPanel} ${activePanel ? styles.active : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      {renderPanelContent()}
    </div>
  );
};

export default SlidingPanel;




