import { blendkoApi } from './api';

type QueryType = {
  pp?: number;
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  price?: number | string[];
  rating?: number;
  sort?: string;
  order?: string;
  gender?: string;
  colors?: string
  subcategory?: string;
  [key: string]: string | number | undefined | string[];
};
const getToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const adminService = blendkoApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        method: 'POST',
        url: 'product/admin/new',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    getProduct: builder.query({
      query: (productId: string) => `product/${productId}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query({
      query: (params: QueryType) =>
        `product?${new URLSearchParams(
          params as Record<string, string>
        ).toString()}`,
      providesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `product/admin/${productId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getWishlist: builder.query<{ success: boolean, wishlist: Array<{ product: any, _id: string, addedAt: string }> }, {}>({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: '/wishlist/add',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: '/wishlist/remove',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    getDashboardData: builder.query({
      query: () => ({
        url: '/dashboard/data',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Dashboard'],
    }),
    getDeliveryAddress: builder.query({
      query: () => ({
        url: '/delivery-address',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['DeliveryAddress'],
    }),
    createDeliveryAddress: builder.mutation({
      query: (addressData) => ({
        url: '/delivery-address',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: addressData,
      }),
      invalidatesTags: ['DeliveryAddress'],
    }),
    updateDeliveryAddress: builder.mutation({
      query: (addressData) => ({
        url: '/delivery-address',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: addressData,
      }),
      invalidatesTags: ['DeliveryAddress'],
    }),
    deleteDeliveryAddress: builder.mutation({
      query: () => ({
        url: '/delivery-address',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ['DeliveryAddress'],
    }),

    getUsers: builder.query({
      query: (params: QueryType) => ({
        url: `/admin/users?${new URLSearchParams(
          params as Record<string, string>
        ).toString()}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Users'],
    }),

    getAdmins: builder.query({
      query: () => ({
        url: '/admin/admins',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Admins'],
    }),

    updateUserDetails: builder.mutation({
      query: (userData) => ({
        url: '/me/update',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    getCategory: builder.query({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),
    getCategoryByName: builder.query({
      query: (params: string) => `categories/${params}`,
      providesTags: ['Categories'],
    }),
     getProductsByCategoryId: builder.query({
      query: (categoryId: string) => `product?category=${categoryId}`,
      providesTags: ['Product'],
    }),
    getProductsByCategoryGender: builder.query({
      query: ({ categoryId, gender }) => `/product?category=${categoryId}&gender=${gender}`,
      providesTags: ['Product']
    }),
    getCategories: builder.query({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),

    getCart: builder.query({
      query: () => ({
        url: `/cart/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (items: string[]) => ({
        url: `/cart/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { items },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (productId: string) => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    reduceCartItem: builder.mutation({
      query: (productId: string) => ({
        url: `/cart/${productId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    getInboxMessages: builder.query({
      query: () => ({
        url: '/inbox/messages',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['Inbox'],
    }),
    markMessageAsRead: builder.mutation({
      query: (messageId) => ({
        url: `/inbox/messages/${messageId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Inbox'],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `order/new`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `order/admin/all`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ body, id }) => ({
        url: `order/admin/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `order/admin/${orderId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
  overrideExisting: false,
} as const);

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetDashboardDataQuery,
  useGetDeliveryAddressQuery,
  useCreateDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
  useGetUsersQuery,
  useGetAdminsQuery,
  useUpdateUserDetailsMutation,
  useGetCategoryQuery,
  useGetCategoryByNameQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
  useGetProductsByCategoryGenderQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useReduceCartItemMutation,
  useCreateOrderMutation,
  useGetInboxMessagesQuery, 
  useMarkMessageAsReadMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = adminService;
