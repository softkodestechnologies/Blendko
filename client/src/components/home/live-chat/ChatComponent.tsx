"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { useCreateChatMutation, useCreateGuestChatMutation, useSendMessageMutation, useGetUserChatsQuery, useGetChatQuery } from '@/services/chatService';
import useSocket from '@/utils/hooks/useSocket';
import styles from './ChatComponent.module.css';
import { CloseXIcon, SendChatIcon } from '../../../../public/svg/icon';



interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
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
  const { data: chatData, isLoading: currentChatLoading, error: chatError, refetch: refetchChat } = useGetChatQuery(chatId || '', { 
    skip: !chatId || chatId === 'user',
    refetchOnMountOrArgChange: true
  });
  

  const { isConnected, emit, on, off } = useSocket('http://localhost:8080');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const id = localStorage.getItem('user')
    const storedUserId = id ? JSON.parse(id)._id : null;
    const storedChatId = localStorage.getItem('chatId');
    const storedGuestId = localStorage.getItem('guestId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    } else if (storedGuestId) {
      setGuestId(storedGuestId);
      setIsGuest(true);
    } else {
      setIsGuest(true);
    }

    if (storedChatId) {
      setChatId(storedChatId);
      setChatState('started');
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      on('newMessage', (data: { chatId: string, message: Message }) => {
        console.log('New message received:', data);

        if (data.chatId === chatId) {
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some(
              msg => msg.sender === data.message.sender && msg.content === data.message.content
            );
  
            if (messageExists) {
              console.log('Duplicate message detected, skipping:', data.message);
              return prevMessages; 
            }
            return [...prevMessages, { ...data.message, timestamp: new Date() }];
          });
        }
      });

      if (chatId) {
        emit('join chat', chatId);
      }
    }
  }, [ emit]);

  useEffect(() => {
    if (chatData?.chat && Array.isArray(chatData.chat.messages)) {
      const formattedMessages = chatData.chat.messages.map((msg: any) => ({
        id: msg._id,
        sender: msg.sender,
        content: msg.content,
        timestamp: new Date(msg.createdAt),
        isAdmin: msg.isAdmin
      }));
      setMessages(formattedMessages);
    }
  }, [chatData]);

  useEffect(() => {
    console.log(inputMessage)
  }, [inputMessage]);

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

  const toggleClose = () => {
    setIsOpen(!isOpen);
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

      if (isConnected && result?.chat?._id) {
        emit('join chat', result.chat._id);
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
          sender: isGuest ? 'guest' : 'user',
          isAdmin: false,
        };
        console.log('MessageData', messageData);
  
        await sendMessage(messageData).unwrap();
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
      <button className={styles.startChatBtn} onClick={startNewChat}>Start Chat</button>
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

  console.log('messages', messages)

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
                  <button className={styles.startChatButton} onClick={startNewChat}>Start new chat</button>
                </div>
              )
            ) : (
              <>
                {messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message} ${msg.isAdmin ? styles.supportMessage : styles.userMessage}`}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className={styles.messageInput}
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                <SendChatIcon />
                Send
              </button>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <button onClick={toggleClose} className={styles.chatButton} title="Close chat">
          <CloseXIcon />
        </button>
      )}
    </div>
  );
};

export default ChatComponent;