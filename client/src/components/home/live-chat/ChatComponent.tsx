"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatComponent.module.css';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatState, setChatState] = useState<'initial' | 'started'>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const togglePanel = () => {
    setIsChatPanelOpen(!isChatPanelOpen);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    togglePanel();
  };

  const startNewChat = () => {
    setChatState('started');
    // Here you would typically initialize a new chat session with your backend
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      // Here you would typically send the message to your backend
    }
  };

  return (
    <div className={styles.chatContainer}>
      {!isOpen && (
        <button onClick={togglePanel} className={styles.chatButton} title="Open chat">
          <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </button>
      )}
      
      {isChatPanelOpen && (
        <div onClick={toggleChat} className={`${styles.chatPanel} ${styles.chatPanelRight}`}>
          <div className={styles.chatPanelContent}>
            <span>Chat with us 👋</span>
          </div>
        </div>
      )}
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <span>Blendko Support Team</span>
          </div>
          <div className={styles.chatBody}>
            {chatState === 'initial' ? (
              <div className={styles.chatInitial}>
                <svg className={styles.iconLarge} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <p>Start a conversation</p>
                <button onClick={startNewChat} className={styles.startChatButton}>
                  Start new chat
                </button>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message} ${
                      msg.sender === 'user' ? styles.userMessage : styles.supportMessage
                    }`}
                  >
                    <span>{msg.content}</span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          {chatState === 'started' && (
            <div className={styles.chatInput}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className={styles.messageInput}
              />
              <button className={styles.attachButton} title="Attach file">
                <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
              <button onClick={sendMessage} className={styles.sendButton} title="Send message">
                <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

    {isOpen && (
        <button onClick={toggleChat} className={styles.chatButton} title="Close chat">
            <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
      )}
    </div>
  );
};
export default ChatComponent;