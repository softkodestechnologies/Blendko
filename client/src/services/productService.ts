// import { blendkoApi } from './api';
// import { Product, ApiResponse } from '@/utils/types';

// type QueryType = {
//   [key: string]: string | number | undefined;
// };

// export const productService = blendkoApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query<ApiResponse<Product[]>, QueryType>({
//       query: (params) =>
//         `product?${new URLSearchParams(params as Record<string, string>).toString()}`,
//       providesTags: ['Product'],
//     }),
//     getProductById: builder.query<ApiResponse<Product>, string>({
//       query: (productId) => `product/${productId}`,
//       providesTags: ['Product'],
//     }),
//     getCategories: builder.query<ApiResponse<string[]>, void>({
//       query: () => 'categories',
//       providesTags: ['Categories'],
//     }),
//     getCategoryByName: builder.query<ApiResponse<string>, string>({
//       query: (categoryName) => `categories/${categoryName}`,
//       providesTags: ['Categories'],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useGetCategoriesQuery,
//   useGetCategoryByNameQuery,
// } = productService;
