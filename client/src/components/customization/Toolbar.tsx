import React from 'react';
import styles from './customize.module.css';
import { FaUndo, FaRedo } from 'react-icons/fa';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <button className={styles.toolbarButton}><FaUndo /> Undo</button>
        <button className={styles.toolbarButton}><FaRedo /> Redo</button>
      </div>
      <div className={styles.toolbarRight}>
        <button className={styles.toolbarButton}>Save as Template</button>
        <button className={styles.toolbarButton}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Toolbar;
