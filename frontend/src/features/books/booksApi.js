import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => 'books.json',
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
