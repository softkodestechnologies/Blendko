"use client";
import React from 'react';
import styles from './User.module.css';
import Image from 'next/image';
import { useGetInboxMessagesQuery, useMarkMessageAsReadMutation } from '@/services/userService';
import { formatDate } from '@/utils/helpers/dateUtils';

const InboxMessages: React.FC = () => {
  const { data, isLoading, isError } = useGetInboxMessagesQuery({});
  const [markAsRead] = useMarkMessageAsReadMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading messages</div>;

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsRead(messageId).unwrap();
    } catch (error) {
      console.error('Failed to mark message as read', error);
    }
  };

  return (
    <section className={styles.inboxMessages}>
      <h2>Inbox Messages</h2>
      {data?.messages && data.messages.length > 0 ? (
        data.messages.map((message: any) => (
          <div key={message._id} className={styles.message} onClick={() => handleMarkAsRead(message._id)}>
            <p>{formatDate(message.createdAt)}</p>
            <h3>{message.title}</h3>
            <p>{message.content}</p>
            {message.orderId && message.orderId.orderItems && (
              <div className={styles.productInfo}>
                <Image
                  src={message.orderId.orderItems[0].image.url}
                  alt={message.orderId.orderItems[0].name}
                  width={200}
                  height={200}
                />
                <p>{message.orderId.orderItems[0].name}</p>
              </div>
            )}
            {!message.read && <span className={styles.unreadBadge}>New</span>}
          </div>
        ))
      ) : (
        <div>No messages found.</div>
      )}
    </section>
  );
};

export default InboxMessages;
