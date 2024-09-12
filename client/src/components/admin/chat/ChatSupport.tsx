import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ChatSupport.module.css';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  lastActive: string;
}

const ChatSupport: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Xxuxe Feng', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', timestamp: '21:25' },
    { id: 2, sender: 'Xxuxe Feng', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', timestamp: '21:26' },
    { id: 3, sender: 'Jude.femi@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', timestamp: '21:26' },
  ]);

  const contacts: Contact[] = [
    { id: 1, name: 'Xxuxe Feng', lastMessage: 'Hi, I ordered for an item...', lastActive: '2d' },
    { id: 2, name: 'Ning Lin', lastMessage: 'Hi, I ordered for an item...', lastActive: '1h' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'Jude.femi@gmail.com',
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className={styles.chatSupport}>
      <div className={styles.sidebar}>
        <div className={styles.profile}>
          <Image src="/path-to-profile-image.jpg" alt="Femi Jude" width={50} height={50} />
          <h2>Femi Jude</h2>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
        </div>
        <div className={styles.contactList}>
          {contacts.map((contact) => (
            <div key={contact.id} className={styles.contactItem} onClick={() => setSelectedContact(contact)}>
              {/* <Image src={`/path-to-${contact.name}-image.jpg`} alt={contact.name} width={40} height={40} /> */}
              <div>
                <h3>{contact.name}</h3>
                <p>{contact.lastMessage}</p>
              </div>
              <span>{contact.lastActive}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chatArea}>
        {selectedContact ? (
          <>
            <div className={styles.chatHeader}>
              <Image src={`/lady-in-trad.png`} alt={selectedContact.name} width={40} height={40} />
              <div>
                <h3>{selectedContact.name}</h3>
                <p>Last active {selectedContact.lastActive} ago</p>
              </div>
              <div className={styles.headerIcons}>
                <button aria-label="Call"><Image src="/path-to-call-icon.svg" alt="Call" width={24} height={24} /></button>
                <button aria-label="Email"><Image src="/path-to-email-icon.svg" alt="Email" width={24} height={24} /></button>
              </div>
            </div>
            <div className={styles.messageList}>
              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.message} ${msg.sender === 'Jude.femi@gmail.com' ? styles.sent : styles.received}`}>
                  <p>{msg.content}</p>
                  <span>{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <div className={styles.messageInput}>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className={styles.emojiButton}>😊</button>
              <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className={styles.noSelection}>
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;