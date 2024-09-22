import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CustomerModal.module.css';

interface CustomerModalProps {
  customer: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    memberSince: string;
    address: string;
    totalOrders: number;
    completedOrders: number;
    canceledOrders: number;
  };
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onClose }) => {
  //Reminder: the backend only sends half the details for users. change it
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <div className={styles.customerInfo}>
            <div className={styles.avatar}>
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.customerInfoHead}>
              <h4>{customer.name}</h4>
              <p>{customer.email}</p>
            </div>
          </div>

          <button title="close" className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.bottomSection}>
          <div className={styles.infoSection}>
            <p className={styles.infoTitle}>PERSONAL INFORMATION</p>
            <div className={styles.infoGrid}>
              <div>
                <p>Contact Number</p>
                <p>{customer.phone}</p>
              </div>
              <div>
                <p>Gender</p>
                <p>{customer.gender}</p>
              </div>
              <div>
                <p>Date of Birth</p>
                <p>{customer.dateOfBirth}</p>
              </div>
              <div>
                <p>Member Since</p>
                <p>{customer.memberSince}</p>
              </div>
            </div>
          </div>
          <div className={styles.verticalRule}></div>
          <div className={styles.infoSection}>
            <p className={styles.infoTitle}>SHIPPING ADDRESS</p>
            <p>{customer.address}</p>
          <div className={styles.orderStats}>
            <div>
              <h2>{customer.totalOrders}34</h2>
              <p>Total Orders</p>
            </div>
            <div>
              <h2>{customer.completedOrders}45</h2>
              <p>Completed</p>
            </div>
            <div>
              <h2>{customer.canceledOrders}56</h2>
              <p>Canceled</p>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;