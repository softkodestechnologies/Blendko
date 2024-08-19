import React from 'react';
import styles from './customize.module.css';
import ColorPalette from './ColorPalette';
import { ColorChangeHandler } from 'react-color';
import FileInputComponent from './Files';


interface MobileSlidingPanelProps {
  activePanel: string;
  onClose: () => void;
  setActivePanel: (panel: string | null) => void;
  onFileUpload: (file: File) => void;
  onColorChange: (color: string) => void;
}

const MobileSlidingPanel: React.FC<MobileSlidingPanelProps> = ({ activePanel, onClose, setActivePanel, onFileUpload, onColorChange }) => {
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
      case 'styles':
        return <div>Styles Content</div>;
      case 'colour':
        return <ColorPalette 
        onChange={handleColorChange} 
        setActivePanel={setActivePanel}
        onColorSelect={onColorChange} />;
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
