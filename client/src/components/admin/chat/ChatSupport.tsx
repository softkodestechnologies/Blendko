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
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
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
    refetchOnMountOrArgChange: true, 
  });
  const [sendMessage] = useSendMessageMutation();
  const { isConnected, emit, on, off } = useSocket('http://localhost:8080/');
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = useCallback((data: { chatId: string; message: Message }) => {
    setSelectedChat(prevChat => {
      if (!prevChat || data.chatId !== prevChat._id) return prevChat;
      
      const messageWithTimestamp = {
        ...data.message,
        createdAt: data.message.createdAt || new Date().toISOString(), 
      };

      return {
        ...prevChat,
        messages: [...prevChat.messages, messageWithTimestamp]
      };
    });

    // Update the chat in the chatsData list as well
    if (chatsData) {
      const updatedChats = chatsData.chats.map((chat: Chat) => 
        chat._id === data.chatId 
          ? { ...chat, messages: [...chat.messages, data.message] }
          : chat
      );
      // Force a re-render of the chat list
      refetchChats();
    }
  }, [chatsData, refetchChats]);
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
    if (chatData?.chat) {
      setSelectedChat(prevChat => {
        if (prevChat?._id !== chatData.chat._id) {
          return chatData.chat;
        }
        return prevChat;
      });
    }
  }, [chatData]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(null);
    
    setTimeout(() => {
      setSelectedChat(chat);
      emit('join chat', chat._id);
    }, 0);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const result = await sendMessage({
        chatId: selectedChat._id,
        message,
        sender: 'admin',
      }).unwrap();
      
      // Update the local state with the new message
      setSelectedChat(prevChat => {
        if (!prevChat) return null;
        return {
          ...prevChat,
          messages: [...prevChat.messages, result.message]
        };
      });
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  function renderMessage(message: Message | undefined) {
    if (!message) {
      console.error('Received undefined message');
      return null; 
    }
  
    const messageClass = message.isAdmin === true ? styles.adminMessage : styles.userMessage;
    const alignClass = message.isAdmin === true ? styles.messageRight : styles.messageLeft;
    
    let messageTime;
    try {
      messageTime = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error parsing message date:', error);
      messageTime = 'Invalid Date';
    }
  
    return (
      <div key={message._id} className={`${messageClass} ${alignClass}`}>
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
              <span className={styles.userName}>{chat.guestInfo?.name || chat.participants[0]?.name || 'Unknown User'}</span>
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
                <span className={styles.userName}>{selectedChat.guestInfo?.name || selectedChat.participants[0]?.name || 'Unknown User'}</span>
              </div>
              <div className={styles.chatActions}>
              {selectedChat.guestInfo?.phone && 
                <button className={styles.actionButton}>
                  call: {selectedChat.guestInfo.phone}
                </button>}
                {selectedChat.guestInfo?.email &&
                <button className={styles.actionButton}>
                  email: {selectedChat.guestInfo.email}
                </button>}
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