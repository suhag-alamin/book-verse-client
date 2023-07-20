import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (limit) => (limit ? `/book?limit=${limit}` : "/book"),
    }),
    getBooksWithPagination: builder.query({
      query: (page) => `/book?page=${page}&limit=9`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBooksWithPaginationQuery } = bookApi;
