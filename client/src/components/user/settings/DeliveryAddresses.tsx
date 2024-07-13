import React from 'react';
import styles from './Settings.module.css';

const DeliveryAddresses: React.FC = () => {
  return (
    <div className={styles.deliveryAddresses}>
      <h2>Saved Delivery Addresses</h2>
      <div className={styles.addressList}>
        <div className={styles.address}>
          <button className={styles.editButton}>Edit</button>
          <h3>Ju Ino</h3>
          <p>Lovery Way drive, 1245J</p>
          <p>New york</p>
          <p>E1 7DD</p> 
        </div>
      </div>
      <div className={styles.addAddressParent}>
        <button className={styles.addAddressButton}>Add Address</button>
      </div>
    </div>
  );
};

export default DeliveryAddresses;