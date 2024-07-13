import React from 'react';
import styles from './Settings.module.css';
import { FaCcVisa } from 'react-icons/fa';
import { IoCardOutline } from 'react-icons/io5';
import Image from 'next/image';

const PaymentMethods: React.FC = () => {
  return (
    <div className={styles.paymentMethods}>
      <h2>Saved Payment Methods</h2>
      <div className={styles.savedCards}>
        <div className={styles.card}>
          <FaCcVisa className={styles.cardIcon} />
            <span>41xx xxxx xxxx 5609</span>
            <span>Femi Jude</span>
            <span>10/2024</span>
            <input type="text" placeholder="CVV" className={styles.cvvInput} />
            <div className={styles.payEditParent}>
              <button className={styles.editButton}>Edit</button>
            </div>
        </div>
      </div>
      <div className={styles.addPayBtnParent}>
        <button className={styles.addPaymentButton}>Add Payment Method</button>
      </div>

      <div className={styles.paymentOptionsParent}>
        <div className={styles.paymentOptions}>
          <span title="paypal" className={styles.paymentOption}><Image src="/logos_paypal.png" alt="PayPal"  width={24} height={24}/> Paypal</span>
          <span title="credit-card" className={styles.paymentOption}><IoCardOutline size={24}/> Credit Card</span>
          <span title="american-express" className={styles.paymentOption}><Image src="/logos_paypal.png" alt="American Express" width={24} height={24} /> Amex</span>
          <span title="apple-pay" className={styles.paymentOption}><Image src="/apple-pay.png" alt="Apple Pay" width={24} height={24} />Apple Pay</span>
          <span title="klarna" className={styles.paymentOption}><Image src="/klarna-pay.png" alt="Klarna" width={24} height={24} />Klarna</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;