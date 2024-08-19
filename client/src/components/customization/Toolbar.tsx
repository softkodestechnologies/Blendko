import React from 'react';
import styles from './customize.module.css';
import { FaUndo, FaRedo } from 'react-icons/fa';

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  reset: () => void;
  saveAsTemplate: () => void;
  addToCart: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ undo, redo, reset, saveAsTemplate, addToCart }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <button className={styles.toolbarIcons} onClick={undo}>↩</button>
        <button className={styles.toolbarIcons} onClick={redo}>↪</button>
        <button className={styles.toolbarIcons} onClick={reset}>○</button>
      </div>
      <div className={styles.toolbarRight}>
        <button className={styles.toolbarButton} onClick={saveAsTemplate}>Save as Template</button>
        <button className={styles.toolbarButton} onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Toolbar;