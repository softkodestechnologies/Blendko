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
};
const getToken = () => {
  if (typeof localStorage !== 'undefined') {
    console.log('TOKEN', localStorage.getItem('token'))
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
  useGetUsersQuery,
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
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = adminService;
