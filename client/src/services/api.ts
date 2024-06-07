import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl: string = 'http://localhost:8080/api/v1/';

// if (process.env.NODE_ENV === 'development') {
//   baseUrl = 'http://localhost:8080/api/v1/';
// } else {
//   baseUrl = 'https://blendko.onrender.com/api/v1/';
// }

export const blendkoApi = createApi({
  reducerPath: 'blendkoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Product', 'Categories'],
  endpoints: () => ({}),
});

