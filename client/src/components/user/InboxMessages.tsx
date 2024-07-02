import React from 'react';
import styles from './User.module.css';
import Image from 'next/image'

const InboxMessages: React.FC = () => {
  return (
    <section className={styles.inboxMessages}>
      <h2>Inbox Messages</h2>
      <div className={styles.message}>
        <p>3 days ago</p>
        <h3>Cancelled</h3>
        <p>Item(s) in your order no.12349039 have been cancelled. Please check your email for more details. If you need assistance placing a new order, please call Sales Support team at 07811390002013.</p>
        <div className={styles.productInfo}>
          <Image src="/people.png" alt="Quality Rack-Cloth Floor Hanger And Storage (Black Color)"
          width={200} height={200} />
          <p>Quality Rack-Cloth Floor Hanger And Storage (Black Color)</p>
        </div>
      </div>
      {/* Repeat the above message div for the second message */}
    </section>
  );
};

export default InboxMessages;