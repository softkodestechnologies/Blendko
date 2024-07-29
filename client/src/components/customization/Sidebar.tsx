import React, { useState, useEffect } from 'react';
import styles from './customize.module.css';
import SlidingPanel from './SlidingPanel';
import MobileSlidingPanel from './MobileSlidingPanel';
import { FaTshirt, FaPalette, FaRuler, FaPaintBrush, FaChevronRight } from 'react-icons/fa';

interface SidebarProps {
  onToggleCanvasWidth: () => void;
  onFileUpload: (file: File) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCanvasWidth, onFileUpload }) => {
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
              <div className={styles.sidebarItem} onClick={() => handleTogglePanel('styles')}><FaRuler /> Styles</div>
              <div className={styles.sidebarItem} onClick={() => handleTogglePanel('colour')}><FaPaintBrush /> Colour</div>
            </div>
          )}
          <div className={styles.mobileBottomBar}>
            <div className={styles.sidebarItem} onClick={() => handleTogglePanel('product')}><FaTshirt /> Product</div>
            <div className={styles.sidebarItem} onClick={() => handleTogglePanel('design')}><FaPalette /> Design</div>
            <button title="right-arrow" className={styles.expandButton} onClick={toggleExpand}>
              <FaChevronRight />
            </button>
          </div>
        </div>
        {activePanel && (
          <MobileSlidingPanel activePanel={activePanel} onClose={() => setActivePanel(null)} setActivePanel={setActivePanel} onFileUpload={onFileUpload}/>
        )}
      </>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('product')}><FaTshirt /> Product</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('files')}>Files</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('styles')}><FaRuler /> Styles</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('sizes')}>Sizes</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('colour')}><FaPaintBrush /> Colour</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('savedTemplate')}>Saved Template</div>
      {activePanel && (
        <SlidingPanel activePanel={activePanel} onClose={() => setActivePanel(null)} setActivePanel={setActivePanel}  onFileUpload={onFileUpload}/>
      )}
    </div>
  );
};

export default Sidebar;
