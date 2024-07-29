import React from 'react';
import { FaFileUpload } from 'react-icons/fa';
import styles from './customize.module.css';

interface FileInputComponentProps {
  onFileUpload: (file: File) => void;
}

const FileInputComponent: React.FC<FileInputComponentProps> = ({ onFileUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className={styles.filesComponent}>
      <h3>Files</h3>
      <label className={styles.fileInputLabel}>
        <FaFileUpload className={styles.icon} />
        <span>Choose file</span>
        <input 
          title="file-input" 
          type="file" 
          accept=".png" 
          onChange={handleFileUpload} 
          className={styles.fileInput}
        />
      </label>
    </div>
  );
};

export default FileInputComponent;
