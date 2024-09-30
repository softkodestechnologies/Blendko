import React, { useState, useEffect } from 'react';
import { useGetChatsQuery, useGetChatQuery, useSendMessageMutation } from '@/services/chatService';
import styles from './ChatSupport.module.css';

interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  lastMessage: string;
  lastActive: string;
}

const ChatSupport: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery({});
  const { data: chatData, refetch: refetchChat } = useGetChatQuery(selectedContact?._id, {
    skip: !selectedContact?._id,
  });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages);
    }
  }, [chatData]);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!selectedContact) return;

    try {
      await sendMessage({
        chatId: selectedContact._id,
        message,
        sender: 'admin', 
      }).unwrap();
      setMessage(''); 
      refetchChat(); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isChatsLoading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className={styles.chatSupportContainer}>
      <div className={styles.contactsList}>
        {chats?.map((contact: Contact) => (
          <div
            key={contact._id}
            className={`${styles.contactItem} ${selectedContact?._id === contact._id ? styles.active : ''}`}
            onClick={() => handleContactClick(contact)}
          >
            <div className={styles.contactName}>{contact.name}</div>
            <div className={styles.contactLastMessage}>{contact.lastMessage}</div>
            <div className={styles.contactLastActive}>{contact.lastActive}</div>
          </div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {selectedContact ? (
          <>
            <div className={styles.chatHeader}>
              <h3>{selectedContact.name}</h3>
            </div>
            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${msg.sender === 'admin' ? styles.adminMessage : styles.userMessage}`}
                >
                  <div className={styles.messageSender}>{msg.sender}</div>
                  <div className={styles.messageContent}>{msg.content}</div>
                  <div className={styles.messageTimestamp}>{new Date(msg.createdAt).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
            <div className={styles.messageInputContainer}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={styles.messageInput}
              />
              <button onClick={handleSendMessage} className={styles.sendMessageButton}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className={styles.noContactSelected}>Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;