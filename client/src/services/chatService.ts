import { blendkoApi } from './api';
const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const chatService = blendkoApi.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (message) => ({
        url: '/chat',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { message },
      }),
    }),
    createGuestChat: builder.mutation({
      query: ({ message, name, email, phone }) => ({
        url: '/chat/guest',
        method: 'POST',
        body: { message, name, email, phone },
      }),
    }),
    getChats: builder.query({
      query: () => ({
        url: '/chat/admin',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getChat: builder.query({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getUserChats: builder.query({
      query: () => ({
        url: '/chat/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, message, guestId, sender }) => {
        const token = getToken();
        const headers = token && !guestId ? { Authorization: `Bearer ${token}` } : {};
        
        return {
          url: `/chat/${chatId}/message`,
          method: 'POST',
          headers,
          body: { message, guestId, sender },
        };
      },
    }),
    updateChatStatus: builder.mutation({
      query: ({ chatId, status }) => ({
        url: `/chat/${chatId}/status`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { status },
      }),
    }),
    closeChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}/close`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useCreateGuestChatMutation,
  useGetChatsQuery,
  useGetChatQuery,
  useGetUserChatsQuery,
  useSendMessageMutation,
  useUpdateChatStatusMutation,
  useCloseChatMutation,
} = chatService;
