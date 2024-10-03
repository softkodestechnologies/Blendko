import React, { useState, useEffect } from 'react';
import { useGetChatsQuery, useGetChatQuery, useSendMessageMutation } from '@/services/chatService';
import styles from './ChatSupport.module.css';

interface Message {
  _id: string;
  sender: string;
  content: string;
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
  const { data: chatsData, isLoading: isChatsLoading } = useGetChatsQuery({});
  const { data: chatData, refetch: refetchChat } = useGetChatQuery(selectedChat?._id, {
    skip: !selectedChat?._id,
  });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (chatData) {
      setSelectedChat(chatData.chat);
    }
  }, [chatData]);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
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
      refetchChat();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isChatsLoading) {
    return <div className={styles.loading}>Loading chats...</div>;
  }

  return (
    <div className={styles.chatSupportContainer}>
      <div className={styles.chatList}>
        <div className={styles.adminInfo}>
          <img src="/path/to/admin-avatar.jpg" alt="Admin" className={styles.adminAvatar} />
          <span className={styles.adminName}>Femi Jude</span>
        </div>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
        {chatsData?.chats?.map((chat: Chat) => (
          <div
            key={chat._id}
            className={`${styles.chatItem} ${selectedChat?._id === chat._id ? styles.active : ''}`}
            onClick={() => handleChatClick(chat)}
          >
            <img src="/path/to/user-avatar.jpg" alt="User" className={styles.userAvatar} />
            <div className={styles.chatInfo}>
              <span className={styles.userName}>{chat.participants[0]?.name || 'Unknown User'}</span>
              <span className={styles.lastMessage}>
                {chat.messages[chat.messages.length - 1]?.content.substring(0, 20)}...
              </span>
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
                <img src="/path/to/user-avatar.jpg" alt="User" className={styles.userAvatar} />
                <span className={styles.userName}>{selectedChat.participants[0]?.name || 'Unknown User'}</span>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.actionButton}>
                  <img src="/path/to/call-icon.svg" alt="Call" />
                </button>
                <button className={styles.actionButton}>
                  <img src="/path/to/email-icon.svg" alt="Email" />
                </button>
              </div>
            </div>
            <div className={styles.messageList}>
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${msg.sender === 'admin' ? styles.adminMessage : styles.userMessage}`}
                >
                  <div className={styles.messageContent}>{msg.content}</div>
                  <div className={styles.messageTime}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.messageInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                <img src="/path/to/send-icon.svg" alt="Send" />
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

