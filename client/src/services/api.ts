import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl = 'https://blendko.onrender.com/api/v1';

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
    'Order'
  ],
  endpoints: () => ({}),
});