import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: () => '/products',
    }),
  }),
});

export const { useGetProductsQuery } = shopApi;