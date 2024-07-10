import React from 'react';
import styles from './User.module.css';
import Image from 'next/image';

const InboxMessages: React.FC = () => {
  const messages = [
    {
      id: 1,
      timeAgo: '3 days ago',
      title: 'Cancelled',
      content: 'Item(s) in your order no.12349039 have been cancelled. Please check your email for more details. If you need assistance placing a new order, please call Sales Support team at 07811390002013.',
      productImageSrc: '/people.png',
      productImageAlt: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
      productDescription: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
    },
    {
      id: 2,
      timeAgo: '1 week ago',
      title: 'Shipped',
      content: 'Your order no.12457839 has been shipped. You can track your order using the tracking number sent to your email.',
      productImageSrc: '/people.png',
      productImageAlt: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
      productDescription: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
    },
    {
      id: 3,
      timeAgo: '2 weeks ago',
      title: 'Order Placed',
      content: 'Your order no.12569043 has been placed successfully. We will notify you once it is shipped.',
      productImageSrc: '/people.png',
      productImageAlt: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
      productDescription: 'Quality Rack-Cloth Floor Hanger And Storage (Black Color)',
    },
  ];

  return (
    <section className={styles.inboxMessages}>
      <h2>Inbox Messages</h2>
      {messages.map((message) => (
        <div key={message.id} className={styles.message}>
          <p>{message.timeAgo}</p>
          <h3>{message.title}</h3>
          <p>{message.content}</p>
          <div className={styles.productInfo}>
            <Image
              src={message.productImageSrc}
              alt={message.productImageAlt}
              width={200}
              height={200}
            />
            <p>{message.productDescription}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InboxMessages;
