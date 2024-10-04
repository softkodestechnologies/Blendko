"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGetChatsQuery, useGetChatQuery, useSendMessageMutation } from '@/services/chatService';
import useSocket from '@/utils/hooks/useSocket';
import styles from './ChatSupport.module.css';
import { SendChatIcon } from '../../../../public/svg/icon';

interface Message {
  _id: string;
  sender: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
}

interface Chat {
  _id: string;
  participants: Array<{ _id: string; name: string }>;
  messages: Message[];
  status: string;
  createdAt: string;
  updatedAt: string;
}


const ChatSupport: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const { data: chatsData, isLoading: isChatsLoading, refetch: refetchChats } = useGetChatsQuery({});
  const { data: chatData, refetch: refetchChat } = useGetChatQuery(selectedChat?._id, {
    skip: !selectedChat?._id,
  });
  const [sendMessage] = useSendMessageMutation();
  const { isConnected, emit, on, off } = useSocket('http://localhost:8080/');
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = useCallback((data: { chatId: string; message: Message }) => {
    if (selectedChat && data.chatId === selectedChat._id) {
      setSelectedChat(prevChat => {
        if (!prevChat) return null;
        
        const messageWithTimestamp = {
          ...data.message,
          createdAt: data.message.createdAt || new Date().toISOString(), 
        };
  
        return {
          ...prevChat,
          messages: [...prevChat.messages, messageWithTimestamp]
        };
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    if (isConnected) {
      on('newMessage', handleNewMessage);
      on('newChat', refetchChats);
    }

    return () => {
      if (isConnected) {
        off('newMessage', handleNewMessage);
        off('newChat', refetchChats);
      }
    };
  }, [isConnected, handleNewMessage, refetchChats, on, off]);

  useEffect(() => {
    if (chatData) {
      setSelectedChat(chatData.chat);
    }
  }, [chatData]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);


  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    emit('join chat', chat._id);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      await sendMessage({
        chatId: selectedChat._id,
        message,
        sender: 'admin',
      }).unwrap();
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  function renderMessage(message: Message) {
    const messageClass = message.isAdmin === true ? styles.adminMessage : styles.userMessage;
    const alignClass = message.isAdmin === true ? styles.messageRight : styles.messageLeft;
     console.log('MESSAGE', message)
     console.log('MESSAGE DATE', message.createdAt)
    const messageTime = new Date(Date.parse(message.createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return (
      <div className={`${messageClass} ${alignClass}`}>
        <span className={styles.messageContent}>
          {message.content}
          <br />
          {messageTime}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.chatSupportContainer}>
      <div className={styles.chatList}>
        <div className={styles.adminInfo}>
          <span className={styles.adminName}>Femi Jude</span>
        </div>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
        {chatsData?.chats?.map((chat: Chat) => (
          <div
            key={chat._id}
            className={`${styles.chatItem} ${selectedChat?._id === chat._id ? styles.active : ''}`}
            onClick={() => handleChatClick(chat)}
          >
            <div className={styles.chatInfo}>
              <span className={styles.userName}>{chat.participants[0]?.name || 'Unknown User'}</span>
            </div>
            <span className={styles.timestamp}>
              {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {selectedChat ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{selectedChat.participants[0]?.name || 'Unknown User'}</span>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.actionButton}>
                  call
                </button>
                <button className={styles.actionButton}>
                  email
                </button>
              </div>
            </div>
            <div className={styles.messageList} ref={messageListRef}>
              {selectedChat.messages.map((msg) => renderMessage(msg))}
            </div>
            <div className={styles.messageInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                <SendChatIcon /> Send
              </button>
            </div>

          </>
        ) : (
          <div className={styles.noChatSelected}>Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;


