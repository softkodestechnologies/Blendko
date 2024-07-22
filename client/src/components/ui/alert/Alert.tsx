import React from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;