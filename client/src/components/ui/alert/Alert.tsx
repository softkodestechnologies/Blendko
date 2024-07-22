import React, { useEffect, useState } from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number; 
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.alert} ${styles[type]} ${isVisible ? styles.show : styles.hide}`}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={() => setIsVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default Alert;