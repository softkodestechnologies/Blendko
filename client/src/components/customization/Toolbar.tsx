import React from 'react';
import styles from './customize.module.css';
import CustomizeSection from '../home/customize/CustomizeSection';
import {
  UndoIcon,
  RedoIcon,
  ResetIcon,
  PreviewIcon
 } from './../../../public/svg/icon';

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  reset: () => void;
  saveAsTemplate: () => void;
  addToCart: () => void;
}

function preview() {
  //just temp function to remove error in preview
}

function addNew() {
  //this function should connect to customize page and import designs onto the 3d model
}

const Toolbar: React.FC<ToolbarProps> = ({ undo, redo, reset, saveAsTemplate, addToCart }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarTop}>
        <p>Home &gt; Shop &gt; Men &gt; <b>Customize</b></p>
        <div className={styles.toolbarTopRight}>
          <div className={styles.toolbarPrice}>
            <p>Price</p>
            <h5>400 EUR</h5>
          </div>
          <button className={styles.saveAsTemplateBtn} onClick={saveAsTemplate}>Save as Template</button>
          <button className={styles.addToCartBtn} onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className={styles.toolbarBottom}>
        <div className="flex space-between gap-10">
          <button title="undo" className={styles.toolbarIcons} onClick={undo}><UndoIcon /></button>
          <button title="redo" className={styles.toolbarIcons} onClick={redo}><RedoIcon /></button>
          <button title="reset" className={styles.toolbarIcons} onClick={reset}><ResetIcon /></button>
        </div>
        <button className={`${styles.toolbarIcons} ${styles.previewIcons}`} onClick={preview}><PreviewIcon />Preview</button>
        <button className={styles.addNew} onClick={addNew}><span>+</span>Add New</button>
      </div>
    </div>
  );
};

export default Toolbar;