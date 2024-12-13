"use client";
import React, {useState} from 'react';
import styles from './customize.module.css';
import PreviewModal from './PreviewModal';

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
  onAddNew: () => void;
  canvasRef: React.RefObject<any>;
}

const Toolbar: React.FC<ToolbarProps> = ({ undo, redo, reset, saveAsTemplate, addToCart,  onAddNew, canvasRef }) => {

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = async () => {
    setIsPreviewOpen(true);
  };

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
          <button title="reset" className={`${styles.toolbarIcons} ${styles.resetBtn}`} onClick={reset}><ResetIcon /></button>
        </div>
        <button title="preview" className={`${styles.toolbarIcons} ${styles.previewIcons}`} onClick={handlePreview}><PreviewIcon />Preview</button>
        {isPreviewOpen && (
          <PreviewModal 
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            canvasRef={canvasRef}
          />
        )}
        <button className={styles.addNew} onClick={onAddNew}><span>+</span>Add New</button>
      </div>
    </div>
  );
};

export default Toolbar;
