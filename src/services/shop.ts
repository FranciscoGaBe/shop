import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
          { type: 'Posts', id: 'LIST' },
        ]
        : [{ type: 'Posts', id: 'LIST' }]),
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result) => (result
        ? [{ type: 'Posts', id: result.id }]
        : ['Posts']),
    }),
    getProductByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
  }),
});

export const {
  useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, useGetProductByCategoryQuery,
} = shopApi;
