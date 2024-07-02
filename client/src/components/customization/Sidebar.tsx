"use client";
import React, { useState } from 'react';
import styles from './customize.module.css';
import SlidingPanel from './SlidingPanel';
import { FaShoppingBag, FaFile, FaPalette, FaRuler, FaPaintBrush, FaSave } from 'react-icons/fa';

const Sidebar = ({ onToggleCanvasWidth }: { onToggleCanvasWidth: () => void }) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleTogglePanel = (panel: string) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('product')}><FaShoppingBag /> Product</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('files')}><FaFile /> Files</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('styles')}><FaPalette /> Styles</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('sizes')}><FaRuler /> Sizes</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('colour')}><FaPaintBrush /> Colour</div>
      <div className={styles.sidebarItem} onClick={() => handleTogglePanel('savedTemplate')}><FaSave /> Saved Template</div>
      {activePanel && (
        <SlidingPanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
      )}
      {/**<button className={styles.toggleCanvasButton} onClick={onToggleCanvasWidth}>Toggle Canvas Width</button>**/}
    </div>
  );
};

export default Sidebar;

