import React, { useState, useEffect } from 'react';
import styles from './customize.module.css';
import SlidingPanel from './SlidingPanel';
import MobileSlidingPanel from './MobileSlidingPanel';
import { FaTshirt, FaPalette, FaRuler, FaPaintBrush, FaChevronRight } from 'react-icons/fa';
import {
 ProductIcon,
 FilesIcon,
 StylesIcon,
 SizesIcon,
 BackgroundColorIcon,
 SavedTemplateIcon
} from './../../../public/svg/icon';

interface CustomizedProduct {
  size: string | null;
  color: string;
  texture: string | null;
}

interface SidebarProps {
  onToggleCanvasWidth: () => void;
  onFileUpload: (file: File) => void;
  onColorChange: (color: string) => void;
  onSizeSelect: (size: string) => void;
  customizedProduct: CustomizedProduct;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCanvasWidth, onFileUpload, onColorChange, onSizeSelect, customizedProduct }) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTogglePanel = (panel: string) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isMobile) {
    return (
      <>
        <div className={styles.mobileSidebar}>
          {isExpanded && (
            <div className={styles.mobileExpandedMenu}>
              <div className={styles.sidebarItem} onClick={() => handleTogglePanel('styles')}><StylesIcon /> Styles</div>
              <div className={styles.sidebarItem} onClick={() => handleTogglePanel('colour')}><BackgroundColorIcon /> Background Colour</div>
            </div>
          )}
          <div className={styles.mobileBottomBar}>
            <div className={styles.sidebarItem} onClick={() => handleTogglePanel('product')}><ProductIcon/> Product</div>
            <div className={styles.sidebarItem} onClick={() => handleTogglePanel('design')}><FaPalette /> Design</div>
            <button title="right-arrow" className={styles.expandButton} onClick={toggleExpand}>
              <FaChevronRight />
            </button>
          </div>
        </div>
        {activePanel && (
          <MobileSlidingPanel activePanel={activePanel} onClose={() => setActivePanel(null)} setActivePanel={setActivePanel} onFileUpload={onFileUpload} onColorChange={onColorChange}  onSizeSelect={onSizeSelect} customizedProduct={customizedProduct}/>
        )}
      </>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItemContainer}>
        <div 
          className={`${styles.sidebarItem} ${activePanel === 'product' ? styles.activePanel : ''}`} 
          onClick={() => handleTogglePanel('product')}
        > <ProductIcon /> Product</div>

        <div
        className={`${styles.sidebarItem} ${activePanel === 'files' ? styles.activePanel : ''}`}
        onClick={() => handleTogglePanel('files')}
        > <FilesIcon /> Files</div>

        <div 
        className={`${styles.sidebarItem} ${activePanel === 'styles' ? styles.activePanel : ''}`}
        onClick={() => handleTogglePanel('styles')}>
          <StylesIcon /> Fabric</div>

        <div 
      className={`${styles.sidebarItem} ${activePanel === 'sizes' ? styles.activePanel : ''}`}
        onClick={() => handleTogglePanel('sizes')}>
          <SizesIcon /> Sizes</div>

        <div 
        className={`${styles.sidebarItem} ${activePanel === 'colour' ? styles.activePanel : ''}`}
        onClick={() => handleTogglePanel('colour')}>
          <BackgroundColorIcon /> Colour</div>
      <div 
      className={`${styles.sidebarItem} ${activePanel === 'savedTemplate' ? styles.activePanel : ''}`} 
      onClick={() => handleTogglePanel('savedTemplate')}><SavedTemplateIcon /> Saved Template</div>
      </div>
 

      {activePanel && (
        <SlidingPanel activePanel={activePanel} onClose={() => setActivePanel(null)} setActivePanel={setActivePanel}  onFileUpload={onFileUpload} onColorChange={onColorChange} onSizeSelect={onSizeSelect} customizedProduct={customizedProduct}/>
      )}
    </div>
  );
};

export default Sidebar;