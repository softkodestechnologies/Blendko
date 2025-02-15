// PaymentMethods.js
import styles from './payment-methods.module.css';
import { Applepay, Visa, Clearpay, Googlepay, Amex, Klarna, Paypal, Mastercard } from '../../../../public/svg/icon';

function PaymentMethods() {
  return (
    <div className={styles.paymentSection}>
      <p className={styles.paymentTitle}>Pay Securely With</p>
      <div className={styles.paymentIcons}>
        <div className={styles.iconContainer}>
          {/* Visa */}
          <Visa />
        </div>
        <div className={styles.iconContainer}>
          {/* Mastercard */}
          <Mastercard />
        </div>
        <div className={styles.iconContainer}>
          {/* Amex */}
          <Amex />
        </div>
        <div className={styles.iconContainer}>
          {/* PayPal */}
          <Paypal />
        </div>
        <div className={styles.iconContainer}>
          {/* Apple Pay */}
          <Applepay />
        </div>
        <div className={styles.iconContainer}>
          {/* Google Pay */}
          <Googlepay />
        </div>
        <div className={styles.iconContainer}>
          {/* Klarna */}
          <Klarna />
        </div>
        <div className={styles.iconContainer}>
          {/* Clearpay */}
          <Clearpay />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;