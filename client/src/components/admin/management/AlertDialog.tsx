import React, { useState } from 'react';
import styles from './AlertDialog.module.css';

interface AlertDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  trigger: React.ReactNode;  
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  trigger  
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)} className={styles.trigger}>
        {trigger}  
      </span>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.actions}>
              <button onClick={handleCancel} className={styles.cancelButton}>
                {cancelLabel}
              </button>
              <button onClick={handleConfirm} className={styles.confirmButton}>
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertDialog;