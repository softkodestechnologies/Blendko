import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8080/api/v1';
} else {
  baseUrl = 'https://blendko.onrender.com/api/v1';
}

export const blendkoApi = createApi({
  reducerPath: 'blendkoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [
    'Register',
    'LogIn',
    'User',
    'Users',
    'Product',
    'Categories',
    'GetCategoriesByName',
    'Cart',
    'Order',
    'News',
  ],
  endpoints: () => ({}),
});
