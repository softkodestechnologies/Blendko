import React from 'react';
import styles from './customize.module.css';
import ColorPalette from './ColorPalette';
import { ColorChangeHandler } from 'react-color';
import FileInputComponent from './Files';
import { SizeSelector } from './SizeSelector';


interface CustomizedProduct {
  size: string | null;
  color: string;
  texture: string | null;
}

interface MobileSlidingPanelProps {
  activePanel: string;
  onClose: () => void;
  setActivePanel: (panel: string | null) => void;
  onFileUpload: (file: File) => void;
  onColorChange: (color: string) => void;
  onSizeSelect: (size: string) => void;
  customizedProduct: CustomizedProduct;
}

const MobileSlidingPanel: React.FC<MobileSlidingPanelProps> = ({ activePanel, onClose, setActivePanel, onFileUpload, onColorChange, onSizeSelect, customizedProduct }) => {
  const handleColorChange: ColorChangeHandler = (color) => {
    // Handle color change here
    console.log(color);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'product':
        return <div>Product Content</div>;
      case 'files':
        return <FileInputComponent onFileUpload={onFileUpload}/>;
      case 'design':
        return <div>Design Content</div>;
      case 'sizes':
        return (
          <SizeSelector
            onSizeSelect={onSizeSelect}
            selectedSize={customizedProduct.size}
          />
        );
      case 'colour':
        return <ColorPalette onColorSelect={onColorChange} setActivePanel={setActivePanel} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mobileSlidingPanel}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      {renderPanelContent()}
    </div>
  );
};

export default MobileSlidingPanel;
