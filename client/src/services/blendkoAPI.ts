import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, CartResponse, LoginResponse, CartItem } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

export const blendkoAPI = createApi({
  reducerPath: 'blendkoAPI',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    getCart: builder.query<CartResponse, void>({
      query: () => 'cart',
    }),
    addToCart: builder.mutation<CartResponse, CartItem>({
      query: (cartItem) => ({
        url: 'cart',
        method: 'POST',
        body: cartItem,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetCartQuery,
  useAddToCartMutation,
} = blendkoAPI;
