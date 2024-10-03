"use client";
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useCreateChatMutation, useCreateGuestChatMutation, useSendMessageMutation, useGetUserChatsQuery, useGetChatQuery } from '@/services/chatService';
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
  const [showPopup, setShowPopup] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  const [isGuest, setIsGuest] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [createChat] = useCreateChatMutation();
  const [createGuestChat] = useCreateGuestChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data: userChats, isLoading: userChatsLoading } = useGetUserChatsQuery({}, { skip: !userId });
  const { data: currentChat, isLoading: currentChatLoading } = useGetChatQuery(chatId || '', { skip: !chatId });

  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const id = localStorage.getItem('user')
    const storedUserId = id ? JSON.parse(id)._id : null;
    const storedChatId = localStorage.getItem('chatId');
    const storedGuestId = localStorage.getItem('guestId');
    console.log('storedToken', storedToken)
    console.log('storedUserId', storedUserId)
    console.log('storedChatId', storedChatId)
    console.log('storedGuestId', storedGuestId)
  
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    } else if (storedGuestId) {
      setGuestId(storedGuestId);
      setIsGuest(true);
    }
  
    if (storedChatId) {
      setChatId(storedChatId);
      setChatState('started');
    }
  
  
    if (storedToken || storedGuestId) {
      socketRef.current = io('http://localhost:8080', {
        auth: {
          token: storedToken || undefined, 
          guestId: storedGuestId || undefined 
        },
      });

      socketRef.current.on('connect', () => {
        console.log('New client connected');
        console.log(`Socket ID: ${socketRef?.current?.id}`);
      });
      
      socketRef.current.on('disconnect', () => {
        console.log('Client disconnected');
      });
  
      socketRef.current.on('newMessage', (data: { chatId: string, message: Message }) => {
        console.log('New message received:', data);
        if (data.chatId === chatId) {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        }
      });
  
      socketRef.current.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatId]);  

  useEffect(() => {
    if (currentChat && currentChat.messages) {
      console.log('Current Chat Data:', currentChat);
      const formattedMessages = currentChat.messages.map((msg: any) => ({
        id: msg._id,
        sender: msg.sender,
        content: msg.content,
        timestamp: new Date(msg.createdAt),
      }));
      setMessages(formattedMessages);
    }
  }, [currentChat]);
  
  

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
  
  const continueExistingChat = () => {
    setChatState('started');
    setShowPopup(false);
    if (socketRef.current && chatId) {
      socketRef.current.emit('join chat', chatId);
    }
  };

  const startNewChat = async () => {
    try {
      console.log('Attempting to start new chat');
      setChatState('started');
      setShowPopup(false);
      console.log(isGuest, 'guest')
      console.log(userId, 'user id')
      console.log(token, 'token')
      let result;
  
      if (isGuest) {
        result = await createGuestChat({ message: inputMessage || 'Hello!', ...guestInfo }).unwrap();
        console.log('Guest Chat Result:', result);
        setGuestId(result.guestId);
        setChatId(result.chat._id);
        localStorage.setItem('guestId', result.guestId);
        localStorage.setItem('chatId', result.chat._id);
      } else if (userId && token) {
        result = await createChat(inputMessage || 'Hello!').unwrap();
        console.log('User Chat Result:', result);
        setChatId(result.chat._id);
        localStorage.setItem('chatId', result.chat._id);
      }
  
      if (socketRef.current && result?.chat?._id) {
        socketRef.current.emit('join chat', result.chat._id);
      }
  
      setInputMessage('');
    } catch (error) {
      console.error('Failed to start new chat:', error);
    }
  };
  

  const handleSendMessage = async () => {
    if (inputMessage.trim() && chatId) {
      try {
        const messageData = {
          chatId,
          message: inputMessage,
          guestId: isGuest ? guestId : undefined,
          sender: isGuest ? 'guest' : 'user'
        };
        await sendMessage(messageData).unwrap();
        setMessages(prevMessages => [
          ...prevMessages,
          { id: 'temp', sender: isGuest ? 'guest' : 'user', content: inputMessage, timestamp: new Date() } 
        ]);
        setInputMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };
  
  
  

  const renderGuestForm = () => (
    <div className={styles.guestForm}>
      <input
        type="text"
        placeholder="Name (optional)"
        value={guestInfo.name}
        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={guestInfo.email}
        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={guestInfo.phone}
        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
      />
      <button onClick={startNewChat}>Start Chat</button>
    </div>
  );

  const renderChatPopup = () => (
    <div className={styles.chatPopup}>
      <h3>Already have an ongoing chat</h3>
      <p>Leaving the same questions multiple times may delay responses</p>
      <button onClick={startNewChat}>Start a new conversation</button>
      <button onClick={continueExistingChat}>Continue existing conversation</button>
      <button onClick={() => setShowPopup(false)}>Cancel</button>
    </div>
  );

  console.log('messages', messages)//line 208

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
            <span>Blennko Support Team</span>
          </div>
          <div className={styles.chatBody}>
            {showPopup && renderChatPopup()}
            {chatState === 'initial' ? (
              isGuest ? renderGuestForm() : (
                <div className={styles.chatInitial}>
                  <p>Start a conversation</p>
                  <button onClick={startNewChat}>Start new chat</button>
                </div>
              )
            ) : (
              <>
                {messages?.map((msg) => (
                    <div
                      key={msg._id}
                      className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.supportMessage}`}
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
              <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <button onClick={toggleChat} className={styles.chatButton} title="Close chat">
          <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatComponent;
