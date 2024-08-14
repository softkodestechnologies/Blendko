import React from 'react';
import styles from './customize.module.css';
import ColorPalette from './ColorPalette';
import { ColorChangeHandler } from 'react-color';
import FileInputComponent from './Files';
interface SlidingPanelProps {
  activePanel: string;
  onClose: () => void;
  setActivePanel: (panel: string | null) => void;
  onFileUpload: (file: File) => void;
  onColorChange: (color: string) => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ activePanel, onClose, setActivePanel, onFileUpload, onColorChange  }) => {

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'product':
        return <div>Product Content</div>;
      case 'files':
        return <FileInputComponent onFileUpload={onFileUpload} />;
      case 'styles':
        return <div>Styles Content</div>;
      case 'sizes':
        return <div>Sizes Content</div>;
      case 'colour':
        return <ColorPalette setActivePanel={setActivePanel} onColorSelect={onColorChange}/>;
      case 'savedTemplate':
        return <div>Saved Templates Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.slidingPanel}`} style={{ left: activePanel ? '30%' : '-300px' }}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      {renderPanelContent()}
    </div>
  );
};

export default SlidingPanel;


